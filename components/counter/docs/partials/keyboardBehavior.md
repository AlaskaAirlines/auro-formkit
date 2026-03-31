<auro-header level="1" id="overview">Counter & Counter Group - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
  <div class="scrollWrapper">
    <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
    <auro-header level="3" id="tabBehaviorCounter">Counter</auro-header>
    <p>The counter component is itself a focusable element. There are no sub-parts that are separately focusable.</p>
    <auro-header level="3" id="tabBehaviorCounterGroup">Counter Group</auro-header>
    <p>When multiple counters are placed inside a counter group the component behaves as an auro-dropdown. The trigger element renders a counter group label and a summary of all counter labels and current values. The dropdown bib renders all counters inside of the group.</p>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
    <auro-header level="2" id="keyEvents">Key Events</auro-header>
    <auro-header level="3" id="keyEventsCounter">Counter</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counter.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
    <div class="note">
      <p><strong>Note:</strong> The following keyboard behavior is unsupported at this time:</p>
      <ul>
        <li><strong>Home:</strong> sets the counter value to the defined minimum (default 0)</li>
        <li><strong>End:</strong> sets the counter value to the defined maximum (default 9)</li>
        <li><strong>PageUp:</strong> (optional) Increases the value by a larger step than Up Arrow.</li>
        <li><strong>PageDown:</strong> (optional) Decreases the value by a larger step than Down Arrow.</li>
      </ul>
    </div>
    <auro-header level="3" id="keyEventsCounterGroup">Counter Group</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents-counterGroup.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
    <auro-header level="4" id="keyEventsDropdown">Key Events inherited from Auro-Dropdown</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/keyEvents.md) -->
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</div>
