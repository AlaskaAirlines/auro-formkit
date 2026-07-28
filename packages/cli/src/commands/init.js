import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { DEFAULT_REGISTRY_DIR } from "../registry.js";
import { hasConfig, writeConfig } from "../config.js";

const THEME_IMPORT =
  "@import '@aurodesignsystem/design-tokens/dist/themes/alaska/CSSCustomProperties--alaska.css';";

async function ensureImport(cssFile, statement) {
  await mkdir(path.dirname(cssFile), { recursive: true });
  let current = existsSync(cssFile) ? await readFile(cssFile, "utf8") : "";
  if (current.includes(statement)) return false;
  current = `${statement}\n${current}`;
  await writeFile(cssFile, current, "utf8");
  return true;
}

export async function init(options) {
  const cwd = process.cwd();
  if (hasConfig(cwd) && !options.force) {
    console.log("components.json already exists. Use --force to overwrite.");
    return;
  }

  const srcRoot = options.srcRoot ?? "src";
  const registry = options.registry ?? DEFAULT_REGISTRY_DIR;
  const entryCss = options.css ?? path.join(srcRoot, "index.css");

  const config = {
    $schema: "https://ui.shadcn.com/schema.json",
    registry,
    srcRoot,
    entryCss,
    tokens: {
      package: "@aurodesignsystem/design-tokens",
      theme: "alaska",
    },
  };

  await writeConfig(config, cwd);
  const wrote = await ensureImport(path.join(cwd, entryCss), THEME_IMPORT);

  console.log(`Created ${path.relative(cwd, path.join(cwd, "components.json")) || "components.json"}`);
  console.log(`Registry: ${registry}`);
  if (wrote) console.log(`Wired design tokens into ${entryCss}`);
  console.log(`\nNext: auro add checkbox`);
}
