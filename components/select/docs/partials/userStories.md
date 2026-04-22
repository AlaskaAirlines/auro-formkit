<auro-header level="3" id="select">Select an option from the list</auro-header>
  <ol>
    <li>
      Move focus to the auro-select element
    </li>
    <li>
      Activate the trigger (e.g. mouse click, tap or keyboard event)
      <div class="stepDetails">
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
      <div class="stepDetails">
        <p>
          The guest may navigate through the list of options to make their choice. An option may become active through pointer hover, keyboard navigation (e.g., arrow keys), or assistive technologies that emulate keyboard navigation through gestures.
        </p>
      </div>
    </li>
    <li>
      Select the option
      <div class="stepDetails">
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
  <p>If a preset value is defined that does not match any enabled option, the value is reset to <code>undefined</code>.</p>
  <auro-header level="4" id="us3b">Multi Select</auro-header>
  <p>When configured for multi-select, the preset value may include multiple options. The first selected option will also be marked <code>active</code>.</p>
  <p>If one or more preset values do not match any option they will be discarded. If no preset values match any option, the value is reset to <code>undefined</code>.</p>
  <div class="stepDetails"><strong>Important caveat:</strong> Multi-select is notoriously difficult for all users, including screen reader users — WCAG and usability research generally recommend avoiding <code>&lt;auro-select multiSelect></code> in favor of checkboxes or other patterns that make multi-selection more discoverable.</div>
  <auro-header level="3" id="autocomplete">Autocomplete</auro-header>
  <p>The component supports the use of <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete">autocomplete</auro-hyperlink> configuration through HTML attributes.</p>
  <auro-header level="3" id="skipSelection">Close the list of options without making a selection</auro-header>
  <ol>
    <li>Move focus to the auro-select element</li>
    <li>Activate the trigger (e.g. mouse click, tap or keyboard event)</li>
    <li>Navigate the list of options but do not make a selection</li>
    <li>Collapse the bib
      <div class="stepDetails">
        <p>The guest may collapse the bib without making any selection. Example methods include clicking or tapping outside of the component or hitting the <code>Escape</code> key.</p>
      </div>
    </li>
  </ol>
  <auro-header level="3" id="requireSelection">Require selection of an option</auro-header>
  <p>Certain use cases may require the guest to make a selection from the component in order to continue the intended work flow (e.g. form submission).</p>
  <p>When the component is marked required:</p>
  <ol>
    <li>Move focus to the auro-select element</li>
    <li>Activate the trigger (e.g. mouse click, tap or keyboard event)</li>
    <li>Navigate the list of options</li>
    <li>
      Collapse the bib without making a selection
      <div class="stepDetails">
        <p>This will re-render the component in a state reflecting the validation error. To resolve the error, the guest may continue to the following steps.</p>
      </div>
    </li>
    <li>Activate the trigger</li>
    <li>Navigate the list of options marking any option as active</li>
    <li>
      Select the active option
      <div class="stepDetails">
        <p>This will re-render the component and the validation error state will be removed.</p>
      </div>
    </li>
  </ol>
  <auro-header level="3" id="multiselect">Supporting multi-select</auro-header>
  <p>In certain cases it may be valid to allow more than one option to be selected. When the component is configured to support multi-select only one option is still able to be marked <code>active</code>. However, multiple options may be <code>selected</code> via click, tap or keyboard events on each option. A second click, tap or keyboard event on an already selected option will de-select it.</p>
  <auro-header level="3" id="disableOptions">Disable Option(s)</auro-header>
  <p>The component may be rendered with one or more <code>disabled</code> options. When navigating the list of options with the keyboard or assistive technology to mark the next or previous option as active, disabled options will skipped, jumping to the next enabled option.</p>
  <p>While using the pointer to mark options as active, hovering over disabled options will be ignored and the previous active option will remain active.</p>
  <div class="stepDetails">
    <strong>Note:</strong> If the currently <code>selected</code> option is marked as <code>disabled</code>, the component value is reset to <code>undefined</code> and the component validation workflow is performed (e.g., if the component instance is <code>required</code> it will set <code>validity="valueMissing".</code>).
  </div>
  <div class="stepDetails">
    <strong>Note:</strong> marking all options as disabled is not supported. Disable the component instead.
  </div>
  <auro-header level="3" id="disableComponent">Disable Component</auro-header>
  <p>The entire component may be disabled. When disabled, the component will render to reflect the state, may not receive focus nor react to any key or pointer events.</p>
  <p>When the component is disabled and part of a form, the components value is still included in the form submission.</p>
  <div class="stepDetails">
    <strong>Note:</strong> If the component is marked as both <strong>invalid</strong> and <code>disabled</code>, the <strong>invalid</strong> state UI/UX and functional behavior are ignored. The <code>disabled</code> UI/UX and functional behavior works normally.
  </div>
  <auro-header level="3" id="viewport">Change Viewport Size</auro-header>
  <p>The guest may change the size of their viewport (e.g. resize their desktop browser window, rotate their mobile device). In some cases, this may cause a re-render of the component while the option list is expanded. It is possible that the viewport size change will cause the option list to change from a popover bib to a fullscreen modal or vice versa while the bib is open.</p>
  <auro-header level="4" id="us9a">Popover to Modal</auro-header>
  <p>While in a popover display state with the bib open, focus will be on the trigger. After switching to the fullscreen modal dialog, focus will move to the close button inside the dialog.</p>
  <auro-header level="4" id="us9b">Modal to Popover</auro-header>
  <p>While in a fullscreen modal display state with the bib open, focus will be on the close button inside the dialog. After switching to the fullscreen modal dialog, focus will move to the trigger.</p>
</section>