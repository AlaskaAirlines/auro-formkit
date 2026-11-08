<auro-header level="1" id="overview">Input: Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
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
<!-- The below content is automatically added from ./../apiExamples/appearance-default.html -->
<auro-input>
<span slot="label">Default appearance</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-default.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-default.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Default appearance&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-input appearance="inverse">
<span slot="label">Inverse appearance</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input appearance="inverse"&gt;
  &lt;span slot="label"&gt;Inverse appearance&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
<p>The <code>auro-input</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> attributes. It defaults to <code>layout="classic"</code>, <code>shape="classic"</code>, and <code>size="lg"</code>.</p>
<auro-header level="4" id="classicLayout">Classic layout</auro-header>
<p>The <code>classic</code> layout is the default for <code>auro-input</code>, so you don't need to set anything to get this look.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-input>
<span slot="ariaLabel.clear">Clear value</span>
<span slot="label">Label</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear value&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="emphasizedLayout">Emphasized layout</auro-header>
<p>The <code>emphasized</code> layout is only supported on light backgrounds.</p>
<p>The <code>emphasized</code> layout supports the following shapes:</p>
<ul>
<li><code>pill</code></li>
<li><code>pill-left</code></li>
<li><code>pill-right</code></li>
</ul>
<p>The <code>emphasized</code> layout supports the following sizes:</p>
<ul>
<li><code>xl</code></li>
</ul>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
<auro-input id="beta" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear value</span>
<label slot="label">Pill</label>
<span slot="helpText">Example help text</span>
</auro-input>
<auro-input dvInputOnly id="alpha" value="lax" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear value</span>
<label slot="label">Pill w. display value</label>
<span slot="helpText">Example help text</span>
<span slot="displayValue">
<div>
<div class="subText">Los Angeles</div>
</div>
</span>
</auro-input>
<div style="display: flex; gap: 6px; flex-direction: row;">
<auro-input id="charlie" layout="emphasized-left" shape="pill-left" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear value</span>
<label slot="label">Pill left</label>
<span slot="helpText">Example help text</span>
</auro-input>
<auro-input id="delta" layout="emphasized-right" shape="pill-right" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear value</span>
<label slot="label">Pill right</label>
<span slot="helpText">Example help text</span>
</auro-input>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input id="beta" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear value&lt;/span&gt;
  &lt;label slot="label"&gt;Pill&lt;/label&gt;
  &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-input dvInputOnly id="alpha" value="lax" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear value&lt;/span&gt;
  &lt;label slot="label"&gt;Pill w. display value&lt;/label&gt;
  &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
  &lt;span slot="displayValue"&gt;
    &lt;div&gt;
      &lt;div class="subText"&gt;Los Angeles&lt;/div&gt;
    &lt;/div&gt;
  &lt;/span&gt;
&lt;/auro-input&gt;
&lt;div style="display: flex; gap: 6px; flex-direction: row;"&gt;
  &lt;auro-input id="charlie" layout="emphasized-left" shape="pill-left" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required&gt;
    &lt;span slot="ariaLabel.clear"&gt;Clear value&lt;/span&gt;
    &lt;label slot="label"&gt;Pill left&lt;/label&gt;
    &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;auro-input id="delta" layout="emphasized-right" shape="pill-right" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required&gt;
    &lt;span slot="ariaLabel.clear"&gt;Clear value&lt;/span&gt;
    &lt;label slot="label"&gt;Pill right&lt;/label&gt;
    &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
  &lt;/auro-input&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="snowflakeLayout">Snowflake layout</auro-header>
<p>The <code>snowflake</code> layout is a one-off layout that doesn't follow the usual pattern. Use it only as shown in the following example.</p>
<p>Use the <code>snowflake</code> layout only on dark backgrounds, with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-input dvInputOnly value="lax" id="snowflakePill" layout="snowflake" shape="snowflake" size="lg" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear value</span>
<label slot="label">From</label>
<span slot="helpText">Example help text</span>
<span slot="displayValue">
<div>
<div class="subText">Los Angeles</div>
</div>
</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input dvInputOnly value="lax" id="snowflakePill" layout="snowflake" shape="snowflake" size="lg" placeholder="Departure" style="width: 249px;" appearance="inverse" required&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear value&lt;/span&gt;
  &lt;label slot="label"&gt;From&lt;/label&gt;
  &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
  &lt;span slot="displayValue"&gt;
    &lt;div&gt;
      &lt;div class="subText"&gt;Los Angeles&lt;/div&gt;
    &lt;/div&gt;
  &lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
