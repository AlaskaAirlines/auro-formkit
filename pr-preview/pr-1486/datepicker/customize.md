<auro-header level="1" id="overview">Datepicker - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
<auro-anchorlink fluid href="#placement" class="level2 body-xs">Bib Placement</auro-anchorlink>
<auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
<auro-anchorlink fluid href="#minMaxDate" class="level2 body-xs">Min/Max Date</auro-anchorlink>
<auro-anchorlink fluid href="#localization" class="level2 body-xs">Localization</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="layout">Shape, Size & Layout</auro-header>
<p>The <code>shape</code>, <code>size</code> and <code>layout</code> attributes work in collaboration to control the overall architecture of the component.</p>
<p>See the <a href="./design.html">Design page</a> for a detailed breakdown.</p>
<auro-header level="3" id="background">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-datepicker>
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-datepicker appearance="inverse">
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker appearance="inverse"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="placement">Bib Placement</auro-header>
<p>The bib position can be customized with <code>placement</code>, <code>offset</code>, <code>flip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
<div style="width: 400px">
<auro-datepicker offset="20" placement="bottom-start" noFlip>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
<span slot="fromLabel">bottom-start with 20px offset and noFlip</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<br/>
<auro-datepicker offset="20" placement="bottom-start">
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
<span slot="fromLabel">bottom-start with 20px offset and flip</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<br/>
<auro-datepicker offset="20" placement="right" autoPlacement noFlip>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
<span slot="fromLabel">right with 20px offset, noFlip and autoPlacement</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
</div>
<div style="width: 600px; padding-top: 1em;">
<p>Range bottom-start with 20px offset, noFlip and shift enabled</p>
<auro-datepicker range offset="20" placement="bottom-start" shift noFlip minDate="07/08/2025">
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->

<pre class="language-html"><code class="language-html">&lt;div style="width: 400px"&gt;
  &lt;auro-datepicker offset="20" placement="bottom-start" noFlip&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;bottom-start with 20px offset and noFlip&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;/auro-datepicker&gt;
  &lt;br/&gt;
  &lt;auro-datepicker offset="20" placement="bottom-start"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;bottom-start with 20px offset and flip&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;/auro-datepicker&gt;
  &lt;br/&gt;
  &lt;auro-datepicker offset="20" placement="right" autoPlacement noFlip&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;right with 20px offset, noFlip and autoPlacement&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;/auro-datepicker&gt;
&lt;/div&gt;
&lt;div style="width: 600px; padding-top: 1em;"&gt;
  &lt;p&gt;Range bottom-start with 20px offset, noFlip and shift enabled&lt;/p&gt;
  &lt;auro-datepicker range offset="20" placement="bottom-start" shift noFlip minDate="07/08/2025"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Range Headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
    &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
    &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
  &lt;/auro-datepicker&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="breakpoint">Fullscreen Breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-datepicker fullscreenBreakpoint="lg">
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker fullscreenBreakpoint="lg"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by changing the values of the following token(s) for the datepicker, dropdown, and input</p>
<auro-header level="4" id="cssTokensDatepicker">Datepicker</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../datepicker/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../datepicker/src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">/* stylelint-disable color-function-notation */
​
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
​
:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  // datepicker
  --ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-datepicker-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-datepicker-outline-color: transparent;
​
  // calendar
  --ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-calendar-nav-btn-border-color: transparent;
  --ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #{v.$ds-basic-color-brand-primary});
  --ds-auro-calendar-nav-btn-container-color: transparent;
  --ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-border-color: transparent;
  --ds-auro-calendar-cell-container-color: transparent;
  --ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #{v.$ds-advanced-color-shared-background-muted});
  --ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
