<auro-header level="1" id="overview">Select - Keyboard behavior</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <!-- <span slot="label">Anchor Navigation</span> -->
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#tabBehavior">Tab behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#keyEvents">Key events</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
  <div class="scrollWrapper">
    <auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
    <p>The <code>&lt;auro-select></code> component inherits the default tabindex behavior of <code>&lt;auro-dropdown></code> with no modifications.</p>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
    <p>Apart from the close button in the fullscreen bib, the <code>&lt;auro-select></code> bib content has no focusable elements.</p>
    <div class="note">
      <strong>Note:</strong> The following native <code>&lt;select&gt;</code> keyboard behavior isn't supported in <code>&lt;auro-select multiSelect></code>:
      <ul>
        <li><strong>Extending selection (Shift+Arrow)</strong></li>
        <li><strong>Select all (Cmd+A):</strong> Select all options</li>
      </ul>
    </div>
    <auro-header level="2" id="keyEvents">Key events</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyboard-behavior/keyEvents.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</div>
