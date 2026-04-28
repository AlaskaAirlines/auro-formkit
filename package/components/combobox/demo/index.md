<auro-header level="1" id="overview">Combobox - Overview and UX Guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User Stories</auro-anchorlink>
<auro-anchorlink fluid href="#select" class="level2 body-xs">Select an Option</auro-anchorlink>
<auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset Value</auro-anchorlink>
<auro-anchorlink fluid href="#autocomplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
<auro-anchorlink fluid href="#clearValue" class="level2 body-xs">Clear Value</auro-anchorlink>
<auro-anchorlink fluid href="#skipSelection" class="level2 body-xs">Skip Selection</auro-anchorlink>
<auro-anchorlink fluid href="#swapValues" class="level2 body-xs">Swap Values</auro-anchorlink>
<auro-anchorlink fluid href="#viewport" class="level2 body-xs">Viewport Size</auro-anchorlink>
<auro-anchorlink fluid href="#customization">Customization</auro-anchorlink>
<auro-anchorlink fluid href="#inputType" class="level2 body-xs">Input Type</auro-anchorlink>
<auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
<auro-anchorlink fluid href="#checkmarks" class="level2 body-xs">Checkmarks</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
<auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable Option(s)</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
<auro-anchorlink fluid href="#displayValue" class="level2 body-xs">Display Value</auro-anchorlink>
<auro-anchorlink fluid href="#dynamicMenu" class="level2 body-xs">Dynamic Menu</auro-anchorlink>
<auro-anchorlink fluid href="#bibPlacement" class="level2 body-xs">Bib Placement</auro-anchorlink>
<auro-anchorlink fluid href="#noFlip" class="level2 body-xs">No Flip</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<p><code>&lt;auro-combobox&gt;</code> combines a text input with a filterable dropdown menu, letting users either type a value or pick one from a list. As the user types, the menu narrows to show only matching options.</p>
<p>The component supports two modes:</p>
<ul>
<li><strong>Suggestion (default)</strong> — The user may type any value. The menu provides suggestions but does not restrict input.</li>
<li><strong>Filter</strong> — The user must select from the menu. Typing filters the available options but does not set the component's value. The value is only set when a menu option is selected.</li>
</ul>
<p>Common use cases:</p>
<ul>
<li><strong>Airport or city search</strong> — Type a city name or airport code to filter a long list of destinations.</li>
<li><strong>Country or region selection</strong> — Quickly find and select from a large set of geographic options.</li>
<li><strong>Autocomplete fields</strong> — Provide type-ahead suggestions for form fields where the set of valid values is known.</li>
<li><strong>Search with suggestions</strong> — Offer recommended results while still allowing freeform input.</li>
</ul>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-combobox>
<span slot="ariaLabel.bib.close">Close combobox</span>
<span slot="ariaLabel.input.clear">Clear All</span>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close combobox&lt;/span&gt;
  &lt;span slot="ariaLabel.input.clear"&gt;Clear All&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<section>
<auro-header level="2" id="userStories">User Stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/userStories.md -->
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
<!-- The below content is automatically added from ./../apiExamples/swap-value.html -->
<div id="swapExample">
<auro-combobox id="swapExampleLeft">
<span slot="bib.fullscreen.headline">Left Combobox Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<auro-button id="swapExampleBtn" iconOnly>
<auro-icon
customColor
category="terminal" 
name="round-trip-arrows">
</auro-icon>
</auro-button>
<auro-combobox id="swapExampleRight">
<span slot="bib.fullscreen.headline">Right Combobox Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
</div>
<style>
#swapExample {
display: flex;
flex-direction: row;
align-items: center;
}
#swapExampleLeft,
#swapExampleRight {
flex: 1;
}
#swapExampleBtn {
margin: 0 5px;
}
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/swap-value.html -->
<pre class="language-html"><code class="language-html">&lt;div id="swapExample"&gt;
  &lt;auro-combobox id="swapExampleLeft"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Left Combobox Header&lt;/span&gt;
    &lt;span slot="label"&gt;Name&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
  &lt;auro-button id="swapExampleBtn" iconOnly&gt;
    &lt;auro-icon
      customColor
      category="terminal" 
      name="round-trip-arrows"&gt;
    &lt;/auro-icon&gt;
  &lt;/auro-button&gt;
  &lt;auro-combobox id="swapExampleRight"&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Right Combobox Header&lt;/span&gt;
    &lt;span slot="label"&gt;Name&lt;/span&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
      &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-combobox&gt;
