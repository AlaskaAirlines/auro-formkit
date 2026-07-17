<auro-header level="1" id="overview">Input - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component Anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>input field:</strong> shows the component label, current value and will render to reflect state of the component (e.g. <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, <code>invalid</code>), and a flag marking instances that are required.
</li>
<li>
<strong>label:</strong> descriptive text rendered above the input field to identify the purpose of the input. The label is required in order to ensure correct behavior when a guest is using accessibility tools such as screen readers and VoiceOver utilities.
</li>
<li>
<strong>help text:</strong> descriptive text rendered below the input field intended to help clarify the intended use of the component instance and any current validation error with instructions to resolve those errors.
</li>
</ul>
<p>The following elements are conditionally visible based on the component's configuration and state:</p>
<ul>
<li>
<strong>icon:</strong> an optional icon rendered to the left of the input value. Visible when the <code>icon</code> attribute is set (e.g. credit card icon when using <code>type="credit-card"</code> or calendar icon when using <code>type="date"</code>).
</li>
<li>
<strong>clear button:</strong> a button that clears the current input value. Visible when the input has a value, is not <code>disabled</code> or <code>readonly</code>, and the user has focus in or is hovering over the component.
</li>
<li>
<strong>show/hide password button:</strong> a toggle button that reveals or hides the input value. Visible when <code>type="password"</code> is set and the input has a value.
</li>
<li>
<strong>validation error icon:</strong> an alert icon rendered when the input is in an invalid state. Visible when the component fails validation.
</li>
</ul>
<auro-header level="4" id="inputField">Input Field</auro-header>
<p>The input field includes the component label, a flag marking the component optional/required and the current value. The label is required in order to ensure correct behavior when a guest is using accessibility tools such as screen readers and VoiceOver utilities. The invalid state will also announce to accessibility tools when applied.</p>
<p>The optional/required flag content may be customized.</p>
<p>The input field is a focusable element and will visually respond to common UI states - <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component does not have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="helpText">Help Text</auro-header>
<p>Help text is not required. However, consideration should be given to how users will understand the full context of the component instance, particularly users reliant on accessibility tools like screen readers. In certain cases, a component label alone may be confusing.</p>
<p>If the component fails validation, the help text will change to show a validation help message instead of the default help text.</p>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default Color</auro-header>
<p>When the component is used on a light background.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-default.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-default.html -->
<auro-input>
<span slot="label">Default Appearance</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-default.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-default.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Default Appearance&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse Color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-input appearance="inverse">
<span slot="label">Inverse Appearance</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input appearance="inverse"&gt;
  &lt;span slot="label"&gt;Inverse Appearance&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape | Size | Layout Support</auro-header>
<p>The <code>auro-input</code> component supports the <code>shape</code>, <code>size</code> and <code>layout</code> feature set. The component defaults to the <code>layout="classic"</code>, <code>shape="classic"</code> and <code>size="lg"</code>.</p>
<auro-header level="4" id="classicLayout">Classic Layout</auro-header>
<p>The <code>classic</code> layout is default for <code>auro-input</code>. No customization is needed to achieve this look.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-input>
<span slot="ariaLabel.clear">Clear All</span>
<span slot="label">Label</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
  &lt;span slot="label"&gt;Label&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="emphasizedLayout">Emphasized Layout</auro-header>
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
<span slot="ariaLabel.clear">Clear All</span>
<label slot="label">Pill</label>
<span slot="helpText">Example help text</span>
</auro-input>
<auro-input dvInputOnly id="alpha" value="lax" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear All</span>
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
<span slot="ariaLabel.clear">Clear All</span>
<label slot="label">Pill left</label>
<span slot="helpText">Example help text</span>
</auro-input>
<auro-input id="delta" layout="emphasized-right" shape="pill-right" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear All</span>
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
  &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
  &lt;label slot="label"&gt;Pill&lt;/label&gt;
  &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-input dvInputOnly id="alpha" value="lax" layout="emphasized" shape="pill" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
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
    &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
    &lt;label slot="label"&gt;Pill left&lt;/label&gt;
    &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;auro-input id="delta" layout="emphasized-right" shape="pill-right" size="xl" placeholder="Departure" style="width: 249px;" appearance="inverse" required&gt;
    &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
    &lt;label slot="label"&gt;Pill right&lt;/label&gt;
    &lt;span slot="helpText"&gt;Example help text&lt;/span&gt;
  &lt;/auro-input&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="snowflakeLayout">Snowflake Layout</auro-header>
<p>The <code>snowflake</code> layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.</p>
<p>The <code>snowflake</code> layout is only expected to be used on dark backgrounds, in conjunction with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-input dvInputOnly value="lax" id="snowflakePill" layout="snowflake" shape="snowflake" size="lg" placeholder="Departure" style="width: 249px;" appearance="inverse" required>
<span slot="ariaLabel.clear">Clear All</span>
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
  &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
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
