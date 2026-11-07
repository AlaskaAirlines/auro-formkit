<p>The component consists of the following elements:</p>
<ul>
  <li>
    <strong>Trigger:</strong> Shows the label, the current value, and the component's state, such as <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, or <code>invalid</code>, plus an "(optional)" flag when the component isn't required.
  </li>
  <li>
    <strong>Options list:</strong> The options people can select, shown in a bib that opens and closes from the trigger.
  </li>
  <li>
    <strong>Help text:</strong> Text below the trigger that explains how to use the component, or, when it's invalid, what's wrong and how to fix it.
  </li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger includes the label, an "(optional)" flag when the component isn't required, and the current value. The label is required so screen reader users, including VoiceOver users, know what the component is for. When the component becomes invalid, screen readers announce the error message.</p>
<p>To change the "(optional)" text, use the <code>optionalLabel</code> slot.</p>
<p>In single-select mode, the trigger shows the selected option's full content, including any icons. In <code>multiSelect</code> mode, it shows the selected options' text, separated by commas.</p>
<p>The trigger can receive focus and visually responds to common UI states: <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, and <strong>Disabled</strong> <em>(:disabled)</em>. The component doesn't have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="options">List options</auro-header>
<p>The component renders a list of options that people can select. Each option can be in one of the following states:</p>
<ul>
  <li>
    <code>selected</code>: One option can be selected at a time, and it sets the component's current value. Set <code>multiSelect</code> to allow more than one selected option.
  </li>
  <li>
    <code>active</code>: One option can be active at a time. The active option is the one that becomes selected when the user confirms a choice.
  </li>
  <li>
    <code>disabled</code>: One or more options can be disabled. Disabled options aren't interactive and can't become active or selected.
  </li>
</ul>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text isn't required. Still, consider how people understand the full context of the component, particularly screen reader users. In some cases, a label alone may be confusing.</p>
<p>When the component fails validation, an error message replaces the help text.</p>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default color</auro-header>
<p>Use the default colors when the component is on a light background.</p>
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
<p>When the component is on a dark background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
