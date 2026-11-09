<auro-header level="2" id="slots">Slots</auro-header>

<auro-header level="3" id="slotsGroup">auro-counter-group</auro-header>
<p>The following slots are available on the <code>&lt;auro-counter-group&gt;</code> element.</p>

<auro-header level="4" id="slot-default-group">(default)</auro-header>
<p>The <code>auro-counter</code> elements in the group. Every group needs at least one.</p>

<auro-header level="4" id="slot-label">label</auro-header>
<p>The label shown in the dropdown trigger, such as "Passengers". Applies only when <code>isDropdown</code> is set.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="4" id="slot-helpText">helpText</auro-header>
<p>Extra guidance shown below the dropdown. An error message replaces it while any counter is invalid. Applies only when <code>isDropdown</code> is set.</p>

<auro-header level="4" id="slot-valueText">valueText</auro-header>
<p>Custom text shown in the dropdown trigger in place of the default summary of each counter's value and label. Applies only when <code>isDropdown</code> is set.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-value-text.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-value-text.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="4" id="slot-typeIcon">typeIcon</auro-header>
<p>An icon shown at the start of the dropdown trigger, such as a person icon for a passenger selector. Applies only when <code>isDropdown</code> is set.</p>

<auro-header level="4" id="slot-bib-fullscreen-headline">bib.fullscreen.headline</auro-header>
<p>The heading shown at the top of the fullscreen dropdown, such as "Passengers". Set it whenever <code>isDropdown</code> is set.</p>

<auro-header level="4" id="slot-bib-fullscreen-footer">bib.fullscreen.footer</auro-header>
<p>Content shown at the bottom of the fullscreen dropdown, such as Reset and Save buttons. Applies only when <code>isDropdown</code> is set.</p>

<auro-header level="4" id="slot-ariaLabel-bib-close">ariaLabel.bib.close</auro-header>
<p>Text screen readers announce for the close button in the fullscreen dropdown, such as "Close passenger selector". Defaults to "Close", so set it whenever <code>isDropdown</code> is set.</p>

<auro-header level="3" id="slotsCounter">auro-counter</auro-header>
<p>The following slots are available on the <code>&lt;auro-counter&gt;</code> element.</p>

<auro-header level="4" id="slot-default-counter">(default)</auro-header>
<p>The counter's label, such as "Adults", shown next to the minus and plus buttons. Screen readers read it as the counter's name.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic-standalone.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="4" id="slot-description">description</auro-header>
<p>Short supporting text shown below the label, such as "18 years or older". Screen readers read it as part of the counter's name.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/description.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/description.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="4" id="slot-helpText-counter">helpText</auro-header>
<p>Extra guidance shown below the counter. An error message replaces it while the counter is invalid.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-helptext.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-helptext.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="4" id="slot-ariaLabel-minus">ariaLabel.minus</auro-header>
<p>Text screen readers announce for the minus button, such as "Remove adult". Defaults to "−" (a minus sign), so set it on every counter.</p>

<auro-header level="4" id="slot-ariaLabel-plus">ariaLabel.plus</auro-header>
<p>Text screen readers announce for the plus button, such as "Add adult". Defaults to "+", so set it on every counter.</p>
