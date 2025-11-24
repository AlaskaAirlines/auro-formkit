import{j as e}from"./index-BlAcB6DZ.js";import{useMDXComponents as l}from"./index-DMGburbG.js";import{s as a,B as c,a as h,b as p,c as u,C as b,d as x,e as g,f,D as w,g as m,E as j,h as v,F as y,I as T,i as k,R as D,N as S,j as I,L as B,H as C,k as E,P as $,l as P,m as M,T as F,n as z}from"./dropdown.stories-_ceEUHdZ.js";import"./_commonjsHelpers-gnU0ypJ3.js";import"./storybook-utils-BWaCeRRT.js";import"./lit-element-CzkqXGGu.js";import"./static-CzM4uoyW.js";import"./async-directive-ByMGbIdb.js";import"./directive-helpers-BYhjznv8.js";import"./ref-3AivGw2q.js";import"./version-CcLPgAjI.js";import"./auro-icon-CNMF0wKG-vCjlPHA5.js";import"./auroElement-CqxMywsH.js";import"./registered-DrZ9fufq.js";import"./auro-button-CvWxpTkj-B19uADyS.js";import"./registered-BmRy1yHw.js";import"./index-CXFB-ZtJ.js";import"./repeat-NDFA8eVF.js";const A="The `auro-dropdown` component is a trigger and dropdown element combination intended to be used with dropdown content that is interactive. `auro-dropdown` is content agnostic and any valid HTML can be placed in either the trigger or the dropdown.\n\n\n_Note: if the dropdown content in your implementation is not interactive (e.g. a tooltip) [auro-popover](http://auro.alaskaair.com/components/auro/popover) may better serve your needs._\n",O='# auro-dropdown\n\n## Properties\n\n| Property                | Attribute               | Type        | Default        | Description                                      |\n|-------------------------|-------------------------|-------------|----------------|--------------------------------------------------|\n| `a11yRole`              |                         |             |                | The value for the role attribute of the trigger element. |\n| `appearance`            | `appearance`            | `string`    | "\'default\'"    | Defines whether the component will be on lighter or darker backgrounds. |\n| `autoPlacement`         | `autoPlacement`         | `boolean`   | "false"        | If declared, bib\'s position will be automatically calculated where to appear. |\n| `chevron`               | `chevron`               | ` Boolean ` |                | If declared, the dropdown displays a chevron on the right. |\n| `disableEventShow`      | `disableEventShow`      | ` Boolean ` | "false"        | If declared, the dropdown will only show by calling the API .show() public method. |\n| `disableFocusTrap`      | `disableFocusTrap`      | `boolean`   |                | If declared, the focus trap inside of bib will be turned off. |\n| `disabled`              | `disabled`              | ` Boolean ` |                | If declared, the dropdown is not interactive.    |\n| `error`                 | `error`                 | ` Boolean ` |                | If declared in combination with not using the `simple` property or `helpText` slot content, will apply red color to both. |\n| `errorMessage`          | `errorMessage`          | `string`    | "undefined"    | Contains the help text message for the current validity error. |\n| `focusShow`             | `focusShow`             | ` Boolean ` |                | If declared, the bib will display when focus is applied to the trigger. |\n| `fullscreenBreakpoint`  | `fullscreenBreakpoint`  | ` String `  | "sm"           | Defines the screen size breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `disabled`)<br />at which the dropdown switches to fullscreen mode on mobile. `disabled` indicates a dropdown should _never_ enter fullscreen.<br /><br />When expanded, the dropdown will automatically display in fullscreen mode<br />if the screen size is equal to or smaller than the selected breakpoint. |\n| `hoverToggle`           | `hoverToggle`           | ` Boolean ` |                | If declared, the trigger will toggle the dropdown on mouseover/mouseout. |\n| `isBibFullscreen`       | `isBibFullscreen`       | `boolean`   | false          | If true, the dropdown bib is taking the fullscreen when it\'s open. |\n| `isPopoverVisible`      | `open`                  | ` Boolean ` | false          | If true, the dropdown bib is displayed.          |\n| `layout`                |                         |             | "undefined"    |                                                  |\n| `matchWidth`            | `matchWidth`            | ` Boolean ` | false          | If declared, the popover and trigger will be set to the same width. |\n| `noFlip`                | `noFlip`                | `boolean`   | "false"        | If declared, the bib will NOT flip to an alternate position<br />when there isn\'t enough space in the specified `placement`. |\n| `noHideOnThisFocusLoss` | `noHideOnThisFocusLoss` | ` Boolean ` | false          | If declared, the dropdown will not hide when moving focus outside the element. |\n| `noToggle`              | `noToggle`              | ` Boolean ` |                | If declared, the trigger will only show the dropdown bib. |\n| `offset`                | `offset`                | `number`    | "0"            | Gap between the trigger element and bib.         |\n| `onDark`                | `onDark`                | `boolean`   |                | DEPRECATED - use `appearance` instead.           |\n| `onSlotChange`          | `onSlotChange`          |             |                | If declared, and a function is set, that function will execute when the slot content is updated. |\n| `placement`             | `placement`             | `string`    | "bottom-start" | Position where the bib should appear relative to the trigger. |\n| `shape`                 |                         |             | "undefined"    |                                                  |\n| `shift`                 | `shift`                 | `boolean`   | "false"        | If declared, the dropdown will shift its position to avoid being cut off by the viewport. |\n| `simple`                | `simple`                | `boolean`   |                | If declared, applies a border around the trigger slot. |\n| `size`                  |                         |             | "undefined"    |                                                  |\n\n## Methods\n\n| Method           | Type       | Description                                      |\n|------------------|------------|--------------------------------------------------|\n| `exposeCssParts` | `(): void` | Exposes CSS parts for styling from parent components. |\n| `focus`          | `(): void` | When bib is open, focus on the first element inside of bib.<br />If not, trigger element will get focus. |\n| `hide`           | `(): void` | Public method to hide the dropdown.              |\n| `show`           | `(): void` | Public method to show the dropdown.              |\n\n## Events\n\n| Event                       | Type                                 | Description                                      |\n|-----------------------------|--------------------------------------|--------------------------------------------------|\n| `auroDropdown-idAdded`      | `Object<key  : \'id\', value: string>` |                                                  |\n| `auroDropdown-toggled`      |                                      | Notifies that the visibility of the dropdown bib has changed. |\n| `auroDropdown-triggerClick` | `CustomEvent<any>`                   | Notifies that the trigger has been clicked.      |\n\n## Slots\n\n| Name       | Description                           |\n|------------|---------------------------------------|\n|            | Default slot for the popover content. |\n| `helpText` | Defines the content of the helpText.  |\n| `trigger`  | Defines the content of the trigger.   |\n\n## CSS Shadow Parts\n\n| Part       | Description                                      |\n|------------|--------------------------------------------------|\n| `chevron`  | The collapsed/expanded state icon container.     |\n| `helpText` | The helpText content container.                  |\n| `popover`  | The bib content container.                       |\n| `size`     | The size of the dropdown bib. (height, width, maxHeight, maxWidth only) |\n| `trigger`  | The trigger content container.                   |\n',W=`
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;

:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}

:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
}
`;function s(r){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...r.components},{Canvas:n,Markdown:t,Meta:d}=o;return n||i("Canvas"),t||i("Markdown"),d||i("Meta"),e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a}),`
`,e.jsx(o.h1,{id:"dropdown",children:"Dropdown"}),`
`,e.jsx(t,{children:A}),`
`,e.jsx(t,{children:O}),`
`,e.jsx(o.h2,{id:"api-examples",children:"API Examples"}),`
`,e.jsx(o.h3,{id:"basic",children:"Basic"}),`
`,e.jsxs(o.p,{children:["The most basic, simple version of ",e.jsx(o.code,{children:"auro-dropdown"}),"."]}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(o.h3,{id:"property-examples",children:"Property Examples"}),`
`,e.jsx(o.h4,{id:"bordered",children:"bordered"}),`
`,e.jsx(o.p,{children:"Adds the border style around the dropdown trigger."}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(o.h4,{id:"chevron",children:"chevron"}),`
`,e.jsx(o.p,{children:"Adds the bib visibility state chevron to the right side of the trigger content."}),`
`,e.jsx(n,{of:b}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(n,{of:g}),`
`,e.jsx(n,{of:f}),`
`,e.jsx(o.h4,{id:"disabled",children:"disabled"}),`
`,e.jsx(o.p,{children:"Disables the trigger preventing the dropdown bib from being shown."}),`
`,e.jsx(n,{of:w}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(o.h4,{id:"error",children:"error"}),`
`,e.jsx(o.p,{children:"Adds the error state UI to the trigger."}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(n,{of:v}),`
`,e.jsx(o.h4,{id:"fluid",children:"fluid"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"fluid"})," property makes the trigger to have the full width."]}),`
`,e.jsx(n,{of:y}),`
`,e.jsx(o.h4,{id:"inset",children:"inset"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"inset"})," property applies a predefined amount of CSS ",e.jsx(o.code,{children:"padding"})," to the ",e.jsx(o.code,{children:"trigger"})," slot content. Use this property to apply borderless style."]}),`
`,e.jsx(n,{of:T}),`
`,e.jsx(n,{of:k}),`
`,e.jsx(o.h4,{id:"rounded",children:"rounded"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"rounded"})," property applies ",e.jsx(o.code,{children:"border-radius"})," CSS to the trigger and default slot content."]}),`
`,e.jsx(n,{of:D}),`
`,e.jsx(o.h4,{id:"notoggle",children:"noToggle"}),`
`,e.jsxs(o.p,{children:["In cases where it is desired behavior for ",e.jsx(o.code,{children:"auro-dropdown"})," to only show, not toggle, the bib content when activating the trigger the ",e.jsx(o.code,{children:"noToggle"})," attribute must be applied."]}),`
`,e.jsx(n,{of:S}),`
`,e.jsx(o.h4,{id:"fullscreenbreakpoint",children:"fullscreenBreakpoint"}),`
`,e.jsxs(o.p,{children:["On mobile view, adding the ",e.jsx(o.code,{children:'fullscreenBreakpoint="{breakpoint-token}"'})," will switch the dropdown to fullscreen mode."]}),`
`,e.jsx(n,{of:I}),`
`,e.jsx(o.h3,{id:"slot-examples",children:"Slot Examples"}),`
`,e.jsx(o.h4,{id:"default",children:"default"}),`
`,e.jsx(o.p,{children:"All examples shown on this page include default slot content."}),`
`,e.jsx(o.h4,{id:"trigger",children:"trigger"}),`
`,e.jsxs(o.p,{children:["Content defined in the ",e.jsx(o.code,{children:"trigger"})," slot will be rendered in the clickable trigger of the dropdown that is used to display the bib. Focus state visual effects will be disabled on the trigger when it contains a focusable element other than ",e.jsx(o.code,{children:"<auro-input>"}),"."]}),`
`,e.jsx(o.p,{children:"This slot may contain any static content (e.g. plain text) and/or no more than one of the following elements:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"<a>"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"<auro-hyperlink>"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"<button>"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"<auro-button>"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"<input>"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"<auro-input>"})}),`
`]}),`
`,e.jsx(o.h4,{id:"label",children:"label"}),`
`,e.jsxs(o.p,{children:["Content defined in the ",e.jsx(o.code,{children:"label"})," slot will be rendered left aligned inside the trigger above all other defined trigger slot content."]}),`
`,e.jsx(n,{of:B}),`
`,e.jsx(o.h4,{id:"helptext",children:"helpText"}),`
`,e.jsxs(o.p,{children:["Content defined in the ",e.jsx(o.code,{children:"helpText"})," slot will be rendered left aligned below the trigger."]}),`
`,e.jsx(n,{of:C}),`
`,e.jsx(o.h5,{id:""}),`
`,e.jsxs(o.p,{children:["When combined with the ",e.jsx(o.code,{children:"error"})," property the ",e.jsx(o.code,{children:"helpText"})," slot content is colored red."]}),`
`,e.jsx(n,{of:E}),`
`,e.jsx(o.h3,{id:"method-examples",children:"Method Examples"}),`
`,e.jsx(o.h4,{id:"show",children:"show"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"show"})," method may also be called from anywhere in your code by executing ",e.jsx(o.code,{children:"document.querySelector('#idOfTheDropdownElement').show()"}),". This example will execute the ",e.jsx(o.code,{children:"show"})," method on a ",e.jsx(o.code,{children:"keydown"})," event with focus in the input element."]}),`
`,e.jsx(n,{of:$}),`
`,e.jsx(o.h4,{id:"hide",children:"hide"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"hide"})," method can be called from within the default slot content. This is useful for cases such as ",e.jsx(o.code,{children:"auro-select"})," when the dropdown should be collapsed after making a selection."]}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"hide"})," method may also be called from anywhere in your code by executing ",e.jsx(o.code,{children:"document.querySelector('#idOfTheDropdownElement').hide()"}),"."]}),`
`,e.jsx(o.p,{children:"This example demonstrations collapsing the dropdown by clicking a button within the dropdown bib content."}),`
`,e.jsx(n,{of:P}),`
`,e.jsx(o.h3,{id:"other-examples",children:"Other Examples"}),`
`,e.jsx(o.h4,{id:"width-and-sizing-behavior",children:"Width and Sizing Behavior"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Width:"})," The ",e.jsx(o.code,{children:"auro-dropdown"})," component will automatically consume the full width of its parent container. To make it narrower, you can style the ",e.jsx(o.code,{children:"size"})," part."]}),`
`]}),`
`,e.jsxs(o.li,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Styling Options:"})," Only the following styles can be applied to the ",e.jsx(o.code,{children:"size"})," part:"]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"width"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"height"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"maxWidth"})}),`
`,e.jsx(o.li,{children:e.jsx(o.code,{children:"maxHeight"})}),`
`]}),`
`]}),`
`,e.jsxs(o.li,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Scroll Behavior:"})," When the content exceeds the specified size, the browser will provide a scroll for the overflow."]}),`
`]}),`
`]}),`
`,e.jsx(n,{of:M}),`
`,e.jsx(o.h4,{id:"truncated-trigger-component-with-fixed-width",children:"Truncated trigger component with fixed width"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"auro-dropdown"})," trigger component will be truncated if the text is too long than its container width."]}),`
`,e.jsx(n,{of:F}),`
`,e.jsx(o.h4,{id:"in-dialog",children:"in Dialog"}),`
`,e.jsx(o.p,{children:"The component can be in a dialog."}),`
`,e.jsx(n,{of:z}),`
`,e.jsx(o.h3,{id:"theme-support",children:"Theme Support"}),`
`,e.jsx(o.p,{children:"The component may be restyled using the following code sample and changing the values of the following token(s)."}),`
`,e.jsx(t,{children:`
  \`\`\`scss
  ${W}
  \`\`\`
`})]})}function re(r={}){const{wrapper:o}={...l(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(s,{...r})}):s(r)}function i(r,o){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{re as default};
