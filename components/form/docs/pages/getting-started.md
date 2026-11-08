<auro-header level="1" id="overview">Form: Getting started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal configuration</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#functions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#fnSubmit" class="level2 body-xs">submit()</auro-anchorlink>
      <auro-anchorlink fluid href="#fnReset" class="level2 body-xs">reset()</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/install.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/frameworks.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="minimalConfig">Minimal configuration</auro-header>
        <p>The most basic use of <code>auro-form</code> requires one or more named Auro form elements inside the form. Add a button with <code>type="submit"</code> to trigger form submission.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="slots">Slots</auro-header>
        <p>The <code>default</code> slot accepts Auro form elements, such as <code>auro-input</code>, <code>auro-select</code>, <code>auro-datepicker</code>, and <code>auro-counter-group</code>, as well as any HTML elements for layout and structure.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.js) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="functions">Functions</auro-header>
        <auro-header level="3" id="fnSubmit">submit()</auro-header>
        <p>Validates every enabled form element and, when none is invalid or required but empty, fires a <code>submit</code> event with the form's current values in <code>detail.value</code>. Otherwise, each invalid field shows its error and the <code>submit</code> event doesn't fire.</p>
        <auro-header level="3" id="fnReset">reset()</auro-header>
        <p>Resets every tracked form element by calling its own <code>reset()</code>, then fires a <code>reset</code> event with the form's values from just before the reset in <code>detail.previousValue</code>. Each element decides what resetting means: for example, <code>auro-input</code> clears its value instead of restoring the one it started with.</p>
      </section>
    </div>
  </div>
</div>
