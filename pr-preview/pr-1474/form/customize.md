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
<!-- The below content is automatically added from ./../apiExamples/column-layout.html -->
<style>
          .columned-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            align-items: start;
          }

          .columned-form .span-2 {
            grid-column: span 2;
          }

          .columned-form-controls {
            display: flex;
            justify-content: flex-end;
            margin-top: 1rem;
          }
</style>
<auro-form>
<div class="columned-form">
<auro-input id="cl-first-name" name="firstName" required>
<span slot="label">First Name</span>
</auro-input>
<auro-input id="cl-last-name" name="lastName" required>
<span slot="label">Last Name</span>
</auro-input>
<auro-input id="cl-email" name="email" type="email" class="span-2" required>
<span slot="label">Email</span>
</auro-input>
<auro-datepicker id="cl-date-range" name="dateRange" class="span-2" required range>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
</div>
<div class="columned-form-controls">
<auro-button type="submit">Submit</auro-button>
</div>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/column-layout.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/column-layout.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  .columned-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }
​
  .columned-form .span-2 {
    grid-column: span 2;
  }
​
  .columned-form-controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
&lt;/style&gt;
&lt;auro-form&gt;
  &lt;div class="columned-form"&gt;
    &lt;auro-input id="cl-first-name" name="firstName" required&gt;
      &lt;span slot="label"&gt;First Name&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input id="cl-last-name" name="lastName" required&gt;
      &lt;span slot="label"&gt;Last Name&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-input id="cl-email" name="email" type="email" class="span-2" required&gt;
      &lt;span slot="label"&gt;Email&lt;/span&gt;
    &lt;/auro-input&gt;
    &lt;auro-datepicker id="cl-date-range" name="dateRange" class="span-2" required range&gt;
      &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
      &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
      &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="columned-form-controls"&gt;
    &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="complexForm">Complex Form</auro-header>
<p>A more complex form layout with multiple element types, nested containers, and a submit/cancel button group.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
<!-- The below content is automatically added from ./../apiExamples/complex.html -->
<style>
          .submitBlock {
            margin-top: 1rem;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
          }
          .datepickerBlock {
            margin-top: 1rem;
          }
          .complex-form {
            display: block;
            padding: 1rem;
            border: 1px solid #2a2a2a;
            border-radius: 1rem;
          }
</style>
<auro-form class="complex-form">
<auro-input id="first-name" name="firstName" required>
<span slot="label">First Name</span>
</auro-input>
<br />
<auro-input id="last-name" name="lastName" required>
<span slot="label">Last Name</span>
</auro-input>
<br />
<auro-input id="occupation" name="occupation" required>
<span slot="label">Occupation</span>
</auro-input>
<br />
<auro-input-two id="cool-fact" name="coolFact" required>
<span slot="label">Cool Fact</span>
</auro-input-two>
<div class="datepickerBlock">
<h4>Pick a cool date</h4>
<auro-datepicker id="date-example" name="dateExample" required>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
</div>
<div class="datepickerBlock">
<h4>Pick a date range</h4>
<auro-datepicker id="date-range" name="dateRange" required range>
<span slot="fromLabel">Start</span>
<span slot="toLabel">End</span>
<span slot="bib.fullscreen.fromLabel">Start</span>
<span slot="bib.fullscreen.toLabel">End</span>
</auro-datepicker>
</div>
<div class="submitBlock">
<auro-button type="reset">Reset</auro-button>
<auro-button type="submit">Submit</auro-button>
</div>
</auro-form>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/complex.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  .submitBlock {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  .datepickerBlock {
    margin-top: 1rem;
  }
  .complex-form {
    display: block;
    padding: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 1rem;
  }
&lt;/style&gt;
&lt;auro-form class="complex-form"&gt;
  &lt;auro-input id="first-name" name="firstName" required&gt;
    &lt;span slot="label"&gt;First Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="last-name" name="lastName" required&gt;
    &lt;span slot="label"&gt;Last Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="occupation" name="occupation" required&gt;
    &lt;span slot="label"&gt;Occupation&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input-two id="cool-fact" name="coolFact" required&gt;
    &lt;span slot="label"&gt;Cool Fact&lt;/span&gt;
  &lt;/auro-input-two&gt;
  &lt;div class="datepickerBlock"&gt;
    &lt;h4&gt;Pick a cool date&lt;/h4&gt;
    &lt;auro-datepicker id="date-example" name="dateExample" required&gt;
      &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="datepickerBlock"&gt;
    &lt;h4&gt;Pick a date range&lt;/h4&gt;
    &lt;auro-datepicker id="date-range" name="dateRange" required range&gt;
      &lt;span slot="fromLabel"&gt;Start&lt;/span&gt;
      &lt;span slot="toLabel"&gt;End&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;Start&lt;/span&gt;
      &lt;span slot="bib.fullscreen.toLabel"&gt;End&lt;/span&gt;
    &lt;/auro-datepicker&gt;
  &lt;/div&gt;
  &lt;div class="submitBlock"&gt;
    &lt;auro-button type="reset"&gt;Reset&lt;/auro-button&gt;
    &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
  &lt;/div&gt;
&lt;/auro-form&gt;</code></pre>
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
<p><strong>Behavior change:</strong> a form whose only invalid field was a <code>disabled</code> AND <code>required</code> field is now submittable, where previously it would have been blocked. If you were using <code>disabled</code> on a populated field to carry a value through to submission (for example, a read-only account number or a preset reference id), switch that field to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden"><code>&lt;input type="hidden"&gt;</code></a> — hidden inputs are submitted with the form even though they are not interactive, which is the native pattern for "include this value, but don't show or validate it."</p>
<p>In the example below the Mileage Plan number is preset and disabled. Fill in the remaining required fields and submit the form — the output region below the form will show the contents of the <code>submit</code> event's <code>detail.value</code>. Notice that only <code>firstName</code> and <code>lastName</code> appear; <code>loyaltyNumber</code> is omitted even though the field has a value.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-form id="disabledExampleForm">
<auro-input id="first-name" name="firstName" required>
<span slot="label">First Name</span>
</auro-input>
<br />
<auro-input id="last-name" name="lastName" required>
<span slot="label">Last Name</span>
</auro-input>
<br />
<auro-input id="loyalty-number" name="loyaltyNumber" value="AS-123456" disabled>
<span slot="label">Mileage Plan number</span>
<span slot="helpText">Account number is read-only and is not submitted with the form.</span>
</auro-input>
<br />
<auro-button type="submit">Submit</auro-button>
</auro-form>
<output id="disabledExampleOutput" form="disabledExampleForm" aria-live="polite">Submit the form to see what data gets stored.</output>
<style>
          #disabledExampleOutput {
            display: block;
            margin-top: 2rem;
            padding: 1rem 1.25rem;
            border-left: 4px solid #2a2a2a;
            border-radius: 0.25rem;
            background: #f5f5f5;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
            white-space: pre-wrap;
          }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-form id="disabledExampleForm"&gt;
  &lt;auro-input id="first-name" name="firstName" required&gt;
    &lt;span slot="label"&gt;First Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="last-name" name="lastName" required&gt;
    &lt;span slot="label"&gt;Last Name&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-input id="loyalty-number" name="loyaltyNumber" value="AS-123456" disabled&gt;
    &lt;span slot="label"&gt;Mileage Plan number&lt;/span&gt;
    &lt;span slot="helpText"&gt;Account number is read-only and is not submitted with the form.&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
