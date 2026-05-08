<auro-header level="1" id="overview">Input - Getting Started</auro-header>
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
      <auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-clear" class="level2 body-xs">ariaLabel.clear</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-password-show" class="level2 body-xs">ariaLabel.password.show</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-password-hide" class="level2 body-xs">ariaLabel.password.hide</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
      <auro-anchorlink fluid href="#hasFocus" class="level2 body-xs">hasFocus</auro-anchorlink>
      <auro-anchorlink fluid href="#hasValue" class="level2 body-xs">hasValue</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#clear" class="level2 body-xs">clear()</auro-anchorlink>
      <auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
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
        <auro-header level="2" id="stateManagement">State Management</auro-header>
        <p>The following read-only properties reflect the current state of the component and can be accessed via JavaScript.</p>
        <auro-header level="3" id="hasFocus">hasFocus</auro-header>
        <p>Returns <code>true</code> when the input element currently has focus.</p>
        <auro-header level="3" id="hasValue">hasValue</auro-header>
        <p>Returns <code>true</code> when the input element has a value.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the current value of the input element.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-input&gt;</code> element.</p>
        <auro-header level="3" id="clear">clear()</auro-header>
        <p>Clears the current value of the input.</p>
        <auro-header level="3" id="focus">focus()</auro-header>
        <p>Programmatically moves focus to the input element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the component to its initial state, clearing the value and validation state.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
      </section>
    </div>
  </div>
</div>
