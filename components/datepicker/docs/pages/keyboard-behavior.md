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
        <p><strong>Note:</strong> The datepicker supports full interaction via touch, click, VoiceOver, and keyboard. The trigger input accepts typed dates, and the calendar bib supports arrow-key navigation between date cells, Enter/Space to select, and Escape to close.</p>
      </div>
      <auro-header level="3" id="keyEventsCounterGroup">Key Events</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
      <!-- AURO-GENERATED-CONTENT:END -->
      <auro-header level="4" id="keyEventsDropdown">Key Events inherited from Auro-Dropdown</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/keyEvents.md) -->
      <!-- AURO-GENERATED-CONTENT:END -->
    </div>
  </div>
</div>
