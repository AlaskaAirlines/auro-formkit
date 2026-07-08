# Manual Testing — auro-dropdown

This test plan covers every way a consuming engineer can configure `auro-dropdown` and every way a user can interact with it.

Unless otherwise noted, verify each configuration path in both **desktop** (floating popover) and **mobile** (fullscreen dialog) contexts, and combine with each opening mode: `click`, `focusShow`, `hoverToggle`, and programmatic `show()`.

---

## 1. Consumer Configuration

### 1.1 Trigger Content

#### `trigger` slot
- [ ] Set plain text or a non-focusable element (e.g. `<div>Trigger</div>`) — verify the internal trigger wrapper receives `tabindex="0"`, `role="button"` (from `a11yRole`), and `aria-expanded`/`aria-controls` reflecting bib state
- [ ] Set focusable content (e.g. `<auro-button>` or `<auro-input>`) in the trigger slot — verify the internal wrapper strips its `tabindex`, `role`, `aria-expanded`, `aria-controls`, `aria-labelledby`, and `aria-autocomplete` so the consumer element owns a11y
- [ ] With focusable trigger content, focus the inner element — verify `focus`/`blur` events are duplicated to the trigger wrapper (so parent focus tracking works)
- [ ] Replace the assigned trigger slot content at runtime (e.g. swap `<div>Trigger</div>` ↔ `<auro-button>Trigger</auro-button>`) — verify `handleTriggerContentSlotChange` re-detects focusable vs. non-focusable content and reapplies tabindex/roles accordingly
- [ ] Empty trigger content — verify `hasTriggerContent` is `false` and default rendering degrades gracefully


#### `appearance` / `onDark` (deprecated)
- [ ] `appearance="default"` — verify default palette
- [ ] `appearance="inverse"` — verify inverse (dark background) palette applies to trigger, chevron, and bib
- [ ] `onDark` (deprecated) — verify it applies inverse styling and continues to work; consumers should migrate to `appearance="inverse"`

#### `chevron`
- [ ] Set `chevron` — verify a chevron icon renders on the right of the trigger with `aria-hidden="true"`
- [ ] Verify the icon toggles between `chevron-down` (collapsed) and `chevron-up` (expanded)
- [ ] Verify chevron color follows `appearance`/`onDark`, and uses the `disabled` variant when the dropdown is disabled

#### `simple`
- [ ] Set `simple` — verify a border renders around the trigger slot content
- [ ] Combine with `chevron` — verify both render correctly together

#### `matchWidth`
- [ ] Set `matchWidth` — verify the bib width equals the trigger width
- [ ] Resize the trigger — verify the bib width updates on reopen (and while open if applicable)

### 1.3 State & Behavior Flags

#### `disabled`
- [ ] Set `disabled` — verify `aria-disabled="true"` on the trigger and the trigger cannot be opened by click, keyboard, focus, or hover
- [ ] Remove `disabled` at runtime — verify the trigger becomes interactive again

#### `error` / `errorMessage`
- [ ] Set `error` — verify the error visual state applies to the trigger and (if provided) help-text region
- [ ] Set `errorMessage` — verify the message renders in the help-text slot

#### `noToggle`
- [ ] Set `noToggle` — verify clicking the trigger opens the bib but clicking again does NOT close it
- [ ] With `noToggle`, verify the bib still closes via outside click, Escape, and `hide()`

#### `focusShow`
- [ ] Set `focusShow` — verify the bib opens when the trigger receives focus (via Tab or programmatic focus)
- [ ] Verify the bib closes when focus leaves the dropdown (unless `noHideOnThisFocusLoss` is set)

#### `hoverToggle`
- [ ] Set `hoverToggle` — verify the bib opens on trigger `mouseover` and closes on `mouseout`
- [ ] Combine with `focusShow` — verify both open triggers work independently

#### `noHideOnThisFocusLoss`
- [ ] Set `noHideOnThisFocusLoss` — verify the bib stays open when focus moves outside the dropdown (still closes via Escape or outside click)
- [ ] Unset — verify the bib auto-hides when focus leaves the component

