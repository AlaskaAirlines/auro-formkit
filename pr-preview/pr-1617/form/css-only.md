<auro-header level="1">CSS only with native form</auro-header>
<p>For situations where the <code>&lt;auro-form&gt;</code> web component cannot be used, a native HTML <code>&lt;form&gt;</code> element can be styled with the Auro Design System tokens to approximate the layout and spacing used by <code>auro-form</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.form</code> class. The native <code>&lt;form&gt;</code> element provides the structural container and browser-native constraint validation, but it does not provide the cross-field coordination that <code>auro-form</code> adds.</p>
<auro-header level="2">Styling a native form</auro-header>
<p>The native form can be laid out using the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the spacing and rhythm used by <code>auro-form</code>.</p>
<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";
​
.form {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-300, 1.5rem);
  padding: var(--ds-size-400, 2rem);
}
​
.form fieldset {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-200, 1rem);
  border: 0;
  padding: 0;
  margin: 0;
}
​
.form legend {
  padding: 0;
  margin-bottom: var(--ds-size-100, 0.5rem);
}
​
.form .actions {
  display: flex;
  gap: var(--ds-size-200, 1rem);
  margin-top: var(--ds-size-200, 1rem);
}</code></pre>
<auro-header level="3">Basic form</auro-header>
<p>Apply the <code>.form</code> class to a native <code>&lt;form&gt;</code> element and rely on the browser's built-in submit and reset behavior:</p>
<pre><code>&lt;form class="form" action="/subscribe" method="post"&gt;
  &lt;label&gt;
    Email
    &lt;input type="email" name="email" required /&gt;
  &lt;/label&gt;
  &lt;div class="actions"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;button type="reset"&gt;Reset&lt;/button&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
<auro-header level="3">Form with grouped fields</auro-header>
<p>Use a <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> to give grouped fields an accessible name:</p>
<pre><code>&lt;form class="form"&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;Contact information&lt;/legend&gt;
    &lt;label&gt;First name &lt;input type="text" name="firstName" required /&gt;&lt;/label&gt;
    &lt;label&gt;Last name &lt;input type="text" name="lastName" required /&gt;&lt;/label&gt;
    &lt;label&gt;Email &lt;input type="email" name="email" required /&gt;&lt;/label&gt;
  &lt;/fieldset&gt;
  &lt;div class="actions"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;button type="reset"&gt;Reset&lt;/button&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
