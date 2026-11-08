<auro-header level="1" id="overview">Select: Getting started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#setup">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal config</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
      <auro-anchorlink fluid href="#name" class="level2 body-xs">name</auro-anchorlink>
      <auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">value</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
      <auro-anchorlink fluid href="#updateActiveOption" class="level2 body-xs">updateActiveOption()</auro-anchorlink>
      <auro-anchorlink fluid href="#hideBib" class="level2 body-xs">hideBib()</auro-anchorlink>
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
        <auro-header level="2" id="stateManagement">State management</auro-header>
        <p>The following properties reflect the current state of the component. Read them from JavaScript.</p>
        <auro-header level="3" id="name">name</auro-header>
        <p>Gets or sets the key for the select's value in form data. <code>auro-form</code> uses it to name the value.</p>
        <auro-header level="3" id="optionSelected">optionSelected</auro-header>
        <p>Returns the currently selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected. When <code>multiSelect</code> is enabled, returns an <code>Array</code> of selected elements.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>valid</code>, <code>valueMissing</code>, and <code>customError</code>. It's <code>undefined</code> until the component first validates.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the selected value of the select. When set from code, the component selects the matching menu option.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-select&gt;</code> element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Clears the selection and the validation state, and marks the component as not yet touched.</p>
        <auro-header level="3" id="updateActiveOption">updateActiveOption()</auro-header>
        <p>Sets the active option by its zero-based position in the menu. The active option is the one keyboard users are on, and it shows a focus highlight.</p>
        <auro-header level="3" id="hideBib">hideBib()</auro-header>
        <p>Closes the bib if it's open.</p>
        <auro-header level="3" id="showBib">showBib()</auro-header>
        <p>Opens the bib if it's closed. Does nothing while the component is disabled.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Validates the component, even when <code>noValidate</code> is set. Pass <code>true</code> to validate right away, even before the user has interacted with the component.</p>
      </section>
    </div>
  </div>
</div>
