<auro-header level="1" id="overview">Dropdown - Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="a11yLabels">Accessible Labels</auro-header>
        <p>To meet accessibility requirements, all uses of <code>auro-dropdown</code> must have a valid label. See the following options:</p>
        <ol>
          <li>Use the <code>label</code> content slot</li>
          <li>Use <code>aria-label</code> to insert label content that will only be read by screen readers</li>
          <li>Use <code>aria-labelledby</code> to reference a label from another element on the page</li>
        </ol>
        <p>Not including one of the above options will result in your UI being non-compliant with Alaska's accessibility policies.</p>
      </section>
      <section>
        <auro-header level="2" id="interactions">Supported Interactions</auro-header>
        <p>The dropdown can be <strong>opened</strong> with the following actions:</p>
        <ol>
          <li>Clicking/tapping on the trigger.</li>
          <li>Tabbing to the trigger and using the <code>Enter</code> or <code>Space</code> keys.</li>
          <li>Programmatically via another control in the UI calling the <code>show()</code> method.</li>
        </ol>
        <p>The dropdown can be <strong>closed</strong> with the following actions:</p>
        <ol>
          <li>Clicking anywhere in the view outside of the dropdown.</li>
          <li>Using the <code>Escape</code> key.</li>
          <li>Programmatically via another control in the UI calling the <code>hide()</code> method.</li>
        </ol>
      </section>
      <section>
        <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/tabindex.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="disabledState">Disabled State</auro-header>
        <p>When a dropdown is disabled, <code>aria-disabled</code> is set and the trigger cannot be activated. The element is removed from the tab sequence. Screen readers will announce the disabled state to the user.</p>
      </section>
    </div>
  </div>
</div>
