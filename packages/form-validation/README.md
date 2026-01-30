# @aurodesignsystem/form-validation

Shared validation logic for all form components in the `auro-formkit` monorepo. Used internally by `auro-input`, `auro-datepicker`, `auro-counter`, and `auro-combobox`.

## Usage

```js
import AuroFormValidation from '@aurodesignsystem/form-validation';

const validation = new AuroFormValidation();
validation.validate(elem);
```

## API

### `validate(elem, force?)`

Runs the full validation pipeline for the given element. Sets `elem.validity` and `elem.errorMessage`. Fires `auroFormElement-validated` when complete.

### `validateType(elem)` _(private)_

Type-specific validation for `auro-input`. Handles `email`, `credit-card`, `number`, and `date` types.

### `validateElementAttributes(elem)` _(private)_

Attribute-based validation (`minLength`, `maxLength`, `pattern`) for `auro-input`, and range constraints for `auro-counter`.

## Validity states

| State | Trigger |
|---|---|
| `valueMissing` | `required` field left empty |
| `tooShort` | Value shorter than `minLength` (or date value shorter than expected format length) |
| `tooLong` | Value longer than `maxLength` (or date value longer than expected format length) |
| `patternMismatch` | Value does not match `pattern`; or for `type="date"`, a structurally complete date string that is not a valid calendar date (e.g. `02/30/2024`) |
| `rangeOverflow` | Numeric or date value exceeds `max` |
| `rangeUnderflow` | Numeric or date value is below `min` |
| `customError` | `error` attribute is set |

## Date type validation and `patternMismatch`

For `type="date"` inputs, an invalid date (value passes length checks but fails `dateFormatter.isValidDate`) is reported as **`patternMismatch`**, not `invalidDate`. This aligns with the [HTML living standard ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch) and allows consumers to supply a custom message via `setCustomValidityPatternMismatch`.

```html
<auro-input
  type="date"
  setCustomValidityPatternMismatch="Please enter a valid date.">
</auro-input>
```

The default fallback message when no custom string is provided is `"Invalid Date Format Entered"`.
