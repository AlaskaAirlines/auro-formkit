# Auro Next — Repo Strategy

> Research question: should `auro-next` (the React-first, typesafe, AI-friendly distribution) live
> in a new standalone repo, or be built as an additive layer inside the existing Lit formkit repo?

## Verdict: new standalone repo

All three research threads converge on the same answer. The section below explains why and what it
should look like.

---

## What the research found

### Base UI (base-ui.com)

Base UI (`@base-ui/react`) is an unstyled React component library from MUI — standalone repository
`github.com/mui/base-ui`, fully separated from `material-ui`. Material UI and Joy UI are its
consumers; it only owns behavior + a11y, no bundled CSS. Key facts verified from the site:

- **pnpm** + `pnpm-workspace.yaml` for workspaces
- **Vitest** + **Vite** for testing and the dev harness
- **Standard npm package** (`@base-ui/react`) — not a copy-in registry
- **Compound-parts anatomy** (Root / Trigger / Value / Positioner / Popup / List / Item / Backdrop / Arrow / Group / Separator / …) — the same anatomy our POC already uses
- **Three distinct components**: Select (button trigger), Combobox (filterable, predefined options only, no free-form text), and Autocomplete (free-form text + search) — all siblings, not a hierarchy

**shadcn/ui is migrating from Radix UI to Base UI** (announced 2024, ongoing). This means Base UI's
part naming is becoming the cross-registry standard. Our compound-parts naming (`Root/Trigger/
Positioner/List/Item`) already aligns — which means auro-next components will feel native in both
registries without any renaming.

No MCP server or AI tooling — that's a gap we fill.

### Astryx (Meta)

Astryx is a standalone repo owned by Meta/Facebook. Their defining pattern is
**hook-first composition**: behavioral hooks are the primary abstraction, not the DOM tree — every
complex component exposes a suite of hooks so consumers can re-compose the behavior in any layout.
They distribute via scoped npm packages (`@astryxdesign/core`), not copy-in. No MCP tooling.

Their structural lesson: going standalone let them version independently, maintain a distinct
identity, and build without carrying legacy coupling. Their recommendation (paraphrased) was
*standalone repo, hook-first, with existing primitives as optional lower-level building blocks — not
as the source of truth*.

### Coupling analysis of the existing POC

The POC packages (`headless-core`, `cli`, `mcp`, `registry/`, `apps/react-framework`) have
**zero imports from any Lit component**. The only `@aurodesignsystem/*` reference in the POC is
`@aurodesignsystem/design-tokens` — a consumer peer dependency that stays correct in a new repo
(consumers install it). The TypeScript base config comes from `@aurodesignsystem/typescript`, a
published package trivially replicable with a single inline `tsconfig.base.json`. The
`react-framework` app has a `file:../..` link to `auro-formkit` for legacy test pages — that
link dies cleanly on extraction since those pages stay behind.

In short: the POC is already a logically separate codebase. The monorepo boundary is incidental,
not architectural.

---

## Why not stay in formkit?

| Concern | Reality |
|---|---|
| "It shares infra so staying is free" | Only tsconfig base and Turbo are shared — both trivially replicated. |
| "Design tokens tie them together" | Tokens are a *consumer* peer dep in both repos — the relationship is correct either way. |
| "Fewer repos to maintain" | The two repos have different release cadences, contributors, and audiences. One Turbo graph serving both creates confusion about what builds what. |
| "We can merge later" | We can, but the coupling grows over time. Separating now is cheaper than separating later. |

The harder question is: what does staying cost? The answer is **friction that compounds**. Every
new auro-next component will raise questions about the Turbo pipeline, the shared tsconfig scope,
what `npm run build` means, and whether a Lit CI fix can break the React build. A standalone repo
eliminates the entire class of "which repo is this a problem for?" questions.

---

## Recommended stack for `auro-next`

Based on what Base UI and Astryx chose, plus what already works in the POC:

