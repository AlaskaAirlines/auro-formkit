<auro-header level="1" id="overview">Counter: VoiceOver behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-counter&gt;</code> component. It covers announcements and gestures for interacting with standalone counters, counter groups, and dropdown counter groups.</p>

<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive announcements</auro-header>

<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus moves to a counter's spinbutton, VoiceOver announces:</p>
<ol>
  <li><strong>Label:</strong> The counter's label from the default slot, plus any text in the <code>description</code> slot</li>
  <li><strong>Role:</strong> <em>"incrementable"</em> or <em>"stepper"</em> (spinbutton)</li>
  <li><strong>Current value:</strong> The current numeric value</li>
  <li><strong>Range:</strong> <em>"from [min] to [max]"</em>, using <code>min</code> and <code>max</code> or their defaults of 0 and 9</li>
  <li>
    <strong>State hints:</strong>
    <table class="compressed body-xs">
      <thead>
        <tr>
          <th>State</th>
          <th>What gets announced</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Disabled</td>
          <td><em>"dimmed"</em></td>
        </tr>
        <tr>
          <td>Invalid</td>
          <td>Nothing on the spinbutton, which doesn't currently set <code>aria-invalid</code>. The error message is announced from the help text when it appears.</td>
        </tr>
      </tbody>
    </table>
  </li>
</ol>

<auro-header level="3" id="voiceOverButtonAnnouncement">Increment and decrement buttons</auro-header>
<p>When the VoiceOver cursor moves to a counter button, VoiceOver announces:</p>
<ol>
  <li><strong>Label:</strong> The button's accessible label from the <code>ariaLabel.minus</code> or <code>ariaLabel.plus</code> slot, such as <em>"Remove adult"</em> or <em>"Add adult"</em></li>
  <li><strong>Role:</strong> <em>"button"</em></li>
  <li><strong>State:</strong> <em>"dimmed"</em> when the counter is at its min or max boundary</li>
</ol>
<p>Without those slots, the buttons fall back to the symbols "−" and "+" as their labels.</p>

<auro-header level="3" id="voiceOverValueChange">Value change</auro-header>
<p>When the counter value changes (via button activation or arrow keys), VoiceOver announces the updated value from the spinbutton's <code>aria-valuenow</code> and <code>aria-valuetext</code> attributes.</p>

<auro-header level="2" id="voiceOverStandaloneWorkflow">Standalone counter workflow</auro-header>
<ol>
  <li><strong>Focus decrement button:</strong> Announces button label and state</li>
  <li><strong>Focus spinbutton:</strong> Announces label, value, and range</li>
  <li><strong>Focus increment button:</strong> Announces button label and state</li>
  <li><strong>Interact:</strong> Activate buttons or use arrow keys to change the value</li>
</ol>

<auro-header level="2" id="voiceOverDropdownWorkflow">Dropdown counter workflow</auro-header>

<auro-header level="3" id="voiceOverDropdownLargeVP">Large viewport</auro-header>
<p>Examples: large tablet, typical size or larger desktop browser window</p>
<ol>
  <li><strong>Focus trigger:</strong> Announces the label and current summary value</li>
  <li><strong>Open | Expand:</strong> Activating the trigger expands the dropdown bib containing the counters</li>
  <li><strong>Navigate counters:</strong> Tab through the counters within the bib</li>
  <li><strong>Close | Collapse:</strong> Pressing Escape collapses the dropdown</li>
</ol>

<auro-header level="3" id="voiceOverDropdownSmallVP">Small viewport</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
  <li><strong>Focus trigger:</strong> Announces the label and current summary value</li>
  <li><strong>Open | Expand:</strong> Opens a fullscreen modal dialog; focus moves to the close button</li>
  <li><strong>Navigate counters:</strong> Swipe through each counter's controls, or Tab through the counters</li>
  <li><strong>Close:</strong> Activate the close button or use the scrub gesture (two-finger zigzag) to dismiss</li>
</ol>

<auro-header level="2" id="voiceOverStates">Impact of state</auro-header>

<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p><strong>What VoiceOver does:</strong></p>
<ul>
  <li>Focuses the element and announces it with <strong>"dimmed"</strong>, indicating the control is disabled.</li>
  <li>The element leaves the keyboard tab order and can't be operated.</li>
  <li>Increment and decrement buttons are also announced as <em>"dimmed"</em> and can't be activated.</li>
</ul>

<auro-header level="3" id="voiceOverStateBoundary">Min/max boundary</auro-header>
<p>When the counter reaches its minimum or maximum value:</p>
<ul>
  <li>The corresponding button (decrement at min, increment at max) is announced as <em>"dimmed"</em>.</li>
  <li>The button can't be activated, preventing the value from going out of range.</li>
</ul>