​
:host([ondark]),
:host([appearance="inverse"]) {
  // datepicker
  --ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-datepicker-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-datepicker-outline-color: transparent;
​
  // calendar
  --ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-calendar-nav-btn-border-color: transparent;
  --ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #{v.$ds-basic-color-brand-primary});
  --ds-auro-calendar-nav-btn-container-color: transparent;
  --ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-border-color: transparent;
  --ds-auro-calendar-cell-container-color: transparent;
  --ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #{v.$ds-advanced-color-shared-background-muted});
  --ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensDropdown">Dropdown</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../dropdown/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../dropdown/src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
​
:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
​
:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensInput">Input</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../input/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../input/src/styles/tokens.scss -->

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
<auro-header level="4" id="cssTokensExample">Example</auro-header>
<p>The following example demonstrates overriding all available datepicker, dropdown, input, and calendar tokens.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-tokens.html -->
<style>
  auro-datepicker.token-demo {
    /* Datepicker tokens */
    --ds-auro-datepicker-range-input-divider-color: mediumpurple;
    --ds-auro-datepicker-label-text-color: darkslateblue;
    --ds-auro-datepicker-outline-color: transparent;
    /* Dropdown tokens */
    --ds-auro-dropdown-trigger-border-color: mediumpurple;
    --ds-auro-dropdown-trigger-background-color: lavender;
    --ds-auro-dropdown-trigger-hover-background-color: lavender;
    --ds-auro-dropdown-trigger-container-color: lavender;
    --ds-auro-dropdown-trigger-text-color: darkslateblue;
    --ds-auro-dropdown-trigger-outline-color: transparent;
    --ds-auro-dropdownbib-boxshadow-color: rgba(100, 100, 200, 0.3);
    --ds-auro-dropdownbib-background-color: ghostwhite;
    --ds-auro-dropdownbib-container-color: ghostwhite;
    --ds-auro-dropdownbib-text-color: darkslateblue;
    /* Input tokens */
    --ds-auro-input-border-color: mediumpurple;
    --ds-auro-input-container-color: lavender;
    --ds-auro-input-caret-color: mediumpurple;
    --ds-auro-input-label-text-color: darkslateblue;
    --ds-auro-input-placeholder-text-color: slategray;
    --ds-auro-input-text-color: darkslateblue;
    /* Calendar tokens */
    --ds-auro-calendar-nav-btn-chevron-color: mediumpurple;
    --ds-auro-calendar-month-header-color: darkslateblue;
    --ds-auro-calendar-month-container-color: ghostwhite;
    --ds-auro-calendar-month-divider-color: mediumpurple;
    --ds-auro-calendar-cell-text-color: darkslateblue;
    --ds-auro-calendar-cell-in-range-color: lavender;
    --ds-auro-calendar-cell-border-color: transparent;
    --ds-auro-calendar-cell-container-color: transparent;
  }
</style>
<auro-datepicker class="token-demo" range>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.headline">Select Dates</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-tokens.html -->

<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-datepicker.token-demo {
    /* Datepicker tokens */
    --ds-auro-datepicker-range-input-divider-color: mediumpurple;
    --ds-auro-datepicker-label-text-color: darkslateblue;
    --ds-auro-datepicker-outline-color: transparent;
    /* Dropdown tokens */
    --ds-auro-dropdown-trigger-border-color: mediumpurple;
    --ds-auro-dropdown-trigger-background-color: lavender;
    --ds-auro-dropdown-trigger-hover-background-color: lavender;
    --ds-auro-dropdown-trigger-container-color: lavender;
    --ds-auro-dropdown-trigger-text-color: darkslateblue;
    --ds-auro-dropdown-trigger-outline-color: transparent;
    --ds-auro-dropdownbib-boxshadow-color: rgba(100, 100, 200, 0.3);
    --ds-auro-dropdownbib-background-color: ghostwhite;
    --ds-auro-dropdownbib-container-color: ghostwhite;
    --ds-auro-dropdownbib-text-color: darkslateblue;
    /* Input tokens */
    --ds-auro-input-border-color: mediumpurple;
    --ds-auro-input-container-color: lavender;
    --ds-auro-input-caret-color: mediumpurple;
    --ds-auro-input-label-text-color: darkslateblue;
    --ds-auro-input-placeholder-text-color: slategray;
    --ds-auro-input-text-color: darkslateblue;
    /* Calendar tokens */
    --ds-auro-calendar-nav-btn-chevron-color: mediumpurple;
    --ds-auro-calendar-month-header-color: darkslateblue;
    --ds-auro-calendar-month-container-color: ghostwhite;
    --ds-auro-calendar-month-divider-color: mediumpurple;
    --ds-auro-calendar-cell-text-color: darkslateblue;
    --ds-auro-calendar-cell-in-range-color: lavender;
    --ds-auro-calendar-cell-border-color: transparent;
    --ds-auro-calendar-cell-container-color: transparent;
  }
&lt;/style&gt;
&lt;auro-datepicker class="token-demo" range&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select Dates&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<auro-header level="3" id="cssParts">CSS Shadow Parts</auro-header>
<p>CSS Shadow Parts allow you to style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-datepicker&gt;</code>.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>dropdown</code></td><td>The outer dropdown container.</td></tr>
<tr><td><code>trigger</code></td><td>The trigger content container.</td></tr>
<tr><td><code>input</code></td><td>The date input element(s).</td></tr>
<tr><td><code>calendarWrapper</code></td><td>The calendar bib sizing container.</td></tr>
<tr><td><code>calendar</code></td><td>The calendar element.</td></tr>
<tr><td><code>helpTextSpan</code></td><td>The help text container wrapper.</td></tr>
<tr><td><code>helpText</code></td><td>The help text element.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ../apiExamples/css-parts.html -->
<style>
  auro-datepicker.css-parts-demo::part(trigger) {
    border-color: orange;
  }
  auro-datepicker.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-datepicker.css-parts-demo::part(calendarWrapper) {
    max-height: 400px;
  }
</style>
<auro-datepicker class="css-parts-demo">
<span slot="fromLabel">CSS Parts Example</span>
<span slot="helpText">This datepicker has custom styles applied via CSS Shadow Parts.</span>
<span slot="bib.fullscreen.headline">Select Date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->

<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-datepicker.css-parts-demo::part(trigger) {
    border-color: orange;
  }
  auro-datepicker.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-datepicker.css-parts-demo::part(calendarWrapper) {
    max-height: 400px;
  }
&lt;/style&gt;
&lt;auro-datepicker class="css-parts-demo"&gt;
  &lt;span slot="fromLabel"&gt;CSS Parts Example&lt;/span&gt;
  &lt;span slot="helpText"&gt;This datepicker has custom styles applied via CSS Shadow Parts.&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select Date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="inputMode">Input Mode</auro-header>
<p>The <code>inputmode</code> attribute controls which virtual keyboard layout is presented on mobile devices.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
<auro-datepicker inputmode="numeric">
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker inputmode="numeric"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableComponent">Disable Component</auro-header>
<p>Use the <code>disabled</code> attribute to render the datepicker in a non-interactive state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-datepicker disabled>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker disabled&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require Selection</auro-header>
<p>Use the <code>required</code> attribute to require a date selection before form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-datepicker required>
<span slot="bib.fullscreen.headline">Required Example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<br />
<auro-datepicker required range>
<span slot="bib.fullscreen.headline">Required Example</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Required Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;
&lt;br /&gt;
&lt;auro-datepicker required range&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Required Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force Error State</auro-header>
<p>Use the <code>error</code> attribute to force the component into an error state with a custom message.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-button id="undefinedValueExampleBtnAddError">Set Error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError">Remove Error</auro-button>
<br />
<auro-datepicker error="Custom error message" id="errorExample">
<span slot="bib.fullscreen.headline">Error Example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

<pre class="language-html"><code class="language-html">&lt;auro-button id="undefinedValueExampleBtnAddError"&gt;Set Error&lt;/auro-button&gt;
&lt;auro-button id="undefinedValueExampleBtnRemoveError"&gt;Remove Error&lt;/auro-button&gt;
&lt;br /&gt;
&lt;auro-datepicker error="Custom error message" id="errorExample"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Error Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="customValidation">Custom Validation</auro-header>
<p>Use the <code>validity</code> attribute with a custom error message to provide specific feedback.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/validity.html) -->
<!-- The below content is automatically added from ./../apiExamples/validity.html -->
<auro-datepicker required setCustomValidityValueMissing="Please select a departure date.">
<span slot="bib.fullscreen.headline">validity Example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/validity.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/validity.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker required setCustomValidityValueMissing="Please select a departure date."&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;validity Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No Validation</auro-header>
<p>Use the <code>noValidate</code> attribute to disable all validation on the component.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-datepicker required noValidate>
<span slot="bib.fullscreen.headline">noValidate Example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker required noValidate&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;noValidate Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="minMaxDate">Min/Max Date</auro-header>
<p>Use the <code>minDate</code> and <code>maxDate</code> attributes to constrain the selectable date range.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/min-date.html) -->
<!-- The below content is automatically added from ./../apiExamples/min-date.html -->
<auro-datepicker minDate="03/25/2028" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date.">
<span slot="bib.fullscreen.headline">minDate Example</span>
<span slot="fromLabel">Choose a date - minDate</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/min-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/min-date.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker minDate="03/25/2028" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;minDate Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date - minDate&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-date.html) -->
<!-- The below content is automatically added from ./../apiExamples/max-date.html -->
<auro-datepicker maxDate="03/25/2023" setCustomValidityRangeOverflow="Selected date is later than maximum date.">
<span slot="bib.fullscreen.headline">maxDate Example</span>
<span slot="fromLabel">Choose a date - maxDate</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/max-date.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker maxDate="03/25/2023" setCustomValidityRangeOverflow="Selected date is later than maximum date."&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;maxDate Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date - maxDate&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="localization">Localization</auro-header>
<p>Use the <code>centralDate</code>, locale, and related attributes to configure the datepicker for different regions and languages.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization.html -->
<auro-datepicker format="yyyy/mm/dd" id="localizationExample">
<span slot="bib.fullscreen.headline">Localization Headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/localization.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/localization.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker format="yyyy/mm/dd" id="localizationExample"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Localization Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
