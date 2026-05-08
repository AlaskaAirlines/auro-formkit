<!-- auro-input does not implement direct keyboard event handling. -->
<!-- All text input behavior is delegated to the native <input> element. -->
<!-- The clear button intercepts keydown with stopPropagation() to prevent parent components from handling the event. -->
<div class="note">
  <p><strong>Note:</strong> The <code>&lt;auro-input&gt;</code> component delegates all keyboard behavior to the native <code>&lt;input&gt;</code> element. No custom key event handlers are implemented at this time. The clear button uses <code>stopPropagation()</code> on <code>keydown</code> to prevent parent components (e.g., <code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>) from intercepting key events while the clear button has focus.</p>
</div>
