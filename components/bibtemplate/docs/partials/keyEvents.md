<!-- auro-bibtemplate does not implement keyboard event handling. -->
<!-- It is a layout/template component for dropdown bibs. -->
<div class="note">
  <p><strong>Note:</strong> The <code>&lt;auro-bibtemplate&gt;</code> component doesn't handle keyboard events directly. It lays out the content of the dropdown bib in components such as <code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>, <code>&lt;auro-datepicker&gt;</code>, and <code>&lt;auro-counter-group&gt;</code>, and adds a close button when the bib is shown fullscreen on small screens. Keyboard users press Enter or Space to activate the close button, as with any button. When the fullscreen bib opens, some parent components, such as <code>&lt;auro-select&gt;</code>, call <code>focusCloseButton()</code> to move focus to the close button.</p>
</div>
