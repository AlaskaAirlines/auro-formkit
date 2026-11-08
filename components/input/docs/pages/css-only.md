<auro-header level="1">CSS only with native input</auro-header>

<p>When you can't use the <code>&lt;auro-input&gt;</code> web component, style a native HTML <code>&lt;input&gt;</code> element with the Auro Design System tokens to approximate how <code>auro-input</code> looks. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> doesn't provide a prebuilt <code>.input</code> or <code>.form-*</code> class, so you write the styles yourself with Auro design tokens.</p>

<auro-header level="2">Styling a native input</auro-header>

<p>Reset and restyle the native input with the Auro design tokens published by <auro-hyperlink href="https://github.com/AlaskaAirlines/AuroDesignTokens" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the border, focus ring, padding, label, and helper text used by <code>auro-input</code>.</p>

<pre><code>/* Color tokens */
@import "./node_modules/@aurodesignsystem/design-tokens/dist/themes/alaska/CSSCustomProperties--alaska.css";
/* Size, border-radius, and typography tokens */
@import "./node_modules/@aurodesignsystem/design-tokens/dist/legacy/auro-classic/CSSCustomProperties.css";

.input-field {
  display: block;
  width: 100%;
  box-sizing: border-box;
  height: var(--ds-size-600, 3rem);
  padding: 0 var(--ds-size-200, 1rem);
  font-family: var(--ds-font-family-default, sans-serif);
  font-size: var(--ds-text-body-size-default, 1rem);
  line-height: var(--ds-text-body-height-default, 1.5rem);
  color: var(--ds-basic-color-texticon-default, #2a2a2a);
  background-color: var(--ds-basic-color-surface-default, #ffffff);
  border: 1px solid var(--ds-basic-color-border-bold, #585e67);
  border-radius: var(--ds-border-radius, 4px);
  outline: none;
}

.input-field:focus-visible {
  border-color: var(--ds-basic-color-border-brand, #00274a);
  outline: 2px solid var(--ds-basic-color-border-brand, #00274a);
  outline-offset: 1px;
}

.input-field:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.input-field[aria-invalid="true"] {
  border-color: var(--ds-basic-color-status-error, #e31f26);
}

.input-label {
  display: block;
  margin-bottom: var(--ds-size-50, 0.25rem);
  font-size: var(--ds-text-body-size-sm, 0.875rem);
  color: var(--ds-basic-color-texticon-muted, #676767);
}

.input-helptext {
  display: block;
  margin-top: var(--ds-size-50, 0.25rem);
  font-size: var(--ds-text-body-size-sm, 0.875rem);
  color: var(--ds-basic-color-texticon-muted, #676767);
}

.input-helptext[data-error="true"] {
  color: var(--ds-basic-color-status-error, #e31f26);
}
</code></pre>

<auro-header level="3">Text input</auro-header>

<p>Apply the <code>.input-field</code> class to a native <code>&lt;input type="text"&gt;</code> element and pair it with a <code>&lt;label&gt;</code> using <code>for</code>/<code>id</code>:</p>

<pre><code>&lt;label class="input-label" for="name"&gt;Full name&lt;/label&gt;
&lt;input id="name" type="text" class="input-field" name="name" /&gt;</code></pre>

<auro-header level="3">Email input</auro-header>

<p>Use <code>type="email"</code> to surface the browser's built-in email format validation:</p>

<pre><code>&lt;label class="input-label" for="email"&gt;Email address&lt;/label&gt;
&lt;input id="email" type="email" class="input-field" name="email" required /&gt;</code></pre>

<auro-header level="3">Password input</auro-header>

<p>Use <code>type="password"</code> to mask the entered value. The show/hide toggle from <code>auro-input</code> isn't included:</p>

<pre><code>&lt;label class="input-label" for="password"&gt;Password&lt;/label&gt;
&lt;input id="password" type="password" class="input-field" name="password" /&gt;</code></pre>

<auro-header level="3">Number input</auro-header>

<p>Use <code>type="number"</code> with <code>min</code>, <code>max</code>, and <code>step</code> for numeric constraints:</p>

<pre><code>&lt;label class="input-label" for="qty"&gt;Quantity&lt;/label&gt;
&lt;input id="qty" type="number" class="input-field" name="qty" min="1" max="9" step="1" /&gt;</code></pre>

<auro-header level="3">Helper text</auro-header>

<p>Pair the input with a sibling element and link them with <code>aria-describedby</code>, so screen readers announce the help text:</p>

<pre><code>&lt;label class="input-label" for="username"&gt;Username&lt;/label&gt;
&lt;input id="username" type="text" class="input-field" name="username" aria-describedby="username-help" /&gt;
&lt;span id="username-help" class="input-helptext"&gt;Must be 3–20 characters.&lt;/span&gt;</code></pre>

<auro-header level="3">Error state</auro-header>

<p>Toggle <code>aria-invalid="true"</code> on the input and switch the helper text to error styling to communicate validation failure:</p>

<pre><code>&lt;label class="input-label" for="email-error"&gt;Email address&lt;/label&gt;
&lt;input id="email-error" type="email" class="input-field" name="email" aria-invalid="true" aria-describedby="email-error-msg" /&gt;
&lt;span id="email-error-msg" class="input-helptext" data-error="true"&gt;Enter a valid email address.&lt;/span&gt;</code></pre>

<auro-header level="2">What you lose without auro-input</auro-header>

<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-input</code>, the following functionality built into the <code>auro-input</code> web component <strong>isn't available</strong> when using plain HTML:</p>

<auro-header level="3">Input masking</auro-header>

<p><code>auro-input</code> uses IMask to apply format patterns as the user types, such as <code>format="(000) 000-0000"</code> for phone numbers or <code>format="mm/dd/yyyy"</code> for dates. Native inputs have no concept of input masks, so you must integrate a third-party masking library and manage cursor position, paste handling, and value reconciliation yourself.</p>

<auro-header level="3">Credit-card formatting and detection</auro-header>

<p><code>auro-input</code> with <code>type="credit-card"</code> auto-detects Visa, Mastercard, American Express, Discover, Diners Club, JCB, China UnionPay, and Alaska Airlines cards from the first digits, applies the correct digit grouping, such as 4-4-4-4 for Visa or 4-6-5 for Amex, and shows the matching card brand icon when the <code>icon</code> attribute is set. None of this is available natively.</p>

<auro-header level="3">Password show/hide toggle</auro-header>

<p><code>auro-input</code> with <code>type="password"</code> includes an accessible show/hide button, named with the <code>ariaLabel.password.show</code> and <code>ariaLabel.password.hide</code> slots. A native password input only hides the value, so you must build the toggle button, swap the <code>type</code> attribute, and manage its accessible name yourself.</p>

<auro-header level="3">Clear button</auro-header>

<p><code>auro-input</code> renders an accessible clear button when the field has a value, named with the <code>ariaLabel.clear</code> slot. Native inputs don't provide a clear control beyond the browser's built-in (and inconsistently styled) <code>type="search"</code> affordance.</p>

<auro-header level="3">Custom validation messages</auro-header>

<p><code>auro-input</code> has a message attribute for each kind of error: <code>setCustomValidityValueMissing</code>, <code>setCustomValidityRangeOverflow</code>, <code>setCustomValidityRangeUnderflow</code>, <code>setCustomValidityTooLong</code>, <code>setCustomValidityTooShort</code>, <code>setCustomValidityPatternMismatch</code>, <code>setCustomValidityCustomError</code>, and <code>setCustomValidityForType</code>. Native inputs surface browser-controlled validation messages that can't be customized beyond a single <code>setCustomValidity()</code> string.</p>

<auro-header level="3">Format types</auro-header>

<p><code>auro-input</code> has dedicated <code>type</code> values for <code>credit-card</code>, <code>tel</code>, and <code>date</code>, each applying the correct mask and validation. For dates, the <code>format</code> attribute sets the order of the parts, such as <code>mm/dd/yyyy</code>, <code>yyyy/mm/dd</code>, or <code>mm/yy</code>. With native HTML, you're limited to the standard input types and must implement format-specific behavior by hand.</p>

<auro-header level="3">Floating and dynamic labels</auro-header>

<p>In the <code>classic</code> layout, <code>auro-input</code> floats the label above the field when it has focus or a value. In every layout, it automatically associates slotted label content with the underlying input. With native HTML you must wire up <code>for</code>/<code>id</code> attributes and author the floating-label animation yourself.</p>

<auro-header level="3">Display value slot</auro-header>

<p><code>auro-input</code> supports a <code>displayValue</code> slot that renders custom HTML in place of the raw value when the input has a value and doesn't have focus. It's useful for masked account numbers or formatted currency. Native inputs always show the raw value and have no equivalent.</p>

<auro-header level="3">Layout and shape variants</auro-header>

<p><code>auro-input</code> supports the <code>classic</code>, <code>emphasized</code>, and <code>snowflake</code> layouts, as well as <code>shape</code> variants (<code>box</code>, <code>pill</code>, <code>pill-left</code>, and <code>pill-right</code>). It also has a bordered default and a borderless <code>simple</code> mode. With native HTML you must author each variant's CSS yourself.</p>

<auro-header level="3">Icons and accents</auro-header>

<p><code>auro-input</code> renders accent areas left and right of the value, exposed as the <code>accent-left</code> and <code>accent-right</code> parts in the classic layout, and an icon for some types: the card brand icon when <code>icon</code> is set with <code>type="credit-card"</code>, and a calendar icon for <code>type="date"</code>. With native HTML you must place icons with wrapper elements and absolute positioning.</p>

<auro-header level="3">Help text and error messages</auro-header>

<p><code>auro-input</code> exposes a <code>helpText</code> slot that automatically swaps to the validation error message when the field is invalid, with the correct ARIA wiring and color treatment. With native HTML you must manage <code>aria-describedby</code>, error-state styling, and the switch between help and error content yourself.</p>

<auro-header level="3">Validation timing control</auro-header>

<p><code>auro-input</code> supports <code>validateOnInput</code> to validate on every keystroke, <code>noValidate</code> to skip validation when the field loses focus, and tracks touched state so errors don't appear before the user has interacted with an empty field. Native inputs validate on submit and have no built-in touched concept.</p>

<auro-header level="3">Form integration events</auro-header>

<p><code>auro-input</code> dispatches <code>auroFormElement-validated</code> events so a parent <code>auro-form</code> can coordinate validation across all child fields. Native inputs participate in form submission but don't emit the structured validation events that the Auro form system expects.</p>

<auro-header level="3">Multi-brand theming</auro-header>

<p>Both <code>auro-input</code> and the CSS above read Auro design tokens through CSS custom properties, so both follow the brand theme whose token file you load. The difference is upkeep: the component's styles update with the package, while you maintain the CSS-only styles yourself.</p>

<auro-header level="2">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Native <code>&lt;input&gt;</code> with Auro tokens</th>
      <th><code>auro-input</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design-system-aligned styling</td>
      <td>Manual (author-written CSS)</td>
      <td>Built-in</td>
    </tr>
    <tr>
      <td>Input masking</td>
      <td>Not supported</td>
      <td>Built-in via IMask and <code>format</code></td>
    </tr>
    <tr>
      <td>Credit-card detection and formatting</td>
      <td>Not supported</td>
      <td>Auto-detect with icon</td>
    </tr>
    <tr>
      <td>Password show/hide toggle</td>
      <td>Not supported</td>
      <td>Built-in</td>
    </tr>
    <tr>
      <td>Clear button</td>
      <td>Not supported</td>
      <td>Built-in with ARIA label</td>
    </tr>
    <tr>
      <td>Custom validation messages</td>
      <td>Limited to <code>setCustomValidity()</code></td>
      <td>Per-constraint custom messages</td>
    </tr>
    <tr>
      <td>Format types (date, credit-card, etc.)</td>
      <td>Standard input types only</td>
      <td>Dedicated <code>type</code> values</td>
    </tr>
    <tr>
      <td>Floating label</td>
      <td>Manual</td>
      <td>Automatic</td>
    </tr>
    <tr>
      <td>Display value slot</td>
      <td>Not supported</td>
      <td><code>displayValue</code> slot</td>
    </tr>
    <tr>
      <td>Bordered/borderless variants</td>
      <td>Manual CSS</td>
      <td><code>simple</code>, <code>shape</code>, layout attributes</td>
    </tr>
    <tr>
      <td>Icons and accents</td>
      <td>Manual wrapper + positioning</td>
      <td>Built-in type icons and left/right accent parts</td>
    </tr>
    <tr>
      <td>Helper / error slot swap</td>
      <td>Manual <code>aria-describedby</code></td>
      <td>Automatic</td>
    </tr>
    <tr>
      <td>Validation timing / touched state</td>
      <td>Manual</td>
      <td><code>validateOnInput</code>, <code>noValidate</code>, automatic touched tracking</td>
    </tr>
    <tr>
      <td>Form validation events</td>
      <td>Not supported</td>
      <td><code>auroFormElement-validated</code></td>
    </tr>
    <tr>
      <td>Multi-brand theming</td>
      <td>Follows the loaded tokens; you maintain the CSS</td>
      <td>Follows the loaded tokens; styles maintained in the component</td>
    </tr>
  </tbody>
</table>

<auro-header level="2">Recommendation</auro-header>

<p>Use <code>auro-input</code> whenever possible. Fall back to a CSS-styled native input only in environments where custom elements aren't supported or when integrating with third-party systems that require plain HTML, and be prepared to rebuild masking, format-specific validation, clear and password toggles, touched tracking, and label, help text, and error wiring yourself.</p>
