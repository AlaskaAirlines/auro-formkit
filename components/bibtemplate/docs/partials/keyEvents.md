<!-- auro-bibtemplate does not implement keyboard event handling. -->
<!-- It is a layout/template component for dropdown bibs. -->
<div class="note">
  <p><strong>Note:</strong> The <code>&lt;auro-bibtemplate&gt;</code> component does not handle keyboard events directly. It is an internal layout component used by <code>&lt;auro-dropdown&gt;</code>, <code>&lt;auro-select&gt;</code>, and <code>&lt;auro-counter-group&gt;</code> for fullscreen mobile modals. The close button responds to click events. Parent components call <code>focusCloseButton()</code> to manage focus when the dialog opens.</p>
</div>
