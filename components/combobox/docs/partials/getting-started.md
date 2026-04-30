<auro-header level="1" id="overview">Combobox - Getting Started</auro-header>
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
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
      <auro-anchorlink fluid href="#inputValue" class="level2 body-xs">inputValue</auro-anchorlink>
      <auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
      <auro-anchorlink fluid href="#typedValue" class="level2 body-xs">typedValue</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#clear" class="level2 body-xs">clear()</auro-anchorlink>
      <auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
      <auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
      <auro-anchorlink fluid href="#hideBib" class="level2 body-xs">hideBib()</auro-anchorlink>
      <auro-anchorlink fluid href="#showBib" class="level2 body-xs">showBib()</auro-anchorlink>
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
              <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/defaultRegistration.md) -->
              <!-- AURO-GENERATED-CONTENT:END -->
            </div>
          </auro-accordion>
          <auro-accordion class="section" id="cdnAccordion">
            <span slot="trigger">CDN Installation and Implementation</span>
            <div class="accordion-content">
              <p class="warning"><strong>Warning:</strong> CDN install & registration can cause conflicts if another package registers the same tag name using a different version of the component, leading to unexpected behavior. Use custom registration to avoid this risk.</p>
              <auro-header level="3">Install & Implementation</auro-header>
              <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/cdnRegistration.md) -->
              <!-- AURO-GENERATED-CONTENT:END -->
            </div>
          </auro-accordion>
        </auro-accordion-group>
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/frameworks.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/minimal-config.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State Management</auro-header>
        <p>The following read-only properties reflect the current state of the component and can be accessed via JavaScript.</p>
        <auro-header level="3" id="inputValue">inputValue</auro-header>
        <p>Returns the current value of the internal HTML5 <code>input</code> element. This reflects exactly what the user has typed, regardless of whether it matches a menu option.</p>
        <auro-header level="3" id="optionSelected">optionSelected</auro-header>
        <p>Returns the currently selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected.</p>
        <auro-header level="3" id="typedValue">typedValue</auro-header>
        <p>Gets or sets the value of the internal input element. Unlike <code>value</code>, this represents what the user typed (or what was programmatically set in the input), not the selected option value.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the selected value of the combobox. When set programmatically, the component will attempt to match and select the corresponding menu option.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-combobox&gt;</code> element.</p>
        <auro-header level="3" id="clear">clear()</auro-header>
        <p>Clears the current value of the combobox, resetting both the input and the selected option.</p>
        <auro-header level="3" id="focus">focus()</auro-header>
        <p>Programmatically moves focus to the combobox trigger input.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the component to its initial state, clearing the value, input text, and validation state.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
        <auro-header level="3" id="hideBib">hideBib()</auro-header>
        <p>Programmatically hides the dropdown bib if it is currently open.</p>
        <auro-header level="3" id="showBib">showBib()</auro-header>
        <p>Programmatically shows the dropdown bib if there are options to display.</p>
      </section>
    </div>
  </div>
</div>
