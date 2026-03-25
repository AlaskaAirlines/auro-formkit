<auro-header level="1" id="overview">Select - Overview and UX Guide</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <!-- <span slot="label">Anchor Navigation</span> -->
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#description">Description</auro-anchorlink>
      <auro-anchorlink fluid href="#ui">UI</auro-anchorlink>
      <auro-anchorlink fluid href="#trigger" class="level2 body-xs">Trigger</auro-anchorlink>
      <auro-anchorlink fluid href="#options" class="level2 body-xs">Options</auro-anchorlink>
      <auro-anchorlink fluid href="#helpText" class="level2 body-xs">Help Text</auro-anchorlink>
      <auro-anchorlink fluid href="#initialState">Initial State</auro-anchorlink>
      <auro-anchorlink fluid href="#usersStories">User Stories</auro-anchorlink>
      <auro-anchorlink fluid href="#select" class="level2 body-xs">Select A Value</auro-anchorlink>
      <auro-anchorlink fluid href="#multiselect" class="level2 body-xs">Multi-select</auro-anchorlink>
      <auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset Value</auro-anchorlink>
      <auro-anchorlink fluid href="#autocomplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
      <auro-anchorlink fluid href="#skipSelection" class="level2 body-xs">Skip Selection</auro-anchorlink>
      <auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
      <auro-anchorlink fluid href="#disableOptions" class="level2 body-xs">Disable Option(s)</auro-anchorlink>
      <auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
      <auro-anchorlink fluid href="#viewport" class="level2 body-xs">Viewport Size</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="2" id="description">Description</auro-header>
      <p>The Auro-Select component is used to create a drop-down list for user input within a form. It acts as a container for options.</p>
      <p>Key features:</p>
      <ul>
        <li>Preset values</li>
        <li>Mark as required when in a form</li>
        <li>Disable individual options or the entire component</li>
        <li>Enable multi-select</li>
        <li>Separate options into groups with dividers</li>
        <li>Group options into nested levels</li>
      </ul>
      <div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Select Example</span>
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
      <section>
        <auro-header level="2" id="ui">UI</auro-header>
        <p>The component consists of the following elements:</p>
        <ul>
          <li>
            <strong>trigger:</strong> shows the component label, current value and will render to reflect state of the component (e.g. <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, <code>invalid</code>), and a flag marking instances that are required.
          </li>
          <li>
            <strong>options list:</strong> a list of options that may be selected which are rendered in an element which can be expanded/collapsed by interacting with the trigger.
          </li>
          <li>
            <strong>help text:</strong> descriptive text rendered below the trigger intended to help clarify the intended use of the component instance and any current validation error with instructions to resolve those errors.
          </li>
        </ul>
        <auro-header level="3" id="trigger">Trigger</auro-header>
        <p>The trigger includes the component label, a flag marking the component optional/required and the current value. This label is required in order to ensure correct behavior when a guest is using accessibility tools such as screen readers and VoiceOver utilities. The invalid state will also announce to accessibility tools when applied.</p>
        <p>The optional/required flag content may be customized.</p>
        <p>When rendering the value of a selected option, the entire text content of the option will render in the trigger, including any icons.</p>
        <auro-header level="3" id="options">List Options</auro-header>
        <p>The component will render a list of options that may be selected. Each option may be in one of the following states when rendered:</p>
        <ul>
          <li>
            <code>selected</code> - One option may be selected at a time and identifies the current value of the component. There is an optional feature that may be used to enable more than one option to be selected at a time.
          </li>
          <li>
            <code>active</code> - One option may be active at a time. The active option indicates the item that will become selected if the user chooses.
          </li>
          <li>
            <code>disabled</code> - One or more options may be disabled. Disabled options are not interactive and cannot be marked as active or selected.
          </li>
        </ul>
        <auro-header level="3" id="helpText">Help Text</auro-header>
        <p>Help text is not required. However, consideration should be given to how users will understand the full context of the component instance, particularly users reliant on accessibility tools like screen readers. In certain cases, a component label alone may be confusing.</p>
        <p>If the component fails validation, the help text will change to show a validation help message instead of the default help text.</p>
      </section>
      <section>
        <auro-header level="2" id="initialState">Initial Render state</auro-header>
        <p>
          When the component first renders in it's default use case the value is <code>undefined</code> and the first enabled option is marked <code>active</code>. The component will initially render with the option list collapsed.
        </p>
      </section>
      <section>
        <auro-header level="2" id="userStories">User Stories</auro-header>
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
        <auro-header level="3" id="multiselect">Supporting multi-select</auro-header>
        <p>In certain cases it may be valid to allow more than one option to be selected. When the component is configured to support multi-select only one option is still able to be marked <code>active</code>. However, multiple options may be <code>selected</code> via click, tap or keyboard events on each option. A second click, tap or keyboard event on an already selected option will de-select it.</p>
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
        <p class="authorTodo">TODO: Outline the step by step process to execute autocomplete within the browser</p>
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
        <p class="authorTodo">TODO: Per HTML 5 spec disabled form elements are not included in the form submission. I believe we currently do and need to fix that.</p>
        <auro-header level="3" id="viewport">Change Viewport Size</auro-header>
        <p>The guest may change the size of their viewport (e.g. resize their desktop browser window, rotate their mobile device). In some cases, this may cause a re-render of the component while the option list is expanded. It is possible that the viewport size change will cause the option list to change from a popover bib to a fullscreen modal or vice versa while the bib is open.</p>
        <auro-header level="4" id="us9a">Popover to Modal</auro-header>
        <p>While in a popover display state with the bib open, focus will be on the trigger. After switching to the fullscreen modal dialog, focus will move to the close button inside the dialog.</p>
        <auro-header level="4" id="us9b">Modal to Popover</auro-header>
        <p>While in a fullscreen modal display state with the bib open, focus will be on the close button inside the dialog. After switching to the fullscreen modal dialog, focus will move to the trigger.</p>
        <p class="authorTodo">TODO: add customizing the error message for?</p>
      </section>
    </div>
  </div>
</div>