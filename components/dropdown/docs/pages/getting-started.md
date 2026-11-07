<auro-header level="1" id="overview">Dropdown - Getting started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal configuration</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#slotTrigger" class="level2 body-xs">Trigger</auro-anchorlink>
      <auro-anchorlink fluid href="#slotHelpText" class="level2 body-xs">Help text</auro-anchorlink>
      <auro-anchorlink fluid href="#functions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#fnShow" class="level2 body-xs">show()</auro-anchorlink>
      <auro-anchorlink fluid href="#fnHide" class="level2 body-xs">hide()</auro-anchorlink>
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
        <p>The most basic use of <code>auro-dropdown</code> requires content in the default slot and a trigger element in the <code>trigger</code> slot. The <code>trigger</code> slot content also names the trigger for screen readers, so make sure it describes what the dropdown opens.</p>
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
        <auro-header level="3" id="slotTrigger">Trigger</auro-header>
        <p>The <code>trigger</code> slot holds the content people select to open and close the bib. It accepts any valid HTML.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-button.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-button.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="slotHelpText">Help text</auro-header>
        <p>Content in the <code>helpText</code> slot appears below the trigger, aligned to the left, or centered in the <code>snowflake</code> layout.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/help-text.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/help-text.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="functions">Functions</auro-header>
        <auro-header level="3" id="fnShow">show()</auro-header>
        <p>Use the <code>show()</code> method to programmatically open the dropdown.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatically-show.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-show.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-show.js) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="fnHide">hide()</auro-header>
        <p>Use the <code>hide()</code> method to programmatically close the dropdown.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatically-hide.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-hide.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatically-hide.js) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
