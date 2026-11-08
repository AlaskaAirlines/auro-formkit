<p>The component consists of the following elements:</p>
<ul>
  <li>
    <strong>Trigger:</strong> Shows the component label, "(optional)" text when the combobox isn't <code>required</code>, the current value, and the state of the component, such as <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, and <code>invalid</code>. The trigger includes a text input that allows the user to type and filter the available options.
  </li>
  <li>
    <strong>Options list:</strong> Lists the options the user can choose from, in a bib that opens as the user types in the trigger. Typing narrows the list to matching options.
  </li>
  <li>
    <strong>Help text:</strong> Shows text below the trigger that explains how to use the field. When validation fails, an error message replaces it.
  </li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger includes the component label, "(optional)" text when the combobox isn't <code>required</code>, and the current value. The label is required so screen reader users know what the field is for. Screen readers also announce the invalid state when it's applied.</p>
<p>Change the "(optional)" text with the <code>optionalLabel</code> slot.</p>
<p>When an option is selected, its text content renders in the input field.</p>
<p>The trigger is a focusable element and visually responds to common UI states: <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component doesn't have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="options">List options</auro-header>
<p>The component renders a list of options that the user can select. Options are filtered as the user types in the input. Each option may be in one of the following states when rendered:</p>
<ul>
  <li>
    <code>selected</code>: One option may be selected at a time and identifies the current value of the component.
  </li>
  <li>
    <code>active</code>: One option may be active at a time. The active option is the one that becomes selected if the user chooses it.
  </li>
  <li>
    <code>disabled</code>: One or more options may be disabled. Disabled options aren't interactive and can't be marked as active or selected.
  </li>
</ul>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text isn't required, but consider how users, especially screen reader users, understand the full context of the component. In some cases, a label alone may be confusing.</p>
<p>If the component fails validation, the help text changes to show a validation message instead of the default help text.</p>
<auro-header level="3" id="helpText">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default color</auro-header>
<p>Use the default colors when the combobox is on a light background.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse color</auro-header>
<p>When the component is on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>