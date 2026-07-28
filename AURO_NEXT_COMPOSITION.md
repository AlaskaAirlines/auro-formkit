# Auro Next — Composing "Combo'd" Components (Select, Combobox, and beyond)

> Companion to [`AURO_NEXT_POC.md`](./AURO_NEXT_POC.md). This document is a **design study**, not
> shipped code. It captures the consensus of a multi-agent investigation into the most scalable way
> to build classically-composed overlay-list components (select, combobox, menu, datepicker) in the
> greenfield **headless-core + thin React render layer** model, following the **Base UI** and
> **Astryx** approach. No existing Lit component is modified by anything described here.

## 1. Problem statement

In the current Auro (Lit) system, `auro-combobox` is a **composite web component**: it nests
`auro-dropdown` + `auro-input` + `auro-menu`/`auro-menuoption`, pulls in `auro-bibtemplate` and
`auro-helptext`, and integrates the `@aurodesignsystem/form-validation` engine. `auro-select` and
`auro-datepicker` compose the *same* dropdown + input + validation shell, swapping only the popup
body (menu vs. menu vs. calendar). This DOM-level composition — real custom elements nested inside
each other's shadow roots — is the source of most of the accessibility and focus complexity in the
codebase (cross-shadow-root `aria-activedescendant`, live-region mirroring, manual focus delegation,
and a battery of re-entrancy guards).

The greenfield POC ([`AURO_NEXT_POC.md`](./AURO_NEXT_POC.md)) shipped `checkbox` and `select` on a
different model: a framework-free state machine + a thin React render layer, distributed shadcn-style.
The POC doc already flags composition as **"seeded, not finished."** This study answers the open
question directly:

> **What is the best, most scalable way to build composited components like select and combobox in
> this new model — decouple them, share helper functions, or share primitives? And does the model
> hold up when a component (combobox) classically imported many other formkit components?**

The short answer, validated against the libraries we're explicitly emulating: **decouple the
machines, share the logic through pure modules, and share the render layer through primitives.** All
three are true at once, at different layers. The rest of this document is the evidence and the plan.

## 2. How the leaders solve it

We surveyed the libraries the POC is modeled on, plus the canonical headless-state-machine library.

| Library | Select vs. Combobox | What is shared | Takeaway for us |
|---|---|---|---|
| **Base UI** (base-ui.com) | Select is standalone; **Combobox and Autocomplete share one core** (`AriaCombobox`, differentiated by a `selectionMode` param). | A **compound-parts anatomy** (`Root · Trigger · Value · Positioner · Popup · List · Item · Group · Separator …`) and a shared `useAnchorPositioning` (Floating UI) layer. `Positioner/Popup/List/Item/Group` are structurally identical across Select and Combobox. | Adopt its **anatomy naming** and its **shared positioning + listbox layer**. |
| **Astryx** (astryx.atmeta.com) | Same family: compound, parts-based combo components. | Parts-based composition; primitives shared across the overlay-list family. | Confirms the parts model is the house style we want to match. |
| **Ark UI / zag.js** (ark-ui.com, zagjs.com) | **Three separate machines**: `select`, `combobox`, **and a distinct `listbox` machine**, plus a shared `@zag-js/collection` data layer. Combobox does **not** derive from select. | `listbox` (navigation/highlight) and `collection` (typed data + next/prev helpers) are shared *modules*; each component owns its own state chart. | This is our exact model. **Separate machines that import shared modules** — not one machine with flags. |
| **Downshift** | Explicit `useSelect` vs. `useCombobox` hook split. | Deliberately separate hooks. | Reinforces: keep the two APIs siblings, not an inheritance. |
| **Radix UI** | Separate Select and Combobox (Combobox via community/`cmdk`). | Popper/Portal primitives shared. | Same shape as Base UI. |

**Where the leaders disagree:** Base UI unifies Combobox+Autocomplete under one core while keeping
Select separate; zag keeps all three fully separate. **Our pick:** follow **zag's machine separation**
(small, readable state charts — which is also better for AI legibility, a core POC goal) *and* Base
UI's **shared-primitive render layer** (the expensive positioning/listbox/a11y wiring written once).
Best of both.

