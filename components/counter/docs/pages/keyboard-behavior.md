<auro-header level="1" id="overview">Counter and counter group: Keyboard behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
  <div class="scrollWrapper">
    <auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
    <auro-header level="3" id="tabBehaviorCounter">Counter</auro-header>
    <p>The counter is a single tab stop. Its minus and plus buttons aren't in the tab order; use the Up Arrow and Down Arrow keys to change the value.</p>
    <auro-header level="3" id="tabBehaviorCounterGroup">Counter group</auro-header>
    <p>When a counter group has the <code>isDropdown</code> attribute, it behaves as an <code>auro-dropdown</code>. The trigger element renders the counter group label and a summary of each counter's current value and label. The dropdown bib renders all counters inside of the group.</p>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
    <auro-header level="2" id="keyEvents">Key events</auro-header>
    <auro-header level="3" id="keyEventsCounter">Counter</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counter.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
    <div class="note">
      <p><strong>Note:</strong> The counter doesn't currently support the following keys:</p>
      <ul>
        <li><strong>Home:</strong> Sets the value to the minimum, <code>min</code> (0 by default).</li>
        <li><strong>End:</strong> Sets the value to the maximum, <code>max</code> (9 by default).</li>
        <li><strong>PageUp:</strong> (optional) Increases the value by a larger step than Up Arrow.</li>
        <li><strong>PageDown:</strong> (optional) Decreases the value by a larger step than Down Arrow.</li>
      </ul>
    </div>
    <auro-header level="3" id="keyEventsCounterGroup">Counter group</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counterGroup.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
    <auro-header level="4" id="keyEventsDropdown">Key events inherited from auro-dropdown</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/keyEvents.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</div>
