<auro-header level="1" id="overview">Counter: Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
<auro-anchorlink fluid href="#dropdownPosition" class="level2 body-xs">Bib position</auro-anchorlink>
<auro-anchorlink fluid href="#dropdownFullscreen" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
<auro-anchorlink fluid href="#disabledIndividual" class="level2 body-xs">Disabled individual</auro-anchorlink>
<auro-anchorlink fluid href="#minmax" class="level2 body-xs">Min/max</auro-anchorlink>
<auro-anchorlink fluid href="#groupMinMax" class="level2 body-xs">Group min/max</auro-anchorlink>
<auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
<auro-anchorlink fluid href="#dropdownErrors" class="level2 body-xs">Dropdown errors</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="background">Light vs. dark background</auro-header>
<p>Use the <code>appearance</code> attribute to match the background: <code>default</code> (the default) for light backgrounds and <code>inverse</code> for dark ones.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic-standalone.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-counter appearance="inverse">
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter appearance="inverse"&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>Restyle the component by overriding the following CSS custom properties (design tokens).</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  /* Snowflake Dropdown Tokens */
  --ds-auro-counter-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-counter-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-counter-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-counter-outline-color: transparent;
&#10;  /* Classic Tokens */
  --ds-auro-counter-control-background-color: var(--ds-advanced-color-button-tertiary-background, #{v.$ds-advanced-color-button-tertiary-background});
  --ds-auro-counter-control-border-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-counter-description-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-icon-color: var(--ds-advanced-color-button-tertiary-text, #{v.$ds-advanced-color-button-tertiary-text});
  --ds-auro-counter-quantity-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
}
&#10;:host([ondark]),
:host([appearance="inverse"]) {
  /* Snowflake Dropdown Tokens */
  --ds-auro-counter-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-counter-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-counter-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-counter-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-counter-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-counter-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-counter-outline-color: transparent;
&#10;  /* Classic Tokens */
  --ds-auro-counter-control-background-color: var(--ds-advanced-color-button-tertiary-background-inverse, #{v.$ds-advanced-color-button-tertiary-background-inverse});
  --ds-auro-counter-control-border-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-counter-description-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-counter-icon-color: var(--ds-advanced-color-button-tertiary-text-inverse, #{v.$ds-advanced-color-button-tertiary-text-inverse});
  --ds-auro-counter-quantity-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-counter-divider-color: var(--ds-basic-color-border-divider-inverse, #{v.$ds-basic-color-border-divider-inverse});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-tokens.html -->
<style>
          #customTokensCounter auro-counter {
            --ds-auro-counter-control-background-color: #e8d5f5;
            --ds-auro-counter-control-border-color: #7b2d8e;
            --ds-auro-counter-icon-color: #7b2d8e;
            --ds-auro-counter-quantity-text-color: #7b2d8e;
            --ds-auro-counter-divider-color: #c9a4db;
          }
</style>
<auro-counter-group id="customTokensCounter">
<auro-counter>
            Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
            Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-tokens.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #customTokensCounter auro-counter {
    --ds-auro-counter-control-background-color: #e8d5f5;
    --ds-auro-counter-control-border-color: #7b2d8e;
    --ds-auro-counter-icon-color: #7b2d8e;
    --ds-auro-counter-quantity-text-color: #7b2d8e;
    --ds-auro-counter-divider-color: #c9a4db;
  }
&lt;/style&gt;
&lt;auro-counter-group id="customTokensCounter"&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<p>The following CSS shadow parts are available for styling:</p>
<p><strong>auro-counter-group</strong></p>
<table>
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>dropdown</code></td>
<td>The dropdown element, rendered when <code>isDropdown</code> is set.</td>
</tr>
<tr>
<td><code>helpText</code></td>
<td>The paragraph that shows the help text, or the combined error message while a counter is invalid. Rendered only when <code>isDropdown</code> is set.</td>
</tr>
</tbody>
</table>
<p><strong>auro-counter</strong></p>
<table>
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>counterControl</code></td>
<td>The spinbutton element that holds the minus button, the value, and the plus button.</td>
</tr>
<tr>
<td><code>controlMinus</code></td>
<td>The minus button, which lowers the value by 1.</td>
</tr>
<tr>
<td><code>controlPlus</code></td>
<td>The plus button, which raises the value by 1.</td>
</tr>
<tr>
<td><code>helpText</code></td>
<td>The paragraph that shows the help text, or the error message while the counter is invalid.</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ./../apiExamples/css-parts.html -->
<style>
          #cssPartsCounter auro-counter::part(counterControl) {
            border: 2px dashed purple;
            border-radius: 8px;
            padding: 0.5rem;
          }

          #cssPartsCounter auro-counter::part(controlMinus),
          #cssPartsCounter auro-counter::part(controlPlus) {
            background-color: #e8d5f5;
          }
</style>
<auro-counter-group id="cssPartsCounter">
<auro-counter>
            Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
            Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #cssPartsCounter auro-counter::part(counterControl) {
    border: 2px dashed purple;
    border-radius: 8px;
    padding: 0.5rem;
  }
