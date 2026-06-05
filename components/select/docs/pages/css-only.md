<auro-header level="1">CSS only with native select</auro-header>

<p>For situations where the <code>&lt;auro-select&gt;</code> web component cannot be used, a native HTML <code>&lt;select&gt;</code> element with <code>&lt;option&gt;</code> children can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-select</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.select</code> class, so the styling must be authored manually using Auro design tokens.</p>

<auro-header level="2">Styling a native select</auro-header>

<p>The native select can be reset and restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. Only the closed chrome of <code>&lt;select&gt;</code> can be styled — the dropdown panel that opens when the user activates the control is browser-controlled and is largely unstyleable. The pattern below replicates the border, padding, caret, and focus-state colors used by <code>auro-select</code> in its collapsed state.</p>

<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";

.select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  min-height: var(--ds-size-600, 3rem);
  padding: var(--ds-size-100, 0.5rem) var(--ds-size-400, 2rem) var(--ds-size-100, 0.5rem) var(--ds-size-200, 1rem);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: var(--ds-border-radius, 4px);
  background-color: var(--ds-color-container-primary-default, #ffffff);
  color: var(--ds-color-text-primary-default, #1d1d1d);
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231d1d1d' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--ds-size-150, 0.75rem) center;
  background-size: var(--ds-size-200, 1rem);
}

.select:focus-visible {
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: 2px;
  border-color: var(--ds-color-border-active-default, #01426a);
}

.select:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.select:invalid {
  border-color: var(--ds-color-border-error-default, #d6371e);
}
</code></pre>

<auro-header level="3">Basic select</auro-header>

<p>Apply the <code>.select</code> class to a native <code>&lt;select&gt;</code> element and pair it with a <code>&lt;label&gt;</code>:</p>

<pre><code>&lt;label for="destination"&gt;Destination&lt;/label&gt;
&lt;select id="destination" name="destination" class="select"&gt;
  &lt;option value=""&gt;Choose a destination&lt;/option&gt;
  &lt;option value="sea"&gt;Seattle&lt;/option&gt;
  &lt;option value="pdx"&gt;Portland&lt;/option&gt;
  &lt;option value="anc"&gt;Anchorage&lt;/option&gt;
&lt;/select&gt;</code></pre>

<auro-header level="3">Select with optgroup</auro-header>

<p>Use <code>&lt;optgroup&gt;</code> to group related options under a non-selectable label:</p>

<pre><code>&lt;label for="airport"&gt;Airport&lt;/label&gt;
&lt;select id="airport" name="airport" class="select"&gt;
  &lt;optgroup label="Pacific Northwest"&gt;
    &lt;option value="sea"&gt;Seattle&lt;/option&gt;
    &lt;option value="pdx"&gt;Portland&lt;/option&gt;
  &lt;/optgroup&gt;
  &lt;optgroup label="Alaska"&gt;
    &lt;option value="anc"&gt;Anchorage&lt;/option&gt;
    &lt;option value="fai"&gt;Fairbanks&lt;/option&gt;
  &lt;/optgroup&gt;
&lt;/select&gt;</code></pre>

<auro-header level="3">Multiple select</auro-header>

<p>Add the <code>multiple</code> attribute to allow more than one option to be selected. Note that the browser renders <code>multiple</code> selects as a scrollable list box rather than a dropdown, so the caret background image is not appropriate; consider a separate class for this variant:</p>

<pre><code>&lt;label for="preferences"&gt;Travel preferences&lt;/label&gt;
&lt;select id="preferences" name="preferences" class="select" multiple size="4"&gt;
  &lt;option value="window"&gt;Window seat&lt;/option&gt;
  &lt;option value="aisle"&gt;Aisle seat&lt;/option&gt;
  &lt;option value="meal"&gt;Special meal&lt;/option&gt;
  &lt;option value="early"&gt;Early boarding&lt;/option&gt;
&lt;/select&gt;</code></pre>

<auro-header level="2">What you lose without auro-select</auro-header>

<p>While the CSS above replicates the <strong>visual styling</strong> of the closed <code>auro-select</code> trigger, the following functionality built into the <code>auro-select</code> web component is <strong>not available</strong> when using a plain HTML <code>&lt;select&gt;</code>:</p>

<auro-header level="3">Stylable dropdown panel</auro-header>

<p><code>auro-select</code> renders its dropdown panel (the "bib") as part of the component, so option spacing, borders, elevation, and selected-state styling all match the Auro design system. The dropdown panel that opens from a native <code>&lt;select&gt;</code> is rendered by the browser/operating system and cannot be styled — fonts, colors, padding, and the highlight color of the active option are all controlled by the user agent.</p>

<auro-header level="3">Rich option content</auro-header>

<p><code>auro-select</code> accepts <code>auro-menuoption</code> children whose default slot can contain any HTML — icons, two-line descriptions, badges, or custom markup. Native <code>&lt;option&gt;</code> elements only render plain text; any inline HTML inside an <code>&lt;option&gt;</code> is stripped by the browser.</p>

<auro-header level="3">Custom display value</auro-header>

<p><code>auro-select</code> exposes a <code>displayValue</code> slot and a <code>forceDisplayValue</code> attribute so the collapsed trigger can show formatted content (markup, icons, a different string than the selected option's label). A native <code>&lt;select&gt;</code> always displays the plain text of the selected <code>&lt;option&gt;</code>.</p>

<auro-header level="3">Custom validation messages</auro-header>

<p><code>auro-select</code> exposes <code>setCustomValidity</code>, <code>setCustomValidityValueMissing</code>, <code>setCustomValidityCustomError</code>, and an <code>error</code> attribute for fully customizable error messages per validity state. A native <code>&lt;select&gt;</code> surfaces browser-controlled validation tooltips that can only be overridden via <code>setCustomValidity()</code> on the element and cannot be styled.</p>

<auro-header level="3">Help text and error slots</auro-header>

<p><code>auro-select</code> provides a <code>helpText</code> slot that renders below the trigger and automatically swaps to the active validation message when the field is invalid. With a native <code>&lt;select&gt;</code>, you must author the help-text markup, manage its visibility, and wire <code>aria-describedby</code> yourself.</p>

<auro-header level="3">Multi-select with checkmarks</auro-header>

<p><code>auro-select</code> supports a <code>multiSelect</code> attribute that keeps the dropdown open between selections, renders checkmarks next to chosen options, and exposes the selection as an array via <code>optionSelected</code>. Native <code>&lt;select multiple&gt;</code> renders as a scrolling list box rather than a dropdown and relies on platform-specific modifier keys (<code>Cmd</code>/<code>Ctrl</code>+click) to select multiple items.</p>

<auro-header level="3">Type-ahead navigation</auro-header>

<p><code>auro-select</code> implements its own keyboard strategy (see <code>selectKeyboardStrategy.js</code>) for type-ahead matching, arrow-key navigation, and focus management that is consistent across browsers. Native <code>&lt;select&gt;</code> type-ahead behavior varies by browser and operating system.</p>

<auro-header level="3">Mobile fullscreen behavior</auro-header>

<p><code>auro-select</code> automatically switches its dropdown to a fullscreen sheet on small viewports via the <code>fullscreenBreakpoint</code> attribute, with a configurable headline slot (<code>bib.fullscreen.headline</code>) and close-button label. A native <code>&lt;select&gt;</code> defers entirely to the operating system's native picker, which cannot be themed or labeled.</p>

<auro-header level="3">Placement and layout control</auro-header>

<p><code>auro-select</code> supports <code>placement</code>, <code>autoPlacement</code>, <code>noFlip</code>, <code>shift</code>, <code>offset</code>, <code>matchWidth</code>, and <code>flexMenuWidth</code> attributes to control where and how the dropdown opens. A native <code>&lt;select&gt;</code> opens wherever the browser decides, with no developer control.</p>

<auro-header level="3">ARIA wiring</auro-header>

<p><code>auro-select</code> manages the ARIA relationships between the trigger, label, help text, listbox, and active option automatically. With a native <code>&lt;select&gt;</code>, you must manage <code>id</code>/<code>for</code> association between label and select, and wire <code>aria-describedby</code> for any help or error text yourself.</p>

<auro-header level="3">Value sync and events</auro-header>

<p><code>auro-select</code> exposes a single <code>value</code> property plus an <code>optionSelected</code> reference to the chosen option element, and dispatches <code>auroSelect-valueSet</code>, <code>input</code>, and <code>auroFormElement-validated</code> events for integration with <code>auro-form</code>. Native <code>&lt;select&gt;</code> fires <code>change</code> and <code>input</code> but does not emit the structured validation events the Auro form system expects.</p>

<auro-header level="3">Touched-state tracking</auro-header>

<p><code>auro-select</code> tracks a touched state so validation errors only appear after the user has interacted with the field. Native <code>&lt;select&gt;</code> has no built-in touched concept — you must implement focus/blur tracking yourself to avoid showing errors on initial render.</p>

<auro-header level="3">Reset behavior</auro-header>

<p><code>auro-select</code> provides a single <code>reset()</code> method that clears the value and resets validation state in one call. With a native <code>&lt;select&gt;</code>, you must clear the selection and separately clear any custom validation state you are tracking.</p>

<auro-header level="3">Layout and shape variants</auro-header>

<p><code>auro-select</code> supports <code>layout</code> (<code>classic</code>, <code>emphasized</code>, <code>snowflake</code>) and <code>shape</code> (<code>classic</code>, <code>pill</code>, <code>pill-left</code>, <code>pill-right</code>, <code>snowflake</code>) attributes for design-system-aligned visual variants. A CSS-only select must reimplement each variant by hand.</p>

<auro-header level="3">Multi-brand theming</auro-header>

<p><code>auro-select</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only select is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>

<auro-header level="2">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Native <code>&lt;select&gt;</code> with Auro tokens</th>
      <th><code>auro-select</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design-system-aligned styling (collapsed)</td>
      <td>Manual (author-written CSS)</td>
      <td>Built-in</td>
    </tr>
    <tr>
      <td>Stylable dropdown panel</td>
      <td>Not supported (browser-controlled)</td>
      <td>Fully styled</td>
    </tr>
    <tr>
      <td>Dark background support</td>
      <td>Manual</td>
      <td>Yes (<code>appearance="inverse"</code>)</td>
    </tr>
    <tr>
      <td>Rich option content (icons, markup)</td>
      <td>Not supported</td>
      <td>Via <code>auro-menuoption</code> slot</td>
    </tr>
    <tr>
      <td>Custom display value</td>
      <td>Not supported</td>
      <td><code>displayValue</code> slot</td>
    </tr>
    <tr>
      <td>Custom validation messages</td>
      <td>Limited to <code>setCustomValidity()</code></td>
      <td>Per-constraint custom messages</td>
    </tr>
    <tr>
      <td>Help text / error slot</td>
      <td>Manual markup and ARIA wiring</td>
      <td><code>helpText</code> slot with auto-swap</td>
    </tr>
    <tr>
      <td>Multi-select with checkmarks</td>
      <td>List box only, modifier-key UX</td>
      <td><code>multiSelect</code> attribute</td>
    </tr>
    <tr>
      <td>Type-ahead navigation</td>
      <td>Browser-dependent</td>
      <td>Consistent custom strategy</td>
    </tr>
    <tr>
      <td>Mobile fullscreen behavior</td>
      <td>OS native picker</td>
      <td><code>fullscreenBreakpoint</code></td>
    </tr>
    <tr>
      <td>Placement / layout control</td>
      <td>Not supported</td>
      <td><code>placement</code>, <code>autoPlacement</code>, <code>offset</code>, <code>matchWidth</code></td>
    </tr>
    <tr>
      <td>Touched-state tracking</td>
      <td>Manual</td>
      <td>Automatic</td>
    </tr>
    <tr>
      <td>ARIA wiring</td>
      <td>Manual</td>
      <td>Automatic</td>
    </tr>
    <tr>
      <td>Form validation events</td>
      <td>Not supported</td>
      <td><code>auroFormElement-validated</code></td>
    </tr>
    <tr>
      <td>Reset</td>
      <td>Manual</td>
      <td>Single <code>reset()</code> call</td>
    </tr>
    <tr>
      <td>Layout and shape variants</td>
      <td>Manual CSS per variant</td>
      <td><code>layout</code> and <code>shape</code> attributes</td>
    </tr>
    <tr>
      <td>Multi-brand theming</td>
      <td>Static (import-time tokens)</td>
      <td>Full (design tokens + component logic)</td>
    </tr>
  </tbody>
</table>

<auro-header level="2">Recommendation</auro-header>

<p>Use <code>auro-select</code> whenever possible. Fall back to a CSS-styled native <code>&lt;select&gt;</code> only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and accept that the dropdown panel itself will remain unstyled, multi-select and rich option content will not be available, and validation, help text, and ARIA wiring must be reimplemented by hand.</p>
