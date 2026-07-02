<auro-header level="1" id="overview">Menu - Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="menuRole">Menu Role</auro-header>
<p>The <code>auro-menu</code> component renders with <code>role="listbox"</code>. Each <code>auro-menuoption</code> renders with <code>role="option"</code>. This semantic structure allows assistive technologies to communicate the list of options and their states.</p>
</section>
<section>
<auro-header level="2" id="optionStates">Option States</auro-header>
<p>Menu options communicate their state to assistive technologies:</p>
<ul>
<li><strong>Selected:</strong> The <code>aria-selected</code> attribute is set to <code>true</code> on the selected option(s).</li>
<li><strong>Disabled:</strong> The <code>aria-disabled</code> attribute is set to <code>true</code> on disabled options, preventing interaction.</li>
<li><strong>Hidden:</strong> Options with the <code>hidden</code> attribute are removed from the accessible tree.</li>
</ul>
</section>
<section>
<auro-header level="2" id="keyboardInteraction">Keyboard Interaction</auro-header>
<p>The menu supports full keyboard navigation:</p>
<ul>
<li><strong>Arrow Down / Arrow Up:</strong> Moves focus between options.</li>
<li><strong>Enter / Space:</strong> Selects the currently focused option.</li>
<li><strong>Home / End:</strong> Moves focus to the first or last option.</li>
</ul>
<p>See the <auro-hyperlink href="keyboardBehavior">Keyboard Behavior</auro-hyperlink> page for full details.</p>
</section>
<section>
<auro-header level="2" id="multiselect">Multi-Select</auro-header>
<p>When the <code>multiselect</code> attribute is set, <code>aria-multiselectable="true"</code> is applied to the menu, allowing multiple options to be selected. Each option's <code>aria-selected</code> attribute reflects its individual selection state.</p>
</section>
</div>
</div>
</div>