#### `disableEventShow`
- [ ] Set `disableEventShow` — verify the bib does NOT open from click, focus, or hover events
- [ ] With `disableEventShow`, call `show()` — verify the bib opens
- [ ] With `disableEventShow`, verify `auroDropdown-triggerClick` still fires on click even though the bib does not open

#### `disableKeyboardHandling`
- [ ] Set `disableKeyboardHandling` — verify keyboard events on the trigger are NOT handled by the dropdown (consumer must manage Enter/Space/Escape)
- [ ] Verify the dialog still handles its native `cancel` (Escape inside the dialog fires `auro-bib-cancel`)

### 1.4 Bib Positioning (Floating UI)

#### `placement`
- [ ] Set `placement` to each of: `top`, `right`, `bottom`, `left`, `top-start`, `top-end`, `bottom-start` (default), `bottom-end`, `right-start`, `right-end`, `left-start`, `left-end` — verify the bib appears in the correct position

#### `autoPlacement`
- [ ] Set `autoPlacement` — verify the bib picks the placement with the most available space regardless of the `placement` prop

#### `noFlip`
- [ ] Without `noFlip` — verify the bib flips to the opposite side when the specified placement has insufficient space
- [ ] With `noFlip` — verify the bib does NOT flip and stays in the specified placement even when clipped

#### `shift`
- [ ] Set `shift` — verify the bib shifts along the axis to remain in the viewport
- [ ] Without `shift` — verify the bib retains its exact placement even if partially off-screen

#### `offset`
- [ ] Set `offset="0"` (default) — verify no gap between trigger and bib
- [ ] Set `offset="20"` — verify a 20px gap between trigger and bib

### 1.5 Modal Behavior

#### `desktopModal`
- [ ] Set `desktopModal` — verify at desktop viewport size, opening the bib inerts all sibling elements outside the dropdown's ancestor chain (traversing through shadow DOM hosts)
- [ ] Verify Tab wraps inside the bib content when `desktopModal` is set (custom Tab handler with focus wrap)
- [ ] Verify Shift+Tab wraps backward correctly
- [ ] Verify focus lands on the first focusable element inside the bib when it opens
- [ ] Verify Escape closes the bib; outside click closes the bib; and the previously-inert siblings are restored on close
- [ ] Verify siblings that were externally `inert` before the modal opened remain `inert` after close (via `data-auro-inert-was` preservation)
- [ ] Open two `desktopModal` dropdowns in sequence over the same siblings — verify reference counting keeps siblings inert until the last one closes

#### `fullscreenBreakpoint`
- [ ] `fullscreenBreakpoint="xs"` — verify fullscreen only at xs viewport
- [ ] `fullscreenBreakpoint="sm"` (default) — verify fullscreen at ≤sm
- [ ] `fullscreenBreakpoint="md"` / `"lg"` / `"xl"` — verify fullscreen up to specified breakpoint
- [ ] `fullscreenBreakpoint="disabled"` — verify the bib never enters fullscreen at any viewport size
- [ ] Invalid breakpoint value — verify it is ignored (falls back to `undefined`)
- [ ] Resize viewport across the breakpoint while the bib is open — verify the bib re-opens using the new strategy (`showModal()` for fullscreen; `show()` + popover for desktop), focus trap re-initializes, and `inert` state adjusts

### 1.6 Bib Sub-element Configuration (auro-dropdownbib)

Consumers may replace the default bib by placing an explicit `<auro-dropdownbib>` inside the dropdown to customize the bib presentation.

- [ ] `<auro-dropdownbib rounded>` — verify the bib has rounded corners
- [ ] `<auro-dropdownbib inset>` — verify the bib content has extra inset padding
- [ ] `<auro-dropdownbib common>` — verify the bib uses the common theme styles
- [ ] `<auro-dropdownbib shape="rounded">` — verify the shape class applies
- [ ] Combine multiple flags (e.g. `rounded` + `inset`) — verify both apply

### 1.7 Slots

- [ ] Default slot — verify content renders inside the bib
- [ ] `trigger` slot — verify content renders as the trigger
- [ ] `helpText` slot — verify content renders below the trigger

### 1.8 Container Composition

