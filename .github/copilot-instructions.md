# Copilot Instructions for auro-formkit

<!--
  Why this file exists and what each section does:

  - Project Overview / Structure — Without this, Copilot doesn't know where to put new files
    or where to look for existing code. Prevents suggestions like "create a new package" when
    you meant "add to an existing component."

  - Tech Stack — Stops Copilot from suggesting React patterns, CommonJS require(), or older
    Node APIs. Anchors all suggestions to Lit + ES modules + Node 22.

  - Component Architecture — Ensures generated components extend AuroElement (not raw
    LitElement), use the register() pattern, and import styles from -css.js files.

  - JavaScript Style — The underscore-prefix convention (_index not #index) and "no TypeScript
    in source" rule are non-obvious. Without explicit instruction, Copilot defaults to #private
    fields and adds TS annotations.

  - Code Comments — Without this, Copilot rewrites existing comments to match its own grammar
    and style preferences, creating noisy diffs with no functional value. This section draws
    the line: leave wording alone, but do fix comments that misrepresent what the code does.

  - Naming — Event names like auroMenu-selectedOption follow a specific pattern. Without this,
    Copilot invents inconsistent names.

  - Lit Patterns — static get properties() vs decorators is a hard fork in Lit style. Copilot
    defaults to decorators (@property()) unless told otherwise.

  - Commands — When asked to run tests or build, Copilot knows the exact commands rather than
    guessing.

  - Testing Guidance — Tells Copilot which test framework to use (WTR vs Playwright), where
    test files go, and to test behavior not internals.

  - Commit Messages — Ensures Copilot generates conventional commit format (fix(menu): ...)
    rather than freeform messages.

  - Important Patterns — Domain-specific patterns (selection delegation, dynamic options,
    nested menus) that are unique to this codebase and not part of Copilot's general training.

  - Code Review Guidance — Mirrors the repository's /code-review skill so Copilot's PR review
    gathers the same context (post-mortem + TRD), reviews from the same adversarial personas,
    and applies the same review guidelines and severity tags. Keeps automated and skill-driven
    reviews consistent.

  Guiding principle: document anything where the "obvious" default would be wrong for this
  project. If Copilot would naturally do the right thing, it doesn't need to be here.
-->

## Project Overview

This is a monorepo (`@aurodesignsystem/auro-formkit`) containing Lit-based web components for building forms. It uses npm workspaces and Turborepo for orchestration.

### Structure

- `components/` — Individual web components (menu, select, combobox, datepicker, input, counter, checkbox, radio, dropdown, form, helptext, bibtemplate), plus `layoutElement`, which holds the shared `AuroElement` base class rather than a form component
- `packages/` — Shared tooling (build-tools, config, form-validation, typescript, utils, version)
- `apps/react-framework/` — React integration app with Playwright tests
- `apps/svelte-framework/` — Svelte integration app with Playwright tests
- `apps/shared/` — Shared Playwright test suites used by both framework apps

## Tech Stack

- **Components**: Lit (LitElement / html / css), ES modules
- **Base class**: `AuroElement` (extends LitElement, lives in `components/layoutElement/src/auroElement.js`)
- **Testing**: Web Test Runner (unit tests per component), Playwright (integration/framework tests in `apps/`)
- **Build**: Turborepo, Rollup, custom build tooling in `packages/build-tools`
- **Node**: v22 (see `.nvmrc`)
- **Package manager**: npm 11+

## Coding Conventions

### Component Architecture

- Each component lives in `components/<name>/src/` with a main class file (e.g., `auro-menu.js`).
- Components use the `AuroElement` base class, not raw `LitElement`.
- Registration uses a static `register()` method pattern for tag name versioning.
- Dependency versioning is handled via `AuroDependencyVersioning` for sub-component tag names.
- Styles are imported from pre-built `-css.js` files (generated from SCSS/CSS during build).

### JavaScript Style

- ES module syntax (`import`/`export`), no CommonJS.
- No TypeScript in component source (plain JS with JSDoc annotations).
- Private properties use underscore prefix (`_index`, `_selectedKey`) — not `#private` fields.
- Prefix private methods with underscore (e.g., `_assignOptionKeys()`).
- Use `@private` JSDoc tag for internal properties/methods.
- Avoid adding TypeScript type annotations or docstrings to code you didn't modify.

### Code Comments

- Do **not** rewrite, rephrase, or nitpick existing comments for grammar, style, or wording preferences. This churn adds no value.
- **Do** flag or fix a comment if it incorrectly describes the functional behavior of the code it documents (e.g., wrong parameter description, outdated explanation of logic, misleading return value docs).
- When writing new comments, match the voice and style of surrounding comments rather than imposing a different convention.

### Naming

- Component classes: `Auro<Name>` (e.g., `AuroMenu`, `AuroSelect`, `AuroCombobox`)
- Custom element tags: `auro-<name>` (e.g., `auro-menu`, `auro-select`)
- Events: `auro<Component>-<eventName>` (e.g., `auroMenu-selectedOption`, `auroSelect-valueSet`)
- Boolean attributes: no `is` prefix, reflect to attribute (e.g., `disabled`, `loading`, `multiSelect`)

### Lit Patterns

- Use `static get properties()` (not decorators) for property declarations.
- Use `reflect: true` for attributes that should be observable externally.
- Use `attribute: false` for internal-only reactive properties.
- Lifecycle: `connectedCallback` → `firstUpdated` → `updated(changedProperties)`.
- Event listeners are added in `connectedCallback` and removed in `disconnectedCallback`.

## Commands

| Task | Command |
|------|---------|
| Install | `npm install` |
| Build all | `npm run build` |
| Build (skip cache) | `npm run build:force` |
| Dev server (component) | `cd components/<name> && npm run dev` |
| Dev server (React app) | `npm run dev:react` |
| Dev server (Svelte app) | `npm run dev:svelte` |
| Lint | `npm run lint` |
| Unit tests (all) | `npm run test:wtr` |
| Unit tests (single) | `cd components/<name> && npm run test` |
| Framework tests (React) | `npm run test:framework:react` |
| Framework tests (Svelte) | `npm run test:framework:svelte` |
| Analyze (custom elements manifest) | `npm run analyze` |

## Testing Guidance

- Unit tests for each component live in `components/<name>/test/`.
- Unit tests use Web Test Runner with `@open-wc/testing`.
- Framework integration tests live in `apps/shared/` as `.suite.ts` files and are imported by both `apps/react-framework/tests/` and `apps/svelte-framework/tests/`.
- Playwright tests use a coverage fixture from `apps/shared/coverage-fixture.ts`.
- When writing tests, prefer testing observable behavior (attributes, events, DOM state) over internal implementation details.

## Commit Messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint. Format:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`

Scope is typically the component name (e.g., `menu`, `select`, `combobox`).

## Important Patterns

### Selection Tracking (Menu)

- `auro-menu` manages selection state (`value`, `optionSelected`).
- `auro-select` and `auro-combobox` delegate selection entirely to their child `auro-menu`.
- In multi-select mode, `value` is a JSON-serialized array of strings.
- Options can be `disabled`, `static` (non-interactive), `hidden` (filtered but still selectable by value), or `persistent` (always visible regardless of filter).

### Dynamic Options (Combobox)

- Combobox filtering hides/shows options via the `hidden` attribute.
- In dynamic-options patterns, frameworks replace the entire slot content on each keystroke.
- `slotchange` events trigger re-initialization of the menu's item list.

### Nested Menus

- Nested `auro-menu` elements set `role="group"` and delegate selection to the root menu.
- The root menu's `initItems()` collects all options (including nested) via deep `querySelectorAll`.
- `rootMenu` flag distinguishes the root from nested submenus.

## Code Review Guidance

When reviewing a pull request, follow the same process the repository's `/code-review` skill uses, so Copilot's review and the skill-driven review stay consistent.

> **Maintainers:** this section intentionally duplicates the review guidance in [`.claude/skills/code-review/SKILL.md`](../.claude/skills/code-review/SKILL.md) (personas, review checklist, "Do not flag", the convergence rule, post-mortem/TRD validation, and severity tags). The two are not auto-synced — when you change the review rules in one, update the other in the same PR so the skill-driven and Copilot reviews don't drift apart.

### Gather context first

Before reviewing the diff, gather the supporting context that describes the intended design and constraints:

1. Parse the PR's commit messages for `AB#` references (ADO work items).
2. For each ticket, read the post-mortem at `docs/post-mortem/<ticket_number>.md` if it exists. Then **walk references recursively** — scan each post-mortem for links or filenames pointing to other post-mortems (`docs/post-mortem/<other>.md`) or `AB#` / `#<PR>` references, and read those too, until no new references remain.
3. Also read a post-mortem matching the PR number (`docs/post-mortem/<PR>.md`) if present, applying the same recursive walk.
4. Read any documents under `context/` that reference the ticket or PR number.
5. Check the post-mortems for a linked TRD — a GitHub Discussion, e.g. `https://github.com/orgs/AlaskaAirlines/discussions/<number>`. TRDs describe the *planned* approach; the implementation may deviate, and deviations are expected but must be documented in the post-mortem. If a TRD is linked but its content is not available to you, note that the TRD-deviation check was skipped rather than claiming there were no deviations. If no TRD is linked, note "No TRD linked" — informational only, not a finding.

Use the TRD, post-mortem(s), and context docs as review context — they describe the intended design, known issues, root causes, and constraints the PR must respect.

### Review from multiple personas

Be adversarial. Review the diff from each persona below in turn, then reconcile their findings into a single consensus list. Find any gaps, performance, security, or other concerns. Assume every code path will be hit in production.

| Persona | Focus | Catches what others miss |
|---------|-------|--------------------------|
| **Consumer developer** | "Can I use this component correctly with just the docs and API?" | Unclear APIs, missing examples, surprising defaults, undocumented side effects |
| **Framework integrator** | "Does this work in my React/Svelte/Angular app?" | Property vs attribute mismatches, lifecycle conflicts with framework rendering, event bubbling through shadow DOM |
| **Accessibility auditor** | "Can a screen reader user operate this?" | Missing ARIA attributes, broken focus management, keyboard traps, missing live regions |
| **Performance engineer** | "Will this cause jank at scale?" | Unnecessary re-renders, layout thrashing, unbounded DOM queries, missing debounce on frequent events |
| **Security reviewer** | "Can this be exploited?" | innerHTML with user input, XSS vectors in slot content, unsafe URL handling |
| **QA engineer** | "What test is missing that would catch a regression?" | Untested branches, missing edge case coverage, no integration test for the happy path |
| **Future maintainer** | "Will I understand this code in 6 months?" | Missing comments on non-obvious logic, undocumented workarounds, coupling that makes refactoring dangerous |
| **Release manager** | "Is this safe to ship?" | Incorrect semver signals, missing BREAKING CHANGE, undocumented post-mortem deviations |
| **Staff engineer** | "Does this scale architecturally and set the right precedent?" | Abstraction leaks, tight coupling between components, patterns that will be copy-pasted incorrectly, decisions that constrain future work, inconsistency with established codebase conventions |

### What to review for

1. **Bugs** — logic errors, off-by-one mistakes, null/undefined access, race conditions, incorrect boolean logic, silent failures
2. **Security issues** — injection, XSS, leaked secrets, unsafe DOM operations, innerHTML misuse
3. **Regressions** — behavior that worked before and would break with this change, events that stop firing, attributes that stop reflecting
4. **Edge cases** — unhandled states, empty arrays, missing null checks at boundaries, rapid sequential calls, zero-length inputs, undefined slot content, options with duplicate values
5. **SPA lifecycle issues** — memory leaks from event listeners not removed in `disconnectedCallback`, stale references after DOM detach/reattach, components that break on hot-module replacement, state that persists incorrectly across route navigations
6. **Framework integration** — behavior when React re-renders and recreates child elements mid-lifecycle, Svelte `{#key}` blocks destroying and remounting the component, framework-driven attribute updates that race with internal state, `slotchange` events firing multiple times during framework reconciliation, property vs attribute binding mismatches
7. **Code clarity** — new or changed code that lacks comments explaining *what* it does and *why*. Another engineer reviewing this code should be able to understand the intent without tracing through the full call chain. Flag uncommented complex logic, non-obvious conditionals, workarounds, and magic values as 🟡 **Nit**.
8. **Test coverage** — validate that new or changed code has adequate test coverage:
   - **WTR unit tests** (`**/test/`): every new branch, conditional, and code path in the diff should have a corresponding unit test. Read the existing test files for the changed component(s) and flag any new logic that is not exercised. Flag missing coverage as 🟡 **Nit** for minor gaps or 🔴 **Bug** if a critical path (error handling, selection state, event dispatch) has no test at all.
   - **Playwright framework tests** (`**/*.suite.ts`): if the change affects user-facing behavior (selection, keyboard navigation, value display, dropdown open/close), check whether a shared Playwright suite covers the scenario. Flag missing integration test coverage for behavioral changes as 🟡 **Nit**.
   - **Storybook stories** (`**/stories/`): if new public API surface is added (attributes, slots, events), check whether a corresponding story exists. Flag missing stories as 🟡 **Nit**.
9. **Documentation accuracy** — check that existing documentation reflects the code changes in this PR:
   - **JSDoc comments**: verify that parameter descriptions, return types, and method/property docs on changed code are accurate to the new behavior. Flag stale or incorrect JSDoc as 🟡 **Nit**.
   - **API docs** (`components/<name>/docs/`): if public attributes, events, slots, or CSS parts are added, removed, or changed, verify the API docs account for it. Flag missing or outdated API docs as 📄 **Documentation**.
   - **Demo files** (`**/demo/`): if the change alters user-facing behavior or adds new features, check whether demo examples still accurately represent how the component works. Flag broken or misleading demos as 📄 **Documentation**.
   - **README**: if the component's README references behavior that this PR changes, flag the stale content as 📄 **Documentation**.

**Think about:**
- What happens if this component is mounted, unmounted, and remounted rapidly?
- What happens if slot content is replaced while an async operation is in flight?
- What happens if a framework sets a property before the element is connected to the DOM?
- What happens if `updated()` triggers a re-render that triggers another `updated()` cycle?
- What if the consumer sets `value` programmatically at the same time the user clicks an option?

**Do not flag:**
- Style, formatting, or naming preferences
- Comment grammar or wording choices
- Refactoring suggestions (unless the refactor would improve performance, fix a bug, or prevent a regression)

**Converge — do not manufacture findings.** This review is deliberately adversarial and non-deterministic: re-running it on an unchanged diff will keep surfacing *new low-value nits*, because the personas sample different angles each pass and "consider also…" suggestions are effectively unbounded. Genuine 🔴 correctness/security/regression findings converge to zero and stay there across runs; 🟡 nits do not. **An empty-handed pass is a correct, expected outcome — not a failure.** Do not reach for marginal nits to look productive. When only low-value polish remains, say so plainly: report the diff as clean and note that any remaining suggestions are optional. Prefer "✅ No blocking issues — remaining suggestions are optional polish" over inventing a finding. Only surface a nit you would genuinely act on if it were your own code.

### Post-review validation

After the code review, also validate the PR's commits and required documentation — this is what backs the Release-manager persona's concerns.

**Commit messages**
- **Traceability:** flag any commit with no `AB#` reference as a 🟡 **Nit** — commits should map to a work item. A commit may instead reference the PR itself (`#<PR>`) in place of an `AB#`.
- **Conventional Commits prefix:** each commit's prefix (see the **Commit Messages** section above for the allowed types) must match the nature of its changes. When a commit spans categories, priority is `feat` > `fix` > all others. A prefix that doesn't match its content (e.g. `docs:` on a source change, or `fix:` on a test-only change) is a 🔴 **Commit Syntax** finding — wrong prefixes distort semver and release notes.
- **Tooling is never a feature:** a commit confined to `.claude/` tooling (skills, commands, hooks, agents, settings) must use `chore`, never `feat`/`fix`/`perf` — these files aren't in the published npm package, so a bump-triggering prefix causes a spurious release. Flag as 🔴 **Commit Syntax** and recommend `chore`. When a commit mixes tooling with real library changes, the library changes decide the prefix.
- **Breaking changes:** if the PR changes the public API (removed/renamed attributes, changed event names or payloads, removed public methods/properties, changed default behavior, altered slot contracts), at least one commit must declare `BREAKING CHANGE`. An undeclared breaking change is a 🔴 **Commit Syntax** finding (release-blocking). A `BREAKING CHANGE` declared when no real breaking change exists is also 🔴 **Commit Syntax** — it forces an unnecessary MAJOR bump.

**Post-mortem documentation** (using the post-mortem chain gathered in "Gather context first")
- **Missing post-mortem:** if no post-mortem exists for the change (`docs/post-mortem/<ticket>.md` or `docs/post-mortem/<PR>.md`), flag 🔴 **Documentation**. A missing post-mortem is **always** a release blocker — the requirement is unconditional, with no exemption by change type. Tooling (`.claude/**`), CI, and docs-only changes need a post-mortem too, because it records the final solution and lessons learned regardless of semver impact.
- **Undocumented TRD deviation:** if a TRD was linked and its content is available (see context step 5; skip this check if it was not), compare the TRD's planned approach against the diff. If the implementation deviates and the post-mortem doesn't explain why, flag 🔴 **Documentation**, listing each specific unaccounted-for item.
- **Filename match:** a new post-mortem under `docs/post-mortem/` must be named for the ADO ticket (`<ticket>.md`) or PR (`<PR>.md`) it documents; otherwise flag 🔴 **Documentation**.
- **No pinned self-SHAs:** if a post-mortem identifies its own change by a pinned commit SHA, flag 📄 **Documentation** and recommend stable handles instead (commit subject + branch + PR) — the branch is amended and squash-merged, so the SHA goes stale and dangles. Don't flag SHAs pointing at already-merged commits on other branches, or intentional permalinks.

### Severity tags

Tag each finding with a severity prefix so it lines up with the guidelines above:
- 🔴 **Bug** — a correctness, security, or regression issue that should be fixed before merging
- 🟡 **Nit** — minor, worth noting but not blocking
- 🔴 **Commit Syntax** — incorrect Conventional Commits prefix, or a missing/false `BREAKING CHANGE` declaration
- 🔴 **Documentation** — release-blocking documentation gap (missing post-mortem, undocumented TRD deviation)
- 📄 **Documentation** — non-blocking documentation accuracy issue (outdated API docs, demos, README, or a pinned self-SHA in a post-mortem; JSDoc gaps are 🟡 **Nit**, not 📄)
