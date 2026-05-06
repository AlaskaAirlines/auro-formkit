<auro-header level="1" id="overview">Input - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#activeLabel" class="level2 body-xs">Active Label</auro-anchorlink>
<auro-anchorlink fluid href="#dvInputOnly" class="level2 body-xs">Display Value Input Only</auro-anchorlink>
<auro-anchorlink fluid href="#icon" class="level2 body-xs">Icon</auro-anchorlink>
<auro-anchorlink fluid href="#lightDarkBackground" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
<auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
<auro-anchorlink fluid href="#optionalFlag" class="level2 body-xs">Optional Flag</auro-anchorlink>
<auro-anchorlink fluid href="#simple" class="level2 body-xs">Simple</auro-anchorlink>
<auro-anchorlink fluid href="#nested" class="level2 body-xs">Nested</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
<auro-anchorlink fluid href="#behavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#autocapitalize" class="level2 body-xs">Autocapitalize</auro-anchorlink>
<auro-anchorlink fluid href="#autocomplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
<auro-anchorlink fluid href="#autocorrect" class="level2 body-xs">Autocorrect</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
<auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
<auro-anchorlink fluid href="#format" class="level2 body-xs">Format</auro-anchorlink>
<auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
<auro-anchorlink fluid href="#max" class="level2 body-xs">Max</auro-anchorlink>
<auro-anchorlink fluid href="#maxLength" class="level2 body-xs">Max Length</auro-anchorlink>
<auro-anchorlink fluid href="#min" class="level2 body-xs">Min</auro-anchorlink>
<auro-anchorlink fluid href="#minLength" class="level2 body-xs">Min Length</auro-anchorlink>
<auro-anchorlink fluid href="#name" class="level2 body-xs">Name</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validate</auro-anchorlink>
<auro-anchorlink fluid href="#pattern" class="level2 body-xs">Pattern</auro-anchorlink>
<auro-anchorlink fluid href="#readonly" class="level2 body-xs">Readonly</auro-anchorlink>
<auro-anchorlink fluid href="#required" class="level2 body-xs">Required</auro-anchorlink>
<auro-anchorlink fluid href="#setCustomValidity" class="level2 body-xs">Custom Validation Messages</auro-anchorlink>
<auro-anchorlink fluid href="#type" class="level2 body-xs">Type</auro-anchorlink>
<auro-anchorlink fluid href="#validateOnInput" class="level2 body-xs">Validate on Input</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="activeLabel">Active Label</auro-header>
<p>Use the <code>activeLabel</code> attribute to make the label stay fixed in the active position.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/active-label.html) -->
<!-- The below content is automatically added from ../apiExamples/active-label.html -->
<auro-input activeLabel>
<span slot="label">Address</span>
<span slot="helpText">Please enter your home address.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/active-label.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/active-label.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input activeLabel&gt;
  &lt;span slot="label"&gt;Address&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your home address.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dvInputOnly">Display Value Input Only</auro-header>
<p>Use the <code>dvInputOnly</code> attribute so that the <code>displayValue</code> slot content only masks the HTML5 input element. The input's label will not be masked. Without this attribute, the display value slot content covers both the label and the input.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/dv-input-only.html) -->
<!-- The below content is automatically added from ../apiExamples/dv-input-only.html -->
<auro-header level="4">Display Value Slot Content Only</auro-header>
<auro-input value="Hello World">
<span slot="label">Default display value behavior</span>
<span slot="displayValue">✨ Custom Display ✨</span>
</auro-input>
<auro-header level="4">Display Value Slot Content with <code>dvInputOnly</code></auro-header>
<auro-input dvInputOnly value="Hello World">
<span slot="label">With dvInputOnly</span>
<span slot="displayValue">✨ Custom Display ✨</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/dv-input-only.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/dv-input-only.html -->
<pre class="language-html"><code class="language-html">&lt;auro-header level="4"&gt;Display Value Slot Content Only&lt;/auro-header&gt;
&lt;auro-input value="Hello World"&gt;
  &lt;span slot="label"&gt;Default display value behavior&lt;/span&gt;
  &lt;span slot="displayValue"&gt;✨ Custom Display ✨&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-header level="4"&gt;Display Value Slot Content with &lt;code&gt;dvInputOnly&lt;/code&gt;&lt;/auro-header&gt;
&lt;auro-input dvInputOnly value="Hello World"&gt;
  &lt;span slot="label"&gt;With dvInputOnly&lt;/span&gt;
  &lt;span slot="displayValue"&gt;✨ Custom Display ✨&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="icon">Icon</auro-header>
