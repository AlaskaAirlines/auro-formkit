<auro-header level="1" id="overview">Select - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-select&gt;</code> component. It covers announcements, gestures, and workflows for both large and small viewports.</p>

<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>

<auro-header level="3" id="voiceOverFocusAnnouncement">Focus</auro-header>
<p>When focus is given to the component trigger the following is announced:</p>
<ol>
  <li><strong>Label:</strong> <code>label</code> slot content</li>
  <li><strong>Current value:</strong> [current value or <em>"no selection"</em>]</li>
  <li><strong>Role:</strong> <em>"combo box"</em></li>
  <li>
    <strong>State hints:</strong>
    <table class="compressed body-xs">
      <thead>
        <tr>
          <th>State</th>
          <th>What gets announced</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Expanded</td>
          <td><em>"collapsed"</em> or <em>"expanded"</em></td>
        </tr>
        <tr>
          <td>Required</td>
          <td><em>"required"</em></td>
        </tr>
        <tr>
          <td>Invalid</td>
          <td>The trigger itself does not carry <code>aria-invalid</code>; the invalid state is announced through the alert-role Help Text (see <a href="#voiceOverStateInvalid">Invalid</a> below), not as a state hint on focus.</td>
        </tr>
        <tr>
          <td>Disabled</td>
          <td><em>"dimmed"</em></td>
        </tr>
        <tr>
          <td>autocomplete</td>
          <td><em>"has auto complete"</em></td>
        </tr>
      </tbody>
    </table>
  </li>
  <li><strong>Additional description:</strong> <code>helptext</code> slot content if present (after a brief pause)</li>
</ol>

<auro-header level="3" id="voiceOverNavigateAnnouncement">Navigating Options</auro-header>
<p>Announces each option <em>"[option label], [<em>"selected"</em> if <code>selected</code>], [<em>"dimmed"</em> if <code>disabled</code>]"</em> as you move.</p>
<p>3 finger swipe gesture may be used to scroll the option list.</p>

<auro-header level="3" id="voiceOverCloseGesture">Close Gesture</auro-header>
<p>The component may be <strong>closed</strong> | <strong>collapsed</strong> using a gesture.</p>
<ul>
  <li><strong>iOS VoiceOver:</strong> The two-finger <em>"scrub"</em> (zigzag / a <em>"Z"</em> shape) gesture acts as the <em>'Escape'</em> key, commonly used to dismiss modal views.</li>
  <li>
    <strong>Android TalkBack:</strong> users typically swipe down then left (an <em>"L"</em> gesture) or use the back gesture to go back/close.<br />
    <div class="note">
      <strong>How to Perform Android back/close gesture:</strong> Swipe inwards from either the left or right edge of the screen, typically from the middle-edge, to go to the previous screen.
    </div>
  </li>
</ul>

<auro-header level="3" id="voiceOverCollapseAnnouncement">Closed | Collapsed Announcements</auro-header>
<p>When the component is <strong>closed</strong> | <strong>collapsed</strong> announces the <strong>expanded</strong> state change.</p>

<auro-header level="2" id="voiceOverLargeVPAnnouncements">Large Viewport Workflow</auro-header>
<p>Examples: large tablet, typical size or larger desktop browser window</p>
<ol>
  <li><strong>Focus</strong></li>
  <li>
    <strong>Open | Expand:</strong> When the component is <strong>opened</strong> | <strong>expanded</strong> announces the active option <em>"[option label], ['selected' if <code>selected</code>]"</em>.
    <div class="note">
      <strong>Note:</strong> <code>disabled</code> options can not be <strong>active</strong>, this state would never be included in this announcement.
    </div>
  </li>
  <li><strong>Navigate options</strong></li>
  <li>
    <strong>Select an option:</strong> Collapses the list, announces the <strong>expanded</strong> state change.
    <p>~OR~</p>
    <strong>Close | Collapse without selecting an option:</strong> Collapses the list, announces the <strong>expanded</strong> state change.
  </li>
</ol>

<auro-header level="2" id="voiceOverSmallVPAnnouncements">Small Viewport Workflow</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
  <li><strong>Focus</strong></li>
  <li>
    <strong>Open | Expand:</strong> Focus is moved to the fullscreen modal dialog <strong>Close</strong> button, announces the active option <em>"[option label], [<em>'selected'</em> if <code>selected</code>]"</em>.
    <div class="note">
      <strong>Note:</strong> <code>disabled</code> options can not be <strong>active</strong>, this state would never be included in this announcement.
    </div>
  </li>
  <li><strong>Navigate options</strong></li>
  <li>
    <strong>Select option:</strong> Closes the fullscreen modal dialog, announces the <strong>expanded</strong> state change.
    <p>~OR~</p>
    <strong>Close | Collapse without selecting an option:</strong> Closes the fullscreen modal dialog, announces the <strong>expanded</strong> state change.
  </li>
