import{j as e}from"./index-BlAcB6DZ.js";import{useMDXComponents as l}from"./index-DMGburbG.js";import{s as d,B as c,D as h,P as u,a as p,V as m,M as x,b as f,c as b,d as j,e as y,f as g,g as v,R as w,A as C,N as T,F as V,h as S,i as M,S as U,E as k,j as D,k as E,l as L,C as I,m as P,T as z,n as R,o as q,Y as A,p as N,q as $,r as O,t as F}from"./input.stories-D2b6G2hP.js";import"./_commonjsHelpers-gnU0ypJ3.js";import"./storybook-utils-BWaCeRRT.js";import"./lit-element-CzkqXGGu.js";import"./static-CzM4uoyW.js";import"./async-directive-ByMGbIdb.js";import"./directive-helpers-BYhjznv8.js";import"./repeat-NDFA8eVF.js";import"./i18n-CTuy9VQV.js";import"./validation-DrYD_Tc9.js";import"./auroElement-CqxMywsH.js";import"./version-CcLPgAjI.js";import"./auro-icon-CNMF0wKG-vCjlPHA5.js";import"./auro-button-CvWxpTkj-B19uADyS.js";import"./registered-DrZ9fufq.js";const W="Use the `<auro-input>` custom element to create basic single-line text fields. Supports type `text`, `password`, and `email` with validation, required input, error states and a secondary `bordered` theme. Use the slots `label` and `helpText` for additional content support.\n",H='# auro-input\n\nGenerate unique names for dependency components.\n\n## Properties\n\n| Property                           | Attribute                         | Modifiers | Type                                             | Default     | Description                                      |\n|------------------------------------|-----------------------------------|-----------|--------------------------------------------------|-------------|--------------------------------------------------|\n| `a11yControls`                     | `a11yControls`                    |           | `string`                                         |             | The value for the aria-controls attribute.       |\n| `a11yExpanded`                     | `a11yExpanded`                    |           | `boolean`                                        |             | The value for the aria-expanded attribute.       |\n| `a11yRole`                         | `a11yRole`                        |           | `string`                                         |             | The value for the role attribute.                |\n| `activeLabel`                      | `activeLabel`                     |           | `boolean`                                        | false       | If set, the label will remain fixed in the active position. |\n| `appearance`                       | `appearance`                      |           | `string`                                         | "\'default\'" | Defines whether the component will be on lighter or darker backgrounds. |\n| `autocapitalize`                   | `autocapitalize`                  |           | `string`                                         |             | An enumerated attribute that controls whether and how text input is automatically capitalized as it is entered/edited by the user. [off/none, on/sentences, words, characters]. |\n| `autocomplete`                     | `autocomplete`                    |           | `string`                                         |             | An enumerated attribute that defines what the user agent can suggest for autofill. At this time, only `autocomplete="off"` is supported. |\n| `autocorrect`                      | `autocorrect`                     |           | `string`                                         |             | When set to `off`, stops iOS from auto-correcting words when typed into a text box. |\n| `commonDisplayValueWrapperClasses` |                                   | readonly  | `{ [x: string]: boolean; displayValueWrapper: boolean; }` |             |                                                  |\n| `customValidityTypeEmail`          | `customValidityTypeEmail`         |           | `string`                                         |             | Custom help text message for email type validity. |\n| `disabled`                         | `disabled`                        |           | `boolean`                                        | false       | If set, disables the input.                      |\n| `dvInputOnly`                      | `dvInputOnly`                     |           | `boolean`                                        | false       | If defined, the display value slot content will only mask the HTML5 input element. The input\'s label will not be masked. |\n| `error`                            | `error`                           |           | `string`                                         |             | When defined, sets persistent validity to `customError` and sets `setCustomValidity` = attribute value. |\n| `errorMessage`                     | `errorMessage`                    |           | `string`                                         |             | Contains the help text message for the current validity error. |\n| `format`                           | `format`                          |           | `string`                                         |             | Specifies the input mask format.                 |\n| `icon`                             | `icon`                            |           | `boolean`                                        | false       | If set, will render an icon inside the input to the left of the value. Support is limited to auro-input instances with credit card format. |\n| `id`                               | `id`                              |           | `string`                                         |             | The id global attribute defines an identifier (ID) which must be unique in the whole document. |\n| `inputmode`                        | `inputmode`                       |           | `string`                                         |             | Exposes inputmode attribute for input.           |\n| `lang`                             | `lang`                            |           | `string`                                         |             | Defines the language of an element.              |\n| `max`                              | `max`                             |           | `string`                                         | "undefined" | The maximum value allowed. This only applies for inputs with a type of `number` and all date formats. |\n| `maxLength`                        | `maxLength`                       |           | `number`                                         | "undefined" | The maximum number of characters the user can enter into the text input. This must be an integer value `0` or higher. |\n| `min`                              | `min`                             |           | `string`                                         | "undefined" | The minimum value allowed. This only applies for inputs with a type of `number` and all date formats. |\n| `minLength`                        | `minLength`                       |           | `number`                                         | "undefined" | The minimum number of characters the user can enter into the text input. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`. |\n| `name`                             | `name`                            |           | `string`                                         |             | Populates the `name` attribute on the input.     |\n| `nested`                           | `nested`                          |           | `boolean`                                        |             | Sets styles for nested operation - removes borders, hides help + error text, and<br />hides accents. |\n| `noValidate`                       | `noValidate`                      |           | `boolean`                                        | false       | If set, disables auto-validation on blur.        |\n| `onDark`                           | `onDark`                          |           | `boolean`                                        | false       | DEPRECATED - use `appearance` instead.           |\n| `pattern`                          | `pattern`                         |           | `string`                                         |             | Specifies a regular expression the form control\'s value should match. |\n| `placeholder`                      | `placeholder`                     |           | `string`                                         |             | Define custom placeholder text.                  |\n| `readonly`                         | `readonly`                        |           | `boolean`                                        |             | Makes the input read-only, but can be set programmatically. |\n| `required`                         | `required`                        |           | `boolean`                                        | false       | Populates the `required` attribute on the input. Used for client-side validation. |\n| `setCustomValidity`                | `setCustomValidity`               |           | `string`                                         |             | Sets a custom help text message to display for all validityStates. |\n| `setCustomValidityBadInput`        | `setCustomValidityBadInput`       |           | `string`                                         |             | Custom help text message to display when validity = `badInput`. |\n| `setCustomValidityCustomError`     | `setCustomValidityCustomError`    |           | `string`                                         |             | Custom help text message to display when validity = `customError`. |\n| `setCustomValidityForType`         | `setCustomValidityForType`        |           | `string`                                         | "undefined" | Custom help text message to display for the declared element `type` and type validity fails. |\n| `setCustomValidityRangeOverflow`   | `setCustomValidityRangeOverflow`  |           | `string`                                         |             | Custom help text message to display when validity = `rangeOverflow`. |\n| `setCustomValidityRangeUnderflow`  | `setCustomValidityRangeUnderflow` |           | `string`                                         |             | Custom help text message to display when validity = `rangeUnderflow`. |\n| `setCustomValidityTooLong`         | `setCustomValidityTooLong`        |           | `string`                                         |             | Custom help text message to display when validity = `tooLong`. |\n| `setCustomValidityTooShort`        | `setCustomValidityTooShort`       |           | `string`                                         |             | Custom help text message to display when validity = `tooShort`. |\n| `setCustomValidityValueMissing`    | `setCustomValidityValueMissing`   |           | `string`                                         |             | Custom help text message to display when validity = `valueMissing`. |\n| `simple`                           | `simple`                          |           | `boolean`                                        |             | Simple makes the input render without a border.  |\n| `spellcheck`                       | `spellcheck`                      |           | `string`                                         |             | An enumerated attribute defines whether the element may be checked for spelling errors. [true, false]. When set to `false` the attribute `autocorrect` is set to `off` and `autocapitalize` is set to `none`. |\n| `type`                             | `type`                            |           | `string`                                         |             | Populates the `type` attribute on the input. Allowed values are `password`, `email`, `credit-card`, `date`, `tel` or `text`. If given value is not allowed or set, defaults to `text`. |\n| `validateOnInput`                  | `validateOnInput`                 |           | `boolean`                                        |             | Sets validation mode to re-eval with each input. |\n| `validity`                         | `validity`                        |           | `string`                                         |             | Specifies the `validityState` this element is in. |\n| `value`                            | `value`                           |           | `string`                                         |             | Populates the `value` attribute on the input. Can also be read to retrieve the current value of the input. |\n\n## Methods\n\n| Method     | Type                                   | Description                                      |\n|------------|----------------------------------------|--------------------------------------------------|\n| `clear`    | `(): void`                             | Clears the input value.                          |\n| `focus`    | `(): void`                             | Function to set element focus.                   |\n| `reset`    | `(): void`                             | Resets component to initial state, including resetting the touched state and validity. |\n| `validate` | `(force?: boolean \\| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |\n\n## Events\n\n| Event                       | Type               | Description                                      |\n|-----------------------------|--------------------|--------------------------------------------------|\n| `auroFormElement-validated` |                    | Notifies that the `validity` and `errorMessage` value has changed. |\n| `auroInput-validityChange`  | `CustomEvent<any>` |                                                  |\n| `input`                     | `InputEvent`       | Event fires when the value of an `auro-input` has been changed. |\n\n## Slots\n\n| Name                      | Description                                      |\n|---------------------------|--------------------------------------------------|\n| `ariaLabel.clear`         | Sets aria-label on clear button for screen reader to read |\n| `ariaLabel.password.hide` | Sets aria-label on password button to toggle off showing password |\n| `ariaLabel.password.show` | Sets aria-label on password button to toggle on showing password |\n| `displayValue`            | Allows custom HTML content to display in place of the value when the input is not focused. |\n| `helpText`                | Sets the help text displayed below the input.    |\n| `label`                   | Sets the label text for the input.               |\n| `optionalLabel`           | Allows overriding the optional display text "(optional)", which appears next to the label. |\n\n## CSS Shadow Parts\n\n| Part            | Description                                      |\n|-----------------|--------------------------------------------------|\n| `accent-left`   | Use for customizing the style of the left accent element (e.g. padding, margin) |\n| `accent-right`  | Use for customizing the style of the right accent element (e.g. padding, margin) |\n| `accentIcon`    | Use for customizing the style of the accentIcon element (e.g. credit card icon, calendar icon) |\n| `helpText`      | Use for customizing the style of the helpText element |\n| `iconContainer` | Use for customizing the style of the iconContainer (e.g. X icon for clearing input value) |\n| `input`         | Use for customizing the style of the input element |\n| `label`         | Use for customizing the style of the label element |\n| `wrapper`       | Use for customizing the style of the root element |\n',B=`/* stylelint-disable custom-property-empty-line-before */

@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-input-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});

  --ds-auro-input-outline-color: transparent;
}

:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-input-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});

  --ds-auro-input-outline-color: transparent;
}
`;function r(i){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...i.components},{Canvas:n,Markdown:s,Meta:a}=t;return n||o("Canvas"),s||o("Markdown"),a||o("Meta"),e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(t.h1,{id:"input",children:"Input"}),`
`,e.jsx(s,{children:W}),`
`,e.jsx(s,{children:H}),`
`,e.jsx(t.h2,{id:"api-examples",children:"API Examples"}),`
`,e.jsx(t.h2,{id:"localization-support",children:"Localization Support"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"auro-input"})," element supports the localization of all content managed within the scope of the element. This DOES NOT include any custom content placed in the ",e.jsx(t.code,{children:"slot"})," element."]}),`
`,`
`,`
`,e.jsx(t.h2,{id:"basic",children:"Basic"}),`
`,e.jsxs(t.p,{children:["The default component supports the basic input ",e.jsx(t.code,{children:'type="text"'})," structure. The ",e.jsx(t.code,{children:"(optional)"})," label is provided to instruct the user that their input is not required. Use the ",e.jsx(t.code,{children:"bordered"})," attribute for a bordered ",e.jsx(t.code,{children:"<auro-input>"}),"."]}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(t.h2,{id:"attribute-examples",children:"Attribute Examples"}),`
`,e.jsx(t.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"disable"})," attribute to prevent the user from interacting with the input."]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h3,{id:"placeholder",children:"Placeholder"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"placeholder"})," attribute to add a custom placeholder message within the element."]}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(t.h3,{id:"value",children:"Value"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"value"})," attribute to programmatically set the value of the input."]}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(t.h4,{id:"dynamically-set-value",children:"Dynamically Set Value"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"value"})," and other components to dynamically set the value of the input."]}),`
`,e.jsxs(t.p,{children:["Note: Setting the ",e.jsx(t.code,{children:"value"})," to ",e.jsx(t.code,{children:"undefined"})," will also reset the element."]}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(t.h3,{id:"max",children:"Max"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"max"})," attribute to define a maximum value used during validation. The attribute will only apply when ",e.jsx(t.code,{children:"<auro-input>"})," also has a ",e.jsx(t.code,{children:"type"})," attribute for ",e.jsx(t.code,{children:"number"})," or any date format."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"setCustomValidityRangeOverflow"})," attribute may optionally be used in combination with the ",e.jsx(t.code,{children:"max"})," attribute to define custom help text used when the input value is greater than the value of the ",e.jsx(t.code,{children:"max"})," attribute."]}),`
`,e.jsx(t.h4,{id:"date-example",children:"Date Example"}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(t.h4,{id:"number-example",children:"Number Example"}),`
`,e.jsx(n,{of:f}),`
`,e.jsx(t.h3,{id:"min",children:"Min"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"min"})," attribute to define a minimum value used during validation. The attribute will only apply when ",e.jsx(t.code,{children:"<auro-input>"})," also has a ",e.jsx(t.code,{children:"type"})," attribute for ",e.jsx(t.code,{children:"number"})," or any date format."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"setCustomValidityRangeUnderflow"})," attribute may optionally be used in combination with the ",e.jsx(t.code,{children:"min"})," attribute to define custom help text used when the input value is less than the value of the ",e.jsx(t.code,{children:"min"})," attribute."]}),`
`,e.jsx(t.h4,{id:"date-example-1",children:"Date Example"}),`
`,e.jsx(n,{of:b}),`
`,e.jsx(t.h4,{id:"number-example-1",children:"Number Example"}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(t.h3,{id:"max-length",children:"Max Length"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"maxlength"})," attribute to control the length of the input entered."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"setCustomValidityTooLong"})," attribute may optionally be used in combination with the ",e.jsx(t.code,{children:"maxLength"})," attribute to define custom help text used when the length of the input is too long."]}),`
`,e.jsx(n,{of:y}),`
`,e.jsxs(t.h3,{id:"min-length-",children:["Min Length ",e.jsx("a",{name:"minLength"})]}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"minlength"})," attribute to control the length of the input entered."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"setCustomValidityTooShort"})," attribute may optionally be used in combination with the ",e.jsx(t.code,{children:"minLength"})," attribute to define custom help text used when the length of the input is not long enough."]}),`
`,e.jsx(n,{of:g}),`
`,e.jsx(t.h3,{id:"pattern",children:"Pattern"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"pattern"})," attribute to set custom input validation. This example also uses the ",e.jsx(t.code,{children:"spellcheck"})," attribute set to ",e.jsx(t.code,{children:"false"})," which in turn sets ",e.jsx(t.code,{children:"autocorrect"})," to ",e.jsx(t.code,{children:"off"})," and ",e.jsx(t.code,{children:"autocapitalize"})," to ",e.jsx(t.code,{children:"none"}),". Additionally the ",e.jsx(t.code,{children:"maxlength"})," attribute sets the maximum length of characters that can be entered."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<auro-input>"})," component supports setting a custom validity message specific to the pattern validation by using the ",e.jsx(t.code,{children:"setCustomValidityPatternMismatch"})," attribute."]}),`
`,e.jsx(n,{of:v}),`
`,e.jsx(t.h3,{id:"readonly",children:"Readonly"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"readonly"})," attribute to prevent the user from editing the value of the input."]}),`
`,e.jsx(t.p,{children:"In this example, the user is able to programmatically change the value of the input by clicking the button or clear out the contents of the input."}),`
`,e.jsx(n,{of:w}),`
`,e.jsxs(t.h3,{id:"active-label-",children:["Active Label ",e.jsx("a",{name:"activeLabel"})]}),`
`,e.jsxs(t.p,{children:["Example use cases for auro-input support the ",e.jsx(t.code,{children:"activeLabel"})," attribute. If set, the label will stay fixed in the active position."]}),`
`,e.jsx(n,{of:C}),`
`,e.jsxs(t.h3,{id:"disable-auto-validation-",children:["Disable auto-validation ",e.jsx("a",{name:"noValidate"})]}),`
`,e.jsxs(t.p,{children:["For use cases where the field is ",e.jsx(t.code,{children:"required"}),", but live validation is not wanted, use the ",e.jsx(t.code,{children:"noValidate"})," attribute."]}),`
`,e.jsx(n,{of:T}),`
`,e.jsx(t.h3,{id:"format",children:"Format"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"format"})," attribute to set the format of the IMask."]}),`
`,e.jsx(t.p,{children:"Default masking definitions:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"0 : number"}),`
`,e.jsx(t.li,{children:"a : letter"}),`
`,e.jsx(t.li,{children:"* : any character"}),`
`]}),`
`,e.jsxs(t.p,{children:["See ",e.jsx(t.a,{href:"https://imask.js.org/",rel:"nofollow",children:"IMask"})," for more information on how to configure a mask."]}),`
`,e.jsx(n,{of:V}),`
`,e.jsx(t.h2,{id:"error-support-and-html5-validity",children:"Error support and HTML5 Validity"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<auro-input>"})," component follows the HTML5 input ",e.jsx(t.code,{children:"validity"})," and ",e.jsx(t.code,{children:"validityState"})," ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#client-side_validation",rel:"nofollow",children:"specification"}),"."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"if there is a form control that fails constraint validation, supporting browsers will display an error message on the first invalid form control; displaying a default message based on the error type, or a message set by you."}),`
`]}),`
`,e.jsx(t.h3,{id:"required",children:"Required"}),`
`,e.jsxs(t.p,{children:["When present, the ",e.jsx(t.code,{children:"required"})," attribute specifies that an input field must be filled out before submitting the form."]}),`
`,e.jsxs(t.p,{children:["When the validity check fails, the validityState equals ",e.jsx(t.code,{children:"valueMissing"}),". The error message for the ",e.jsx(t.code,{children:"valueMissing"})," validityState can be changed to a custom string using the ",e.jsx(t.code,{children:"setCustomValidityValueMissing"}),"."]}),`
`,e.jsx(n,{of:S}),`
`,e.jsx(t.h3,{id:"validation-on-input",children:"Validation on input"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"validateOnInput"})," attribute to enable live validation on the ",e.jsx(t.code,{children:"input"})," event. Recommended use is with setting a custom ",e.jsx(t.code,{children:"pattern"})," and validation is required prior to a ",e.jsx(t.code,{children:"blur"})," event."]}),`
`,e.jsx(n,{of:M}),`
`,e.jsx(t.h3,{id:"setcustomvalidity",children:"setCustomValidity"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"setCustomValidity"})," attribute can be used to set a custom string for all validityStates. When the component is first loaded, if this attribute is set on the element, all validityStates (except ",e.jsx(t.code,{children:"valid"}),") will display the defined message."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"NOTE:"})," Custom strings are NOT localized. It is the responsibility of the element consumer to provide localized strings when using this element property."]}),`
`,e.jsx(n,{of:U}),`
`,e.jsx(t.h3,{id:"error",children:"Error"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"error"})," attribute to apply a persistent custom error that supersedes the HTML5 validation logic."]}),`
`,e.jsxs(t.p,{children:["A custom error message can be set using the ",e.jsx(t.code,{children:"error"})," attribute, or it can be used in conjuction with the ",e.jsx(t.code,{children:"setCustomValidityCustomError"})," attribute."]}),`
`,e.jsx(n,{of:k}),`
`,e.jsx(t.h2,{id:"types",children:"Types"}),`
`,e.jsx(t.h3,{id:"password",children:"Password"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:'type="password"'})," attribute for a password style input. The hide/show password feature will automatically appear once a user begins to enter data."]}),`
`,e.jsxs(t.p,{children:["Default help text will be added to the input ",e.jsx(t.code,{children:'type="password"'})," if custom help text is not provided. See the example below."]}),`
`,e.jsx(n,{of:D}),`
`,e.jsx(t.h3,{id:"email",children:"Email"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:'type="email"'})," attribute for a email style input. These examples illustrate the default error messaging per that browser. Content may vary."]}),`
`,e.jsxs(t.p,{children:["Default help text will be added to the input ",e.jsx(t.code,{children:'type="email"'})," if custom help text is not provided. See the example below."]}),`
`,e.jsx(n,{of:E}),`
`,e.jsx(t.h3,{id:"number",children:"Number"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:'type="number"'})," attribute for a numeric style input and invoke a numeric virtual keyboard on handheld devices."]}),`
`,e.jsxs(t.p,{children:["This ",e.jsx(t.code,{children:"number"})," input type should only be used for incremental numeric values, meaning values with decimals will be considered invalid. The ",e.jsx(t.code,{children:"number"})," input type is not appropriate for values that happen to only consist of but aren't strictly speaking a number, such as postal codes in many countries or credit card numbers. See ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number",rel:"nofollow",children:"MDN Web Docs"})," for more information."]}),`
`,e.jsx(n,{of:L}),`
`,e.jsx(t.h3,{id:"credit-card",children:"Credit Card"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:'type="credit-card"'})," attribute for a credit card formatted input."]}),`
`,e.jsxs(t.p,{children:["Default help text will be added to the input ",e.jsx(t.code,{children:'type="credit-card"'})," if custom help text is not provided. See the example below."]}),`
`,e.jsx(n,{of:I}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:'type="credit-card"'})," and ",e.jsx(t.code,{children:"icon"})," attributes for a credit card formatted input with credit card icon support."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Dependency"}),": Please be sure to also install ",e.jsx(t.a,{href:"https://auro.alaskaair.com/components/auro/icon/install",rel:"nofollow",children:"auro-icon"})," as a peer dependency."]}),`
`,e.jsx(n,{of:P}),`
`,e.jsx(t.h3,{id:"phone-number",children:"Phone Number"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:'type="tel"'})," attribute for a phone number formatted input. The default format is ",e.jsx(t.code,{children:"+1 (000) 000-0000"}),"."]}),`
`,e.jsx(n,{of:z}),`
`,e.jsx(t.h4,{id:"formatting",children:"Formatting"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"format"})," attribute to set a custom phone number format."]}),`
`,e.jsx(n,{of:R}),`
`,e.jsx(t.h3,{id:"date",children:"Date"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:'type="date"'})," attribute for a date formatted input. The default date format is ",e.jsx(t.code,{children:"mm/dd/yyyy"}),"."]}),`
`,e.jsx(n,{of:q}),`
`,e.jsx(t.h4,{id:"formatting-1",children:"Formatting"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"format"})," attribute to put together any combination of ",e.jsx(t.code,{children:"mm"}),", ",e.jsx(t.code,{children:"dd"}),", & ",e.jsx(t.code,{children:"yyyy"})," or ",e.jsx(t.code,{children:"yy"}),"."]}),`
`,e.jsx(n,{of:A}),`
`,e.jsx(n,{of:N}),`
`,e.jsx(n,{of:$}),`
`,e.jsx(t.h2,{id:"additional-use-cases",children:"Additional Use Cases"}),`
`,e.jsx(t.h3,{id:"reset-state",children:"Reset State"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"reset()"})," method to reset the ",e.jsx(t.code,{children:"<auro-input>"}),"'s ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"validity"})," state. Doing so will preserve all other attributes and properties."]}),`
`,e.jsx(n,{of:O}),`
`,e.jsx(t.h3,{id:"swapping-values-between-inputs",children:"Swapping Values Between Inputs"}),`
`,e.jsxs(t.p,{children:["Example illustrates using a JavaScript function attached to an ",e.jsx(t.code,{children:"auro-button"})," component ",e.jsx(t.code,{children:"click"})," event to swap the values of two ",e.jsx(t.code,{children:"auro-input"})," elements. An example of this use case would be swapping the departure and arrival airports in a flight search form."]}),`
`,e.jsx(n,{of:F}),`
`,e.jsx(t.h3,{id:"theme-support",children:"Theme Support"}),`
`,e.jsx(t.p,{children:"The component may be restyled using the following code sample and changing the values of the following token(s)."}),`
`,e.jsx(s,{children:`
  \`\`\`scss
  ${B}
  \`\`\`
`})]})}function de(i={}){const{wrapper:t}={...l(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}function o(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{de as default};
