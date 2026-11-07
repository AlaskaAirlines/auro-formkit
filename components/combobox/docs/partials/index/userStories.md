<auro-header level="3" id="select">Select an option from the list</auro-header>
<ol>
  <li>
    Move focus to the <code>auro-combobox</code> element
  </li>
  <li>
    Begin typing into the input
    <div class="note">
      <p>
        The bib doesn't open until the user types at least one character into the input. Clicking or tapping the trigger alone doesn't open the bib. Once the input has a value, the user may click or tap the trigger to open or close the bib.
      </p>
      <p>
        In desktop view, the list of options renders in a dropdown-style bib that appears below the trigger. The bib may render above the trigger if there isn't enough space in the viewport below the trigger.
      </p>
      <p>
        In mobile device view, the list of options appears in a fullscreen modal dialog, and focus moves to the input field inside the dialog.
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
        The user may move through the list of options to make their choice. An option becomes active through pointer hover, keyboard navigation (such as the arrow keys), or screen reader gestures that emulate keyboard navigation.
      </p>
    </div>
  </li>
  <li>
    Select the option
    <div class="note">
      <p>
        Selecting an option deselects any previously selected option. The user can select the active option with a click, a tap, or the keyboard, such as <code>Enter</code> or <code>Tab</code> while focus is within the component.
      </p>
    </div>
  </li>
</ol>
<auro-header level="4" id="filtering">Filtering and match highlighting</auro-header>
<p>As the user types into the input, the component filters the list of options and highlights the matching text.</p>
<ol>
  <li>The typed value is compared against the text content of each option (case-insensitive). Only options whose text contains the typed value are shown; all others are hidden.</li>
  <li>Within each visible option, the portion of text that matches the typed value is wrapped in <code>&lt;strong&gt;</code> tags to visually emphasize the match.</li>
  <li>If no options match the typed value, the bib is hidden. However, if a <code>nomatch</code> option is defined, it's displayed instead.</li>
</ol>
<p>The following option attributes modify filtering behavior:</p>
<ul>
  <li><strong><code>suggest</code></strong>: Provides additional text to match against beyond the option's visible text content. For example, an option displaying "Oranges" with <code>suggest="apples"</code> also matches when the user types "apples".</li>
  <li><strong><code>persistent</code></strong>: The option is always shown regardless of the current filter value.</li>
  <li><strong><code>static</code></strong>: The option is always hidden from filtered results and only shown when the input is empty.</li>
  <li><strong><code>nomatch</code></strong>: The option is shown only when no other options match the typed value, such as "No results found".</li>
</ul>
<div class="note">
  <strong>Note:</strong> Filtering can be disabled entirely by setting the <code>noFilter</code> attribute on the combobox. When <code>noFilter</code> is set, all options remain visible regardless of the typed value. Match highlighting still applies. This is useful when menu options are dynamically generated through an API call as the user types into the input, since the server is already returning only relevant results.
</div>
<auro-header level="3" id="presetValue">Preset the value</auro-header>
<p>To show a value when the component first renders, preset its <code>value</code>.</p>
<p>When a value is preset, the matching option in the menu is marked as both <code>active</code> and <code>selected</code>, and the input displays the corresponding text.</p>
<p>If a preset value matches an option marked <code>disabled</code> or <code>static</code>, the selection is rejected: <code>value</code> and <code>optionSelected</code> are cleared to <code>undefined</code>. A value that matches a <code>hidden</code> option is still applied.</p>
<p>If a preset value doesn't match any option, the component value is preserved and displayed in the input, but no menu option is marked as selected. In suggestion mode, this value is treated as valid freeform input. In filter mode, the value fails validation with <code>valueMissing</code>, whether or not the component is <code>required</code>.</p>
<auro-header level="3" id="autocomplete">Autocomplete</auro-header>
<p>The component supports the use of <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete">autocomplete</auro-hyperlink> configuration through HTML attributes.</p>
<auro-header level="3" id="clearValue">Clear the value</auro-header>
<p>When the input has a value, a clear button appears inside the input. Clicking or tapping the clear button resets the component to its initial empty state.</p>
<ol>
  <li>The input value is cleared</li>
  <li>The selected option is deselected</li>
  <li>The component value is reset to <code>undefined</code></li>
  <li>The bib is closed if it was open</li>
</ol>
<div class="note">
  <strong>Note:</strong> If the component is <code>required</code>, clearing the value and moving focus away from the component triggers validation and shows the error state.
</div>
<auro-header level="3" id="skipSelection">Close the list of options without making a selection</auro-header>
<ol>
  <li>Move focus to the <code>auro-combobox</code> element</li>
  <li>Begin typing into the input to open the bib</li>
  <li>Navigate the list of options but don't make a selection</li>
  <li>Collapse the bib
    <div class="note">
      <p>The user may collapse the bib without making any selection, such as by clicking or tapping outside of the component or pressing the <code>Escape</code> key.</p>
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
<auro-header level="3" id="viewport">Change viewport size</auro-header>
<p>The user may change the size of their viewport, such as by resizing a desktop browser window or rotating a mobile device. This may re-render the component while the option list is expanded, and the option list may switch from a popover bib to a fullscreen modal, or the other way around, while the bib is open.</p>
<auro-header level="4" id="us9a">Popover to modal</auro-header>
<p>While the popover bib is open, focus is on the input. After switching to the fullscreen modal dialog, focus moves to the input field inside the dialog.</p>
<auro-header level="4" id="us9b">Modal to popover</auro-header>
<p>While the fullscreen modal bib is open, focus is on the input field inside the dialog. After switching to the popover, focus moves to the trigger input.</p>
