<!-- auro-menu does not implement direct keyboard event handling. -->
<!-- Keyboard navigation is delegated to parent components (auro-select, auro-combobox) via their keyboard strategy files. -->
<div class="note">
  <p><strong>Note:</strong> The <code>&lt;auro-menu&gt;</code> component does not handle keyboard events directly. Keyboard navigation is managed by the parent component (e.g., <code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>) through their keyboard strategy classes, which call menu methods such as <code>navigateOptions()</code>, <code>makeSelection()</code>, and <code>updateActiveOption()</code>.</p>
</div>
