# Datepicker Calendar Performance: Technical Research Document

**Component:** `auro-datepicker` / `auro-calendar` / `auro-calendar-cell`  
**Author:** Jason Baker  
**Date:** May 2026  
**Status:** Draft — Pending Implementation  

---

## 1. Problem Statement

The current datepicker calendar triggers a full Lit lifecycle update on **every cell** whenever any single cell receives focus or is hovered. In a typical month grid of 28–42 cells, a single arrow-key press or mouse hover causes 30+ synchronous re-renders. This degrades performance badly enough that **screen reader users cannot reliably navigate the month grid using arrow keys** — announcements are delayed, dropped, or arrive out of order because the browser's rendering pipeline is saturated with unnecessary work.

## 2. Current Architecture

### 2.1 Component Hierarchy

```
auro-datepicker
  └── auro-calendar (extends RangeDatepicker)
        └── auro-calendar-month (extends RangeDatepickerCalendar)  ×N
              └── auro-calendar-cell  ×28–42 per month
```

### 2.2 Data Flow on Hover/Focus (Current)

```
User hovers/focuses cell
  → cell.handleHover()
    → sets cell.hovered = true                          [reactive prop → cell re-render #1]
    → dispatches 'date-is-hovered' event
      → month.handleDateHovered()
        → sets month.hoveredDate = event.detail.date    [reactive prop → month re-render]
          → month re-renders, passing .hoveredDate to EVERY cell via template binding
            → each cell's updated() fires dateChanged() [reactive prop → cell re-render ×N]
              → each cell re-renders its template
                → each cell runs getAriaLabel() during render
```

### 2.3 Why This Is Expensive

Each cell re-render during the cascade performs the following work:

1. **`dateChanged()`** — Parses `dateFrom`, `dateTo`, `hoveredDate` as integers; computes `startOfDay()` via date-fns; runs comparison logic to set `selected` and `hovered` boolean properties.
2. **`getAriaLabel()`** — Constructs a new `Intl.DateTimeFormat` instance, formats the date, queries the DOM for slotted popover content (`this.querySelector()`), computes range position via `getRangePosition()`, and checks blackout status via `isBlackout()`.
3. **`renderCellButton()`** — Evaluates `classMap` with 10+ conditional classes including `isLastHoveredDate()`, `isDepartDate()`, `isReturnDate()`, `isInRange()`, `isReferenceDate()` — each involving their own date arithmetic.
4. **`setDateSlotName()` + `handleSlotContent()`** — Called in `updated()` on every render; queries and clones slot content from the parent datepicker.

For a 35-cell month, this amounts to:
- **35** `Intl.DateTimeFormat` instantiations
- **35** DOM queries for slot content
- **35** `startOfDay()` computations
- **35** Lit template re-evaluations and DOM diffs
- **35** `handleSlotContent()` calls that remove and re-clone slot nodes

All of this occurs synchronously within a single animation frame — **per keystroke**.

### 2.4 Impact on Screen Readers

Screen readers like VoiceOver rely on the focused element having a stable accessible name by the time the browser's accessibility tree is updated. When the Lit render cascade takes too long:

- The user presses an arrow key, focus moves to the next cell.
- Before the SR can read the new cell's content, the `hoveredDate` cascade triggers a full re-render of all cells.
- The browser is busy performing layout/paint for 35 cells, delaying the accessibility tree update.
- The user presses another arrow key before the first announcement completes.
- Announcements queue up, arrive late, or are dropped entirely by the SR.

This creates an unusable experience for keyboard-only and screen reader users navigating quickly through dates.

## 3. Options Evaluated

### 3.1 Option A: Optimize Existing Lifecycle (Minimize Re-renders)

**Approach:** Keep aria-labels on individual cells but prevent `hoveredDate` from triggering a full cascade. Gate the `hoveredDate` property flow so cells only recalculate `selected`/`hovered` state when `dateFrom` or `dateTo` changes (i.e., when a value is actually selected).

