<auro-header level="1" id="overview">Select - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
      <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
      <auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Custom Display Value</auro-anchorlink>
      <auro-anchorlink fluid href="#noCheckmark" class="level2 body-xs">No Checkmark</auro-anchorlink>
      <auro-anchorlink fluid href="#fluid" class="level2 body-xs">Fluid</auro-anchorlink>
      <auro-anchorlink fluid href="#flexMenuWidth" class="level2 body-xs">Flex Menu Width</auro-anchorlink>
      <auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match Width</auro-anchorlink>
      <auro-anchorlink fluid href="#placement" class="level2 body-xs">Placement</auro-anchorlink>
      <auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No Flip</auro-anchorlink>
      <auro-anchorlink fluid href="#offset" class="level2 body-xs">Offset</auro-anchorlink>
      <auro-anchorlink fluid href="#shift" class="level2 body-xs">Shift</auro-anchorlink>
      <auro-anchorlink fluid href="#largeHeader" class="level2 body-xs">Large Fullscreen Header</auro-anchorlink>
      <auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#autoComplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
      <auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
      <auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable Option(s)</auro-anchorlink>
      <auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
      <auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
      <auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
      <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
      <auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
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
        <auro-header level="3" id="displayValue">Custom Display Value</auro-header>
        <p>The <code>displayValue</code> slot allows custom HTML content to be shown in place of the selected option's text when the select is not focused. This is useful for displaying icons, formatted text, or other rich content in the trigger.</p>
        <p>To always show the custom display value (even when no selection has been made), set the <code>forceDisplayValue</code> attribute on the component.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noCheckmark">Hide checkmark indicators</auro-header>
        <p>By default, the select component displays a checkmark next to the currently selected option. To hide the checkmark indicator, set the <code>nocheckmark</code> attribute on the <code>auro-menu</code> element.</p>
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
        <p>When the <code>fluid</code> attribute is present, the component will expand to 100% width of its container element. This is useful for form layouts where the select should fill the available space.</p>
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
        <p>By default, the bib width matches the trigger width. Setting the <code>flexMenuWidth</code> attribute allows the bib to size itself based on its content, which is useful when menu option text is wider than the trigger.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/flex-menu-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/flex-menu-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="matchWidth">Match Width</auro-header>
        <p>When the <code>matchWidth</code> attribute is present, the popover bib and trigger will be set to the same width. This ensures the dropdown menu appears at exactly the same width as the trigger element.</p>
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
        <p>The <code>placement</code> attribute defines the position where the dropdown bib should appear relative to the trigger. Supported values are <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, <code>bottom-start</code>, <code>top-start</code>, <code>top-end</code>, <code>right-start</code>, <code>right-end</code>, <code>bottom-end</code>, <code>left-start</code>, and <code>left-end</code>. The default value is <code>bottom-start</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placement.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placement.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noFlip">No Flip</auro-header>
        <p>When the <code>noFlip</code> attribute is present, the dropdown bib will not flip to an alternate position when there isn't enough space in the specified <code>placement</code>. By default, the bib will automatically reposition itself to remain visible within the viewport.</p>
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
        <p>The <code>offset</code> attribute defines the gap (in pixels) between the trigger element and the dropdown bib. The default value is <code>0</code>.</p>
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
        <p>When the <code>shift</code> attribute is present, the dropdown bib will shift its position to avoid being cut off by the viewport. This is useful when the bib would otherwise extend beyond the edge of the screen.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/shift.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/shift.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="largeHeader">Large Fullscreen Header</auro-header>
        <p>When the <code>largeFullscreenHeadline</code> attribute is present, the headline displayed in the fullscreen bib will render in the larger <code>HeadingDisplay</code> style. By default, the fullscreen headline uses <code>Heading 600</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/large-fullscreen-headline.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/large-fullscreen-headline.html) -->
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
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>The component may be restyled by changing the values of the following token(s) for the dropown, input and menu</p>
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
        <p>The <code>autocomplete</code> attribute enables browser autofill support for the select element. When set, the browser may offer saved values for the field based on the specified autocomplete token (e.g. <code>country-name</code> for country selection).</p>
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
        <auro-header level="3" id="disableComponent">Disable Component</auro-header>
        <p>The entire component may be disabled. When disabled, the component will render to reflect the state, may not receive focus nor react to any key or pointer events.</p>
        <p>When the component is disabled and part of a form, the components value is still included in the form submission.</p>
        <p class="note">
        <strong>Note:</strong> If the component is marked as both <strong>invalid</strong> and <code>disabled</code>, the <strong>invalid</strong> state UI/UX and functional behavior are ignored. The <code>disabled</code> UI/UX and functional behavior works normally.
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
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-options.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-options.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
        <p>Certain use cases may require the guest to make a selection from the component in order to continue the intended work flow (e.g. form submission).</p>
        <p>When the component is marked required:</p>
        <ol>
        <li>Move focus to the auro-select element</li>
        <li>Activate the trigger (e.g. mouse click, tap or keyboard event)</li>
        <li>Navigate the list of options</li>
        <li>
            Collapse the bib without making a selection
            <p class="note">
            This will re-render the component in a state reflecting the validation error. To resolve the error, the guest may continue to the following steps.
            </p>
        </li>
        <li>Activate the trigger</li>
        <li>Navigate the list of options marking any option as active</li>
        <li>
            Select the active option
            <p class="note">
            This will re-render the component and the validation error state will be removed.
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
        <p>The <code>error</code> attribute can be set on the select to force the component into a <code>customError</code> validity state. When defined, the component will render in its error state regardless of the current selection.</p>
        <p>The value of the <code>error</code> attribute is used as the validation error message displayed below the trigger. If the <code>setCustomValidityCustomError</code> property is also defined, its value will be used as the error message instead.</p>
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
        <p>The select provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component checks for a state-specific message first, then falls back to the general <code>setCustomValidity</code> message.</p>
        <ul>
        <li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error. This message is used when no state-specific message is defined.</li>
        <li><strong><code>setCustomValidityCustomError</code></strong> — Displayed when the <code>error</code> attribute is set on the component, putting it into a <code>customError</code> validity state. If not defined, the value of the <code>error</code> attribute is used as the message.</li>
        <li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty (<code>valueMissing</code> validity state).</li>
        </ul>
        <p>The priority order for error messages is: state-specific property &gt; <code>setCustomValidity</code> &gt; default browser message. Default messages are provided by the browser and are pre-localized to the language the browser is running in.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-validity.html) -->
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
        <auro-header level="3" id="placeholder">Placeholder</auro-header>
        <p>Use the <code>placeholder</code> attribute to define custom placeholder text that is displayed in the trigger before a value has been selected.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placeholder.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placeholder.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
