<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>radio group:</strong> a container element (<code>&lt;auro-radio-group&gt;</code>) that manages a collection of radio buttons, handles validation, and provides a shared legend and help text.
</li>
<li>
<strong>radio button:</strong> an individual selectable element (<code>&lt;auro-radio&gt;</code>) that can be toggled between selected and unselected states. Only one radio button in a group can be selected at a time.
</li>
<li>
<strong>legend:</strong> descriptive label rendered above the group of radio buttons, set via the <code>legend</code> slot on the group.
</li>
<li>
<strong>help text:</strong> descriptive text rendered below the group intended to help clarify the intended use of the component and any current validation error with instructions to resolve those errors.
</li>
</ul>
<auro-header level="4" id="radioGroup">Radio Group</auro-header>
<p>The group element coordinates shared behavior across all child radio buttons, including validation (e.g. <code>required</code>), error state display, and the <code>disabled</code> attribute which disables all options at once.</p>
<auro-header level="4" id="radioButton">Radio Button</auro-header>
<p>Each radio button renders a visual indicator (filled circle) and a label. A radio button may be in one of the following states:</p>
<ul>
<li>
<code>checked</code> - The radio button is selected and its value becomes the group's value.
</li>
<li>
<code>disabled</code> - The radio button is not interactive and cannot be selected.
</li>
<li>
<code>error</code> - Inherited from the parent group when validation fails.
</li>
</ul>
