#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadItem, loadRegistry } from "@auro/cli/registry";

const server = new McpServer({ name: "auro-registry", version: "0.0.0" });

function text(payload) {
  return { content: [{ type: "text", text: typeof payload === "string" ? payload : JSON.stringify(payload, null, 2) }] };
}

server.registerTool(
  "list_components",
  {
    title: "List Auro components",
    description: "List every component available in the Auro registry, with titles and descriptions.",
    inputSchema: {},
  },
  async () => {
    const registry = await loadRegistry();
    return text(
      registry.items.map((item) => ({
        name: item.name,
        title: item.title,
        description: item.description,
      })),
    );
  },
);

server.registerTool(
  "get_component_details",
  {
    title: "Get Auro component details",
    description:
      "Full metadata for one Auro component: typed props, events, a11y contract, tokens, and the files that will be copied.",
    inputSchema: { name: z.string().describe("Component name, e.g. \"checkbox\".") },
  },
  async ({ name }) => {
    const item = await loadItem(name);
    return text({
      name: item.name,
      title: item.title,
      description: item.description,
      props: item.auro?.props ?? [],
      events: item.auro?.events ?? [],
      a11y: item.auro?.a11y ?? {},
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
      files: item.files.map((f) => f.target),
      docs: item.auro?.docs,
    });
  },
);

server.registerTool(
  "get_install_command",
  {
    title: "Get install command",
    description: "Return the shell command an agent should run to add a component to the current project.",
    inputSchema: { name: z.string().describe("Component name to install.") },
  },
  async ({ name }) => {
    await loadItem(name); // validates the component exists
    return text(`npx auro add ${name}`);
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
