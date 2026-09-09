#!/usr/bin/env node
/**
 * Auro FormKit MCP server.
 *
 * Serves the AI implementation specs published under `ai/**` in the
 * `@aurodesignsystem/auro-formkit` npm package. By default the server holds NO
 * data of its own — it fetches the published package from the CDN so specs can
 * never be staler than the release they ship with. Pin a version with the
 * AURO_FORMKIT_VERSION env var (default "latest").
 *
 * For local development (before a release publishes `ai/**`), set
 * AURO_FORMKIT_AI_DIR to a checkout's `ai/` directory and the spec resources are
 * read from disk instead of the CDN. (Token lookup still uses the published
 * design-tokens package.)
 *
 * Tools:
 *   - list_components     discovery: rules + the list of available specs
 *   - get_component_spec  fetch one component's spec, wrapped in the prompt template
 *   - search_tokens       look up Auro `--ds-*` design tokens by keyword
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

// ── Configuration ────────────────────────────────────────────────────────────
const PKG = "@aurodesignsystem/auro-formkit";
const VERSION = process.env.AURO_FORMKIT_VERSION ?? "latest";
const TOKENS_PKG = "@aurodesignsystem/design-tokens";
const TOKENS_VERSION = process.env.AURO_TOKENS_VERSION ?? "latest";

// When set, spec resources are read from this local `ai/` directory instead of the CDN.
const AI_DIR = process.env.AURO_FORMKIT_AI_DIR || null;
const BASE = `https://cdn.jsdelivr.net/npm/${PKG}@${VERSION}/ai`;
const TOKENS_CSS = `https://cdn.jsdelivr.net/npm/${TOKENS_PKG}@${TOKENS_VERSION}/dist/tokens/CSSCustomProperties.css`;

const FETCH_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 5 * 60 * 1000; // specs change only on release; a short cache is safe

// ── Fetch with timeout + in-memory TTL cache ─────────────────────────────────
// No Date.now()-free constraint here (this is a normal Node process), but we key
// the cache on URL and expire by wall clock so repeated tool calls stay cheap.
const cache = new Map(); // url -> { at: number, text: string }

async function fetchText(url) {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.text;

  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (err) {
    const reason = err?.name === "TimeoutError" ? "timed out" : (err?.message ?? "network error");
    throw new FetchError(`Could not reach ${url} (${reason}). Check connectivity or the pinned version "${VERSION}".`);
  }
  if (res.status === 404) throw new NotFoundError(url);
  if (!res.ok) throw new FetchError(`${url} returned HTTP ${res.status}.`);

  const text = await res.text();
  cache.set(url, { at: Date.now(), text });
  return text;
}

class FetchError extends Error {}
class NotFoundError extends Error {
  constructor(url) {
    super(`Not found: ${url}`);
    this.url = url;
  }
}

// Read a spec resource by its path relative to `ai/` (e.g. "llms.txt",
// "specs/auro-input.spec.yaml"). Uses the local directory when AURO_FORMKIT_AI_DIR
// is set, otherwise the published CDN.
async function readResource(relPath) {
  if (AI_DIR) {
    const abs = path.join(AI_DIR, relPath);
    try {
      return await fs.readFile(abs, "utf8");
    } catch (err) {
      if (err.code === "ENOENT") throw new NotFoundError(abs);
      throw new FetchError(`Could not read ${abs}: ${err?.message ?? err}`);
    }
  }
  return fetchText(`${BASE}/${relPath}`);
}

// Wrap a handler so thrown errors become a friendly `isError` tool result rather
// than crashing the transport. MCP clients surface `isError` text to the model.
const toolResult = (text) => ({ content: [{ type: "text", text }] });
const errorResult = (text) => ({ content: [{ type: "text", text }], isError: true });

function guard(handler) {
  return async (args) => {
    try {
      return await handler(args);
    } catch (err) {
      if (err instanceof NotFoundError || err instanceof FetchError) return errorResult(err.message);
      return errorResult(`Unexpected error: ${err?.message ?? String(err)}`);
    }
  };
}

// ── Derive the component list from llms.txt (single source of truth) ─────────
// Avoids a hardcoded list that would drift. Parses the spec links out of the
// published index, e.g. ".../ai/specs/auro-input.spec.yaml" -> "auro-input".
async function listComponentNames() {
  const index = await readResource("llms.txt");
  const names = new Set();
  for (const m of index.matchAll(/ai\/specs\/([a-z0-9-]+)\.spec\.ya?ml/gi)) {
    names.add(m[1].toLowerCase());
  }
  return [...names].sort();
}

// Accept "auro-input", "input", or with stray whitespace/casing.
function normalizeComponent(input, known) {
  const q = String(input ?? "").trim().toLowerCase();
  if (known.includes(q)) return q;
  const prefixed = q.startsWith("auro-") ? q : `auro-${q}`;
  if (known.includes(prefixed)) return prefixed;
  return null;
}

// ── Server ────────────────────────────────────────────────────────────────────
const server = new McpServer(
  { name: "auro-formkit", version: "0.0.0" },
  {
    instructions:
      "Serves Auro FormKit AI implementation specs. Call list_components first to " +
      "see available components and the global rules, then get_component_spec for the " +
      "one you need. Use search_tokens to resolve Auro --ds-* design token values.",
  }
);

// 1. Discovery — returns llms.txt (rules + the component list).
server.tool(
  "list_components",
  "List Auro FormKit components available as AI implementation specs, including the non-negotiable global rules (design tokens, accessibility, wc-only features). Call this before implementing anything.",
  {},
  guard(async () => toolResult(await readResource("llms.txt")))
);

// 2. Fetch — one component's spec, prepended with the enforcement prompt template.
server.tool(
  "get_component_spec",
  "Fetch the authoritative implementation spec for one Auro FormKit component, wrapped in the prompt template that enforces token-only styling, accessibility, and tier rules. This is everything needed to implement the component in plain HTML/CSS/JS.",
  {
    component: z
      .string()
      .describe('Component name, e.g. "auro-input" or "input".'),
  },
  guard(async ({ component }) => {
    const known = await listComponentNames();
    const name = normalizeComponent(component, known);
    if (!name) {
      return errorResult(
        `Unknown component "${component}". Available: ${known.join(", ")}.`
      );
    }
    // The prompt template is optional; if it is ever missing, still return the spec.
    let template = "";
    try {
      template = `${await readResource("_prompt-template.md")}\n\n`;
    } catch (err) {
      if (!(err instanceof NotFoundError)) throw err;
    }
    const spec = await readResource(`specs/${name}.spec.yaml`);
    return toolResult(`${template}# COMPONENT SPEC (${name})\n${spec}`);
  })
);

// 3. Token lookup — grep the published design-tokens CSS for `--ds-*` matches.
server.tool(
  "search_tokens",
  "Search Auro design tokens (--ds-* CSS custom properties) by keyword, returning name and value. Use to pick the correct token for a color, size, spacing, radius, or font instead of guessing a literal value.",
  {
    query: z
      .string()
      .describe('Keyword to match against token names, e.g. "border-error", "size-600", "text-primary".'),
    limit: z.number().int().min(1).max(100).optional().describe("Max results (default 25)."),
  },
  guard(async ({ query, limit = 25 }) => {
    const css = await fetchText(TOKENS_CSS);
    const q = query.trim().toLowerCase();
    const matches = [];
    // Match declarations like:  --ds-color-border-error-default: #d50032;
    for (const m of css.matchAll(/(--ds-[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
      const [, name, value] = m;
      if (name.toLowerCase().includes(q)) matches.push(`${name}: ${value.trim()}`);
      if (matches.length >= limit) break;
    }
    if (matches.length === 0) {
      return toolResult(`No --ds-* tokens matched "${query}".`);
    }
    return toolResult(matches.join("\n"));
  })
);

// ── Start ───────────────────────────────────────────────────────────────────
// Log to stderr only — stdout carries the JSON-RPC stdio transport.
console.error(`[auro-formkit-mcp] specs from ${AI_DIR ? `local dir: ${AI_DIR}` : `CDN: ${BASE}`}`);
await server.connect(new StdioServerTransport());
