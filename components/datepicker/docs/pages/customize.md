<auro-header level="1" id="overview">Datepicker - Customize</auro-header>
<div class="contentWrapper">
<nav>
  <auro-nav anchorNavContent=".scrollWrapper">
    <span slot="mobileToggleCollapsed">View More</span>
    <span slot="mobileToggleExpanded">View Less</span>
    <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
    <auro-anchorlink fluid href="#placement" class="level2 body-xs">Bib Placement</auro-anchorlink>
    <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
    <auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
    <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
    <auro-anchorlink fluid href="#localization" class="level2 body-xs">Localization</auro-anchorlink>
    <auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
    <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
    <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
    <auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
    <auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
    <auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
    <auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
    <auro-anchorlink fluid href="#minMaxDate" class="level2 body-xs">Min/Max Date</auro-anchorlink>
    <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
    <auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
  </auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="placement">Bib Placement</auro-header>
<p>The bib position can be customized with <code>placement</code>, <code>offset</code>, <code>flip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="breakpoint">Fullscreen Breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="background">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="localization">Localization</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/localization.md) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="layout">Shape, Size & Layout</auro-header>
<p>The <code>shape</code>, <code>size</code> and <code>layout</code> attributes work in collaboration to control the overall architecture of the component.</p>
<p>See the <a href="./design.html">Design page</a> for a detailed breakdown.</p>
</section>
<section>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by changing the values of the following token(s) for the datepicker, dropdown, and input</p>
<auro-header level="4" id="cssTokensDatepicker">Datepicker</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../datepicker/src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensDropdown">Dropdown</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../dropdown/src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensExample">Example</auro-header>
<p>The following example demonstrates overriding all available datepicker, dropdown, input, and calendar tokens.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="cssTokensInput">Input</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../input/src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="customValidation">Custom Validation</auro-header>
<p>Use the <code>validity</code> attribute with a custom error message to provide specific feedback.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/validity.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/validity.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableComponent">Disable Component</auro-header>
<p>Use the <code>disabled</code> attribute to render the datepicker in a non-interactive state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force Error State</auro-header>
<p>Use the <code>error</code> attribute to force the component into an error state with a custom message.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="inputMode">Input Mode</auro-header>
<p>The <code>inputmode</code> attribute controls which virtual keyboard layout is presented on mobile devices.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="minMaxDate">Min/Max Date</auro-header>
<p>Use the <code>minDate</code> and <code>maxDate</code> attributes to constrain the selectable date range.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/min-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/min-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No Validation</auro-header>
<p>Use the <code>noValidate</code> attribute to disable all validation on the component.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require Selection</auro-header>
<p>Use the <code>required</code> attribute to require a date selection before form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
