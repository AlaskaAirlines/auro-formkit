# Manual Testing — auro-form

Cases marked **[v6]** are new or changed in the formkit v6 migration — prioritize them when
regression-testing an upgrade. The form's own logic (value collection, validity, submission) is
viewport-independent, so most cases only need one viewport. The exception: `auro-select`,
`auro-combobox`, `auro-datepicker`, and `auro-counter-group` (dropdown) present a fullscreen bib
on **mobile (below `sm`)** — there, spot-check that a value chosen through the fullscreen UI is
collected into `form.value`.

---

## 1. Value Collection

The `value` getter returns a plain object keyed by each **enabled, named** form element's `name`.
Verify the shape and type produced by each form element.

### 1.1 Per-element value shape
- [ ] `auro-input` — type a value → `form.value[name]` is the string typed
- [ ] `auro-select` (single) — select an option → value is the option's `value` string
- [ ] `auro-select` (`multiSelect`) — select options → value is a **JSON-stringified array** (e.g. `'["price","arrival"]'`), not a live array
- [ ] `auro-checkbox-group` — check options → value is an **array** of checked values (e.g. `['value2']`)
- [ ] `auro-radio-group` — pick an option → value is the selected radio's `value` string
- [ ] `auro-combobox` — pick an option → value is the selected option's `value` string
- [ ] `auro-datepicker` (single) — pick a date → value is a **string** (the single date)
- [ ] `auro-datepicker` (`range`) — pick start + end → value is a **two-element string array** `[start, end]` **[v6]**
- [ ] `auro-counter-group` — change counters → value is the counter-group's own **object** value, keyed per counter (e.g. `{ adults: 2, children: 1 }`) — see auro-counter-group docs for its exact shape **[v6]**

