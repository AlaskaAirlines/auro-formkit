<auro-header level="1">CSS only with native checkbox</auro-header>

<p>For situations where the <code>&lt;auro-checkbox&gt;</code> web component cannot be used, a native HTML <code>&lt;input type="checkbox"&gt;</code> element can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-checkbox</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.checkbox</code> class, so the styling must be authored manually using Auro design tokens.</p>

<auro-header level="2">Styling a native checkbox</auro-header>

<p>The native checkbox can be reset and restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the size, border, and selected-state colors used by <code>auro-checkbox</code>.</p>

<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";

.checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: var(--ds-size-300, 1.5rem);
  height: var(--ds-size-300, 1.5rem);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: var(--ds-border-radius, 4px);
  background-color: var(--ds-color-container-primary-default, #ffffff);
  cursor: pointer;
  vertical-align: middle;
}

.checkbox:checked {
  background-color: var(--ds-color-container-ui-selected-default, #01426a);
  border-color: var(--ds-color-border-ui-selected-default, #01426a);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpolyline points='5 12 10 17 19 8'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}

.checkbox:focus-visible {
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: 2px;
}

.checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</code></pre>

<auro-header level="3">Basic checkbox</auro-header>

<p>Apply the <code>.checkbox</code> class to a native <code>&lt;input type="checkbox"&gt;</code> element and pair it with a <code>&lt;label&gt;</code>:</p>

<pre><code>&lt;label&gt;
  &lt;input type="checkbox" class="checkbox" name="terms" value="agree" /&gt;
  I agree to the terms
&lt;/label&gt;</code></pre>

<auro-header level="3">Group of checkboxes</auro-header>

<p>Use a <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> to give the group an accessible name:</p>

<pre><code>&lt;fieldset&gt;
  &lt;legend&gt;Select your preferences&lt;/legend&gt;
  &lt;label&gt;&lt;input type="checkbox" class="checkbox" name="prefs" value="email" /&gt; Email&lt;/label&gt;
  &lt;label&gt;&lt;input type="checkbox" class="checkbox" name="prefs" value="sms" /&gt; SMS&lt;/label&gt;
  &lt;label&gt;&lt;input type="checkbox" class="checkbox" name="prefs" value="push" /&gt; Push notifications&lt;/label&gt;
&lt;/fieldset&gt;</code></pre>

<auro-header level="2">What you lose without auro-checkbox</auro-header>

<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-checkbox</code>, the following functionality built into the <code>auro-checkbox</code> and <code>auro-checkbox-group</code> web components is <strong>not available</strong> when using plain HTML:</p>

<auro-header level="3">Group-level validation</auro-header>

<p><code>auro-checkbox-group</code> supports a <code>required</code> attribute that validates "at least one checkbox in the group must be selected." Native HTML has no equivalent — <code>required</code> on individual checkboxes only enforces that <em>that specific</em> checkbox is checked. With plain HTML, you must write custom JavaScript to coordinate group-level validation across multiple inputs.</p>

<auro-header level="3">Custom validation messages</auro-header>

<p><code>auro-checkbox-group</code> exposes <code>setCustomValidity</code> and <code>setCustomValidityValueMissing</code> for fully customizable error messages per validity state. Native checkboxes surface browser-controlled validation messages that cannot be customized beyond <code>setCustomValidity()</code> on the individual input.</p>

<auro-header level="3">Touched-state tracking</auro-header>

<p><code>auro-checkbox-group</code> tracks a <code>touched</code> state so validation errors only appear after the user has interacted with the group. Native checkboxes have no built-in touched concept — you must implement focus/blur tracking yourself to avoid showing errors on initial render.</p>

<auro-header level="3">Coordinated value array</auro-header>

<p><code>auro-checkbox-group</code> exposes a single <code>value</code> property that reflects the array of checked items in the group. With native HTML, you must query each input individually and assemble the selected values yourself, and there is no single change event that fires when the group's value changes.</p>

<auro-header level="3">Automatic label binding</auro-header>

<p><code>auro-checkbox</code> automatically associates slot content as the accessible label, eliminating the need for <code>&lt;label for&gt;</code> wiring or wrapping <code>&lt;label&gt;</code> elements. With native HTML, you must manage <code>id</code> and <code>for</code> attributes manually to keep labels in sync with inputs.</p>

<auro-header level="3">Disabled propagation</auro-header>

<p><code>auro-checkbox-group</code> propagates a single <code>disabled</code> attribute to all child checkboxes. With native HTML, you must apply <code>disabled</code> to each input individually or wrap them in a <code>&lt;fieldset disabled&gt;</code>, the latter of which has additional side effects on nested form controls.</p>

<auro-header level="3">Form integration events</auro-header>

<p><code>auro-checkbox-group</code> dispatches <code>auroFormElement-validated</code> events so parent <code>auro-form</code> elements can coordinate validation across all child fields. Native checkboxes participate in form submission but do not emit the structured validation events that the Auro form system expects.</p>

<auro-header level="3">Horizontal layout</auro-header>

<p><code>auro-checkbox-group</code> supports a <code>horizontal</code> attribute for compact groups of up to three items, with spacing and alignment handled by the component. With native HTML, you must author the layout CSS yourself.</p>

<auro-header level="3">Reset behavior</auro-header>

<p><code>auro-checkbox-group</code> provides a single <code>reset()</code> method that clears all checkboxes and resets validation state in one call. With native HTML, you must iterate each input to uncheck it and separately clear any custom validation state you are tracking.</p>

<auro-header level="3">Multi-brand theming</auro-header>

<p><code>auro-checkbox</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only checkbox is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>

<auro-header level="2">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Native <code>&lt;input type="checkbox"&gt;</code> with Auro tokens</th>
      <th><code>auro-checkbox</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design-system-aligned styling</td>
      <td>Manual (author-written CSS)</td>
      <td>Built-in</td>
    </tr>
    <tr>
      <td>Dark background support</td>
      <td>Manual</td>
      <td>Yes (<code>appearance="inverse"</code>)</td>
    </tr>
    <tr>
      <td>Group-level <code>required</code> validation</td>
      <td>Not supported</td>
      <td>Built-in via <code>auro-checkbox-group</code></td>
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
      <td>Coordinated value array</td>
      <td>Manual aggregation</td>
      <td>Single <code>value</code> property</td>
    </tr>
    <tr>
      <td>Automatic label binding</td>
      <td>Manual <code>id</code>/<code>for</code> wiring</td>
      <td>Automatic via slot</td>
    </tr>
    <tr>
      <td>Disabled propagation</td>
      <td>Per-input or <code>&lt;fieldset&gt;</code></td>
      <td>Single group attribute</td>
    </tr>
    <tr>
      <td>Form validation events</td>
      <td>Not supported</td>
      <td><code>auroFormElement-validated</code></td>
    </tr>
    <tr>
      <td>Horizontal layout</td>
      <td>Manual CSS</td>
      <td><code>horizontal</code> attribute</td>
    </tr>
    <tr>
      <td>Reset all in group</td>
      <td>Manual iteration</td>
      <td>Single <code>reset()</code> call</td>
    </tr>
    <tr>
      <td>Multi-brand theming</td>
      <td>Static (import-time tokens)</td>
      <td>Full (design tokens + component logic)</td>
    </tr>
  </tbody>
</table>

<auro-header level="2">Recommendation</auro-header>

<p>Use <code>auro-checkbox</code> and <code>auro-checkbox-group</code> whenever possible. Fall back to a CSS-styled native checkbox only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to reimplement group validation, touched tracking, and value coordination yourself.</p>