&lt;/auro-form&gt;
&lt;output id="disabledExampleOutput" form="disabledExampleForm" aria-live="polite"&gt;Submit the form to see what data gets stored.&lt;/output&gt;
&lt;style&gt;
  #disabledExampleOutput {
    display: block;
    margin-top: 2rem;
    padding: 1rem 1.25rem;
    border-left: 4px solid #2a2a2a;
    border-radius: 0.25rem;
    background: #f5f5f5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableAfterEdit">Disabling a field after user edits</auro-header>
<p>If a field is disabled <em>after</em> the user has edited it, the value is still excluded from <code>form.value</code>, validation, and the submit payload — but the form correctly reports as non-initial and Reset remains enabled. Type into the field below, then click "Disable field" to observe the behavior. Submit to see the form's current <code>value</code> and <code>isInitialState</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-after-edit.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-after-edit.html -->
<auro-form id="disableAfterEditForm">
<auro-input id="dae-field" name="comment">
<span slot="label">Comment</span>
</auro-input>
<br />
<auro-button id="dae-toggle" type="button">Disable field</auro-button>
<auro-button type="submit">Submit</auro-button>
<auro-button type="reset">Reset</auro-button>
</auro-form>
<output id="disableAfterEditOutput" form="disableAfterEditForm" aria-live="polite">Type something, then click "Disable field". The form correctly reports as non-initial, Reset stays enabled, and the field is excluded from the submit payload.</output>
<style>
          #disableAfterEditOutput {
            display: block;
            margin-top: 2rem;
            padding: 1rem 1.25rem;
            border-left: 4px solid #2a2a2a;
            border-radius: 0.25rem;
            background: #f5f5f5;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
            white-space: pre-wrap;
          }
</style>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-after-edit.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-after-edit.html -->
<pre class="language-html"><code class="language-html">&lt;auro-form id="disableAfterEditForm"&gt;
  &lt;auro-input id="dae-field" name="comment"&gt;
    &lt;span slot="label"&gt;Comment&lt;/span&gt;
  &lt;/auro-input&gt;
  &lt;br /&gt;
  &lt;auro-button id="dae-toggle" type="button"&gt;Disable field&lt;/auro-button&gt;
  &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
  &lt;auro-button type="reset"&gt;Reset&lt;/auro-button&gt;
&lt;/auro-form&gt;
&lt;output id="disableAfterEditOutput" form="disableAfterEditForm" aria-live="polite"&gt;Type something, then click "Disable field". The form correctly reports as non-initial, Reset stays enabled, and the field is excluded from the submit payload.&lt;/output&gt;
&lt;style&gt;
  #disableAfterEditOutput {
    display: block;
    margin-top: 2rem;
    padding: 1rem 1.25rem;
    border-left: 4px solid #2a2a2a;
    border-radius: 0.25rem;
    background: #f5f5f5;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
&lt;/style&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
