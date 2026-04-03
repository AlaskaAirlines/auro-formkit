<auro-header level="1" id="overview">Datepicker - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
      <p>The component trigger contains <code>&lt;auro-input&gt;</code> element(s) which each have two focusable elements:</p>
      <ol>
        <li><strong>Input</strong></li>
        <li><strong>Clear button:</strong> only shown when the input has a value.</li>
      </ol>
      <p>Each focusable element <em>(when shown)</em> participates in the browser window's default <code>tabindex</code> sequence.</p>
      <p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
      <div class="note">
        <p><strong>Note:</strong> The current implementation <strong>DOES</strong> support full interaction of the bib content and calendar with touch, click and VoiceOver interactions.</p>
        <p>The current implementation of the component <strong>DOES</strong> support using the keyboard to navigate the trigger and type dates via the keyboard. It <strong>DOES NOT</strong> support navigating the bib content and calendar via the keyboard. This functionality is scheduled to be added in the next major redesign of the component.</p>
      </div>
    </div>
  </div>
</div>