</ol>
<p>Key characteristics across both platforms:</p>
<ul>
  <li>The <code>label</code> is always read first.</li>
  <li>The trigger <strong>role</strong> is announced as <em>"combo box"</em> in both single-select and multi-select modes. The role does not change between large and small viewports — the fullscreen dialog on mobile wraps the same trigger, it does not remap the trigger's role to <em>"pop-up button"</em>, <em>"button"</em>, or <em>"list box"</em>. In multi-select mode, <code>aria-multiselectable="true"</code> is applied to the internal <code>&lt;auro-menu&gt;</code> (the listbox), not to the trigger.</li>
  <li><code>disabled</code> options are announced as <em>"dimmed"</em> and cannot be selected.</li>
</ul>

<auro-header level="2" id="voiceOverStates">Impact of State</auro-header>

<auro-header level="3" id="voiceOverStateDisabled">Disabled</auro-header>
<p><strong>What VoiceOver does:</strong></p>
<ul>
  <li>Focuses the element and announces it (e.g., <em>"[label], dimmed, combo box"</em> on macOS / <em>"[label], dimmed"</em> on iOS).</li>
  <li>The word <strong>"dimmed"</strong> is VoiceOver's way of indicating disabled.</li>
  <li>The element remains in the focus order (Tab still reaches it).</li>
  <li>The user cannot interact with it — the option list can not be expanded, and no selection can be made.</li>
</ul>
<p>Key distinction from <code>aria-hidden</code>: A disabled element is <em>reachable but not operable</em>. If you want VoiceOver to skip it entirely, you would need <code>aria-hidden="true"</code> or <code>tabindex="-1"</code>, but that is generally not recommended for disabled controls — users benefit from knowing the field exists and why it may be unavailable.</p>
<p>This is consistent across NVDA and JAWS as well, though the announcement wording differs (e.g., NVDA says <em>"unavailable"</em>).</p>

<auro-header level="3" id="voiceOverStateMultiSelect">Multi Select</auro-header>

<auro-header level="4" id="voiceOverStateMultiSelectLargeVP">Large Viewport Multi-select</auro-header>
<p>Examples: large tablet, typical size or larger desktop browser window</p>
<ol>
  <li><strong>Focus</strong></li>
  <li><strong>Open | Expand</strong></li>
  <li><strong>Navigate Options:</strong> Moves through options; announces each option name plus <em>"selected"</em> or nothing.</li>
  <li><strong>Selecting an option:</strong> Double-tap toggles the focused option's selection — announces <em>"selected"</em> or <em>"not selected"</em>.</li>
  <li><strong>Close | Collapse:</strong> Collapses the list, announces the expanded state change.</li>
</ol>

<auro-header level="4" id="voiceOverStateMultiSelectSmallVP">Small Viewport Multi-select</auro-header>
<p>Examples: mobile phone, very small desktop browser window</p>
<ol>
  <li><strong>Focus</strong></li>
  <li><strong>Open | Expand</strong></li>
  <li><strong>Navigate Options:</strong> Moves through options; announces each option name plus <em>"selected"</em> or nothing.</li>
  <li><strong>Selecting an option:</strong> Double-tap toggles the focused option's selection — announces <em>"selected"</em> or <em>"not selected"</em>.</li>
  <li><strong>Close | Collapse:</strong> Collapses the list, announces the expanded state change.</li>
</ol>

<p>Key differences from single-select:</p>
<table>
  <thead>
    <tr>
      <th></th>
      <th>Single</th>
      <th>Multi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Trigger role</td>
      <td>combo box</td>
      <td>combo box (with <code>aria-multiselectable="true"</code> on the internal listbox)</td>
    </tr>
    <tr>
      <td>Interaction model</td>
      <td>Open → pick → auto close</td>
      <td>Open → toggle items → manually close</td>
    </tr>
    <tr>
      <td>Value announcement</td>
      <td>
        <p>Current selected value</p>
        <div class="note">
          <strong>On focus:</strong> Announces "[component label], [current value or 'no selection'], combo box"
        </div>
      </td>
      <td>
        <p>Each option's selected state individually</p>
        <div class="note">
          <strong>On focus:</strong> Announces "[component label], [[{option label, 'selected'}, {option label, 'selected'}] or 'no selection'], combo box"
        </div>
        <div class="note">
          <strong>On selection change:</strong> Announces "[option label], ['selected' | 'not selected']"
        </div>
      </td>
    </tr>
    <tr>
      <td>Space key</td>
      <td>Opens/closes picker</td>
      <td>Opens/closes picker — <strong>Enter</strong> toggles the active option's selection. Space does not toggle selection in multi-select.</td>
    </tr>
  </tbody>
