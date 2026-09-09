/**
 * AI spec generator.
 *
 * Emits the `ai/**` payload served by @aurodesignsystem/auro-formkit-mcp and the
 * fetch-model `llms.txt`. Each component spec is assembled from three sources:
 *
 *   1. custom-elements.json  (auto)  — attributes, slots, events, methods
 *   2. components/<c>/demo/css-only.md (auto) — token import, CSS recipe,
 *                                               golden examples, fidelity gaps
 *   3. ai/_authored/<tag>.overlay.yaml (authored) — tiers, native equivalents,
 *                                                    behavioral rules, verify
 *
 * Run with: npm run build:ai   (see root package.json)
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const PKG = "@aurodesignsystem/auro-formkit";
const CDN = `https://cdn.jsdelivr.net/npm/${PKG}@latest/ai`;
const OUT = path.join(ROOT, "ai");

const log = (...a) => console.log("[ai-spec]", ...a);
const warn = (...a) => console.warn("[ai-spec] WARN:", ...a);

// ── small text helpers ───────────────────────────────────────────────────────
const decode = (s) =>
  s
    .replace(/[​﻿]/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#3?9;/g, "'")
    .replace(/&amp;/g, "&");

const stripTags = (s) => decode(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
const slug = (s) => stripTags(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const firstSentence = (s) => {
  const t = stripTags(s);
  const m = t.match(/^(.*?\.)(\s|$)/);
  return (m ? m[1] : t).trim();
};

// ── css-only.md parser ────────────────────────────────────────────────────────
// The demos share one skeleton: "Styling a native ..." (CSS + example blocks),
// then "What you lose ..." (one sub-header per gap), then "Summary".
function parseCssOnly(md) {
  const token = /<auro-header[^>]*>([\s\S]*?)<\/auro-header>|^#{1,6}\s+(.+)$|<pre><code>([\s\S]*?)<\/code><\/pre>|<p>([\s\S]*?)<\/p>/gim;

  let header = "";
  let inGaps = false;
  const cssBlocks = [];
  const examples = [];
  const gaps = [];
  let pendingGap = null; // gap awaiting its guidance paragraph

  for (let m; (m = token.exec(md)); ) {
    const [, h1, h2, code, para] = m;
    const headerText = h1 ?? h2;

    if (headerText !== undefined) {
      header = stripTags(headerText);
      if (/^what you lose/i.test(header)) { inGaps = true; continue; }
      if (/^(summary|recommendation)$/i.test(header)) { inGaps = false; pendingGap = null; continue; }
      if (inGaps) {
        pendingGap = { id: slug(header), feature: header, guidance: "" };
        gaps.push(pendingGap);
      }
      continue;
    }

    if (code !== undefined) {
      const text = decode(code).trim();
      const isCss = text.includes("{") && text.includes(":");
      if (isCss) cssBlocks.push(text);
      else if (!inGaps && text.includes("<") && examples.length < 3) {
        examples.push({ id: slug(header) || `example-${examples.length + 1}`, html: text });
      }
      continue;
    }

    if (para !== undefined && pendingGap && !pendingGap.guidance) {
      pendingGap.guidance = firstSentence(para);
      pendingGap = null;
    }
  }

  const css = cssBlocks.join("\n\n");
  const tokenImport = css.match(/@import\s+["']([^"']*design-tokens[^"']*)["']/);
  return {
    tokensImport: tokenImport ? tokenImport[1] : null,
    css,
    examples,
    gaps: gaps.filter((g) => g.feature),
  };
}

// ── CEM lookup ────────────────────────────────────────────────────────────────
function findDeclaration(cem, tag) {
  for (const mod of cem.modules ?? [])
    for (const d of mod.declarations ?? [])
      if (d.customElement && d.tagName === tag) return { decl: d, path: mod.path };
  return null;
}

// ── tier + native-equivalent policy ──────────────────────────────────────────
function makeTierFn(defaults, overlay) {
  const nativeEquiv = { ...defaults.tierPolicy.nativeEquiv, ...(overlay.nativeEquiv ?? {}) };
  const wcOnly = new Set(defaults.tierPolicy.wcOnlyHints ?? []);
  const tiers = overlay.tiers ?? {};
  return {
    nativeEquiv,
    counts: { core: 0, enhanced: 0, "wc-only": 0 },
    tierFor(name) {
      let t;
      if (tiers[name]) t = tiers[name];
      else if (nativeEquiv[name]) t = "core";
      else if (wcOnly.has(name)) t = "wc-only";
      else t = "enhanced";
      this.counts[t] = (this.counts[t] ?? 0) + 1;
      return t;
    },
  };
}

// ── build one spec object ─────────────────────────────────────────────────────
function buildSpec({ tag, dir, version, decl, modPath, recipe, defaults, overlay }) {
  const policy = makeTierFn(defaults, overlay);
  const enums = overlay.enums ?? {};

  const attributes = (decl.attributes ?? []).map((a) => {
    const tier = policy.tierFor(a.name);
    const entry = { name: a.name, tier };
    if (policy.nativeEquiv[a.name]) entry.native = policy.nativeEquiv[a.name];
    if (enums[a.name]) entry.enum = enums[a.name];
    if (a.default !== undefined) entry.default = a.default;
    const desc = firstSentence(a.description ?? "");
    if (desc) entry.description = desc;
    return entry;
  });

  const slots = (decl.slots ?? []).map((s) => ({
    name: s.name || "(default)",
    tier: (defaults.tierPolicy.wcOnlyHints ?? []).includes(s.name) ? "wc-only" : "core",
    ...(firstSentence(s.description ?? "") ? { description: firstSentence(s.description) } : {}),
  }));

  const events = (decl.events ?? []).map((e) => ({
    name: e.name,
    tier: /^auro/i.test(e.name) ? "wc-only" : "core",
    ...(firstSentence(e.description ?? "") ? { description: firstSentence(e.description) } : {}),
  }));

  const methods = (decl.members ?? [])
    .filter((m) => m.kind === "method" && m.privacy !== "private")
    .map((m) => ({ name: m.name, tier: "wc-only" }));

  const dedupe = (arr) => [...new Set(arr)];
  const behavior = {
    a11y: dedupe([...(defaults.behavior?.a11y ?? []), ...(overlay.behavior?.a11y ?? [])]),
    keyboard: dedupe([...(defaults.behavior?.keyboard ?? []), ...(overlay.behavior?.keyboard ?? [])]),
    validation: dedupe([...(defaults.behavior?.validation ?? []), ...(overlay.behavior?.validation ?? [])]),
  };

  return {
    component: tag,
    version,
    summary: overlay.summaryOverride?.trim() || firstSentence(decl.description ?? "") || tag,
    generatedFrom: {
      cem: `custom-elements.json#${tag}`,
      cssRecipe: `components/${dir}/demo/css-only.md`,
      overlay: `ai/_authored/${tag}.overlay.yaml`,
    },
    sourceOfTruth: { component: modPath },
    visual: {
      tokensImport: recipe.tokensImport,
      rule: (overlay.visual?.rule ?? defaults.visual?.rule ?? "").trim(),
      css: recipe.css || null,
    },
    api: { attributes, slots, events, methods },
    behavior,
    gaps: recipe.gaps,
    examples: recipe.examples,
    verify: dedupe([...(defaults.verify ?? []), ...(overlay.verify ?? [])]),
  };
}

// ── llms.txt ──────────────────────────────────────────────────────────────────
function buildLlmsTxt(specs) {
  const lines = [
    "# Auro FormKit — AI Implementation Standard",
    "",
    "> Reimplement Auro form components in plain HTML/CSS/JS using Auro design",
    "> tokens, for teams that cannot consume the web components. Specs are generated",
    "> from source on every release, so they never drift from the real component.",
    "",
    "## Non-negotiable rules",
    "- Style ONLY with Auro `--ds-*` tokens via `var(--ds-x, fallback)`; never bare hex/px.",
    "- Every control needs an associated `<label>` and full ARIA wiring.",
    "- `tier: wc-only` features are NOT reproducible in plain HTML — report, never fake.",
    "",
    "## Component specs",
    ...specs.map((s) => `- [${s.component}](${CDN}/specs/${s.component}.spec.yaml): ${s.summary}`),
    "",
    "## Global contracts",
    `- [Prompt template](${CDN}/_prompt-template.md)`,
    `- [Accessibility baseline](${CDN}/_a11y-baseline.md)`,
    "",
  ];
  return lines.join("\n");
}

// ── main ──────────────────────────────────────────────────────────────────────
async function readYamlIfExists(p, fallback = {}) {
  try {
    return yaml.load(await fs.readFile(p, "utf8")) ?? fallback;
  } catch (err) {
    if (err.code === "ENOENT") return fallback;
    throw err;
  }
}

async function main() {
  const cem = JSON.parse(await fs.readFile(path.join(ROOT, "custom-elements.json"), "utf8"));
  const { version } = JSON.parse(await fs.readFile(path.join(ROOT, "package.json"), "utf8"));
  const defaults = await readYamlIfExists(path.join(OUT, "_authored", "_defaults.overlay.yaml"));

  const componentsDir = path.join(ROOT, "components");
  const dirs = (await fs.readdir(componentsDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  await fs.mkdir(path.join(OUT, "specs"), { recursive: true });

  const specs = [];
  const skipped = [];

  for (const dir of dirs) {
    const cssOnlyPath = path.join(componentsDir, dir, "demo", "css-only.md");
    let md;
    try {
      md = await fs.readFile(cssOnlyPath, "utf8");
    } catch {
      skipped.push(`${dir} (no css-only.md)`);
      continue;
    }

    const tag = `auro-${dir}`;
    const hit = findDeclaration(cem, tag);
    if (!hit) {
      skipped.push(`${dir} (no CEM declaration for ${tag})`);
      continue;
    }

    const recipe = parseCssOnly(md);
    const overlay = await readYamlIfExists(path.join(OUT, "_authored", `${tag}.overlay.yaml`));
    const spec = buildSpec({ tag, dir, version, decl: hit.decl, modPath: hit.path, recipe, defaults, overlay });

    if (!recipe.tokensImport) warn(`${tag}: no design-tokens @import found in css-only.md`);
    if (recipe.examples.length === 0) warn(`${tag}: parsed 0 golden examples`);
    if (recipe.gaps.length === 0) warn(`${tag}: parsed 0 fidelity gaps`);

    const yamlText =
      `# GENERATED by packages/build-tools/src/aiSpecGenerator.mjs — do not edit by hand.\n` +
      `# Authored inputs live in ai/_authored/${tag}.overlay.yaml\n` +
      yaml.dump(spec, { lineWidth: -1, noRefs: true });
    await fs.writeFile(path.join(OUT, "specs", `${tag}.spec.yaml`), yamlText);

    const policy = makeTierFn(defaults, overlay);
    (spec.api.attributes ?? []).forEach((a) => policy.tierFor(a.name));
    log(
      `${tag}: ${spec.api.attributes.length} attrs ` +
        `(core:${policy.counts.core} enhanced:${policy.counts.enhanced} wc-only:${policy.counts["wc-only"]}), ` +
        `${spec.examples.length} examples, ${spec.gaps.length} gaps` +
        `${overlay.summaryOverride ? "" : " [no overlay]"}`
    );
    specs.push(spec);
  }

  await fs.writeFile(path.join(OUT, "llms.txt"), buildLlmsTxt(specs));

  log(`wrote ${specs.length} specs + llms.txt to ai/`);
  if (skipped.length) log(`skipped: ${skipped.join(", ")}`);
}

main().catch((err) => {
  console.error("[ai-spec] FAILED:", err);
  process.exit(1);
});
