<auro-header level="1">CSS only with native radio</auro-header>
<p>For situations where the <code>&lt;auro-radio&gt;</code> web component cannot be used, a native HTML <code>&lt;input type="radio"&gt;</code> element can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-radio</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.radio</code> class, so the styling must be authored manually using Auro design tokens.</p>
<auro-header level="2">Styling a native radio</auro-header>
<p>The native radio can be reset and restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the size, border, and selected-state colors used by <code>auro-radio</code>.</p>
<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";
​
.radio {
  appearance: none;
  -webkit-appearance: none;
  width: var(--ds-size-300, 1.5rem);
  height: var(--ds-size-300, 1.5rem);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: 50%;
  background-color: var(--ds-color-container-primary-default, #ffffff);
  cursor: pointer;
  vertical-align: middle;
}
​
.radio:checked {
  background-color: var(--ds-color-container-ui-selected-default, #01426a);
  border-color: var(--ds-color-border-ui-selected-default, #01426a);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='5' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
​
.radio:focus-visible {
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: 2px;
}
​
.radio:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}</code></pre>
<auro-header level="3">Basic radio</auro-header>
<p>Apply the <code>.radio</code> class to a native <code>&lt;input type="radio"&gt;</code> element and pair it with a <code>&lt;label&gt;</code>:</p>
<pre><code>&lt;label&gt;
  &lt;input type="radio" class="radio" name="subscribe" value="yes" /&gt;
  Subscribe to updates
&lt;/label&gt;</code></pre>
<auro-header level="3">Group of radios</auro-header>
<p>Use a <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> to give the group an accessible name. All inputs in the group must share the same <code>name</code> attribute so the browser enforces single-selection and enables arrow-key navigation between them:</p>
<pre><code>&lt;fieldset&gt;
  &lt;legend&gt;Choose a delivery method&lt;/legend&gt;
  &lt;label&gt;&lt;input type="radio" class="radio" name="delivery" value="email" /&gt; Email&lt;/label&gt;
  &lt;label&gt;&lt;input type="radio" class="radio" name="delivery" value="sms" /&gt; SMS&lt;/label&gt;
  &lt;label&gt;&lt;input type="radio" class="radio" name="delivery" value="push" /&gt; Push notification&lt;/label&gt;
&lt;/fieldset&gt;</code></pre>
<auro-header level="2">What you lose without auro-radio</auro-header>
<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-radio</code>, the following functionality built into the <code>auro-radio</code> and <code>auro-radio-group</code> web components is <strong>not available</strong> when using plain HTML. Note that native radios sharing a <code>name</code> attribute do provide arrow-key navigation and roving tab order for free — that behavior is one thing you do <em>not</em> have to reimplement.</p>
<auro-header level="3">Group-level validation</auro-header>
<p><code>auro-radio-group</code> supports a <code>required</code> attribute that validates "one radio in the group must be selected." Native HTML <code>required</code> on a radio input enforces the same constraint, but the validation message surfaces on a single input rather than being coordinated across the group. With plain HTML, you must write custom JavaScript to manage error display at the group level.</p>
<auro-header level="3">Custom validation messages</auro-header>
<p><code>auro-radio-group</code> exposes <code>setCustomValidity</code> and <code>setCustomValidityValueMissing</code> for fully customizable error messages per validity state. Native radios surface browser-controlled validation messages that cannot be customized beyond <code>setCustomValidity()</code> on the individual input.</p>
<auro-header level="3">Touched-state tracking</auro-header>
<p><code>auro-radio-group</code> tracks a <code>touched</code> state so validation errors only appear after the user has interacted with the group. Native radios have no built-in touched concept — you must implement focus/blur tracking yourself to avoid showing errors on initial render.</p>
<auro-header level="3">Coordinated value property</auro-header>
<p><code>auro-radio-group</code> exposes a single <code>value</code> property that reflects the selected radio's value and dispatches a single change event when that value changes. With native HTML, you must query each input individually to determine which one is checked, and listen for change events on each input separately.</p>
<auro-header level="3">Automatic label binding</auro-header>
<p><code>auro-radio</code> automatically associates slot content as the accessible label, eliminating the need for <code>&lt;label for&gt;</code> wiring or wrapping <code>&lt;label&gt;</code> elements. With native HTML, you must manage <code>id</code> and <code>for</code> attributes manually to keep labels in sync with inputs.</p>
<auro-header level="3">Disabled propagation</auro-header>
<p><code>auro-radio-group</code> propagates a single <code>disabled</code> attribute to all child radios. With native HTML, you must apply <code>disabled</code> to each input individually or wrap them in a <code>&lt;fieldset disabled&gt;</code>, the latter of which has additional side effects on nested form controls.</p>
<auro-header level="3">Form integration events</auro-header>
<p><code>auro-radio-group</code> dispatches <code>auroFormElement-validated</code> events so parent <code>auro-form</code> elements can coordinate validation across all child fields. Native radios participate in form submission but do not emit the structured validation events that the Auro form system expects.</p>
<auro-header level="3">Horizontal layout</auro-header>
<p><code>auro-radio-group</code> supports a <code>horizontal</code> attribute for compact groups of up to three items, with spacing and alignment handled by the component. With native HTML, you must author the layout CSS yourself.</p>
<auro-header level="3">Reset behavior</auro-header>
<p><code>auro-radio-group</code> provides a single <code>reset()</code> method that clears the selection and resets validation state in one call. With native HTML, you must iterate each input to uncheck it and separately clear any custom validation state you are tracking.</p>
<auro-header level="3">Multi-brand theming</auro-header>
<p><code>auro-radio</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only radio is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>
<auro-header level="2">Summary</auro-header>
<table>
<thead>
<tr>
<th>Feature</th>
<th>Native <code>&lt;input type="radio"&gt;</code> with Auro tokens</th>
<th><code>auro-radio</code></th>
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
<td>Arrow-key navigation within group</td>
<td>Built-in (shared <code>name</code>)</td>
<td>Built-in</td>
</tr>
<tr>
<td>Group-level <code>required</code> validation</td>
<td>Per-input only</td>
<td>Built-in via <code>auro-radio-group</code></td>
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
<td>Coordinated value property</td>
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
<td>Reset group</td>
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
<p>Use <code>auro-radio</code> and <code>auro-radio-group</code> whenever possible. Fall back to a CSS-styled native radio only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to reimplement group-level validation messaging, touched tracking, and coordinated value handling yourself.</p>
