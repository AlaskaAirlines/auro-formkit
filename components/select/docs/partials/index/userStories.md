<auro-header level="3" id="select">Select an option from the list</auro-header>
  <ol>
    <li>
      Move focus to the auro-select element
    </li>
    <li>
      Activate the trigger (e.g. mouse click, tap or keyboard event)
      <div class="note">
        <p>
          While in desktop view the list of options will render in a dropdown style bib that appears below the trigger. The bib may render above the trigger if there is not enough space in the viewport below the trigger.
        </p>
        <p>
          While in mobile device view the list of options will appear in a fullscreen modal dialog. Focus will shift to the close button in the top right of this dialog.
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
  <auro-header level="3" id="presetValue">Preset the value</auro-header>
  <p>In some cases it is necessary to preset the value of the component as part of the initial render.</p>
  <auro-header level="4" id="us3a">Single Select</auro-header>
  <p>When a value is preset, the matching option in the menu will be marked as both <code>active</code> and <code>selected</code>.</p>
  <p>If a preset value is defined that does not match any option, the value is reset to <code>undefined</code>. (Value matching is not filtered by <code>disabled</code>, <code>hidden</code>, or <code>static</code> — a value that matches such an option is still applied.)</p>
  <auro-header level="4" id="us3b">Multi Select</auro-header>
  <p>When configured for multi-select, the preset value may include multiple options. The first selected option will also be marked <code>active</code>.</p>
  <p>If one or more preset values do not match any option they will be discarded. If no preset values match any option, the value is reset to <code>undefined</code>.</p>
  <div class="note"><strong>Important caveat:</strong> Multi-select is notoriously difficult for all users, including screen reader users — WCAG and usability research generally recommend avoiding <code>&lt;auro-select multiSelect></code> in favor of checkboxes or other patterns that make multi-selection more discoverable.</div>
  <auro-header level="3" id="multiselect">Multi-select</auro-header>
  <p>In certain cases it may be valid to allow more than one option to be selected. When the component is configured to support multi-select only one option is still able to be marked <code>active</code>. However, multiple options may be <code>selected</code> via click, tap or keyboard events on each option. A second click, tap or keyboard event on an already selected option will de-select it.</p>
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
  <p>The component supports the use of <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete">autocomplete</auro-hyperlink> configuration through HTML attributes.</p>
  <auro-header level="3" id="skipSelection">Close the list of options without making a selection</auro-header>
  <ol>
    <li>Move focus to the auro-select element</li>
    <li>Activate the trigger (e.g. mouse click, tap or keyboard event)</li>
    <li>Navigate the list of options but do not make a selection</li>
    <li>Collapse the bib
      <div class="note">
        <p>The guest may collapse the bib without making any selection. Example methods include clicking or tapping outside of the component or hitting the <code>Escape</code> key.</p>
      </div>
    </li>
  </ol>
  <auro-header level="3" id="viewport">Change Viewport Size</auro-header>
  <p>The guest may change the size of their viewport (e.g. resize their desktop browser window, rotate their mobile device). In some cases, this may cause a re-render of the component while the option list is expanded. It is possible that the viewport size change will cause the option list to change from a popover bib to a fullscreen modal or vice versa while the bib is open.</p>
  <auro-header level="4" id="us9a">Popover to Modal</auro-header>
  <p>While in a popover display state with the bib open, focus will be on the trigger. After switching to the fullscreen modal dialog, focus will move to the close button inside the dialog.</p>
  <auro-header level="4" id="us9b">Modal to Popover</auro-header>
  <p>While in a fullscreen modal display state with the bib open, focus will be on the close button inside the dialog. After switching to the fullscreen modal dialog, focus will move to the trigger.</p>
</section>