&#10;  #cssPartsCounter auro-counter::part(controlMinus),
  #cssPartsCounter auro-counter::part(controlPlus) {
    background-color: #e8d5f5;
  }
&lt;/style&gt;
&lt;auro-counter-group id="cssPartsCounter"&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dropdownPosition">Bib position</auro-header>
<p>Customize the bib position with the <code>placement</code>, <code>offset</code>, <code>noFlip</code>, and <code>shift</code> attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floaterConfig.html) -->
<!-- The below content is automatically added from ./../apiExamples/floaterConfig.html -->
<div style="width: 350px">
<auro-counter-group isDropdown offset="20" placement="bottom-end">
<span slot="ariaLabel.bib.close">Close popup</span>
<div slot="bib.fullscreen.headline">Passengers</div>
<span slot="label">Passengers</span>
<span slot="helpText">Bottom-end placement with a 20px offset</span>
<auro-counter>
              Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
              Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<auro-counter-group isDropdown offset="20" placement="bottom-end" noFlip>
<span slot="ariaLabel.bib.close">Close popup</span>
<div slot="bib.fullscreen.headline">Passengers</div>
<span slot="label">Passengers</span>
<span slot="helpText">Bottom-end placement with a 20px <code>offset</code> and <code>noFlip</code></span>
<auro-counter>
              Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
              Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<auro-counter-group isDropdown offset="20" placement="right" noFlip>
<span slot="ariaLabel.bib.close">Close popup</span>
<div slot="bib.fullscreen.headline">Passengers</div>
<span slot="label">Passengers</span>
<span slot="helpText">Right placement with a 20px offset and noFlip</span>
<auro-counter>
              Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
              Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<auro-counter-group isDropdown offset="20" placement="bottom-start" shift noFlip>
<span slot="ariaLabel.bib.close">Close popup</span>
<div slot="bib.fullscreen.headline">Passengers</div>
<span slot="label">Passengers</span>
<span slot="helpText">Bottom-start placement with a 20px offset, noFlip, and shift</span>
<auro-counter>
              Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
              Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floaterConfig.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floaterConfig.html -->
<pre class="language-html"><code class="language-html">&lt;div style="width: 350px"&gt;
  &lt;auro-counter-group isDropdown offset="20" placement="bottom-end"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
    &lt;span slot="label"&gt;Passengers&lt;/span&gt;
    &lt;span slot="helpText"&gt;Bottom-end placement with a 20px offset&lt;/span&gt;
    &lt;auro-counter&gt;
      Adults
      &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
      &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
    &lt;/auro-counter&gt;
    &lt;auro-counter&gt;
      Children
      &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
      &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
    &lt;/auro-counter&gt;
  &lt;/auro-counter-group&gt;
  &lt;auro-counter-group isDropdown offset="20" placement="bottom-end" noFlip&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
    &lt;span slot="label"&gt;Passengers&lt;/span&gt;
    &lt;span slot="helpText"&gt;Bottom-end placement with a 20px &lt;code&gt;offset&lt;/code&gt; and &lt;code&gt;noFlip&lt;/code&gt;&lt;/span&gt;
    &lt;auro-counter&gt;
      Adults
      &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
      &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
    &lt;/auro-counter&gt;
    &lt;auro-counter&gt;
      Children
      &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
      &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
    &lt;/auro-counter&gt;
  &lt;/auro-counter-group&gt;
  &lt;auro-counter-group isDropdown offset="20" placement="right" noFlip&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
    &lt;span slot="label"&gt;Passengers&lt;/span&gt;
    &lt;span slot="helpText"&gt;Right placement with a 20px offset and noFlip&lt;/span&gt;
    &lt;auro-counter&gt;
      Adults
      &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
      &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
    &lt;/auro-counter&gt;
    &lt;auro-counter&gt;
      Children
      &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
      &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
    &lt;/auro-counter&gt;
  &lt;/auro-counter-group&gt;
  &lt;auro-counter-group isDropdown offset="20" placement="bottom-start" shift noFlip&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
    &lt;span slot="label"&gt;Passengers&lt;/span&gt;
    &lt;span slot="helpText"&gt;Bottom-start placement with a 20px offset, noFlip, and shift&lt;/span&gt;
    &lt;auro-counter&gt;
      Adults
      &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
      &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
    &lt;/auro-counter&gt;
    &lt;auro-counter&gt;
      Children
      &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
      &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
    &lt;/auro-counter&gt;
  &lt;/auro-counter-group&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dropdownFullscreen">Fullscreen breakpoint</auro-header>