<p>Use the <code>icon</code> attribute to render an icon inside the input to the left of the value. Support is limited to <code>auro-input</code> instances with credit card format.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below content is automatically added from ../apiExamples/credit-card-icon.html -->
<auro-input icon type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input icon type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Valid credit card numbers must include 16 digits (15 for Amex).&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="lightDarkBackground">Light vs. Dark Background</auro-header>
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
<auro-header level="3" id="placeholder">Placeholder</auro-header>
<p>Use the <code>placeholder</code> attribute to add a custom placeholder message within the element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placeholder.html) -->
<!-- The below content is automatically added from ../apiExamples/placeholder.html -->
<auro-input placeholder="John Doe" required>
<span slot="label">Full name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placeholder.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/placeholder.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input placeholder="John Doe" required&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="optionalFlag">Optional Flag</auro-header>
<p>The <code>&lt;auro-input&gt;</code> supports an <code>optionalLabel</code> slot, where users can override the default <code>(optional)</code> notification text.</p>
<p>Providing the slot with empty content will remove it.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
<!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
<auro-input placeholder="John Doe" bordered>
<span slot="label">Full name</span>
<span slot="optionalLabel"> - custom optional text</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input placeholder="John Doe" bordered&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="optionalLabel"&gt; - custom optional text&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="simple">Simple</auro-header>
<p>Use the <code>simple</code> attribute to render the input without a border. This is intended for use when the input is embedded inside the trigger of an auro-droopdown.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/simple.html) -->
<!-- The below content is automatically added from ./../apiExamples/simple.html -->
<auro-input simple>
<span slot="label">Simple Input</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/simple.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/simple.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input simple&gt;
  &lt;span slot="label"&gt;Simple Input&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="nested">Nested</auro-header>
<p>Use the <code>nested</code> attribute to render the input without borders, help text, error text, or accents. This is intended for use when the input is embedded inside the trigger of an auro-droopdown.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nested.html) -->
<!-- The below content is automatically added from ./../apiExamples/nested.html -->
<auro-input nested>
<span slot="label">Nested Input</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nested.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/nested.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input nested&gt;
  &lt;span slot="label"&gt;Nested Input&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by changing the values of the following token(s).</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">/* stylelint-disable custom-property-empty-line-before */
​
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
​
:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-input-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
​
  --ds-auro-input-outline-color: transparent;
}
​
:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-input-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
​
  --ds-auro-input-outline-color: transparent;
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<auro-header level="3" id="cssParts">CSS Shadow Parts</auro-header>
<p>CSS Shadow Parts allow you to style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-input&gt;</code>.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>wrapper</code></td><td>The root wrapper element of the input.</td></tr>
<tr><td><code>label</code></td><td>The label element.</td></tr>
<tr><td><code>helpText</code></td><td>The help text element.</td></tr>
<tr><td><code>input</code></td><td>The native input element.</td></tr>
<tr><td><code>accentIcon</code></td><td>The accent icon element (e.g. credit card icon, calendar icon).</td></tr>
<tr><td><code>iconContainer</code></td><td>The icon container (e.g. X icon for clearing input value).</td></tr>
<tr><td><code>accent-left</code></td><td>The left accent element.</td></tr>
<tr><td><code>accent-right</code></td><td>The right accent element.</td></tr>
<tr><td><code>displayValue</code></td><td>The display value element.</td></tr>
<tr><td><code>inputHelpText</code></td><td>The input help text wrapper.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ../apiExamples/css-parts.html -->
<style>
auro-input.css-parts-demo::part(wrapper) {
border-color: orange;
}
auro-input.css-parts-demo::part(label) {
color: purple;
}
auro-input.css-parts-demo::part(helpText) {
color: green;
}
auro-input.css-parts-demo::part(input) {
font-style: italic;
}
</style>
<auro-input class="css-parts-demo" required>
<span slot="label">CSS Parts Example</span>
<span slot="helpText">This input has custom styles applied via CSS Shadow Parts.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-input.css-parts-demo::part(wrapper) {
    border-color: orange;
  }
  auro-input.css-parts-demo::part(label) {
    color: purple;
  }
  auro-input.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-input.css-parts-demo::part(input) {
    font-style: italic;
  }
&lt;/style&gt;
&lt;auro-input class="css-parts-demo" required&gt;
  &lt;span slot="label"&gt;CSS Parts Example&lt;/span&gt;
  &lt;span slot="helpText"&gt;This input has custom styles applied via CSS Shadow Parts.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="behavior">Behavior</auro-header>