- [ ] Place `<auro-dropdown>` inside an `<auro-dialog>` — verify the bib escapes the dialog's overflow clipping (viewport-relative positioning by clearing the host's `contain` style) and opens/closes without leaking Escape to the parent dialog
- [ ] Place inside an `<auro-drawer>` — verify the same

---

## 2. User Interactions

### 2.1 Mouse

- [ ] Click the trigger — verify the bib opens
- [ ] Click the trigger again — verify the bib closes (toggle behavior; suppressed if `noToggle` is set)
- [ ] Click inside the bib content — verify the bib stays open
- [ ] Click outside the bib and outside the trigger — verify the bib closes
- [ ] Click a `disabled` trigger — verify the bib does not open (note: `auroDropdown-triggerClick` still fires because it is dispatched unconditionally from trigger clicks)
- [ ] Click with `disableEventShow` set — verify the bib does not open but `auroDropdown-triggerClick` still fires
- [ ] With `desktopModal`, click inside the modal bib — verify focus/click stays within; click outside is blocked by inert siblings

### 2.2 Hover

- [ ] With `hoverToggle`, hover the trigger — verify the bib opens
- [ ] Move mouse off the trigger — verify the bib closes
- [ ] Without `hoverToggle`, hover the trigger — verify no bib open/close (hover has no effect)

### 2.3 Keyboard

#### Trigger focus & activation
- [ ] Tab to the trigger — verify it receives focus (default `tabindex="0"` on wrapper, or the focusable inner content if provided)
- [ ] With `focusShow`, Tab to the trigger — verify the bib opens on focus
- [ ] Enter on the focused trigger while collapsed — verify the bib opens
- [ ] Enter on the focused trigger while expanded — verify the bib closes
- [ ] Space on the focused trigger while collapsed — verify the bib opens
- [ ] Space on the focused trigger while expanded — verify the bib closes
- [ ] Verify Enter/Space work when the focus is on any focusable element WITHIN the trigger slot (e.g. an `auro-button`)

#### Escape
- [ ] Escape while bib is expanded, with focus inside the bib — verify the bib closes and focus returns to the trigger
- [ ] Escape while bib is expanded, with focus on the trigger — verify the bib closes
- [ ] Escape when bib is collapsed — verify no effect
- [ ] Verify Escape inside the bib fires the internal `cancel` event on the `<dialog>`, which becomes an `auro-bib-cancel` event on the dropdown and does NOT propagate to a parent `<auro-dialog>`/`<auro-drawer>`

#### Tab inside the bib
- [ ] Tab through focusable elements inside the bib content — verify focus moves through them in order - this behavior can be tested in datepicker.
- [ ] Shift+Tab — verify focus moves backward
- [ ] Normal desktop (no `desktopModal`), Tab past the last focusable in the bib — verify focus exits the bib (Floating UI hides bib on focus loss, unless `noHideOnThisFocusLoss` set)
- [ ] With `desktopModal`, Tab past the last focusable — verify focus WRAPS to the first focusable in the bib (custom Tab handler traps focus) - this behavior can be tested in datepicker.
- [ ] With `desktopModal`, Shift+Tab past the first focusable — verify focus WRAPS to the last focusable - this behavior can be tested in datepicker.
- [ ] In fullscreen, Tab — verify focus is trapped by the native `<dialog>` `showModal()` behavior
- [ ] Tab with no focusable elements in the bib — verify the handler does not throw and focus behavior degrades gracefully

#### `disableKeyboardHandling`
- [ ] Set the flag — verify Enter/Space/Escape on the trigger no longer open/close the bib
- [ ] With the flag, call `show()` — verify the bib still opens (keyboard handling only affects trigger key events)

### 2.4 Touch / Tap

- [ ] Tap the trigger — verify the bib opens (fullscreen at mobile breakpoint, popover otherwise)
- [ ] Tap the trigger again — verify the bib closes (unless `noToggle`)
- [ ] Tap inside the bib content — verify it stays open
- [ ] Tap outside the bib — verify the bib closes
- [ ] In fullscreen, drag the page background — verify page scroll is BLOCKED (touchmove is cancelled by `_lockTouchScroll`)
- [ ] In fullscreen, drag inside a scrollable element in the bib content — verify that element scrolls normally (`overflow-y: auto|scroll` bypasses the scroll lock)

