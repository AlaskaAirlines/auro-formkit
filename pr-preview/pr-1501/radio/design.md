<auro-header level="1" id="overview">Radio - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component Anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
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
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="defaultLayout">Default Layout</auro-header>
<p>The <code>auro-radio-group</code> renders radio buttons in a vertical list by default.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-radio-group>
<span slot="legend">Form label goes here</span>
<auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="horizontalLayout">Horizontal Layout</auro-header>
<p>Use the <code>horizontal</code> attribute to render options on a single horizontal line.</p>
<p><strong>Note:</strong> The <code>horizontal</code> attribute has a limit of 3 options. Beyond three, options will be listed vertically.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/horizontal.html) -->
<!-- The below content is automatically added from ./../apiExamples/horizontal.html -->
<auro-radio-group horizontal>
<span slot="legend">Form label goes here</span>
<auro-radio id="horizontalRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="horizontalRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="horizontalRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/horizontal.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/horizontal.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group horizontal&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="horizontalRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="horizontalRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="horizontalRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default Color</auro-header>
<p>When the component is used on a light background.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-radio-group>
<span slot="legend">Form label goes here</span>
<auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse Color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-group.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-group.html -->
<auro-radio-group appearance="inverse">
<span slot="legend">Form label goes here</span>
<auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-group.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group appearance="inverse"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
