<auro-header level="1" id="overview">Why auro-checkbox?</auro-header>
<p>The native HTML <code>&lt;input type="checkbox"&gt;</code> is functional but minimal. It cannot be styled consistently across browsers, offers no group-level validation, and provides no integration with a design system. <code>auro-checkbox</code> and <code>auro-checkbox-group</code> address these gaps.</p>
<auro-header level="2" id="accessibility">Accessibility</auro-header>
<p>Native checkboxes have basic accessibility, but managing groups of related checkboxes — with a shared legend, coordinated validation, and consistent keyboard behavior — requires significant custom work.</p>
<p><code>auro-checkbox</code> provides:</p>
<ul>
<li><strong>Proper ARIA semantics</strong> — Each checkbox carries <code>role="checkbox"</code>, <code>aria-checked</code>, and <code>aria-disabled</code> attributes that stay in sync with component state.</li>
<li><strong>Automatic label binding</strong> — Slot content is automatically associated as the accessible label, eliminating <code>&lt;label for&gt;</code> wiring.</li>
<li><strong>Group-level semantics</strong> — <code>auro-checkbox-group</code> wraps checkboxes with a <code>legend</code> slot, giving screen readers a clear group description.</li>
<li><strong>Keyboard interaction</strong> — Space toggles the checkbox, matching the expected interaction pattern.</li>
</ul>
<auro-header level="2" id="groupManagement">Group management</auro-header>
<p>HTML has no native concept of a checkbox group. Building one requires manual DOM wiring for legends, error messages, and validation state.</p>
<p><code>auro-checkbox-group</code> handles this with:</p>
<ul>
<li>A coordinated <code>value</code> array reflecting all checked items</li>
<li>Group-level <code>required</code> validation (at least one must be selected)</li>
<li>Propagation of <code>disabled</code> state to all child checkboxes</li>
<li>Horizontal layout option for compact groups (up to 3 items)</li>
<li>A single <code>reset()</code> method that clears all checkboxes and validation state</li>
</ul>
<auro-header level="2" id="validation">Validation</auro-header>
<p>Native checkboxes support <code>required</code> on individual inputs, but there is no way to require "at least one selected" across a group without JavaScript.</p>
<p><code>auro-checkbox-group</code> integrates with the Auro form validation system:</p>
<ul>
<li>Group-level <code>required</code> validation</li>
<li>Custom error messages via <code>setCustomValidity</code> and <code>setCustomValidityValueMissing</code></li>
<li><code>touched</code> tracking so errors only appear after user interaction</li>
<li>Dispatches <code>auroFormElement-validated</code> events for parent form coordination</li>
</ul>
<auro-header level="2" id="themingAndVisualConsistency">Theming and visual consistency</auro-header>
<p>Native checkboxes render differently across browsers and operating systems. Their appearance cannot be reliably controlled with CSS alone.</p>
<p><code>auro-checkbox</code> is built with the Auro Design System:</p>
<ul>
<li>Consistent visual language across all browsers and platforms</li>
<li>Light and dark theme support (<code>appearance="default"</code> or <code>appearance="inverse"</code>)</li>
<li>CSS <code>::part()</code> selectors for targeted styling (<code>checkbox</code>, <code>checkbox-input</code>, <code>checkbox-label</code>)</li>
<li>Embedded checkmark SVG that renders only when checked</li>
</ul>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;input type="checkbox"&gt;</code></th>
<th><code>auro-checkbox</code></th>
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
<td>Not supported</td>
<td>Built-in with <code>auro-checkbox-group</code></td>
</tr>
<tr>
<td>Custom error messages</td>
<td>Not supported</td>
<td>Per-constraint custom messages</td>
</tr>
<tr>
<td>Accessible group labeling</td>
<td>Manual <code>&lt;fieldset&gt;</code>/<code>&lt;legend&gt;</code></td>
<td>Automatic via <code>legend</code> slot</td>
</tr>
<tr>
<td>Theming</td>
<td>Browser-dependent</td>
<td>Full design system integration</td>
</tr>
<tr>
<td>Horizontal layout</td>
<td>Manual CSS</td>
<td><code>horizontal</code> attribute</td>
</tr>
<tr>
<td>Reset all in group</td>
<td>Manual</td>
<td>Single <code>reset()</code> call</td>
</tr>
</tbody>
</table>
