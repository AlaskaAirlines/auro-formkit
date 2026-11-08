<auro-header level="1" id="overview">Datepicker - Getting started</auro-header>
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
      <auro-anchorlink fluid href="#slot-fromLabel" class="level2 body-xs">fromLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-toLabel" class="level2 body-xs">toLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-input-clear" class="level2 body-xs">ariaLabel.input.clear</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-bib-close" class="level2 body-xs">ariaLabel.bib.close</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-bib-fullscreen-headline" class="level2 body-xs">bib.fullscreen.headline</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-bib-fullscreen-fromLabel" class="level2 body-xs">bib.fullscreen.fromLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-bib-fullscreen-toLabel" class="level2 body-xs">bib.fullscreen.toLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-date" class="level2 body-xs">date_YYYY_MM_DD</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-popover" class="level2 body-xs">popover_YYYY_MM_DD</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">value</auro-anchorlink>
      <auro-anchorlink fluid href="#valueEnd" class="level2 body-xs">valueEnd</auro-anchorlink>
      <auro-anchorlink fluid href="#values" class="level2 body-xs">values</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
      <auro-anchorlink fluid href="#hideBib" class="level2 body-xs">hideBib()</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
      <auro-anchorlink fluid href="#showBib" class="level2 body-xs">showBib()</auro-anchorlink>
      <auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
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
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/minimal-config.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State management</auro-header>
        <p>Use the following properties in JavaScript to read the datepicker's current state, and set <code>value</code> and <code>valueEnd</code> to change the chosen dates.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Gets the datepicker's current validation state as a string: <code>valid</code>, <code>valueMissing</code>, <code>tooShort</code>, <code>tooLong</code>, <code>patternMismatch</code>, <code>rangeOverflow</code>, <code>rangeUnderflow</code>, or <code>customError</code>. It's <code>undefined</code> until the datepicker is validated.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the chosen date as an ISO date string, such as <code>2025-04-21</code>. When <code>range</code> is set, it's the start date.</p>
        <auro-header level="3" id="valueEnd">valueEnd</auro-header>
        <p>Gets or sets the end date when <code>range</code> is set, in the same ISO format as <code>value</code>.</p>
        <auro-header level="3" id="values">values</auro-header>
        <p>Gets the chosen dates as an array, which is useful when <code>range</code> is set. It's read-only.</p>
        <ul>
          <li>When <code>range</code> is set and both dates are selected, returns <code>[value, valueEnd]</code>.</li>
          <li>When only <code>value</code> is set (range not complete or not enabled), returns <code>[value]</code>.</li>
          <li>When no value is set, returns an empty array <code>[]</code>.</li>
        </ul>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-datepicker&gt;</code> element.</p>
        <auro-header level="3" id="focus">focus()</auro-header>
        <p>Moves keyboard focus to the start date input. Pass <code>endDate</code> to focus the end date input of a range.</p>
        <auro-header level="3" id="hideBib">hideBib()</auro-header>
        <p>Closes the calendar if it's open.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Clears the chosen dates and the validation state.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="showBib">showBib()</auro-header>
        <p>Opens the calendar if it's closed.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Checks the chosen dates and updates <code>validity</code>. Pass <code>true</code> to validate even when the datepicker has focus or hasn't been used yet, so an empty required datepicker reports <code>valueMissing</code>.</p>
      </section>
    </div>
  </div>
</div>