### 2.5 Fullscreen (Mobile) Mode

- [ ] Open the dropdown at ≤ `fullscreenBreakpoint` — verify the fullscreen `<dialog>` opens via `showModal()` (top-layer, native focus trap, background inert)
- [ ] Verify `document.documentElement.style.overflow` is briefly locked to `hidden` during `showModal()` to prevent scroll-into-view, then restored (so scrolling inside the dialog works)
- [ ] Verify touch scroll on the background is blocked while open
- [ ] Verify Escape fires the native dialog `cancel` event and closes the bib
- [ ] Verify Tab cycles inside the dialog (browser-native trap)
- [ ] Close the dialog (Escape, close button, or `hide()`) — verify focus returns to the trigger
- [ ] Verify the touch scroll lock is released on close

### 2.6 Trigger with focusable custom content

Consumers can slot focusable content (e.g. `<auro-input>`, `<auro-button>`) into the trigger slot instead of relying on the wrapper's button role.

- [ ] Slot an `<auro-input>` into the trigger — verify the input owns tab focus, focus events are duplicated to the trigger wrapper, and the wrapper's a11y attributes are removed (consumer manages ARIA)
- [ ] Slot an `<auro-button>` into the trigger — verify the button owns tab focus
- [ ] Tab into the focusable trigger content — verify `hasFocus` becomes `true` on the dropdown host
- [ ] Blur — verify `hasFocus` becomes `false`
- [ ] Click the focusable trigger — verify the bib opens/closes normally

### 2.7 Screen Reader

- [ ] With default `a11yRole="button"` — verify screen reader announces "button" and the trigger label; expanded state is conveyed by the button pattern
- [ ] With `a11yRole="combobox"` — verify screen reader announces "combobox", "has popup listbox", and the expanded state (`aria-expanded`)
- [ ] Open the bib — verify the `<dialog>` element is announced (with `bibDialogLabel` via `aria-labelledby` if provided)
- [ ] Close the bib — verify the bib content is no longer reachable by AT
- [ ] With `desktopModal`, verify VoiceOver cannot swipe to sibling content outside the dropdown host (inert siblings)
- [ ] In fullscreen, verify VoiceOver cannot swipe to content behind the fullscreen `<dialog>` (native `showModal()` behavior)

---

## 3. Public Methods

- [ ] `show()` — verify the bib opens (synchronously, keeping the caller in the user-gesture chain for iOS Safari keyboard retention)
- [ ] `hide()` — verify the bib closes
- [ ] `show()` while already open — verify no-op (does not re-open)
- [ ] `hide()` while already closed — verify no-op
- [ ] `focus()` when bib is closed — verify the trigger receives focus
- [ ] `focus()` when bib is open — verify the first focusable element inside the bib receives focus (falls back to trigger if none)
- [ ] `exposeCssParts()` — verify the host gains an `exportparts` attribute for parent-component styling

---

## 4. Events

- [ ] Open the bib — verify `auroDropdown-toggled` fires (via internal `handleDropdownToggle`, updating `isPopoverVisible`)
- [ ] Close the bib — verify `auroDropdown-toggled` fires again
- [ ] Click the trigger — verify `auroDropdown-triggerClick` fires (bubbles + composed), regardless of `disableEventShow`
- [ ] On first update — verify `auroDropdown-idAdded` fires once with `detail.id` set to the bib element's generated ID
- [ ] Escape inside the bib — verify `auro-bib-cancel` fires from the dropdownbib and is handled internally to hide

---

## 5. Accessibility (WCAG 2.1 AA)

- [ ] Bib content is not reachable by AT when closed
- [ ] Bib content is announced when opened (dialog role, `aria-labelledby` if `bibDialogLabel` set)
- [ ] Focus is trapped in `desktopModal` mode (custom Tab wrap) and in fullscreen mode (native `showModal`) - Datepicker uses this flag on the desktop dropdown and behavior can be tested there.
- [ ] Focus returns to the trigger after the bib closes when the component still has focus, and does NOT pull focus back if the user Tabbed away. This behavior can be tested via select, combobox and datepicker.
- [ ] Escape closes the bib in every mode (default, desktopModal, fullscreen) and does not propagate to parent dialogs/drawers
