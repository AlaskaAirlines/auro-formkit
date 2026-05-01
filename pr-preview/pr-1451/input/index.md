<auro-header level="1" id="overview">Input - Overview and UX Guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User Stories</auro-anchorlink>
<auro-anchorlink fluid href="#enterValue" class="level2 body-xs">Enter a Value</auro-anchorlink>
<auro-anchorlink fluid href="#clearValue" class="level2 body-xs">Clear Value</auro-anchorlink>
<auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset Value</auro-anchorlink>
<auro-anchorlink fluid href="#passwordToggle" class="level2 body-xs">Password Input</auro-anchorlink>
<auro-anchorlink fluid href="#formattedInput" class="level2 body-xs">Formatted Input</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<p><code>&lt;auro-input&gt;</code> is a customizable text input component for single-line data entry. It supports types <code>text</code>, <code>password</code>, and <code>email</code> with built-in validation, required input, error states, and a secondary <code>bordered</code> theme. Use the <code>label</code> and <code>helpText</code> slots for additional content support.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<section>
<auro-header level="2" id="userStories">User Stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/index/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/index/userStories.md -->
<auro-header level="3" id="enterValue">Enter a value</auro-header>
<ol>
<li>
Move focus to the auro-input element
<div class="note">
<p>
The label animates from the placeholder position to the active position above the input area. If the <code>activeLabel</code> attribute is set, the label remains fixed in the active position at all times.
</p>
</div>
</li>
<li>
Type a value into the input
<div class="note">
<p>
As the user types, the component tracks the current value via the <code>value</code> property. The <code>hasValue</code> flag is set to <code>true</code> once the input contains any content.
</p>
<p>
If the input has a <code>type</code> attribute (e.g. <code>credit-card</code>, <code>tel</code>, <code>date</code>), formatting is automatically applied as the user types.
</p>
</div>
</li>
<li>
Move focus away from the input
<div class="note">
<p>
Validation is triggered on blur by default. If the value does not meet the configured constraints (e.g. <code>required</code>, <code>minlength</code>, <code>pattern</code>), the component renders an error state with a help text message describing the issue.
</p>
<p>
If the <code>noValidate</code> attribute is set, no validation occurs on blur. If the <code>validateOnInput</code> attribute is set, validation occurs on every keystroke instead of on blur.
</p>
</div>
</li>
</ol>
<auro-header level="3" id="clearValue">Clear the value</auro-header>
<p>When the input has a value and the user is focused on the component, a clear button appears inside the input.</p>
<ol>
<li>Click or tap the clear button</li>
<li>The input value is cleared and the <code>value</code> property is reset to <code>undefined</code></li>
<li>The <code>hasValue</code> flag is set to <code>false</code></li>
</ol>
<div class="note">
<strong>Note:</strong> If the component is <code>required</code>, clearing the value and moving focus away from the component will trigger validation and render the error state.
</div>
<auro-header level="3" id="presetValue">Preset the value</auro-header>
<p>In some cases it is necessary to preset the value of the component as part of the initial render.</p>
<p>Use the <code>value</code> attribute to set an initial value. The input will display the preset value and the label will render in the active position.</p>
<p>The value may also be set programmatically at any time by updating the <code>value</code> property via JavaScript. Setting the value to <code>undefined</code> will reset the input to its empty state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/programmatic-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/programmatic-value.html -->
<auro-input value="Alaska Airlines is the best!">
<span slot="label">Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/programmatic-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/programmatic-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input value="Alaska Airlines is the best!"&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="passwordToggle">Password input</auro-header>
<p>When the input has <code>type="password"</code>, the entered text is masked by default. A show/hide toggle button appears inside the input once the user begins typing, allowing them to reveal the password as plain text.</p>
<ol>
<li>Type a value into the password input — characters are masked as they are entered</li>
<li>Click or tap the visibility toggle to reveal the password as plain text</li>
<li>Click or tap the toggle again to mask the password</li>
</ol>
<p>Default help text is automatically provided for password inputs if custom help text is not supplied.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/password.html) -->
<!-- The below content is automatically added from ./../apiExamples/password.html -->
<auro-input type="password" required>
<span slot="ariaLabel.clear">Clear All</span>
<span slot="ariaLabel.password.show">Show</span>
<span slot="ariaLabel.password.hide">Hide</span>
<span slot="label">Password</span>
<span slot="helpText">Please enter a secure password.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/password.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/password.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="password" required&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear All&lt;/span&gt;
  &lt;span slot="ariaLabel.password.show"&gt;Show&lt;/span&gt;
  &lt;span slot="ariaLabel.password.hide"&gt;Hide&lt;/span&gt;
  &lt;span slot="label"&gt;Password&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter a secure password.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="formattedInput">Enter a formatted value</auro-header>
<p>The component supports several built-in format types that automatically apply input masking as the user types.</p>
<ul>
<li><strong><code>type="credit-card"</code></strong> — Formats the input as a credit card number with spaces between groups of digits. Optionally displays a card brand icon when the <code>icon</code> attribute is set.</li>
<li><strong><code>type="tel"</code></strong> — Formats the input as a phone number. The default format is <code>+1 (000) 000-0000</code>. A custom format may be specified using the <code>format</code> attribute.</li>
<li><strong><code>type="date"</code></strong> — Formats the input as a date. The default format is <code>mm/dd/yyyy</code>. Custom date formats may be specified using the <code>format</code> attribute with any combination of <code>mm</code>, <code>dd</code>, <code>yyyy</code>, or <code>yy</code>.</li>
</ul>
<div class="note">
Custom masking is also available via the <code>format</code> attribute using <a href="https://imask.js.org/">IMask</a> definitions: <code>0</code> for digit, <code>a</code> for letter, <code>*</code> for any character.
</div>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/credit-card-icon.html) -->
<!-- The below content is automatically added from ./../apiExamples/credit-card-icon.html -->
<auro-input icon type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Valid credit card numbers must include 16 digits (15 for Amex).</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/tel.html) -->
<!-- The below content is automatically added from ./../apiExamples/tel.html -->
<auro-input type="tel">
<span slot="label">Telephone</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/month-day-year.html) -->
<!-- The below content is automatically added from ./../apiExamples/month-day-year.html -->
<auro-input type="date">
<span slot="label">Arrival date</span>
<span slot="helpText">Help Text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/credit-card-icon.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/credit-card-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input icon type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Valid credit card numbers must include 16 digits (15 for Amex).&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/tel.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/tel.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="tel"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/month-day-year.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/month-day-year.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date"&gt;
  &lt;span slot="label"&gt;Arrival date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help Text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
