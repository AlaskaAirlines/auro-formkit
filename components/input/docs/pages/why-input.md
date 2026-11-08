<auro-header level="1" id="overview">Why auro-input?</auro-header>

<p>The native <code>&lt;input&gt;</code> element is the workhorse of HTML forms, but it has significant limitations in styling, validation messaging, input formatting, and accessibility. <code>auro-input</code> addresses these for common input types. To include its value in form data, place it inside <code>auro-form</code> and set <code>name</code>, because a native <code>&lt;form&gt;</code> doesn't include it.</p>

<auro-header level="2" id="accessibility">Accessibility</auro-header>

<p>Native inputs require manual <code>&lt;label&gt;</code> wiring, have no standard pattern for error announcements, and provide no built-in clear or show/hide password controls.</p>

<p><code>auro-input</code> provides:</p>

<ul>
  <li><strong>Automatic label binding</strong>: The label slot is automatically associated with the input. You don't need to wire up <code>for</code> and <code>id</code>.</li>
  <li><strong>Dynamic label positioning</strong>: Labels float above the input when focused or populated, providing context without consuming space.</li>
  <li><strong>Clear button</strong>: An accessible clear button appears when the input has a value. Set its accessible name with the <code>ariaLabel.clear</code> slot.</li>
  <li><strong>Password toggle</strong>: For <code>type="password"</code>, a show/hide button is built in. Set its accessible name for each state with the <code>ariaLabel.password.show</code> and <code>ariaLabel.password.hide</code> slots.</li>
  <li><strong>Validation announcements</strong>: Error messages display in help text with appropriate ARIA roles so screen readers announce validity changes.</li>
</ul>

<auro-header level="2" id="inputMaskingAndFormatting">Input masking and formatting</auro-header>

<p>Native inputs have no concept of input masks. Building formatted input (phone numbers, dates, credit card numbers) requires third-party libraries and manual integration.</p>

<p><code>auro-input</code> includes IMask integration:</p>

<ul>
  <li><strong>Format attribute</strong>: Set <code>format="(000) 000-0000"</code> for phone numbers, <code>format="mm/dd/yyyy"</code> for dates, or any custom pattern.</li>
  <li><strong>Auto-formatting</strong>: Formats characters as the user types and keeps the cursor in place.</li>
  <li><strong>Date formats</strong>: Supports formats such as <code>mm/dd/yyyy</code>, <code>dd/mm/yyyy</code>, and <code>yyyy-mm-dd</code>, and stores full dates in <code>value</code> as ISO (<code>YYYY-MM-DD</code>).</li>
</ul>

<auro-header level="2" id="creditCardDetection">Credit card detection</auro-header>

<p>Native inputs can't detect a card brand from what's typed, apply the matching format, or show the brand's icon.</p>

<p><code>auro-input</code> with <code>type="credit-card"</code> provides:</p>

<ul>
  <li><strong>Auto-detection</strong>: Identifies Visa, Mastercard, American Express, Discover, Diners Club, JCB, China UnionPay, and Alaska Airlines cards from the first digits typed.</li>
  <li><strong>Dynamic formatting</strong>: Applies the correct digit grouping, such as 4-4-4-4 for Visa or 4-6-5 for Amex.</li>
  <li><strong>Card icon</strong>: Shows the detected card brand's icon when the <code>icon</code> attribute is set.</li>
</ul>

<auro-header level="2" id="validation">Validation</auro-header>

<p>Native input validation provides <code>required</code>, <code>min</code>, <code>max</code>, <code>minlength</code>, <code>maxlength</code>, and <code>pattern</code>, but error messages are browser-controlled and can't be customized.</p>

<p><code>auro-input</code> provides:</p>

<ul>
  <li>Custom error messages for each kind of error: <code>setCustomValidityValueMissing</code>, <code>setCustomValidityRangeOverflow</code>, <code>setCustomValidityRangeUnderflow</code>, <code>setCustomValidityTooLong</code>, <code>setCustomValidityTooShort</code>, <code>setCustomValidityPatternMismatch</code>, <code>setCustomValidityCustomError</code>, and <code>setCustomValidityForType</code></li>
  <li>Type-specific validation for email addresses, card numbers, and dates</li>
  <li>Validation timing control: when the input loses focus (default), also on every keystroke (<code>validateOnInput</code>), or not when the input loses focus (<code>noValidate</code>)</li>
  <li>Programmatic vs. user input distinction: the component tracks whether a value change was user-initiated or programmatic</li>
</ul>

<auro-header level="2" id="displayValueMasking">Display value masking</auro-header>

<p>Native inputs show the raw value at all times. They can't show a formatted or alternative version of the value when the input doesn't have focus.</p>

<p><code>auro-input</code> supports a <code>displayValue</code> slot that shows custom HTML in place of the raw value when the input has a value and doesn't have focus. This is useful for displaying formatted currency, masked account numbers, or rich content while keeping the underlying value clean for submission.</p>

<auro-header level="2" id="layoutOptions">Layout options</auro-header>

<p>Native inputs have a single visual presentation controlled by browser defaults.</p>

<p><code>auro-input</code> offers:</p>

<ul>
  <li><strong>Three layouts</strong>: <code>classic</code> (floating label), <code>emphasized</code> (prominent label), and <code>snowflake</code> (custom positioning)</li>
  <li><strong>Shape variants</strong>: <code>box</code>, <code>pill</code>, <code>pill-left</code>, and <code>pill-right</code>, for different visual contexts</li>
  <li><strong>Simple mode</strong>: Borderless variant for use inside other components</li>
</ul>

<auro-header level="2" id="designSystemIntegration">Design system integration</auro-header>

<p>Native input styling varies across browsers and requires extensive CSS resets to normalize.</p>

<p><code>auro-input</code> is built with the Auro Design System:</p>

<ul>
  <li>Consistent visual language across all browsers and platforms</li>
  <li>Light and dark theme support (<code>appearance</code>)</li>
  <li>CSS <code>::part()</code> selectors for granular styling (such as <code>wrapper</code>, <code>label</code>, <code>input</code>, <code>helpText</code>, <code>accentIcon</code>, and <code>displayValue</code>)</li>
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
      <td><code>classic</code>, <code>emphasized</code>, and <code>snowflake</code></td>
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
