<auro-header level="1" id="overview">Combobox: Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, size, and layout</auro-anchorlink>
      <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
      <auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom display value</auro-anchorlink>
      <auro-anchorlink fluid href="#checkmarks" class="level2 body-xs">Checkmarks</auro-anchorlink>
      <auro-anchorlink fluid href="#placement" class="level2 body-xs">Bib placement</auro-anchorlink>
      <auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No flip</auro-anchorlink>
      <auro-anchorlink fluid href="#customBibWidth" class="level2 body-xs">Custom bib width</auro-anchorlink>
      <auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#behaviorMode" class="level2 body-xs">Suggestion vs. filter</auro-anchorlink>
      <auro-anchorlink fluid href="#inputType" class="level2 body-xs">Input type</auro-anchorlink>
      <auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input mode</auro-anchorlink>
      <auro-anchorlink fluid href="#noFilter" class="level2 body-xs">No filter</auro-anchorlink>
      <auro-anchorlink fluid href="#persistInput" class="level2 body-xs">Persist input</auro-anchorlink>
      <auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable component</auro-anchorlink>
      <auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable options</auro-anchorlink>
      <auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require selection</auro-anchorlink>
      <auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force error state</auro-anchorlink>
      <auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom validation</auro-anchorlink>
      <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
      <auro-anchorlink fluid href="#dynamicMenu" class="level2 body-xs">Dynamic menu</auro-anchorlink>
      <auro-anchorlink fluid href="#loading" class="level2 body-xs">Loading</auro-anchorlink>
      <auro-anchorlink fluid href="#nonUniqueValues" class="level2 body-xs">Non-unique option values</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="layout">Shape, size, and layout</auro-header>
        <p>The <code>shape</code>, <code>size</code>, and <code>layout</code> attributes work together to control the overall look of the component.</p>
        <p>See the <auro-hyperlink href="design">Design page</auro-hyperlink> for a detailed breakdown.</p>
        <auro-header level="3" id="background">Light vs. dark background</auro-header>
        <p>Set <code>appearance="inverse"</code> when the combobox is on a dark background. The default, <code>appearance="default"</code>, is for light backgrounds.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-default.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-default.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper--ondark">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="displayValue">Custom display value</auro-header>
        <p>The <code>displayValue</code> slot shows custom HTML content in place of the selected option's text when the combobox doesn't have focus.</p>
        <div class="exampleWrapper--ondark">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="checkmarks">Checkmark on selected option</auro-header>
        <p>Use the <code>checkmark</code> attribute to display a checkmark next to the selected option in the dropdown menu.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checkmark.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="placement">Bib placement</auro-header>
        <p>Customize the bib position with the <code>placement</code>, <code>offset</code>, <code>noFlip</code>, and <code>shift</code> attributes.</p>
        <ul>
          <li><code>placement</code> sets the preferred position of the bib relative to the trigger.</li>
          <li><code>offset</code> sets the distance between the trigger and the bib.</li>
          <li>When there isn't enough space for the preferred <code>placement</code>, the bib flips to another position, unless <code>noFlip</code> is set.</li>
          <li><code>shift</code> moves the bib to keep it inside the viewport when it would otherwise overflow.</li>
        </ul>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noFlip">No flip</auro-header>
        <p>When the <code>noFlip</code> attribute is present, the bib doesn't flip to another position when there isn't enough space in the specified <code>placement</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noflip.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noflip.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="customBibWidth">Custom bib width</auro-header>
        <p>By default the bib's width matches the trigger. To set a specific width, style the <code>dropdownSize</code> CSS shadow part.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-bib-width.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-bib-width.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="breakpoint">Fullscreen breakpoint</auro-header>
        <p>The <code>fullscreenBreakpoint</code> attribute sets the screen size at which the bib switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
        <p>When the screen is the selected breakpoint's size or smaller, the bib opens in fullscreen mode. Set the value to <code>disabled</code> to keep the bib from ever opening in fullscreen mode.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>Restyle the combobox by changing the values of the following tokens from the dropdown, input, and menu.</p>
        <auro-header level="4" id="cssTokensDropdown">Dropdown</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../dropdown/src/styles/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <auro-header level="4" id="cssTokensInput">Input</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../input/src/styles/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <auro-header level="4" id="cssTokensMenu">Menu</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../menu/src/styles/default/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="customBehavior">Behavior</auro-header>
        <auro-header level="3" id="behaviorMode">Suggestion vs. filter</auro-header>
        <p>The combobox has two behaviors: <code>suggestion</code> and <code>filter</code>. The default behavior is <code>suggestion</code>.</p>
        <p>With <code>behavior="suggestion"</code>, the menu options are suggestions, and the user can type any value into the input.</p>
        <p>With <code>behavior="filter"</code>, the user doesn't have to enter a value, but once they type into the input, they must choose one of the menu options for the input to be valid.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/suggestion.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/suggestion.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/filter.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/filter.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="inputType">Input type</auro-header>
        <p>Set <code>type</code> to apply that type to the combobox's input, such as <code>credit-card</code>. Use the <code>triggerIcon</code> attribute to show the user an icon for the expected input type. Icon rendering is currently limited to <code>type="credit-card"</code>. With any other type, <code>triggerIcon</code> doesn't show an icon.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_credit-card.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_credit-card.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="inputMode">Input mode</auro-header>
        <p>Set <code>inputmode</code> to choose which on-screen keyboard mobile devices show. For example, <code>inputmode="numeric"</code> shows a number pad instead of the full keyboard, which makes digits easier to enter.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noFilter">Turn off filtering</auro-header>
        <p>Set <code>noFilter</code> to show every option no matter what the user types. Use it when you filter the <code>&lt;auro-menuoption&gt;</code> elements yourself, such as with results from a city search API.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-filter.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-filter.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="persistInput">Persist input</auro-header>
        <p>Set <code>persistInput</code> to keep the user's typed text in the input when they select an option, instead of replacing it with the option's text. Use it with display values and dynamic menus.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persist-input.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persist-input.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disableComponent">Disable component</auro-header>
        <p>Use the <code>disabled</code> attribute to turn off the combobox. A disabled combobox is shown in a disabled style, can't receive focus, and doesn't respond to the keyboard or pointer.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disableOptions">Disable options</auro-header>
        <p>The component can render one or more <code>disabled</code> options. When the user moves the active option with the keyboard or a screen reader, disabled options are skipped and the next enabled option becomes active.</p>
        <p>When the user hovers over a disabled option with a pointer, nothing happens and the previous active option stays active.</p>
        <p class="note">
          <strong>Note:</strong> Setting <code>value</code> to the value of a <code>disabled</code> option doesn't select it. The combobox clears <code>value</code> and <code>optionSelected</code> to <code>undefined</code> instead. Disabling an option after it's selected doesn't currently clear the value.
        </p>
        <p class="note">
          <strong>Note:</strong> Marking all options as disabled isn't supported. Disable the component instead.
        </p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-option.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-option.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="requireSelection">Require selection</auro-header>
        <p>Set <code>required</code> to show an error when the user leaves the combobox empty.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="forceError">Force error state</auro-header>
        <p>Set the <code>error</code> attribute to a message to keep the combobox in an error state, such as for an error returned from the server.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="customValidation">Custom validation messages</auro-header>
        <p>The combobox provides several properties to customize the error messages displayed for different validation states:</p>
        <ul>
          <li><strong><code>setCustomValidity</code></strong>: Replaces the message for every validation error, except the filter-mode message from <code>setCustomValidityValueMissingFilter</code>.</li>
          <li><strong><code>setCustomValidityCustomError</code></strong>: Sets the message shown while the <code>error</code> attribute is set.</li>
          <li><strong><code>setCustomValidityValueMissing</code></strong>: Sets the message shown when the component is <code>required</code> and the user leaves it empty.</li>
          <li><strong><code>setCustomValidityValueMissingFilter</code></strong>: Sets the message shown when <code>behavior="filter"</code> and the user types text without choosing a menu option.</li>
        </ul>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity-message.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-validity-message.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noValidate">No validation</auro-header>
        <p>When the <code>noValidate</code> attribute is present, the component doesn't validate automatically on blur. Use it when you handle validation yourself or only want to validate on form submission.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="dynamicMenu">Dynamic menu</auro-header>
        <p>The combobox supports dynamically generated menu options. Use them when you fetch the menu options from an external API based on user input, such as a city search.</p>
        <p>Use the <code>noFilter</code> and <code>persistInput</code> attributes together when implementing a dynamic menu. The <code>noFilter</code> attribute prevents the combobox from filtering the options internally (since the API handles filtering), and <code>persistInput</code> keeps the typed value visible while the user browses results.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dynamic-menu.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dynamic-menu.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="loading">Loading</auro-header>
        <p>Use the <code>loading</code> attribute on <code>auro-menu</code> to display a loading state while menu options are being fetched. Define the <code>loadingIcon</code> and <code>loadingText</code> slots inside the menu to provide visual feedback during the loading state.</p>
        <p>In this example, the combobox loads for 5 seconds before displaying the options.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="nonUniqueValues">Non-unique option values</auro-header>
        <p>Two or more <code>auro-menuoption</code> elements may share the same <code>value</code>. This is common when the <code>value</code> represents a coarser grouping than the option label, such as several airports that all serve the same city. When the user filters the list and selects one of several options that share a <code>value</code>, the combobox resolves to the exact option chosen, so the correct label is displayed even though the underlying <code>value</code> is duplicated.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
