<auro-header level="1" id="overview">Radio: Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
<auro-anchorlink fluid href="#horizontal" class="level2 body-xs">Horizontal layout</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled group</auro-anchorlink>
<auro-anchorlink fluid href="#disabledIndividual" class="level2 body-xs">Disabled individual</auro-anchorlink>
<auro-anchorlink fluid href="#required" class="level2 body-xs">Required</auro-anchorlink>
<auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="background">Light vs. dark background</auro-header>
<p>Set <code>appearance="inverse"</code> when the radio buttons sit on a dark background. The default value, <code>default</code>, is for light backgrounds.</p>
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
<div class="exampleWrapper--ondark" aria-hidden>
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
<auro-header level="3" id="horizontal">Horizontal layout</auro-header>
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
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>Restyle the component by overriding the following CSS custom properties (design tokens).</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host {
  // auro-radio-group colors
  --ds-auro-radio-group-label-color: inherit;
&#10;  // auro-radio colors
  --ds-auro-radio-btn-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-radio-btn-fill-color: transparent;
  --ds-auro-radio-btn-inset-color: transparent;
  --ds-auro-radio-label-color: inherit;
  --ds-auro-radio-tap-color: transparent;
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-tokens.html -->
<style>
          #customTokenRadioGroup {
            --ds-auro-radio-btn-border-color: purple;
            --ds-auro-radio-btn-fill-color: lavender;
            --ds-auro-radio-btn-inset-color: purple;
            --ds-auro-radio-label-color: purple;
            --ds-auro-radio-group-label-color: purple;
          }
</style>
<auro-radio-group id="customTokenRadioGroup">
<span slot="legend">Custom themed radio group</span>
<auro-radio id="customTokenRadio1" label="Option 1" name="customTokenDemo" value="option1"></auro-radio>
<auro-radio id="customTokenRadio2" label="Option 2" name="customTokenDemo" value="option2" checked></auro-radio>
<auro-radio id="customTokenRadio3" label="Option 3" name="customTokenDemo" value="option3"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-tokens.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #customTokenRadioGroup {
    --ds-auro-radio-btn-border-color: purple;
    --ds-auro-radio-btn-fill-color: lavender;
    --ds-auro-radio-btn-inset-color: purple;
    --ds-auro-radio-label-color: purple;
    --ds-auro-radio-group-label-color: purple;
  }
&lt;/style&gt;
&lt;auro-radio-group id="customTokenRadioGroup"&gt;
  &lt;span slot="legend"&gt;Custom themed radio group&lt;/span&gt;
  &lt;auro-radio id="customTokenRadio1" label="Option 1" name="customTokenDemo" value="option1"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="customTokenRadio2" label="Option 2" name="customTokenDemo" value="option2" checked&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="customTokenRadio3" label="Option 3" name="customTokenDemo" value="option3"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. <code>&lt;auro-radio-group&gt;</code> and <code>&lt;auro-radio&gt;</code> expose the following parts.</p>
<table>
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>radio-group</code></td>
<td>The <code>&lt;fieldset&gt;</code> element in the <code>&lt;auro-radio-group&gt;</code> shadow DOM, with <code>role="radiogroup"</code>, that wraps the legend and the radio buttons.</td>
</tr>
<tr>
<td><code>helpText</code></td>
<td>The help text element below the <code>&lt;auro-radio-group&gt;</code>, which shows the help text or the error message.</td>
</tr>
<tr>
<td><code>radio</code></td>
<td>The container that wraps the radio button's input and label.</td>
</tr>
<tr>
<td><code>radio-input</code></td>
<td>The native <code>&lt;input type="radio"&gt;</code> element. It's visually hidden, so styles on this part don't change the visible circle.</td>
</tr>
<tr>
<td><code>radio-label</code></td>
<td>The <code>&lt;label&gt;</code> element that holds the label text and draws the visible circle.</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ./../apiExamples/css-parts.html -->
<style>
          #cssPartsRadioGroup::part(radio-group) {
            border: 2px dashed purple;
            border-radius: 8px;
            padding: 1rem;
          }

          #cssPartsRadioGroup auro-radio::part(radio-label) {
            font-weight: bold;
            color: purple;
          }
</style>
<auro-radio-group id="cssPartsRadioGroup">
<span slot="legend">CSS parts example</span>
<auro-radio id="cssPartsRadio1" label="Option 1" name="cssPartsDemo" value="option1"></auro-radio>
<auro-radio id="cssPartsRadio2" label="Option 2" name="cssPartsDemo" value="option2"></auro-radio>
<auro-radio id="cssPartsRadio3" label="Option 3" name="cssPartsDemo" value="option3"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #cssPartsRadioGroup::part(radio-group) {
    border: 2px dashed purple;
    border-radius: 8px;
    padding: 1rem;
  }
