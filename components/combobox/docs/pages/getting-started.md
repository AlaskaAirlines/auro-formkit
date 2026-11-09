<auro-header level="1" id="overview">Combobox: Getting started</auro-header>
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
      <auro-anchorlink fluid href="#slot-default" class="level2 body-xs">(default)</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-input-clear" class="level2 body-xs">ariaLabel.input.clear</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-bib-close" class="level2 body-xs">ariaLabel.bib.close</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-bib-fullscreen-headline" class="level2 body-xs">bib.fullscreen.headline</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
      <auro-anchorlink fluid href="#inputValue" class="level2 body-xs">inputValue</auro-anchorlink>
      <auro-anchorlink fluid href="#optionSelected" class="level2 body-xs">optionSelected</auro-anchorlink>
      <auro-anchorlink fluid href="#typedValue" class="level2 body-xs">typedValue</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">value</auro-anchorlink>
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
        <auro-header level="2" id="stateManagement">State management</auro-header>
        <p>The following properties hold the combobox's current state. Read them with JavaScript, and set <code>value</code> or <code>typedValue</code> to change them.</p>
        <auro-header level="3" id="inputValue">inputValue</auro-header>
        <p>Gets the text currently in the input, whether or not it matches a menu option. It changes as the user types, and it's read-only.</p>
        <auro-header level="3" id="optionSelected">optionSelected</auro-header>
        <p>Gets the selected <code>&lt;auro-menuoption&gt;</code> element, or <code>undefined</code> when no option is selected.</p>
        <auro-header level="3" id="typedValue">typedValue</auro-header>
        <p>Sets the text shown in the input, such as a search the user started earlier. It doesn't update as the user types, so read <code>inputValue</code> to get the current text.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Gets the result of the last validation as a string, such as <code>valid</code>, <code>valueMissing</code>, or <code>customError</code>. It's <code>undefined</code> until the combobox validates.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the combobox's value: the chosen option's <code>value</code>, or the text in the input when no option is chosen. When you set it to the <code>value</code> of an option that isn't <code>disabled</code> or <code>static</code>, the combobox selects that option.</p>
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
        <p>Validates the component and updates <code>validity</code> and the error message. Pass <code>true</code> to validate even when the combobox has focus or the user hasn't interacted with it yet.</p>
        <auro-header level="3" id="hideBib">hideBib()</auro-header>
        <p>Hides the bib if it's open.</p>
        <auro-header level="3" id="showBib">showBib()</auro-header>
        <p>Shows the bib when the input has a value and there are options or a <code>nomatch</code> option to show. Doesn't currently open the bib for a loading menu that has no options yet.</p>
      </section>
    </div>
  </div>
</div>
