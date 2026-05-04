<auro-header level="1" id="overview">Checkbox - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
<auro-anchorlink fluid href="#horizontal" class="level2 body-xs">Horizontal Layout</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
<auro-anchorlink fluid href="#disabledGroup" class="level2 body-xs">Disabled Group</auro-anchorlink>
<auro-anchorlink fluid href="#required" class="level2 body-xs">Required</auro-anchorlink>
<auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="background">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
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
<div class="exampleWrapper--ondark" aria-hidden>
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
<auro-header level="3" id="horizontal">Horizontal Layout</auro-header>
<p>Using the <code>horizontal</code> attribute will render the checkbox options on a horizontal line.</p>
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
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by overriding the following CSS custom properties (design tokens).</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
​
:host {
  --ds-auro-checkbox-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-checkbox-checkmark-color: var(--ds-advanced-color-boolean-indicator, #{v.$ds-advanced-color-boolean-indicator});
  --ds-auro-checkbox-container-color: var(--ds-advanced-color-boolean-isfalse, #{v.$ds-advanced-color-boolean-isfalse});
  --ds-auro-checkbox-label-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-checkbox-outline-color: transparent;
  --ds-auro-checkbox-group-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-tokens.html -->
<style>
#customTokensExample {
--ds-auro-checkbox-border-color: purple;
--ds-auro-checkbox-checkmark-color: white;
--ds-auro-checkbox-container-color: lavender;
--ds-auro-checkbox-label-color: purple;
--ds-auro-checkbox-outline-color: mediumpurple;
--ds-auro-checkbox-group-text-color: purple;
}
</style>
<auro-checkbox-group id="customTokensExample">
<span slot="legend">Custom themed checkbox group</span>
<auro-checkbox value="value1" name="tokens" id="checkbox-tokens1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="tokens" id="checkbox-tokens2" checked>Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="tokens" id="checkbox-tokens3">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-tokens.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #customTokensExample {
    --ds-auro-checkbox-border-color: purple;
    --ds-auro-checkbox-checkmark-color: white;
    --ds-auro-checkbox-container-color: lavender;
    --ds-auro-checkbox-label-color: purple;
    --ds-auro-checkbox-outline-color: mediumpurple;
    --ds-auro-checkbox-group-text-color: purple;
  }
&lt;/style&gt;
&lt;auro-checkbox-group id="customTokensExample"&gt;
  &lt;span slot="legend"&gt;Custom themed checkbox group&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="tokens" id="checkbox-tokens1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="tokens" id="checkbox-tokens2" checked&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="tokens" id="checkbox-tokens3"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssParts">CSS Shadow Parts</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<p>CSS Shadow Parts allow you to style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-checkbox&gt;</code>.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>checkbox</code></td><td>The checkbox container element.</td></tr>
<tr><td><code>checkbox-input</code></td><td>The checkbox input element.</td></tr>
<tr><td><code>checkbox-label</code></td><td>The checkbox label element.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ./../apiExamples/css-parts.html -->
<style>
#cssPartsExample::part(checkbox) {
border: 2px solid mediumpurple;
border-radius: 6px;
}

#cssPartsExample::part(checkbox-label) {
font-style: italic;
color: purple;
}
</style>
<auro-checkbox-group>
<span slot="legend">CSS Shadow Parts example</span>
<auro-checkbox id="cssPartsExample" value="styled" name="parts" checked>Styled checkbox</auro-checkbox>
<auro-checkbox value="default" name="parts" id="checkbox-parts2">Default checkbox</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #cssPartsExample::part(checkbox) {
    border: 2px solid mediumpurple;
    border-radius: 6px;
  }
​
  #cssPartsExample::part(checkbox-label) {
    font-style: italic;
    color: purple;
  }
&lt;/style&gt;
&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;CSS Shadow Parts example&lt;/span&gt;
  &lt;auro-checkbox id="cssPartsExample" value="styled" name="parts" checked&gt;Styled checkbox&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="default" name="parts" id="checkbox-parts2"&gt;Default checkbox&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="disabled">Disabled Checkbox</auro-header>
<p>Use the <code>disabled</code> attribute to disable individual <code>&lt;auro-checkbox&gt;</code> elements.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-checkbox-group>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="disabled-value1" name="disabled-value1" id="checkbox-disabled1">Checkbox option</auro-checkbox>
<auro-checkbox value="disabled-value2" name="disabled-value2" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
<auro-checkbox value="disabled-value3" name="disabled-value3" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
<auro-checkbox value="disabled-value4" name="disabled-value4" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="disabled-value1" name="disabled-value1" id="checkbox-disabled1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="disabled-value2" name="disabled-value2" id="checkbox-disabled2" checked disabled&gt;Disabled checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="disabled-value3" name="disabled-value3" id="checkbox-disabled3" disabled&gt;Disabled checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="disabled-value4" name="disabled-value4" id="checkbox-disabled4" checked&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disabledGroup">Disabled Group</auro-header>
<p>Use the <code>disabled</code> attribute on the <code>&lt;auro-checkbox-group&gt;</code> to disable all checkboxes in the group.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-group.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-group.html -->
<auro-checkbox-group disabled>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
<auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
<auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
<auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-group.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group disabled&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1"&gt;Disabled checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked&gt;Disabled checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3"&gt;Disabled checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4"&gt;Disabled checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="required">Required</auro-header>
<p>When present, the <code>required</code> attribute specifies that at least one <code>&lt;auro-checkbox&gt;</code> within the group must be checked.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="required" id="checkbox-required1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="required" id="checkbox-required2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="required" id="checkbox-required3">Checkbox option</auro-checkbox>
<auro-checkbox value="value4" name="required" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group required setCustomValidityValueMissing="Please select an option"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="required" id="checkbox-required1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="required" id="checkbox-required2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="required" id="checkbox-required3"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="required" id="checkbox-required4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="error">Error</auro-header>
<p>Use the <code>error</code> attribute to force an error state on the <code>&lt;auro-checkbox-group&gt;</code>. Pass a string with the error message.</p>
<p><strong>Note:</strong> The <code>error</code> attribute is only supported on the <code>&lt;auro-checkbox-group&gt;</code> element, not on individual checkboxes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error-group.html) -->
<!-- The below content is automatically added from ./../apiExamples/error-group.html -->
<auro-checkbox-group error="custom error">
<span slot="legend">Form label goes here</span>
<auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
<auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
<auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
<auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error-group.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group error="custom error"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1"&gt;Error checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2"&gt;Error checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3"&gt;Error checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked&gt;Error checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No Validation</auro-header>
<p>Use the <code>noValidate</code> attribute to disable auto-validation on blur. Validation can still be triggered programmatically via the <code>validate()</code> method.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-checkbox-group required noValidate setCustomValidityValueMissing="Please select an option" id="noValidateExample">
<span slot="legend">No auto-validation on blur</span>
<auro-checkbox value="value1" name="noValidate" id="checkbox-noValidate1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="noValidate" id="checkbox-noValidate2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="noValidate" id="checkbox-noValidate3">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group required noValidate setCustomValidityValueMissing="Please select an option" id="noValidateExample"&gt;
  &lt;span slot="legend"&gt;No auto-validation on blur&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="noValidate" id="checkbox-noValidate1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="noValidate" id="checkbox-noValidate2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="noValidate" id="checkbox-noValidate3"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
