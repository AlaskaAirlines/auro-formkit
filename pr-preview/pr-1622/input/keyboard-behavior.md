<auro-header level="1" id="overview">Input - Keyboard Behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
<p>The <code>&lt;auro-input&gt;</code> component has two focusable elements:</p>
<ol>
<li><strong>Input:</strong> the native <code>&lt;input&gt;</code> element.</li>
<li><strong>Clear button:</strong> only shown when the input has a value.</li>
</ol>
<p>Each focusable element <em>(when shown)</em> participates in the browser window's default <code>tabindex</code> sequence.</p>
<p>When the component is <code>disabled</code> it is removed from the <code>tabindex</code> sequence.</p>
<auro-header level="2" id="keyEvents">Key Events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
<!-- auro-input does not implement direct keyboard event handling. -->
<!-- All text input behavior is delegated to the native <input> element. -->
<!-- The clear button intercepts keydown with stopPropagation() to prevent parent components from handling the event. -->
<div class="note">
<p><strong>Note:</strong> The <code>&lt;auro-input&gt;</code> component delegates all keyboard behavior to the native <code>&lt;input&gt;</code> element. No custom key event handlers are implemented at this time. The clear button uses <code>stopPropagation()</code> on <code>keydown</code> to prevent parent components (e.g., <code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>) from intercepting key events while the clear button has focus.</p>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>
</div>
