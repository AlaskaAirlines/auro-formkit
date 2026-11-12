<auro-header level="1" id="overview">Form: Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#layout">Layout</auro-anchorlink>
      <auro-anchorlink fluid href="#columnLayout" class="level2 body-xs">Column layout</auro-anchorlink>
      <auro-anchorlink fluid href="#complexForm" class="level2 body-xs">Complex form</auro-anchorlink>
      <auro-anchorlink fluid href="#fieldState">Field state</auro-anchorlink>
      <auro-anchorlink fluid href="#disabledFields" class="level2 body-xs">Disabled fields</auro-anchorlink>
      <auro-anchorlink fluid href="#disableAfterEdit" class="level2 body-xs">Disabling a field after user edits</auro-anchorlink>
      <auro-anchorlink fluid href="#behaviorChangesV6" class="level2 body-xs">Behavior changes in v6</auro-anchorlink>
      <auro-anchorlink fluid href="#runtimeMutations" class="level2 body-xs">Runtime DOM mutations</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="layout">Layout</auro-header>
        <p>The <code>auro-form</code> component doesn't enforce any layout on its children. Use standard CSS techniques to arrange form elements as needed.</p>
        <auro-header level="3" id="columnLayout">Column layout</auro-header>
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
        <auro-header level="3" id="complexForm">Complex form</auro-header>
        <p>A realistic booking form that uses every form element <code>auro-form</code> manages: <code>auro-input</code>, <code>auro-select</code>, <code>auro-combobox</code>, a range <code>auro-datepicker</code>, <code>auro-counter-group</code>, <code>auro-radio-group</code>, and <code>auro-checkbox-group</code>. The fields are arranged in nested containers, with reset and submit buttons at the end.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.js) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="fieldState">Field state</auro-header>
        <p>The <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled" target="_blank">HTML spec</auro-hyperlink> leaves form controls with the <code>disabled</code> attribute out of form submission and validation, and <code>auro-form</code> does the same.</p>
        <auro-header level="3" id="disabledFields">Disabled fields</auro-header>
        <p>When a child form element has the <code>disabled</code> attribute:</p>
        <ul>
          <li>The form leaves its <code>name</code> out of <code>form.value</code> and the <code>submit</code> event's <code>detail.value</code>, even if the element has a value.</li>
          <li>It doesn't contribute to <code>validity</code>, so a disabled <code>required</code> field doesn't block submission.</li>
          <li>A disabled field that still holds its starting value, the value it had when the form first found it, doesn't set <code>isInitialState</code> to <code>false</code>. A field the user edited before it became disabled still sets it to <code>false</code>, because disabling a field doesn't clear its edits, as with the HTML dirty value flag.</li>
        </ul>
        <p>In the example below, the Mileage Plan number is preset and disabled. Fill in the remaining required fields and submit the form. The output region below the form shows the contents of the <code>submit</code> event's <code>detail.value</code>. Only <code>firstName</code> and <code>lastName</code> appear, and the form leaves out <code>loyaltyNumber</code> even though the field has a value. See the <auro-hyperlink href="#behaviorChangesV6">Behavior changes in v6</auro-hyperlink> section below for the full set of migration notes, including how to send a value that the user can't edit.</p>
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
        <p>When a field becomes disabled <em>after</em> the user edits it, the form still leaves its value out of <code>form.value</code>, validation, and the <code>submit</code> event, but <code>isInitialState</code> stays <code>false</code> and the reset button stays on. Type in the field below, then click "Disable field" to see this. Submit to see the form's current <code>value</code> and <code>isInitialState</code>.</p>
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
        <p>Version 6 brings <code>auro-form</code> closer to how native HTML forms behave. These are the behavior changes you might notice when you upgrade from an earlier version:</p>
        <ul>
          <li><strong><code>form.value</code> omits disabled fields.</strong> The form leaves any control with the <code>disabled</code> attribute out of <code>form.value</code> and the <code>submit</code> event's <code>detail.value</code>. <em>Migration:</em> if you were using <code>disabled</code> on a populated field to carry a value through to submission, such as a read-only account number or a preset reference ID, add that value to the submitted data yourself, for example in your <code>submit</code> event handler. <code>auro-form</code> only collects Auro form elements, so a native <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden"><code>&lt;input type="hidden"&gt;</code></a> inside it doesn't appear in <code>form.value</code> or <code>detail.value</code>.</li>
          <li><strong>Disabled required fields no longer block submission.</strong> A form whose only invalid field is a <code>disabled</code> + <code>required</code> field is now submittable. Per the HTML spec, disabled controls don't participate in constraint validation.</li>
          <li><strong><code>isInitialState</code> now tracks edits, like the HTML dirty value flag.</strong> A field sets <code>isInitialState</code> to <code>false</code> only when its value differs from its starting value or it fails validation. A pre-filled form that the user hasn't edited reports <code>isInitialState === true</code>; before, any value other than <code>null</code> set it to <code>false</code>. Disabling a field the user edited doesn't undo the edit, so <code>isInitialState</code> stays <code>false</code>. <em>Migration:</em> if you were using <code>isInitialState === false</code> as a proxy for "user has interacted with the form," listen for <code>focusin</code> events on the <code>auro-form</code> element instead. Focus events bubble out of each field's shadow DOM, so one listener on the form tells you when the user moves into any of its fields. To react to edits, listen for the form's <code>change</code> event, which fires whenever a field's value changes. It also fires when the form rebuilds its state, such as after a reset.</li>
          <li><strong>Submit availability depends on validity alone.</strong> The submit button is on whenever no enabled field is invalid or required but empty, whatever the value of <code>isInitialState</code>. People can submit a valid pre-filled form, such as one filled in from a signed-in user's profile, as soon as it renders, without editing it first. An empty form with only optional fields also starts with the submit button on. Before, the submit button was off in both cases.</li>
          <li><strong>Focusing and leaving an optional field no longer changes <code>isInitialState</code>.</strong> Tabbing through an optional field without editing it no longer sets <code>isInitialState</code> to <code>false</code>. Required fields work as before: focusing and then leaving an empty required field still sets it to <code>false</code>, because the field fails validation with <code>valueMissing</code>. <em>Migration:</em> if you needed "user has engaged with the form" as a signal, listen for <code>focusin</code> events on the <code>auro-form</code> element, as described in the <code>isInitialState</code> migration note above.</li>
        </ul>
        <auro-header level="3" id="runtimeMutations">Runtime DOM mutations</auro-header>
        <p><code>auro-form</code> tracks its child form elements through a subtree <code>MutationObserver</code> on <code>name</code> and <code>disabled</code> attributes, plus a slot-change listener. The following runtime patterns work without any reinitialization on your side:</p>
        <ul>
          <li><strong>Runtime renames.</strong> Changing the <code>name</code> attribute on a tracked field re-keys the form's state and moves the captured initial value to the new key, preserving <code>isInitialState</code> semantics across the rename. <code>form.value</code> reflects the new key on the next render. Removing the <code>name</code> attribute drops the field from the form's state and removes its captured initial value.</li>
          <li><strong>Late name attachment.</strong> An element that initially renders without a <code>name</code> is invisible to <code>auro-form</code> (it queries via <code>[name]</code>). When you add a <code>name</code> attribute later, the form picks up the field automatically: the same attribute observer adds it to the form's state and attaches the <code>input</code>, <code>auroFormElement-validated</code>, and <code>keydown</code> listeners.</li>
          <li><strong>Reset button state.</strong> The reset button is on whenever <code>isInitialState</code> is <code>false</code>, or when any enabled field has a current or starting value. A disabled field that only holds its starting value doesn't turn it on, but a field the user edited before it became disabled does, so the user can always reset the form.</li>
          <li><strong>Enter-to-submit on disabled fields.</strong> Pressing Enter inside a disabled form field never submits the form, matching native HTML behavior. Disabled controls don't dispatch the implicit submit, so the user must move focus to an enabled field (or click Submit) to trigger submission.</li>
        </ul>
      </section>
    </div>
  </div>
</div>
