<auro-header level="1" id="overview">Select: Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, size, and layout</auro-anchorlink>
      <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
      <auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom display value</auro-anchorlink>
      <auro-anchorlink fluid href="#resetOption" class="level2 body-xs">Reset option</auro-anchorlink>
      <auro-anchorlink fluid href="#noCheckmark" class="level2 body-xs">No checkmark</auro-anchorlink>
      <auro-anchorlink fluid href="#fluid" class="level2 body-xs">Fluid</auro-anchorlink>
      <auro-anchorlink fluid href="#flexMenuWidth" class="level2 body-xs">Flex menu width</auro-anchorlink>
      <auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match width</auro-anchorlink>
      <auro-anchorlink fluid href="#placement" class="level2 body-xs">Placement</auro-anchorlink>
      <auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No flip</auro-anchorlink>
      <auro-anchorlink fluid href="#offset" class="level2 body-xs">Offset</auro-anchorlink>
      <auro-anchorlink fluid href="#shift" class="level2 body-xs">Shift</auro-anchorlink>
      <auro-anchorlink fluid href="#largeHeader" class="level2 body-xs">Large fullscreen header</auro-anchorlink>
      <auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#autoComplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
      <auro-anchorlink fluid href="#typeAhead" class="level2 body-xs">Type-ahead</auro-anchorlink>
      <auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable component</auro-anchorlink>
      <auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable options</auro-anchorlink>
      <auro-anchorlink fluid href="#submenus" class="level2 body-xs">Submenus</auro-anchorlink>
      <auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require selection</auro-anchorlink>
      <auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force error state</auro-anchorlink>
      <auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom validation</auro-anchorlink>
      <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
      <auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
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
        <p>The <code>appearance</code> attribute sets the colors to match the background behind the component. Use <code>inverse</code> on dark backgrounds and <code>default</code>, the default value, on light ones.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper--ondark">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="displayValue">Custom display value</auro-header>
        <p>The <code>displayValue</code> slot shows custom HTML content in place of the selected option's text while the bib is closed. Put the content inside each <code>&lt;auro-menuoption&gt;</code> with <code>slot="displayValue"</code>. Use it to show icons, formatted text, or other rich content in the trigger.</p>
        <p>To keep showing the selected option's display value even while the bib is open, set the <code>forceDisplayValue</code> attribute on the component, which visually hides the label and value text.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="resetOption">Adding a reset option</auro-header>
        <p><code>auro-select</code> has no built-in way to clear a selection from the trigger. If a user picks the wrong option on an optional field, they have no way to reset their selection.</p>
        <p>Add a selectable entry at the top of the menu with whatever label fits the field, such as "None", "N/A", or "No preference". <code>value=""</code> doesn't work, because <code>auro-menu</code> treats an empty string as a clear-selection signal.</p>
        <p>Use a non-empty sentinel such as <code>value="none"</code> instead, choosing one that can't collide with any real domain value. Either accept <code>"none"</code> on the backend, or coerce it in your submit handler:</p>
        <pre><code>payload.suffix = payload.suffix === "none" ? "" : payload.suffix;</code></pre>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/none-option.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/none-option.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noCheckmark">Hide checkmark indicators</auro-header>
        <p>By default, the select component displays a checkmark next to the currently selected option. To hide the checkmark indicator, set <code>noCheckmark</code> on the select, as in the following example, or <code>nocheckmark</code> on the <code>&lt;auro-menu&gt;</code> element.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-checkmark.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-checkmark.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="fluid">Fluid</auro-header>
        <p>When the <code>fluid</code> attribute is present, the component stretches to fill the full width of its container. This is useful for form layouts where the select should fill the available space.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fluid.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fluid.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="flexMenuWidth">Flex menu width</auro-header>
        <p>In the classic layout, the bib width matches the trigger width by default. Setting the <code>flexMenuWidth</code> attribute lets the bib size itself based on its content, which is useful when menu option text is wider than the trigger.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/flex-menu-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/flex-menu-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="matchWidth">Match width</auro-header>
        <p>In the emphasized and snowflake layouts, set the <code>matchWidth</code> attribute to make the bib the same width as the trigger. The classic layout always matches the trigger's width unless <code>flexMenuWidth</code> is set, so <code>matchWidth</code> has no effect there.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="placement">Placement</auro-header>
        <p>The <code>placement</code> attribute sets where the bib opens relative to the trigger. Supported values are <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, <code>bottom-start</code>, <code>top-start</code>, <code>top-end</code>, <code>right-start</code>, <code>right-end</code>, <code>bottom-end</code>, <code>left-start</code>, and <code>left-end</code>. The default value is <code>bottom-start</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placement.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placement.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noFlip">No flip</auro-header>
        <p>When the <code>noFlip</code> attribute is present, the bib doesn't flip to the opposite side when there isn't enough space in the specified <code>placement</code>. By default, the bib flips to stay visible within the viewport.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-flip.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-flip.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="offset">Offset</auro-header>
        <p>The <code>offset</code> attribute sets the gap, in pixels, between the trigger element and the dropdown bib. The default value is <code>0</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/offset.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/offset.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="shift">Shift</auro-header>
        <p>When the <code>shift</code> attribute is present, the bib slides along the trigger's edge to avoid being cut off by the viewport. Use it when the bib would otherwise extend beyond the edge of the screen. It applies only in the emphasized layout.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/shift.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/shift.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="largeHeader">Large fullscreen header</auro-header>
        <p>When the <code>largeFullscreenHeadline</code> attribute is present, the headline in the fullscreen bib uses the larger <code>HeadingDisplay</code> style. By default, the fullscreen headline uses <code>Heading 600</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/large-fullscreen-headline.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/large-fullscreen-headline.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="breakpoint">Fullscreen breakpoint</auro-header>
        <p>The <code>fullscreenBreakpoint</code> attribute sets the largest screen size at which the bib opens as a fullscreen dialog. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
        <p>When opened, the bib shows as a fullscreen dialog if the screen size is equal to or smaller than the selected breakpoint. Setting the value to <code>disabled</code> prevents the dropdown from ever entering fullscreen mode.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>Restyle the component by changing the values of the following tokens for the select, dropdown, and menu.</p>
        <auro-header level="4" id="cssTokensSelect">Select</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <auro-header level="4" id="cssTokensDropdown">Dropdown</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../dropdown/src/styles/tokens.scss) -->
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
        <auro-header level="2" id="customBehavior">Behavior</auro-header>
        <auro-header level="3" id="autoComplete">Autocomplete</auro-header>
        <p>The <code>autocomplete</code> attribute gives the browser an autofill hint for the select, such as <code>country-name</code> for a country. When set, the browser may offer saved values for the field. It doesn't currently apply in the emphasized layout.</p>
        <p>This is especially useful when the select is used alongside other form fields that support autofill, creating a seamless form-filling experience.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/autocomplete.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/autocomplete.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="typeAhead">Type-ahead</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/typeahead.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/typeahead.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/typeahead.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disableComponent">Disable component</auro-header>
        <p>The entire component can be disabled. A disabled component is shown in a muted style, doesn't respond to pointer events, and can't be opened, but keyboard users can still tab to it.</p>
        <p>When the select is disabled, <code>auro-form</code> leaves its value out of the form data, as a native form does for disabled controls.</p>
        <p class="note">
        <strong>Note:</strong> When the component is both <strong>invalid</strong> and <code>disabled</code>, it can't be opened, but the error message still shows below the trigger.
        </p>
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
        <p>The component may be rendered with one or more <code>disabled</code> options. When people move through the options with the keyboard or a screen reader, disabled options are skipped.</p>
        <p>When people use a pointer, hovering over a disabled option is ignored, and the previous active option stays active.</p>
        <p class="note">
        <strong>Note:</strong> Setting the component <code>value</code> to one that matches a <code>disabled</code> or <code>static</code> option, whether through the <code>value</code> attribute or code such as <code>el.value = 'x'</code>, is rejected: <code>value</code> is cleared to <code>undefined</code>, and <code>optionSelected</code> to <code>undefined</code>, or to an empty array in <code>multiSelect</code> mode. A value matching a <code>hidden</code> option is still applied.
        </p>
        <p class="note">
        <strong>Note:</strong> Adding <code>disabled</code> to the selected option doesn't currently clear the selection. To clear it, set the select's <code>value</code> to <code>undefined</code>.
        </p>
        <p class="note">
        <strong>Note:</strong> Marking all options as disabled isn't supported. Disable the component instead.
        </p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-options.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-options.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="submenus">Submenus</auro-header>
        <p>Options may be organized into nested groups by placing additional <code>&lt;auro-menu&gt;</code> elements inside the top-level <code>&lt;auro-menu&gt;</code>. Use <code>&lt;hr&gt;</code> elements to add visual dividers between groups. Nested groups receive an indent and an <code>aria-label="submenu"</code> so that screen readers can announce the grouping.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/with-submenus.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/with-submenus.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
        <p>Certain use cases may require the guest to make a selection from the component to continue the intended workflow, such as submitting a form.</p>
        <p>When the component is marked required:</p>
        <ol>
        <li>Move focus to the <code>&lt;auro-select&gt;</code> element.</li>
        <li>Activate the trigger (such as with a mouse click, tap, or key press).</li>
        <li>Navigate the list of options.</li>
        <li>
            Collapse the bib without making a selection.
            <p class="note">
            The component then shows the validation error. To resolve it, the guest continues with the following steps.
            </p>
        </li>
        <li>Activate the trigger.</li>
        <li>Navigate the list of options, marking any option as active.</li>
        <li>
            Select the active option.
            <p class="note">
            The component then removes the validation error.
            </p>
        </li>
        </ol>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="forceError">Force an error state</auro-header>
        <p>The <code>error</code> attribute can be set on the select to force the component into a <code>customError</code> validity state. When defined, the component shows its error state regardless of the current selection.</p>
        <p>The value of the <code>error</code> attribute is used as the validation error message displayed below the trigger. If <code>setCustomValidityCustomError</code> or <code>setCustomValidity</code> is also set, that value is used as the error message instead.</p>
        <p>Removing the <code>error</code> attribute clears the forced error state and re-evaluates validation normally.</p>
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
        <p>The select provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component shows the <code>setCustomValidity</code> message if it's set. Otherwise, it shows the message for the current validity state.</p>
        <ul>
        <li><strong><code>setCustomValidity</code>:</strong> Sets one error message to show for every validation error. When set, it replaces the state-specific messages.</li>
        <li><strong><code>setCustomValidityCustomError</code>:</strong> Sets the message shown while the <code>error</code> attribute puts the component into the <code>customError</code> validity state. When it isn't set, the <code>error</code> value is the message.</li>
        <li><strong><code>setCustomValidityValueMissing</code>:</strong> Sets the message shown when the component is <code>required</code> and the user leaves it empty (the <code>valueMissing</code> validity state).</li>
        </ul>
        <p>The priority order for error messages is: <code>setCustomValidity</code> &gt; state-specific property &gt; the <code>error</code> attribute value (for <code>customError</code>). Without any of these, the component shows its error state with no message text.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-validity.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noValidate">No validation</auro-header>
        <p>When the <code>noValidate</code> attribute is present, the component doesn't validate automatically when it loses focus or its value changes. Call <code>validate()</code> to validate it. This is useful when validation is handled externally or should only be triggered on form submission.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="placeholder">Placeholder</auro-header>
        <p>Use the <code>placeholder</code> attribute to set placeholder text that's displayed in the trigger before a value has been selected.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placeholder.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placeholder.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="loading">Loading</auro-header>
        <p>Use the <code>loading</code> attribute on <code>auro-menu</code> to display a loading state while menu options are being fetched. Fill the <code>loadingIcon</code> and <code>loadingText</code> slots inside the menu to provide visual feedback during the loading state.</p>
        <p>In this example, after you choose a category, the second select loads for 5 seconds before showing its options.</p>
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
        <p>Two or more <code>auro-menuoption</code> elements may share the same <code>value</code>. This is common when the <code>value</code> represents a coarser grouping than the option label, for example, several airports that all serve the same city. The component tracks the specific option a user selects, so the correct label is displayed even when the underlying <code>value</code> is duplicated.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <p>In <code>multiSelect</code> mode, options that share a <code>value</code> are tracked independently, so each can be selected and removed on its own. Selections are stored in DOM order regardless of the order in which they were chosen.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values-multiselect.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values-multiselect.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
