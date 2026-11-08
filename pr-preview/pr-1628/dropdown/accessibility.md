<auro-header level="1" id="overview">Dropdown: Accessibility</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="a11yLabels">Accessible labels</auro-header>
<p>To meet accessibility requirements, every <code>auro-dropdown</code> trigger must have an accessible name. The name comes from the content in the <code>trigger</code> slot:</p>
<ol>
<li>When the <code>trigger</code> slot holds text or an icon, screen readers read that content as the trigger's name, so make sure it describes what the dropdown opens. For an icon, add a description, such as text in the <code>auro-icon</code> default slot.</li>
<li>When the <code>trigger</code> slot holds its own focusable control, such as a button or an input, give that control an accessible name.</li>
</ol>
<p>A trigger without an accessible name doesn't comply with Alaska's accessibility policies.</p>
</section>
<section>
<auro-header level="2" id="interactions">Supported interactions</auro-header>
<p>People can <strong>open</strong> the dropdown in these ways:</p>
<ol>
<li>Click or tap the trigger.</li>
<li>Tab to the trigger and press <code>Enter</code> or <code>Space</code>.</li>
<li>Use another control on the page that calls the <code>show()</code> method.</li>
</ol>
<p>People can <strong>close</strong> the dropdown in these ways:</p>
<ol>
<li>Click or tap anywhere outside the dropdown, unless <code>noToggle</code> is set.</li>
<li>Press <code>Escape</code>.</li>
<li>Use another control on the page that calls the <code>hide()</code> method.</li>
</ol>
</section>
<section>
<auro-header level="2" id="desktopModal">Desktop modal</auro-header>
<p>When <code>desktopModal</code> is set and the bib isn't fullscreen, the open bib acts as a modal dialog:</p>
<ul>
<li>The dropdown makes the rest of the page <code>inert</code>, so people can't interact with content outside the dropdown.</li>
<li>Focus moves into the bib when it opens, and <code>Tab</code> and <code>Shift+Tab</code> cycle through the bib content.</li>
<li>The dropdown removes the <code>inert</code> state and releases focus when the bib closes or the dropdown is removed from the page.</li>
</ul>
<p>A fullscreen bib already behaves this way, because it opens with the <code>&lt;dialog&gt;</code> element's <code>showModal()</code> method, so <code>desktopModal</code> applies only when the bib isn't fullscreen.</p>
</section>
<section>
<auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/tabindex.md) -->
<!-- The below content is automatically added from ./../docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior</auro-hyperlink>: these keys move through the page's tab sequence.</p>
<p>When the component is <code>disabled</code>, the trigger stays in the tab sequence but can't open the bib.</p>
<p>While the bib is collapsed, its content isn't in the tab sequence. When the bib <strong>expands</strong>, focus moves to the first focusable element in it, and its focusable elements join the natural tab order. In fullscreen mode, focus stays in the bib, and <code>Tab</code> cycles through its focusable elements until the bib closes or the screen grows wider than the <code>fullscreenBreakpoint</code> width.</p>
<p>When <code>desktopModal</code> is set, focus also stays in the bib when it isn't fullscreen. The dropdown makes the rest of the page <code>inert</code>, so people can't interact with content outside the dropdown until it closes.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="disabledState">Disabled state</auro-header>
<p>When a dropdown is disabled, the trigger gets <code>aria-disabled="true"</code> and can't open the bib. The trigger stays in the tab sequence, and screen readers announce the disabled state.</p>
</section>
</div>
</div>
</div>
