<auro-header level="3" id="select">Select an option from the list</auro-header>
<ol>
  <li>
    Move focus to the auro-combobox element
  </li>
  <li>
    Begin typing into the input
    <div class="note">
      <p>
        The bib will not open until the user types at least one character into the input. Clicking or tapping the trigger alone does not open the bib. Once the input has a value, the user may click or tap the trigger to open or close the bib.
      </p>
      <p>
        While in desktop view the list of options will render in a dropdown style bib that appears below the trigger. The bib may render above the trigger if there is not enough space in the viewport below the trigger.
      </p>
      <p>
        While in mobile device view the list of options will appear in a fullscreen modal dialog. Focus will shift to the input field inside the dialog.
      </p>
      <p>
        As the user types, the options are filtered to show only matching results.
      </p>
    </div>
  </li>
  <li>
    Choose an option
    <div class="note">
      <p>
        The guest may navigate through the list of options to make their choice. An option may become active through pointer hover, keyboard navigation (e.g., arrow keys), or assistive technologies that emulate keyboard navigation through gestures.
      </p>
    </div>
  </li>
  <li>
    Select the option
    <div class="note">
      <p>
        Any previously selected option will be un-selected. The current active option may be selected through click, tap or keyboard events (e.g. <code>Enter</code> or <code>Tab</code> while focus is within the component).
      </p>
    </div>
  </li>
</ol>
<auro-header level="4" id="filtering">Filtering and match highlighting</auro-header>
<p>As the user types into the input, the component filters the list of options and highlights the matching text.</p>
<ol>
  <li>The typed value is compared against the text content of each option (case-insensitive). Only options whose text contains the typed value are shown; all others are hidden.</li>
  <li>Within each visible option, the portion of text that matches the typed value is wrapped in <code>&lt;strong&gt;</code> tags to visually emphasize the match.</li>
  <li>If no options match the typed value, the bib is hidden. However, if a <code>nomatch</code> option is defined, it will be displayed instead.</li>
</ol>
<p>The following option attributes modify filtering behavior:</p>
<ul>
  <li><strong><code>suggest</code></strong> — Provides additional text to match against beyond the option's visible text content. For example, an option displaying "Oranges" with <code>suggest="apples"</code> will also match when the user types "apples".</li>
  <li><strong><code>persistent</code></strong> — The option is always shown regardless of the current filter value.</li>
  <li><strong><code>static</code></strong> — The option is always hidden from filtered results and only shown when the input is empty.</li>
  <li><strong><code>nomatch</code></strong> — The option is shown only when no other options match the typed value (e.g., "No results found").</li>
</ul>
<div class="note">
  <strong>Note:</strong> Filtering can be disabled entirely by setting the <code>noFilter</code> attribute on the combobox. When <code>noFilter</code> is set, all options remain visible regardless of the typed value. Match highlighting still applies. This is useful when menu options are dynamically generated via an API call as the user types into the input, since the server is already returning only relevant results.
</div>
<auro-header level="3" id="presetValue">Preset the value</auro-header>
<p>In some cases it is necessary to preset the value of the component as part of the initial render.</p>
<p>When a value is preset, the matching option in the menu will be marked as both <code>active</code> and <code>selected</code>, and the input will display the corresponding text.</p>
<p>If a preset value does not match any option, the component value is preserved and displayed in the input, but no menu option will be marked as selected. In suggestion mode, this value is treated as valid freeform input. In filter mode, the value will fail validation if the component is <code>required</code>.</p>
<auro-header level="3" id="autocomplete">Autocomplete</auro-header>
<p>The component supports the use of <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete">autocomplete</auro-hyperlink> configuration through HTML attributes.</p>
<auro-header level="3" id="clearValue">Clear the value</auro-header>
<p>When the input has a value, a clear button will appear inside the input. Clicking or tapping the clear button will reset the component to its initial empty state.</p>
<ol>
  <li>The input value is cleared</li>
  <li>The selected option is deselected</li>
  <li>The component value is reset to <code>undefined</code></li>
  <li>The bib is closed if it was open</li>
</ol>
<div class="note">
  <strong>Note:</strong> If the component is <code>required</code>, clearing the value and moving focus away from the component will trigger validation and render the error state.
</div>
<auro-header level="3" id="skipSelection">Close the list of options without making a selection</auro-header>
<ol>
  <li>Move focus to the auro-combobox element</li>
  <li>Begin typing into the input to open the bib</li>
  <li>Navigate the list of options but do not make a selection</li>
  <li>Collapse the bib
    <div class="note">
      <p>The guest may collapse the bib without making any selection. Example methods include clicking or tapping outside of the component or hitting the <code>Escape</code> key.</p>
    </div>
  </li>
</ol>
<auro-header level="3" id="swapValues">Swap values between two comboboxes</auro-header>
<p>Two combobox instances can have their values swapped programmatically. This is a common pattern in travel search forms where the user needs to reverse origin and destination.</p>
<ol>
  <li>Select a value in one or both comboboxes</li>
  <li>Click the swap button between them
    <div class="note">
      <p>The values of the two comboboxes are exchanged. Each combobox updates its input and selected option to reflect the other's previous value.</p>
    </div>
  </li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/swap-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.js) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="viewport">Change Viewport Size</auro-header>
<p>The guest may change the size of their viewport (e.g. resize their desktop browser window, rotate their mobile device). In some cases, this may cause a re-render of the component while the option list is expanded. It is possible that the viewport size change will cause the option list to change from a popover bib to a fullscreen modal or vice versa while the bib is open.</p>
<auro-header level="4" id="us9a">Popover to Modal</auro-header>
<p>While in a popover display state with the bib open, focus will be on the input. After switching to the fullscreen modal dialog, focus will move to the input field inside the dialog.</p>
<auro-header level="4" id="us9b">Modal to Popover</auro-header>
<p>While in a fullscreen modal display state with the bib open, focus will be on the input field inside the dialog. After switching to the popover, focus will move to the trigger input.</p>
