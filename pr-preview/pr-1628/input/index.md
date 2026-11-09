<auro-header level="1" id="overview">Input: Overview and UX guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User stories</auro-anchorlink>
<auro-anchorlink fluid href="#enterValue" class="level2 body-xs">Enter a value</auro-anchorlink>
<auro-anchorlink fluid href="#clearValue" class="level2 body-xs">Clear value</auro-anchorlink>
<auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset value</auro-anchorlink>
<auro-anchorlink fluid href="#passwordToggle" class="level2 body-xs">Password input</auro-anchorlink>
<auro-anchorlink fluid href="#formattedInput" class="level2 body-xs">Formatted input</auro-anchorlink>
<auro-anchorlink fluid href="#regionalDateFormat" class="level2 body-xs">Regional date</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<p><code>&lt;auro-input&gt;</code> is a single-line text field for entering a value, such as a name, email address, password, phone number, card number, or date. Set <code>type</code> to <code>text</code>, <code>password</code>, <code>email</code>, <code>number</code>, <code>tel</code>, <code>credit-card</code>, or <code>date</code> to get the matching formatting and validation, and use the <code>label</code> and <code>helpText</code> slots to name the field and explain what to enter.</p>
<!-- AURO-GENERATED-CONTENT:END -->
<section>
<auro-header level="2" id="userStories">User stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/index/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/index/userStories.md -->
<auro-header level="3" id="enterValue">Enter a value</auro-header>
<ol>
<li>
            Move focus to the <code>&lt;auro-input&gt;</code> element
<div class="note">
<p>
                In the <code>classic</code> layout, the label animates from the placeholder position to the active position above the input area. If the <code>activeLabel</code> attribute is set, the label stays in the active position at all times. The emphasized and snowflake layouts always show the label inside the field.
</p>
</div>
</li>
<li>
            Type a value into the input
<div class="note">
<p>
                As the user types, the component tracks the current value in the <code>value</code> property. The component sets <code>hasValue</code> to <code>true</code> once the input has any content.
</p>
<p>
                If the input has a formatted <code>type</code>, such as <code>credit-card</code>, <code>tel</code>, or <code>date</code>, the input formats the value as the user types.
</p>
</div>
</li>
<li>
            Move focus away from the input
<div class="note">
<p>
                By default, the input validates the value when it loses focus. If the value doesn't meet a rule you set, such as <code>required</code>, <code>minlength</code>, or <code>pattern</code>, the component shows an error state with a message below the field that describes the problem.
</p>
<p>
                If the <code>noValidate</code> attribute is set, the input doesn't validate when it loses focus. If the <code>validateOnInput</code> attribute is set, the input also validates on every keystroke.
</p>
</div>
</li>
</ol>
<auro-header level="3" id="clearValue">Clear the value</auro-header>
<p>When the input has a value and the user hovers over the component or moves focus into it, a clear button appears inside the input. The clear button doesn't appear when the input is <code>disabled</code> or <code>readonly</code>.</p>
<ol>
<li>Click or tap the clear button</li>
<li>The input clears the value and sets the <code>value</code> property to <code>undefined</code></li>
<li>The component sets <code>hasValue</code> to <code>false</code></li>
</ol>
<div class="note">
<strong>Note:</strong> If the component is <code>required</code>, clearing the value and moving focus away from the component validates it and shows the error state.
</div>
<auro-header level="3" id="presetValue">Preset the value</auro-header>
<p>Sometimes you need the component to show a value when it first renders.</p>
<p>Use the <code>value</code> attribute to set an initial value. The input shows the preset value, with the label in the active position.</p>
<p>To change the value at any time, set the <code>value</code> property with JavaScript. Setting the value to <code>undefined</code> returns the input to its empty state.</p>
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
<p>When the input has <code>type="password"</code>, the entered text is hidden by default. In the <code>classic</code> layout, once the input has a value, a show/hide button appears inside it while the user hovers over or has focus in the input, so the user can show the password as plain text.</p>
<ol>
<li>Type a value into the password input. Each character is hidden as it's entered.</li>
<li>Click or tap the visibility toggle to reveal the password as plain text</li>
<li>Click or tap the toggle again to mask the password</li>
</ol>
<p>Password inputs show built-in help text when you don't supply your own.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/password.html) -->
<!-- The below content is automatically added from ./../apiExamples/password.html -->
<auro-input type="password" required>
<span slot="ariaLabel.clear">Clear password</span>
<span slot="ariaLabel.password.show">Show password</span>
<span slot="ariaLabel.password.hide">Hide password</span>
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
  &lt;span slot="ariaLabel.clear"&gt;Clear password&lt;/span&gt;
  &lt;span slot="ariaLabel.password.show"&gt;Show password&lt;/span&gt;
  &lt;span slot="ariaLabel.password.hide"&gt;Hide password&lt;/span&gt;
  &lt;span slot="label"&gt;Password&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter a secure password.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="formattedInput">Enter a formatted value</auro-header>
<p>The component has several built-in types that format the value as the user types.</p>
<ul>
<li><strong><code>type="credit-card"</code></strong>: Formats the value as a card number, with spaces between groups of digits. Set the <code>icon</code> attribute to also show the card brand's icon.</li>
<li><strong><code>type="tel"</code></strong>: Formats the value as a phone number. The default format is <code>+1 (000) 000-0000</code>. Set the <code>format</code> attribute to use a different format.</li>
<li><strong><code>type="date"</code></strong>: Formats the value as a date. The default format comes from <code>locale</code>, such as <code>mm/dd/yyyy</code> for <code>en-US</code>. Set the <code>format</code> attribute to use any combination of <code>mm</code>, <code>dd</code>, and <code>yyyy</code> or <code>yy</code>.</li>
</ul>
<p class="note">
<strong>Note:</strong> To set your own pattern, use the <code>format</code> attribute with <auro-hyperlink href="https://imask.js.org/">IMask</auro-hyperlink> definitions: <code>0</code> for a digit, <code>a</code> for a letter, and <code>*</code> for any character.
</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/credit-card-icon.html) -->
<!-- The below content is automatically added from ./../apiExamples/credit-card-icon.html -->
<auro-input icon type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Enter the number shown on your card.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/tel.html) -->
<!-- The below content is automatically added from ./../apiExamples/tel.html -->
<auro-input type="tel">
<span slot="label">Telephone</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/month-day-year.html) -->
<!-- The below content is automatically added from ./../apiExamples/month-day-year.html -->
<auro-input type="date">
<span slot="label">Arrival date</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/credit-card-icon.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/credit-card-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input icon type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter the number shown on your card.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/tel.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/tel.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="tel"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/month-day-year.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/month-day-year.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date"&gt;
  &lt;span slot="label"&gt;Arrival date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="regionalDateFormat">Regional date format support</auro-header>
<p>People around the world write dates differently. A traveler in the United States expects to see <strong>12/25/2025</strong>, while someone in Germany expects <strong>25.12.2025</strong>, and someone in Japan expects <strong>2025/12/25</strong>. Showing the wrong format causes confusion and mistakes.</p>
<p>When you set the user's region with the <code>locale</code> attribute, or with <code>data-locale</code> on a parent element, a date input shows dates in the format that looks natural to them, with no extra setup. The input handles all the formatting.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/locale-single.html) -->
<!-- The below content is automatically added from ./../apiExamples/locale-single.html -->
<auro-input type="date" locale="zh-CN">
<span slot="ariaLabel.clear">Clear date</span>
<span slot="label">zh-CN date</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/locale-single.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/locale-single.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" locale="zh-CN"&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear date&lt;/span&gt;
  &lt;span slot="label"&gt;zh-CN date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
