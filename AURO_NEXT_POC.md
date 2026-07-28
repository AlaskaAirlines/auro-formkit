# Auro Next — AI-Friendly, Typesafe Distribution (Proof of Concept)

> Status: **proof of concept**. Additive and isolated — it does **not** modify, replace, or
> deprecate any existing Lit web component. Everything here lives in new workspaces.

## 1. Why this exists

Auro components today are **Lit 3.x web components authored in JavaScript**. That has served the
framework-agnostic goal well (≈157 repos across Alaska consume them), but it creates two problems
for the growing population of React/Next consumers and for the coding agents those teams now use:

1. **Weak type safety.** Because components are authored in JS, the generated `.d.ts` files are
   largely `any`. In the React harness, custom-element props are typed by hand-written
   `declare global` JSX augmentations that are incomplete and conflict with each other (you can see
   this today: `npm run build:app` in `apps/react-framework` fails with `TS2717`/`TS2339` errors on
   `auro-select`, `auro-radio`, `auro-counter`, etc.). Consumers get no real autocomplete, no typed
   events, and no compile-time guarantees.
2. **Not agent-consumable.** A `custom-elements.json` manifest is generated but drives no codegen
   and is not exposed to tools. A coding agent has no structured, typed, self-describing surface to
   discover components, understand their props/events, or install them without hallucinating.

Libraries like **Base UI** and **Astryx** show the React-first ergonomics teams now expect;
**shadcn/ui** shows that what makes a library *agent-friendly* is not its rendering technology but
its **distribution model** — a machine-readable registry + a CLI that copies typed source into the
consumer's repo, plus an MCP server so agents can discover and install components with zero guessing.

**Key insight driving the POC:** the typesafety and AI-friendliness wins come almost entirely from
the **typing + distribution layers**, not from abandoning web components. So this POC keeps the
proven ideas (accessibility logic, design tokens) and rebuilds the *delivery* around types and
tooling.

## 2. What was decided

