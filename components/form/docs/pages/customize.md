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
          <li>It does not taint <code>isInitialState</code> — a disabled field carrying a preset value still leaves the form in its initial state.</li>
        </ul>
        <p><strong>Behavior change:</strong> a form whose only invalid field was a <code>disabled</code> AND <code>required</code> field is now submittable, where previously it would have been blocked. If you were using <code>disabled</code> on a populated field to carry a value through to submission (for example, a read-only account number or a preset reference id), switch that field to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden"><code>&lt;input type="hidden"&gt;</code></a> — hidden inputs are submitted with the form even though they are not interactive, which is the native pattern for "include this value, but don't show or validate it."</p>
        <p>In the example below the Mileage Plan number is preset and disabled. Fill in the remaining required fields and submit the form — the output region below the form will show the contents of the <code>submit</code> event's <code>detail.value</code>. Notice that only <code>firstName</code> and <code>lastName</code> appear; <code>loyaltyNumber</code> is omitted even though the field has a value.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