| Layer | Choice | Rationale |
|---|---|---|
| Package manager | **pnpm** + `pnpm-workspace.yaml` | Base UI's choice; better workspace dedup, faster installs, strict phantom-dep prevention. |
| Task runner | **Turbo** (simplified) or **Nx** | POC already uses Turbo; for initial scale, Turbo is lighter. Can graduate to Nx. |
| Build (packages) | **tsup** | Zero-config, esbuild-backed; ideal for the headless-core and cli packages. |
| Build (harness) | **Vite** | Already in use and works well. |
| Test runner | **Vitest** | Already adopted (30 passing tests). Base UI uses it too. |
| Language | **TypeScript strict** throughout | Already in place; keep `erasableSyntaxOnly`, `verbatimModuleSyntax`. |
| Distribution | **shadcn-style CLI + registry** | This is the differentiator vs. Base UI and Astryx (both npm-only). Copy-in = agent-friendly, inspectable, customizable. |
| AI surface | **MCP server** | Neither Base UI nor Astryx have this — it's our unique advantage. |
| Versioning | **Changesets** | Standard for pnpm monorepos; pairs with npm publish when the time comes. |
| Linting | **ESLint flat config + `@typescript-eslint`** | Already used; bring the config inline rather than extending the formkit package. |

---

## What moves to `auro-next`

Everything in the POC — no surgery required:

```
packages/headless-core/     → packages/headless-core/
packages/cli/               → packages/cli/
packages/mcp/               → packages/mcp/
registry/                   → registry/
apps/react-framework/       → apps/react-framework/  (strip legacy Lit demo pages)
```

Replicate, don't share:

```
@aurodesignsystem/typescript/base.json  →  tsconfig.base.json  (copy the relevant options inline)
turbo.json                              →  turbo.json           (same structure, fewer pipelines)
.eslintrc / prettier                    →  inline configs
```

Keep in `auro-formkit` (do not move):

```
components/          All Lit web components
packages/form-validation, utils, build-tools
```

---

## Relationship between the two repos after the split

```
auro-formkit   (existing, unchanged)
  └─ @aurodesignsystem/auro-*      Lit web components, npm published

auro-next      (new standalone repo)
  └─ @auro/headless                framework-free TS machines
  └─ @auro/cli                     "auro add" copy-in CLI
  └─ @auro/mcp                     MCP server (auro-registry)
  └─ registry/                     typed React source of truth

Both repos consume:
  └─ @aurodesignsystem/design-tokens   (peer dep — same --ds-* token cascade)
```

The repos are **parallel tracks**, not a hierarchy. Teams that need framework-agnostic components
keep using the web components from `auro-formkit`. Teams building React/Next apps use `auro-next`.
Neither repo imports from the other at build time.

---

## What this unlocks

- **Independent versioning.** Auro-next can ship v1.0 without gating on any Lit release.
- **Clean CI.** One Vitest + typecheck + registry-tsc pipeline, no legacy web-component JSX
  conflicts (the pre-existing `tsc -b` failures in the harness disappear entirely).
- **Clearer contributor story.** React engineers land in a React-first repo; Lit engineers stay
  in formkit. No context-switching.
- **Agent-first from day one.** The MCP server is a first-class citizen in the new repo's
  `.mcp.json`, not an afterthought bolted to a Lit build system.
- **pnpm strict mode.** Phantom dependencies that are hidden by npm hoisting will surface
  immediately, producing a cleaner, more honest dependency graph.

---

## One open question

The design-token CSS vars (`--ds-auro-*`) are currently hand-authored per component (e.g.
`--ds-auro-select-trigger-border-color: var(--ds-basic-color-border-bold)`). In a standalone repo
this should be generated from `@aurodesignsystem/design-tokens` rather than maintained by hand —
that's the mid-term token-mapping work already flagged in `AURO_NEXT_POC.md §8`.

---

*Research inputs: Base UI repository analysis (github.com/mui/base-ui), Astryx documentation
(astryx.atmeta.com/components), coupling audit of the existing POC packages.*