<auro-header level="3" id="autocapitalize">Autocapitalize</auro-header>
<p>Use the <code>autocapitalize</code> attribute to control whether and how text input is automatically capitalized as it is entered by the user. Supported values: <code>off</code>/<code>none</code>, <code>on</code>/<code>sentences</code>, <code>words</code>, <code>characters</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/autocapitalize.html) -->
<!-- The below content is automatically added from ../apiExamples/autocapitalize.html -->
<auro-input autocapitalize="none">
<span slot="label">No capitalization</span>
<span slot="helpText">Autocapitalize is set to none.</span>
</auro-input>
<auro-input autocapitalize="words">
<span slot="label">Capitalize words</span>
<span slot="helpText">Autocapitalize is set to words.</span>
</auro-input>
<auro-input autocapitalize="characters">
<span slot="label">Capitalize characters</span>
<span slot="helpText">Autocapitalize is set to characters.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/autocapitalize.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/autocapitalize.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input autocapitalize="none"&gt;
  &lt;span slot="label"&gt;No capitalization&lt;/span&gt;
  &lt;span slot="helpText"&gt;Autocapitalize is set to none.&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-input autocapitalize="words"&gt;
  &lt;span slot="label"&gt;Capitalize words&lt;/span&gt;
  &lt;span slot="helpText"&gt;Autocapitalize is set to words.&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-input autocapitalize="characters"&gt;
  &lt;span slot="label"&gt;Capitalize characters&lt;/span&gt;
  &lt;span slot="helpText"&gt;Autocapitalize is set to characters.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="autocomplete">Autocomplete</auro-header>
<p>Use the <code>autocomplete</code> attribute to control what the browser can suggest for autofill. At this time, only <code>autocomplete="off"</code> is supported.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/autocomplete.html) -->
<!-- The below content is automatically added from ../apiExamples/autocomplete.html -->
<auro-input autocomplete="off">
<span slot="label">Username</span>
<span slot="helpText">Browser autofill is disabled for this input.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/autocomplete.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/autocomplete.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input autocomplete="off"&gt;
  &lt;span slot="label"&gt;Username&lt;/span&gt;
  &lt;span slot="helpText"&gt;Browser autofill is disabled for this input.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="autocorrect">Autocorrect</auro-header>
<p>Use the <code>autocorrect</code> attribute set to <code>off</code> to stop iOS from auto-correcting words when typed into a text box.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/autocorrect.html) -->
<!-- The below content is automatically added from ../apiExamples/autocorrect.html -->
<auro-input autocorrect="off">
<span slot="label">Autocorrect off</span>
<span slot="helpText">iOS autocorrect is disabled for this input.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/autocorrect.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/autocorrect.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input autocorrect="off"&gt;
  &lt;span slot="label"&gt;Autocorrect off&lt;/span&gt;
  &lt;span slot="helpText"&gt;iOS autocorrect is disabled for this input.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disabled">Disabled</auro-header>
<p>Use the <code>disable</code> attribute to prevent the user from interacting with the input.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-input disabled>
<span slot="label">Disabled</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input disabled&gt;
  &lt;span slot="label"&gt;Disabled&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="error">Error</auro-header>
<p>Use the <code>error</code> attribute to apply a persistent custom error that supersedes the HTML5 validation logic.</p>
<p>A custom error message can be set using the <code>error</code> attribute, or it can be used in conjunction with the <code>setCustomValidityCustomError</code> attribute.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/error.html) -->
<!-- The below content is automatically added from ../apiExamples/error.html -->
<auro-button id="setCustomErrorBtn">Set Custom Error</auro-button>
<auro-button id="setCustomErrorClearBtn">Clear Custom Error</auro-button>
<br /><br />
<auro-input id="setCustomErrorExample" error="Initial error attribute value">
<span slot="label">Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="setCustomErrorBtn"&gt;Set Custom Error&lt;/auro-button&gt;
&lt;auro-button id="setCustomErrorClearBtn"&gt;Clear Custom Error&lt;/auro-button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;auro-input id="setCustomErrorExample" error="Initial error attribute value"&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/error.js -->
<pre class="language-js"><code class="language-js">export function customError() {
  const elem = document.querySelector('#setCustomErrorExample');
  // set custom error
  document.querySelector('#setCustomErrorBtn').addEventListener('click', () =&gt; {
    elem.error = "Custom Error Message";
  });
​
  // remove custom error
  document.querySelector('#setCustomErrorClearBtn').addEventListener('click', () =&gt; {
    elem.removeAttribute('error');
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="format">Format</auro-header>
<p>Use the <code>format</code> attribute to set the format of the IMask.</p>
<p>Default masking definitions:</p>
<ul>
<li>0 : number</li>
<li>a : letter</li>
<li>* : any character</li>
</ul>
<p>See <a href="https://imask.js.org/">IMask</a> for more information on how to configure a mask.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/format.html) -->
<!-- The below content is automatically added from ../apiExamples/format.html -->
<auro-input format="47440000">
<span slot="label">Custom format</span>
<span slot="helpText">Format is: 47440000</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/format.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/format.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input format="47440000"&gt;
  &lt;span slot="label"&gt;Custom format&lt;/span&gt;
  &lt;span slot="helpText"&gt;Format is: 47440000&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="inputMode">Input Mode</auro-header>
<p>Set the <code>inputmode</code> for the input.</p>
<p><strong>IMPORTANT</strong>: If you are also passing a <code>type</code>, most browsers will use the <code>type</code> attribute to determine what keyboard to display on mobile devices and ignore the <code>inputmode</code> attribute.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
<auro-input inputmode="tel">
<span slot="label">Telephone</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input inputmode="tel"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="max">Max</auro-header>
<p>Use the <code>max</code> attribute to define a maximum value used during validation. The attribute will only apply when <code>&lt;auro-input&gt;</code> also has a <code>type</code> attribute for <code>number</code> or any date format.</p>
<p>The <code>setCustomValidityRangeOverflow</code> attribute may optionally be used in combination with the <code>max</code> attribute to define custom help text used when the input value is greater than the value of the <code>max</code> attribute.</p>
<auro-header level="4">Date Example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-date.html) -->
<!-- The below content is automatically added from ../apiExamples/max-date.html -->
<auro-input type="date" max="03/25/2023" setCustomValidityRangeOverflow="The selected date is past the defined maximum date.">
<span slot="label">Choose a date</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-date.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-date.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" max="03/25/2023" setCustomValidityRangeOverflow="The selected date is past the defined maximum date."&gt;
  &lt;span slot="label"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Number Example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-number.html) -->
