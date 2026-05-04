<auro-header level="3" id="selectOptions">Select one or more options</auro-header>
<ol>
  <li>
    Move focus to a checkbox
    <div class="note">
      <p>
        Each checkbox is an independent tab stop. Focus moves to the checkbox via <kbd>Tab</kbd> or by clicking/tapping the checkbox or its label.
      </p>
    </div>
  </li>
  <li>
    Toggle the checkbox
    <div class="note">
      <p>
        Press <kbd>Space</kbd> or click/tap to toggle the <code>checked</code> state. Multiple checkboxes can be checked simultaneously.
      </p>
    </div>
  </li>
  <li>
    Move focus away from the checkbox group
    <div class="note">
      <p>
        If the group is <code>required</code>, validation is triggered on blur. If no checkbox is checked the component renders the <code>valueMissing</code> error state.
      </p>
    </div>
  </li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="presetValue">Preset checked options</auro-header>
<p>Use the <code>checked</code> attribute on individual <code>&lt;auro-checkbox&gt;</code> elements to preset which options are selected on initial render.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-checked.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-checked.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="skipSelection">Skip selection</auro-header>
<p>The checkbox group does not force the user to make a selection. If no checkbox is checked and the group is not <code>required</code>, the user can move past the group without checking any option.</p>
<p>If the group is <code>required</code>, moving focus away without checking any option triggers validation and renders the <code>valueMissing</code> error state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
