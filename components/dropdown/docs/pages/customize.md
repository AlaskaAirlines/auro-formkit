<auro-header level="1" id="overview">Dropdown - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
      <auro-anchorlink fluid href="#bibPosition" class="level2 body-xs">Bib position</auro-anchorlink>
      <auro-anchorlink fluid href="#fullscreenBreakpoint" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
      <auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match width</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#chevron" class="level2 body-xs">Chevron</auro-anchorlink>
      <auro-anchorlink fluid href="#desktopModal" class="level2 body-xs">Desktop modal</auro-anchorlink>
      <auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
      <auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
      <auro-anchorlink fluid href="#noToggle" class="level2 body-xs">No toggle</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="background">Light vs. dark background</auro-header>
        <p>The <code>appearance</code> attribute sets the colors for the background the dropdown sits on. Use <code>inverse</code> on dark backgrounds and <code>default</code>, the default value, everywhere else.</p>
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
        <p>Restyle the component by overriding the following CSS custom properties (design tokens).</p>
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
        <auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
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
        <auro-header level="3" id="bibPosition">Bib position</auro-header>
        <p>Customize bib position with <code>placement</code>, <code>offset</code>, <code>noFlip</code>, and <code>shift</code> attributes.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="fullscreenBreakpoint">Fullscreen breakpoint</auro-header>
        <p>Set <code>fullscreenBreakpoint</code> to the screen width, such as <code>sm</code>, at or below which the open bib fills the screen. When it isn't set, or is set to <code>disabled</code>, the bib never goes fullscreen.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="matchWidth">Match width</auro-header>
        <p>Set <code>matchWidth</code> to make the bib the same width as the trigger.</p>
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
        <auro-header level="3" id="desktopModal">Desktop modal</auro-header>
        <p>Set <code>desktopModal</code> to make the open bib act as a modal dialog when it isn't fullscreen. The rest of the page becomes <code>inert</code>, and keyboard focus stays in the bib until it closes. A fullscreen bib already behaves this way, because it opens with the <code>&lt;dialog&gt;</code> element's <code>showModal()</code> method.</p>
        <auro-header level="3" id="disabled">Disabled</auro-header>
        <p>Set <code>disabled</code> to turn the dropdown off. The trigger is shown in a muted style and can't open the bib.</p>
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
        <p>Set <code>error</code> to show the trigger in an error style. It doesn't show a message, so put one in the <code>helpText</code> slot.</p>
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
        <auro-header level="3" id="noToggle">No toggle</auro-header>
        <p>Use the <code>noToggle</code> attribute so the trigger only opens the bib and doesn't close it. Pressing <code>Escape</code> or moving focus away still closes the bib.</p>
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