<!-- The below content is automatically added from ../apiExamples/max-number.html -->
<auro-input type="number" max="10" setCustomValidityRangeOverflow="The selected value is above the defined maximum.">
<span slot="label">Choose a number</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-number.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="number" max="10" setCustomValidityRangeOverflow="The selected value is above the defined maximum."&gt;
  &lt;span slot="label"&gt;Choose a number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="maxLength">Max Length</auro-header>
<p>Use the <code>maxlength</code> attribute to control the length of the input entered.</p>
<p>The <code>setCustomValidityTooLong</code> attribute may optionally be used in combination with the <code>maxLength</code> attribute to define custom help text used when the length of the input is too long.</p>
<p class="note"><strong>Note:</strong> This attribute is not intended to be used with a <code>type</code> or <code>format</code> that already has a defined length, such as credit-cards, dates or phone numbers.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-length.html) -->
<!-- The below content is automatically added from ../apiExamples/max-length.html -->
<auro-input maxlength="12" setCustomValidityTooLong="Oops! There were too many characters entered." required>
<span slot="label">Voucher Code</span>
<span slot="helpText">Please enter your 12 character voucher code.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-length.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-length.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input maxlength="12" setCustomValidityTooLong="Oops! There were too many characters entered." required&gt;
  &lt;span slot="label"&gt;Voucher Code&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your 12 character voucher code.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="min">Min</auro-header>
<p>Use the <code>min</code> attribute to define a minimum value used during validation. The attribute will only apply when <code>&lt;auro-input&gt;</code> also has a <code>type</code> attribute for <code>number</code> or any date format.</p>
<p>The <code>setCustomValidityRangeUnderflow</code> attribute may optionally be used in combination with the <code>min</code> attribute to define custom help text used when the input value is less than the value of the <code>min</code> attribute.</p>
<auro-header level="4">Date Example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-date.html) -->
<!-- The below content is automatically added from ../apiExamples/min-date.html -->
<auro-input type="date" min="03/25/2023" setCustomValidityRangeUnderflow="The selected date is before the defined minimum date.">
<span slot="label">Choose a date</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-date.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-date.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" min="03/25/2023" setCustomValidityRangeUnderflow="The selected date is before the defined minimum date."&gt;
  &lt;span slot="label"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Number Example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-number.html) -->
<!-- The below content is automatically added from ../apiExamples/min-number.html -->
<auro-input type="number" min="10" setCustomValidityRangeUnderflow="The selected value is below the defined minimum.">
<span slot="label">Choose a number</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-number.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="number" min="10" setCustomValidityRangeUnderflow="The selected value is below the defined minimum."&gt;
  &lt;span slot="label"&gt;Choose a number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="minLength">Min Length</auro-header>
<p>Use the <code>minlength</code> attribute to control the length of the input entered.</p>
<p>The <code>setCustomValidityTooShort</code> attribute may optionally be used in combination with the <code>minLength</code> attribute to define custom help text used when the length of the input is not long enough.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-length.html) -->
<!-- The below content is automatically added from ../apiExamples/min-length.html -->
<auro-input minlength="4" setCustomValidityTooShort="Please enter a full voucher code." required>
<span slot="label">Voucher Code</span>
<span slot="helpText">Please enter your 4 character voucher code.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-length.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-length.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input minlength="4" setCustomValidityTooShort="Please enter a full voucher code." required&gt;
  &lt;span slot="label"&gt;Voucher Code&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your 4 character voucher code.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="name">Name</auro-header>