**Pros:**
- Smallest diff; minimal structural change.
- Preserves existing accessibility pattern (cell carries its own accessible name).

**Cons:**
- `getAriaLabel()` is still called on every cell during renders triggered by selection. Each call instantiates `Intl.DateTimeFormat`, queries the DOM for slot content, and computes range/blackout state. The per-cell cost is high even if renders are less frequent.
- Does not solve the fundamental problem: the cell's accessible name is baked into its shadow DOM (`<span class="srOnly">`), meaning **any change to what the SR should announce requires a full Lit render of that cell**.
- The range picker hover preview (visual highlighting of the date range between `dateFrom` and the hovered cell) still requires propagating `hoveredDate` to all cells for the CSS classes to update. This means the cascade cannot be fully eliminated for range mode — it can only be deferred or debounced, which introduces visual lag in the hover preview.
- Does not decouple the announcement mechanism from the render cycle. Even if renders are fast, they are still synchronous blocking work that competes with the SR's announcement pipeline.

**Verdict:** Partial improvement. Reduces render frequency but does not eliminate the architectural coupling between cell rendering and SR announcements.

### 3.2 Option B: Live Region Announcement Pattern (Recommended)

**Approach:** Move dynamic screen reader announcements out of individual cells and into a single `aria-live` region at the calendar level. Cells fire a lightweight event on focus; the calendar listens and updates one DOM element. Visual hover effects use CSS pseudo-classes instead of reactive properties.

