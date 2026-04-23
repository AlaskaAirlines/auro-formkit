  <auro-header level="3" id="inputType">Input type formatting</auro-header>
  <p>The <code>type</code> attribute can be set on the combobox to apply input formatting and validation to the trigger input. This is passed directly to the underlying <code>auro-input</code> element.</p>
  <p>Supported types:</p>
  <ul>
    <li><strong><code>credit-card</code></strong> — Applies credit card number formatting with automatic grouping (e.g., <code>4147 2000 0000 0000</code>).</li>
    <li><strong><code>number</code></strong> — Restricts input to numeric values.</li>
    <li><strong><code>email</code></strong> — Applies email validation.</li>
    <li><strong><code>password</code></strong> — Masks the input value.</li>
    <li><strong><code>tel</code></strong> — Applies telephone number formatting.</li>
  </ul>
  <p>For date formatting, use the <code>type="date"</code> attribute. The default format is <code>MM/DD/YYYY</code>. Alternative date formats can be specified with the <code>format</code> attribute (e.g., <code>format="MM/YYYY"</code>).</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/type_tel.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_tel.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>
  <auro-header level="3" id="inputMode">Set the input mode</auro-header>
  <p>The <code>inputmode</code> attribute controls the virtual keyboard displayed on mobile devices when the input is focused. This is passed directly to the underlying HTML <code>input</code> element via the <code>inputmode</code> attribute.</p>
  <p>Supported values include <code>text</code>, <code>numeric</code>, <code>decimal</code>, <code>tel</code>, <code>email</code>, <code>url</code>, <code>search</code>, and <code>none</code>. See the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode">MDN inputmode reference</auro-hyperlink> for details on each mode.</p>
  <p>When the <code>type</code> attribute is set to <code>credit-card</code>, <code>tel</code>, <code>date</code>, or <code>number</code>, the input mode defaults to <code>numeric</code> if not explicitly set. For all other types the browser default applies.</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>
  <auro-header level="3" id="checkmarks">Checkmark indicators on selected options</auro-header>
  <p>By default, the combobox does not display checkmarks on selected options. To show a checkmark next to the currently selected option, set the <code>checkmark</code> attribute on the combobox.</p>
  <p>When <code>checkmark</code> is not set, the <code>nocheckmark</code> attribute is applied to the menu internally, hiding the checkmark indicator.</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checkmark.html) -->
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
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-option.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-option.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>
  <auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
  <p>Certain use cases may require the guest to make a selection from the component in order to continue the intended work flow (e.g. form submission).</p>
  <p>The validation behavior when the component is marked <code>required</code> depends on the <code>behavior</code> mode:</p>
  <ul>
    <li><strong>Suggestion mode (default):</strong> Any typed input satisfies the <code>required</code> constraint. The user does not need to select a menu option — typing a value is sufficient.</li>
    <li><strong>Filter mode (<code>behavior="filter"</code>):</strong> The user must select an option from the menu. Typed input alone does not satisfy the <code>required</code> constraint.</li>
  </ul>
  <p>When using filter mode and the component is marked required:</p>
  <ol>
    <li>Move focus to the auro-combobox element</li>
    <li>Begin typing into the input to open the bib</li>
    <li>Navigate the list of options</li>
    <li>
      Collapse the bib without making a selection
      <p class="note">
        <p>This will re-render the component in a state reflecting the validation error. To resolve the error, the guest may continue to the following steps.</p>
      </p>
    </li>
    <li>Activate the trigger</li>
    <li>Navigate the list of options marking any option as active</li>
    <li>
      Select the active option
      <p class="note">
        <p>This will re-render the component and the validation error state will be removed.</p>
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
  <p>The <code>error</code> attribute can be set on the combobox to force the component into a <code>customError</code> validity state. When defined, the component will render in its error state regardless of the current input or selection.</p>
  <p>The value of the <code>error</code> attribute is used as the validation error message displayed below the input. If the <code>setCustomValidityCustomError</code> property is also defined, its value will be used as the error message instead.</p>
  <p>Setting the <code>error</code> attribute also propagates the error state to the underlying <code>auro-input</code> element. Removing the <code>error</code> attribute clears the forced error state and re-evaluates validation normally.</p>
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
  <p>The combobox provides several properties to customize the error messages displayed for different validation states. When a validation error occurs, the component checks for a state-specific message first, then falls back to the general <code>setCustomValidity</code> message.</p>
  <ul>
    <li><strong><code>setCustomValidity</code></strong> — Sets a fallback error message displayed for any validation error. This message is used when no state-specific message is defined.</li>
    <li><strong><code>setCustomValidityCustomError</code></strong> — Displayed when the <code>error</code> attribute is set on the component, putting it into a <code>customError</code> validity state. If not defined, the value of the <code>error</code> attribute is used as the message.</li>
    <li><strong><code>setCustomValidityValueMissing</code></strong> — Displayed when the component is <code>required</code> and the user leaves it empty (<code>valueMissing</code> validity state).</li>
    <li><strong><code>setCustomValidityValueMissingFilter</code></strong> — Displayed when <code>behavior="filter"</code> and the user types into the input but does not select a menu option. This is a more specific <code>valueMissing</code> state that indicates the user needs to choose from the available options, not just type a value.</li>
  </ul>
  <p>The priority order for error messages is: state-specific property &gt; <code>setCustomValidity</code> &gt; default browser message. Default messages are provided by the browser and are pre-localized to the language the browser is running in.</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-validity-message.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-validity-message.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>
  <auro-header level="3" id="displayValue">Custom display value</auro-header>
  <p>Menu options may include a <code>displayValue</code> slot to define custom HTML content that is shown in the trigger input when that option is selected and the input is not focused. This allows the trigger to render different content for the selected value than what is displayed for the option in the menu.</p>
  <p>When the user focuses the input to type, the custom display value is hidden and the standard text input is shown. When focus leaves the input, the custom display value reappears.</p>
  <p>To define a custom display value, add a <code>slot="displayValue"</code> element inside the <code>auro-menuoption</code>:</p>
  <pre class="language-html">
    <code class="language-html">
