<auro-header level="1" id="overview">Combobox - Keyboard behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
      <p>The component trigger contains an <code>&lt;auro-input&gt;</code> which has two elements:</p>
      <ol>
        <li><strong>Input</strong></li>
        <li><strong>Clear button:</strong> only shown when the input has a value.</li>
      </ol>
      <p>Each focusable element <em>(when shown)</em> participates in the browser window's default <code>tabindex</code> sequence.</p>
      <p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
      <p>On <strong>large viewport devices</strong>, such as a desktop browser or tablet, the bib has no focusable content.</p>
      <p>On <strong>small viewport devices</strong>, such as a phone, the bib opens a modal dialog with a focusable <strong>close button</strong>, <strong>input</strong>, and <strong>clear button</strong>, which can receive <strong>Click</strong> and <strong>Tap</strong> events.</p>
      <auro-header level="2" id="keyEvents">Key events</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyboard-behavior/keyEvents.md) -->
      <!-- AURO-GENERATED-CONTENT:END -->
      <div class="note">
        <p><strong>Note:</strong> The combobox doesn't currently support the following keys:</p>
        <ul>
          <li><strong>PageUp:</strong> Moving the active option up by about one <strong>page</strong> of visible options and scrolling it into view.</li>
          <li><strong>PageDown:</strong> Moving the active option down by about one <strong>page</strong> of visible options and scrolling it into view.</li>
        </ul>
      </div>
    </div>
  </div>
</div>
