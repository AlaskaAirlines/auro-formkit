<auro-header level="1" id="overview">Checkbox - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component Anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
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
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="defaultLayout">Default Layout</auro-header>
<p>The <code>auro-checkbox-group</code> renders checkboxes in a vertical list by default.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-checkbox-group>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="basic" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="basic" id="checkbox-basic2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="basic" id="checkbox-basic3"&gt;Checkbox option that has some extra text that should wrap when rendered in a narrow container&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="basic" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="horizontalLayout">Horizontal Layout</auro-header>
<p>Use the <code>horizontal</code> attribute to render options on a single horizontal line.</p>
<p><strong>Note:</strong> The <code>horizontal</code> attribute has a limit of 3 options. Beyond three, options will be listed vertically.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/horizontal.html) -->
<!-- The below content is automatically added from ./../apiExamples/horizontal.html -->
<auro-checkbox-group horizontal>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="yes" name="horizontal" id="checkbox-horizontal1">Yes</auro-checkbox>
<auro-checkbox value="no" name="horizontal" id="checkbox-horizontal2">No</auro-checkbox>
<auro-checkbox value="maybe" name="horizontal" id="checkbox-horizontal3">Maybe</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/horizontal.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/horizontal.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group horizontal&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="yes" name="horizontal" id="checkbox-horizontal1"&gt;Yes&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="no" name="horizontal" id="checkbox-horizontal2"&gt;No&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="maybe" name="horizontal" id="checkbox-horizontal3"&gt;Maybe&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default Color</auro-header>
<p>When the component is used on a light background.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-checkbox-group>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="basic" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="basic" id="checkbox-basic2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="basic" id="checkbox-basic3"&gt;Checkbox option that has some extra text that should wrap when rendered in a narrow container&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="basic" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse Color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-checkbox-group appearance="inverse">
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group appearance="inverse"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="basic" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="basic" id="checkbox-basic3"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="basic" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
