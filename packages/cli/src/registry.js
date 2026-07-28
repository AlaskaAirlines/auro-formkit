import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

/** Absolute path to the monorepo registry directory (packages/cli/src -> repo/registry). */
export const DEFAULT_REGISTRY_DIR = path.resolve(
  new URL(".", import.meta.url).pathname,
  "../../../registry",
);

const fileSchema = z.object({
  path: z.string(),
  type: z.string(),
  target: z.string(),
});

export const itemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(fileSchema).default([]),
  cssVars: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  auro: z.record(z.string(), z.unknown()).optional(),
});

const indexEntrySchema = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  path: z.string(),
});

export const registrySchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  homepage: z.string().optional(),
  items: z.array(indexEntrySchema),
});

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

/** Load and validate the registry index. */
export async function loadRegistry(registryDir = DEFAULT_REGISTRY_DIR) {
  const raw = await readJson(path.join(registryDir, "registry.json"));
  return registrySchema.parse(raw);
}

/** Load and validate a single registry item by name. */
export async function loadItem(name, registryDir = DEFAULT_REGISTRY_DIR) {
  const registry = await loadRegistry(registryDir);
  const entry = registry.items.find((item) => item.name === name);
  if (!entry) {
    throw new Error(
      `Component "${name}" not found. Available: ${registry.items.map((i) => i.name).join(", ")}`,
    );
  }
  const raw = await readJson(path.join(registryDir, entry.path));
  return itemSchema.parse(raw);
}

/**
 * Resolve an item plus all of its registryDependencies, deepest-first,
 * de-duplicated. Guards against cycles.
 */
export async function resolveItemTree(name, registryDir = DEFAULT_REGISTRY_DIR, seen = new Set()) {
  if (seen.has(name)) return [];
  seen.add(name);
  const item = await loadItem(name, registryDir);
  const deps = [];
  for (const dep of item.registryDependencies) {
    deps.push(...(await resolveItemTree(dep, registryDir, seen)));
  }
  return [...deps, item];
}