&#10;  #cssPartsRadioGroup auro-radio::part(radio-label) {
    font-weight: bold;
    color: purple;
  }
&lt;/style&gt;
&lt;auro-radio-group id="cssPartsRadioGroup"&gt;
  &lt;span slot="legend"&gt;CSS parts example&lt;/span&gt;
  &lt;auro-radio id="cssPartsRadio1" label="Option 1" name="cssPartsDemo" value="option1"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="cssPartsRadio2" label="Option 2" name="cssPartsDemo" value="option2"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="cssPartsRadio3" label="Option 3" name="cssPartsDemo" value="option3"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="disabled">Disabled group</auro-header>
<p>Use the <code>disabled</code> attribute on the <code>&lt;auro-radio-group&gt;</code> to disable all radio options within the group.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-radio-group disabled>
<span slot="legend">Form label goes here</span>
<auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no" checked></auro-radio>
<auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group disabled&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no" checked&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disabledIndividual">Disabled individual</auro-header>
<p>Use the <code>disabled</code> attribute on individual <code>&lt;auro-radio&gt;</code> elements to disable specific options while leaving the rest of the group interactive.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-individual.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-individual.html -->
<auro-radio-group>
<span slot="legend">Choose a meal preference</span>
<auro-radio id="disabledIndRadio1" label="Standard" name="mealPref" value="standard"></auro-radio>
<auro-radio id="disabledIndRadio2" label="Vegetarian" name="mealPref" value="vegetarian"></auro-radio>
<auro-radio id="disabledIndRadio3" label="Kosher" name="mealPref" value="kosher" disabled></auro-radio>
<auro-radio id="disabledIndRadio4" label="Halal" name="mealPref" value="halal" disabled></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-individual.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-individual.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group&gt;
  &lt;span slot="legend"&gt;Choose a meal preference&lt;/span&gt;
  &lt;auro-radio id="disabledIndRadio1" label="Standard" name="mealPref" value="standard"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="disabledIndRadio2" label="Vegetarian" name="mealPref" value="vegetarian"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="disabledIndRadio3" label="Kosher" name="mealPref" value="kosher" disabled&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="disabledIndRadio4" label="Halal" name="mealPref" value="halal" disabled&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="required">Required</auro-header>
<p>Use the <code>required</code> attribute to require a selection in the group. The group has no default error message, so use <code>setCustomValidityValueMissing</code> to show one.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-radio-group required setCustomValidityValueMissing="Select an option">
<span slot="legend">Form label goes here</span>
<auro-radio id="requiredRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="requiredRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="requiredRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group required setCustomValidityValueMissing="Select an option"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="requiredRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="requiredRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="requiredRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="error">Error</auro-header>
<p>Use the <code>error</code> attribute to apply a persistent custom error on the <code>&lt;auro-radio-group&gt;</code>. Pass a string with the error message.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-radio-group error="Check your selection.">
<span slot="legend">Form label goes here</span>
<auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
<auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
<auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group error="Check your selection."&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No validation</auro-header>
<p>Use the <code>noValidate</code> attribute to stop the group from validating automatically when focus leaves it or the selection changes. To validate the group yourself, call the <code>validate()</code> method.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-radio-group required noValidate setCustomValidityValueMissing="Please select an option">
<span slot="legend">No automatic validation</span>
<auro-radio id="noValidateRadio1" label="Yes" name="noValidateDemo" value="yes"></auro-radio>
<auro-radio id="noValidateRadio2" label="No" name="noValidateDemo" value="no"></auro-radio>
<auro-radio id="noValidateRadio3" label="Maybe" name="noValidateDemo" value="maybe"></auro-radio>
</auro-radio-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->
<pre class="language-html"><code class="language-html">&lt;auro-radio-group required noValidate setCustomValidityValueMissing="Please select an option"&gt;
  &lt;span slot="legend"&gt;No automatic validation&lt;/span&gt;
  &lt;auro-radio id="noValidateRadio1" label="Yes" name="noValidateDemo" value="yes"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="noValidateRadio2" label="No" name="noValidateDemo" value="no"&gt;&lt;/auro-radio&gt;
  &lt;auro-radio id="noValidateRadio3" label="Maybe" name="noValidateDemo" value="maybe"&gt;&lt;/auro-radio&gt;
&lt;/auro-radio-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
