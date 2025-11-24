import{j as e}from"./index-BlAcB6DZ.js";import{useMDXComponents as d}from"./index-DMGburbG.js";import{s as l,M as c,D as u,G as h,S as p,E as b,a as v,b as f,c as m,d as x}from"./counter-and-counter-group.stories-COUJ2JE_.js";import"./_commonjsHelpers-gnU0ypJ3.js";import"./index-CeujA6c9.js";import"./lit-element-CzkqXGGu.js";import"./auro-counter-PUo0hm6P.js";import"./static-CzM4uoyW.js";import"./auro-button-CvWxpTkj-B19uADyS.js";import"./version-CcLPgAjI.js";import"./auro-icon-CNMF0wKG-vCjlPHA5.js";import"./validation-DrYD_Tc9.js";import"./auro-counter-group-CCGQycyX.js";import"./index-B1GZsKVb.js";import"./ref-3AivGw2q.js";import"./async-directive-ByMGbIdb.js";import"./directive-helpers-BYhjznv8.js";import"./auroElement-CqxMywsH.js";const g="The `auro-counter` component is a ui element that enables a way to increment or decrement a single digit value. Common use case is inside the `auro-counter-group` to facilitate a collection of counters to add passenger types to a flight.\n",w='# auro-counter\n\n## Properties\n\n| Property     | Attribute    | Type      | Default     | Description                                      |\n|--------------|--------------|-----------|-------------|--------------------------------------------------|\n| `appearance` | `appearance` | `string`  | "\'default\'" | Defines whether the component will be on lighter or darker backgrounds. |\n| `disabled`   | `disabled`   | `boolean` | false       | Indicates if the counter is disabled.            |\n| `error`      | `error`      | `string`  |             | Error state and message.<br />True if set, value is the error message. |\n| `max`        | `max`        | `number`  | 9           | The maximum value for the counter.               |\n| `min`        | `min`        | `number`  | 0           | The minimum value for the counter.               |\n| `onDark`     | `onDark`     | `boolean` | false       | DEPRECATED - use `appearance` instead.           |\n| `validity`   | `validity`   | `string`  | "undefined" | The validity state of the counter.               |\n| `value`      | `value`      | `number`  | "undefined" | The current value of the counter.                |\n\n## Methods\n\n| Method      | Type                                   | Description                                      |\n|-------------|----------------------------------------|--------------------------------------------------|\n| `decrement` | `(value?: number \\| undefined): void`  | Decrements the value of the counter by 1. If a value is provided, it decrements by that amount.<br /><br />**value**: The amount to decrement by. |\n| `increment` | `(value?: number \\| undefined): void`  | Increments the counter value by 1. If a value is provided, it increments by that amount.<br /><br />**value**: The amount to increment by. |\n| `validate`  | `(force?: boolean \\| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |\n\n## Events\n\n| Event   | Type                                           |\n|---------|------------------------------------------------|\n| `input` | `CustomEvent<{ value: number \\| undefined; }>` |\n\n## Slots\n\n| Name              | Description                                |\n|-------------------|--------------------------------------------|\n|                   | Main label content for the counter.        |\n| `ariaLabel.minus` | Accessible label for the decrement button. |\n| `ariaLabel.plus`  | Accessible label for the increment button. |\n| `description`     | Descriptive content for the counter.       |\n| `helpText`        | Help text content for the counter.         |\n\n\n# auro-counter-group\n\n## Properties\n\n| Property                  | Attribute                 | Type                     | Default        | Description                                      |\n|---------------------------|---------------------------|--------------------------|----------------|--------------------------------------------------|\n| `appearance`              | `appearance`              | `string`                 | "\'default\'"    | Defines whether the component will be on lighter or darker backgrounds. |\n| `autoPlacement`           | `autoPlacement`           | `boolean`                | "false"        | If declared, bib\'s position will be automatically calculated where to appear. |\n| `error`                   | `error`                   | `string`                 |                | The current error message to display when the component is invalid. |\n| `fullscreenBreakpoint`    | `fullscreenBreakpoint`    | `string`                 | "sm"           | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |\n| `isDropdown`              | `isDropdown`              | `boolean`                | false          | Indicates if the counter group is displayed as a dropdown. |\n| `largeFullscreenHeadline` | `largeFullscreenHeadline` | `boolean`                | false          | If declared, make bib.fullscreen.headline in HeadingDisplay.<br />Otherwise, Heading 600. |\n| `layout`                  |                           | `\'classic\'\\|\'snowflake\'` |                | Determines the layout style of the counter group when it is a dropdown. Options are \'classic\' or \'snowflake\'. Default is \'classic\'. |\n| `matchWidth`              | `matchWidth`              | `boolean`                | false          | If declared, the dropdown will expand to the width of its parent container.<br />Otherwise, the dropdown width will be determined by its content. |\n| `max`                     | `max`                     | `number`                 | "undefined"    | The maximum value allowed for the whole group of counters. |\n| `min`                     | `min`                     | `number`                 | "undefined"    | The minimum value allowed for the whole group of counters. |\n| `noFlip`                  | `noFlip`                  | `boolean`                | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn\'t enough space in the specified `placement`. |\n| `offset`                  | `offset`                  | `number`                 | "0"            | Gap between the trigger element and bib.         |\n| `onDark`                  | `onDark`                  | `boolean`                | false          | DEPRECATED - use `appearance` instead.           |\n| `placement`               | `placement`               | `string`                 | "bottom-start" | Position where the bib should appear relative to the trigger.<br />Accepted values:<br />"top" \\| "right" \\| "bottom" \\| "left" \\|<br />"bottom-start" \\| "top-start" \\| "top-end" \\|<br />"right-start" \\| "right-end" \\| "bottom-end" \\|<br />"left-start" \\| "left-end". |\n| `shift`                   | `shift`                   | `boolean`                | "false"        | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |\n| `total`                   | `total`                   | `number`                 | "undefined"    | The total value of the counters.                 |\n| `validity`                | `validity`                | `string`                 | "undefined"    | Reflects the validity state.                     |\n| `value`                   | `value`                   | `object`                 | "undefined"    | The current individual values of the nested counters. |\n\n## Methods\n\n| Method     | Type                                   | Description                                      |\n|------------|----------------------------------------|--------------------------------------------------|\n| `hideBib`  | `(): void`                             | Hides the dropdown bib if its open.              |\n| `showBib`  | `(): void`                             | Shows the dropdown bib if there are options to show. |\n| `validate` | `(force?: boolean \\| undefined): void` | Validates value.<br /><br />**force**: Whether to force validation. |\n\n## Events\n\n| Event   | Type                                             |\n|---------|--------------------------------------------------|\n| `input` | `CustomEvent<{ total: number \\| undefined; value: {} \\| undefined; }>` |\n\n## Slots\n\n| Name                      | Description                                      |\n|---------------------------|--------------------------------------------------|\n| `ariaLabel.bib.close`     | Sets aria-label on close button in fullscreen bib |\n| `bib.fullscreen.footer`   | Defines the footer to display at the bottom of fullscreen bib. Only used when `isDropdown` is true. |\n| `bib.fullscreen.headline` | Defines the headline to display above menu-options. Only used when `isDropdown` is true. Required. |\n| `default`                 | Slot for counter elements.                       |\n| `helpText`                | Dropdown help text content. Only used when `isDropdown` is true. |\n| `label`                   | Dropdown label content. Only used when `isDropdown` is true. |\n| `valueText`               | Dropdown value text display. Only used when `isDropdown` is true. |\n',y=`@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  /* Snowflake Dropdown Tokens */
  --ds-auro-counter-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-counter-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-counter-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-counter-outline-color: transparent;

  /* Classic Tokens */
  --ds-auro-counter-control-background-color: var(--ds-advanced-color-button-tertiary-background, #{v.$ds-advanced-color-button-tertiary-background});
  --ds-auro-counter-control-border-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-counter-description-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-icon-color: var(--ds-advanced-color-button-tertiary-text, #{v.$ds-advanced-color-button-tertiary-text});
  --ds-auro-counter-quantity-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
}

:host([ondark]),
:host([appearance="inverse"]) {
  /* Snowflake Dropdown Tokens */
  --ds-auro-counter-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-counter-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-counter-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-counter-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-counter-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-counter-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-counter-outline-color: transparent;

  /* Classic Tokens */
  --ds-auro-counter-control-background-color: var(--ds-advanced-color-button-tertiary-background-inverse, #{v.$ds-advanced-color-button-tertiary-background-inverse});
  --ds-auro-counter-control-border-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-counter-description-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-icon-color: var(--ds-advanced-color-button-tertiary-text-inverse, #{v.$ds-advanced-color-button-tertiary-text-inverse});
  --ds-auro-counter-quantity-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-divider-color: var(--ds-basic-color-border-divider-inverse, #{v.$ds-basic-color-border-divider-inverse});
}
`;function i(r){const o={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",strong:"strong",...d(),...r.components},{Canvas:n,Markdown:t,Meta:s}=o;return n||a("Canvas"),t||a("Markdown"),s||a("Meta"),e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(o.h1,{id:"counter",children:"Counter"}),`
`,e.jsx(t,{children:g}),`
`,e.jsx(t,{children:w}),`
`,e.jsx(o.h2,{id:"api-examples",children:"API Examples"}),`
`,e.jsx(o.h3,{id:"counter-1",children:"Counter"}),`
`,e.jsx(o.h4,{id:"minmax-and-value",children:"Min/Max and Value"}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(o.h4,{id:"disabled-state",children:"Disabled State"}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(o.h3,{id:"counter-group",children:"Counter Group"}),`
`,e.jsx(o.h4,{id:"group-properties",children:"Group Properties"}),`
`,e.jsx(o.p,{children:"All available counter-group properties:"}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(o.h4,{id:"available-slots",children:"Available Slots"}),`
`,e.jsx(o.p,{children:"All available slots for both components:"}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(o.h3,{id:"event-handling",children:"Event Handling"}),`
`,e.jsxs(o.p,{children:["Listen for ",e.jsx(o.code,{children:"input"})," events to react to user interactions."]}),`
`,e.jsx(n,{of:b}),`
`,e.jsx(o.h4,{id:"custom-value-display",children:"Custom Value Display"}),`
`,e.jsx(n,{of:v}),`
`,e.jsx(o.h3,{id:"group-maxmin",children:"Group Max/Min"}),`
`,e.jsx(o.p,{children:"The group counter max or min property sets the value for all counters in the group. If a counter has a max value set, the group max attribute will override it. All increment buttons as a result will be disabled to prevent the group of counters from exceeding the group max."}),`
`,e.jsx(o.p,{children:e.jsx(o.strong,{children:"Example has group max set to 12"})}),`
`,e.jsx(n,{of:f}),`
`,e.jsx(o.h3,{id:"counter-maxmin",children:"Counter Max/Min"}),`
`,e.jsx(o.p,{children:"You can also individually set the max or min value for each counter in a group."}),`
`,e.jsx(o.p,{children:e.jsx(o.strong,{children:"Example has group max set to 12"})}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(o.h3,{id:"dropdown-with-fullscreen-bib",children:"Dropdown with fullscreen bib"}),`
`,e.jsxs(o.p,{children:["You can make the dropdown open in fullscreen at a specific breakpoint by setting ",e.jsx(o.code,{children:"fullscreenBreakpoint"}),"."]}),`
`,e.jsxs(o.p,{children:["The default value of ",e.jsx(o.code,{children:"fullscreenBreakpoint"})," is ",e.jsx(o.code,{children:"sm"}),"."]}),`
`,e.jsxs(o.p,{children:["Breakpoint token can be found ",e.jsx(o.a,{href:"https://auro.alaskaair.com/getting-started/developers/design-tokens",rel:"nofollow",children:"here"})]}),`
`,e.jsxs(o.p,{children:["To support fullscreen bib, setting the ",e.jsx(o.code,{children:"bib.fullscreen.headline"})," slot is ",e.jsx(o.strong,{children:"REQUIRED"}),`.
You can also set `,e.jsx(o.code,{children:"bib.fullscreen.footer"})," slot to add any additional options on fullscreen view."]}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(o.h3,{id:"theme-support",children:"Theme Support"}),`
`,e.jsx(o.p,{children:"The component may be restyled using the following code sample and changing the values of the following token(s)."}),`
`,e.jsx(t,{children:`
  \`\`\`scss
  ${y}
  \`\`\`
`})]})}function F(r={}){const{wrapper:o}={...d(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(i,{...r})}):i(r)}function a(r,o){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{F as default};
