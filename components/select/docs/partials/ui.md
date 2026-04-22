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
<p>The trigger is a focusable element and will visually respond to common UI states - <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component does not have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
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
<auro-header level="2" id="initialState">Initial Render State</auro-header>
<p>
  When the component first renders in it's default use case the value is <code>undefined</code> and the first enabled option is marked <code>active</code>. The component will initially render with the option list collapsed.
</p>
</section>