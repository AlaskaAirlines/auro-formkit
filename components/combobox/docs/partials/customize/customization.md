  <auro-header level="3" id="inputType">Input type formatting</auro-header>
  <p>Set the <code>type</code> attribute to add formatting and validation to the combobox's input. The combobox passes it to its inner <code>auro-input</code> element.</p>
  <p>Supported types:</p>
  <ul>
    <li><strong><code>credit-card</code></strong>: Applies credit card number formatting with automatic grouping, such as <code>4147 2000 0000 0000</code>.</li>
    <li><strong><code>number</code></strong>: Restricts input to numeric values.</li>
    <li><strong><code>email</code></strong>: Applies email validation.</li>
    <li><strong><code>password</code></strong>: Masks the input value.</li>
    <li><strong><code>tel</code></strong>: Applies telephone number formatting.</li>
  </ul>
  <p>For date formatting, use the <code>type="date"</code> attribute. The default format depends on the locale, such as <code>MM/DD/YYYY</code> for the default <code>en-US</code> locale. Set a different format with the <code>format</code> attribute, such as <code>format="MM/YYYY"</code>, but <code>format</code> currently applies only to the input in the fullscreen bib, not the trigger input.</p>
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
  <p>The <code>inputmode</code> attribute controls the virtual keyboard displayed on mobile devices when the input is focused. The combobox passes it to the inner <code>&lt;input&gt;</code> element's <code>inputmode</code> attribute.</p>
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
  <p>By default, the combobox doesn't display checkmarks on selected options. To show a checkmark next to the currently selected option, set the <code>checkmark</code> attribute on the combobox.</p>
  <p>When <code>checkmark</code> isn't set, the combobox applies the <code>nocheckmark</code> attribute to the menu, hiding the checkmark indicator.</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checkmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>
  <auro-header level="3" id="disableComponent">Disable the component</auro-header>
  <p>Set <code>disabled</code> to turn off the entire component. A disabled combobox is shown in a disabled style, can't receive focus, and doesn't respond to the keyboard or pointer.</p>
  <p>When a disabled combobox is inside an <code>auro-form</code>, the form leaves its value out of the form's value and validation.</p>
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
  <auro-header level="3" id="disableOptions">Disable options</auro-header>
  <p>The component can render one or more <code>disabled</code> options. When the user moves the active option with the keyboard or a screen reader, disabled options are skipped and the next enabled option becomes active.</p>
  <p>When the user hovers over a disabled option with a pointer, nothing happens and the previous active option stays active.</p>
  <p class="note">
    <strong>Note:</strong> Setting the component <code>value</code> to one that matches a <code>disabled</code> or <code>static</code> option is rejected, whether you use the <code>value</code> attribute or set the property in JavaScript, such as <code>el.value = 'Grapes'</code>. The component clears <code>value</code> and <code>optionSelected</code> to <code>undefined</code>. A value matching a <code>hidden</code> option is still applied.
  </p>
  <p class="note">
    <strong>Note:</strong> Disabling the selected option doesn't currently clear <code>value</code> or <code>optionSelected</code>.
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
  <auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
  <p>Some flows need the user to make a selection before they can continue, such as submitting a form.</p>
  <p>The validation behavior when the component is marked <code>required</code> depends on the <code>behavior</code> mode:</p>
  <ul>
    <li><strong>Suggestion mode (default):</strong> Any typed input satisfies the <code>required</code> constraint. The user doesn't need to select a menu option. Typing a value is enough.</li>
    <li><strong>Filter mode (<code>behavior="filter"</code>):</strong> The user must select an option from the menu. Typed input alone doesn't satisfy the <code>required</code> constraint.</li>
  </ul>
  <p>When using filter mode and the component is marked <code>required</code>:</p>
  <ol>
    <li>Move focus to the <code>auro-combobox</code> element</li>
    <li>Begin typing into the input to open the bib</li>
    <li>Navigate the list of options</li>
    <li>
      Collapse the bib without making a selection
      <p class="note">
        <p>The component shows the validation error. To clear the error, continue with the following steps.</p>
      </p>
    </li>
    <li>Activate the trigger</li>
    <li>Navigate the list of options marking any option as active</li>
    <li>
      Select the active option
      <p class="note">
        <p>The validation error clears.</p>
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
  <p>Set the <code>error</code> attribute on the combobox to force the component into a <code>customError</code> validity state. While <code>error</code> is set, the component shows its error state regardless of the current input or selection.</p>
  <p>The value of the <code>error</code> attribute is the error message displayed below the input. If <code>setCustomValidityCustomError</code> is also set, its value is the error message instead, and <code>setCustomValidity</code> replaces both when it's set.</p>
  <p>Setting the <code>error</code> attribute also passes the error state to the inner <code>auro-input</code> element. Removing the <code>error</code> attribute clears the forced error state and validates the component again.</p>
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
  <p>The combobox provides several properties to customize the error messages displayed for different validation states.</p>
  <ul>
    <li><strong><code>setCustomValidity</code></strong>: Replaces the message for every validation error, except the filter-mode message from <code>setCustomValidityValueMissingFilter</code>. When <code>setCustomValidityValueMissingFilter</code> isn't set, it's also used for that message.</li>
    <li><strong><code>setCustomValidityCustomError</code></strong>: Displayed when the <code>error</code> attribute is set on the component, putting it into a <code>customError</code> validity state. If not defined, the value of the <code>error</code> attribute is used as the message.</li>
    <li><strong><code>setCustomValidityValueMissing</code></strong>: Displayed when the component is <code>required</code> and the user leaves it empty (<code>valueMissing</code> validity state).</li>
    <li><strong><code>setCustomValidityValueMissingFilter</code></strong>: Displayed when <code>behavior="filter"</code> and the user types into the input but doesn't select a menu option. This is a more specific <code>valueMissing</code> state that tells the user to choose from the available options, not just type a value.</li>
  </ul>
  <p>When <code>setCustomValidity</code> isn't set, the component shows the state-specific message, or the browser's default message if there isn't one. Default messages come from the browser and are already localized to the browser's language.</p>
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
  <p>Menu options may include a <code>displayValue</code> slot to define custom HTML content that is shown in the trigger input when that option is selected and the input isn't focused. This allows the trigger to render different content for the selected value than what is displayed for the option in the menu.</p>
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
  <p>The combobox supports dynamically populating menu options based on what the user types. Use it for API-driven scenarios such as airport search, address lookup, or any case where the full set of options isn't known ahead of time.</p>
  <ol>
    <li>Listen for the <code>inputValue</code> event on the combobox to receive the current typed value</li>
    <li>Set the <code>loading</code> attribute on the <code>auro-menu</code> while the API request is in progress. This keeps the bib open and displays a loading indicator if one is defined. To display a loading indicator, the menu must contain slotted content for <code>loadingText</code>, <code>loadingIcon</code>, or both:
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
        <p>If neither slot is provided, the bib hides while loading and reopens when the <code>loading</code> attribute is removed, as long as focus is still in the combobox.</p>
      </p>
    </li>
    <li>When the API response is received, replace the <code>auro-menuoption</code> elements inside the menu with the new results and remove the <code>loading</code> attribute</li>
  </ol>
  <p class="note">
    <strong>Note:</strong> When using dynamically generated options, set the <code>noFilter</code> attribute on the combobox so the component doesn't apply its own client-side filtering on top of the server-provided results.
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
  <p>The bib defaults to <code>bottom-start</code> placement, rendering below and aligned to the start of the trigger. When there isn't enough space in the viewport below the trigger, the bib flips to appear above it. Set the <code>noFlip</code> attribute on the combobox to keep the bib in its configured <code>placement</code> regardless of available space.</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noflip.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noflip.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </auro-accordion>