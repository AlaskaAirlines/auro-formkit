import { DEFAULT_REGISTRY_DIR, loadRegistry } from "../registry.js";
import { hasConfig, readConfig } from "../config.js";

export async function list() {
  const cwd = process.cwd();
  const registryDir = hasConfig(cwd) ? (await readConfig(cwd)).registry : DEFAULT_REGISTRY_DIR;
  const registry = await loadRegistry(registryDir);

  console.log(`${registry.name} registry (${registry.items.length} components):\n`);
  for (const item of registry.items) {
    console.log(`  ${item.name.padEnd(14)} ${item.description ?? item.title ?? ""}`);
  }
}
