<auro-header level="1" id="overview">Datepicker - Getting Started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal Config</auro-anchorlink>
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
      <auro-anchorlink fluid href="#slot-date" class="level2 body-xs">date_MM_DD_YYYY</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-popover" class="level2 body-xs">popover_MM_DD_YYYY</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
      <auro-anchorlink fluid href="#valueEnd" class="level2 body-xs">ValueEnd</auro-anchorlink>
      <auro-anchorlink fluid href="#values" class="level2 body-xs">Values</auro-anchorlink>
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
        <auro-header level="2" id="setup">Setup</auro-header>
        <auro-accordion-group Emphasis>
          <auro-accordion expanded class="section" id="recommendedAccordion">
            <span slot="trigger">Recommended Installation and Implementation</span>
            <div class="accordion-content">
            <auro-header level="3">Install</auro-header>
            <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
            <!-- AURO-GENERATED-CONTENT:END -->
            <auro-header level="3">Implementation</auro-header>
            <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customRegistration.md) -->
            <!-- AURO-GENERATED-CONTENT:END -->
            </div>
          </auro-accordion>
          <auro-accordion class="section" id="autoAccordion">
            <span slot="trigger">Auto Installation and Implementation</span>
            <div class="accordion-content">
              <p class="warning"><strong>Warning:</strong> Default registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
              <auro-header level="3">Install</auro-header>
              <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/templates/componentInstall.md) -->
              <!-- AURO-GENERATED-CONTENT:END -->
              <auro-header level="3">Implementation</auro-header>
              <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/defaultRegistration.md) -->
              <!-- AURO-GENERATED-CONTENT:END -->
            </div>
          </auro-accordion>
          <auro-accordion class="section" id="cdnAccordion">
            <span slot="trigger">CDN Installation and Implementation</span>
            <div class="accordion-content">
              <p class="warning"><strong>Warning:</strong> CDN install & registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
              <auro-header level="3">Install & Implementation</auro-header>
              <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/cdnRegistration.md) -->
              <!-- AURO-GENERATED-CONTENT:END -->
            </div>
          </auro-accordion>
        </auro-accordion-group>
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
        <auro-header level="2" id="stateManagement">State Management</auro-header>
        <p>The following read-only properties reflect the current state of the component and can be accessed via JavaScript.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, <code>"badInput"</code>, <code>"rangeOverflow"</code>, <code>"rangeUnderflow"</code>, and <code>"customError"</code>.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the selected date value as a string in <code>MM/DD/YYYY</code> format. When <code>range</code> is set, this represents the start date.</p>
        <auro-header level="3" id="valueEnd">valueEnd</auro-header>
        <p>Gets or sets the end date value when <code>range</code> is set. Uses the same <code>MM/DD/YYYY</code> format.</p>
        <auro-header level="3" id="values">values</auro-header>
        <p>A convenience read-only property for use when <code>range</code> is implemented that returns both <code>value</code> and <code>valueEnd</code> as an array.</p>
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
        <p>Programmatically moves focus to the datepicker trigger input.</p>
        <auro-header level="3" id="hideBib">hideBib()</auro-header>
        <p>Programmatically hides the dropdown bib (calendar) if it is currently open.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the component to its initial state, clearing the selected date(s) and validation state.</p>
        <auro-header level="3" id="showBib">showBib()</auro-header>
        <p>Programmatically shows the dropdown bib (calendar) if it is not already open.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
      </section>
    </div>
  </div>
</div>