<p>Use the <code>name</code> attribute to set the form field name for the input. This populates the <code>name</code> attribute on the internal HTML input element, which is used to identify the field when the form is submitted.</p>
<p>The <code>id</code> attribute is for identifying an element for client-side styling (CSS) and behavior (JavaScript), while <code>name</code> is for sending data to a server during form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/name.html) -->
<!-- The below content is automatically added from ../apiExamples/name.html -->
<auro-input name="firstName">
<span slot="label">First Name</span>
<span slot="helpText">Enter your legal first name.</span>
</auro-input>
<auro-input name="lastName">
<span slot="label">Last Name</span>
<span slot="helpText">Enter your legal last name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/name.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/name.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input name="firstName"&gt;
  &lt;span slot="label"&gt;First Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter your legal first name.&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-input name="lastName"&gt;
  &lt;span slot="label"&gt;Last Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter your legal last name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No Validate</auro-header>
<p>For use cases where the field is <code>required</code>, but live validation is not wanted, use the <code>noValidate</code> attribute.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ../apiExamples/no-validate.html -->
<auro-input noValidate required>
<span slot="label">Address</span>
<span slot="helpText">Please enter your home address.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/no-validate.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input noValidate required&gt;
  &lt;span slot="label"&gt;Address&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your home address.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="pattern">Pattern</auro-header>
<p>Use the <code>pattern</code> attribute to set custom input validation. This example also uses the <code>spellcheck</code> attribute set to <code>false</code> which in turn sets <code>autocorrect</code> to <code>off</code> and <code>autocapitalize</code> to <code>none</code>. Additionally the <code>maxlength</code> attribute sets the maximum length of characters that can be entered.</p>
<p>The <code>&lt;auro-input&gt;</code> component supports setting a custom validity message specific to the pattern validation by using the <code>setCustomValidityPatternMismatch</code> attribute.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/pattern.html) -->
<!-- The below content is automatically added from ../apiExamples/pattern.html -->
<auro-input pattern="[a-z]{1,15}" spellcheck="false" setCustomValidityPatternMismatch="Only contain lowercase letters w/no spaces">
<span slot="label">Username</span>
<span slot="helpText">Please enter a username.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/pattern.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/pattern.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input pattern="[a-z]{1,15}" spellcheck="false" setCustomValidityPatternMismatch="Only contain lowercase letters w/no spaces"&gt;
  &lt;span slot="label"&gt;Username&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter a username.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="readonly">Readonly</auro-header>
<p>Use the <code>readonly</code> attribute to prevent the user from editing the value of the input.</p>
<p>In this example, the user is able to programmatically change the value of the input by clicking the button or clear out the contents of the input.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/readonly.html) -->
<!-- The below content is automatically added from ../apiExamples/readonly.html -->
<auro-button id="setReadonlyValueBtn">Set Value to Auro Alaska</auro-button>
<auro-button id="resetReadonlyValueBtn">Reset</auro-button>
<br /><br />
<auro-input readonly id="readonlyExample">
<span slot="label">Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/readonly.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="setReadonlyValueBtn"&gt;Set Value to Auro Alaska&lt;/auro-button&gt;
&lt;auro-button id="resetReadonlyValueBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;auro-input readonly id="readonlyExample"&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/readonly.js -->
<pre class="language-js"><code class="language-js">export function setReadonlyValue() {
  const elem = document.querySelector('#readonlyExample');
​
  // set value of auro-input element
  document.querySelector('#setReadonlyValueBtn').addEventListener('click', () =&gt; {
      elem.value = "Auro Alaska";
  });
​
  document.querySelector('#resetReadonlyValueBtn').addEventListener('click', () =&gt; {
    elem.value = undefined;
});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="required">Required</auro-header>
<p>When present, the <code>required</code> attribute specifies that an input field must be filled out before submitting the form.</p>
<p>When the validity check fails, the validityState equals <code>valueMissing</code>. The error message for the <code>valueMissing</code> validityState can be changed to a custom string using the <code>setCustomValidityValueMissing</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/required.html) -->
<!-- The below content is automatically added from ../apiExamples/required.html -->
<auro-input required placeholder="John Doe">
<span slot="label">Full name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input required placeholder="John Doe"&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="setCustomValidity">Custom Validation Messages</auro-header>
<p>The input provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component checks for a state-specific message first, then falls back to the general <code>setCustomValidity</code> message.</p>
<ul>
<li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error. This message is used when no state-specific message is defined.</li>
<li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty.</li>
<li><strong><code>setCustomValidityForType</code></strong> — Displayed when the value does not match the expected format for the declared <code>type</code> (e.g. invalid email, phone number).</li>
<li><strong><code>setCustomValidityBadInput</code></strong> — Displayed when the browser considers the input value to be malformed (e.g. non-numeric characters in a <code>number</code> field).</li>
<li><strong><code>setCustomValidityRangeOverflow</code></strong> — Displayed when the value exceeds the <code>max</code> constraint.</li>
<li><strong><code>setCustomValidityRangeUnderflow</code></strong> — Displayed when the value is below the <code>min</code> constraint.</li>
<li><strong><code>setCustomValidityTooLong</code></strong> — Displayed when the value exceeds the <code>maxlength</code> constraint.</li>
<li><strong><code>setCustomValidityTooShort</code></strong> — Displayed when the value is shorter than the <code>minlength</code> constraint.</li>
</ul>
<p>The priority order for error messages is: state-specific property &gt; <code>setCustomValidity</code> &gt; default browser message.</p>
<p class="note"><strong>Note:</strong> Custom strings are NOT localized. It is the responsibility of the element consumer to provide localized strings when using these properties.</p>
<auro-header level="4">Fallback Message</auro-header>
<p>Use <code>setCustomValidity</code> to set a single message for all validation states.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity.html -->
<auro-input required minlength="3" setCustomValidity="Sorry, please enter your first and last name (one space required).">
<span slot="label">Full Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input required minlength="3" setCustomValidity="Sorry, please enter your first and last name (one space required)."&gt;
  &lt;span slot="label"&gt;Full Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Value Missing</auro-header>
