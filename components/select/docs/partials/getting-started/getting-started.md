<auro-header level="1" id="overview">Select - Getting Started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recomended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#setup">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal Config</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
      <auro-anchorlink fluid href="#hasFocus" class="level2 body-xs">hasFocus</auro-anchorlink>
      <auro-anchorlink fluid href="#isPopoverVisible" class="level2 body-xs">isPopoverVisible</auro-anchorlink>
      <auro-anchorlink fluid href="#name" class="level2 body-xs">Name</auro-anchorlink>
      <auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
      <auro-anchorlink fluid href="#touched" class="level2 body-xs">Touched</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
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
        <auro-header level="2" id="stateManagement">State Management</auro-header>
        <p>The following properties reflect the current state of the component and can be accessed via JavaScript.</p>
        <auro-header level="3" id="hasFocus">hasFocus</auro-header>
        <p>Returns <code>true</code> when the select trigger currently has focus.</p>
        <auro-header level="3" id="isPopoverVisible">isPopoverVisible</auro-header>
        <p>Returns <code>true</code> when the dropdown bib is currently visible.</p>
        <auro-header level="3" id="name">name</auro-header>
        <p>Gets or sets the name for the select element. Used when submitting form data.</p>
        <auro-header level="3" id="optionSelected">optionSelected</auro-header>
        <p>Returns the currently selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected. When <code>multiSelect</code> is enabled, returns an <code>Array</code> of selected elements.</p>
        <auro-header level="3" id="touched">touched</auro-header>
        <p>Returns <code>true</code> after the user has interacted with the component (opened and closed the bib, or changed the value).</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the selected value of the select. When set programmatically, the component will attempt to match and select the corresponding menu option.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-select&gt;</code> element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the component to its initial state, clearing the value and validation state.</p>
        <auro-header level="3" id="updateActiveOption">updateActiveOption()</auro-header>
        <p>Updates the active option in the menu by index. The active option receives visual focus when navigating with the keyboard.</p>
        <auro-header level="3" id="hideBib">hideBib()</auro-header>
        <p>Programmatically hides the dropdown bib if it is currently open.</p>
        <auro-header level="3" id="showBib">showBib()</auro-header>
        <p>Programmatically shows the dropdown bib if there are options to display.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
      </section>
    </div>
  </div>
</div>