**Pros:**
- **O(1) DOM mutation per focus/hover** instead of O(N) cell re-renders.
- Completely decouples SR announcements from the Lit render cycle. The `textContent` update on the live region is a single, near-instant DOM write.
- Cells become nearly static after initial render — they only re-render when `dateFrom`/`dateTo` changes (selection), which is infrequent and user-intentional.
- The existing `#calendar-live-region` element in `auro-calendar` already provides the infrastructure; it currently handles selection and month-change announcements.
- Aligns with ARIA best practices for grid/table patterns where a companion live region provides contextual information about the focused cell.
- Eliminates `Intl.DateTimeFormat` instantiation on every focus change (computed once in the calendar's handler, not 35 times in cells).

**Cons:**
- Larger diff across `auro-calendar-cell`, `auro-calendar-month`, and `auro-calendar`.
- Requires careful testing to ensure the live region announcement timing works reliably across VoiceOver, NVDA, and JAWS.
- The `<span class="srOnly">` inside each cell button would be simplified or removed, changing how the cell's accessible name is derived. Must ensure the button still has an accessible name (via `aria-label` on the button itself, computed once at render time for the static date portion).

**Verdict:** Recommended. Eliminates the root cause of the performance problem and provides a scalable pattern for future enhancements.

### 3.3 Option C: Virtual/Windowed Rendering

**Approach:** Only render cells that are currently visible in the viewport, using an intersection observer or virtual scroll container.

**Pros:**
- Reduces total DOM node count, improving initial render time.

**Cons:**
- Does not solve the hover/focus cascade — visible cells still all re-render.
- Adds significant complexity for a calendar grid that is at most 42 cells (already a small DOM footprint).
- Breaks grid keyboard navigation semantics (cells must exist in the DOM for arrow-key traversal).
- Overkill for the problem at hand.

**Verdict:** Not appropriate. The problem is re-render frequency, not DOM size.

### 3.4 Option D: Web Worker / Off-Main-Thread Computation

**Approach:** Move `getAriaLabel()` and date computation to a web worker to avoid blocking the main thread.

**Pros:**
- Keeps the main thread free for user interaction.

**Cons:**
- Web workers cannot access the DOM, so `getAriaLabel()`'s DOM queries (slot content, `this.datepicker` references) would need to be restructured.
- Adds async complexity to a synchronous render path.
- Does not reduce total work — just moves it off-thread. The cells still need to re-render when the worker returns.
- Significant architectural change for marginal benefit compared to Option B.

**Verdict:** Over-engineered for this problem.

## 4. Recommended Approach: Detailed Design

### 4.1 Overview

Option B — Live Region Announcement Pattern.

```
User focuses cell via arrow key
  → cell dispatches 'calendar-cell-focused' (lightweight, no reactive prop change)
  → calendar.handleCellFocused()
    → builds announcement string (one Intl.DateTimeFormat call)
    → updates #calendar-live-region.textContent
    → SR announces the new content
  → cell does NOT re-render (no reactive properties changed)
```

### 4.2 Changes to `auro-calendar-cell`

#### 4.2.1 Remove `hovered` and `hoveredDate` as render triggers for non-range mode

The `hovered` boolean property and `hoveredDate` string property currently trigger re-renders via Lit's reactive property system. These should be removed from the cell's static `properties` definition for non-range datepickers.

For **range mode**, `hoveredDate` is still needed to visually highlight the date range preview. However, the cascade should be gated:
- Only propagate `hoveredDate` when the datepicker has the `range` attribute **and** `dateFrom` is set **and** `dateTo` is not yet set (i.e., the user is actively selecting the second date).
- In all other states, skip the propagation entirely.

#### 4.2.2 Replace `handleHover()` on focus with a lightweight event

```js
handleFocus() {
  this.dispatchEvent(new CustomEvent('calendar-cell-focused', {
    bubbles: true,
    composed: true,
    detail: { date: this.day.date }
  }));
}
```

The `@focus` binding on the button changes from `this.handleHover` to `this.handleFocus`. The `@mouseover` binding can remain for the range preview case but should not trigger a cell re-render — it should only dispatch the event.

#### 4.2.3 Simplify the cell's accessible name

Currently the button contains:
```html
<span class="srOnly">${this.getAriaLabel()}</span>
```

This should be replaced with a static `aria-label` on the button itself, computed once during render, containing only the base date string:
```html
<button aria-label="${this.getStaticAriaLabel()}" ...>
```

Where `getStaticAriaLabel()` returns the localized date string plus any static information (blackout status, popover content) that doesn't change on focus. The dynamic range-position label ("range start", "in range", etc.) moves to the live region announcement.

#### 4.2.4 Remove `handleSlotContent()` from `updated()`

The `handleSlotContent()` method currently runs on **every** `updated()` call, querying and cloning DOM nodes. This should only run:
- Once in `firstUpdated()` (initial setup).
- When the datepicker dispatches `auroDatePicker-newSlotContent` (already handled via event listener).

Remove the unconditional call from `updated()`.

### 4.3 Changes to `auro-calendar-month`

#### 4.3.1 Gate `hoveredDate` binding

The month template currently passes `.hoveredDate` to every cell unconditionally:

```html
<auro-formkit-calendar-cell
  .hoveredDate="${this.hoveredDate}"
  ...
```

This should be gated to only pass when the range hover preview is active:

```js
.hoveredDate="${this._isRangePreviewActive ? this.hoveredDate : undefined}"
```

Where `_isRangePreviewActive` is true only when the datepicker is in range mode, `dateFrom` is set, and `dateTo` is not set.

#### 4.3.2 Remove `@date-is-hovered` handler for non-range mode

The `handleDateHovered` handler on the month sets `this.hoveredDate`, triggering a month re-render. For non-range mode, this handler should be a no-op or not bound.

### 4.4 Changes to `auro-calendar`

#### 4.4.1 Add focus announcement handler

```js
handleCellFocused(event) {
  const { date } = event.detail;
  const label = this.buildFocusAnnouncement(date);
  this.announceSelection(label);
}
```

The `buildFocusAnnouncement()` method computes the full announcement string at the calendar level, where it has access to all context (range state, blackout dates, locale, etc.) without needing to query child cell DOM. This is a single `Intl.DateTimeFormat` call instead of 35.

#### 4.4.2 Bind the listener in `firstUpdated()`

```js
this.addEventListener('calendar-cell-focused', (event) => {
  this.handleCellFocused(event);
});
```

#### 4.4.3 Reuse existing `#calendar-live-region`

The `<div id="calendar-live-region" aria-live="assertive" aria-atomic="true" class="sr-only">` element already exists in the calendar's render template. The `announceSelection()` method already handles the clear-then-set pattern needed for aria-live to re-announce identical content. No new DOM elements are needed.

### 4.5 Changes to `utilitiesCalendarRender`

Gate the `@hovered-date-changed` event binding and `.hoveredDate` property binding on the month element to only apply when range preview is active.

### 4.6 Visual Hover Effects

The current `hovered` CSS class on cells (set via the reactive `hovered` property) should be replaced with CSS pseudo-class selectors:

```css
button.day:hover { /* hover styles */ }
button.day:focus-visible { /* focus styles */ }
```

This eliminates the need for a reactive `hovered` property on the cell entirely for visual purposes. The range hover preview (highlighting cells between `dateFrom` and the hovered cell) still requires the reactive class approach but only in the gated range-preview-active state.

## 5. Performance Impact

### 5.1 Before (Current)

| Action | Cell Re-renders | `Intl.DateTimeFormat` Calls | DOM Queries |
|---|---|---|---|
| Arrow key press | 35+ | 35 | 35+ |
| Mouse hover | 35+ | 35 | 35+ |
| Date selection | 35+ | 35 | 35+ |

### 5.2 After (Proposed)

| Action | Cell Re-renders | `Intl.DateTimeFormat` Calls | DOM Mutations |
|---|---|---|---|
| Arrow key press | **0** | **1** | **1** (live region) |
| Mouse hover | **0** (non-range) | **0** | **0** |
| Mouse hover (range preview active) | **35** | **0** | **35** (class updates only) |
| Date selection | **35** | **1** | **35** + **1** (live region) |

### 5.3 Expected Outcome

- Arrow-key navigation through the month grid should be **~35x less work** per keystroke.
- Screen reader announcements should arrive within a single animation frame of the focus change.
- Rapid arrow-key navigation (holding the key down) should produce smooth, sequential announcements without drops or delays.

## 6. Accessibility Considerations

### 6.1 ARIA Grid Pattern Compliance

The calendar uses `role="grid"` with `role="gridcell"` on buttons. The [ARIA grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) does not require that each cell's accessible name include dynamic context about its position relative to a selection range. Static accessible names (the date itself, blackout status) on cells are sufficient and expected.

### 6.2 Live Region Best Practices

- The live region uses `aria-live="assertive"` because date navigation is the user's primary interaction and announcements should interrupt.
- `aria-atomic="true"` ensures the full announcement is read, not just the changed portion.
- The clear-then-set pattern (`textContent = '' → microtask → textContent = label`) ensures the SR treats each update as a new announcement, even if the content is identical.

### 6.3 Range Context in Announcements

For range pickers, the live region announcement should include the range position context (e.g., "Tuesday, May 20, 2026, before range" or "Wednesday, May 21, 2026, range start"). This context is computed at the calendar level where `dateFrom` and `dateTo` are readily available, avoiding the need to pass range state down to each cell.

### 6.4 Blackout Date Announcements

Blackout status ("unavailable") should still be included in the announcement. The calendar can check this using the same `blackoutDates` array on the datepicker, without needing the cell to compute it during render.

## 7. Testing Strategy

### 7.1 Screen Reader Testing

- **VoiceOver (macOS Safari):** Navigate a 6-week month grid using arrow keys at rapid speed. Verify all 42 dates are announced in order without drops.
- **NVDA (Windows Chrome):** Same test. Verify `aria-live="assertive"` is respected.
- **JAWS (Windows Chrome):** Same test. Verify the live region is announced alongside the gridcell focus change.

### 7.2 Performance Testing

- Profile a full month of arrow-key navigation using Chrome DevTools Performance tab.
- Measure total scripting time per keystroke before and after.
- Verify no forced synchronous layouts occur during navigation.

### 7.3 Functional Regression

- All existing Playwright tests for datepicker interaction must pass.
- Range selection hover preview must still visually highlight the correct cells.
- Blackout dates must still be non-selectable and announced as unavailable.
- Popover content on cells must still render correctly.
- Month navigation (prev/next buttons, cross-month arrow keys) must still work.

## 8. Migration Risk

| Risk | Likelihood | Mitigation |
|---|---|---|
| SR announcement timing varies across browsers/SRs | Medium | Test on VoiceOver, NVDA, JAWS. Use `requestAnimationFrame` fallback if microtask timing is unreliable. |
| Range hover preview regresses | Low | Gating logic is additive; range-active code path is unchanged. |
| Consumers relying on cell's `hovered` property | Low | `hovered` is not part of the public API; it is not reflected as an attribute. |
| `handleSlotContent()` removal from `updated()` causes stale slot content | Low | The `auroDatePicker-newSlotContent` event listener already handles dynamic updates. |

## 9. Computed CSS Classes on Focus/Hover

### 9.1 The Problem

In addition to the Lit lifecycle cascade described above, the cell's `renderCellButton()` evaluates a `classMap` with 12 conditional entries on every render. Several of these classes change based on `hoveredDate` or `hovered`, meaning they are recomputed for **every cell** on every focus/hover event:

```js
const buttonClasses = {
  'day': true,                    // static
  'body-lg': true,                // static
  'currentDate': ...,             // static (per render)
  'selected': this.selected,      // changes on hover cascade (dateChanged recalculates)
  'inRange': ... && this.hovered, // depends on hovered + hoveredDate
  'lastHoveredDate': ...,         // depends on hoveredDate
  'disabled': ...,                // static
  'blackout': ...,                // static
  'rangeDepartDate': ...,         // depends on hoveredDate
  'rangeReturnDate': ...,         // static after selection
  'reference': ...,               // static
  'sameDateTrip': ...,            // static after selection
};
```

Classes that change on hover/focus:
| Class | Trigger | Purpose |
|---|---|---|
| `selected` | `dateChanged()` recalculates on `hoveredDate` change | Marks departure/return dates |
| `inRange` | Requires `this.hovered === true` | Highlights cells between dateFrom and hover target |
| `lastHoveredDate` | Compares `day.date === hoveredDate` | Adds trailing edge visual on the hovered cell |
| `rangeDepartDate` | Checks `hoveredDate > dateFrom` | Shows half-width range start indicator |

Each of these triggers a Lit re-render when the underlying reactive property changes. The `classMap` directive then diffs the old vs. new class list and patches the DOM — but the damage is already done by the time classMap runs, because Lit's `render()` has already executed all the computation inside `renderCellButton()`.

### 9.2 Class Categorization

The classes fall into three categories:

| Category | Classes | When they change |
|---|---|---|
| **Static** | `day`, `body-lg`, `currentDate`, `disabled`, `blackout`, `reference` | Never change after initial cell render |
| **Selection-driven** | `selected`, `rangeReturnDate`, `sameDateTrip` | Only change when `dateFrom` or `dateTo` changes (user clicks) |
| **Hover-driven** | `inRange`, `lastHoveredDate`, `rangeDepartDate` | Change on every hover/focus in range mode |

The hover-driven classes are the performance problem. They exist solely for the range date preview — visually highlighting the span of dates between `dateFrom` and the cursor position before the user commits the second selection.

### 9.3 Options

#### Option A: CSS Custom Properties Set via JavaScript (No Re-render)

**Approach:** Replace the hover-driven classMap entries with CSS custom properties set directly on the cell's host element via `this.style.setProperty()`. This is a direct DOM mutation that does **not** trigger a Lit lifecycle update.

```js
// Called from an event handler — NOT a reactive property setter
updateRangePreviewStyle(hoveredDate) {
  const isInRange = this.day.date > this.dateFrom && this.day.date < hoveredDate;
  this.style.setProperty('--_range-preview', isInRange ? '1' : '0');
  this.style.setProperty('--_last-hovered', this.day.date === hoveredDate ? '1' : '0');
  this.style.setProperty('--_depart-active', hoveredDate > this.dateFrom ? '1' : '0');
}
```

The SCSS uses these custom properties to toggle visual states:

```scss
.day::before {
  // Range preview background — toggled by --_range-preview
  background-color: calc(var(--_range-preview, 0) * var(--ds-auro-calendar-cell-in-range-color));
  opacity: var(--_range-preview, 0);
}
```

**Pros:**
- Zero Lit re-renders. `style.setProperty()` is a direct CSSOM mutation.
- No `requestUpdate()` or reactive property change.
- CSS custom property changes are batched by the browser and resolved in a single style recalc pass.
- Keeps the range preview logic in JavaScript where the date arithmetic lives.

**Cons:**
- CSS custom properties don't support conditional class-like semantics natively. The `::before` pseudo-element positioning (different widths for `inRange` vs. `rangeDepartDate` vs. `rangeReturnDate`) would need to use `calc()` tricks or multiple pseudo-elements.
- More complex SCSS than simple class selectors.
- Harder to debug visually — no class names visible in DevTools element inspector (though custom properties are visible in the computed styles panel).

#### Option B: Direct DOM Class Manipulation (No Re-render)

**Approach:** Replace the hover-driven classMap entries with direct `classList.add()`/`classList.remove()` calls on the button element, invoked from event handlers rather than from reactive property setters.

```js
// Called from a 'calendar-range-preview' event listener — NOT from updated()
updateRangePreviewClasses(hoveredDate) {
  const btn = this.shadowRoot.querySelector('button.day');
  if (!btn) return;

  btn.classList.toggle('inRange',
    this.day.date > this.dateFrom && this.day.date < hoveredDate);
  btn.classList.toggle('lastHoveredDate',
    this.day.date === hoveredDate);
  btn.classList.toggle('rangeDepartDate',
    this.isDepartDate(this.day, this.dateFrom) && hoveredDate > this.dateFrom);
}
```

The calendar or month component dispatches a single event with the new `hoveredDate`. Each cell listens and updates its own classes imperatively.

**Pros:**
- Zero Lit re-renders. `classList.toggle()` is a direct DOM mutation.
- **Existing SCSS rules work unchanged.** No need to rewrite styles — `.inRange`, `.lastHoveredDate`, `.rangeDepartDate` selectors still apply.
- Easy to debug — class names are visible in DevTools.
- Minimal diff — only the event flow changes; the class names and their styling remain identical.
- Well-understood pattern; no CSS tricks or hacks.

**Cons:**
- Imperative class manipulation is "outside" Lit's rendering model. If a Lit re-render occurs for another reason (e.g., selection change), the `classMap` in `renderCellButton()` will overwrite the imperative classes. This is actually fine if hover-driven classes are **removed** from classMap entirely and only managed imperatively.
- Each cell needs a reference to its button element (cached in `firstUpdated()`).

#### Option C: CSS `:has()` Selector with Data Attributes on the Grid (No Cell Changes)

**Approach:** Set a single `data-hovered-date` attribute on the grid container (the month's `role="grid"` div). Use CSS `:has()` and attribute selectors to style cells based on their relationship to the hovered date.

```css
/* Month-level: highlight cells between dateFrom and hovered */
.table[data-range-from][data-hovered-date] .td:has(button[data-date]) {
  /* Complex selector logic here */
}
```

**Pros:**
- Zero JavaScript class manipulation on cells.
- Single attribute mutation on the grid container.

**Cons:**
- CSS `:has()` cannot express "this cell's date is numerically between X and Y" — it's a structural selector, not a value comparator. Dates are numbers; CSS has no mechanism to compare attribute values numerically.
- Would require setting a class/attribute on **every cell in range** anyway, defeating the purpose.
- Browser support for complex `:has()` chains with attribute selectors is inconsistent in shadow DOM contexts.

**Verdict:** Not viable. CSS cannot perform numeric range comparisons on attribute values.

#### Option D: Single `<style>` Element Injection (No Cell Changes)

**Approach:** Instead of setting classes on individual cells, dynamically write a `<style>` block into the month's shadow DOM that targets cells by their existing IDs (e.g., `#cell-2026-05-21`).

```js
// In the month component's hover handler
updateRangePreviewStyles(hoveredDate) {
  const fromDate = new Date(this.dateFrom * 1000);
  const hovDate = new Date(hoveredDate * 1000);
  let css = '';

  // Generate rules for each date in range
  for (let d = new Date(fromDate); d <= hovDate; d.setDate(d.getDate() + 1)) {
    const id = `cell-${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    css += `#${id}::before { background-color: var(--ds-auro-calendar-cell-in-range-color); }\n`;
  }

  this._rangeStyleEl.textContent = css;
}
```

**Pros:**
- Zero class manipulation on cells. Zero Lit re-renders.
- Single DOM mutation (updating `<style>.textContent`).
- Cells are targeted by their existing stable IDs — no new attributes needed.
- The browser batches all style recalculations from a single `<style>` update into one pass.
- Extremely fast — style injection is one of the fastest DOM operations.

**Cons:**
- Dynamic style injection is unconventional in Lit components and may surprise future maintainers.
- The `<style>` element needs to be in the cell's shadow DOM to target the button, but the cell IDs are on buttons inside the cell's shadow root. This means either: (a) the style must be injected into each cell's shadow root (defeating the purpose), or (b) the IDs must be on the cell host elements (light DOM), and styles target `auro-formkit-calendar-cell#cell-2026-05-21`. Option (b) works because the month's shadow DOM can style its own children.
- Requires careful cleanup when hover ends.

### 9.4 Recommendation

**Option B (Direct DOM Class Manipulation)** is the strongest choice for this codebase:

1. **Zero SCSS changes.** The existing `.inRange`, `.lastHoveredDate`, and `.rangeDepartDate` selectors and their associated `::before` pseudo-element styles continue to work unchanged.
2. **Zero Lit re-renders.** `classList.toggle()` bypasses Lit's reactive system entirely.
3. **Minimal implementation risk.** The pattern is straightforward — remove hover-driven classes from `classMap`, add an imperative update path triggered by a single event from the calendar/month level.
4. **Easy to reason about.** The separation is clean: classMap handles static and selection-driven classes; imperative classList handles hover-driven classes.
5. **DevTools-friendly.** Classes remain visible in the element inspector for debugging.

The implementation integrates naturally with the live region pattern from Section 4. The month/calendar dispatches a range-preview event; each cell's listener updates its own button classes and the calendar's live region updates the announcement — all without triggering a single Lit render cycle.

**Reconciliation with Lit renders:** When a selection *does* occur (user clicks a date), the cell legitimately re-renders via `dateFrom`/`dateTo` changes. At that point, the hover-driven classes should be cleared imperatively before the Lit render, so classMap's output (which won't include them) is the source of truth. This is a one-line cleanup in the selection handler.

## 10. Summary

The root cause of the datepicker's performance problem is an O(N) re-render cascade triggered on every focus and hover event. The recommended fix is to decouple screen reader announcements from cell rendering by using a single `aria-live` region at the calendar level, reducing per-keystroke work from 35+ cell re-renders to 1 DOM mutation. This approach is architecturally sound, aligns with ARIA best practices, and requires no changes to the component's public API.
