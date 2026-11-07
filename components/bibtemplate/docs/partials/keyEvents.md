<!-- auro-bibtemplate does not implement keyboard event handling. -->
<!-- It is a layout/template component for dropdown bibs. -->
<div class="note">
  <p><strong>Note:</strong> The <code>&lt;auro-bibtemplate&gt;</code> component doesn't handle keyboard events directly. It's an internal layout component for fullscreen mobile modals, used inside the dropdown bibs of components such as <code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>, <code>&lt;auro-datepicker&gt;</code>, and <code>&lt;auro-counter-group&gt;</code>. The close button responds to click events. Parent components call <code>focusCloseButton()</code> to manage focus when the dialog opens.</p>
</div>
