# API Inconsistency Analysis

> **Generated:** May 5, 2026
>
> This report identifies inconsistent feature implementations across auro-formkit components where similar features use different names, conventions, or methods of implementation.

---

## Table of Contents

1. [Attribute/Property Casing Mismatches](#1-attributeproperty-casing-mismatches)
2. [Event Naming Conventions](#2-event-naming-conventions)
3. [Default Slot Naming](#3-default-slot-naming)
4. [Label vs Legend Slot Naming](#4-label-vs-legend-slot-naming)
5. [Clear/Reset Method Inconsistency](#5-clearreset-method-inconsistency)
6. [Show/Hide Method Naming](#6-showhide-method-naming)
7. [Validation Attribute Coverage](#7-validation-attribute-coverage)
8. [touched Property Missing from Some Form Elements](#8-touched-property-missing-from-some-form-elements)
9. [CSS Parts Naming Inconsistency](#9-css-parts-naming-inconsistency)
10. [Open/Visible State Naming](#10-openvisible-state-naming)
11. [Fullscreen/Breakpoint Attribute Naming](#11-fullscreenbreakpoint-attribute-naming)
12. [Aria Label Slot Naming Patterns](#12-aria-label-slot-naming-patterns)
13. [Focus Method Availability](#13-focus-method-availability)
14. [Optional Label Slot Availability](#14-optional-label-slot-availability)
15. [Required Attribute Availability](#15-required-attribute-availability)
16. [`input` Event and `*-valueSet` Event Coverage](#16-input-event-and--valueset-event-coverage)
17. [Dropdown Pass-Through Features Per Component](#17-dropdown-pass-through-features-per-component)

---

## 1. Attribute/Property Casing Mismatches

Multiple properties use camelCase internally but their reflected HTML attributes are inconsistently cased across components and sometimes even within the same component.

### `onDark` / `ondark`

| Component | `onDark` attr | `ondark` attr | `onDark` prop | Notes |
|---|---|---|---|---|
| `auro-checkbox-group` | ✅ | ❌ | ✅ | Only camelCase attr |
| `auro-checkbox` | ✅ | ❌ | ✅ | Only camelCase attr |
| `auro-radio-group` | ✅ | ❌ | ✅ | Only camelCase attr |
| `auro-radio` | ✅ | ❌ | ✅ | Only camelCase attr |
| `auro-counter` | ✅ | ❌ | ✅ | Only camelCase attr |
| `auro-counter-group` | ✅ | ✅ | ✅ | Both casings |
| `auro-combobox` | ✅ | ✅ | ✅ | Both casings |
| `auro-datepicker` | ✅ | ✅ | ✅ | Both casings |
| `auro-dropdown` | ✅ | ✅ | ✅ | Both casings |
| `auro-input` | ✅ | ✅ | ✅ | Both casings |
| `auro-select` | ✅ | ✅ | ✅ | Both casings |
| `auro-menu` | ❌ | ✅ | ✅ | Only lowercase attr |
| `auro-menuoption` | ❌ | ✅ | ✅ | Only lowercase attr |

**Issue:** Three different behaviors exist: some components only accept camelCase `onDark`, some only lowercase `ondark`, and some accept both. This creates unpredictable behavior for consumers.

### `multiSelect` / `multiselect`

| Component | Attribute | Property |
|---|---|---|
| `auro-menu` | `multiselect` | `multiSelect` |
| `auro-select` | `multiselect` | `multiSelect` |

**Issue:** The attribute is lowercase `multiselect` but the property is camelCase `multiSelect`. While this is technically how HTML attributes work (always lowercase), the `custom-elements.json` manifest should clarify the mapping.

### `matchWord` / `matchword`

| Component | Attribute | Property |
|---|---|---|
| `auro-menu` | `matchword` (lowercase) | `matchWord` (camelCase) |
| `auro-menuoption` | `matchWord` (camelCase) | `matchWord` (camelCase) |

**Issue:** `auro-menu` uses lowercase `matchword` for the attribute while `auro-menuoption` uses camelCase `matchWord`. These are part of the same component family and should be consistent.

### `noCheckmark` / `nocheckmark`

| Component | Attribute | Property |
|---|---|---|
| `auro-menu` | `nocheckmark` (lowercase) | `noCheckmark` (camelCase) |
| `auro-menuoption` | `noCheckmark` (camelCase) | `noCheckmark` (camelCase) |
| `auro-select` | `noCheckmark` (camelCase) | `noCheckmark` (camelCase) |

**Issue:** `auro-menu` uses lowercase `nocheckmark` while `auro-menuoption` and `auro-select` use camelCase `noCheckmark`. 

### `optionSelected` / `optionactive`

| Component | Attribute(s) | Property(s) |
|---|---|---|
| `auro-menu` | `optionactive` (lowercase), `optionSelected` (camelCase) | `optionActive`, `optionSelected` |
| `auro-combobox` | `optionSelected` (camelCase) | `optionSelected`, `optionActive` |
| `auro-radio-group` | `optionSelected` (camelCase) | `optionSelected` |
| `auro-select` | `optionSelected` (camelCase) | `optionSelected` |

**Issue:** `auro-menu` uses `optionactive` (lowercase) as an attribute but `optionSelected` (camelCase) — inconsistent casing within the same component.

### `noMatch` / `nomatch`

| Component | Attribute | Property |
|---|---|---|
| `auro-menuoption` | `nomatch` (lowercase) | `noMatch` (camelCase) |

**Issue:** Attribute uses lowercase while property uses camelCase — not inherently wrong for HTML, but inconsistent with sibling properties like `noCheckmark` which uses camelCase for the attribute too.

---

## 2. Event Naming Conventions

Components use multiple conflicting patterns for custom event names.

### Pattern Inventory

| Pattern | Example | Components |
|---|---|---|
| `auroComponentName-eventName` (camelCase prefix) | `auroCombobox-valueSet` | combobox, datepicker, dropdown, input, menu, menuoption, radio, select |
| `auroFormElement-validated` | `auroFormElement-validated` | checkbox-group, combobox, datepicker, input, radio-group, select |
| `kebab-case` | `close-click`, `date-is-hovered` | bibtemplate, calendar-cell |
| `camelCase` (no prefix) | `toggleSelected`, `focusSelected`, `resetRadio`, `inputValue` | radio, combobox |
| Standard DOM events | `input`, `change` | most components |

### Specific Inconsistencies

| Feature | Component | Event Name |
|---|---|---|
| Value set | `auro-combobox` | `auroCombobox-valueSet` |
| Value set | `auro-datepicker` | `auroDatePicker-valueSet` |
| Value set | `auro-select` | `auroSelect-valueSet` |
| Toggled | `auro-datepicker` | `auroDatePicker-toggled` |
| Toggled | `auro-dropdown` | `auroDropdown-toggled` |
| Close click | `auro-bibtemplate` | `close-click` (kebab-case) |
| Mouse interaction | `auro-formkit-calendar-cell` | `date-is-hovered` (kebab-case) |
| Checkbox input | `auro-checkbox` | `auroCheckbox-input` (prefixed) AND `input` (native) |
| Radio selection | `auro-radio` | `toggleSelected`, `focusSelected`, `resetRadio` (no prefix, camelCase) |

**Issues:**
- `auroDatePicker` uses capital "P" in "Picker" while `auroCombobox` and `auroSelect` do not capitalize the second word — inconsistent capitalization in event prefixes.
- `auro-radio` emits unprefixed camelCase events (`toggleSelected`, `focusSelected`, `resetRadio`) while other components use the `auroComponent-event` pattern.
- `auro-bibtemplate` and `auro-formkit-calendar-cell` use kebab-case (`close-click`, `date-is-hovered`) while all other components use camelCase patterns.
- `auro-checkbox` emits both `auroCheckbox-input` and the native `input` event for the same action.
- `auro-combobox` emits an `inputValue` event (camelCase, no prefix) that is inconsistent with all other event patterns.

---

## 3. Default Slot Naming

Components use three different conventions for naming their default (unnamed) slot.

| Convention | Components |
|---|---|
| `default` (named) | `auro-bibtemplate`, `auro-checkbox-group`, `auro-checkbox`, `auro-counter-group`, `auro-counter`, `auro-form`, `auro-menuoption` |
| `""` (empty string / truly unnamed) | `auro-combobox`, `auro-dropdown`, `auro-menu`, `auro-select` |
| `Default` (capitalized) | `auro-counter-wrapper` |

**Issue:** Three different representations of the same concept. `auro-counter-wrapper` uniquely capitalizes `Default` while its sibling `auro-counter` uses lowercase `default`. The combobox/dropdown/menu/select family uses empty string while others use `default`.

---

## 4. Label vs Legend Slot Naming

Components that accept a primary label use two different slot names depending on the component type.

| Slot Name | Components |
|---|---|
| `label` | `auro-input`, `auro-select`, `auro-combobox`, `auro-datepicker`, `auro-counter-group` |
| `legend` | `auro-checkbox-group`, `auro-radio-group` |

**Issue:** `auro-checkbox-group` and `auro-radio-group` use `legend` (following HTML `<fieldset>` semantics) while all other form elements use `label`. While this has a semantic basis, it creates an inconsistent developer experience — consumers must remember which term each component uses for the same visual feature (a heading/label above the form control).

---

## 5. Clear/Reset Method Inconsistency

Components implement value-clearing functionality with different method names.

| Component | Methods | Notes |
|---|---|---|
| `auro-input` | `reset()`, `clear()` | Both available |
| `auro-combobox` | `reset()`, `clear()` | Both available |
| `auro-datepicker` | `reset()`, `clear()` | Both available |
| `auro-select` | `reset()`, `clearSelection()` | Uses `clearSelection` instead of `clear` |
| `auro-menu` | `reset()`, `clearSelection()` | Uses `clearSelection` instead of `clear` |
| `auro-checkbox-group` | `reset()` | No clear method |
| `auro-checkbox` | `reset()` | No clear method |
| `auro-radio-group` | `reset()` | No clear method |
| `auro-radio` | `reset()` | No clear method |
| `auro-counter-group` | _(none)_ | No reset or clear |
| `auro-counter` | _(none)_ | No reset or clear |
| `auro-form` | `reset()` | No clear method |

**Issues:**
- `auro-select` and `auro-menu` use `clearSelection()` while `auro-input`, `auro-combobox`, and `auro-datepicker` use `clear()` for the same concept.
- `auro-counter` and `auro-counter-group` have no `reset()` method at all, unlike every other form element.

---

## 6. Show/Hide Method Naming

Components that contain a dropdown/bib use inconsistent method names.

| Component | Show Method | Hide Method |
|---|---|---|
| `auro-dropdown` | `show()` | `hide()` |
| `auro-combobox` | `showBib()` | `hideBib()` |
| `auro-datepicker` | `showBib()` | `hideBib()` |
| `auro-select` | `showBib()` | `hideBib()` |
| `auro-counter-group` | `showBib()` | `hideBib()` |

**Issue:** `auro-dropdown` uses simple `show()`/`hide()` methods while all components that wrap a dropdown use `showBib()`/`hideBib()`. Since the higher-level components delegate to `auro-dropdown`, the naming mismatch means consumers must remember different method names depending on which level of abstraction they're interacting with.

---

## 7. Validation Attribute Coverage

Form-participating components have inconsistent validation attribute support.

| Attribute | input | select | combobox | datepicker | checkbox-group | radio-group | counter-group | counter |
|---|---|---|---|---|---|---|---|---|
| `error` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `validity` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `noValidate` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `setCustomValidity` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `setCustomValidityCustomError` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `setCustomValidityValueMissing` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `required` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `validateOnInput` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `setCustomValidityRangeOverflow` | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `setCustomValidityRangeUnderflow` | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `setCustomValidityBadInput` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `setCustomValidityTooLong` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `setCustomValidityTooShort` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `setCustomValidityForType` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `setCustomValidityValueMissingFilter` | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `errorMessage` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `customValidityTypeEmail` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Issues:**
- `auro-counter-group` and `auro-counter` lack `noValidate`, `setCustomValidity`, `setCustomValidityCustomError`, `setCustomValidityValueMissing`, and `required` — the full set of validation controls available on other form elements.
- `validateOnInput` is only on `auro-input`. Other components that validate (combobox, select, datepicker) cannot opt in to this behavior.
- `errorMessage` is only on `auro-input`, while `auro-dropdown` also has it — but other form elements do not.
- The `auroFormElement-validated` event is emitted by input, select, combobox, datepicker, checkbox-group, and radio-group — but NOT by counter-group or counter.

---

## 8. `touched` Property Missing from Some Form Elements

| Component | Has `touched` |
|---|---|
| `auro-input` | ✅ |
| `auro-select` | ✅ |
| `auro-combobox` | ✅ |
| `auro-datepicker` | ✅ |
| `auro-radio-group` | ✅ |
| `auro-checkbox-group` | ❌ |
| `auro-counter-group` | ❌ |
| `auro-counter` | ❌ |

**Issue:** `auro-checkbox-group`, `auro-counter-group`, and `auro-counter` lack the `touched` property that other form elements provide. This property is important for knowing whether to show validation errors (typically only shown after user interaction).

---

## 9. CSS Parts Naming Inconsistency

Components that expose CSS parts use different naming conventions for equivalent structural elements.

### Help Text Part

| Component | Part Name |
|---|---|
| `auro-input` | `helpText`, `inputHelpText` |
| `auro-dropdown` | `helpText` |
| `auro-datepicker` | `helpText`, `helpTextSpan` |
| `auro-select` | `helpText` |
| `auro-checkbox` | _(none)_ |
| `auro-radio-group` | _(none)_ |

**Issue:** `auro-input` exposes both `helpText` and `inputHelpText`, `auro-datepicker` exposes both `helpText` and `helpTextSpan`. It's unclear which to use. Checkbox and radio components expose no help text CSS parts at all.

### Trigger Part

| Component | Part Name |
|---|---|
| `auro-dropdown` | `trigger` |
| `auro-datepicker` | `trigger` |
| `auro-select` | `dropdownTrigger` |

**Issue:** `auro-select` prefixes with `dropdown` (`dropdownTrigger`) while `auro-dropdown` and `auro-datepicker` use just `trigger`.

### Chevron Part

| Component | Part Name |
|---|---|
| `auro-dropdown` | `chevron` |
| `auro-select` | `dropdownChevron` |

**Issue:** Same prefix inconsistency — `dropdownChevron` vs `chevron`.

### Size Part

| Component | Part Name |
|---|---|
| `auro-dropdown` | `size` |
| `auro-select` | `dropdownSize` |

### Missing CSS Parts

| Component | CSS Parts |
|---|---|
| `auro-combobox` | _(none)_ |
| `auro-counter` | _(none)_ |
| `auro-counter-group` | _(none)_ |
| `auro-menu` | _(none)_ |
| `auro-menuoption` | _(none)_ |
| `auro-select` | Partial (`dropdownTrigger`, `dropdownChevron`, `dropdownSize`, `helpText`) |
| `auro-checkbox-group` | _(none)_ |

**Issue:** Many components expose no CSS parts at all, making them difficult to style. `auro-combobox` and `auro-select` are similar components but have very different levels of CSS part exposure.

---

## 10. Open/Visible State Naming

| Component | Attribute |
|---|---|
| `auro-dropdown` | `open` |
| `auro-select` | `isPopoverVisible` |

**Issue:** `auro-dropdown` uses `open` while `auro-select` uses `isPopoverVisible` for the same concept (whether the dropdown panel is showing). This forces consumers to learn two different attribute names for the same behavior.

---

## 11. Fullscreen/Breakpoint Attribute Naming

| Component | Attributes |
|---|---|
| `auro-bibtemplate` | `isFullscreen` |
| `auro-dropdown` | `isBibFullscreen`, `fullscreenBreakpoint` |
| `auro-combobox` | `largeFullscreenHeadline`, `fullscreenBreakpoint` |
| `auro-datepicker` | `fullscreenBreakpoint`, `largeFullscreenHeadline` |
| `auro-select` | `fullscreenBreakpoint`, `largeFullscreenHeadline` |
| `auro-counter-group` | `fullscreenBreakpoint`, `largeFullscreenHeadline` |
| `auro-formkit-calendar` | `isFullscreen`, `largeFullscreenHeadline`, `mobileBreakpoint` |

**Issues:**
- `auro-formkit-calendar` uses `mobileBreakpoint` while all other components use `fullscreenBreakpoint` for the same concept.
- `auro-bibtemplate` uses `isFullscreen` while `auro-dropdown` uses `isBibFullscreen` — different prefix for the same state.
- `auro-dropdown` does not have `largeFullscreenHeadline` while all the components that wrap it do.

---

## 12. Aria Label Slot Naming Patterns

Aria label slots follow inconsistent naming conventions.

| Component | Slot Name(s) |
|---|---|
| `auro-bibtemplate` | `ariaLabel.close` |
| `auro-input` | `ariaLabel.clear`, `ariaLabel.password.show`, `ariaLabel.password.hide` |
| `auro-combobox` | `ariaLabel.input.clear`, `ariaLabel.bib.close` |
| `auro-datepicker` | `ariaLabel.bib.close`, `ariaLabel.input.clear` |
| `auro-select` | `ariaLabel.bib.close` |
| `auro-counter-group` | `ariaLabel.bib.close` |
| `auro-counter` | `ariaLabel.minus`, `ariaLabel.plus` |

**Issues:**
- Clear button: `auro-input` uses `ariaLabel.clear` while `auro-combobox` and `auro-datepicker` use `ariaLabel.input.clear`. The extra `.input.` namespace is inconsistent.
- Close button: `auro-bibtemplate` uses `ariaLabel.close` while components wrapping it use `ariaLabel.bib.close`. The `.bib.` namespace is not present at the bibtemplate level.

---

## 13. Focus Method Availability

| Component | Has `focus()` method |
|---|---|
| `auro-input` | ✅ |
| `auro-combobox` | ✅ |
| `auro-datepicker` | ✅ |
| `auro-dropdown` | ✅ |
| `auro-select` | ❌ |
| `auro-checkbox-group` | ❌ |
| `auro-radio-group` | ❌ |
| `auro-counter-group` | ❌ |

**Issue:** `auro-select` has no `focus()` method, while the similar `auro-combobox` does. Checkbox-group, radio-group, and counter-group also lack programmatic focus control.

---

## 14. Optional Label Slot Availability

| Component | Has `optionalLabel` slot |
|---|---|
| `auro-input` | ✅ |
| `auro-select` | ✅ |
| `auro-combobox` | ✅ |
| `auro-datepicker` | ❌ |
| `auro-checkbox-group` | ✅ |
| `auro-radio-group` | ✅ |
| `auro-counter-group` | ❌ |

**Issue:** `auro-datepicker` and `auro-counter-group` lack the `optionalLabel` slot that other form elements provide.

---

## 15. `required` Attribute Availability

| Component | Has `required` |
|---|---|
| `auro-input` | ✅ |
| `auro-select` | ✅ |
| `auro-combobox` | ✅ |
| `auro-datepicker` | ✅ |
| `auro-checkbox-group` | ✅ |
| `auro-radio-group` | ✅ |
| `auro-counter-group` | ❌ |
| `auro-counter` | ❌ |

**Issue:** `auro-counter-group` and `auro-counter` have no `required` attribute even though they participate in forms and have `error` and `validity` attributes.

---

## 16. `input` Event and `*-valueSet` Event Coverage

Some components fire a component-specific `*-valueSet` custom event when a value is committed, in addition to the standard `input` event. However, the availability of these events is inconsistent across form elements.

### `input` Event Coverage

| Component | Fires `input` | Notes |
|---|---|---|
| `auro-input` | ✅ | |
| `auro-select` | ✅ | |
| `auro-combobox` | ✅ | |
| `auro-datepicker` | ✅ | |
| `auro-checkbox-group` | ✅ | |
| `auro-checkbox` | ✅ | Also fires `change` |
| `auro-radio-group` | ✅ | |
| `auro-radio` | ✅ | Also fires `change` |
| `auro-counter-group` | ✅ | |
| `auro-counter` | ✅ | |
| `auro-form` | ✅ | Also fires `change` |
| `auro-menu` | ❌ | Uses `auroMenu-selectedOption` instead |
| `auro-menuoption` | ❌ | Uses `auroMenuOption-click` instead |
| `auro-dropdown` | ❌ | Not a value-bearing component |
| `auro-bibtemplate` | ❌ | Not a value-bearing component |

**Issue:** `auro-menu` does not fire a standard `input` event. Since `auro-select` and `auro-combobox` both wrap `auro-menu` and do fire `input`, consumers listening at the menu level must use the component-specific `auroMenu-selectedOption` event instead. This makes it impossible to write a single generic `input` event listener that works at every level of the component hierarchy.

### `*-valueSet` Event Coverage

| Component | `*-valueSet` Event | `input` Event | Both? |
|---|---|---|---|
| `auro-combobox` | `auroCombobox-valueSet` | ✅ | ✅ |
| `auro-datepicker` | `auroDatePicker-valueSet` | ✅ | ✅ |
| `auro-select` | `auroSelect-valueSet` | ✅ | ✅ |
| `auro-input` | ❌ | ✅ | ❌ |
| `auro-checkbox-group` | ❌ | ✅ | ❌ |
| `auro-radio-group` | ❌ | ✅ | ❌ |
| `auro-counter-group` | ❌ | ✅ | ❌ |
| `auro-counter` | ❌ | ✅ | ❌ |

**Issues:**
- `auro-input` does not fire a `*-valueSet` event, while `auro-combobox`, `auro-datepicker`, and `auro-select` do. If a consumer is listening for `*-valueSet` as a "value committed" signal, `auro-input` provides no equivalent.
- `auro-checkbox-group`, `auro-radio-group`, `auro-counter-group`, and `auro-counter` also lack a `*-valueSet` event. Only the three dropdown-based components (combobox, datepicker, select) fire one.
- The `*-valueSet` events need to be marked as deprecated and all events need an `input` event.
- The `*-valueSet` events serve a different semantic purpose than `input` — they signal that a final value has been committed (e.g., an option selected in a dropdown) rather than an intermediate change. However, since only 3 of 8 form elements emit this event, consumers cannot rely on it as a universal pattern.

### Additional `input`-adjacent Event Inconsistencies

| Component | Extra Value/Input Events | Notes |
|---|---|---|
| `auro-combobox` | `inputValue` | Fires when the text input value changes (not the selected value). Unprefixed camelCase — unique pattern. |
| `auro-checkbox` | `auroCheckbox-input` | Fires in addition to the standard `input` event — duplicative. |
| `auro-input` | `auroInput-validityChange` | Fires on validity change, not value change — different concept but similar naming pattern. |
| `auro-radio` | `auroRadio-selected` | Fires on selection but the component also fires `input` and `change`. |

**Issue:** Several components fire component-specific events that overlap with or duplicate the standard `input` event, making it unclear which event consumers should listen to. For example, `auro-checkbox` fires both `input` and `auroCheckbox-input` — it is not documented whether these carry different payloads or serve different purposes.

---

## 17. Dropdown Pass-Through Features Per Component

Four components wrap `auro-dropdown` internally: `auro-combobox`, `auro-select`, `auro-datepicker`, and `auro-counter-group`. Each re-exposes a subset of dropdown attributes on its own API so consumers can control dropdown behavior without reaching into the shadow DOM. However, the set of forwarded features is inconsistent across wrappers, and none of the code for these features originates in the wrapper component — it all delegates to the inner `auro-dropdown`.

### Dropdown Placement & Positioning Attributes

These attributes control where and how the dropdown popover is positioned. All originate in `auro-dropdown`.

| Attribute | `auro-dropdown` | `auro-combobox` | `auro-select` | `auro-datepicker` | `auro-counter-group` |
|---|---|---|---|---|---|
| `placement` | ✅ (native) | ✅ | ✅ | ✅ | ✅ |
| `offset` | ✅ (native) | ✅ | ✅ | ✅ | ✅ |
| `noFlip` | ✅ (native) | ✅ | ✅ | ✅ | ✅ |
| `shift` | ✅ (native) | ✅ | ✅ | ✅ | ✅ |
| `autoPlacement` | ✅ (native) | ✅ | ✅ | ✅ | ✅ |
| `matchWidth` | ✅ (native) | ✅ | ✅ | ❌ | ✅ |

**Issue:** `auro-datepicker` does not expose `matchWidth`, while the other three wrappers do. This means consumers cannot make the datepicker dropdown match the trigger width without directly accessing the internal dropdown.

### Dropdown Fullscreen / Mobile Attributes

| Attribute | `auro-dropdown` | `auro-combobox` | `auro-select` | `auro-datepicker` | `auro-counter-group` |
|---|---|---|---|---|---|
| `fullscreenBreakpoint` | ✅ (native) | ✅ | ✅ | ✅ | ✅ |
| `largeFullscreenHeadline` | ❌ | ✅ | ✅ | ✅ | ✅ |
| `isBibFullscreen` | ✅ (native) | ❌ | ❌ | ❌ | ❌ |

**Issues:**
- `largeFullscreenHeadline` exists on all four wrappers but NOT on `auro-dropdown` itself. The feature is implemented at the wrapper level, not the dropdown level — yet it controls how the dropdown's bibtemplate renders.
- `isBibFullscreen` is a read-only state on `auro-dropdown` indicating whether the bib is currently in fullscreen mode. None of the wrappers expose this, so consumers must reach into the shadow DOM to check this state.

### Dropdown Visibility State

| Feature | `auro-dropdown` | `auro-combobox` | `auro-select` | `auro-datepicker` | `auro-counter-group` |
|---|---|---|---|---|---|
| Open state attr | `open` | ❌ | `isPopoverVisible` | ❌ | ❌ |
| Open state prop | `isPopoverVisible` | `dropdownOpen` | `isPopoverVisible` | ❌ | ❌ |
| Show method | `show()` | `showBib()` | `showBib()` | `showBib()` | `showBib()` |
| Hide method | `hide()` | `hideBib()` | `hideBib()` | `hideBib()` | `hideBib()` |

**Issues:**
- The open/visible state uses three different names: `open` (dropdown attr), `isPopoverVisible` (dropdown prop & select attr), and `dropdownOpen` (combobox prop). Datepicker and counter-group expose no visibility state at all.
- `show()`/`hide()` on the dropdown becomes `showBib()`/`hideBib()` on all wrappers — a consistent rename across wrappers, but inconsistent with the dropdown itself.

### Dropdown Behavior Attributes NOT Forwarded by Any Wrapper

The following `auro-dropdown` attributes are never re-exposed by any wrapper component. To use these features, consumers would need to access the internal dropdown element directly (breaking encapsulation).

| Attribute | Purpose | Potential Need |
|---|---|---|
| `chevron` | Show/hide chevron icon on trigger | Select and combobox manage their own chevrons |
| `simple` | Simplified dropdown without border styling | Could be useful for custom layouts |
| `disableEventShow` | Prevent show on click/focus events | Wrappers manage show behavior internally |
| `disableKeyboardHandling` | Disable built-in keyboard navigation | Wrappers implement their own keyboard handling |
| `dropdownWidth` | Set explicit dropdown width | Could be useful for custom sizing |
| `focusShow` | Show dropdown on trigger focus | Wrappers manage focus behavior internally |
| `hoverToggle` | Toggle dropdown on hover | Not forwarded — may be intentional |
| `noHideOnThisFocusLoss` | Prevent close on focus loss | All wrappers set this internally to `true` |
| `noToggle` | Disable toggle behavior on click | Wrappers manage toggle behavior internally |
| `parentBorder` | Show border inherited from parent | Not forwarded |
| `hasTriggerContent` | Whether trigger slot has content | Managed internally by wrappers |

**Issue:** While many of these are intentionally managed by the wrapper (e.g., `noHideOnThisFocusLoss` is always set to `true` internally), some could be genuinely useful to consumers (e.g., `dropdownWidth`, `simple`). The lack of any documentation about which dropdown features are intentionally hidden vs. accidentally omitted makes it unclear whether consumers should attempt to work around the gaps.

### Bib-Related Slots (Originate Outside Dropdown)

These slots exist on wrapper components to feed content into the `auro-bibtemplate` (fullscreen overlay) rendered inside the dropdown. The slot names and availability vary.

| Slot | `auro-combobox` | `auro-select` | `auro-datepicker` | `auro-counter-group` |
|---|---|---|---|---|
| `ariaLabel.bib.close` | ✅ | ✅ | ✅ | ✅ |
| `bib.fullscreen.headline` | ✅ | ✅ | ✅ | ✅ |
| `bib.fullscreen.footer` | ❌ | ❌ | ❌ | ✅ |
| `bib.fullscreen.dateLabel` | ❌ | ❌ | ✅ | ❌ |
| `bib.fullscreen.fromLabel` | ❌ | ❌ | ✅ | ❌ |
| `bib.fullscreen.toLabel` | ❌ | ❌ | ✅ | ❌ |

**Issues:**
- `bib.fullscreen.footer` is only available on `auro-counter-group`. Other components have no way to add custom footer content to the fullscreen bib.
- The datepicker-specific label slots (`dateLabel`, `fromLabel`, `toLabel`) are domain-specific and expected to vary, but the absence of a generic footer slot on combobox, select, and datepicker is a gap if consumers need to add action buttons to the fullscreen view.

### Per-Component Summary

#### `auro-combobox`

| Category | Pass-Through Features |
|---|---|
| Placement | `placement`, `offset`, `noFlip`, `shift`, `autoPlacement`, `matchWidth` |
| Fullscreen | `fullscreenBreakpoint`, `largeFullscreenHeadline` |
| Visibility | `dropdownOpen` (prop only, unique name) |
| Show/Hide | `showBib()` / `hideBib()` |
| Internal refs | `dropdownId` (prop), `dropdownOpen` (prop) |
| Missing | `matchWidth` visible but no `open` attr, no `isBibFullscreen`, no `isPopoverVisible` |

#### `auro-select`

| Category | Pass-Through Features |
|---|---|
| Placement | `placement`, `offset`, `noFlip`, `shift`, `autoPlacement`, `matchWidth` |
| Fullscreen | `fullscreenBreakpoint`, `largeFullscreenHeadline` |
| Visibility | `isPopoverVisible` (attr + prop, same name as dropdown prop) |
| Show/Hide | `showBib()` / `hideBib()` |
| Internal refs | `dropdownTag` (prop), `bibtemplateTag` (prop) |
| Missing | No `open` attr (uses `isPopoverVisible` instead), no `isBibFullscreen` |

#### `auro-datepicker`

| Category | Pass-Through Features |
|---|---|
| Placement | `placement`, `offset`, `noFlip`, `shift`, `autoPlacement` |
| Fullscreen | `fullscreenBreakpoint`, `largeFullscreenHeadline` |
| Visibility | ❌ No public visibility state |
| Show/Hide | `showBib()` / `hideBib()` |
| Internal refs | `dropdownTag` (prop) |
| Missing | `matchWidth`, no visibility state at all, no `isBibFullscreen` |

#### `auro-counter-group`

| Category | Pass-Through Features |
|---|---|
| Placement | `placement`, `offset`, `noFlip`, `shift`, `autoPlacement`, `matchWidth` |
| Fullscreen | `fullscreenBreakpoint`, `largeFullscreenHeadline` |
| Visibility | ❌ No public visibility state |
| Show/Hide | `showBib()` / `hideBib()` |
| Internal refs | `dropdown` (prop), `dropdownTag` (prop), `bibtemplate` (prop), `bibtemplateTag` (prop), `isDropdown` (prop) |
| Missing | No visibility state, no `isBibFullscreen` |

---

## Summary of Highest-Impact Inconsistencies

| Priority | Issue | Impact |
|---|---|---|
| 🔴 High | `onDark` attribute casing varies (3 behaviors) | Components in the same form may not respond to the same attribute |
| 🔴 High | Event naming uses 4+ different conventions | Consumers cannot predict event names |
| 🔴 High | `clear()` vs `clearSelection()` for same concept | Breaking mental model across select/menu vs input/combobox |
| 🟠 Medium | `auro-counter-group`/`auro-counter` missing validation infrastructure | Cannot fully participate in form validation |
| 🟠 Medium | CSS Parts naming (`trigger` vs `dropdownTrigger`) | Styling code cannot be reused across components |
| 🟠 Medium | `open` vs `isPopoverVisible` for dropdown state | Same concept, different names |
| 🟠 Medium | `label` vs `legend` slot for primary heading | Inconsistent slot name for same visual feature |
| 🟠 Medium | `touched` missing from checkbox-group, counter components | Validation UX cannot be consistent |
| 🟠 Medium | `*-valueSet` only on 3 of 8 form elements | Cannot use as universal "value committed" signal |
| 🟠 Medium | `auro-menu` lacks `input` event | Generic listeners break at the menu level |
| 🟠 Medium | `matchWidth` not forwarded by datepicker | Cannot match dropdown to trigger width |
| 🟠 Medium | Datepicker/counter-group expose no dropdown visibility state | Cannot check if dropdown is open |
| 🟡 Low | Default slot naming (`default` vs `""` vs `Default`) | Documentation confusion; functionally equivalent |
| 🟡 Low | `matchword` vs `matchWord` attribute casing between menu/menuoption | Sibling components disagree |
| 🟡 Low | Aria label slots (`ariaLabel.clear` vs `ariaLabel.input.clear`) | Inconsistent namespacing |
| 🟡 Low | `mobileBreakpoint` vs `fullscreenBreakpoint` | Same concept, different names |
| 🟡 Low | `dropdownOpen` vs `isPopoverVisible` vs `open` for same state | Three names for same concept across wrappers |
