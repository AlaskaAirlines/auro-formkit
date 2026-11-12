<auro-header level="1" id="overview">Combobox: Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>Trigger:</strong> Shows the component label, "(optional)" text when the combobox isn't <code>required</code>, the current value, and the state of the component, such as <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, and <code>invalid</code>. The trigger includes a text input that allows the user to type and filter the available options.
</li>
<li>
<strong>Options list:</strong> Lists the options the user can choose from, in a bib that opens as the user types in the trigger. Typing narrows the list to matching options.
</li>
<li>
<strong>Help text:</strong> Shows text below the trigger that explains how to use the field. When validation fails, an error message replaces it.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger includes the component label, "(optional)" text when the combobox isn't <code>required</code>, and the current value. The label is required so screen reader users know what the field is for. Screen readers also announce the invalid state when it's applied.</p>
<p>Change the "(optional)" text with the <code>optionalLabel</code> slot.</p>
<p>When an option is selected, its text content renders in the input field.</p>
<p>The trigger is a focusable element and visually responds to common UI states: <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component doesn't have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="options">List options</auro-header>
<p>The component renders a list of options that the user can select. Options are filtered as the user types in the input. Each option may be in one of the following states when rendered:</p>
<ul>
<li>
<code>selected</code>: One option may be selected at a time and identifies the current value of the component.
</li>
<li>
<code>active</code>: One option may be active at a time. The active option is the one that becomes selected if the user chooses it.
</li>
<li>
<code>disabled</code>: One or more options may be disabled. Disabled options aren't interactive and can't be marked as active or selected.
</li>
</ul>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text isn't required, but consider how users, especially screen reader users, understand the full context of the component. In some cases, a label alone may be confusing.</p>
<p>If the component fails validation, the help text changes to show a validation message instead of the default help text.</p>
<auro-header level="3" id="helpText">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default color</auro-header>
<p>Use the default colors when the combobox is on a light background.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-combobox>
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse color</auro-header>
<p>When the component is on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-combobox appearance="inverse">
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Inverse appearance</span>
<span slot="ariaLabel.input.clear">Clear selection</span>
<span slot="ariaLabel.bib.close">Close combobox</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox appearance="inverse"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Inverse appearance&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear selection&lt;/span&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
<p>The <code>auro-combobox</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> feature set. The component defaults to <code>layout="classic"</code>, <code>shape="classic"</code>, and <code>size="xl"</code>.</p>
<auro-header level="4" id="classicLayout">Classic layout</auro-header>
<p>The <code>classic</code> layout is the default for <code>auro-combobox</code>. You don't need to set anything to get this look.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-combobox>
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="emphasizedLayout">Emphasized layout</auro-header>
<p>Use the <code>emphasized</code> layout only on light backgrounds.</p>
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
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/emphasized/basic.html -->
<auro-combobox layout="emphasized" value="Oranges" shape="pill" size="xl" placeholder="Placeholder content" required style="width: 249px;">
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">
            Apples
<div slot="displayValue">
<div class="mainText">Apples</div>
<div class="subText">Fruit</div>
</div>
</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">
            Oranges
<div slot="displayValue">
<div class="mainText">Oranges</div>
<div class="subText">Fruit</div>
</div>
</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">
            Peaches
<div slot="displayValue">
<div class="mainText">Peaches</div>
<div class="subText">Fruit</div>
</div>
</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">
            Grapes
<div slot="displayValue">
<div class="mainText">Grapes</div>
<div class="subText">Fruit</div>
</div>
</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">
            Cherries
<div slot="displayValue">
<div class="mainText">Cherries</div>
<div class="subText">Fruit</div>
</div>
</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
<span slot="helpText">
          Help text: Lorem ipsum solar lorem ipsum solar
</span>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/emphasized/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox layout="emphasized" value="Oranges" shape="pill" size="xl" placeholder="Placeholder content" required style="width: 249px;"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;
      Apples
      &lt;div slot="displayValue"&gt;
        &lt;div class="mainText"&gt;Apples&lt;/div&gt;
        &lt;div class="subText"&gt;Fruit&lt;/div&gt;
      &lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;
      Oranges
      &lt;div slot="displayValue"&gt;
        &lt;div class="mainText"&gt;Oranges&lt;/div&gt;
        &lt;div class="subText"&gt;Fruit&lt;/div&gt;
      &lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;
      Peaches
      &lt;div slot="displayValue"&gt;
        &lt;div class="mainText"&gt;Peaches&lt;/div&gt;
        &lt;div class="subText"&gt;Fruit&lt;/div&gt;
      &lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;
      Grapes
      &lt;div slot="displayValue"&gt;
        &lt;div class="mainText"&gt;Grapes&lt;/div&gt;
        &lt;div class="subText"&gt;Fruit&lt;/div&gt;
      &lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;
      Cherries
      &lt;div slot="displayValue"&gt;
        &lt;div class="mainText"&gt;Cherries&lt;/div&gt;
        &lt;div class="subText"&gt;Fruit&lt;/div&gt;
      &lt;/div&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
  &lt;span slot="helpText"&gt;
    Help text: Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="snowflakeLayout">Snowflake layout</auro-header>
<p>The <code>snowflake</code> layout is a unique, one-off layout that doesn't follow the normal pattern. Use it only as shown in the following example.</p>
<p>Use the <code>snowflake</code> layout only on dark backgrounds, with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-combobox layout="snowflake" shape="snowflake" size="lg" placeholder="Placeholder content" required appearance="inverse" style="width: 249px;">
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear name</span>
<span slot="bib.fullscreen.headline">Bib header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
<span slot="helpText">
          Help text: Lorem ipsum solar lorem ipsum solar
</span>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox layout="snowflake" shape="snowflake" size="lg" placeholder="Placeholder content" required appearance="inverse" style="width: 249px;"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear name&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
  &lt;span slot="helpText"&gt;
    Help text: Lorem ipsum solar lorem ipsum solar
  &lt;/span&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