<p>Use <code>setCustomValidityValueMissing</code> to customize the message when a <code>required</code> field is left empty.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-value-missing.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-value-missing.html -->
<auro-input required setCustomValidityValueMissing="Please enter your name to continue.">
<span slot="label">Full Name</span>
<span slot="helpText">Enter your legal first and last name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-value-missing.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-value-missing.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input required setCustomValidityValueMissing="Please enter your name to continue."&gt;
  &lt;span slot="label"&gt;Full Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter your legal first and last name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Type Validation</auro-header>
<p>Use <code>setCustomValidityForType</code> to customize the message when the value doesn't match the declared <code>type</code> format.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-for-type.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-for-type.html -->
<auro-input type="email" setCustomValidityForType="Please provide a valid email address (e.g. name@example.com).">
<span slot="label">Email Address</span>
<span slot="helpText">We'll use this to send your confirmation.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-for-type.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-for-type.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="email" setCustomValidityForType="Please provide a valid email address (e.g. name@example.com)."&gt;
  &lt;span slot="label"&gt;Email Address&lt;/span&gt;
  &lt;span slot="helpText"&gt;We'll use this to send your confirmation.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Bad Input</auro-header>
<p>Use <code>setCustomValidityBadInput</code> to customize the message when the browser considers the input malformed.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-bad-input.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-bad-input.html -->
<auro-input type="number" minlength="1" setCustomValidityBadInput="Please enter a valid whole number.">
<span slot="label">Quantity</span>
<span slot="helpText">Enter the number of items.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-bad-input.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-bad-input.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="number" minlength="1" setCustomValidityBadInput="Please enter a valid whole number."&gt;
  &lt;span slot="label"&gt;Quantity&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter the number of items.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Range Overflow</auro-header>
<p>Use <code>setCustomValidityRangeOverflow</code> to customize the message when the value exceeds the <code>max</code> constraint.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-range-overflow.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-range-overflow.html -->
<auro-input type="date" max="12/31/2025" setCustomValidityRangeOverflow="Date must be on or before 12/31/2025.">
<span slot="label">Event Date</span>
<span slot="helpText">Enter a date no later than 12/31/2025.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-range-overflow.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-range-overflow.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" max="12/31/2025" setCustomValidityRangeOverflow="Date must be on or before 12/31/2025."&gt;
  &lt;span slot="label"&gt;Event Date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter a date no later than 12/31/2025.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Range Underflow</auro-header>
<p>Use <code>setCustomValidityRangeUnderflow</code> to customize the message when the value is below the <code>min</code> constraint.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-range-underflow.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-range-underflow.html -->
<auro-input type="date" min="01/01/2024" setCustomValidityRangeUnderflow="Date must be on or after 01/01/2024.">
<span slot="label">Start Date</span>
<span slot="helpText">Enter a date no earlier than 01/01/2024.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-range-underflow.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-range-underflow.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" min="01/01/2024" setCustomValidityRangeUnderflow="Date must be on or after 01/01/2024."&gt;
  &lt;span slot="label"&gt;Start Date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter a date no earlier than 01/01/2024.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Too Long</auro-header>
<p>Use <code>setCustomValidityTooLong</code> to customize the message when the value exceeds the <code>maxlength</code> constraint.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-too-long.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-too-long.html -->
<auro-input maxlength="10" setCustomValidityTooLong="Please shorten your entry to 10 characters or fewer.">
<span slot="label">Username</span>
<span slot="helpText">Maximum 10 characters.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-too-long.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-too-long.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input maxlength="10" setCustomValidityTooLong="Please shorten your entry to 10 characters or fewer."&gt;
  &lt;span slot="label"&gt;Username&lt;/span&gt;
  &lt;span slot="helpText"&gt;Maximum 10 characters.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Too Short</auro-header>