### 1.2 Which form elements are included
- [ ] A form element **without** a `name` attribute → excluded from `form.value` entirely
- [ ] Give a previously-nameless form element a `name` at runtime → it is picked up and appears in `form.value` **[v6]**
- [ ] A **disabled** form element → excluded from `form.value`, even if it holds a value **[v6]**
- [ ] An Auro form element registered under a custom tag name (e.g. `auro-input` registered as `custom-input`) is still recognized and collected via the original Auro tag it carries as an attribute
- [ ] `auro-button` / `button` are not collected into `form.value` (they're actions, not data fields)

### 1.3 Key ordering & structure
- [ ] Confirm each key in `form.value` matches the form element's `name` exactly
- [ ] Confirm nested-component values (select multi, datepicker range, counter-group) are structured as described in 1.1

---

## 2. Form-Element Discovery (slot & runtime DOM)

The form finds form elements on `slotchange`, and also watches for form elements that are added,
removed, renamed, or enabled/disabled at runtime.

- [ ] Place several Auro form elements in the default slot → all are collected and managed
- [ ] **Deeply nested** form elements (wrapped in one or more non-form elements, e.g. `<div><section><auro-input name="x"></auro-input></section></div>`) are discovered, not just direct children **[v6]**
- [ ] Add a form element to the DOM after first render (direct child) → it joins `formState`; form state is otherwise unchanged for existing fields
- [ ] Add a form element nested inside a non-form wrapper after first render → it is discovered and joins `formState` **[v6]**
- [ ] Remove a tracked form element from the DOM → it drops out of `formState` and `form.value`; its captured initial value is pruned **[v6]**
- [ ] Rename a tracked form element's `name` at runtime → `form.value` re-keys to the new name with no stale old key left behind **[v6]**
- [ ] Rename collision: rename field A to the name of field B → no leaked/duplicate initial-value bookkeeping **[v6]**

---

## 3. Submit Workflow

### 3.1 Submitting
- [ ] Fill all required fields validly and submit → `submit` event fires with `detail.value` equal to the current `form.value`
- [ ] Leave a required field empty and submit → invalid field surfaces its error and the `submit` event does **not** fire
- [ ] Multiple mixed valid/invalid fields → all invalid fields show errors simultaneously; no submit
- [ ] `submit()` forces validation on all **enabled** fields before deciding — an untouched required field is caught and blocks the submit
- [ ] Disabled fields are excluded from the submit payload and are **not** validated during submit **[v6]**
- [ ] All-disabled form → submit is allowed and fires an **empty** payload; `validity` stays `null` (see §5.1) **[v6]**

### 3.2 Submit-button auto-enablement **[v6]**
The form owns the `disabled` state of every slotted `type="submit"` button.
- [ ] Empty required form on load → submit button is **disabled**
- [ ] Fill the last required field validly → submit button **enables** live (no click needed)
- [ ] Re-introduce an invalid/empty required field → submit button **disables** again
- [ ] **Pre-filled valid** form on load → submit button is **enabled at first render**, before any user interaction (note: the public `validity` getter still reads `null` until interaction — only the button enablement bypasses that gate)
- [ ] Pre-filled valid form → calling `submit()` (or clicking submit) fires the `submit` event with no prior user edit
- [ ] A disabled + required field that is the *only* remaining blocker → submit button **enables** (the disabled field is not counted against validity) **[v6]**

---

## 4. Reset Workflow

### 4.1 Resetting
- [ ] Edit several fields, then `reset()` (or click a reset button) → all fields return to their initial values
- [ ] `reset` event fires with `detail.previousValue` containing the values captured **immediately before** reset
- [ ] Validation errors are cleared after reset
- [ ] `isInitialState` returns `true` after reset
- [ ] Reset a user-edited field, then confirm the form is back in initial state (value + validity)

### 4.2 Reset-button auto-enablement **[v6]**
The form owns the `disabled` state of every slotted `type="reset"` button.
- [ ] Pristine empty form on load → reset button is **disabled** (nothing to clear or restore)
- [ ] Edit any field → reset button **enables**
- [ ] **Pre-filled** form (fields carry default values) on load → reset button is **enabled at first render**
- [ ] Reset button state does **not flicker** during a `reset()` call (it settles once, not twice)
- [ ] Only-disabled fields carry values → reset button stays **disabled** (a disabled field's value is not resettable state) **[v6]**
- [ ] Edit a field, then disable that field → reset button **stays enabled** (the user must still have a path back to initial state) **[v6]**
- [ ] A sibling button disables the edited field *and* changes its own label in the same interaction → reset button still **stays enabled** **[v6]**

---

## 5. Validity & Initial State

### 5.1 `validity` getter
- [ ] Untouched form → `validity` returns `null`
- [ ] After interaction with all fields valid → returns `'valid'`
- [ ] Any required field invalid → returns `'invalid'`
- [ ] A field that is `required` but structurally empty is treated as invalid even before it has run a validation pass
- [ ] Disabled required fields do **not** make the form invalid **[v6]**

### 5.2 `isInitialState` / dirty tracking
- [ ] Fresh form (zero fields or untouched fields) → `true`
- [ ] Change any field's value → `false`
- [ ] **Backspace a text input back to empty** → returns to `true` (empty `''`, `undefined`, and `[]` all normalize to "no value", so clearing a field is not a permanent taint) **[v6]**
- [ ] Focus and blur a required field **without changing its value** → `false` (a failing validity acts as a backup taint signal) **[v6]**
- [ ] A field carrying a **default value** at first render → still `true` (a preset default is not a user edit) **[v6]**
- [ ] Edit a field, then **disable** it → form remains **non-initial** (`false`) — disabling does not erase the fact that the user touched it **[v6]**
- [ ] Initial values survive a **disconnect/reconnect** (slot move) — moving a form element does not re-baseline its edited value as the new default **[v6]**
- [ ] After a runtime **rename** of a user-edited field, the form stays non-initial **[v6]**

---

## 6. Disabled Form Elements **[v6]**

New in v6: disabled form elements are excluded from the form per the HTML spec (form elements
that are disabled are not submitted, not validated, and do not count toward form state). The form
reads the live `disabled` **attribute** and re-evaluates when it toggles.

- [ ] Load a form with a disabled form element → it is absent from `form.value`
- [ ] Remove the `disabled` attribute at runtime → the form element **re-appears** in `form.value` and re-enters validity/state
- [ ] Add the `disabled` attribute at runtime → the form element drops out of `form.value` and stops affecting validity, and submit/reset button enablement refreshes accordingly
- [ ] A disabled required field never blocks submit (see 3.2) and never marks the form invalid (see 5.1)
- [ ] Enter key pressed while focus is on a **disabled** form element → does **not** submit the form
- [ ] All form elements disabled → `form.value` is `{}` and submit fires an empty payload. The public `validity` getter stays `null` (gated by initial state), even though the raw constraint check that gates submit passes

---

## 7. Keyboard Interactions

- [ ] Tab through the form → focus moves in logical DOM order through all interactive form elements and buttons
- [ ] Shift+Tab → focus moves backward in the same order
- [ ] Fill out the entire form using only the keyboard → every form element is reachable and operable
- [ ] Press **Enter** inside a single-line text input → the form submits (equivalent to clicking submit) **[v6: gated by the rules below]**
- [ ] Press Enter inside a **textarea** (or an input with the `textarea` attribute) → a newline is inserted; the form does **not** submit
- [ ] Press Enter while focused on a **disabled** form element → nothing happens (no submit) **[v6]**
- [ ] Enter/Space on the submit button → form submits
- [ ] Enter/Space on the reset button → form resets

---

## 8. Mouse & Touch Interactions

- [ ] Click each form element → it receives focus and operates independently
- [ ] Click submit with a valid form → validates and submits
- [ ] Click submit with invalid fields → errors display, no submit
- [ ] Click reset → all fields return to initial state
- [ ] Tap each form element (touch) → receives focus; virtual keyboard opens for text inputs where appropriate
- [ ] Tap submit / reset (touch) → same behavior as click
- [ ] Confirm submit/reset buttons appear visually disabled when the form auto-disables them (§3.2 / §4.2) and cannot be activated by mouse or touch while disabled **[v6]**

---

## 9. Events

- [ ] Type in a field → an `input` event is observable on the form (it bubbles from the field; the form doesn't dispatch its own `input`)
- [ ] Change a field's value → `change` event fires on the form
- [ ] Form (re)initializes its state (slot change / form-element add-remove) → a `change` event fires **[v6]**
- [ ] Submit a valid form → `submit` event fires with `detail.value`
- [ ] Reset the form → `reset` event fires with `detail.previousValue`
- [ ] A form element **without** a `name` → not added to `form.value`; the form dispatches no `change` for it

---

## 10. Accessibility

Per-field screen-reader behavior — labels, required state, error text, and each component's
fullscreen bib — is owned and tested by the individual components and does **not** need
re-testing here. auro-form adds no ARIA role and no focus management of its own. A short
VoiceOver/NVDA pass over the **form-level** behaviors below is still worth doing, since these
emerge only from the assembled form and aren't covered by any single component's plan:

- [ ] When the form **enables** a previously-disabled Submit/Reset button, it (re)enters the tab order and is reachable and announced as an actionable button. Note: a disabled auro-button is **not focusable**, so its disabled state produces no screen-reader feedback and the form adds no `aria-live` for the toggle — expected, matching native buttons **[v6]**
- [ ] Failed submit → all invalid fields surface their errors and the result is coherent to a screen reader (note: `auro-form` does **not** move focus to the first invalid field — confirm that's acceptable for your flow)
- [ ] Enter-to-submit from a field behaves as expected for keyboard / screen-reader users (§7)
- [ ] Runtime DOM changes (add / remove / rename / disable a field, §2) don't cause rogue focus loss or spurious announcements

---

## 11. Public API

### Methods
- [ ] `submit()` — instance method (`form.submit()`): validates all enabled fields, fires `submit` if all valid, surfaces errors otherwise
- [ ] `reset()` — instance method (`form.reset()`): returns all fields to initial state and fires `reset` with `detail.previousValue`
- [ ] `AuroForm.register(name)` — **static** method, called on the class (`AuroForm.register('custom-form')`), not on an instance: registers the element under a custom tag; the custom-named form renders/behaves identically

### Properties (read)
- [ ] `value` — key-value object of enabled, named field values (§1)
- [ ] `validity` — `null` / `'valid'` / `'invalid'` (§5.1)
- [ ] `isInitialState` — `true` until a user edit or failing interaction (§5.2)
