<auro-header level="1" id="overview">Menu - Getting Started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedAccordion" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoAccordion" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnAccordion" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal Configuration</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#slotDefault" class="level2 body-xs">Default Slot</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">value</auro-anchorlink>
      <auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
      <auro-anchorlink fluid href="#optionActive" class="level2 body-xs">optionActive</auro-anchorlink>
      <auro-anchorlink fluid href="#currentLabel" class="level2 body-xs">currentLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#options" class="level2 body-xs">options</auro-anchorlink>
      <auro-anchorlink fluid href="#index" class="level2 body-xs">index</auro-anchorlink>
      <auro-anchorlink fluid href="#functions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
      <auro-anchorlink fluid href="#selectByValue" class="level2 body-xs">selectByValue()</auro-anchorlink>
      <auro-anchorlink fluid href="#updateActiveOption" class="level2 body-xs">updateActiveOption()</auro-anchorlink>
      <auro-anchorlink fluid href="#navigateOptions" class="level2 body-xs">navigateOptions()</auro-anchorlink>
      <auro-anchorlink fluid href="#events">Events</auro-anchorlink>
      <auro-anchorlink fluid href="#eventList" class="level2 body-xs">Event List</auro-anchorlink>
      <auro-anchorlink fluid href="#eventAttribute" class="level2 body-xs">Option event attribute</auro-anchorlink>
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
        <auro-header level="2" id="minimalConfig">Minimal Configuration</auro-header>
        <p>The most basic use of <code>&lt;auro-menu&gt;</code> is a list of <code>&lt;auro-menuoption&gt;</code> elements in the default slot. Each option should have a <code>&lt;value&gt;</code> attribute.</p>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="slots">Slots</auro-header>
        <auro-header level="3" id="slotDefault">Default Slot</auro-header>
        <p>The default slot accepts <code>auro-menuoption</code> elements and <code>&lt;hr&gt;</code> elements as dividers. You can also nest additional <code>&lt;auro-menu&gt;</code> elements within the default slot.</p>
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State Management</auro-header>
        <p>The following properties reflect the current state of the menu and can be accessed via JavaScript.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the selected value. In multi-select mode, this is a JSON stringified array of selected option values (e.g., <code>'["stops","duration"]'</code>).</p>
        <auro-header level="3" id="optionSelected">optionSelected</auro-header>
        <p>Returns the currently selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected. When <code>multiSelect</code> is enabled, returns an array of selected elements.</p>
        <auro-header level="3" id="optionActive">optionActive</auro-header>
        <p>Returns the currently active (focused) <code>&lt;auro-menuoption&gt;</code> element. The active option receives visual focus during keyboard navigation.</p>
        <auro-header level="3" id="currentLabel">currentLabel</auro-header>
        <p>Returns the display label of the currently selected option(s). Useful for rendering a summary of the selection outside the menu.</p>
        <auro-header level="3" id="options">options</auro-header>
        <p>Returns a read-only array of available <code>&lt;auro-menuoption&gt;</code> elements currently in the menu.</p>
        <auro-header level="3" id="index">index</auro-header>
        <p>Gets or sets the index of the currently highlighted option. Setting this value programmatically moves the visual focus indicator.</p>
      </section>
      <section>
        <auro-header level="2" id="functions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-menu&gt;</code> element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the menu to its initial state, clearing all selected options and restoring the value to <code>undefined</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="selectByValue">selectByValue(value)</auro-header>
        <p>Selects the option(s) whose <code>value</code> matches the argument. Accepts a string in single-select mode or an array of strings in multi-select mode; passing <code>undefined</code>, <code>null</code>, an empty string, or an empty array clears the selection.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/select-by-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/select-by-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="updateActiveOption">updateActiveOption(indexOrOption)</auro-header>
        <p>Sets the specified option as the currently active (highlighted) option. Accepts either a numeric index into <code>options</code> or an <code>&lt;auro-menuoption&gt;</code> element reference.</p>
        <auro-header level="3" id="navigateOptions">navigateOptions(direction)</auro-header>
        <p>Moves the active option to the next or previous option. Accepts <code>'up'</code> or <code>'down'</code> as the direction parameter.</p>
      </section>
      <section>
        <auro-header level="2" id="events">Events</auro-header>
        <p>The <code>&lt;auro-menu&gt;</code> element dispatches custom events that consumers can subscribe to via <code>addEventListener</code>. The example below wires listeners for the full event set and logs each firing.</p>
        <auro-header level="3" id="eventList">Event List</auro-header>
        <ul>
          <li><code>auroMenu-selectedOption</code> — a new selection has been made.</li>
          <li><code>auroMenu-activatedOption</code> — the active (highlighted) option changed via keyboard or hover.</li>
          <li><code>auroMenu-optionsChange</code> — the set of available options was updated (e.g., after a slot change).</li>
          <li><code>auroMenu-selectValueReset</code> — the menu's <code>value</code> was reset via <code>reset()</code>.</li>
          <li><code>auroMenu-selectValueFailure</code> — a call to <code>selectByValue()</code> found no matching option.</li>
        </ul>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/events.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/events.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="eventAttribute">Option event attribute</auro-header>
        <p>Attach an <code>event</code> attribute to any <code>auro-menuoption</code> to dispatch a named custom event from the menu when that option is selected. The generic <code>auroMenu-customEventFired</code> event is also dispatched on every firing — its <code>detail.option</code> references the option that triggered it, so a single listener can route on the <code>event</code> attribute value.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/event-attribute.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/event-attribute.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