<p>Use <code>setCustomValidityTooShort</code> to customize the message when the value is shorter than the <code>minlength</code> constraint.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-too-short.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-too-short.html -->
<auro-input minlength="3" setCustomValidityTooShort="Please enter at least 3 characters.">
<span slot="label">Nickname</span>
<span slot="helpText">Minimum 3 characters.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-too-short.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-too-short.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input minlength="3" setCustomValidityTooShort="Please enter at least 3 characters."&gt;
  &lt;span slot="label"&gt;Nickname&lt;/span&gt;
  &lt;span slot="helpText"&gt;Minimum 3 characters.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="type">Type</auro-header>
<auro-header level="4" id="typePassword">Password</auro-header>
<p>Use the <code>type="password"</code> attribute for a password style input. The hide/show password feature will automatically appear once a user begins to enter data.</p>
<p>Default help text will be added to the input <code>type="password"</code> if custom help text is not provided.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/password.html) -->
<!-- The below content is automatically added from ../apiExamples/password.html -->
<auro-input type="password" required>
<span slot="ariaLabel.clear">Clear All</span>
<span slot="ariaLabel.password.show">Show</span>
<span slot="ariaLabel.password.hide">Hide</span>
<span slot="label">Password</span>
<span slot="helpText">Please enter a secure password.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/password.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/password.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="password" required&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
  &lt;span slot="ariaLabel.password.show"&gt;Show&lt;/span&gt;
  &lt;span slot="ariaLabel.password.hide"&gt;Hide&lt;/span&gt;
  &lt;span slot="label"&gt;Password&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter a secure password.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typeEmail">Email</auro-header>
<p>Use the <code>type="email"</code> attribute for an email style input. These examples illustrate the default error messaging per that browser. Content may vary.</p>
<p>Default help text will be added to the input <code>type="email"</code> if custom help text is not provided.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/email.html) -->
<!-- The below content is automatically added from ../apiExamples/email.html -->
<auro-input type="email" required>
<span slot="label">Email address</span>
<span slot="helpText">Please enter your email address.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/email.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/email.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="email" required&gt;
  &lt;span slot="label"&gt;Email address&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your email address.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typeNumber">Number</auro-header>
<p>Use the <code>type="number"</code> attribute for a numeric style input and invoke a numeric virtual keyboard on handheld devices.</p>
<p>This <code>number</code> input type should only be used for incremental numeric values, meaning values with decimals will be considered invalid. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">MDN Web Docs</a> for more information.</p>
<p class="note"><strong>Note:</strong> We recommend using <code>type="number"</code> with <code>inputmode="numeric"</code> for the best mobile experience.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/number.html) -->
<!-- The below content is automatically added from ../apiExamples/number.html -->
<auro-input type="number" required>
<span slot="label">Number of Passengers</span>
<span slot="helpText">Please enter the number of passengers.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/number.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="number" required&gt;
  &lt;span slot="label"&gt;Number of Passengers&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter the number of passengers.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typeCreditCard">Credit Card</auro-header>
<p>Use the <code>type="credit-card"</code> attribute for a credit card formatted input.</p>
<p>Default help text will be added to the input <code>type="credit-card"</code> if custom help text is not provided.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card.html) -->
<!-- The below content is automatically added from ../apiExamples/credit-card.html -->
<auro-input type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Valid credit card numbers must include 16 digits (15 for Amex).&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<p>Use the <code>type="credit-card"</code> and <code>icon</code> attributes for a credit card formatted input with credit card icon support.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below content is automatically added from ../apiExamples/credit-card-icon.html -->
<auro-input icon type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input icon type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Valid credit card numbers must include 16 digits (15 for Amex).&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typePhone">Phone Number</auro-header>
<p>Use the <code>type="tel"</code> attribute for a phone number formatted input. The default format is <code>+1 (000) 000-0000</code>.</p>
<p class="note"><strong>Note:</strong> We recommend using <code>type="tel"</code> with <code>inputmode="tel"</code> for the best mobile experience.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel.html) -->
<!-- The below content is automatically added from ../apiExamples/tel.html -->
<auro-input type="tel">
<span slot="label">Telephone</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/tel.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="tel"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<p>Use the <code>format</code> attribute to set a custom phone number format.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel-format.html) -->
<!-- The below content is automatically added from ../apiExamples/tel-format.html -->
<auro-input type="tel" format="+00 000 00 0000">
<span slot="label">Telephone</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel-format.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/tel-format.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="tel" format="+00 000 00 0000"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typeDate">Date</auro-header>
<p>Use the <code>type="date"</code> attribute for a date formatted input. The default date format is <code>mm/dd/yyyy</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-day-year.html) -->
<!-- The below content is automatically added from ../apiExamples/month-day-year.html -->
<auro-input type="date">
<span slot="label">Arrival date</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-day-year.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/month-day-year.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date"&gt;
  &lt;span slot="label"&gt;Arrival date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<p>Use the <code>format</code> attribute to put together any combination of <code>mm</code>, <code>dd</code>, & <code>yyyy</code> or <code>yy</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/year-month-day.html) -->
