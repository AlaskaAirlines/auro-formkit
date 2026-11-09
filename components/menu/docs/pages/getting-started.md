<auro-header level="1" id="overview">Menu: Getting started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedAccordion" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoAccordion" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnAccordion" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal configuration</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#slotDefault" class="level2 body-xs">Default slot</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
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
      <auro-anchorlink fluid href="#eventList" class="level2 body-xs">Event list</auro-anchorlink>
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
        <auro-header level="2" id="minimalConfig">Minimal configuration</auro-header>
        <p>The most basic use of <code>&lt;auro-menu&gt;</code> is a list of <code>&lt;auro-menuoption&gt;</code> elements in the default slot. Give each option a <code>value</code> attribute.</p>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="slots">Slots</auro-header>
        <auro-header level="3" id="slotDefault">Default slot</auro-header>
        <p>The default slot accepts <code>auro-menuoption</code> elements and <code>&lt;hr&gt;</code> elements as dividers. It also accepts nested <code>&lt;auro-menu&gt;</code> elements, which indent a group of options.</p>
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State management</auro-header>
        <p>Read these properties in JavaScript to get the menu's current state.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the selected value. In multi-select mode, it's a JSON array string of the selected option values, such as <code>'["stops","duration"]'</code>. When the value matches no option, or only options marked <code>disabled</code> or <code>static</code>, the menu clears the selection (<code>optionSelected</code> becomes <code>undefined</code>) and fires <code>auroMenu-selectValueFailure</code>. In multi-select mode, the menu drops values that match only <code>disabled</code> or <code>static</code> options, and fires the event only when no value matches. Options marked <code>hidden</code> can still be selected by value.</p>
        <auro-header level="3" id="optionSelected">optionSelected</auro-header>
        <p>Returns the selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> if no option is selected. When <code>multiSelect</code> is enabled, returns an array of selected elements.</p>
        <auro-header level="3" id="optionActive">optionActive</auro-header>
        <p>Returns the active <code>&lt;auro-menuoption&gt;</code> element: the option highlighted by the arrow keys or hover. Focus doesn't move to the active option; it's only shown as highlighted.</p>
        <auro-header level="3" id="currentLabel">currentLabel</auro-header>
        <p>Returns the text of the selected option, or of every selected option separated by commas in multi-select mode. Use it to show a summary of the selection outside the menu.</p>
        <auro-header level="3" id="options">options</auro-header>
        <p>Returns the <code>&lt;auro-menuoption&gt;</code> elements in the menu, including those in nested menus, or <code>undefined</code> when the menu has none.</p>
        <auro-header level="3" id="index">index</auro-header>
        <p>Gets or sets the position in <code>options</code> of the option that Enter and Tab act on: the option last highlighted or selected. It's <code>-1</code> when there's none. Setting it highlights that option.</p>
      </section>
      <section>
        <auro-header level="2" id="functions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-menu&gt;</code> element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the menu to its initial state: clears the selection and the active option, sets <code>value</code> to <code>undefined</code>, and dispatches <code>auroMenu-selectValueReset</code>.</p>
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
        <p>Sets the specified option as the active (highlighted) option and dispatches <code>auroMenu-activatedOption</code>. Accepts either a numeric index into <code>options</code> or an <code>&lt;auro-menuoption&gt;</code> element reference.</p>
        <auro-header level="3" id="navigateOptions">navigateOptions(direction)</auro-header>
        <p>Moves the active option to the next or previous interactive option, wrapping around at either end. Accepts <code>'up'</code> or <code>'down'</code> as the direction parameter.</p>
      </section>
      <section>
        <auro-header level="2" id="events">Events</auro-header>
        <p>Listen for these custom events from <code>&lt;auro-menu&gt;</code> with <code>addEventListener</code>. The example below listens for the selection, active-option, options, reset, and failure events and logs each one.</p>
        <auro-header level="3" id="eventList">Event list</auro-header>
        <ul>
          <li><code>auroMenu-selectedOption</code>: the selection changed, including when an option is deselected or the selection is cleared. In single-select mode, it also fires when the already-selected option is chosen again.</li>
          <li><code>auroMenu-activatedOption</code>: the active (highlighted) option changed through the keyboard, hover, or <code>updateActiveOption()</code>.</li>
          <li><code>auroMenu-optionsChange</code>: the set of available options was updated, such as after a slot change.</li>
          <li><code>auroMenu-selectValueReset</code>: the menu's <code>value</code> was reset with <code>reset()</code>.</li>
          <li><code>auroMenu-selectValueFailure</code>: a value selection (through <code>selectByValue()</code>, the <code>value</code> attribute, or setting the <code>value</code> property) found no matching selectable option. This includes values that match an option marked <code>disabled</code> or <code>static</code>, which are never selectable. It also fires in multi-select mode when someone chooses an option with no <code>value</code>.</li>
          <li><code>auroMenu-loadingChange</code>: the <code>loading</code> attribute changed.</li>
          <li><code>auroMenu-customEventFired</code>: the menu fired the event named in an option's <code>event</code> attribute. See <a href="#eventAttribute">Option event attribute</a>.</li>
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
        <p>Attach an <code>event</code> attribute to any <code>auro-menuoption</code> to dispatch a named custom event from the menu, instead of selecting the option, when someone chooses it. The menu also dispatches the generic <code>auroMenu-customEventFired</code> event every time. Its <code>detail.option</code> references the option that triggered it, so a single listener can route on the <code>event</code> attribute value.</p>
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
