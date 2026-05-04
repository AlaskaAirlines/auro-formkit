<auro-header level="1" id="overview">Counter - Getting Started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal Config</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-counter-group</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-label" class="level2 body-xs">- label</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-valueText" class="level2 body-xs">- valueText</auro-anchorlink>
      <auro-anchorlink fluid href="#slotsCounter" class="level2 body-xs">auro-counter</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-default-counter" class="level2 body-xs">- (default)</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-description" class="level2 body-xs">- description</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText-counter" class="level2 body-xs">- helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
      <auro-anchorlink fluid href="#increment" class="level2 body-xs">increment()</auro-anchorlink>
      <auro-anchorlink fluid href="#decrement" class="level2 body-xs">decrement()</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/install.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
        <p>A standalone <code>&lt;auro-counter&gt;</code> requires only a label in the default slot:</p>
        ```html
        <auro-counter>
          Adults
        </auro-counter>
        ```
        <p>For a grouped counter with dropdown, provide a <code>label</code> slot and <code>bib.fullscreen.headline</code> slot on the group:</p>
        ```html
        <auro-counter-group isDropdown>
          <span slot="label">Passengers</span>
          <span slot="bib.fullscreen.headline">Passengers</span>
          <auro-counter>Adults</auro-counter>
          <auro-counter>Children</auro-counter>
        </auro-counter-group>
        ```
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State Management</auro-header>
        <p>The following properties reflect the current state of the component and can be accessed via JavaScript.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current <code>validityState</code> of the counter or counter group as a string. Possible values include <code>valid</code> and <code>customError</code>.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Triggers validation on the counter or counter group. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
        <auro-header level="3" id="increment">increment()</auro-header>
        <p>Increments the counter value by 1. Optionally pass a number to increment by a specific amount.</p>
        <auro-header level="3" id="decrement">decrement()</auro-header>
        <p>Decrements the counter value by 1. Optionally pass a number to decrement by a specific amount.</p>
      </section>
    </div>
  </div>
</div>
