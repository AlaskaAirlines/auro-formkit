<auro-header level="1" id="overview">Checkbox - Getting Started</auro-header>
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
      <auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-checkbox-group</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-default-group" class="level2 body-xs">- (default)</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-legend" class="level2 body-xs">- legend</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">- optionalLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slotsCheckbox" class="level2 body-xs">auro-checkbox</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-default-checkbox" class="level2 body-xs">- (default)</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
      <auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/pages/install.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="3" id="minimalConfig">Minimal Configuration</auro-header>
        <p>Every <code>&lt;auro-checkbox-group&gt;</code> implementation requires:</p>
        <ol>
          <li><strong>A legend in the <code>legend</code> slot</strong> — Provides an accessible label for the checkbox group.</li>
          <li><strong>One or more <code>&lt;auro-checkbox&gt;</code> elements</strong> — Each with a unique <code>value</code> and <code>name</code> attribute.</li>
        </ol>

```html
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="option1" name="example" id="cb-ex1">Option 1</auro-checkbox>
  <auro-checkbox value="option2" name="example" id="cb-ex2">Option 2</auro-checkbox>
</auro-checkbox-group>
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
        <p>Returns the current <code>validityState</code> of the checkbox group as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-checkbox-group&gt;</code> element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the checkbox group to its initial state, clearing all checked values and validation state.</p>
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
        <p>Triggers validation on the checkbox group. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
      </section>
    </div>
  </div>
</div>