<auro-header level="2">What you lose without auro-form</auro-header>
<p>While the CSS above replicates the <strong>visual layout</strong> of <code>auro-form</code>, the following functionality built into the <code>auro-form</code> web component is <strong>not available</strong> when using a plain HTML <code>&lt;form&gt;</code>:</p>
<auro-header level="3">Child element registration</auro-header>
<p><code>auro-form</code> automatically discovers and registers its named Auro form-element children (<code>auro-input</code>, <code>auro-select</code>, <code>auro-datepicker</code>, <code>auro-combobox</code>, <code>auro-checkbox-group</code>, <code>auro-radio-group</code>, <code>auro-counter-group</code>) on slot change and via a <code>MutationObserver</code>, so dynamically added or removed fields are tracked without manual wiring. A native <code>&lt;form&gt;</code> only exposes built-in form-associated elements through <code>form.elements</code> — custom elements and dynamically inserted controls require custom registration logic.</p>
<auro-header level="3">Aggregated value snapshot</auro-header>
<p><code>auro-form</code> exposes a <code>value</code> getter that returns a single key-value object of every named child's current value, including array values from range datepickers and grouped controls. With a native <code>&lt;form&gt;</code>, you must either use <code>FormData</code> (which does not understand custom elements) or query each control individually and assemble the values yourself.</p>
<auro-header level="3">Aggregated validity state</auro-header>
<p><code>auro-form</code> exposes a single <code>validity</code> getter that returns <code>'valid'</code>, <code>'invalid'</code>, or <code>null</code> based on the validity of every required and interacted-with child. Native forms expose <code>form.checkValidity()</code> and <code>form.reportValidity()</code>, but those only consider built-in form-associated elements and do not include custom elements like <code>auro-input</code> or <code>auro-datepicker</code>.</p>
<auro-header level="3">Initial-state tracking</auro-header>
<p><code>auro-form</code> tracks an <code>isInitialState</code> flag that is <code>true</code> until any child has been interacted with or had its value changed. Native forms have no equivalent — you must implement change tracking yourself to know whether the form is in a pristine state.</p>
<auro-header level="3">auroFormElement-validated event aggregation</auro-header>
<p><code>auro-form</code> listens for <code>auroFormElement-validated</code> events from every registered child and updates its aggregated validity state in response. A native <code>&lt;form&gt;</code> does not listen to or interpret these events, so per-field validation reported by Auro components is not rolled up into a single form-level validity result.</p>
<auro-header level="3">Submit coordination</auro-header>
<p><code>auro-form</code> intercepts clicks on child submit buttons (<code>&lt;button type="submit"&gt;</code> or <code>&lt;auro-button type="submit"&gt;</code>), forces validation on every registered child, waits for validation to settle, and only then fires a <code>submit</code> event with <code>detail.value</code> containing the full form snapshot. A native <code>&lt;form&gt;</code> submit fires before custom-element validation can complete and does not surface a structured value object.</p>
<auro-header level="3">Reset coordination</auro-header>
<p><code>auro-form</code> intercepts clicks on child reset buttons, calls <code>reset()</code> on every registered child, reinitializes its state, and fires a <code>reset</code> event with <code>detail.previousValue</code> containing the values captured before the reset. A native <code>&lt;form&gt;</code> reset only restores default values on built-in form controls and does not call any custom reset method on web components.</p>
<auro-header level="3">Submit and reset button disabling</auro-header>
<p><code>auro-form</code> automatically disables submit buttons while the form is in its initial state or invalid, and disables reset buttons while the form is in its initial state. With a native <code>&lt;form&gt;</code>, you must wire up your own change listeners to toggle the <code>disabled</code> attribute on action buttons.</p>
<auro-header level="3">Enter-to-submit handling</auro-header>
<p><code>auro-form</code> listens for the Enter key on its registered children and triggers a coordinated submit, while skipping textarea-style fields so they can accept newlines. A native <code>&lt;form&gt;</code> submits on Enter only when the focused control is a form-associated element the browser recognizes, which excludes most custom elements.</p>
<auro-header level="3">Mixed Auro and native child support</auro-header>
<p><code>auro-form</code> recognizes its named Auro children and coordinates them as a single form, while still allowing native elements to live alongside them in markup. A native <code>&lt;form&gt;</code> treats Auro custom elements as opaque DOM nodes and provides no cross-field coordination between them.</p>
<auro-header level="3">Multi-brand theming</auro-header>
<p><code>auro-form</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only form is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>
<auro-header level="2">Summary</auro-header>
<table>
<thead>
<tr>
<th>Feature</th>
<th>Native <code>&lt;form&gt;</code> with Auro tokens</th>
<th><code>auro-form</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Design-system-aligned layout</td>
<td>Manual (author-written CSS)</td>
<td>Built-in</td>
</tr>
<tr>
<td>Child element registration</td>
<td>Built-ins only via <code>form.elements</code></td>
<td>Automatic, including dynamic children</td>
</tr>
<tr>
<td>Aggregated value snapshot</td>
<td>Manual or <code>FormData</code> (no custom elements)</td>
<td>Single <code>value</code> getter</td>
</tr>
<tr>
<td>Aggregated validity state</td>
<td>Built-ins only via <code>checkValidity()</code></td>
<td>Single <code>validity</code> getter across all children</td>
</tr>
<tr>
<td>Initial-state tracking</td>
<td>Manual</td>
<td><code>isInitialState</code> getter</td>
</tr>
<tr>
<td><code>auroFormElement-validated</code> aggregation</td>
<td>Not supported</td>
<td>Built-in</td>
</tr>
<tr>
<td>Submit coordination</td>
<td>Native submit fires before custom-element validation</td>
<td>Forces validation, then fires <code>submit</code> with full value</td>
</tr>
<tr>
<td>Reset coordination</td>
<td>Resets built-ins only</td>
<td>Calls <code>reset()</code> on every child; emits previous value</td>
</tr>
<tr>
<td>Submit/reset button disabling</td>
<td>Manual</td>
<td>Automatic based on state and validity</td>
</tr>
<tr>
<td>Enter-to-submit on custom elements</td>
<td>Not supported</td>
<td>Built-in (skips textarea)</td>
</tr>
<tr>
<td>Mixed Auro and native children</td>
<td>Native treats Auro elements as opaque</td>
<td>Coordinated as a single form</td>
</tr>
<tr>
<td>Multi-brand theming</td>
<td>Static (import-time tokens)</td>
<td>Full (design tokens + component logic)</td>
</tr>
</tbody>
</table>
<auro-header level="2">Recommendation</auro-header>
<p>Use <code>auro-form</code> whenever possible. Fall back to a CSS-styled native <code>&lt;form&gt;</code> only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to reimplement child registration, aggregated value and validity, submit and reset coordination, and action-button state management yourself.</p>
