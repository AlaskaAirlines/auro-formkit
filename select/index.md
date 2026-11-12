<auro-header level="1" id="overview">Select: Overview and UX guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User stories</auro-anchorlink>
<auro-anchorlink fluid href="#select" class="level2 body-xs">Select a value</auro-anchorlink>
<auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset value</auro-anchorlink>
<auro-anchorlink fluid href="#multiselect" class="level2 body-xs">Multi-select</auro-anchorlink>
<auro-anchorlink fluid href="#autocomplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
<auro-anchorlink fluid href="#skipSelection" class="level2 body-xs">Skip selection</auro-anchorlink>
<auro-anchorlink fluid href="#viewport" class="level2 body-xs">Viewport size</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<p>The <code>&lt;auro-select&gt;</code> element lets people choose an option from a list in a form. It's built from <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements">HTML custom elements</auro-hyperlink>: a trigger that shows the label and the current value, and an <code>&lt;auro-menu&gt;</code> of <code>&lt;auro-menuoption&gt;</code> elements that opens from the trigger. To preselect an option, set the select's <code>value</code> attribute.</p>
<p>Use it to create a dropdown list for user input within a form.</p>
<p>Key features:</p>
<ul>
<li>Preset values</li>
<li>Mark as required when in a form</li>
<li>Disable individual options or the entire component</li>
<li>Enable multi-select</li>
<li>Separate options into groups with dividers</li>
<li>Group options into nested levels</li>
<li>Browser autofill hints with <code>autocomplete</code></li>
</ul>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-select>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Select example</span>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="prefer alaska">Prefer Alaska</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Select example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="prefer alaska"&gt;Prefer Alaska&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<section>
<auro-header level="2" id="userStories">User stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/index/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/index/userStories.md -->
<auro-header level="3" id="select">Select an option from the list</auro-header>
<ol>
<li>
              Move focus to the <code>&lt;auro-select&gt;</code> element.
</li>
<li>
              Activate the trigger (such as with a mouse click, tap, or key press).
<div class="note">
<p>
                  In desktop view, the list of options opens in a bib below the trigger. If there isn't enough room in the viewport below the trigger, the bib opens above it.
</p>
<p>
                  At or below the <code>fullscreenBreakpoint</code> screen size, such as on a phone, the list of options opens in a fullscreen modal dialog, and focus moves to the dialog's close button.
</p>
</div>
</li>
<li>
              Choose an option.
<div class="note">
<p>
                  The guest may navigate through the list of options to make their choice. An option becomes active through pointer hover, keyboard navigation (such as the arrow keys), or screen reader gestures that emulate keyboard navigation.
</p>
</div>
</li>
<li>
              Select the option.
<div class="note">
<p>
                  Any previously selected option is deselected. Select the active option with a click, a tap, or a key such as <code>Enter</code> or <code>Tab</code> while focus is in the component.
</p>
</div>
</li>
</ol>
<auro-header level="3" id="presetValue">Preset the value</auro-header>
<p>In some cases, you need to preset the value of the component when it first renders.</p>
<auro-header level="4" id="us3a">Single select</auro-header>
<p>When a value is preset, the matching option is <code>selected</code>, and it becomes <code>active</code> when the bib opens.</p>
<p>When the menu already has options and a preset value doesn't match any of them, the value is reset to <code>undefined</code>. A value that matches an option marked <code>disabled</code> or <code>static</code> is also rejected and reset to <code>undefined</code>; a value matching a <code>hidden</code> option is still applied.</p>
<auro-header level="4" id="us3b">Multi-select</auro-header>
<p>When configured for multi-select, the preset value can include multiple options. The first selected option becomes <code>active</code> when the bib opens.</p>
<p>Preset values that match an option marked <code>disabled</code> or <code>static</code> are discarded. Values that match no option stay in <code>value</code>, so options added later can still be selected. If none of the preset values match a selectable option, the value is reset to <code>undefined</code>.</p>
<div class="note"><strong>Note:</strong> Choosing several options from a select is hard for many people, including screen reader users. Consider checkboxes instead, which make choosing several options easier to discover.</div>
<auro-header level="3" id="multiselect">Multi-select</auro-header>
<p>Set <code>multiSelect</code> to let people select more than one option. Only one option can be <code>active</code> at a time, but people can make several options <code>selected</code> with a click, tap, or key press on each. Selecting an already selected option again deselects it.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multi-select.html) -->
<!-- The below content is automatically added from ./../apiExamples/multi-select.html -->
<auro-select multiselect placeholder="Select one or more options">
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Bib headline</span>
<span slot="label">Multi-select example</span>
<auro-menu>
<auro-menuoption value="1">Option 1</auro-menuoption>
<auro-menuoption value="2">Option 2</auro-menuoption>
<auro-menuoption value="3">Option 3</auro-menuoption>
</auro-menu>
</auro-select>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multi-select.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/multi-select.html -->
<pre class="language-html"><code class="language-html">&lt;auro-select multiselect placeholder="Select one or more options"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Bib headline&lt;/span&gt;
  &lt;span slot="label"&gt;Multi-select example&lt;/span&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="1"&gt;Option 1&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="2"&gt;Option 2&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="3"&gt;Option 3&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-select&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="autocomplete">Autocomplete</auro-header>
<p>Set the <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete"><code>autocomplete</code></auro-hyperlink> attribute to give the browser an autofill hint, such as <code>country-name</code>.</p>
<auro-header level="3" id="skipSelection">Close the list of options without making a selection</auro-header>
<ol>
<li>Move focus to the <code>&lt;auro-select&gt;</code> element.</li>
<li>Activate the trigger (such as with a mouse click, tap, or key press).</li>
<li>Navigate the list of options but don't make a selection.</li>
<li>Collapse the bib.
<div class="note">
<p>The guest can collapse the bib without making a selection, such as by clicking or tapping outside the component or pressing <code>Escape</code>.</p>
</div>
</li>
</ol>
<auro-header level="3" id="viewport">Change viewport size</auro-header>
<p>The guest may change the size of their viewport (such as by resizing their desktop browser window or rotating their phone). In some cases, this re-renders the component while the option list is expanded. The viewport size change can cause the option list to change from a popover bib to a fullscreen modal or vice versa while the bib is open.</p>
<auro-header level="4" id="us9a">Popover to modal</auro-header>
<p>While the bib is open as a popover, focus is on the trigger. After the switch to the fullscreen modal dialog, focus moves to the close button inside the dialog.</p>
<auro-header level="4" id="us9b">Modal to popover</auro-header>
<p>While the bib is open as a fullscreen modal dialog, focus is on the close button inside the dialog. After the switch to a popover, focus moves to the trigger.</p>
</section>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>