<p>Customize the breakpoint at which the dropdown switches to fullscreen mode with <code>fullscreenBreakpoint</code>. The <code>bib.fullscreen.headline</code> and <code>ariaLabel.bib.close</code> slots are required. Use <code>bib.fullscreen.footer</code> to add footer content.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-mobile-properties.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown-mobile-properties.html -->
<div style="max-width: 350px;">
<auro-counter-group id="dropdownCouterExample" isDropdown fullscreenBreakpoint="lg">
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="label">Passengers</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="helpText">This is help text</div>
<auro-counter>
              Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
              Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
</auro-counter>
<auro-counter>
              Lap infants
<span slot="ariaLabel.minus">Remove lap infant</span>
<span slot="ariaLabel.plus">Add lap infant</span>
<span slot="description">Under 2 years</span>
</auro-counter>
<div slot="bib.fullscreen.footer" style="display:flex; justify-content: stretch; gap: 1.5rem">
<auro-button id="dropdownCounterExampleResetbutton" fluid variant="secondary" style="flex: 1 50%">Reset</auro-button>
<auro-button id="dropdownCounterExampleSavebutton" fluid style="flex: 1 50%">Save</auro-button>
</div>
</auro-counter-group>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-mobile-properties.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-mobile-properties.html -->
<pre class="language-html"><code class="language-html">&lt;div style="max-width: 350px;"&gt;
  &lt;auro-counter-group id="dropdownCouterExample" isDropdown fullscreenBreakpoint="lg"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
    &lt;span slot="label"&gt;Passengers&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
    &lt;div slot="helpText"&gt;This is help text&lt;/div&gt;
    &lt;auro-counter&gt;
      Adults
      &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
      &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
    &lt;/auro-counter&gt;
    &lt;auro-counter&gt;
      Children
      &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
      &lt;span slot="description"&gt;Under 17 years old. Restrictions apply if traveling without an adult.&lt;/span&gt;
    &lt;/auro-counter&gt;
    &lt;auro-counter&gt;
      Lap infants
      &lt;span slot="ariaLabel.minus"&gt;Remove lap infant&lt;/span&gt;
      &lt;span slot="ariaLabel.plus"&gt;Add lap infant&lt;/span&gt;
      &lt;span slot="description"&gt;Under 2 years&lt;/span&gt;
    &lt;/auro-counter&gt;
&#10;    &lt;div slot="bib.fullscreen.footer" style="display:flex; justify-content: stretch; gap: 1.5rem"&gt;
      &lt;auro-button id="dropdownCounterExampleResetbutton" fluid variant="secondary" style="flex: 1 50%"&gt;Reset&lt;/auro-button&gt;
      &lt;auro-button id="dropdownCounterExampleSavebutton" fluid style="flex: 1 50%"&gt;Save&lt;/auro-button&gt;
    &lt;/div&gt;
  &lt;/auro-counter-group&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="disabled">Disabled</auro-header>
