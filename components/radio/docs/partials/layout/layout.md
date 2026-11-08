<p>The component consists of the following elements:</p>
<ul>
  <li>
    <strong>Radio group:</strong> A container element (<code>&lt;auro-radio-group&gt;</code>) that manages a collection of radio buttons, handles validation, and provides a shared legend and help text.
  </li>
  <li>
    <strong>Radio button:</strong> An individual option (<code>&lt;auro-radio&gt;</code>) that becomes selected when someone chooses it. Only one radio button in a group can be selected at a time.
  </li>
  <li>
    <strong>Legend:</strong> The group's label, shown above the radio buttons and set with the group's <code>legend</code> slot.
  </li>
  <li>
    <strong>Help text:</strong> Text shown below the group that explains how to use it. While the group shows an error, the error message replaces it.
  </li>
</ul>
<auro-header level="4" id="radioGroup">Radio group</auro-header>
<p>The group element coordinates shared behavior across all child radio buttons, including validation (for example, <code>required</code>), error state display, and the <code>disabled</code> attribute, which turns off all options at once.</p>
<auro-header level="4" id="radioButton">Radio button</auro-header>
<p>Each radio button shows a circle, which fills in when selected, and a label. A radio button may be in one of the following states:</p>
<ul>
  <li>
    <code>checked</code>: The radio button is selected and its value becomes the group's value.
  </li>
  <li>
    <code>disabled</code>: The radio button can't be selected.
  </li>
  <li>
    <code>error</code>: The radio button shows its error style. The group sets this when its validation fails.
  </li>
</ul>
