import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export const CONFIG_FILE = "components.json";

export function configPath(cwd = process.cwd()) {
  return path.join(cwd, CONFIG_FILE);
}

export function hasConfig(cwd = process.cwd()) {
  return existsSync(configPath(cwd));
}

export async function readConfig(cwd = process.cwd()) {
  if (!hasConfig(cwd)) {
    throw new Error(`No ${CONFIG_FILE} found. Run "auro init" first.`);
  }
  return JSON.parse(await readFile(configPath(cwd), "utf8"));
}

export async function writeConfig(config, cwd = process.cwd()) {
  await writeFile(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`, "utf8");
}
