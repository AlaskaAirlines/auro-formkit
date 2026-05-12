<auro-header level="1" id="overview">Combobox - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
      <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
      <auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom Display Value</auro-anchorlink>
      <auro-anchorlink fluid href="#checkmarks" class="level2 body-xs">Checkmarks</auro-anchorlink>
      <auro-anchorlink fluid href="#placement" class="level2 body-xs">Bib Placement</auro-anchorlink>
      <auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No Flip</auro-anchorlink>
      <auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#behaviorMode" class="level2 body-xs">Suggestion vs. Filter</auro-anchorlink>
      <auro-anchorlink fluid href="#inputType" class="level2 body-xs">Input Type</auro-anchorlink>
      <auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
      <auro-anchorlink fluid href="#noFilter" class="level2 body-xs">No Filter</auro-anchorlink>
      <auro-anchorlink fluid href="#persistInput" class="level2 body-xs">Persist Input</auro-anchorlink>
      <auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
      <auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable Option(s)</auro-anchorlink>
      <auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
      <auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
      <auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
      <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
      <auro-anchorlink fluid href="#dynamicMenu" class="level2 body-xs">Dynamic Menu</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="layout">Shape, Size & Layout</auro-header>
        <p>The <code>shape</code>, <code>size</code> and <code>layout</code> attributes work in collaboration to control the overall architecture of the component.</p>
        <p>See the <a href="./design.html">Design page</a> for a detailed breakdown.</p>
        <auro-header level="3" id="background">Light vs. Dark Background</auro-header>
        <p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
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
        <auro-header level="3" id="displayValue">Custom Display Value</auro-header>
        <p>The <code>displayValue</code> slot allows custom HTML content to be shown in place of the selected option's text when the combobox is not focused. Only the <code>snowflake</code> and <code>emphasized</code> layouts are supported.</p>
        <div class="exampleWrapper--ondark">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="checkmarks">Checkmark on Selected Option</auro-header>
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
        <auro-header level="3" id="placement">Bib Placement</auro-header>
        <p>The bib position can be customized with <code>placement</code>, <code>offset</code>, <code>flip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
        <ul>
          <li><code>placement</code> specifies the preferred position where the bib should appear relative to the trigger.</li>
          <li><code>offset</code> sets the distance between the trigger and the bib.</li>
          <li>When <code>autoPlacement</code> is enabled, smart positioning logic is applied to determine the best placement for the bib.</li>
          <li>Unless <code>noFlip</code> is enabled, if there isn't enough space for the preferred <code>placement</code>, the bib will automatically flip to an alternative position.</li>
          <li><code>shift</code> when enabled, adjusts the bib position when it would overflow the viewport boundaries.</li>
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
        <auro-header level="3" id="noFlip">No Flip</auro-header>
        <p>When the <code>noFlip</code> attribute is present, the dropdown bib will not flip to an alternate position when there isn't enough space in the specified <code>placement</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noflip.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noflip.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="breakpoint">Fullscreen Breakpoint</auro-header>
        <p>The <code>fullscreenBreakpoint</code> attribute defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
        <p>When expanded, the dropdown will automatically display in fullscreen mode if the screen size is equal to or smaller than the selected breakpoint. Setting the value to <code>disabled</code> prevents the dropdown from ever entering fullscreen mode.</p>
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
        <p>The component may be restyled by changing the values of the following token(s) for the dropown, input and menu</p>
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
        <auro-header level="3" id="behaviorMode">Suggestion vs. Filter</auro-header>
        <p>There are two behaviors available for the combobox: <code>suggestion</code> and <code>filter</code>. The default behavior is <code>suggestion</code>.</p>
        <p>With <code>behavior="suggestion"</code>, the menu options are displayed as suggestions, but the user may enter whatever value they like into the input.</p>
        <p>With <code>behavior="filter"</code>, the user is not required pick a value but if a value is typed into the input the user is required to choose one of the menu options in order for the input to be considered valid.</p>
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
        <auro-header level="3" id="inputType">Input Type</auro-header>
        <p>When defined, the <code>auro-input</code> in the combobox trigger will use the defined <code>type</code>. Use the <code>triggerIcon</code> attribute to provide context to the user about the expected input type.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_credit-card.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_credit-card.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="inputMode">Input Mode</auro-header>
        <p>The <code>inputmode</code> attribute controls which virtual keyboard layout is presented on mobile devices. For example, setting <code>inputmode="numeric"</code> displays a number pad instead of the full text keyboard, making it easier for users to enter the expected type of data.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noFilter">Turn off Filtering</auro-header>
        <p>If set, combobox will not do suggestion filtering of the menuoptions. This option is useful when the <code>&lt;auro-menuoption&gt;</code> elements are being pre-filtered externally (e.g. using the citysearch API).</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-filter.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-filter.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="persistInput">Persist Input</auro-header>
        <p>The <code>persistInput</code> attribute allows you to set the combobox to persist the value of the input regardless of the current value set for the combobox. This is typically used in conjunction with display values and dynamic menus.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persist-input.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persist-input.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disableComponent">Disable Component</auro-header>
        <p>Use the <code>disabled</code> attribute to disable the combobox. When disabled, the component will render to reflect the state, may not receive focus nor react to any key or pointer events.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disableOptions">Disable Option(s)</auro-header>
        <p>The component may be rendered with one or more <code>disabled</code> options. When navigating the list of options with the keyboard or assistive technology to mark the next or previous option as active, disabled options will be skipped, jumping to the next enabled option.</p>
        <p>While using the pointer to mark options as active, hovering over disabled options will be ignored and the previous active option will remain active.</p>
        <p class="note">
          <strong>Note:</strong> If the currently <code>selected</code> option is marked as <code>disabled</code>, the component value is reset to <code>undefined</code> and the component validation workflow is performed (e.g., if the component instance is <code>required</code> it will set <code>validity="valueMissing".</code>).
        </p>
        <p class="note">
          <strong>Note:</strong> marking all options as disabled is not supported. Disable the component instead.
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
        <auro-header level="3" id="requireSelection">Require Selection</auro-header>
        <p>Populates the <code>required</code> attribute on the input. Used for client-side validation.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="forceError">Force Error State</auro-header>
        <p>Using the <code>error</code> attribute with a given message sets a persistent error state (e.g. an error state returned from the server).</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="customValidation">Custom Validation Messages</auro-header>
        <p>The combobox provides several properties to customize the error messages displayed for different validation states:</p>
        <ul>
          <li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error.</li>
          <li><strong><code>setCustomValidityCustomError</code></strong> — Displayed when the <code>error</code> attribute is set on the component.</li>
          <li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty.</li>
          <li><strong><code>setCustomValidityValueMissingFilter</code></strong> — Displayed when the user has not chosen a menu option when <code>behavior="filter"</code>.</li>
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
        <auro-header level="3" id="noValidate">No Validation</auro-header>
        <p>When the <code>noValidate</code> attribute is present, the component will not perform automatic validation on blur. This is useful when validation is handled externally or should only be triggered on form submission.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="dynamicMenu">Dynamic Menu</auro-header>
        <p>The combobox supports dynamically generated menu options. This is useful when the menu options are fetched from an external API based on user input, such as a city search.</p>
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
      </section>
    </div>
  </div>
</div>
