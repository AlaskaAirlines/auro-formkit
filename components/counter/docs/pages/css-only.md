<auro-header level="1">CSS only with native number input</auro-header>

<p>For situations where the <code>&lt;auro-counter&gt;</code> web component cannot be used, a native HTML <code>&lt;input type="number"&gt;</code> element — optionally paired with <code>&lt;button&gt;</code> increment and decrement controls — can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-counter</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.counter</code> class, so the styling must be authored manually using Auro design tokens.</p>

<auro-header level="2">Styling a native number input</auro-header>

<p>The native number input and its associated increment/decrement buttons can be restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the layout, button shape, and value typography used by <code>auro-counter</code>.</p>

<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";

.counter {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-size-200, 1rem);
  font-family: var(--ds-font-family-default, sans-serif);
}

.counter__button {
  appearance: none;
  -webkit-appearance: none;
  width: var(--ds-size-400, 2rem);
  height: var(--ds-size-400, 2rem);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: 50%;
  background-color: var(--ds-color-container-primary-default, #ffffff);
  color: var(--ds-color-text-primary-default, #00467f);
  font-size: var(--ds-size-300, 1.5rem);
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.counter__button:focus-visible {
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: 2px;
}

.counter__button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.counter__value {
  appearance: textfield;
  -moz-appearance: textfield;
  width: var(--ds-size-500, 2.5rem);
  border: none;
  background: transparent;
  text-align: center;
  font-size: var(--ds-size-300, 1.5rem);
  color: var(--ds-color-text-primary-default, #2a2a2a);
}

.counter__value::-webkit-outer-spin-button,
.counter__value::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</code></pre>

<auro-header level="3">Basic counter</auro-header>

<p>Wrap a native <code>&lt;input type="number"&gt;</code> with two <code>&lt;button&gt;</code> elements and a <code>&lt;label&gt;</code> for an accessible name:</p>

<pre><code>&lt;div class="counter"&gt;
  &lt;label for="passengers"&gt;Passengers&lt;/label&gt;
  &lt;button type="button" class="counter__button" aria-label="Decrease passengers"&gt;&minus;&lt;/button&gt;
  &lt;input id="passengers" class="counter__value" type="number" min="0" max="9" step="1" value="0" /&gt;
  &lt;button type="button" class="counter__button" aria-label="Increase passengers"&gt;+&lt;/button&gt;
&lt;/div&gt;</code></pre>

<auro-header level="3">Group of counters</auro-header>

<p>Use a <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> to give the group an accessible name. The buttons require custom JavaScript to update each input's value:</p>

<pre><code>&lt;fieldset&gt;
  &lt;legend&gt;Travelers&lt;/legend&gt;
  &lt;div class="counter"&gt;
    &lt;label for="adults"&gt;Adults&lt;/label&gt;
    &lt;button type="button" class="counter__button" aria-label="Decrease adults"&gt;&minus;&lt;/button&gt;
    &lt;input id="adults" class="counter__value" type="number" min="1" max="9" step="1" value="1" /&gt;
    &lt;button type="button" class="counter__button" aria-label="Increase adults"&gt;+&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="counter"&gt;
    &lt;label for="children"&gt;Children&lt;/label&gt;
    &lt;button type="button" class="counter__button" aria-label="Decrease children"&gt;&minus;&lt;/button&gt;
    &lt;input id="children" class="counter__value" type="number" min="0" max="8" step="1" value="0" /&gt;
    &lt;button type="button" class="counter__button" aria-label="Increase children"&gt;+&lt;/button&gt;
  &lt;/div&gt;
&lt;/fieldset&gt;</code></pre>

<auro-header level="2">What you lose without auro-counter</auro-header>

<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-counter</code>, the following functionality built into the <code>auro-counter</code> and <code>auro-counter-group</code> web components is <strong>not available</strong> when using plain HTML:</p>

<auro-header level="3">Increment and decrement button wiring</auro-header>

<p><code>auro-counter</code> exposes <code>increment()</code> and <code>decrement()</code> methods and handles all click wiring between its buttons and the displayed value. With native HTML, the <code>&lt;button&gt;</code> controls have no inherent relationship to the <code>&lt;input type="number"&gt;</code> — you must write JavaScript click handlers that read the input, apply the step, clamp to <code>min</code>/<code>max</code>, and write the new value back.</p>

<auro-header level="3">Automatic min/max button disabling</auro-header>

<p><code>auro-counter</code> automatically disables the decrement button when the value is at <code>min</code> and the increment button when the value is at <code>max</code>, providing a clear visual signal that further changes are not allowed. Native HTML <code>min</code> and <code>max</code> only constrain validation — the surrounding <code>&lt;button&gt;</code> controls will not disable themselves at the boundaries unless you wire that behavior yourself.</p>

<auro-header level="3">Group-level min/max coordination</auro-header>

<p><code>auro-counter-group</code> supports <code>min</code> and <code>max</code> properties that apply to the <em>total</em> of all child counters. When the aggregate total reaches the group maximum, every child counter's increment button is disabled; when it reaches the minimum, every decrement button is disabled. Native HTML has no equivalent — you must write JavaScript to sum each input, compare against a group total, and toggle every button accordingly.</p>

<auro-header level="3">Coordinated value object and total</auro-header>

<p><code>auro-counter-group</code> exposes a single <code>value</code> property as an object keyed by each counter's <code>name</code>, along with a separate <code>total</code> property for the aggregate sum. With native HTML, you must query each input individually, build the value object yourself, and recompute the total on every change.</p>

<auro-header level="3">Spinbutton ARIA semantics</auro-header>

<p><code>auro-counter</code> renders a <code>role="spinbutton"</code> element with <code>aria-valuemin</code>, <code>aria-valuemax</code>, <code>aria-valuenow</code>, <code>aria-valuetext</code>, and <code>aria-labelledby</code> so assistive technology announces the value as a spinbutton — the role most screen readers expect for stepper controls. A native <code>&lt;input type="number"&gt;</code> is announced as an editable text field, not a spinbutton, and there is no built-in way to relabel the surrounding +/− buttons through ARIA slots.</p>

<auro-header level="3">Validation and error messaging</auro-header>

<p><code>auro-counter</code> integrates with <code>@aurodesignsystem/form-validation</code> to expose a <code>validity</code> property, an <code>error</code> attribute, and a help text region that switches to an alert with <code>role="alert"</code> and <code>aria-live="assertive"</code> when invalid. Native number inputs surface browser-controlled validation tooltips that are not announced inline and cannot be styled or customized beyond <code>setCustomValidity()</code>.</p>

<auro-header level="3">Keyboard strategy</auro-header>

<p><code>auro-counter</code> and <code>auro-counter-group</code> install dedicated keyboard strategies that handle Arrow keys, Home/End, and tab order across the +/− buttons and the spinbutton, including ordered traversal of every counter inside a group. Native HTML gives you only the default browser behavior — Arrow keys step the number input by one, but they will not move focus between counters or coordinate Home/End across a group without custom code.</p>

<auro-header level="3">Disabled state and propagation</auro-header>

<p><code>auro-counter</code> exposes a single <code>disabled</code> attribute that disables both buttons and removes the spinbutton from the tab order, and <code>auro-counter-group</code> propagates appearance and theming to all child counters. With native HTML, you must apply <code>disabled</code> to each <code>&lt;input&gt;</code> and each <code>&lt;button&gt;</code> individually, or wrap them in a <code>&lt;fieldset disabled&gt;</code> with the side effects that entails.</p>

<auro-header level="3">Dropdown layout</auro-header>

<p><code>auro-counter-group</code> supports an <code>isDropdown</code> mode that renders the group inside an Auro dropdown with a trigger, value text, fullscreen breakpoint behavior, and configurable placement. There is no native HTML equivalent — reproducing this requires building the popover, focus management, and fullscreen transitions yourself.</p>

<auro-header level="3">Form integration events</auro-header>

<p><code>auro-counter</code> dispatches <code>input</code> events with a structured <code>detail.value</code>, and <code>auro-counter-group</code> dispatches <code>input</code> events carrying both <code>detail.total</code> and <code>detail.value</code> plus <code>auroFormElement-validated</code> events so a parent <code>auro-form</code> can coordinate validation. Native inputs emit only the standard <code>input</code> and <code>change</code> events without the structured payloads the Auro form system expects.</p>

<auro-header level="3">Multi-brand theming</auro-header>

<p><code>auro-counter</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only counter is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>

<auro-header level="2">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Native <code>&lt;input type="number"&gt;</code> with Auro tokens</th>
      <th><code>auro-counter</code></th>
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
      <td>Increment/decrement button wiring</td>
      <td>Manual JavaScript</td>
      <td>Built-in <code>increment()</code>/<code>decrement()</code></td>
    </tr>
    <tr>
      <td>Auto-disable at min/max</td>
      <td>Manual</td>
      <td>Automatic per counter</td>
    </tr>
    <tr>
      <td>Group-level min/max total</td>
      <td>Not supported</td>
      <td>Built-in via <code>auro-counter-group</code></td>
    </tr>
    <tr>
      <td>Coordinated value object and total</td>
      <td>Manual aggregation</td>
      <td>Single <code>value</code> and <code>total</code></td>
    </tr>
    <tr>
      <td>Spinbutton ARIA semantics</td>
      <td>Not supported</td>
      <td><code>role="spinbutton"</code> with full ARIA</td>
    </tr>
    <tr>
      <td>Validation messages</td>
      <td>Limited to <code>setCustomValidity()</code></td>
      <td>Inline live-region error help text</td>
    </tr>
    <tr>
      <td>Keyboard strategy across group</td>
      <td>Browser default only</td>
      <td>Coordinated arrow/Home/End handling</td>
    </tr>
    <tr>
      <td>Disabled propagation</td>
      <td>Per-input and per-button</td>
      <td>Single attribute on counter or group</td>
    </tr>
    <tr>
      <td>Dropdown layout</td>
      <td>Not supported</td>
      <td><code>isDropdown</code> with fullscreen breakpoints</td>
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

<p>Use <code>auro-counter</code> and <code>auro-counter-group</code> whenever possible. Fall back to a CSS-styled native number input only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to reimplement button wiring, min/max disabling, group totals, spinbutton ARIA, and keyboard coordination yourself.</p>
