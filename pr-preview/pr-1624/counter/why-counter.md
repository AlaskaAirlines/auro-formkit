<auro-header level="1" id="overview">Why auro-counter?</auro-header>
<p>The native <code>&lt;input type="number"&gt;</code> provides a basic numeric input, but it lacks the spinbutton accessibility pattern, has no concept of grouped counters with shared constraints, and renders inconsistently across browsers. <code>auro-counter</code> and <code>auro-counter-group</code> provide an accessible, feature-rich alternative.</p>
<auro-header level="2" id="accessibility">Accessibility</auro-header>
<p>Native number inputs have limited screen reader support. The browser-rendered increment/decrement buttons are often small, difficult to interact with, and announced inconsistently.</p>
<p><code>auro-counter</code> provides:</p>
<ul>
<li><strong>ARIA spinbutton pattern</strong> — The component uses <code>role="spinbutton"</code> with <code>aria-valuemin</code>, <code>aria-valuemax</code>, <code>aria-valuenow</code>, and <code>aria-valuetext</code> for complete screen reader semantics.</li>
<li><strong>Labeled controls</strong> — Increment and decrement buttons have customizable ARIA labels via <code>ariaLabel.plus</code> and <code>ariaLabel.minus</code> slots.</li>
<li><strong>Keyboard shortcuts</strong> — Arrow Up/Down, Ctrl+Arrow, and +/- keys all increment and decrement the value. These shortcuts go beyond what native number inputs provide.</li>
<li><strong>Focus delegation</strong> — <code>delegatesFocus</code> ensures focus reaches the interactive control regardless of where the user clicks.</li>
<li><strong>Description binding</strong> — The <code>description</code> slot content is linked via <code>aria-describedByElements</code> for additional context.</li>
</ul>
<auro-header level="2" id="smartButtonState">Smart button state</auro-header>
<p>Native number inputs allow the user to type or spin past the min/max bounds, then rely on validation to catch the error.</p>
<p><code>auro-counter</code> takes a proactive approach:</p>
<ul>
<li>The decrement button disables automatically at <code>min</code></li>
<li>The increment button disables automatically at <code>max</code></li>
<li>In a group, buttons disable based on the aggregate total, preventing any individual counter from pushing the group past its constraints</li>
</ul>
<auro-header level="2" id="counterGroups">Counter groups</auro-header>
<p>HTML has no concept of related numeric inputs with a shared constraint. For example, a passenger selector with "Adults", "Children", and "Infants" that must total no more than 9 requires custom JavaScript.</p>
<p><code>auro-counter-group</code> handles this with:</p>
<ul>
<li>An aggregate <code>total</code> computed from all child counters</li>
<li>Group-level <code>min</code> and <code>max</code> constraints applied across all children</li>
<li>A <code>value</code> object with named entries (e.g., <code>{ adults: 2, children: 1 }</code>)</li>
<li>Dynamic button disabling — when the group total reaches max, all increment buttons disable; when it reaches min, all decrement buttons disable</li>
<li>Group-level validation that aggregates individual counter errors</li>
<li>Optional dropdown presentation with <code>isDropdown</code> for compact UI</li>
</ul>
<auro-header level="2" id="responsiveLayout">Responsive layout</auro-header>
<p>Native number inputs have no concept of responsive presentation.</p>
<p><code>auro-counter-group</code> in dropdown mode adapts to the viewport:</p>
<ul>
<li><strong>Desktop</strong> — Counters appear in a positioned dropdown panel</li>
<li><strong>Mobile</strong> — Counters open in a fullscreen dialog with a configurable breakpoint</li>
<li>Layout options (classic, snowflake) control visual presentation</li>
</ul>
<auro-header level="2" id="validation">Validation</auro-header>
<p>Native number input validation is limited to <code>min</code>, <code>max</code>, <code>step</code>, and <code>required</code>.</p>
<p><code>auro-counter</code> integrates with the Auro form validation system:</p>
<ul>
<li>Group-level validation aggregates errors from all child counters</li>
<li><code>touched</code> tracking ensures errors appear only after interaction</li>
<li>Dispatches <code>auroFormElement-validated</code> events for parent form coordination</li>
</ul>
<auro-header level="2" id="designSystemIntegration">Design system integration</auro-header>
<p>Native number inputs render browser-specific controls that cannot be styled consistently.</p>
<p><code>auro-counter</code> is built with the Auro Design System:</p>
<ul>
<li>Consistent visual language with clearly labeled +/- buttons</li>
<li>Light and dark theme support (<code>appearance</code>)</li>
<li>CSS <code>::part()</code> selectors (<code>counterControl</code>, <code>controlPlus</code>, <code>controlMinus</code>, <code>helpText</code>)</li>
<li>Design token integration for sizing and spacing</li>
</ul>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;input type="number"&gt;</code></th>
<th><code>auro-counter</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>ARIA spinbutton semantics</td>
<td>No</td>
<td>Full implementation</td>
</tr>
<tr>
<td>Auto-disable at min/max</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Grouped counters with shared max</td>
<td>Not supported</td>
<td>Built-in with <code>auro-counter-group</code></td>
</tr>
<tr>
<td>Aggregate value object</td>
<td>Not supported</td>
<td><code>{ name: value }</code> pairs</td>
</tr>
<tr>
<td>Keyboard shortcuts</td>
<td>Arrow keys only</td>
<td>Arrows, Ctrl+Arrows, +/-</td>
</tr>
<tr>
<td>Mobile fullscreen (group)</td>
<td>No</td>
<td>Automatic at breakpoint</td>
</tr>
<tr>
<td>Consistent cross-browser UI</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Theming</td>
<td>Browser-dependent</td>
<td>Full design system integration</td>
</tr>
</tbody>
</table>
