<auro-header level="1" id="overview">Form - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#layout">Layout</auro-anchorlink>
      <auro-anchorlink fluid href="#columnLayout" class="level2 body-xs">Column Layout</auro-anchorlink>
      <auro-anchorlink fluid href="#complexForm" class="level2 body-xs">Complex Form</auro-anchorlink>
      <auro-anchorlink fluid href="#fieldState">Field State</auro-anchorlink>
      <auro-anchorlink fluid href="#disabledFields" class="level2 body-xs">Disabled Fields</auro-anchorlink>
      <auro-anchorlink fluid href="#disableAfterEdit" class="level2 body-xs">Disabling After User Edits</auro-anchorlink>
      <auro-anchorlink fluid href="#behaviorChangesV6" class="level2 body-xs">Behavior Changes in v6</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="layout">Layout</auro-header>
        <p>The <code>auro-form</code> component does not enforce any layout on its children. Use standard CSS techniques to arrange form elements as needed.</p>
        <auro-header level="3" id="columnLayout">Column Layout</auro-header>
        <p>Use CSS Grid or Flexbox to arrange form elements in columns.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/column-layout.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/column-layout.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="complexForm">Complex Form</auro-header>
        <p>A more complex form layout with multiple element types, nested containers, and a submit/cancel button group.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="fieldState">Field State</auro-header>
        <p>Per the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled">HTML spec</a>, form controls with the <code>disabled</code> attribute are excluded from form submission and are not validated. <code>auro-form</code> mirrors that behavior.</p>
        <auro-header level="3" id="disabledFields">Disabled Fields</auro-header>
        <p>When a child form element has the <code>disabled</code> attribute:</p>
        <ul>
          <li>Its <code>name</code> is omitted from <code>form.value</code> and from the <code>submit</code> event's <code>detail.value</code>, even if the element carries a value.</li>
          <li>It does not contribute to <code>validity</code> — a disabled <code>required</code> field will not block submission.</li>
          <li>A disabled field carrying its <strong>default</strong> (attribute-declared) value does not taint <code>isInitialState</code> — the form is still in its initial state. However, a field that the user has already edited and then becomes disabled <em>does</em> still count toward the form being non-initial. Disabling a field does not clear its dirty state, matching HTML's <code>dirtyValueFlag</code> semantics.</li>
        </ul>
        <p>In the example below the Mileage Plan number is preset and disabled. Fill in the remaining required fields and submit the form — the output region below the form will show the contents of the <code>submit</code> event's <code>detail.value</code>. Notice that only <code>firstName</code> and <code>lastName</code> appear; <code>loyaltyNumber</code> is omitted even though the field has a value. See the <a href="#behaviorChangesV6">Behavior changes in v6</a> section below for the full set of migration notes, including the recommended replacement for using <code>disabled</code> to carry values through to submission.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disableAfterEdit">Disabling a field after user edits</auro-header>
        <p>If a field is disabled <em>after</em> the user has edited it, the value is still excluded from <code>form.value</code>, validation, and the submit payload — but the form correctly reports as non-initial and Reset remains enabled. Type into the field below, then click "Disable field" to observe the behavior. Submit to see the form's current <code>value</code> and <code>isInitialState</code>.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-after-edit.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-after-edit.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="behaviorChangesV6">Behavior changes in v6</auro-header>
        <p>This release brings <code>auro-form</code> closer to native HTML form semantics. The following are consumer-visible behavior changes from previous versions:</p>
        <ul>
          <li><strong><code>form.value</code> omits disabled fields.</strong> Any control with the <code>disabled</code> attribute is excluded from <code>form.value</code> and from the <code>submit</code> event's <code>detail.value</code>. <em>Migration:</em> if you were using <code>disabled</code> on a populated field to carry a value through to submission (for example, a read-only account number or a preset reference id), switch that field to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden"><code>&lt;input type="hidden"&gt;</code></a> — hidden inputs are submitted with the form even though they are not interactive, which is the native pattern for "include this value, but don't show or validate it."</li>
          <li><strong>Disabled required fields no longer block submission.</strong> A form whose only invalid field is a <code>disabled</code> + <code>required</code> field is now submittable. Per the HTML spec, disabled controls do not participate in constraint validation.</li>
          <li><strong><code>isInitialState</code> uses a dirty-value-flag model.</strong> A field taints the form only when its current value diverges from its captured initial value (or enters an error validity state). A pre-filled form whose user has not yet edited anything reports <code>isInitialState === true</code>; previously, any non-null value would mark the form as non-initial. Disabling a previously-edited field does <em>not</em> clear the dirty flag — the form correctly remains non-initial. <em>Migration:</em> if you were using <code>isInitialState === false</code> as a proxy for "user has interacted with the form," use a per-field <code>touched</code> signal on each <code>auro-input</code> instead.</li>
          <li><strong>Submit availability depends on validity alone.</strong> The Submit button is enabled when no enabled field has an unmet constraint, regardless of <code>isInitialState</code>. Pre-filled valid forms (for example, forms pre-populated from a logged-in user's profile) can be submitted on first render without a prior user edit. Empty forms with only optional fields also have Submit enabled at first render. Previously both cases would have been blocked.</li>
          <li><strong>Focus/blur on an optional field no longer taints the form.</strong> Tabbing through an optional field that the user did not edit no longer flips <code>isInitialState</code> to <code>false</code>. Required fields are unaffected — focusing then blurring an empty required field still taints, because the resulting <code>'valueMissing'</code> validity is an error state. <em>Migration:</em> if you needed "user has engaged with the form" as a signal, use per-field <code>touched</code> state on each <code>auro-input</code>.</li>
        </ul>
      </section>
    </div>
  </div>
</div>