&lt;/div&gt;
&lt;style&gt;
  #swapExample {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #swapExampleLeft,
  #swapExampleRight {
    flex: 1;
  }
  #swapExampleBtn {
    margin: 0 5px;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/swap-value.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/swap-value.js -->
<pre class="language-js"><code class="language-js">export function swapValueExample() {
  const btn = document.querySelector('#swapExampleBtn');
  const comboboxOne = document.querySelector('#swapExampleLeft');
  const comboboxTwo = document.querySelector('#swapExampleRight');
​
  btn.addEventListener('click', () =&gt; {
    const valueOne = comboboxOne.value;
    const valueTwo = comboboxTwo.value;
​
    comboboxOne.value = valueTwo;
    comboboxTwo.value = valueOne;
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="viewport">Change Viewport Size</auro-header>
<p>The guest may change the size of their viewport (e.g. resize their desktop browser window, rotate their mobile device). In some cases, this may cause a re-render of the component while the option list is expanded. It is possible that the viewport size change will cause the option list to change from a popover bib to a fullscreen modal or vice versa while the bib is open.</p>
<auro-header level="4" id="us9a">Popover to Modal</auro-header>
<p>While in a popover display state with the bib open, focus will be on the input. After switching to the fullscreen modal dialog, focus will move to the input field inside the dialog.</p>
<auro-header level="4" id="us9b">Modal to Popover</auro-header>
<p>While in a fullscreen modal display state with the bib open, focus will be on the input field inside the dialog. After switching to the popover, focus will move to the trigger input.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="customization">Customization</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customization.md) -->
<!-- The below content is automatically added from ./../docs/partials/customization.md -->
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
<!-- The below content is automatically added from ./../apiExamples/type_tel.html -->
<auro-combobox type="tel">
<span slot="bib.fullscreen.headline">Phone Number</span>
<span slot="label">Phone Number</span>
<auro-menu>
<auro-menuoption value="+1 (206) 555-1234" id="option-tel-0">+1 (206) 555-1234</auro-menuoption>
<auro-menuoption value="+1 (425) 555-9876" id="option-tel-1">+1 (425) 555-9876</auro-menuoption>
<auro-menuoption value="+1 (360) 555-4321" id="option-tel-2">+1 (360) 555-4321</auro-menuoption>
<auro-menuoption value="+1 (509) 555-6789" id="option-tel-3">+1 (509) 555-6789</auro-menuoption>
<auro-menuoption static nomatch>No matching number</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/type_tel.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/type_tel.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox type="tel"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Phone Number&lt;/span&gt;
  &lt;span slot="label"&gt;Phone Number&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="+1 (206) 555-1234" id="option-tel-0"&gt;+1 (206) 555-1234&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="+1 (425) 555-9876" id="option-tel-1"&gt;+1 (425) 555-9876&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="+1 (360) 555-4321" id="option-tel-2"&gt;+1 (360) 555-4321&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="+1 (509) 555-6789" id="option-tel-3"&gt;+1 (509) 555-6789&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching number&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="inputMode">Set the input mode</auro-header>
<p>The <code>inputmode</code> attribute controls the virtual keyboard displayed on mobile devices when the input is focused. This is passed directly to the underlying HTML <code>input</code> element via the <code>inputmode</code> attribute.</p>
<p>Supported values include <code>text</code>, <code>numeric</code>, <code>decimal</code>, <code>tel</code>, <code>email</code>, <code>url</code>, <code>search</code>, and <code>none</code>. See the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode">MDN inputmode reference</auro-hyperlink> for details on each mode.</p>
<p>When the <code>type</code> attribute is set to <code>credit-card</code>, <code>tel</code>, <code>date</code>, or <code>number</code>, the input mode defaults to <code>numeric</code> if not explicitly set. For all other types the browser default applies.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
<auro-combobox inputmode="numeric">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="1" id="option-0">1</auro-menuoption>
<auro-menuoption value="2" id="option-1">2</auro-menuoption>
<auro-menuoption value="3" id="option-2">3</auro-menuoption>
<auro-menuoption value="4" id="option-3">4</auro-menuoption>
<auro-menuoption value="5" id="option-4">5</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox inputmode="numeric"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="1" id="option-0"&gt;1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="2" id="option-1"&gt;2&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="3" id="option-2"&gt;3&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="4" id="option-3"&gt;4&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="5" id="option-4"&gt;5&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="checkmarks">Checkmark indicators on selected options</auro-header>
<p>By default, the combobox does not display checkmarks on selected options. To show a checkmark next to the currently selected option, set the <code>checkmark</code> attribute on the combobox.</p>
<p>When <code>checkmark</code> is not set, the <code>nocheckmark</code> attribute is applied to the menu internally, hiding the checkmark indicator.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/checkmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/checkmark.html -->
<auro-combobox checkmark>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/checkmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/checkmark.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox checkmark&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
    &lt;span slot="label"&gt;Name&lt;/span&gt;
    &lt;auro-menu&gt;
        &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
        &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-combobox disabled>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox disabled&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/disabled-option.html -->
<auro-combobox>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1" disabled>Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4" disabled>Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-option.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-option.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1" disabled&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4" disabled&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-combobox required>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox required&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Prefer Alaska" id="option-5"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force an error state</auro-header>
<p>The <code>error</code> attribute can be set on the combobox to force the component into a <code>customError</code> validity state. When defined, the component will render in its error state regardless of the current input or selection.</p>
<p>The value of the <code>error</code> attribute is used as the validation error message displayed below the input. If the <code>setCustomValidityCustomError</code> property is also defined, its value will be used as the error message instead.</p>
<p>Setting the <code>error</code> attribute also propagates the error state to the underlying <code>auro-input</code> element. Removing the <code>error</code> attribute clears the forced error state and re-evaluates validation normally.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-combobox error="Custom error message">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox error="Custom error message"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Prefer Alaska" id="option-5"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/custom-validity-message.html -->
<auro-combobox required setCustomValidityValueMissing="Custom value missing message.">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-validity-message.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-validity-message.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox required setCustomValidityValueMissing="Custom value missing message."&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Prefer Alaska" id="option-5"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/display-value.html -->
<auro-combobox layout="snowflake" shape="snowflake" size="xl" appearance="inverse" value="Apples">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">
Apples
<span slot="displayValue">🍎</span>
</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">
Oranges
<span slot="displayValue">🍊</span>
</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">
Peaches
<span slot="displayValue">🍑</span>
</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">
Grapes
<span slot="displayValue">🍇</span>
</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">
Cherries
<span slot="displayValue">🍒</span>
</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/display-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/display-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox layout="snowflake" shape="snowflake" size="xl" appearance="inverse" value="Apples"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;
      Apples
      &lt;span slot="displayValue"&gt;🍎&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;
      Oranges
      &lt;span slot="displayValue"&gt;🍊&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;
      Peaches
      &lt;span slot="displayValue"&gt;🍑&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;
      Grapes
      &lt;span slot="displayValue"&gt;🍇&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;
      Cherries
      &lt;span slot="displayValue"&gt;🍒&lt;/span&gt;
    &lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/placement.html -->
<auro-combobox placement="top-start">
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<span slot="helpText">Bib placed above the trigger</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/placement.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/placement.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox placement="top-start"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Bib placed above the trigger&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noFlip">Prevent bib from flipping position</auro-header>
<p>The bib defaults to <code>bottom-start</code> placement, rendering below and aligned to the start of the trigger. When there is not enough space in the viewport below the trigger, the bib will automatically flip to appear above it. Setting the <code>noFlip</code> attribute on the combobox prevents this behavior, keeping the bib anchored to its configured <code>placement</code> regardless of available space.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/noflip.html) -->
<!-- The below content is automatically added from ./../apiExamples/noflip.html -->
<auro-combobox noFlip>
<span slot="bib.fullscreen.headline">Bib Header</span>
<span slot="label">Name</span>
<span slot="helpText">Bib will not flip position</span>
<auro-menu>
<auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
<auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
<auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
<auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
<auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
<auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
</auro-combobox>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/noflip.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/noflip.html -->
<pre class="language-html"><code class="language-html">&lt;auro-combobox noFlip&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib Header&lt;/span&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Bib will not flip position&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="Apples" id="option-0"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Oranges" id="option-1"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Peaches" id="option-2"&gt;Peaches&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Grapes" id="option-3"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="Cherries" id="option-4"&gt;Cherries&lt;/auro-menuoption&gt;
    &lt;auro-menuoption static nomatch&gt;No matching option&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-combobox&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
