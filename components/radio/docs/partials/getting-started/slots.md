<auro-header level="2" id="slots">Slots</auro-header>
<auro-header level="3" id="slotsGroup">auro-radio-group Slots</auro-header>
<auro-header level="4" id="slot-legend">legend</auro-header>
<p>The <code>legend</code> slot provides an accessible label for the radio group. This is rendered inside a native <code>&lt;legend&gt;</code> element within the component's <code>&lt;fieldset&gt;</code>.</p>
<auro-header level="4" id="slot-helpText">helpText</auro-header>
<p>The <code>helpText</code> slot allows custom help text to be displayed below the radio group.</p>
<auro-header level="4" id="slot-optionalLabel">optionalLabel</auro-header>
<p>The <code>optionalLabel</code> slot allows overriding the default <em>"(optional)"</em> text that appears next to the legend when the group is not required.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

<auro-header level="3" id="slotsRadio">auro-radio Slots</auro-header>
<auro-header level="4" id="slot-default-radio">(default)</auro-header>
<p>Default slot for the radio button label text. If content is placed inside the <code>&lt;auro-radio&gt;</code> element, it overrides the <code>label</code> attribute. This is useful for rich label content such as multiline text.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multiline-group.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multiline-group.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="slot-content">content</auro-header>
<p>Named slot for additional content rendered below the radio button label. Use this for supplementary information or descriptions associated with a radio option.</p>
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/content-slot.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
  <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/content-slot.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
