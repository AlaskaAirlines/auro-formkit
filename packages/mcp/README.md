# @aurodesignsystem/auro-formkit-mcp

An [MCP](https://modelcontextprotocol.io) server that serves Auro FormKit's **AI
implementation specs**. It lets an AI reimplement Auro form components in plain
HTML/CSS/JS — on-brand and accessible — for teams that cannot consume the Auro
web components directly.

The server holds no data of its own. It fetches the `ai/**` specs published in
the `@aurodesignsystem/auro-formkit` npm package from the CDN, so the specs can
never be staler than the release they ship with.

## Tools

| Tool | Purpose |
|---|---|
| `list_components` | Discovery: returns the global rules (tokens, a11y, wc-only) and the list of components that have specs. Call this first. |
| `get_component_spec` | Fetches one component's spec wrapped in the enforcement prompt template. Accepts `"auro-input"` or `"input"`. |
| `search_tokens` | Looks up Auro `--ds-*` design tokens by keyword and returns name + value. |

## Setup

### Claude Code

```sh
claude mcp add auro-formkit -- npx -y @aurodesignsystem/auro-formkit-mcp
```

### Claude Desktop / other MCP clients

Add to the client's MCP config:

```jsonc
{
  "mcpServers": {
    "auro-formkit": {
      "command": "npx",
      "args": ["-y", "@aurodesignsystem/auro-formkit-mcp"],
      "env": {
        // Optional: pin to a FormKit release for reproducible output.
        "AURO_FORMKIT_VERSION": "latest"
      }
    }
  }
}
```

Then prompt normally, e.g. _"Build a required email field the Auro way."_ The
model calls `list_components` / `get_component_spec` itself.

## Configuration

| Env var | Default | Effect |
|---|---|---|
| `AURO_FORMKIT_VERSION` | `latest` | Pin the FormKit release the specs are fetched from (e.g. `0.3`). |
| `AURO_TOKENS_VERSION` | `latest` | Pin the design-tokens release `search_tokens` reads. |

## Local development

```sh
npm start                 # run over stdio
npm run inspect           # open the MCP Inspector against this server
```

## License

Apache-2.0
