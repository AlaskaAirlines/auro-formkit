<auro-header level="1" id="overview">Form - Getting Started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal Configuration</auro-anchorlink>
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
        <auro-header level="2" id="minimalConfig">Minimal Configuration</auro-header>
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
        <p>The <code>default</code> slot accepts any Auro form elements (e.g., <code>auro-input</code>, <code>auro-select</code>, <code>auro-datepicker</code>, <code>auro-counter-group</code>) as well as any HTML elements for layout and structure.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="functions">Functions</auro-header>
        <auro-header level="3" id="fnSubmit">submit()</auro-header>
        <p>Validates all form elements. If all are valid, fires a <code>submit</code> event with <code>detail.value</code> containing the current form values. If any element is invalid, its error state is surfaced and the <code>submit</code> event is not fired.</p>
        <auro-header level="3" id="fnReset">reset()</auro-header>
        <p>Resets all form elements to their initial state and fires a <code>reset</code> event. The event's <code>detail.previousValue</code> contains the form values captured immediately before the reset.</p>
      </section>
    </div>
  </div>
</div>
