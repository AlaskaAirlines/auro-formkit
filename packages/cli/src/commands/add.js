import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { readConfig } from "../config.js";
import { resolveItemTree } from "../registry.js";

const ALIAS_RE = /@\/([^'"`\s)]+)/g;

/** Rewrite `@/x` alias imports to a relative path from the copied file's location. */
function rewriteAliases(content, targetAbs, srcRootAbs) {
  const fromDir = path.dirname(targetAbs);
  return content.replace(ALIAS_RE, (_match, rest) => {
    const resolved = path.join(srcRootAbs, rest);
    let rel = path.relative(fromDir, resolved).split(path.sep).join("/");
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return rel;
  });
}

async function ensureImport(cssFile, statement) {
  if (!existsSync(cssFile)) {
    await mkdir(path.dirname(cssFile), { recursive: true });
    await writeFile(cssFile, `${statement}\n`, "utf8");
    return;
  }
  const current = await readFile(cssFile, "utf8");
  if (current.includes(statement)) return;
  await writeFile(cssFile, `${statement}\n${current}`, "utf8");
}

export async function add(name, options) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);
  const registryDir = config.registry;
  const srcRootAbs = path.join(cwd, config.srcRoot ?? "src");

  const items = await resolveItemTree(name, registryDir);
  const externalDeps = new Set();
  const written = [];

  for (const item of items) {
    for (const file of item.files) {
      const targetAbs = path.join(cwd, file.target);
      if (existsSync(targetAbs) && !options.overwrite) {
        console.log(`  skip (exists): ${file.target}`);
        continue;
      }
      const raw = await readFile(path.join(registryDir, file.path), "utf8");
      const content = rewriteAliases(raw, targetAbs, srcRootAbs);
      await mkdir(path.dirname(targetAbs), { recursive: true });
      await writeFile(targetAbs, content, "utf8");
      written.push(file.target);

      if (file.target.replace(/\\/g, "/").endsWith("styles/auro-tokens.css")) {
        const entryCss = path.join(cwd, config.entryCss ?? "src/index.css");
        const rel = path
          .relative(path.dirname(entryCss), targetAbs)
          .split(path.sep)
          .join("/");
        await ensureImport(entryCss, `@import '${rel.startsWith(".") ? rel : `./${rel}`}';`);
      }
    }

    for (const dep of item.dependencies) {
      // @auro/* packages are workspace-linked; everything else needs installing.
      if (!dep.startsWith("@auro/")) externalDeps.add(dep);
    }
  }

  console.log(`\nAdded "${name}":`);
  for (const f of written) console.log(`  + ${f}`);

  if (externalDeps.size > 0) {
    console.log(`\nInstall required dependencies:`);
    console.log(`  npm install ${[...externalDeps].join(" ")}`);
  } else {
    console.log(`\nDependencies are workspace-linked (@auro/*) — nothing to install.`);
  }
}
