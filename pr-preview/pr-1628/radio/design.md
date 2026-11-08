<auro-header level="1" id="overview">Radio - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
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
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="defaultLayout">Default layout</auro-header>
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
<auro-header level="3" id="horizontalLayout">Horizontal layout</auro-header>
<p>Use the <code>horizontal</code> attribute to place the radio buttons side by side on one line.</p>
<p><strong>Note:</strong> <code>horizontal</code> works for up to three radio buttons. Groups with four or more stay stacked vertically.</p>
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
<auro-header level="4" id="defaultColor">Default color</auro-header>
<p>Use the default colors when the component sits on a light background.</p>
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
<auro-header level="4" id="inverseColor">Inverse color</auro-header>
<p>When the component sits on a dark background, set <code>appearance="inverse"</code> to use colors made for dark backgrounds.</p>
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
