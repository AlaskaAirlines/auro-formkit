<auro-header level="3" id="standaloneCounter">Standalone counter</auro-header>
<p>As a user, I want a simple numeric input that I can increment or decrement to select a quantity.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="3" id="counterGroup">Counter group</auro-header>
<p>As a user, I want to select multiple related quantities, such as different passenger types, in a single grouped interface.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="3" id="dropdownCounter">Dropdown counter</auro-header>
<p>As a user, I want a compact dropdown that expands to reveal counter options, saving space in forms.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="3" id="viewport">Change viewport size</auro-header>
<p>The user may change the size of their viewport, for example by resizing their desktop browser window or rotating their mobile device. In some cases, this re-renders the counter group while the dropdown bib is expanded, and the open bib can switch from a popover to a fullscreen modal or back.</p>
<auro-header level="4" id="us-popoverToModal">Popover to modal</auro-header>
<p>While in a popover display state with the bib open, focus is on the trigger. After switching to the fullscreen modal dialog, focus moves to the close button inside the dialog.</p>
<auro-header level="4" id="us-modalToPopover">Modal to popover</auro-header>
<p>While in a fullscreen modal display state with the bib open, focus is on the close button inside the dialog. After switching to the popover display, focus moves to the trigger.</p>
