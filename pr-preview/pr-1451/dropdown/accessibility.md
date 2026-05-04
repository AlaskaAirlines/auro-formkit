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
<!-- The below content is automatically added from ./../docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior</auro-hyperlink>, i.e., these keys step through the browser tabindex sequence.</p>
<p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence. VoiceOver's virtual cursor <em>(swipe navigation)</em> can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
<p>When the bib is collapsed, the bib content is excluded from the tab sequence. When <strong>expanded</strong>, focusable elements within the bib content are included in the natural tab order. In fullscreen mode, focus is trapped within the bib, and the tab sequence cycles through the bib content focusable elements until the bib is closed or the viewport no longer meets the fullscreen condition and is rendered as a popover.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="disabledState">Disabled State</auro-header>
<p>When a dropdown is disabled, <code>aria-disabled</code> is set and the trigger cannot be activated. The element is removed from the tab sequence. Screen readers will announce the disabled state to the user.</p>
</section>
</div>
</div>
</div>
