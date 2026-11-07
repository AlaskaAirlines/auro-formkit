<p>The component consists of the following elements:</p>
<ul>
  <li>
    <strong>Input field:</strong> Shows the label, the current value, and the " (optional)" text when the input isn't <code>required</code>. Its style changes with the component's state, such as focus, hover, disabled, valid, and invalid.
  </li>
  <li>
    <strong>Label:</strong> Text shown in or above the field that names what to enter. Every input needs a label, because screen readers announce it as the field's name.
  </li>
  <li>
    <strong>Help text:</strong> Text shown below the field that explains what to enter. While the input is invalid, an error message replaces it.
  </li>
</ul>
<p>The following elements appear only for some settings and states:</p>
<ul>
  <li>
    <strong>Icon:</strong> An icon left of the value: a card icon when the <code>icon</code> attribute is set with <code>type="credit-card"</code>, or a calendar icon when <code>type="date"</code>. The emphasized layouts don't show it.
  </li>
  <li>
    <strong>Clear button:</strong> A button that clears the value. Visible when the input has a value, isn't <code>disabled</code> or <code>readonly</code>, and the user has focus in or is hovering over the component.
  </li>
  <li>
    <strong>Show/hide password button:</strong> A button that shows or hides the value. Visible in the <code>classic</code> layout when <code>type="password"</code> is set, the input has a value, and the user has focus in or is hovering over the component.
  </li>
  <li>
    <strong>Validation error icon:</strong> An alert icon shown while the input is invalid.
  </li>
</ul>
<auro-header level="4" id="inputField">Input field</auro-header>
<p>The input field includes the label, the " (optional)" text when the input isn't <code>required</code>, and the current value. Every input needs a label, because screen readers announce it as the field's name. Screen readers also announce when the input is invalid.</p>
<p>Use the <code>optionalLabel</code> slot to change the " (optional)" text.</p>
<p>The input field can get focus, and its style changes for these states: <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, and <strong>Disabled</strong> <em>(:disabled)</em>. Its style doesn't change for the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text is optional. Still, consider whether people, especially screen reader users, can understand what to enter from the label alone. Sometimes a label by itself is confusing.</p>
<p>If the input fails validation, the help text changes to an error message.</p>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default color</auro-header>
<p>Use the default appearance on light backgrounds.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-default.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-default.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