<p><code>&lt;auro-counter-group&gt;</code> doesn't currently support the <code>disabled</code> attribute. To disable every counter in a group, set <code>disabled</code> on each <code>&lt;auro-counter&gt;</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-group.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-group.html -->
<auro-counter-group>
<auro-counter disabled>
            Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter disabled>
            Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-group.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter-group&gt;
  &lt;auro-counter disabled&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter disabled&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disabledIndividual">Disabled individual</auro-header>
<p>Use the <code>disabled</code> attribute on individual <code>&lt;auro-counter&gt;</code> elements to disable specific counters while leaving the rest interactive.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/counter-disabled.html -->
<auro-counter disabled value="0">
          Disabled counter
<span slot="ariaLabel.minus">Decrease disabled counter</span>
<span slot="ariaLabel.plus">Increase disabled counter</span>
<span slot="description">This counter can't be changed</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter disabled value="0"&gt;
  Disabled counter
  &lt;span slot="ariaLabel.minus"&gt;Decrease disabled counter&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Increase disabled counter&lt;/span&gt;
  &lt;span slot="description"&gt;This counter can't be changed&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="minmax">Min/max</auro-header>
<p>Use the <code>min</code>, <code>max</code>, and <code>value</code> attributes to constrain the counter's range and set an initial value.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-minmax.html) -->
<!-- The below content is automatically added from ./../apiExamples/counter-minmax.html -->
<auro-counter min="2" max="5" value="2">
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">Min: 2, max: 5</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-minmax.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-minmax.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter min="2" max="5" value="2"&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
  &lt;span slot="description"&gt;Min: 2, max: 5&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="groupMinMax">Group min/max</auro-header>
<p>The group <code>max</code> and <code>min</code> attributes set bounds for the total across all counters. Set <code>max</code> on an individual counter to limit it further within the group.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/group-counter-max.html) -->
<!-- The below content is automatically added from ./../apiExamples/group-counter-max.html -->
<auro-counter-group max="12" min="0">
<auro-counter max="5">
            This counter has a max value of 5
<span slot="ariaLabel.minus">Decrease first counter</span>
<span slot="ariaLabel.plus">Increase first counter</span>
</auro-counter>
<auro-counter max="8">
            This counter has a max value of 8
<span slot="ariaLabel.minus">Decrease second counter</span>
<span slot="ariaLabel.plus">Increase second counter</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/group-counter-max.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/group-counter-max.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter-group max="12" min="0"&gt;
  &lt;auro-counter max="5"&gt;
    This counter has a max value of 5
    &lt;span slot="ariaLabel.minus"&gt;Decrease first counter&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Increase first counter&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter max="8"&gt;
    This counter has a max value of 8
    &lt;span slot="ariaLabel.minus"&gt;Decrease second counter&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Increase second counter&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="error">Error</auro-header>
<p>Use the <code>error</code> attribute to apply a persistent custom error message on an individual counter.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-error.html) -->
<!-- The below content is automatically added from ./../apiExamples/counter-error.html -->
<auro-counter error="Select at least one adult">
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/counter-error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter error="Select at least one adult"&gt;
  Adults
  &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
  &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
&lt;/auro-counter&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dropdownErrors">Dropdown errors</auro-header>
<p>The counter group takes its error state and message from its counters. When one or more counters are invalid, the group shows their error messages together.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-error.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown-error.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close popup</span>
<div slot="bib.fullscreen.headline">Passengers</div>
<div slot="label">Passengers</div>
<auro-counter>
            Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter error="Custom error on Children counter">
            Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter-group isDropdown&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
  &lt;div slot="label"&gt;Passengers&lt;/div&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter error="Custom error on Children counter"&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-error-group.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown-error-group.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close popup</span>
<div slot="bib.fullscreen.headline">Passengers</div>
<div slot="label">Passengers</div>
<auro-counter error="Custom error on Adults counter">
            Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter error="Custom error on Children counter">
            Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">2–17 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-error-group.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-error-group.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter-group isDropdown&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;div slot="bib.fullscreen.headline"&gt;Passengers&lt;/div&gt;
  &lt;div slot="label"&gt;Passengers&lt;/div&gt;
  &lt;auro-counter error="Custom error on Adults counter"&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter error="Custom error on Children counter"&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;2–17 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