</table>
<div class="note"><strong>Important caveat:</strong> Multi-select is notoriously difficult for all users, including screen reader users — WCAG and usability research generally recommend avoiding <code>&lt;auro-select multiSelect&gt;</code> in favor of checkboxes or other patterns that make multi-selection more discoverable.</div>

<auro-header level="3" id="voiceOverStateInvalid">Invalid</auro-header>
<p>When an <code>&lt;auro-select&gt;</code> becomes invalid the following occurs:</p>
<ul>
  <li>The Help Text region renders the error message with <code>role="alert"</code> and <code>aria-live="assertive"</code>, so VoiceOver announces the error message immediately when the state transitions to invalid — the announcement does not wait for the next focus.</li>
  <li>On subsequent focus of the trigger, the help text's error content is read as part of the description, following the label / value / role announcement.</li>
</ul>
<div class="note"><strong>Note:</strong> the trigger itself does not set <code>aria-invalid</code>, so VoiceOver does not include the words <em>"invalid data"</em> (macOS) or <em>"invalid entry"</em> (iOS) as part of the trigger's own announcement. The invalid state is conveyed entirely through the alert-role help text.</div>
<p>Example: when the select becomes invalid, VoiceOver announces the error message (e.g., <em>"Please select a country"</em>) via the assertive alert. On the next focus of the trigger, VoiceOver announces something like <em>"Country, no selection, combo box, Please select a country"</em>.</p>

<auro-header level="2" id="voiceOverImplementation">How the Announcements Are Wired</auro-header>
<p>The following implementation details are relevant when debugging or verifying VoiceOver behavior in <code>&lt;auro-select&gt;</code>:</p>

<auro-header level="3" id="voiceOverImplActiveDescendant">Active option (aria-activedescendant)</auro-header>
<p>Focus remains on the trigger while the bib is open; the currently active option is exposed via <code>aria-activedescendant</code>. Because the trigger and the option live in different shadow roots, the code sets <code>trigger.ariaActiveDescendantElement</code> (the IDL/property form) rather than the string attribute alone — this is what allows VoiceOver to announce the active option's label and state across the shadow boundary.</p>

<auro-header level="3" id="voiceOverImplSetSize">Position in list (aria-setsize / aria-posinset)</auro-header>
<p>Each option is stamped with <code>aria-setsize</code> (total count of navigable options) and <code>aria-posinset</code> (its 1-based position). Stamping runs on initial menu configuration and again whenever <code>auroMenu-optionsChange</code> fires (options added, removed, or otherwise re-initialized), so VoiceOver's <em>"N of M"</em> announcement stays accurate across dynamic option lists. A pure <code>value</code> change does not re-stamp on its own — it only updates selection state — unless it triggers a menu re-initialization in an empty/deferred-match path.</p>

<auro-header level="3" id="voiceOverImplLiveRegion">Live region routing</auro-header>
<p>Selection-change announcements (single-select confirmation and multi-select toggle wording) are written into an <code>aria-live="polite"</code> span that lives in the host component's shadow root by default. In fullscreen mode the trigger becomes <code>inert</code> and everything outside the <code>&lt;dialog&gt;</code> is hidden from assistive tech — so the live region is routed into the bib's shadow root instead, ensuring the announcement is reachable while the dialog is open.</p>

<auro-header level="3" id="voiceOverImplDebounce">Announcement timing</auro-header>
<p>Selection announcements are delayed briefly (~300ms) so the option's <em>"selected"</em> / <em>"not selected"</em> announcement is not overridden by the <em>"collapsed"</em> announcement that follows when the bib closes.</p>

<auro-header level="3" id="voiceOverImplFullscreen">Fullscreen focus and inert</auro-header>
<p>When the fullscreen dialog opens, focus moves to the dialog's <strong>Close</strong> button and the trigger is marked <code>inert</code> so screen readers cannot reach it — the user is effectively inside the dialog until it closes, at which point focus returns to the trigger and <code>inert</code> is removed.</p>
