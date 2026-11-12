<p>The component consists of the following elements:</p>
<ul>
  <li>
    <strong>Checkbox group:</strong> A container element (<code>&lt;auro-checkbox-group&gt;</code>) that manages a collection of checkboxes, handles validation, and provides a shared legend and help text.
  </li>
  <li>
    <strong>Checkbox:</strong> An individual selectable element (<code>&lt;auro-checkbox&gt;</code>) that can be toggled between checked and unchecked states.
  </li>
  <li>
    <strong>Legend:</strong> The group's label, shown above the checkboxes and set with the group's <code>legend</code> slot.
  </li>
  <li>
    <strong>Help text:</strong> Text shown below the group that explains how to use it. While the group shows an error, the error message replaces it.
  </li>
</ul>
<auro-header level="4" id="checkboxGroup">Checkbox group</auro-header>
<p>The group element coordinates shared behavior across all child checkboxes, including validation (for example, <code>required</code>), error state display, and the <code>disabled</code> attribute, which turns off all options at once.</p>
<auro-header level="4" id="checkbox">Checkbox</auro-header>
<p>Each checkbox renders a visual indicator (checkmark) and a label. A checkbox may be in one of the following states:</p>
<ul>
  <li>
    <code>checked</code>: The checkbox is selected and its value is included in the group's value.
  </li>
  <li>
    <code>disabled</code>: The checkbox can't be toggled, but it stays in the keyboard tab order.
  </li>
  <li>
    <code>error</code>: The checkbox shows its error style. The group sets this when its validation fails.
  </li>
</ul>
