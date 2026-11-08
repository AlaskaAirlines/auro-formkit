<auro-header level="1" id="overview">Counter: Accessibility</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="ariaRoles">ARIA roles and attributes</auro-header>
        <p>The <code>auro-counter</code> component uses the <code>spinbutton</code> role so screen readers announce it as a number control. Key ARIA attributes include:</p>
        <ul>
          <li><code>role="spinbutton"</code>: Identifies the element as a numeric spinner control.</li>
          <li><code>aria-valuenow</code>: Reflects the current counter value.</li>
          <li><code>aria-valuemin</code>: Reflects the minimum allowed value.</li>
          <li><code>aria-valuemax</code>: Reflects the maximum allowed value.</li>
          <li><code>aria-labelledby</code>: Points to the counter's label (default slot) and <code>description</code> slot, which screen readers read as the counter's name.</li>
        </ul>
      </section>
      <section>
        <auro-header level="2" id="accessibleLabels">Accessible labels</auro-header>
        <p>Name the minus and plus buttons with the <code>ariaLabel.minus</code> and <code>ariaLabel.plus</code> slots, such as "Remove adult" and "Add adult". Without them, the buttons fall back to the symbols "−" and "+" as their names.</p>
      </section>
      <section>
        <auro-header level="2" id="screenReader">Screen reader announcements</auro-header>
        <p>The counter keeps its <code>aria-valuenow</code> and <code>aria-valuetext</code> attributes set to the current value, so screen readers announce the new value when it changes. When the counter gets focus, screen readers announce its label and current value.</p>
      </section>
      <section>
        <auro-header level="2" id="disabledState">Disabled state</auro-header>
        <p>When a counter is disabled, the <code>aria-disabled</code> attribute is set, the counter leaves the keyboard tab order, and the increment and decrement buttons can't be used. Screen readers announce the disabled state to the user.</p>
      </section>
      <section>
        <auro-header level="2" id="dropdownA11y">Dropdown accessibility</auro-header>
        <p>When used as a dropdown (<code>isDropdown</code>), the counter group inherits dropdown accessibility patterns. Name the close button in fullscreen mode with the <code>ariaLabel.bib.close</code> slot. Without it, the button's name is "Close".</p>
      </section>
    </div>
  </div>
</div>
