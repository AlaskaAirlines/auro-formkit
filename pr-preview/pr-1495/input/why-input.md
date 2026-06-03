<auro-header level="1" id="overview">Why auro-input?</auro-header>
<p>The native <code>&lt;input&gt;</code> element is the workhorse of HTML forms, but it has significant limitations in styling, validation messaging, input formatting, and accessibility. <code>auro-input</code> addresses these while remaining a drop-in upgrade for common input types.</p>
<auro-header level="2" id="accessibility">Accessibility</auro-header>
<p>Native inputs require manual <code>&lt;label&gt;</code> wiring, have no standard pattern for error announcements, and provide no built-in clear or show/hide password controls.</p>
<p><code>auro-input</code> provides:</p>
<ul>
<li><strong>Automatic label binding</strong> — The label slot is automatically associated with the input. No <code>for</code>/<code>id</code> wiring required.</li>
<li><strong>Dynamic label positioning</strong> — Labels float above the input when focused or populated, providing context without consuming space.</li>
<li><strong>Clear button</strong> — An accessible clear button appears when the input has a value, with a customizable ARIA label via the <code>ariaLabel.clear</code> slot.</li>
<li><strong>Password toggle</strong> — For <code>type="password"</code>, a show/hide toggle is built in with customizable ARIA labels for both states (<code>ariaLabel.password.show</code>, <code>ariaLabel.password.hide</code>).</li>
<li><strong>Validation announcements</strong> — Error messages display in help text with appropriate ARIA roles so screen readers announce validity changes.</li>
</ul>
<auro-header level="2" id="inputMaskingAndFormatting">Input masking and formatting</auro-header>
<p>Native inputs have no concept of input masks. Building formatted input (phone numbers, dates, credit card numbers) requires third-party libraries and manual integration.</p>
<p><code>auro-input</code> includes IMask integration:</p>
<ul>
<li><strong>Format attribute</strong> — Set <code>format="(###) ###-####"</code> for phone numbers, <code>format="mm/dd/yyyy"</code> for dates, or any custom pattern.</li>
<li><strong>Auto-formatting</strong> — Characters are formatted as the user types, with cursor position preserved.</li>
<li><strong>Date formats</strong> — Supports <code>mm/dd/yyyy</code>, <code>dd/mm/yyyy</code>, <code>yyyy-mm-dd</code> with automatic conversion.</li>
</ul>
<auro-header level="2" id="creditCardDetection">Credit card detection</auro-header>
<p>There is no native way to detect a credit card type from input, apply the correct formatting mask, or display the appropriate card icon.</p>
<p><code>auro-input</code> with <code>type="credit-card"</code> provides:</p>
<ul>
<li><strong>Auto-detection</strong> — Identifies Visa, Mastercard, American Express, Discover, Diners Club, and Alaska Airlines cards from the first digits typed.</li>
<li><strong>Dynamic formatting</strong> — Applies the correct digit grouping (e.g., 4-4-4-4 for Visa, 4-6-5 for Amex).</li>
<li><strong>Card icon</strong> — Displays the detected card brand icon automatically.</li>
<li><strong>Luhn validation</strong> — Validates the card number using the Luhn algorithm.</li>
</ul>
<auro-header level="2" id="validation">Validation</auro-header>
<p>Native input validation provides <code>required</code>, <code>min</code>, <code>max</code>, <code>minlength</code>, <code>maxlength</code>, and <code>pattern</code>, but error messages are browser-controlled and cannot be customized.</p>
<p><code>auro-input</code> provides:</p>
<ul>
<li>Custom error messages for every validity state: <code>setCustomValidityValueMissing</code>, <code>setCustomValidityRangeOverflow</code>, <code>setCustomValidityRangeUnderflow</code>, <code>setCustomValidityTooLong</code>, <code>setCustomValidityTooShort</code>, <code>setCustomValidityBadInput</code>, <code>setCustomValidityCustomError</code>, <code>setCustomValidityForType</code></li>
<li>Type-specific validation (email format, credit card Luhn, phone format, date format)</li>
<li>Validation timing control: on blur (default), on every input (<code>validateOnInput</code>), or disabled (<code>noValidate</code>)</li>
<li>Programmatic vs. user input distinction — the component tracks whether a value change was user-initiated or programmatic</li>
</ul>
<auro-header level="2" id="displayValueMasking">Display value masking</auro-header>
<p>Native inputs show the raw value at all times. There is no way to display a formatted or alternative representation when the input is not focused.</p>
<p><code>auro-input</code> supports a <code>displayValue</code> slot that shows custom HTML when the input is blurred, hiding the raw value. This is useful for displaying formatted currency, masked account numbers, or rich content while keeping the underlying value clean for submission.</p>
<auro-header level="2" id="layoutOptions">Layout options</auro-header>
<p>Native inputs have a single visual presentation controlled by browser defaults.</p>
<p><code>auro-input</code> offers:</p>
<ul>
<li><strong>Three layouts</strong> — Classic (floating label), emphasized (prominent label), and snowflake (custom positioning)</li>
<li><strong>Shape variants</strong> — Box, pill, pill-left, pill-right for different visual contexts</li>
<li><strong>Nested mode</strong> — Removes borders and hides help/error text for embedding inside other components</li>
<li><strong>Simple mode</strong> — Borderless variant for inline use</li>
</ul>
<auro-header level="2" id="designSystemIntegration">Design system integration</auro-header>
<p>Native input styling varies across browsers and requires extensive CSS resets to normalize.</p>
<p><code>auro-input</code> is built with the Auro Design System:</p>
<ul>
<li>Consistent visual language across all browsers and platforms</li>
<li>Light and dark theme support (<code>appearance</code>)</li>
<li>CSS <code>::part()</code> selectors for granular styling (<code>wrapper</code>, <code>label</code>, <code>input</code>, <code>helpText</code>, <code>accentIcon</code>, <code>iconContainer</code>, <code>displayValue</code>)</li>
<li>Design token integration for colors, spacing, and typography</li>
</ul>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;input&gt;</code></th>
<th><code>auro-input</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Automatic label binding</td>
<td>No (<code>for</code>/<code>id</code> required)</td>
<td>Yes (slot-based)</td>
</tr>
<tr>
<td>Input masking</td>
<td>No</td>
<td>Built-in (IMask)</td>
</tr>
<tr>
<td>Credit card detection</td>
<td>No</td>
<td>Auto-detect with icon and formatting</td>
</tr>
<tr>
<td>Custom validation messages</td>
<td>Browser-controlled</td>
<td>Per-constraint custom messages</td>
</tr>
<tr>
<td>Clear button</td>
<td>No</td>
<td>Built-in with ARIA label</td>
</tr>
<tr>
<td>Password show/hide</td>
<td>No</td>
<td>Built-in toggle</td>
</tr>
<tr>
<td>Display value masking</td>
<td>No</td>
<td><code>displayValue</code> slot</td>
</tr>
<tr>
<td>Multiple layouts</td>
<td>No</td>
<td>Classic, emphasized, snowflake</td>
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
