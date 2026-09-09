# Using Auro FormKit with AI

This directory publishes a machine-consumable **AI implementation standard** for
Auro FormKit. It lets a team use an AI assistant to build Auro form components in
plain HTML/CSS/JS — on-brand and accessible — for situations where the Auro web
components cannot be consumed directly (a framework constraint, a locked-down
build, a non-Auro stack).

> **When to use this vs. the web components.** If you can install and render
> `<auro-input>` and friends, do that — the web components are the maintained
> source of truth and carry behavior (masking, validation, keyboard) that plain
> HTML cannot fully reproduce. Reach for these specs only when the components are
> genuinely off the table.

## What's here

| File | Purpose |
|---|---|
| [`llms.txt`](./llms.txt) | Index of every component spec + the global rules. Start here. |
| [`specs/*.spec.yaml`](./specs/) | One authoritative spec per component (API, visual recipe, behavior, gaps, examples, verify). Generated from source. |
| [`_prompt-template.md`](./_prompt-template.md) | The instruction block that makes an AI follow a spec correctly. |
| [`_a11y-baseline.md`](./_a11y-baseline.md) | Accessibility rules that apply to every component. |
| `_authored/` | Hand-authored inputs the generator merges into each spec (see [Maintainers](#for-maintainers)). |

Components with specs today: `checkbox`, `combobox`, `counter`, `datepicker`,
`dropdown`, `form`, `input`, `menu`, `radio`, `select`.

## Consuming the specs

There are two supported models. Both keep you in sync with the components — the
specs are regenerated from source and published on every release.

### Model A — MCP server (recommended for Claude / MCP-capable tools)

The `@aurodesignsystem/auro-formkit-mcp` server lets the AI discover and fetch the
right spec on its own. No copy-pasting.

**Claude Code**

```sh
claude mcp add auro-formkit -- npx -y @aurodesignsystem/auro-formkit-mcp
```

**Claude Desktop / other MCP clients** — add to the client's MCP config:

```jsonc
{
  "mcpServers": {
    "auro-formkit": {
      "command": "npx",
      "args": ["-y", "@aurodesignsystem/auro-formkit-mcp"],
      "env": { "AURO_FORMKIT_VERSION": "latest" }
    }
  }
}
```

The server exposes three tools the model calls automatically:

| Tool | What it does |
|---|---|
| `list_components` | Returns the global rules + the list of available components. |
| `get_component_spec` | Fetches one component's spec, wrapped in the prompt template. |
| `search_tokens` | Looks up Auro `--ds-*` design tokens by keyword. |

Then just prompt: *"Build a required email field the Auro way."*

### Model B — URL / @Docs (Cursor, ChatGPT, any fetch-capable agent)

Point the tool at the published index:

```
https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-formkit@latest/ai/llms.txt
```

- **Cursor** — add that URL under Settings → Docs, then reference it: `@auro-formkit build an email input`.
- **Any agent that can fetch URLs** — paste one line into your prompt:
  *"Follow the Auro standard at `<llms.txt url>`; fetch the relevant spec before writing code."*

## Working with a spec

Once the AI has a spec, expect its output in this order (enforced by the prompt
template): **HTML → CSS → JS → Fidelity Report → Self-check.**

Two concepts drive correct output:

- **Tiers** on every attribute/slot/event tell the AI what's reproducible:
  - `core` — implemented fully (maps to a native HTML attribute).
  - `enhanced` — implemented only if your request needs it.
  - `wc-only` — **not reproducible in plain HTML.** The AI must report it, never fake it.
- **Gaps** — the `gaps` section (and the Fidelity Report in the output) lists what
  you lose versus the real component (e.g. input masking, credit-card detection,
  the stylable dropdown panel). If your request needs a `wc-only` feature, the AI
  will tell you and recommend using the actual web component instead.

Always skim the **Fidelity Report** — it's how you learn whether the plain-HTML
version is good enough or whether you should escalate back to `<auro-*>`.

## Versioning

Pin to a release for reproducible output instead of tracking `latest`:

- MCP: set `AURO_FORMKIT_VERSION` (e.g. `0.3`) in the server env.
- URL: replace `@latest` with `@0.3` in the `llms.txt` URL.

This is the same discipline as pinning the npm component dependency — upgrade
deliberately.

## Limits

- Specs cover the 10 components listed above. Components without a `css-only`
  recipe (e.g. `bibtemplate`, `helptext`, `layoutElement`) are not included.
- These specs produce a visual + structural approximation. Complex behavior marked
  `wc-only` is intentionally out of scope — that's what the web components are for.
- A reimplementation is bound to the design tokens available at author time; it
  does not pick up runtime theme swaps the way the components do.

## For maintainers

Specs are **generated** — never edit `specs/*.yaml` or `llms.txt` by hand.

**Sources (per component):**
1. `custom-elements.json` → API (attributes, slots, events, methods).
2. `components/<c>/demo/css-only.md` → token import, CSS recipe, golden examples, fidelity gaps.
3. `ai/_authored/<tag>.overlay.yaml` → the judgment calls (tiers, native equivalents, behavioral rules, verify).

**Regenerate:**

```sh
npm run build:ai          # analyze + generate
# or, if custom-elements.json is already current:
npm run build:ai:generate
```

Generation also runs inside `npm run build`, and `ai/**` ships via the package
`files` array — so a normal release republishes the specs and the CDN serves them
within minutes.

**To improve a component's spec**, edit its overlay in `_authored/` (add native
mappings, reclassify a tier, add an a11y rule) and regenerate. `_defaults.overlay.yaml`
holds the rules applied to every component. The generator (`packages/build-tools/src/aiSpecGenerator.mjs`)
logs a tier breakdown and warns when a component parses zero examples or gaps.
