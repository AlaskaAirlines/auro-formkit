<auro-header level="1" id="overview">Combobox - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
      <p>The component trigger contains an <code>&lt;auro-input&gt;</code> which has two focusable elements:</p>
      <ol>
        <li><strong>Input</strong></li>
        <li><strong>Clear button:</strong> only shown when the input has a value.</li>
      </ol>
      <p>Each focusable element <em>(when shown)</em> participates in the browser window's default <code>tabindex</code> sequence.</p>
      <p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
      <p>On <strong>large viewport devices</strong> (e.g., desktop browser, tablet) there is no focusable content inside the component bib.</p>
      <p>On <strong>small viewport devices</strong> (e.g., phone) the bib opens a modal dialog with a focusable <strong>input</strong> and <strong>clear button</strong> which may be tabbed through naturally.</p>
      <auro-header level="2" id="keyEvents">Key Events</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
      <!-- AURO-GENERATED-CONTENT:END -->
      <div class="note">
        <p><strong>Note:</strong> The following keyboard behavior is unsupported at this time:</p>
        <ul>
          <li><strong>PageUp:</strong> The browser moves the <code>focused</code> option up by approximately one <strong>page</strong> of visible options (typically equal to the number of rendered rows). The scroll position updates in tandem so that the newly focused option is brought into view, usually aligning near the top of the visible list.</li>
          <li><strong>PageDown:</strong> The browser advances the <code>focused</code> option down by approximately one <strong>page</strong> of visible items (typically equal to the number of rendered rows). The scroll position updates accordingly so the newly focused option is brought into view, often aligning near the bottom of the visible list.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## DEVELOPER NOTES / CODE ACTION ITEMS / TODO ITEMS
1. Remove the bridge for keyboard event bubbling out of the bib
1. Prevent auro-dropdown `Enter` and `Space` key behavior for opening and closing the bib.
1. Strip out key event listeners not listed in this document
