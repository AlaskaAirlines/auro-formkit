<auro-header level="1" id="overview">Radio: Getting started</auro-header>
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
      <auro-anchorlink fluid href="#minimalConfig">Minimal config</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-radio-group</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-legend" class="level2 body-xs">- legend</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">- optionalLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slotsRadio" class="level2 body-xs">auro-radio</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-default-radio" class="level2 body-xs">- (default)</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-content" class="level2 body-xs">- content</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
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
        <auro-header level="3" id="minimalConfig">Minimal configuration</auro-header>
        <p>Every <code>&lt;auro-radio-group&gt;</code> implementation requires:</p>
        <ol>
          <li><strong>A legend in the <code>legend</code> slot</strong>: Gives the radio group the name screen readers announce.</li>
          <li><strong>Two or more <code>&lt;auro-radio&gt;</code> elements</strong>: Each one needs a <code>value</code> that's unique within the group, and label text in its default slot or <code>label</code> attribute.</li>
        </ol>
        ```html
        <auro-radio-group>
          <span slot="legend">Form label goes here</span>
          <auro-radio value="yes" name="example" id="radio-ex1" label="Yes"></auro-radio>
          <auro-radio value="no" name="example" id="radio-ex2" label="No"></auro-radio>
        </auro-radio-group>
        ```
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State management</auro-header>
        <p>Read these properties from JavaScript to get the component's current state.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Gets the group's current validation state as a string: <code>valid</code>, <code>valueMissing</code>, or <code>customError</code>. It's <code>undefined</code> until the group is first validated.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-radio-group&gt;</code> element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Unchecks every radio button in the group, including one that started out checked, and clears the value and validation state. An error set with the <code>error</code> attribute stays.</p>
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
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Validates the group and shows an error message if it's invalid. Pass <code>true</code> to validate right away, even while the group has focus or before anyone has interacted with it, for example, before submitting a form.</p>
      </section>
    </div>
  </div>
</div>