&lt;auro-menuoption value="SEA"&gt;
  Seattle (SEA)
  &lt;span slot="displayValue"&gt;
    SEA
  &lt;/span&gt;
&lt;/auro-menuoption&gt;
    </code>
  </pre>
  <p class="note">
    <strong>Note:</strong> The <code>displayValue</code> slot only works with the <code>snowflake</code> and <code>emphasized</code> layouts. By default, the display value masks both the input and label. Set the <code>dvInputOnly</code> attribute on the combobox to only mask the input, leaving the label visible.
  </p>
  <div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/display-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>
  <auro-header level="3" id="dynamicMenu">Dynamically generated menu options</auro-header>
  <p>The combobox supports dynamically populating menu options based on what the user types. This is useful for API-driven scenarios such as airport search, address lookup, or any case where the full set of options is not known ahead of time.</p>
  <ol>
    <li>Listen for the <code>inputValue</code> event on the combobox to receive the current typed value</li>
    <li>Set the <code>loading</code> attribute on the <code>auro-menu</code> while the API request is in progress. This keeps the bib open and displays a loading indicator if one is defined. To display a loading indicator, the menu must contain slotted content for <code>loadingText</code> and/or <code>loadingIcon</code>:
      <pre class="language-html">
        <code class="language-html">
&lt;auro-menu loading&gt;
  &lt;span slot="loadingText"&gt;Searching...&lt;/span&gt;
  &lt;span slot="loadingIcon"&gt;
    &lt;auro-loader orbit sm&gt;&lt;/auro-loader&gt;
  &lt;/span&gt;
&lt;/auro-menu&gt;
        </code>
      </pre>
        <p>If neither slot is provided, the bib will be hidden while loading and will reopen automatically when the <code>loading</code> attribute is removed and options are available.</p>
      </p>
    </li>
    <li>When the API response is received, replace the <code>auro-menuoption</code> elements inside the menu with the new results and remove the <code>loading</code> attribute</li>
  </ol>
  <p class="note">
    <strong>Note:</strong> When using dynamically generated options, set the <code>noFilter</code> attribute on the combobox so the component does not apply its own client-side filtering on top of the server-provided results.
  </p>
  <auro-header level="3" id="bibPlacement">Set bib placement</auro-header>
  <p>The <code>placement</code> attribute controls where the bib appears relative to the trigger. The default placement is <code>bottom-start</code>.</p>
  <p>Supported values:</p>
  <ul>
    <li><code>top</code>, <code>top-start</code>, <code>top-end</code></li>
    <li><code>right</code>, <code>right-start</code>, <code>right-end</code></li>
    <li><code>bottom</code>, <code>bottom-start</code>, <code>bottom-end</code></li>
    <li><code>left</code>, <code>left-start</code>, <code>left-end</code></li>
  </ul>
  <p>When the <code>autoPlacement</code> attribute is set, the bib will automatically calculate the best position to appear based on available viewport space, overriding the <code>placement</code> value.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/placement.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placement.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>
  <auro-header level="3" id="noFlip">Prevent bib from flipping position</auro-header>
  <p>The bib defaults to <code>bottom-start</code> placement, rendering below and aligned to the start of the trigger. When there is not enough space in the viewport below the trigger, the bib will automatically flip to appear above it. Setting the <code>noFlip</code> attribute on the combobox prevents this behavior, keeping the bib anchored to its configured <code>placement</code> regardless of available space.</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noflip.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noflip.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>