<!-- auro-input does not implement direct keyboard event handling. -->
<!-- All text input behavior is delegated to the native <input> element. -->
<!-- The clear button intercepts keydown with stopPropagation() to prevent parent components from handling the event. -->
<div class="note">
  <p><strong>Note:</strong> The <code>&lt;auro-input&gt;</code> component delegates all keyboard behavior to the native <code>&lt;input&gt;</code> element. The component doesn't add any key shortcuts of its own. The clear button calls <code>stopPropagation()</code> on <code>keydown</code>, so parent components, such as <code>&lt;auro-combobox&gt;</code> and <code>&lt;auro-datepicker&gt;</code>, don't handle keys pressed while the clear button has focus.</p>
</div>