| Decision | Choice | Rationale |
|---|---|---|
| Framework target | **React-first** (Svelte plausible later) | Where the consumer demand and the typesafety story are strongest. |
| Core architecture | **Framework-free headless core + thin React render layer** (the zag.js / Ark UI model) | A Svelte adapter can later reuse the *same* TS core instead of importing React into Svelte (which is clunky and drags React's runtime into every Svelte app). |
| Distribution | **shadcn-style CLI + registry** — copy typed source into the consumer repo | Most inspectable and agent-friendly; consumers own and can edit the code. |
| Language | **Full TypeScript** for the shipped component + core | Real prop types, typed events/callbacks, exported types. |
| AI surface | **MCP server** exposing the registry | Agents discover, inspect, and install components programmatically. |

## 3. How it works (execution)

```
packages/headless-core   framework-free TS state machine (no React, no DOM at load)
        │  imported by
registry/src/...          the shippable, typed React source (the "source of truth")
        │  copied by
packages/cli  (auro)      reads registry.json / items/*.json, copies + rewrites imports, wires tokens
        │                          ▲
        ▼                          │ reads the same registry
apps/react-framework       packages/mcp (auro-registry)  → agents call list/get/install tools
(consumer harness)
```

### The pipeline, concretely

1. **Headless core** (`@auro/headless`) exposes a pure `connect(state)` that returns
   `rootProps` (role, `aria-checked`, `data-state`, `tabIndex`) plus a `toggle()` transition. No
   framework, no DOM access at module load — so it is reusable by any future adapter.
2. **Registry source** (`registry/src`) is **real, compiling TSX** — not string templates. It is
   type-gated in CI (`registry/tsconfig.json`). Imports use the `@/` alias (shadcn convention).
3. **CLI** (`auro`):
   - `auro init` writes a shadcn-compatible `components.json` and wires the Auro design-token theme
     CSS into the app's entry stylesheet.
   - `auro add <component>` resolves `registryDependencies`, copies each file to its `target`,
     **rewrites `@/…` imports to relative paths** based on where the file lands, merges token
     `cssVars`, and skips install for workspace-linked `@auro/*` deps.
   - `auro list` prints available components.
4. **MCP server** (`@auro/mcp`, id `auro-registry`) reuses the CLI's registry resolver and exposes
   three tools to agents: `list_components`, `get_component_details`, `get_install_command`.

### Registry format

Extends shadcn's schema (`registry.json` + `registry-item.json`) so shadcn's existing agent/registry
tooling interops for free, plus an additive `auro` block carrying typed props, typed events, a11y
contract, and docs. Example (`registry/items/checkbox.json`, abridged):

```jsonc
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "checkbox", "type": "registry:ui",
  "dependencies": ["@auro/headless@*"],
  "files": [
    { "path": "src/components/ui/auro-checkbox.tsx", "type": "registry:ui",   "target": "src/components/ui/auro-checkbox.tsx" },
    { "path": "src/lib/auro/use-machine.ts",         "type": "registry:lib",  "target": "src/lib/auro/use-machine.ts" },
    { "path": "src/styles/auro-tokens.css",          "type": "registry:file", "target": "src/styles/auro-tokens.css" }
  ],
  "cssVars": { "theme": { "--ds-auro-checkbox-checked-bg": "var(--ds-advanced-color-boolean-istrue)" } },
  "auro": {
    "props":  [{ "name": "checked", "type": "boolean | \"indeterminate\"" }],
    "events": [{ "name": "onCheckedChange", "signature": "(checked: boolean) => void" }],
    "a11y":   { "role": "checkbox", "ariaChecked": "tristate", "keyboard": ["Space toggles"] }
  }
}
```

### Theming

The copied component reads component-scoped variables (`--ds-auro-checkbox-*`) defined in the copied
`auro-tokens.css`, each falling back through `var(--ds-…, <hex>)` to the
`@aurodesignsystem/design-tokens` cascade. `auro init` imports the token theme at the app root. There
is **no shadow DOM**, so the app-level `--ds-*` cascade themes copied components directly and there
is no hydration boundary to pierce.

## 4. Directory map

```
package.json                         workspaces: added "registry"
.mcp.json                            registers the auro-registry MCP server

packages/headless-core/              @auro/headless — framework-free TS core
  src/checkbox/machine.ts            connect(), toggle(), isToggleKey(), typed state
  src/index.ts
packages/cli/                        @auro/cli — bin "auro"
  src/index.js                       commander program (init | list | add)
  src/registry.js                    shared, zod-validated registry resolver (also used by MCP)
  src/config.js                      read/write components.json
  src/commands/{init,add,list}.js
packages/mcp/                        @auro/mcp — bin "auro-mcp"
  src/index.js                       MCP stdio server, 3 tools

registry/                            @auro/registry — the source of truth
  registry.json                      component index
  items/checkbox.json                per-item metadata (shadcn schema + auro block)
  tsconfig.json                      CI type-gate for the shippable source
  src/components/ui/auro-checkbox.tsx
  src/components/ui/auro-checkbox.css
  src/lib/auro/use-machine.ts        React binding to @auro/headless
  src/styles/auro-tokens.css         --ds-auro-* token bridge
  src/css.d.ts

apps/react-framework/                consumer harness (React 19 + Vite 8)
  components.json                    written by `auro init`
  tsconfig.auro.json                 scoped typecheck gate for Auro-native files
  src/index.css                      token imports wired by `auro init`
  src/components/ui/auro-checkbox.*  copied by `auro add checkbox`
  src/lib/auro/use-machine.ts        copied by `auro add checkbox`
  src/styles/auro-tokens.css         copied by `auro add checkbox`
  src/pages/AuroCheckboxNative.tsx   demo page (route: /auro-checkbox-native)
```

## 5. Strengths

- **Real, end-to-end type safety.** Props, the `checked: boolean | "indeterminate"` union, and the
  typed `onCheckedChange(checked: boolean)` callback are all inferred — verified by a negative test
  where `checked="nope"` is a genuine compile error (an `any` type would not be).
- **Agent-native.** The MCP server lets a coding agent list components, read typed
  props/events/a11y, and get the exact install command — no hallucinated APIs.
- **Consumers own the code.** Copy-in source means teams can read, debug, and customize the
  component; no black-box version churn.
- **Accessibility baked into the core.** WAI-ARIA `role`/`aria-checked=mixed`/Space-to-toggle live
  in the framework-free machine, so every future adapter inherits it.
- **Design tokens preserved.** Themes off the existing `@aurodesignsystem/design-tokens` `--ds-*`
  cascade; no new theming system to learn.
- **Reuses existing infra.** npm workspaces, Turbo, and the shared `@aurodesignsystem/typescript`
  base config — no new build system.
- **Future multi-framework path is real, not aspirational.** Because the core is framework-free, a
  Svelte/Vue adapter reuses it rather than re-implementing logic.

## 6. Weaknesses & known limitations

- **Single component.** Only `checkbox` is implemented. Breadth (Auro has ~27 components with
  ~217 API surface items) is unproven; complex components (select/combobox/datepicker) will stress
  the headless-core model far more than a checkbox does.
- **CLI/MCP authored in JS, not TS.** Pragmatic for the POC (matches repo convention, no build
  step), but the tooling itself isn't typesafe. Should be ported to TS for production.
- **Local registry only.** The registry resolves from a local monorepo path. No hosted registry,
  versioning, auth, or CDN yet — so external consumers can't `auro add` over the network.
- **Copy-in drift.** Once copied, components diverge from upstream. There is no `auro diff` /
  `auro update` to reconcile local edits with new releases (shadcn has partial answers here).
- **No form-association / validation.** The POC checkbox is presentational + a11y; it does not
  integrate with the existing `@aurodesignsystem/form-validation` or native form submission the way
  the Lit `auro-checkbox` does.
- **`build:app` is not green.** The harness's *pre-existing* pages have broken web-component JSX
  typings, so the whole-app `tsc -b` fails. The POC is validated via a **scoped** typecheck instead
  (see below). This is old debt, not caused by the POC — but it means there is no single green
  whole-repo typecheck today.
- **No automated tests yet.** Verification was manual (typecheck + build + MCP client). No unit
  tests for the machine, no Playwright coverage for the demo page.
- **Design parity unverified.** Visual/interaction parity with the canonical Auro checkbox
  (focus rings, motion, density, dark theme) has not been audited.

## 7. Backwards compatibility

- **Zero impact on existing components.** No Lit component, build script, or published entry point
  was changed. The existing `@aurodesignsystem/auro-*` packages and the `auro-formkit` exports are
  untouched.
- **Additive workspace + config only.** Changes were: adding `"registry"` to the root `workspaces`
  array, three new `packages/*`, a new `registry/` workspace, a new `.mcp.json`, and — inside the
  test harness only — a `components.json`, copied component files, a demo page/route, and a
  `typecheck:auro` script.
- **New packages are `private` and unpublished** (`@auro/*` scope), so nothing new reaches npm.
- **Coexistence is intentional.** The Lit line and this React line can run side by side
  indefinitely; this is a parallel track, not a migration in disguise. Consuming teams that need
  framework-agnostic components keep using the web components with no change.
- **One shared install side effect:** `npm install` was run to link the new workspaces and add the
  MCP SDK; that updates the root lockfile but not any existing package's runtime deps.

## 8. Forward-looking roadmap

**Near term (harden the POC)**
- Add a second, dependency-chaining component (**Counter/NumberField**) to prove the core
  generalizes and that `registryDependencies` resolution works across items.
- Port the CLI + MCP server to TypeScript.
- Add unit tests for the headless machine and a Playwright smoke test for the demo page.
- Add `auro add --overwrite` UX plus a dry-run mode.

**Mid term (make it consumable outside the monorepo)**
- Host the registry as static JSON + source over HTTPS (or GitHub raw), with item versioning.
- Publish an `llms.txt` and per-component docs so non-MCP agents and humans can consume it.
- Add an `add_component` MCP tool (currently read-only: it returns the install command; a write
  variant could shell the CLI under explicit user consent).
- Establish a token-mapping contract so `cssVars` is generated from `@aurodesignsystem/design-tokens`
  rather than hand-authored per item.

**Long term (scale + multi-framework)**
- Generate registry items and typed prop metadata from a single source (e.g. the headless core +
  a schema) instead of authoring each `registry-item.json` by hand.
- Add a **Svelte adapter** reusing the same headless core (validates the framework-free bet).
- Provide an `auro update`/`auro diff` flow to reconcile copied source with upstream releases.
- Decide the coexistence endgame: which components get a React-native line, which stay web
  components, and whether a Lit-wrapper tier is offered for teams that want agnostic + typed.

## 9. How to test the new features

All commands are run from the repo root unless noted. `apps/react-framework` is the consumer harness.

### 9.1 Type-gate the source of truth
```bash
# Framework-free core compiles under strict TS
./node_modules/.bin/tsc -p packages/headless-core/tsconfig.json && echo "headless OK"

# The shippable registry source compiles (this is the CI gate for what consumers receive)
./node_modules/.bin/tsc -p registry/tsconfig.json && echo "registry OK"
```

### 9.2 Exercise the CLI
```bash
# List available components (works from anywhere)
node packages/cli/src/index.js list

# Install into the harness. NOTE: files were already added during the POC, so use --overwrite
# to re-copy, or delete the copied files first to see a clean add.
cd apps/react-framework
node ../../packages/cli/src/index.js init --force          # writes components.json + wires tokens
node ../../packages/cli/src/index.js add checkbox --overwrite
```
Expected: four files copied (`components/ui/auro-checkbox.tsx`, `auro-checkbox.css`,
`lib/auro/use-machine.ts`, `styles/auro-tokens.css`), `@/` imports rewritten to relative paths, and
`src/index.css` gaining the token `@import`s.

### 9.3 Prove the type safety (the core claim)
```bash
# From apps/react-framework — compiles ONLY the Auro-native files with the app's strict config.
npm run typecheck:auro        # exits 0
```
To see that the types are *real* (not `any`), add this to a temp file and typecheck — it must error:
```tsx
import { Checkbox } from "./src/components/ui/auro-checkbox";
<Checkbox checked="nope" onCheckedChange={(c: string) => c} />   // both are compile errors
```

### 9.4 Bundle + run the demo
```bash
cd apps/react-framework
../../node_modules/.bin/vite build     # bundles the component, resolves the token @import
npm run dev:app                        # then open http://localhost:5181/auro-checkbox-native
```
On the page, verify: controlled checkbox reflects state text, the uncontrolled one logs on change,
the indeterminate one shows the mixed (dash) indicator with `aria-checked="mixed"`, the disabled one
is non-interactive, and **Space** toggles the focused checkbox.

> `npm run build:app` (the whole-app `tsc -b`) will still fail on **pre-existing** web-component
> pages. Use `typecheck:auro` for the POC's clean gate; `vite build` proves bundling.

### 9.5 Exercise the MCP server (agent surface)
The server is registered in `.mcp.json` as `auro-registry`. Quick manual check with a stdio client:
```bash
# Create a throwaway client script inside the repo (so it resolves node_modules), then run it:
node - <<'EOF'
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const t = new StdioClientTransport({ command: "node", args: ["packages/mcp/src/index.js"] });
const c = new Client({ name: "test", version: "0.0.0" }); await c.connect(t);
console.log((await c.listTools()).tools.map(x => x.name));
console.log((await c.callTool({ name: "get_component_details", arguments: { name: "checkbox" } })).content[0].text);
await c.close();
EOF
```
Expected tools: `list_components`, `get_component_details`, `get_install_command`. The details call
returns the typed props, the `onCheckedChange` signature, the a11y contract, and the file list.

## 10. Design notes / FAQ

- **Why keep web components at all?** They still uniquely serve framework-agnostic consumers. This
  POC is a *parallel* React-first track, not a replacement. The strategic question (which components
  go React-native vs. stay web components) is deferred to the roadmap.
- **Why copy source instead of an npm package?** Inspectability and agent-friendliness. Agents (and
  humans) reason better about visible source than a versioned black box, and teams can customize.
- **Why `@/` alias in the source but relative imports after copy?** The registry type-checks itself
  via a `@/*` path mapping; the CLI rewrites `@/…` to a relative path at copy time so the consumer
  needs no alias/bundler configuration.
- **Why is `onCheckedChange` `(checked: boolean)` and not `boolean | "indeterminate"`?** A user
  toggle always resolves to a concrete boolean (`indeterminate → true`); `indeterminate` is only a
  controlled *input* state.

## 11. Consumer user stories

These walk through how a consuming team actually adopts an Auro component. The **React** story is
implemented and works today. The **Svelte** story is the *intended* flow the architecture is
designed for — the Svelte adapter is **not built yet** (see roadmap), so its "future" snippets are
illustrative, and today's honest interim is called out.

### 11.1 React / Next.js consumer (works today)

> **Dana** is a React engineer building a booking flow in a Next.js app. She needs an on-brand,
> accessible "I agree to the terms" checkbox, fully typed, and she wants her coding agent to do the
> legwork without inventing an API.

**1 — Discover (via the agent + MCP).** Dana's agent is connected to the `auro-registry` MCP server.
It calls `list_components`, sees `checkbox`, then `get_component_details` and reads back the *typed*
contract — `checked: boolean | "indeterminate"`, `onCheckedChange: (checked: boolean) => void`, the
`role="checkbox"` / Space-to-toggle a11y notes — and the exact files that will be copied. No
guessing, no hallucinated props.

**2 — Install.** The agent runs (or Dana runs) the command the MCP server handed back:
```bash
npx auro init          # one-time: writes components.json, wires Auro design tokens into the app
npx auro add checkbox  # copies typed source into the repo, rewrites imports, merges token vars
```
Files land at `src/components/ui/auro-checkbox.tsx` (+ its CSS), `src/lib/auro/use-machine.ts`, and
`src/styles/auro-tokens.css`. The token `@import`s are added to the app's entry stylesheet.

**3 — Use it — with real types.** Dana imports the component like any local component:
```tsx
import { useState } from "react";
import { Checkbox } from "@/components/ui/auro-checkbox";

export function TermsGate() {
  const [agreed, setAgreed] = useState(false);
  return (
    <Checkbox checked={agreed} onCheckedChange={setAgreed}>
      I agree to the terms
    </Checkbox>
  );
  // setAgreed is (boolean) => void — types line up with onCheckedChange automatically.
  // <Checkbox checked="yes" /> would be a COMPILE ERROR, not a runtime surprise.
}
```
Autocomplete lists `checked`, `defaultChecked`, `disabled`, `onCheckedChange`. The tri-state
`checked="indeterminate"` renders the mixed indicator with `aria-checked="mixed"`.

**4 — Theme & customize.** It already themes off the app's `--ds-*` token cascade. Because the source
lives in Dana's repo, she can tweak the markup or CSS directly — e.g. adjust spacing — without
forking a package or waiting on an Auro release.

**5 — Ship with confidence.** `npm run typecheck:auro` (the scoped gate) passes; `vite build`
bundles it. No `declare global` JSX shims, no `any` props.

**SSR note:** the headless core touches no DOM at module load and the component is
`"use client"`-safe, so it drops into a Next.js app without hydration mismatches (an advantage over
shadow-DOM web components).

### 11.2 Svelte / SvelteKit consumer

> **Sam** is a SvelteKit engineer who wants the *same* Auro checkbox — same behavior, same tokens,
> same accessibility — in a Svelte app, typed with Svelte's TS support.

**Today (interim, honest):** there is **no Svelte render layer in this POC**. Sam's realistic options
right now are:
- Consume the **existing Auro web component** (`<auro-checkbox>` from `@aurodesignsystem/auro-formkit`)
  directly — Svelte handles custom elements natively, so this works, but Sam gets the *old* weak
  typing story (no typed props/events) and a shadow-DOM boundary.
- Wait for the planned Svelte adapter below.

**Intended future flow (planned — not yet implemented):** the CLI grows a framework flag that copies
a Svelte render layer which imports the **exact same** framework-free core:
```bash
npx auro add checkbox --framework svelte   # PLANNED — copies a .svelte layer over @auro/headless
```
```svelte
<!-- src/lib/components/AuroCheckbox.svelte  (illustrative, planned) -->
<script lang="ts">
  import { connect, toggle, type CheckedState } from "@auro/headless/checkbox";
  export let checked: CheckedState = false;
  export let disabled = false;
  const dispatch = createEventDispatcher<{ checkedChange: boolean }>();

  $: api = connect({ checked, disabled });
  function onClick() {
    if (disabled) return;
    checked = toggle(checked);
    dispatch("checkedChange", checked);
  }
</script>

<label class="auro-checkbox">
  <span class="auro-checkbox__control" role="checkbox"
        aria-checked={api.rootProps["aria-checked"]}
        tabindex={api.rootProps.tabIndex}
        on:click={onClick} on:keydown={(e) => e.key === " " && onClick()}>
    <!-- indicator -->
  </span>
  <slot />
</label>
```
```svelte
<!-- usage (planned) -->
<script lang="ts">
  import AuroCheckbox from "$lib/components/AuroCheckbox.svelte";
  let agreed = false;
</script>
<AuroCheckbox bind:checked={agreed} on:checkedChange={(e) => (agreed = e.detail)}>
  I agree to the terms
</AuroCheckbox>
```

**Why this is the right shape, and why *not* "import the React component into Svelte":** the value is
that the Svelte layer reuses `@auro/headless` — identical toggle logic, `aria-checked` computation,
and token variables — so behavior and accessibility can't drift between frameworks. Importing the
React component into Svelte (via `svelte-preprocess-react` or manual `ReactDOM` mounting) is
technically possible but drags React's runtime into every Svelte bundle and loses Svelte's
reactivity/SSR ergonomics — so it is explicitly a non-goal.
