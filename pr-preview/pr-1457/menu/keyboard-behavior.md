<auro-header level="1" id="overview">Menu - Keyboard Behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
<p>The <code>&lt;auro-menu&gt;</code> component does not participate in the <code>tabindex</code> sequence directly. Keyboard navigation is managed by the parent component (e.g., <code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>) through their keyboard strategy classes.</p>
<auro-header level="2" id="keyEvents">Key Events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
<!-- auro-menu does not implement direct keyboard event handling. -->
<!-- Keyboard navigation is delegated to parent components (auro-select, auro-combobox) via their keyboard strategy files. -->
<div class="note">
<p><strong>Note:</strong> The <code>&lt;auro-menu&gt;</code> component does not handle keyboard events directly. Keyboard navigation is managed by the parent component (e.g., <code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>) through their keyboard strategy classes, which call menu methods such as <code>navigateOptions()</code>, <code>makeSelection()</code>, and <code>updateActiveOption()</code>.</p>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>
</div>