Sources: [Base UI Select](https://base-ui.com/react/components/select) ·
[Base UI Combobox](https://base-ui.com/react/components/combobox) ·
[Base UI Autocomplete](https://base-ui.com/react/components/autocomplete) ·
[Base UI selection internals](https://deepwiki.com/mui/base-ui/4-selection-components) ·
[zag Select](https://zagjs.com/components/react/select) ·
[zag Combobox](https://zagjs.com/components/react/combobox) ·
[@zag-js/collection](https://www.npmjs.com/package/@zag-js/collection) ·
[Ark UI Combobox](https://ark-ui.com/docs/components/combobox) ·
[Downshift hooks](https://www.downshift-js.com/hooks/) ·
[Astryx components](https://astryx.atmeta.com/components).

## 3. What Auro's Lit combobox composes today (and what must survive)

Audit of `components/combobox/src/auro-combobox.js` and siblings. This is what a rebuild must
account for — it is *not* all "logic," and separating the concerns is the whole point.

| Lit combobox piece | What it does today | Greenfield provision |
|---|---|---|
| `auro-dropdown` | Popup shell: Floating UI positioning, open/close, `matchWidth`, desktop-popover ↔ mobile-fullscreen `<dialog>` switching, toggle events. | **Shared `popover`/positioner primitive** (Floating UI) + a fullscreen-dialog adapter. |
| `auro-input` (×2: trigger + a second one inside the fullscreen bib) | The typeahead text field, clear button, masking, and the `aria-activedescendant`/`aria-expanded`/`aria-controls` plumbing. | **Component-specific** `Combobox.Input` over a shared text-field primitive. The dual-input is a fullscreen-adapter concern. |
| `auro-menu` + `auro-menuoption` (slotted) | The listbox: selection model (`value`, index, `makeSelection`), highlight, `loading`, multi-select capability, option events. | **Shared `listbox` primitive + selection logic.** Reuses select's `*EnabledIndex` nav helpers; combobox layers *filtering* on top. |
| `auro-bibtemplate` | Fullscreen bib chrome (headline, close, hosts bib input). | Part of the **fullscreen-dialog adapter**, not core. |
| `auro-helptext` | Help/error text region. | Shared `field`/help-text primitive. |
| `@aurodesignsystem/form-validation` | `validate()`/`reset()`, validity → message mapping, `required`/`valueMissing`/`customError`. | **Adapter/field concern** — biggest gap (see §6). |

**Composition mechanics that get simpler in the new model:** the Lit version manages
`ariaActiveDescendantElement` pointing *across shadow roots* (with an `await updateComplete` ordering
guard so the binding doesn't clobber a synchronous set), a live-region mirror because
`aria-activedescendant` breaks across the fullscreen `<dialog>` shadow root, hand-managed focus/caret
delegation, and six `_syncing*`/`_pending*` re-entrancy flags. **A flat, no-shadow-DOM React subtree
eliminates the cross-shadow-root ARIA problem entirely** — `aria-activedescendant` by id in one tree
is trivial.

**Behaviors that MUST survive a rebuild:**

- **Filtering is synchronous** (substring match over option text); **async is external** — the menu's
  `loading` state lets a consumer fetch options while combobox manages the open/close choreography.
- **Two modes:** `suggestion` (freeform value allowed) vs. `filter` (must pick an option; distinct
  `valueMissing`).
- **Three-way value sync:** `value` ↔ input text ↔ menu selection.
- **Keyboard:** Arrow/Home/End navigation, Enter commits (and `stopPropagation` to block form submit),
  Escape closes, **Tab / Shift+Tab commit-and-close**.
- **Validation on blur** (guarded while open / during fullscreen transition), programmatic validity,
  `error` attribute → persistent custom error.
- **Loading / no-match** states.

**Datepicker** shares the same dropdown + input + validation + bibtemplate shell but swaps the
listbox for `auro-calendar` — so the popover/positioner/fullscreen/validation primitives are shared;
only the popup *body* differs. This is strong evidence the shared-primitive seam is the right one.

## 4. Consensus recommendation

### 4.1 Separate components over a shared core

Build `Select` and `Combobox` as **sibling components with separate state machines**, not
combobox-extends-select. The trigger surfaces differ fundamentally (a button showing the selected
label vs. a filterable text input with `aria-autocomplete`), and every surveyed library keeps them
separate. Inheritance would leak the wrong abstraction.

### 4.2 The reuse boundary: a shared `listbox` core module

Extract the collection navigation **and** the ARIA prop-builders that are currently closures inside
`select`'s `connect()` into a new **pure, stateless** module. It takes primitives (a `Collection`
view + a base id), never `SelectState`, so any owning machine can call it — and combobox's *filtered*
view is simply a different `Collection` over the same array.

```
packages/headless-core/src/listbox/
  nav.ts     the 5 enabled-index helpers, generalized over a Collection
  aria.ts    listboxProps / optionProps / id scheme, promoted OUT of connect()
  index.ts
```

```ts
// listbox/nav.ts
export interface Collection { length: number; isDisabled(index: number): boolean; }
export function indexOfValue<T>(items: T[], value: T | null, eq?: (a: T, b: T) => boolean): number;
export function firstEnabledIndex(c: Collection): number;
export function lastEnabledIndex(c: Collection): number;
export function nextEnabledIndex(c: Collection, from: number): number;   // no wrap
export function prevEnabledIndex(c: Collection, from: number): number;

// listbox/aria.ts
export const listboxIds: {
  listbox(baseId: string): string;
  option(baseId: string, index: number): string;
};
export interface OptionRenderState { selected: boolean; active: boolean; disabled: boolean; }
export function listboxProps(baseId: string, activeDescendant: string | undefined): SelectListboxProps;
export function optionProps(baseId: string, index: number, s: OptionRenderState): SelectOptionProps;
```

`select/machine.ts` then **imports** these; its `connect()` shrinks to a state→`OptionRenderState`
mapping plus calls into `listbox/aria.ts`. Crucially, `handleKey` stays **component-owned**: select
opens on Space, but combobox can't (Space types a space) and printable keys drive filtering — so
combobox writes its own reducer that calls the *same* `nextEnabledIndex`/`firstEnabledIndex` for the
arrow/Home/End math. **Reuse at the function level, inside one machine per component** — this is
exactly what zag does, and it avoids the multi-source-of-truth sync bug you'd get by nesting
independent input/menu/dropdown machines.

### 4.3 Shared render primitives as registry items

The React render layer shares through **registry items** that a component lists in
`registryDependencies`:

```
registry/items/listbox.json     → src/components/ui/auro-listbox.tsx (+ .css)   // <ul role=listbox> + <li> option, spreads listboxProps/optionProps
registry/items/popover.json     → src/components/ui/auro-popover.tsx            // positioner + portal (see §4.5)
registry/items/use-listbox.json → src/lib/auro/use-listbox.ts                   // roving highlight + outside-dismiss, split out of use-machine.ts
```

```jsonc
// select.json AND combobox.json both declare:
"registryDependencies": ["listbox", "popover", "use-listbox"]
```

**The CLI already supports this with no code changes.** `resolveItemTree` in
`packages/cli/src/registry.js` recurses `registryDependencies`, dedupes, cycle-guards, and returns
**deepest-first**, so `listbox`/`popover` are written before the component that needs them.
`add.js` iterates that ordered list, rewrites `@/…` alias imports to the correct relative path per
copied file, and **skips files that already exist** — so adding `combobox` after `select` reuses the
shared primitives instead of clobbering them. (Known limitation for later: the resolver dedupes by
name only, so divergent primitive "versions" aren't detected — acceptable for a copy-in model; a
future `auro update`/`auro diff` addresses it.)

### 4.4 Compound-parts API (Base UI anatomy) + preset default

Adopt Base UI's parts naming. Shared parts are written once and re-exported into both namespaces:

```tsx
// Select                                  // Combobox
<Select.Root>                              <Combobox.Root>
  <Select.Trigger>                           <Combobox.Input/>        // text input, role=combobox
    <Select.Value/>                          <Combobox.Clear/>
  </Select.Trigger>
  <Select.Positioner>       ← shared         <Combobox.Positioner>   ← shared
    <Select.Popup>          ← shared           <Combobox.Popup>      ← shared
      <Select.List>         ← shared             <Combobox.Empty/>
        <Select.Item/>      ← shared             <Combobox.List>     ← shared
      </Select.List>                               <Combobox.Item/>  ← shared
```

Shared across both: `Positioner`, `Popup`, `List`, `Item` (+ `Group`/`Separator`). Differs:
`Select.Trigger` (button) vs. `Combobox.Input` (text input + `aria-autocomplete`); combobox adds
`Empty` and the filter layer. Parts share state through a React context fed by `useSelect`/
`useCombobox`.

**Recommendation on timing:** build the parts layer **now** (combobox needs `Combobox.Input`
regardless), but keep the current one-line `<Select options={…} />` as the **default preset** that
internally composes the parts. Migrate consumers to explicit parts only when they need custom item
rendering — the preset covers ~90% of use. Don't rewrite select's preset; wrap it. Building parts
now avoids a later breaking change to retrofit `Combobox.Input`.

### 4.5 Positioning & portal: a shared popover primitive

The POC punted with an inline popup (no portal, no collision handling). The scalable seam:

- **Headless core stays DOM-free.** It emits open/active state and ARIA only — it **never computes
  coordinates**.
- A single **`auro-popover` render primitive** owns Floating UI (`@floating-ui/react`: `useFloating`,
  `flip`, `shift`, `offset`, `size`, `autoUpdate`) + the portal + dismiss/focus-scope. The core's
  `triggerProps`/`listboxProps` are spread onto Floating UI's reference/floating elements.

This is the clean split — **core = behavior/ARIA, popover primitive = geometry/DOM** — and it's how
Base UI (`useAnchorPositioning`) and zag (popper util) both draw the line.

## 5. Where this leaves `select` today

`select` already did the cheap half of the work: its five navigation helpers are exported standalone,
and its keyboard reducer is deliberately kept separate from its ARIA wiring. What remains, per this
study, is to (a) move those helpers into `listbox/nav.ts`, (b) promote the `getOptionProps`/
`listboxProps` closures out of `connect()` into `listbox/aria.ts`, and (c) extract the popover +
use-listbox render primitives. None of this rewrites select — it factors it. See the sequence below.

## 6. Risks specific to Auro (ranked)

1. **Form-association / validation — highest effort, highest behavioral risk.** The Lit line uses a
   stateful JS engine (`@aurodesignsystem/form-validation`) plus retargeted `auroFormElement-validated`
   events and delicate blur/fullscreen timing guards — **not** native form-association. The POC has
   **no validation story**. Re-deriving the validity → message mapping, `filter`-mode `valueMissing`,
   `customError`, and blur timing is the biggest single piece of work. Recommended as its own shared
   `field`/form-adapter concern, designed before combobox.
2. **Async filtering choreography.** Sync substring filtering is trivial. The hard part is the
   **loading dance** (show/hide the popup around a consumer's async fetch without flicker or
   open/close races). Keep the machine a pure reducer; the React hook owns debounce/fetch and feeds
   filtered options back as a new `Collection`.
3. **Fullscreen-dialog a11y.** Cross-shadow-root ARIA *disappears* in the flat React model, but the
   mobile fullscreen `<dialog>` still needs a focus trap and a live-region announcement mirror. Model
   these as an explicit adapter, not emergent behavior.
4. **Re-entrancy.** The Lit component's `_syncing*`/`_pending*` flags encode real, hard-won bug fixes
   (echo loops, SPA preselect, mask throws). A greenfield machine must model those transitions
   **explicitly** in the state chart rather than rediscover them as bugs.

## 7. Refactor sequence (smallest steps, no select rewrite)

1. **Move** the 5 nav helpers into `listbox/nav.ts`; re-export from `select/machine.ts` (zero behavior
   change, select's public API unchanged). Add unit tests.
2. **Promote** `listboxProps`/`optionProps` + id scheme into `listbox/aria.ts`; rewrite select's
   `connect()` to call them. Verify the select demo is unchanged.
3. **Extract** `use-listbox.ts` (roving highlight + outside-dismiss) from `use-machine.ts`; `useSelect`
   consumes it. Add the `use-listbox` registry item; list it in `select.json` `registryDependencies`
   — the **first real cross-item resolution proof**.
4. **Extract** `auro-popover.tsx` (Floating UI) as a registry item; render select's `<ul>` inside it.
   Select now has real positioning/portal.
5. **Introduce** Select compound parts (`Select.Root/Trigger/Value/Positioner/Popup/List/Item`)
   wrapping the preset via context.
6. **Build combobox**: new `combobox/machine.ts` (own `handleKey` + filter, reusing `listbox/*`),
   `useCombobox`, `Combobox.*` parts, and `combobox.json` listing the same `registryDependencies`.

Steps 1–2 are pure refactors, shippable independently. Combobox work does not begin until step 6, and
by then it inherits proven, already-shipped primitives. Form-validation (§6.1) is a parallel track
that should land before or with step 6.

## 8. Decisions flagged (with our pick)

- **`Collection` abstraction vs. passing `SelectOption[]`** → **Collection.** Combobox filtering
  otherwise leaks index-remapping bugs into the core. Small indirection cost, big correctness win.
- **`use-listbox` as its own registry item vs. folded into each hook** → **its own item.**
  Duplicating dismiss/roving logic is exactly the drift the headless bet exists to prevent.
- **Parts now vs. later** → **now, but ship the preset as default.** Retrofitting `Combobox.Input`
  into a preset-only API later would be a breaking change.
- **Machine unification (Base UI) vs. separation (zag)** → **separation for machines, sharing for
  render/positioning.** Keeps state charts small and legible; writes the expensive wiring once.
