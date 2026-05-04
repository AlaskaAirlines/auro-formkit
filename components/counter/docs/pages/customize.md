<auro-header level="1" id="overview">Counter - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
      <auro-anchorlink fluid href="#dropdownPosition" class="level2 body-xs">Bib Position</auro-anchorlink>
      <auro-anchorlink fluid href="#dropdownFullscreen" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
      <auro-anchorlink fluid href="#disabledIndividual" class="level2 body-xs">Disabled Individual</auro-anchorlink>
      <auro-anchorlink fluid href="#minmax" class="level2 body-xs">Min/Max</auro-anchorlink>
      <auro-anchorlink fluid href="#groupMinMax" class="level2 body-xs">Group Min/Max</auro-anchorlink>
      <auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
      <auro-anchorlink fluid href="#dropdownErrors" class="level2 body-xs">Dropdown Errors</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="background">Light vs. Dark Background</auro-header>
        <p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper--ondark" aria-hidden>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>The component may be restyled by overriding the following CSS custom properties (design tokens).</p>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="cssParts">CSS Shadow Parts</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/css-parts.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/css-parts.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="dropdownPosition">Bib Position</auro-header>
        <p>Customize bib position with <code>placement</code>, <code>offset</code>, <code>noFlip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floaterConfig.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floaterConfig.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="dropdownFullscreen">Fullscreen Breakpoint</auro-header>
        <p>Customize the breakpoint at which the dropdown switches to fullscreen mode with <code>fullscreenBreakpoint</code>. The <code>bib.fullscreen.headline</code> slot is required. Use <code>bib.fullscreen.footer</code> to add footer content.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-mobile-properties.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-mobile-properties.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="customBehavior">Behavior</auro-header>
        <auro-header level="3" id="disabled">Disabled</auro-header>
        <p>Use the <code>disabled</code> attribute on the <code>&lt;auro-counter-group&gt;</code> to disable the entire group.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-group.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-group.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disabledIndividual">Disabled Individual</auro-header>
        <p>Use the <code>disabled</code> attribute on individual <code>&lt;auro-counter&gt;</code> elements to disable specific counters while leaving the rest interactive.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="minmax">Min/Max</auro-header>
        <p>Use the <code>min</code>, <code>max</code>, and <code>value</code> attributes to constrain the counter's range and set an initial value.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-minmax.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-minmax.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="groupMinMax">Group Min/Max</auro-header>
        <p>The group <code>max</code> and <code>min</code> attributes set bounds for the total across all counters. Individual counter <code>max</code> values can also be set within a group.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/group-counter-max.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/group-counter-max.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="error">Error</auro-header>
        <p>Use the <code>error</code> attribute to apply a persistent custom error message on the counter or counter group.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="dropdownErrors">Dropdown Errors</auro-header>
        <p>Individual counters within a dropdown can display their own error messages. The group <code>error</code> attribute overrides individual errors.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-error-group.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-error-group.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