<!-- The below content is automatically added from ../apiExamples/year-month-day.html -->
<auro-input type="date" format="yyyy/mm/dd">
<span slot="label">Arrival date</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/year-month-day.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/year-month-day.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" format="yyyy/mm/dd"&gt;
  &lt;span slot="label"&gt;Arrival date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-year.html) -->
<!-- The below content is automatically added from ../apiExamples/month-year.html -->
<auro-input type="date" format="mm/yy">
<span slot="label">Expiration date</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-year.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/month-year.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" format="mm/yy"&gt;
  &lt;span slot="label"&gt;Expiration date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/day.html) -->
<!-- The below content is automatically added from ../apiExamples/day.html -->
<auro-input type="date" format="dd">
<span slot="label">Day</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/day.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/day.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" format="dd"&gt;
  &lt;span slot="label"&gt;Day&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="validateOnInput">Validate on Input</auro-header>
<p>Use the <code>validateOnInput</code> attribute to enable live validation on the <code>input</code> event. Recommended use is with setting a custom <code>pattern</code> and validation is required prior to a <code>blur</code> event.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/validate-on-input.html) -->
<!-- The below content is automatically added from ../apiExamples/validate-on-input.html -->
<auro-input validateOnInput required pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidityPatternMismatch="Full name requires two or more names with at least one space.">
<span slot="label">Full Name</span>
<span slot="helpText">Please enter your full name as it appears on the card.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/validate-on-input.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/validate-on-input.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input validateOnInput required pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidityPatternMismatch="Full name requires two or more names with at least one space."&gt;
  &lt;span slot="label"&gt;Full Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name as it appears on the card.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="value">Value</auro-header>
<auro-header level="4" id="valueProgrammatic">Programmatic</auro-header>
<p>Use the <code>value</code> attribute to programmatically set the value of the input.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/programmatic-value.html) -->
<!-- The below content is automatically added from ../apiExamples/programmatic-value.html -->
<auro-input value="Alaska Airlines is the best!">
<span slot="label">Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/programmatic-value.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/programmatic-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input value="Alaska Airlines is the best!"&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="resetState">Reset State</auro-header>
<p>Use the <code>reset()</code> method to reset the <code>&lt;auro-input&gt;</code>'s <code>value</code> and <code>validity</code> state. Doing so will preserve all other attributes and properties.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/reset-state.html) -->
<!-- The below content is automatically added from ../apiExamples/reset-state.html -->
<auro-button id="resetStateBtn">Reset</auro-button>
<br /><br />
<auro-input id="resetStateExample" minlength="12" value="Auro Team" setCustomValidityTooShort="Please enter your full name!">
<span slot="label">Full Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/reset-state.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/reset-state.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="resetStateBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;auro-input id="resetStateExample" minlength="12" value="Auro Team" setCustomValidityTooShort="Please enter your full name!"&gt;
  &lt;span slot="label"&gt;Full Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/reset-state.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/reset-state.js -->
<pre class="language-js"><code class="language-js">export function resetStateExample() {
  const elem = document.querySelector('#resetStateExample');
​
  document.querySelector('#resetStateBtn').addEventListener('click', () =&gt; {
    elem.reset();
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="swapValues">Swapping Values Between Inputs</auro-header>
<p>Example illustrates using a JavaScript function attached to an <code>auro-button</code> component <code>click</code> event to swap the values of two <code>auro-input</code> elements. An example of this use case would be swapping the departure and arrival airports in a flight search form.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/swap-value.html) -->
<!-- The below content is automatically added from ../apiExamples/swap-value.html -->
<auro-input id="swapExampleLeft">
<span slot="label">Left Input</span>
<span slot="helpText">Help Text</span>
</auro-input>
<auro-button id="swapExampleBtn">Swap Values</auro-button>
<auro-input id="swapExampleRight">
<span slot="label">Right Input</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/swap-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input id="swapExampleLeft"&gt;
  &lt;span slot="label"&gt;Left Input&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-button id="swapExampleBtn"&gt;Swap Values&lt;/auro-button&gt;
&lt;auro-input id="swapExampleRight"&gt;
  &lt;span slot="label"&gt;Right Input&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/swap-value.js -->
<pre class="language-js"><code class="language-js">export function swapInputValues() {
  const btn = document.querySelector('#swapExampleBtn');
  const inputOne = document.querySelector('#swapExampleLeft');
  const inputTwo = document.querySelector('#swapExampleRight');
​
  btn.addEventListener('click', () =&gt; {
    const valueOne = inputOne.value;
    const valueTwo = inputTwo.value;
​
    inputOne.value = valueTwo;
    inputTwo.value = valueOne;
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
