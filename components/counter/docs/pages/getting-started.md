<auro-header level="1" id="overview">Counter: Getting started</auro-header>
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
      <auro-anchorlink fluid href="#slotsGroup" class="level2 body-xs">auro-counter-group</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-label" class="level2 body-xs">- label</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">- helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-valueText" class="level2 body-xs">- valueText</auro-anchorlink>
      <auro-anchorlink fluid href="#slotsCounter" class="level2 body-xs">auro-counter</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-default-counter" class="level2 body-xs">- (default)</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-description" class="level2 body-xs">- description</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText-counter" class="level2 body-xs">- helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
      <auro-anchorlink fluid href="#increment" class="level2 body-xs">increment()</auro-anchorlink>
      <auro-anchorlink fluid href="#decrement" class="level2 body-xs">decrement()</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
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
        <p>A standalone <code>&lt;auro-counter&gt;</code> requires a label in the default slot and names for its minus and plus buttons in the <code>ariaLabel.minus</code> and <code>ariaLabel.plus</code> slots:</p>
        ```html
        <auro-counter>
          Adults
          <span slot="ariaLabel.minus">Remove adult</span>
          <span slot="ariaLabel.plus">Add adult</span>
        </auro-counter>
        ```
        <p>For a grouped counter with dropdown, also provide the <code>label</code>, <code>bib.fullscreen.headline</code>, and <code>ariaLabel.bib.close</code> slots on the group:</p>
        ```html
        <auro-counter-group isDropdown>
          <span slot="label">Passengers</span>
          <span slot="bib.fullscreen.headline">Passengers</span>
          <span slot="ariaLabel.bib.close">Close passenger selector</span>
          <auro-counter>
            Adults
            <span slot="ariaLabel.minus">Remove adult</span>
            <span slot="ariaLabel.plus">Add adult</span>
          </auro-counter>
          <auro-counter>
            Children
            <span slot="ariaLabel.minus">Remove child</span>
            <span slot="ariaLabel.plus">Add child</span>
          </auro-counter>
        </auro-counter-group>
        ```
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State management</auro-header>
        <p>The following property reflects the current state of the component. Read it from JavaScript.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current validation result of the counter or counter group as a string. Possible values include <code>valid</code>, <code>customError</code>, <code>rangeOverflow</code>, and <code>rangeUnderflow</code>.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available.</p>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Triggers validation on the counter or counter group. Pass <code>true</code> to validate even while the element has focus.</p>
        <auro-header level="3" id="increment">increment()</auro-header>
        <p>Increases the counter's value by 1, or by the number you pass. Does nothing when the counter is disabled or already at its maximum.</p>
        <auro-header level="3" id="decrement">decrement()</auro-header>
        <p>Decreases the counter's value by 1, or by the number you pass. Does nothing when the counter is disabled or already at its minimum.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Sets the counter, or every counter in a counter group, back to its <code>min</code> value and clears its validation state. A counter with the <code>error</code> attribute stays invalid. <code>&lt;auro-form&gt;</code> also calls <code>reset()</code> when a form is reset. Increment the counters below, then select <strong>Reset</strong>.</p>
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
      </section>
    </div>
  </div>
</div>
