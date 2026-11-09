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
  <p>If a preset value doesn't match any option, the value is reset to <code>undefined</code>. A value that matches an option marked <code>disabled</code> or <code>static</code> is also rejected and reset to <code>undefined</code>; a value matching a <code>hidden</code> option is still applied.</p>
  <auro-header level="4" id="us3b">Multi-select</auro-header>
  <p>When configured for multi-select, the preset value can include multiple options. The first selected option becomes <code>active</code> when the bib opens.</p>
  <p>Preset values that match an option marked <code>disabled</code> or <code>static</code> are discarded. Values that match no option stay in <code>value</code>, so options added later can still be selected. If none of the preset values match a selectable option, the value is reset to <code>undefined</code>.</p>
  <div class="note"><strong>Note:</strong> Choosing several options from a select is hard for many people, including screen reader users. Consider checkboxes instead, which make choosing several options easier to discover.</div>
  <auro-header level="3" id="multiselect">Multi-select</auro-header>
  <p>Set <code>multiSelect</code> to let people select more than one option. Only one option can be <code>active</code> at a time, but people can make several options <code>selected</code> with a click, tap, or key press on each. Selecting an already selected option again deselects it.</p>
  <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multi-select.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
  </div>
  <auro-accordion alignRight>
    <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multi-select.html) -->
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