# Auro Next

> **Status: proof of concept** — additive and isolated. No existing Lit web component is modified,
> replaced, or deprecated by anything here.

React-first, fully typesafe, AI-friendly components for the Auro design system. Built on a
framework-free headless core + thin React render layer (the Base UI / zag.js model), distributed
shadcn-style: the CLI copies typed source directly into your repo so you own it, read it, and
customize it without waiting on a release.

---

## Why this exists

Auro's Lit web components serve 157+ repos across Alaska, but two problems bite React/Next.js teams:

1. **Weak types.** Components are authored in JS — generated `.d.ts` files are largely `any`. No
   real autocomplete, no typed events, no compile-time guarantees.
2. **Not agent-consumable.** Coding agents have no structured, typed surface to discover components
   or install them without hallucinating props.

Auro Next fixes both at the **distribution layer**, not by replacing the web components. The two
tracks run in parallel indefinitely.

---

## What's implemented

| Component | Package | Notes |
|---|---|---|
| **Checkbox** | `@auro/headless/checkbox` | Tri-state, typed `checked: boolean \| "indeterminate"`, typed `onCheckedChange` |
| **Select** | `@auro/headless/select` | WAI-ARIA select-only combobox, Floating UI portal, compound parts |
| **Combobox** | `@auro/headless/combobox` | Editable input + real-time filter, same shared primitives as Select |
| **Shared: useListbox** | registry item | Open state, roving highlight, outside-dismiss — shared by Select + Combobox |
| **Shared: Popover** | registry item | Floating UI positioning + portal primitive — shared by Select + Combobox |

---

## Prerequisites

Node 20+ and npm 10+. Run once from the **repo root** to install all workspaces:

```bash
npm install
```

---

## Quick start

### 1. Initialize your app

```bash
cd apps/react-framework   # or your own React app after running auro init
node ../../packages/cli/src/index.js init
```

This writes `components.json` (registry config) and wires the Auro design token CSS into your entry
stylesheet.

### 2. Add a component

```bash
node ../../packages/cli/src/index.js add combobox
```

The CLI resolves `registryDependencies` automatically — `combobox` also copies `use-listbox` and
`popover` before it. Output:

```
Added "combobox":
  + src/lib/auro/use-listbox.ts
  + src/components/ui/auro-popover.tsx
  + src/components/ui/auro-popover.css
  + src/components/ui/auro-combobox.tsx
  + src/components/ui/auro-combobox.css
  + src/lib/auro/use-machine.ts
  + src/styles/auro-tokens.css

Install required dependencies:
  npm install @floating-ui/react@^0.27.0
```

Use `--overwrite` to re-copy after editing the registry source.

### 3. Use it

```tsx
import { Combobox } from "@/components/ui/auro-combobox";

const CITIES = [
  { value: "sea", label: "Seattle" },
  { value: "pdx", label: "Portland" },
  { value: "anc", label: "Anchorage", disabled: true },
];

export function CityPicker() {
  const [city, setCity] = useState("sea");
  return <Combobox value={city} onValueChange={setCity} options={CITIES} />;
  // Wrong types are compile errors:  <Combobox value={123} /> → TS error
}
```

All three components support a one-line preset (`<Select options={…} />`) and a full compound-parts
API for custom rendering (`<Select.Root>`, `<Select.Trigger>`, `<Select.List>`, `<Select.Item>`).

### 4. See all components in the dev harness

```bash
cd apps/react-framework && npm run dev:app
# Open http://localhost:5181 → "Auro Next" section at the top
```

The **Auro Next** page (`/auro-next`) shows Checkbox, Select, and Combobox side by side with
controlled, uncontrolled, placeholder, and disabled variants.

---

## Available CLI commands

```bash
node packages/cli/src/index.js list              # list all registry items
node packages/cli/src/index.js add <name>        # copy a component into your app
node packages/cli/src/index.js add <name> --overwrite   # re-copy (replace existing)
node packages/cli/src/index.js init              # one-time app setup
```

---

## Testing

### Headless unit tests (30 tests, no browser)

```bash
cd packages/headless-core && npm test
```

Covers `listbox/nav` navigation helpers and the full combobox machine (filter, keyboard, ARIA output).

### Typecheck the React layer

```bash
cd apps/react-framework && npm run typecheck:auro
```

Compiles only the Auro Next files against strict TS. Exits 0. The whole-app `tsc -b` has
pre-existing errors on legacy Lit pages — use this scoped gate instead.

### Bundle check

```bash
cd apps/react-framework && npx vite build
```

### MCP server (agent surface)

```bash
# From repo root:
node packages/mcp/src/index.js
```

The server is registered in `.mcp.json` as `auro-registry`. Claude Code picks it up automatically.
Agents can call `list_components`, `get_component_details`, and `get_install_command`.

---

## Architecture overview

```
packages/headless-core/   @auro/headless — pure TS state machines, no React, no DOM at load
       ↓ imported by
registry/src/             typed React source (the "source of truth", @/ alias imports)
       ↓ copied by
packages/cli/             auro CLI — resolves deps, copies files, rewrites import paths
                                    ↑ reads same registry
packages/mcp/             MCP server — agents discover and install components
       ↓ copied into
apps/react-framework/     consumer harness (Vite, React 19) — what a consuming app looks like
```

**Key properties:**
- Headless core has no framework deps — a Svelte or Vue adapter reuses the same machines
- No shadow DOM — design tokens cascade directly, `"use client"`-safe for Next.js
- Compound-parts anatomy matches Base UI (`Root/Trigger/Positioner/List/Item`) — the cross-registry
  standard as shadcn migrates from Radix to Base UI
- MCP server is the differentiator — neither Base UI nor Astryx expose a typed agent surface

### Workspace layout

```
packages/headless-core/     @auro/headless
  src/checkbox/machine.ts   tri-state checkbox logic
  src/select/machine.ts     select-only combobox logic
  src/combobox/machine.ts   editable combobox + filter logic
  src/listbox/nav.ts        shared Collection navigation helpers
  src/listbox/aria.ts       shared ARIA prop-builders

packages/cli/               @auro/cli  (bin: auro)
packages/mcp/               @auro/mcp  (bin: auro-mcp, MCP stdio server)

registry/
  registry.json             component index
  items/*.json              per-component metadata (shadcn schema + auro block)
  src/components/ui/        typed React source — auro-checkbox, auro-select, auro-combobox, auro-popover
  src/lib/auro/             use-machine.ts, use-listbox.ts
  src/styles/               auro-tokens.css

apps/react-framework/       consumer harness
  src/pages/AuroNext.tsx    combined demo page  →  /auro-next
```

---

## Design token theming

Components read `--ds-auro-*` CSS variables (e.g. `--ds-auro-select-trigger-border-color`), each
falling back to `var(--ds-basic-color-border-bold, #585e67)` from `@aurodesignsystem/design-tokens`.
`auro init` imports the token bridge at the app root. No shadow DOM means the app-level `--ds-*`
cascade reaches the components directly — no specificity tricks needed.

---

## Further reading

| Doc | What it covers |
|---|---|
| [`AURO_NEXT_POC.md`](./AURO_NEXT_POC.md) | Full architecture, strengths/weaknesses, how to test every feature end-to-end |
| [`AURO_NEXT_COMPOSITION.md`](./AURO_NEXT_COMPOSITION.md) | Design study: how to compose overlay-list components (Select, Combobox, Datepicker) at scale |
| [`AURO_NEXT_REPO_STRATEGY.md`](./AURO_NEXT_REPO_STRATEGY.md) | Research + recommendation on moving to a standalone `auro-next` repo |
