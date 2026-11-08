<auro-header level="1" id="overview">Input: Keyboard behavior</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="tabBehavior">Tab behavior</auro-header>
<p>The <code>&lt;auro-input&gt;</code> component has up to three focusable elements:</p>
<ol>
<li><strong>Input:</strong> The native <code>&lt;input&gt;</code> element.</li>
<li><strong>Show/hide password button:</strong> Shown only in the <code>classic</code> layout, when <code>type="password"</code> is set and the input has a value.</li>
<li><strong>Clear button:</strong> Shown only when the input has a value and isn't <code>disabled</code> or <code>readonly</code>.</li>
</ol>
<p>Each focusable element <em>(when shown)</em> participates in the browser window's default <code>tabindex</code> sequence.</p>
<p>When the component is <code>disabled</code>, it's removed from the <code>tabindex</code> sequence.</p>
<auro-header level="2" id="keyEvents">Key events</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
<!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
<!-- auro-input does not implement direct keyboard event handling. -->
<!-- All text input behavior is delegated to the native <input> element. -->
<!-- The clear button intercepts keydown with stopPropagation() to prevent parent components from handling the event. -->
<div class="note">
<p><strong>Note:</strong> The <code>&lt;auro-input&gt;</code> component delegates all keyboard behavior to the native <code>&lt;input&gt;</code> element. The component doesn't add any key shortcuts of its own. The clear button calls <code>stopPropagation()</code> on <code>keydown</code>, so parent components, such as <code>&lt;auro-combobox&gt;</code> and <code>&lt;auro-datepicker&gt;</code>, don't handle keys pressed while the clear button has focus.</p>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</div>
</div>
