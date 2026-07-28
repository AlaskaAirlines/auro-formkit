#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";

const program = new Command();

program
  .name("auro")
  .description("Install typed, accessible Auro components into your project.")
  .version("0.0.0");

program
  .command("init")
  .description("Create components.json and wire Auro design tokens into your app.")
  .option("--registry <path>", "path or URL to the Auro registry")
  .option("--src-root <dir>", "source root for copied files", "src")
  .option("--css <file>", "app entry stylesheet to wire tokens into")
  .option("--force", "overwrite an existing components.json")
  .action((options) =>
    init({
      registry: options.registry,
      srcRoot: options.srcRoot,
      css: options.css,
      force: options.force,
    }),
  );

program
  .command("list")
  .alias("ls")
  .description("List available components in the registry.")
  .action(() => list());

program
  .command("add <component>")
  .description("Copy a component (and its dependencies) into your project.")
  .option("--overwrite", "overwrite files that already exist")
  .action((component, options) => add(component, { overwrite: options.overwrite }));

program.parseAsync(process.argv).catch((error) => {
  console.error(`\nError: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
