<auro-header level="1" id="overview">Counter - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="ariaRoles">ARIA Roles and Attributes</auro-header>
<p>The <code>auro-counter</code> component uses the <code>spinbutton</code> role to convey its purpose to assistive technologies. Key ARIA attributes include:</p>
<ul>
<li><code>role="spinbutton"</code> — Identifies the element as a numeric spinner control.</li>
<li><code>aria-valuenow</code> — Reflects the current counter value.</li>
<li><code>aria-valuemin</code> — Reflects the minimum allowed value.</li>
<li><code>aria-valuemax</code> — Reflects the maximum allowed value.</li>
<li><code>aria-label</code> — Derived from the default slot content (counter label).</li>
</ul>
</section>
<section>
<auro-header level="2" id="accessibleLabels">Accessible Labels</auro-header>
<p>The increment and decrement buttons include accessible labels. Custom labels can be provided using the <code>ariaLabel.minus</code> and <code>ariaLabel.plus</code> slots to override the default button descriptions.</p>
</section>
<section>
<auro-header level="2" id="screenReader">Screen Reader Announcements</auro-header>
<p>When a user interacts with the counter, the updated value is announced via the <code>aria-valuenow</code> attribute. Screen readers will announce the counter label and current value when the element receives focus.</p>
</section>
<section>
<auro-header level="2" id="disabledState">Disabled State</auro-header>
<p>When a counter is disabled, the <code>aria-disabled</code> attribute is set, and the increment/decrement buttons become inoperable. Screen readers will announce the disabled state to the user.</p>
</section>
<section>
<auro-header level="2" id="dropdownA11y">Dropdown Accessibility</auro-header>
<p>When used as a dropdown (<code>isDropdown</code>), the counter group inherits dropdown accessibility patterns. The <code>ariaLabel.bib.close</code> slot provides an accessible label for the close button in fullscreen mode.</p>
</section>
</div>
</div>
</div>
