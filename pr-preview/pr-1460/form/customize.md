<auro-header level="1" id="overview">Form - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#layout">Layout</auro-anchorlink>
<auro-anchorlink fluid href="#columnLayout" class="level2 body-xs">Column Layout</auro-anchorlink>
<auro-anchorlink fluid href="#complexForm" class="level2 body-xs">Complex Form</auro-anchorlink>
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
}

.columned-form div {
display: flex;
flex-direction: column;
padding: 1rem;
gap: 1rem;
}

.controls {
display: flex;
justify-content: flex-end;
margin-top: 1rem;
}
</style>
<auro-form>
<div class="columned-form">
<div>
<auro-input id="search-box" name="searchBox" required>
<span slot="label">Search flights</span>
</auro-input>
<auro-input id="last-name" name="lastName" required>
<span slot="label">Last Name</span>
</auro-input>
</div>
<div>
<div class="datepickerBlock">
<h4>Pick a date range</h4>
<auro-datepicker id="date-range" name="dateRange" required range>
<span slot="fromLabel">Start</span>
<span slot="toLabel">End</span>
<span slot="bib.fullscreen.fromLabel">Start</span>
<span slot="bib.fullscreen.toLabel">End</span>
</auro-datepicker>
</div>
<div class="controls">
<auro-button type="submit">Submit</auro-button>
</div>
</div>
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
  }
​
  .columned-form div {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
​
  .controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
&lt;/style&gt;
&lt;auro-form&gt;
  &lt;div class="columned-form"&gt;
    &lt;div&gt;
      &lt;auro-input id="search-box" name="searchBox" required&gt;
        &lt;span slot="label"&gt;Search flights&lt;/span&gt;
      &lt;/auro-input&gt;
      &lt;auro-input id="last-name" name="lastName" required&gt;
        &lt;span slot="label"&gt;Last Name&lt;/span&gt;
      &lt;/auro-input&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;div class="datepickerBlock"&gt;
        &lt;h4&gt;Pick a date range&lt;/h4&gt;
        &lt;auro-datepicker id="date-range" name="dateRange" required range&gt;
          &lt;span slot="fromLabel"&gt;Start&lt;/span&gt;
          &lt;span slot="toLabel"&gt;End&lt;/span&gt;
          &lt;span slot="bib.fullscreen.fromLabel"&gt;Start&lt;/span&gt;
          &lt;span slot="bib.fullscreen.toLabel"&gt;End&lt;/span&gt;
        &lt;/auro-datepicker&gt;
      &lt;/div&gt;
      &lt;div class="controls"&gt;
        &lt;auro-button type="submit"&gt;Submit&lt;/auro-button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
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
</div>
</div>
</div>
