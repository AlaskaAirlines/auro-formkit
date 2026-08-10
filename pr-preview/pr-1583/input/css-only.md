<auro-header level="1">CSS only with native input</auro-header>
<p>For situations where the <code>&lt;auro-input&gt;</code> web component cannot be used, a native HTML <code>&lt;input&gt;</code> element can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-input</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.input</code> or <code>.form-*</code> class, so the styling must be authored manually using Auro design tokens.</p>
<auro-header level="2">Styling a native input</auro-header>
<p>The native input can be reset and restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the border, focus ring, padding, label, and helper text used by <code>auro-input</code>.</p>
<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";
​
.input-field {
  display: block;
  width: 100%;
  box-sizing: border-box;
  height: var(--ds-size-600, 3rem);
  padding: 0 var(--ds-size-200, 1rem);
  font-family: var(--ds-font-family-default, sans-serif);
  font-size: var(--ds-text-body-default-size, 1rem);
  line-height: var(--ds-text-body-default-line-height, 1.5);
  color: var(--ds-color-text-primary-default, #1d1d1d);
  background-color: var(--ds-color-container-primary-default, #ffffff);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: var(--ds-border-radius, 4px);
  outline: none;
}
​
.input-field:focus-visible {
  border-color: var(--ds-color-border-active-default, #01426a);
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: 1px;
}
​
.input-field:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
​
.input-field[aria-invalid="true"] {
  border-color: var(--ds-color-border-error-default, #d50032);
}
​
.input-label {
  display: block;
  margin-bottom: var(--ds-size-50, 0.25rem);
  font-size: var(--ds-text-body-sm-size, 0.875rem);
  color: var(--ds-color-text-secondary-default, #6e767f);
}
​
.input-helptext {
  display: block;
  margin-top: var(--ds-size-50, 0.25rem);
  font-size: var(--ds-text-body-sm-size, 0.875rem);
  color: var(--ds-color-text-secondary-default, #6e767f);
}
​
.input-helptext[data-error="true"] {
  color: var(--ds-color-text-error-default, #d50032);
}</code></pre>
<auro-header level="3">Text input</auro-header>
<p>Apply the <code>.input-field</code> class to a native <code>&lt;input type="text"&gt;</code> element and pair it with a <code>&lt;label&gt;</code> using <code>for</code>/<code>id</code>:</p>
<pre><code>&lt;label class="input-label" for="name"&gt;Full name&lt;/label&gt;
&lt;input id="name" type="text" class="input-field" name="name" /&gt;</code></pre>
<auro-header level="3">Email input</auro-header>
<p>Use <code>type="email"</code> to surface the browser's built-in email format validation:</p>
<pre><code>&lt;label class="input-label" for="email"&gt;Email address&lt;/label&gt;
&lt;input id="email" type="email" class="input-field" name="email" required /&gt;</code></pre>
<auro-header level="3">Password input</auro-header>
<p>Use <code>type="password"</code> to mask the entered value. Note that the show/hide toggle provided by <code>auro-input</code> is not present:</p>
<pre><code>&lt;label class="input-label" for="password"&gt;Password&lt;/label&gt;
&lt;input id="password" type="password" class="input-field" name="password" /&gt;</code></pre>
<auro-header level="3">Number input</auro-header>
<p>Use <code>type="number"</code> with <code>min</code>, <code>max</code>, and <code>step</code> for numeric constraints:</p>
<pre><code>&lt;label class="input-label" for="qty"&gt;Quantity&lt;/label&gt;
&lt;input id="qty" type="number" class="input-field" name="qty" min="1" max="9" step="1" /&gt;</code></pre>
<auro-header level="3">Helper text</auro-header>
<p>Pair the input with a sibling element and wire it up via <code>aria-describedby</code> so assistive technology announces the helper content:</p>
<pre><code>&lt;label class="input-label" for="username"&gt;Username&lt;/label&gt;
&lt;input id="username" type="text" class="input-field" name="username" aria-describedby="username-help" /&gt;
&lt;span id="username-help" class="input-helptext"&gt;Must be 3-20 characters.&lt;/span&gt;</code></pre>
<auro-header level="3">Error state</auro-header>
<p>Toggle <code>aria-invalid="true"</code> on the input and switch the helper text to error styling to communicate validation failure:</p>
<pre><code>&lt;label class="input-label" for="email-error"&gt;Email address&lt;/label&gt;
&lt;input id="email-error" type="email" class="input-field" name="email" aria-invalid="true" aria-describedby="email-error-msg" /&gt;
&lt;span id="email-error-msg" class="input-helptext" data-error="true"&gt;Enter a valid email address.&lt;/span&gt;</code></pre>
<auro-header level="2">What you lose without auro-input</auro-header>
<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-input</code>, the following functionality built into the <code>auro-input</code> web component is <strong>not available</strong> when using plain HTML:</p>
<auro-header level="3">Input masking</auro-header>
<p><code>auro-input</code> integrates IMask to apply format patterns as the user types — for example <code>format="(###) ###-####"</code> for phone numbers or <code>format="mm/dd/yyyy"</code> for dates. Native inputs have no concept of input masks, so you must integrate a third-party masking library and manage cursor position, paste handling, and value reconciliation yourself.</p>
<auro-header level="3">Credit-card formatting and detection</auro-header>
<p><code>auro-input</code> with <code>type="credit-card"</code> auto-detects Visa, Mastercard, American Express, Discover, Diners Club, and Alaska Airlines cards from the first digits, applies the correct digit grouping (e.g., 4-4-4-4 for Visa, 4-6-5 for Amex), displays the matching card brand icon, and validates with the Luhn algorithm. None of this is available natively.</p>
<auro-header level="3">Password show/hide toggle</auro-header>
<p><code>auro-input</code> with <code>type="password"</code> includes an accessible show/hide toggle with customizable ARIA labels via the <code>ariaLabel.password.show</code> and <code>ariaLabel.password.hide</code> slots. A native password input only masks the value — you must build the toggle button, swap the <code>type</code> attribute, and manage its accessible name yourself.</p>
<auro-header level="3">Clear button</auro-header>
<p><code>auro-input</code> renders an accessible clear button when the field has a value, with a customizable ARIA label via the <code>ariaLabel.clear</code> slot. Native inputs do not provide a clear control beyond the browser's built-in (and inconsistently styled) <code>type="search"</code> affordance.</p>
<auro-header level="3">Custom validation messages</auro-header>
<p><code>auro-input</code> exposes a full set of per-constraint setters — <code>setCustomValidityValueMissing</code>, <code>setCustomValidityRangeOverflow</code>, <code>setCustomValidityRangeUnderflow</code>, <code>setCustomValidityTooLong</code>, <code>setCustomValidityTooShort</code>, <code>setCustomValidityBadInput</code>, <code>setCustomValidityCustomError</code>, and <code>setCustomValidityForType</code>. Native inputs surface browser-controlled validation messages that cannot be customized beyond a single <code>setCustomValidity()</code> string.</p>
<auro-header level="3">Format types</auro-header>
<p><code>auro-input</code> ships dedicated <code>type</code> values for <code>credit-card</code>, <code>month-day-year</code>, <code>year-month-day</code>, <code>day-month-year</code>, <code>month-year</code>, <code>month-fullYear</code>, and <code>year-month</code>, each applying the correct mask, validation, and accent icon. With native HTML you are limited to the standard input types and must implement format-specific behavior by hand.</p>
<auro-header level="3">Floating and dynamic labels</auro-header>
<p><code>auro-input</code> floats the label above the field when it is focused or populated, and automatically associates slotted label content with the underlying input. With native HTML you must wire up <code>for</code>/<code>id</code> attributes and author the floating-label animation yourself.</p>
<auro-header level="3">Display value slot</auro-header>
<p><code>auro-input</code> supports a <code>displayValue</code> slot that renders custom HTML in place of the raw value when the input is blurred — useful for masked account numbers or formatted currency. Native inputs always show the raw value and have no equivalent.</p>
<auro-header level="3">Layout and shape variants</auro-header>
<p><code>auro-input</code> supports classic, emphasized, and snowflake layouts, as well as <code>shape</code> variants (<code>box</code>, <code>pill</code>, <code>pill-left</code>, <code>pill-right</code>). A bordered default and a borderless <code>simple</code> mode are also provided. With native HTML you must author each variant's CSS yourself.</p>
<auro-header level="3">Icon slots and accents</auro-header>
<p><code>auro-input</code> renders left and right accent slots and an automatic accent icon for typed formats (credit-card brand icon, calendar icon for date types). Native inputs have no slotting mechanism, so icons must be positioned via wrapper elements and absolute positioning.</p>
<auro-header level="3">Help text and error slots</auro-header>
<p><code>auro-input</code> exposes a <code>helpText</code> slot that automatically swaps to the validation error message when the field is invalid, with the correct ARIA wiring and color treatment. With native HTML you must manage <code>aria-describedby</code>, error-state styling, and the switch between help and error content yourself.</p>
<auro-header level="3">Validation timing control</auro-header>
<p><code>auro-input</code> supports <code>validateOnInput</code> to validate on every keystroke, <code>noValidate</code> to disable validation, and tracks touched state so errors do not appear before the user has interacted with the field. Native inputs validate on submit and have no built-in touched concept.</p>
<auro-header level="3">Form integration events</auro-header>
<p><code>auro-input</code> dispatches <code>auroFormElement-validated</code> events so a parent <code>auro-form</code> can coordinate validation across all child fields. Native inputs participate in form submission but do not emit the structured validation events that the Auro form system expects.</p>
<auro-header level="3">Multi-brand theming</auro-header>
<p><code>auro-input</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only input is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>
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
<td>Auto-detect with icon and Luhn check</td>
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
<td>Icon slots / accents</td>
<td>Manual wrapper + positioning</td>
<td>Left/right accent slots</td>
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
<td>Static (import-time tokens)</td>
<td>Full (design tokens + component logic)</td>
</tr>
</tbody>
</table>
<auro-header level="2">Recommendation</auro-header>
<p>Use <code>auro-input</code> whenever possible. Fall back to a CSS-styled native input only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to reimplement masking, format-specific validation, clear and password toggles, touched tracking, and label/help/error wiring yourself.</p>
