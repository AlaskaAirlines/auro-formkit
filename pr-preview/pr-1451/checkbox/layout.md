<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>checkbox group:</strong> a container element (<code>&lt;auro-checkbox-group&gt;</code>) that manages a collection of checkboxes, handles validation, and provides a shared legend and help text.
</li>
<li>
<strong>checkbox:</strong> an individual selectable element (<code>&lt;auro-checkbox&gt;</code>) that can be toggled between checked and unchecked states.
</li>
<li>
<strong>legend:</strong> descriptive label rendered above the group of checkboxes, set via the <code>legend</code> slot on the group.
</li>
<li>
<strong>help text:</strong> descriptive text rendered below the group intended to help clarify the intended use of the component and any current validation error with instructions to resolve those errors.
</li>
</ul>
<auro-header level="4" id="checkboxGroup">Checkbox Group</auro-header>
<p>The group element coordinates shared behavior across all child checkboxes, including validation (e.g. <code>required</code>), error state display, and the <code>disabled</code> attribute which disables all options at once.</p>
<auro-header level="4" id="checkbox">Checkbox</auro-header>
<p>Each checkbox renders a visual indicator (checkmark) and a label. A checkbox may be in one of the following states:</p>
<ul>
<li>
<code>checked</code> - The checkbox is selected and its value is included in the group's value.
</li>
<li>
<code>disabled</code> - The checkbox is not interactive and cannot be toggled.
</li>
<li>
<code>error</code> - Inherited from the parent group when validation fails.
</li>
</ul>
