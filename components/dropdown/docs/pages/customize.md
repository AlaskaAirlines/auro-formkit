<auro-header level="1" id="overview">Dropdown - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
      <auro-anchorlink fluid href="#bibPosition" class="level2 body-xs">Bib Position</auro-anchorlink>
      <auro-anchorlink fluid href="#fullscreenBreakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
      <auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match Width</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#chevron" class="level2 body-xs">Chevron</auro-anchorlink>
      <auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
      <auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
      <auro-anchorlink fluid href="#noToggle" class="level2 body-xs">No Toggle</auro-anchorlink>
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
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
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
        <auro-header level="3" id="bibPosition">Bib Position</auro-header>
        <p>Customize bib position with <code>placement</code>, <code>offset</code>, <code>noFlip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="fullscreenBreakpoint">Fullscreen Breakpoint</auro-header>
        <p>Customize the breakpoint at which the dropdown switches to fullscreen mode with <code>fullscreenBreakpoint</code>. The default value is <code>sm</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="matchWidth">Match Width</auro-header>
        <p>When the <code>matchWidth</code> attribute is applied, the width of the dropdown bib will match the width of the trigger element.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="customBehavior">Behavior</auro-header>
        <auro-header level="3" id="chevron">Chevron</auro-header>
        <p>Use the <code>chevron</code> attribute to add a chevron icon to the dropdown trigger indicating expand/collapse state.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/chevron.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/chevron.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disabled">Disabled</auro-header>
        <p>Use the <code>disabled</code> attribute to disable interaction with the dropdown.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <div class="exampleWrapper--ondark" aria-hidden>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="error">Error</auro-header>
        <p>Use the <code>error</code> attribute to apply a persistent error state styling on the dropdown.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <div class="exampleWrapper--ondark" aria-hidden>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-error.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noToggle">No Toggle</auro-header>
        <p>Use the <code>noToggle</code> attribute so the trigger will only show the dropdown bib, not toggle it closed.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-toggle.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-toggle.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
