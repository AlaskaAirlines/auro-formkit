<auro-header level="1">CSS only with native input and datalist</auro-header>

<p>For situations where the <code>&lt;auro-combobox&gt;</code> web component can't be used, a native HTML <code>&lt;input type="text"&gt;</code> paired with a <code>&lt;datalist&gt;</code> element can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-combobox</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> doesn't provide a prebuilt <code>.combobox</code> class, so the styling must be authored manually using Auro design tokens.</p>

<auro-header level="2">Styling a native input with datalist</auro-header>

<p>The native input can be restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the size, border, and focus-state colors used by the <code>auro-combobox</code> trigger input.</p>

<pre><code>/* Color tokens */
@import "./node_modules/@aurodesignsystem/design-tokens/dist/themes/alaska/CSSCustomProperties--alaska.css";
/* Size, border-radius, and typography tokens */
@import "./node_modules/@aurodesignsystem/design-tokens/dist/legacy/auro-classic/CSSCustomProperties.css";

.combobox {
  display: inline-block;
  position: relative;
  width: 100%;
}

.combobox-label {
  display: block;
  font-size: var(--ds-size-150, 0.75rem);
  color: var(--ds-basic-color-texticon-muted, #676767);
  margin-bottom: var(--ds-size-50, 0.25rem);
}

.combobox-input {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: var(--ds-size-600, 3rem);
  padding: 0 var(--ds-size-200, 1rem);
  font-size: var(--ds-size-200, 1rem);
  color: var(--ds-basic-color-texticon-default, #2a2a2a);
  background-color: var(--ds-basic-color-surface-default, #ffffff);
  border: 1px solid var(--ds-basic-color-border-bold, #585e67);
  border-radius: var(--ds-border-radius, 4px);
  box-sizing: border-box;
}

.combobox-input:focus-visible {
  outline: 2px solid var(--ds-basic-color-border-brand, #00274a);
  outline-offset: 2px;
  border-color: var(--ds-basic-color-border-brand, #00274a);
}

.combobox-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: var(--ds-advanced-color-state-background-disabled, #dddddd);
}

.combobox-input[aria-invalid="true"] {
  border-color: var(--ds-basic-color-status-error, #e31f26);
}
</code></pre>

<auro-header level="3">Basic combobox</auro-header>

<p>Apply the <code>.combobox-input</code> class to a native <code>&lt;input type="text"&gt;</code> element and reference a <code>&lt;datalist&gt;</code> via the <code>list</code> attribute:</p>

<pre><code>&lt;label class="combobox"&gt;
  &lt;span class="combobox-label"&gt;Departure airport&lt;/span&gt;
  &lt;input
    type="text"
    class="combobox-input"
    name="departure"
    list="airport-options"
    autocomplete="off" /&gt;
  &lt;datalist id="airport-options"&gt;
    &lt;option value="Seattle (SEA)"&gt;&lt;/option&gt;
    &lt;option value="Portland (PDX)"&gt;&lt;/option&gt;
    &lt;option value="San Francisco (SFO)"&gt;&lt;/option&gt;
    &lt;option value="Los Angeles (LAX)"&gt;&lt;/option&gt;
  &lt;/datalist&gt;
&lt;/label&gt;</code></pre>

<auro-header level="3">Required combobox in a form</auro-header>

<p>Use the native <code>required</code> attribute to enforce that a value is entered before form submission:</p>

<pre><code>&lt;form&gt;
  &lt;label class="combobox"&gt;
    &lt;span class="combobox-label"&gt;Destination&lt;/span&gt;
    &lt;input
      type="text"
      class="combobox-input"
      name="destination"
      list="destination-options"
      required
      autocomplete="off" /&gt;
    &lt;datalist id="destination-options"&gt;
      &lt;option value="Anchorage (ANC)"&gt;&lt;/option&gt;
      &lt;option value="Fairbanks (FAI)"&gt;&lt;/option&gt;
      &lt;option value="Juneau (JNU)"&gt;&lt;/option&gt;
    &lt;/datalist&gt;
  &lt;/label&gt;
  &lt;button type="submit"&gt;Search&lt;/button&gt;
&lt;/form&gt;</code></pre>

<auro-header level="2">What you lose without auro-combobox</auro-header>

<p>While the CSS above replicates the <strong>visual styling</strong> of the <code>auro-combobox</code> trigger, the following functionality built into the <code>auro-combobox</code> web component is <strong>not available</strong> when using plain HTML with a <code>&lt;datalist&gt;</code>:</p>

<auro-header level="3">Filter vs. suggestion behavior</auro-header>

<p><code>auro-combobox</code> exposes a <code>behavior</code> attribute (<code>filter</code> or <code>suggestion</code>) that controls whether the user must select a menu option or may submit a freeform typed value. Native <code>&lt;datalist&gt;</code> always behaves like suggestion mode. There's no way to require the user to choose from the list without writing custom JavaScript to compare the input value against the option set.</p>

<auro-header level="3">Custom filtering and matching</auro-header>

<p><code>auro-combobox</code> filters options against the typed value and supports a <code>suggest</code> attribute on each menu option for additional matching keywords, plus <code>persistent</code>, <code>static</code>, and <code>nomatch</code> options that change how the list reacts to input. <code>&lt;datalist&gt;</code> matching is browser-controlled, varies across browsers, and can't be extended with synonyms, persistent items, or a "no match" placeholder.</p>

<auro-header level="3">Highlighted match text</auro-header>

<p><code>auro-combobox</code> passes the typed value to <code>auro-menu</code> as a <code>matchWord</code> so the matching substring is visually highlighted in each option. Native <code>&lt;datalist&gt;</code> renders options using the browser's default UI with no control over typography, highlight color, or layout of the option content.</p>

<auro-header level="3">Custom validation messages</auro-header>

<p><code>auro-combobox</code> exposes <code>setCustomValidity</code>, <code>setCustomValidityCustomError</code>, <code>setCustomValidityValueMissing</code>, and <code>setCustomValidityValueMissingFilter</code> for fully customizable error messages per validity state, including a distinct message for "did not pick a value from the list" when <code>behavior="filter"</code>. Native inputs surface browser-controlled validation messages that can't be customized beyond a single <code>setCustomValidity()</code> string.</p>

<auro-header level="3">Touched-state tracking</auro-header>

<p><code>auro-combobox</code> waits to show validation errors until the user has interacted with the field or it has a value. Native inputs have no built-in touched concept, so you must implement focus/blur tracking yourself to avoid showing errors on initial render.</p>

<auro-header level="3">Keyboard navigation and ARIA</auro-header>

<p><code>auro-combobox</code> implements the WAI-ARIA combobox pattern: <code>role="combobox"</code> on the input, <code>aria-expanded</code>, <code>aria-controls</code>, <code>aria-activedescendant</code>, and <code>aria-setsize</code>/<code>aria-posinset</code> on each option, plus arrow-key navigation, Home/End, Escape to close, and Enter to select. <code>&lt;datalist&gt;</code> exposes none of these hooks. Keyboard behavior is whatever the browser provides, and the experience differs substantially between Chrome, Safari, and Firefox.</p>

<auro-header level="3">Screen reader announcements</auro-header>

<p><code>auro-combobox</code> uses a live region to announce each selection and, in the fullscreen dialog where the trigger is inert, each option that becomes active ("Seattle, not selected, 1 of 5"). <code>&lt;datalist&gt;</code> announcements depend entirely on the screen reader and browser combination.</p>

<auro-header level="3">Mobile fullscreen presentation</auro-header>

<p><code>auro-combobox</code> automatically switches to a fullscreen dialog at a configurable <code>fullscreenBreakpoint</code> for mobile-friendly input, including iOS virtual keyboard retention logic so the keyboard stays visible across the trigger-to-dialog transition. Native <code>&lt;datalist&gt;</code> renders an inline dropdown on every device with no fullscreen mode.</p>

<auro-header level="3">Rich option content and display value</auro-header>

<p><code>auro-combobox</code> works with <code>auro-menuoption</code> elements that can contain markup, icons, and a <code>displayValue</code> slot that lets the visible trigger content differ from the underlying value (paired with <code>persistInput</code> for advanced filter UIs). <code>&lt;datalist&gt;</code> options are plain strings: no markup, no icons, and the visible value always equals the submitted value.</p>

<auro-header level="3">Coordinated value and option-selected state</auro-header>

<p><code>auro-combobox</code> exposes both <code>value</code> (the selected option's value) and <code>optionSelected</code> (a reference to the chosen <code>auro-menuoption</code> element), and fires <code>input</code> and <code>inputValue</code> events with structured detail. With native HTML, you only get the input's string value. There's no way to know which datalist option the user picked, because the browser doesn't report it.</p>

<auro-header level="3">Form integration events</auro-header>

<p><code>auro-combobox</code> dispatches <code>auroFormElement-validated</code> events so parent <code>auro-form</code> elements can coordinate validation across all child fields. Native inputs participate in form submission but don't emit the structured validation events that the Auro form system expects.</p>

<auro-header level="3">Reset behavior</auro-header>

<p><code>auro-combobox</code> provides a <code>reset()</code> method that clears the value, input, menu selection, and validation state in one call, and a <code>clear()</code> method that clears only the value, input, and menu selection. With native HTML, you must clear the input value and separately reset any custom validation state you're tracking.</p>

<auro-header level="3">Layouts, shapes, and sizes</auro-header>

<p><code>auro-combobox</code> supports <code>layout</code> (<code>classic</code>, <code>emphasized</code>, <code>snowflake</code>), <code>shape</code>, and <code>size</code> attributes that coordinate the appearance of the trigger, dropdown, and menu options together. With native HTML, every variant must be authored from scratch and the dropdown UI can't be restyled at all.</p>

<auro-header level="3">Multi-brand theming</auro-header>

<p>Both <code>auro-combobox</code> and the CSS above read Auro design tokens through CSS custom properties, so both follow the brand theme whose token file you load. The difference is upkeep: the component's styles update with the package, while you maintain the CSS-only styles yourself. The browser-rendered <code>&lt;datalist&gt;</code> popup can't be themed at all.</p>

<auro-header level="2">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Native <code>&lt;input list&gt;</code> + <code>&lt;datalist&gt;</code> with Auro tokens</th>
      <th><code>auro-combobox</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design-system-aligned trigger styling</td>
      <td>Manual (author-written CSS)</td>
      <td>Built-in</td>
    </tr>
    <tr>
      <td>Styled dropdown / option list</td>
      <td>Browser-controlled, not styleable</td>
      <td>Fully themed via <code>auro-menu</code></td>
    </tr>
    <tr>
      <td>Filter vs. suggestion behavior</td>
      <td>Suggestion only</td>
      <td><code>behavior="filter" | "suggestion"</code></td>
    </tr>
    <tr>
      <td>Custom match keywords / persistent / nomatch options</td>
      <td>Not supported</td>
      <td>Built-in option attributes</td>
    </tr>
    <tr>
      <td>Highlighted match text</td>
      <td>Not supported</td>
      <td>Built-in via <code>matchWord</code></td>
    </tr>
    <tr>
      <td>Custom validation messages</td>
      <td>Limited to <code>setCustomValidity()</code></td>
      <td>Per-constraint custom messages</td>
    </tr>
    <tr>
      <td>Touched-state tracking</td>
      <td>Manual</td>
      <td>Automatic</td>
    </tr>
    <tr>
      <td>ARIA combobox pattern</td>
      <td>Inconsistent across browsers</td>
      <td>Full WAI-ARIA combobox implementation</td>
    </tr>
    <tr>
      <td>Screen reader option announcements</td>
      <td>Browser-dependent</td>
      <td>Live-region announcements</td>
    </tr>
    <tr>
      <td>Mobile fullscreen mode</td>
      <td>Not supported</td>
      <td><code>fullscreenBreakpoint</code> attribute</td>
    </tr>
    <tr>
      <td>Rich option content / display value</td>
      <td>Plain strings only</td>
      <td><code>auro-menuoption</code> + <code>displayValue</code> slot</td>
    </tr>
    <tr>
      <td><code>optionSelected</code> reference</td>
      <td>Not available</td>
      <td>Exposed as a property</td>
    </tr>
    <tr>
      <td>Form validation events</td>
      <td>Not supported</td>
      <td><code>auroFormElement-validated</code></td>
    </tr>
    <tr>
      <td>Reset / clear</td>
      <td>Manual</td>
      <td><code>reset()</code> and <code>clear()</code> methods</td>
    </tr>
    <tr>
      <td>Layout, shape, size variants</td>
      <td>Manual CSS</td>
      <td><code>layout</code>, <code>shape</code>, <code>size</code> attributes</td>
    </tr>
    <tr>
      <td>Multi-brand theming</td>
      <td>Follows the loaded tokens; you maintain the CSS</td>
      <td>Follows the loaded tokens; styles maintained in the component</td>
    </tr>
  </tbody>
</table>

<auro-header level="2">Recommendation</auro-header>

<p>Use <code>auro-combobox</code> whenever possible. Fall back to a CSS-styled native <code>&lt;input list&gt;</code> with a <code>&lt;datalist&gt;</code> only in environments where custom elements aren't supported or when integrating with third-party systems that require plain HTML. When you do, expect browser-controlled dropdown styling, inconsistent keyboard and screen reader behavior, and the loss of filter-mode validation, match highlighting, fullscreen presentation, and structured form integration.</p>
