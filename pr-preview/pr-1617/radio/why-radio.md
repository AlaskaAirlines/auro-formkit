<auro-header level="1" id="overview">Why auro-radio?</auro-header>
<p>The native <code>&lt;input type="radio"&gt;</code> provides basic mutual exclusion within a named group, but it cannot be styled consistently, has no built-in group validation or error messaging, and requires manual <code>&lt;fieldset&gt;</code>/<code>&lt;legend&gt;</code> wiring. <code>auro-radio</code> and <code>auro-radio-group</code> address these gaps.</p>
<auro-header level="2" id="accessibility">Accessibility</auro-header>
<p>Native radio buttons have basic accessibility, but managing a group with a legend, validation errors, and consistent keyboard behavior requires careful manual implementation.</p>
<p><code>auro-radio</code> provides:</p>
<ul>
<li><strong>Proper ARIA semantics</strong> — Each radio carries <code>role="radio"</code>, <code>aria-checked</code>, <code>aria-required</code>, and <code>aria-disabled</code>.</li>
<li><strong>Roving tabindex</strong> — Only the selected radio (or the first radio if none is selected) has <code>tabindex="0"</code>. Arrow keys move between radios within the group, matching the expected WAI-ARIA radio group pattern.</li>
<li><strong>Group labeling</strong> — <code>auro-radio-group</code> provides a <code>legend</code> slot that is automatically associated as the group's accessible label.</li>
<li><strong>Keyboard interaction</strong> — Arrow keys navigate between options, Space selects the focused radio.</li>
</ul>
<auro-header level="2" id="groupManagement">Group management</auro-header>
<p>Building a radio group with coordinated validation, error display, and state management from native inputs requires custom JavaScript and DOM structure.</p>
<p><code>auro-radio-group</code> provides:</p>
<ul>
<li>A single <code>value</code> property reflecting the selected radio's value</li>
<li><code>optionSelected</code> reference to the selected element</li>
<li>Propagation of <code>disabled</code> state to all child radios</li>
<li>Horizontal layout option via the <code>horizontal</code> attribute</li>
<li><code>reset()</code> to clear selection and validation state across all children</li>
</ul>
<auro-header level="2" id="validation">Validation</auro-header>
<p>Native radio groups support <code>required</code> via the HTML attribute, but the error message is browser-controlled and there is no standard way to display custom error text below the group.</p>
<p><code>auro-radio-group</code> integrates with the Auro form validation system:</p>
<ul>
<li>Group-level <code>required</code> validation (at least one must be selected)</li>
<li>Custom error messages via <code>setCustomValidityCustomError</code> and <code>setCustomValidityValueMissing</code></li>
<li><code>noValidate</code> to disable auto-validation on blur</li>
<li><code>touched</code> tracking so errors appear only after user interaction</li>
<li>Dispatches <code>auroFormElement-validated</code> events for parent form coordination</li>
<li>Error display via the <code>helpText</code> slot</li>
</ul>
<auro-header level="2" id="themingAndVisualConsistency">Theming and visual consistency</auro-header>
<p>Native radio buttons render differently across browsers and operating systems. Their appearance — the circle, the fill, the label spacing — cannot be reliably controlled with CSS alone.</p>
<p><code>auro-radio</code> is built with the Auro Design System:</p>
<ul>
<li>Consistent visual language across all browsers and platforms</li>
<li>Light and dark theme support (<code>appearance="default"</code> or <code>appearance="inverse"</code>)</li>
<li>CSS <code>::part()</code> selectors for targeted styling (<code>radio</code>, <code>radio-input</code>, <code>radio-label</code>)</li>
</ul>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;input type="radio"&gt;</code></th>
<th><code>auro-radio</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Consistent cross-browser styling</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Group validation</td>
<td>Manual <code>&lt;fieldset&gt;</code></td>
<td>Built-in with <code>auro-radio-group</code></td>
</tr>
<tr>
<td>Custom error messages</td>
<td>Browser-controlled</td>
<td>Per-constraint custom messages</td>
</tr>
<tr>
<td>Roving tabindex</td>
<td>Manual implementation</td>
<td>Built-in</td>
</tr>
<tr>
<td>Group legend</td>
<td>Manual <code>&lt;legend&gt;</code></td>
<td><code>legend</code> slot</td>
</tr>
<tr>
<td>Horizontal layout</td>
<td>Manual CSS</td>
<td><code>horizontal</code> attribute</td>
</tr>
<tr>
<td>Theming</td>
<td>Browser-dependent</td>
<td>Full design system integration</td>
</tr>
<tr>
<td>Reset group</td>
<td>Manual per-element</td>
<td>Single <code>reset()</code> call</td>
</tr>
</tbody>
</table>
