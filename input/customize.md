<auro-header level="1" id="overview">Input: Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#activeLabel" class="level2 body-xs">Active label</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
<auro-anchorlink fluid href="#dvInputOnly" class="level2 body-xs">Display value input only</auro-anchorlink>
<auro-anchorlink fluid href="#icon" class="level2 body-xs">Icon</auro-anchorlink>
<auro-anchorlink fluid href="#lightDarkBackground" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
<auro-anchorlink fluid href="#localization" class="level2 body-xs">Localization</auro-anchorlink>
<auro-anchorlink fluid href="#optionalFlag" class="level2 body-xs">Optional flag</auro-anchorlink>
<auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
<auro-anchorlink fluid href="#simple" class="level2 body-xs">Simple</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#behavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#autocomplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
<auro-anchorlink fluid href="#autocorrect" class="level2 body-xs">Autocorrect</auro-anchorlink>
<auro-anchorlink fluid href="#setCustomValidity" class="level2 body-xs">Custom validation messages</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
<auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
<auro-anchorlink fluid href="#format" class="level2 body-xs">Format</auro-anchorlink>
<auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input mode</auro-anchorlink>
<auro-anchorlink fluid href="#max" class="level2 body-xs">Max</auro-anchorlink>
<auro-anchorlink fluid href="#maxLength" class="level2 body-xs">Max length</auro-anchorlink>
<auro-anchorlink fluid href="#min" class="level2 body-xs">Min</auro-anchorlink>
<auro-anchorlink fluid href="#minLength" class="level2 body-xs">Min length</auro-anchorlink>
<auro-anchorlink fluid href="#name" class="level2 body-xs">Name</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
<auro-anchorlink fluid href="#pattern" class="level2 body-xs">Pattern</auro-anchorlink>
<auro-anchorlink fluid href="#readonly" class="level2 body-xs">Readonly</auro-anchorlink>
<auro-anchorlink fluid href="#required" class="level2 body-xs">Required</auro-anchorlink>
<auro-anchorlink fluid href="#type" class="level2 body-xs">Type</auro-anchorlink>
<auro-anchorlink fluid href="#validateOnInput" class="level2 body-xs">Validate on input</auro-anchorlink>
<auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="activeLabel">Active label</auro-header>
<p>Use the <code>activeLabel</code> attribute to make the label stay fixed in the active position. This applies only to the default <code>classic</code> layout; the emphasized and snowflake layouts always render the label inside the field and are unaffected.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/active-label.html) -->
<!-- The below content is automatically added from ../apiExamples/active-label.html -->
<auro-input activeLabel>
<span slot="label">Address</span>
<span slot="helpText">Please enter your home address.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/active-label.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/active-label.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input activeLabel&gt;
  &lt;span slot="label"&gt;Address&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your home address.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<p>Use the <code>::part()</code> pseudo-element to style elements inside the component's shadow DOM. <code>&lt;auro-input&gt;</code> exposes the following parts.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>wrapper</code></td><td>The field's outer box, which holds the label, value, and icons but not the help text.</td></tr>
<tr><td><code>label</code></td><td>The <code>&lt;label&gt;</code> element that holds the <code>label</code> slot.</td></tr>
<tr><td><code>helpText</code></td><td>The <code>&lt;p&gt;</code> element that holds the help text or error message.</td></tr>
<tr><td><code>input</code></td><td>The inner <code>&lt;input&gt;</code> element.</td></tr>
<tr><td><code>accentIcon</code></td><td>The icon left of the value: the card icon when <code>icon</code> is set with <code>type="credit-card"</code>, or the calendar icon when <code>type="date"</code>. Not rendered in the emphasized layouts.</td></tr>
<tr><td><code>accent-left</code></td><td>The area left of the value that holds <code>accentIcon</code>. Rendered only in the <code>classic</code> layout.</td></tr>
<tr><td><code>accent-right</code></td><td>The area right of the value that holds the error icon, the show/hide password button, and the clear button. Rendered only in the <code>classic</code> layout.</td></tr>
<tr><td><code>displayValue</code></td><td>The element that holds the <code>displayValue</code> slot content.</td></tr>
<tr><td><code>inputHelpText</code></td><td>The area below the field that holds the help text or error message.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ../apiExamples/css-parts.html -->
<style>
            auro-input.css-parts-demo::part(wrapper) {
              border-color: orange;
            }
            auro-input.css-parts-demo::part(label) {
              color: purple;
            }
            auro-input.css-parts-demo::part(helpText) {
              color: green;
            }
            auro-input.css-parts-demo::part(input) {
              font-style: italic;
            }
</style>
<auro-input class="css-parts-demo" required>
<span slot="label">CSS parts example</span>
<span slot="helpText">This input has custom styles applied via CSS shadow parts.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-input.css-parts-demo::part(wrapper) {
    border-color: orange;
  }
  auro-input.css-parts-demo::part(label) {
    color: purple;
  }
  auro-input.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-input.css-parts-demo::part(input) {
    font-style: italic;
  }
&lt;/style&gt;
&lt;auro-input class="css-parts-demo" required&gt;
  &lt;span slot="label"&gt;CSS parts example&lt;/span&gt;
  &lt;span slot="helpText"&gt;This input has custom styles applied via CSS shadow parts.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="dvInputOnly">Display value input only</auro-header>
<p>Use the <code>dvInputOnly</code> attribute to keep the label visible while <code>displayValue</code> slot content is shown in place of the value. Without this attribute, the <code>displayValue</code> content hides both the label and the value.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/dv-input-only.html) -->
<!-- The below content is automatically added from ../apiExamples/dv-input-only.html -->
<auro-header level="4">Display value slot content only</auro-header>
<auro-input value="Hello World">
<span slot="label">Default display value behavior</span>
<span slot="displayValue">✨ Custom display ✨</span>
</auro-input>
<auro-header level="4">Display value slot content with <code>dvInputOnly</code></auro-header>
<auro-input dvInputOnly value="Hello World">
<span slot="label">With <code>dvInputOnly</code></span>
<span slot="displayValue">✨ Custom display ✨</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/dv-input-only.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/dv-input-only.html -->
<pre class="language-html"><code class="language-html">&lt;auro-header level="4"&gt;Display value slot content only&lt;/auro-header&gt;
&lt;auro-input value="Hello World"&gt;
  &lt;span slot="label"&gt;Default display value behavior&lt;/span&gt;
  &lt;span slot="displayValue"&gt;✨ Custom display ✨&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-header level="4"&gt;Display value slot content with &lt;code&gt;dvInputOnly&lt;/code&gt;&lt;/auro-header&gt;
&lt;auro-input dvInputOnly value="Hello World"&gt;
  &lt;span slot="label"&gt;With &lt;code&gt;dvInputOnly&lt;/code&gt;&lt;/span&gt;
  &lt;span slot="displayValue"&gt;✨ Custom display ✨&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="icon">Icon</auro-header>
<p>Use the <code>icon</code> attribute to show a card icon left of the value that changes to the detected card brand as the user types. Applies only when <code>type="credit-card"</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below content is automatically added from ../apiExamples/credit-card-icon.html -->
<auro-input icon type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Enter the number shown on your card.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input icon type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter the number shown on your card.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="lightDarkBackground">Light vs. dark background</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-default.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-default.html -->
<auro-input>
<span slot="label">Default appearance</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-default.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-default.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input&gt;
  &lt;span slot="label"&gt;Default appearance&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-input appearance="inverse">
<span slot="label">Inverse appearance</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input appearance="inverse"&gt;
  &lt;span slot="label"&gt;Inverse appearance&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="localization">Localization</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/localization.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/localization.md -->
<p>Translate every string the input shows or announces, and use <code>locale</code> to set the date format.</p>
<auro-header level="4" id="localizationVisibleStrings">Visible strings</auro-header>
<p>The visible strings in the input don't come from <code>locale</code>. They're passed in through named slots, so you supply the translation for each language. Pass a <code>&lt;span&gt;</code> with the matching <code>slot</code> attribute for every string you need to translate.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-visible-strings.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-visible-strings.html -->
<pre class="language-diff"><code class="language-diff">  &lt;auro-input&gt;
+   &lt;span slot="label"&gt;出発日&lt;/span&gt;
+   &lt;span slot="helpText"&gt;日付を選択してください&lt;/span&gt;
+   &lt;span slot="optionalLabel"&gt;（任意）&lt;/span&gt;
  &lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="localizationA11yStrings">Screen reader strings</auro-header>
<p>Text that screen readers announce but that isn't shown on screen, such as the clear button's name, is also passed in through named slots, so you can translate it separately. These strings don't come from <code>locale</code> either, so supply translated text for every language you support.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-screenreader-strings.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-screenreader-strings.html -->
<pre class="language-diff"><code class="language-diff">  &lt;auro-input locale="de-DE" type="password" value="geheim"&gt;
    &lt;span slot="label"&gt;Passwort&lt;/span&gt;
    &lt;span slot="helpText"&gt;Geben Sie Ihr Passwort ein&lt;/span&gt;
    &lt;span slot="optionalLabel"&gt;(freiwillig)&lt;/span&gt;
+   &lt;span slot="ariaLabel.clear"&gt;Eingabe löschen&lt;/span&gt;
+   &lt;span slot="ariaLabel.password.show"&gt;Passwort anzeigen&lt;/span&gt;
+   &lt;span slot="ariaLabel.password.hide"&gt;Passwort verbergen&lt;/span&gt;
  &lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p class="note"><strong>Note:</strong> The input doesn't translate the messages you set with the <code>setCustomValidity*</code> attributes either, so supply translated text when you use them. The built-in help text and the built-in messages for a value that doesn't fit the <code>type</code> follow <code>lang</code>, which has Spanish (<code>es</code>) and English text. Other built-in error messages come from the browser, except "Invalid Date Format Entered", which is always in English.</p>
<auro-header level="4" id="localizationDateFormatting">Date formatting</auro-header>
<p>When <code>type="date"</code> is set, the <code>locale</code> attribute sets the date format the input uses as the user types. Setting <code>locale</code> picks the region's format from the browser's <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</auro-hyperlink> API, such as <code>mm/dd/yyyy</code> for <code>en-US</code>, <code>dd.mm.yyyy</code> for <code>de-DE</code>, and <code>yyyy/mm/dd</code> for <code>ja-JP</code>, so you don't need to set <code>format</code>.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-locale.html -->
<pre class="language-diff"><code class="language-diff">- &lt;auro-input type="date"&gt;
+ &lt;auro-input type="date" locale="de-DE"&gt;
    &lt;span slot="label"&gt;Abreisedatum&lt;/span&gt;
    &lt;span slot="helpText"&gt;Wählen Sie ein Datum&lt;/span&gt;
    &lt;span slot="optionalLabel"&gt;(freiwillig)&lt;/span&gt;
  &lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p>If no <code>locale</code> attribute is present, the component walks up the DOM looking for the nearest ancestor with a <code>data-locale</code> attribute; if none is found, it defaults to <code>en-US</code>.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-inherited.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-locale-inherited.html -->
<pre class="language-diff"><code class="language-diff">+ &lt;div data-locale="de-DE"&gt;
    &lt;div&gt;
      &lt;auro-input type="date"&gt;
        &lt;span slot="label"&gt;Abreisedatum&lt;/span&gt;
        &lt;span slot="helpText"&gt;Wählen Sie ein Datum&lt;/span&gt;
        &lt;span slot="optionalLabel"&gt;(freiwillig)&lt;/span&gt;
      &lt;/auro-input&gt;
    &lt;/div&gt;
  &lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p>If <code>format</code> is set alongside <code>locale</code>, <code>format</code> always wins.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-formatted.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-locale-formatted.html -->
<pre class="language-diff"><code class="language-diff">- &lt;auro-input type="date" locale="de-DE"&gt;
+ &lt;auro-input type="date" locale="de-DE" format="MM/DD/YYYY"&gt;
    &lt;span slot="label"&gt;Abreisedatum&lt;/span&gt;
    &lt;span slot="helpText"&gt;Wählen Sie ein Datum&lt;/span&gt;
    &lt;span slot="optionalLabel"&gt;(freiwillig)&lt;/span&gt;
  &lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p>The following live example shows several locale configurations in action:</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/locale.html) -->
<!-- The below content is automatically added from ./../apiExamples/locale.html -->
<p class="body-sm"><strong>en-GB</strong></p>
<auro-input type="date" locale="en-GB">
<span slot="ariaLabel.clear">Clear date</span>
<span slot="label">en-GB date</span>
<span slot="helpText">Help text</span>
</auro-input>
<p class="body-sm"><strong>en-US</strong></p>
<auro-input type="date" locale="en-US">
<span slot="ariaLabel.clear">Clear date</span>
<span slot="label">en-US date</span>
<span slot="helpText">Help text</span>
</auro-input>
<p class="body-sm"><strong>zh-CN</strong></p>
<auro-input type="date" locale="zh-CN">
<span slot="ariaLabel.clear">清除日期</span>
<span slot="label">中文日期</span>
<span slot="helpText">帮助文本</span>
<span slot="optionalLabel">（可选）</span>
</auro-input>
<p class="body-sm"><strong>en-US with explicit <code>format="yyyy.mm.dd"</code></strong></p>
<auro-input type="date" locale="en-US" format="yyyy.mm.dd">
<span slot="ariaLabel.clear">Clear date</span>
<span slot="label">en-US with <code>yyyy.mm.dd</code> format</span>
<span slot="helpText">Help text</span>
</auro-input>
<p class="body-sm"><strong>Inherited de-DE (via <code>data-locale</code>)</strong></p>
<div data-locale="de-DE">
<auro-input type="date">
<span slot="ariaLabel.clear">Datum löschen</span>
<span slot="label">Abreisedatum (geerbt aus <code>data-locale="de-DE"</code>)</span>
<span slot="helpText">Hilfetext</span>
<span slot="optionalLabel">(freiwillig)</span>
</auro-input>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/locale.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/locale.html -->
<pre class="language-html"><code class="language-html">&lt;p class="body-sm"&gt;&lt;strong&gt;en-GB&lt;/strong&gt;&lt;/p&gt;
&lt;auro-input type="date" locale="en-GB"&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear date&lt;/span&gt;
  &lt;span slot="label"&gt;en-GB date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;
&#10;&lt;p class="body-sm"&gt;&lt;strong&gt;en-US&lt;/strong&gt;&lt;/p&gt;
&lt;auro-input type="date" locale="en-US"&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear date&lt;/span&gt;
  &lt;span slot="label"&gt;en-US date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;
&#10;&lt;p class="body-sm"&gt;&lt;strong&gt;zh-CN&lt;/strong&gt;&lt;/p&gt;
&lt;auro-input type="date" locale="zh-CN"&gt;
  &lt;span slot="ariaLabel.clear"&gt;清除日期&lt;/span&gt;
  &lt;span slot="label"&gt;中文日期&lt;/span&gt;
  &lt;span slot="helpText"&gt;帮助文本&lt;/span&gt;
  &lt;span slot="optionalLabel"&gt;（可选）&lt;/span&gt;
&lt;/auro-input&gt;
&#10;&lt;p class="body-sm"&gt;&lt;strong&gt;en-US with explicit &lt;code&gt;format="yyyy.mm.dd"&lt;/code&gt;&lt;/strong&gt;&lt;/p&gt;
&lt;auro-input type="date" locale="en-US" format="yyyy.mm.dd"&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear date&lt;/span&gt;
  &lt;span slot="label"&gt;en-US with &lt;code&gt;yyyy.mm.dd&lt;/code&gt; format&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;
&#10;&lt;p class="body-sm"&gt;&lt;strong&gt;Inherited de-DE (via &lt;code&gt;data-locale&lt;/code&gt;)&lt;/strong&gt;&lt;/p&gt;
&lt;div data-locale="de-DE"&gt;
  &lt;auro-input type="date"&gt;
    &lt;span slot="ariaLabel.clear"&gt;Datum löschen&lt;/span&gt;
    &lt;span slot="label"&gt;Abreisedatum (geerbt aus &lt;code&gt;data-locale="de-DE"&lt;/code&gt;)&lt;/span&gt;
    &lt;span slot="helpText"&gt;Hilfetext&lt;/span&gt;
    &lt;span slot="optionalLabel"&gt;(freiwillig)&lt;/span&gt;
  &lt;/auro-input&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="optionalFlag">Optional flag</auro-header>
<p>Use the <code>optionalLabel</code> slot to replace the " (optional)" text shown after the label when the input isn't <code>required</code>.</p>
<p>To show nothing, put an empty element in the slot, such as <code>&lt;span slot="optionalLabel"&gt;&lt;/span&gt;</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
<!-- The below content is automatically added from ./../apiExamples/optional-label.html -->
<auro-input placeholder="John Doe">
<span slot="label">Full name</span>
<span slot="optionalLabel"> (not required)</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/optional-label.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input placeholder="John Doe"&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="optionalLabel"&gt; (not required)&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="placeholder">Placeholder</auro-header>
<p>Use the <code>placeholder</code> attribute to add a custom placeholder message within the element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placeholder.html) -->
<!-- The below content is automatically added from ../apiExamples/placeholder.html -->
<auro-input placeholder="John Doe" required>
<span slot="label">Full name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placeholder.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/placeholder.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input placeholder="John Doe" required&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="simple">Simple</auro-header>
<p>Use the <code>simple</code> attribute to remove the field's border and background, such as when the input is placed inside the trigger of <code>auro-dropdown</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/simple.html) -->
<!-- The below content is automatically added from ./../apiExamples/simple.html -->
<auro-input simple>
<span slot="label">Simple input</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/simple.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/simple.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input simple&gt;
  &lt;span slot="label"&gt;Simple input&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>Change the values of the following tokens to restyle the component.</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">/* stylelint-disable custom-property-empty-line-before */
&#10;@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-input-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused, #{v.$ds-advanced-color-state-focused});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-input-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
&#10;  --ds-auro-input-outline-color: transparent;
}
&#10;:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-input-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-input-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-input-caret-color: var(--ds-advanced-color-state-focused-inverse, #{v.$ds-advanced-color-state-focused-inverse});
  --ds-auro-input-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-input-placeholder-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-input-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
&#10;  --ds-auro-input-outline-color: transparent;
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="behavior">Behavior</auro-header>
<auro-header level="3" id="autocomplete">Autocomplete</auro-header>
<p>Use the <code>autocomplete</code> attribute to control what the browser can suggest for autofill. At this time, only <code>autocomplete="off"</code> is supported.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/autocomplete.html) -->
<!-- The below content is automatically added from ../apiExamples/autocomplete.html -->
<auro-input autocomplete="off">
<span slot="label">Username</span>
<span slot="helpText">Browser autofill is disabled for this input.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/autocomplete.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/autocomplete.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input autocomplete="off"&gt;
  &lt;span slot="label"&gt;Username&lt;/span&gt;
  &lt;span slot="helpText"&gt;Browser autofill is disabled for this input.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="autocorrect">Autocorrect</auro-header>
<p>Set the <code>autocorrect</code> attribute to <code>off</code> to stop Safari on iOS from correcting words as the user types.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/autocorrect.html) -->
<!-- The below content is automatically added from ../apiExamples/autocorrect.html -->
<auro-input autocorrect="off">
<span slot="label">Autocorrect off</span>
<span slot="helpText">iOS autocorrect is disabled for this input.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/autocorrect.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/autocorrect.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input autocorrect="off"&gt;
  &lt;span slot="label"&gt;Autocorrect off&lt;/span&gt;
  &lt;span slot="helpText"&gt;iOS autocorrect is disabled for this input.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="setCustomValidity">Custom validation messages</auro-header>
<p>The input has several properties that set the error message for each kind of validation error. When <code>setCustomValidity</code> is set, it's used for every error and replaces the error-specific messages.</p>
<ul>
<li><strong><code>setCustomValidity</code></strong>: Shown for every validation error. When set, it replaces the messages from <code>error</code> and every other property in this list.</li>
<li><strong><code>setCustomValidityValueMissing</code></strong>: Shown when the component is <code>required</code> and the user leaves it empty.</li>
<li><strong><code>setCustomValidityForType</code></strong>: Shown when the value doesn't fit the <code>type</code>, such as a badly formed email address, an incomplete card number, or an incomplete date.</li>
<li><strong><code>setCustomValidityBadInput</code></strong>: Doesn't currently change any message, because the input never reports <code>badInput</code>.</li>
<li><strong><code>setCustomValidityRangeOverflow</code></strong>: Shown when the value is above <code>max</code>.</li>
<li><strong><code>setCustomValidityRangeUnderflow</code></strong>: Shown when the value is below <code>min</code>.</li>
<li><strong><code>setCustomValidityTooLong</code></strong>: Shown when the value is longer than <code>maxlength</code>.</li>
<li><strong><code>setCustomValidityTooShort</code></strong>: Shown when the value is shorter than <code>minlength</code>.</li>
<li><strong><code>setCustomValidityPatternMismatch</code></strong>: Shown when the value doesn't match <code>pattern</code>, or when <code>type="date"</code> and the date isn't a real calendar date, such as a month of <code>13</code>. For dates, it falls back to "Invalid Date Format Entered" when not set.</li>
</ul>
<p>The input picks the error message in this order: <code>setCustomValidity</code>, then the error-specific property, then the browser's own message.</p>
<p class="note"><strong>Note:</strong> The input doesn't translate these messages, so supply translated text for each language you support.</p>
<auro-header level="4">One message for every error</auro-header>
<p>Use <code>setCustomValidity</code> to set one message for every kind of validation error.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity.html -->
<auro-input required minlength="3" setCustomValidity="Please enter your full name, with at least 3 characters.">
<span slot="label">Full name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input required minlength="3" setCustomValidity="Please enter your full name, with at least 3 characters."&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Range overflow</auro-header>
<p>Use <code>setCustomValidityRangeOverflow</code> to set the message shown when the value is above <code>max</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-range-overflow.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-range-overflow.html -->
<auro-input type="date" max="2025-12-31" setCustomValidityRangeOverflow="Date must be on or before 12/31/2025.">
<span slot="label">Event date</span>
<span slot="helpText">Enter a date no later than 12/31/2025.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-range-overflow.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-range-overflow.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" max="2025-12-31" setCustomValidityRangeOverflow="Date must be on or before 12/31/2025."&gt;
  &lt;span slot="label"&gt;Event date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter a date no later than 12/31/2025.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Range underflow</auro-header>
<p>Use <code>setCustomValidityRangeUnderflow</code> to set the message shown when the value is below <code>min</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-range-underflow.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-range-underflow.html -->
<auro-input type="date" min="2024-01-01" setCustomValidityRangeUnderflow="Date must be on or after 01/01/2024.">
<span slot="label">Start date</span>
<span slot="helpText">Enter a date no earlier than 01/01/2024.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-range-underflow.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-range-underflow.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" min="2024-01-01" setCustomValidityRangeUnderflow="Date must be on or after 01/01/2024."&gt;
  &lt;span slot="label"&gt;Start date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter a date no earlier than 01/01/2024.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Too long</auro-header>
<p>Use <code>setCustomValidityTooLong</code> to set the message shown when the value is longer than <code>maxlength</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-too-long.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-too-long.html -->
<auro-input maxlength="10" setCustomValidityTooLong="Please shorten your entry to 10 characters or fewer.">
<span slot="label">Username</span>
<span slot="helpText">Maximum 10 characters.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-too-long.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-too-long.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input maxlength="10" setCustomValidityTooLong="Please shorten your entry to 10 characters or fewer."&gt;
  &lt;span slot="label"&gt;Username&lt;/span&gt;
  &lt;span slot="helpText"&gt;Maximum 10 characters.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Too short</auro-header>
<p>Use <code>setCustomValidityTooShort</code> to set the message shown when the value is shorter than <code>minlength</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-too-short.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-too-short.html -->
<auro-input minlength="3" setCustomValidityTooShort="Please enter at least 3 characters.">
<span slot="label">Nickname</span>
<span slot="helpText">Minimum 3 characters.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-too-short.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-too-short.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input minlength="3" setCustomValidityTooShort="Please enter at least 3 characters."&gt;
  &lt;span slot="label"&gt;Nickname&lt;/span&gt;
  &lt;span slot="helpText"&gt;Minimum 3 characters.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Type validation</auro-header>
<p>Use <code>setCustomValidityForType</code> to set the message shown when the value doesn't fit the <code>type</code>, such as a badly formed email address.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-for-type.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-for-type.html -->
<auro-input type="email" setCustomValidityForType="Please provide a valid email address, such as name@example.com.">
<span slot="label">Email address</span>
<span slot="helpText">We'll use this to send your confirmation.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-for-type.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-for-type.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="email" setCustomValidityForType="Please provide a valid email address, such as name@example.com."&gt;
  &lt;span slot="label"&gt;Email address&lt;/span&gt;
  &lt;span slot="helpText"&gt;We'll use this to send your confirmation.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Value missing</auro-header>
<p>Use <code>setCustomValidityValueMissing</code> to set the message shown when a <code>required</code> field is left empty.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-value-missing.html) -->
<!-- The below content is automatically added from ../apiExamples/set-custom-validity-value-missing.html -->
<auro-input required setCustomValidityValueMissing="Please enter your name to continue.">
<span slot="label">Full name</span>
<span slot="helpText">Enter your legal first and last name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-value-missing.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/set-custom-validity-value-missing.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input required setCustomValidityValueMissing="Please enter your name to continue."&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter your legal first and last name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disabled">Disabled</auro-header>
<p>Use the <code>disabled</code> attribute to stop the user from interacting with the input.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-input disabled>
<span slot="label">Disabled</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input disabled&gt;
  &lt;span slot="label"&gt;Disabled&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="error">Error</auro-header>
<p>Use the <code>error</code> attribute to show an error that stays until you remove the attribute, in place of the input's built-in validation.</p>
<p>The <code>error</code> value is the error message, unless you also set <code>setCustomValidityCustomError</code> or <code>setCustomValidity</code>, which replace it.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/error.html) -->
<!-- The below content is automatically added from ../apiExamples/error.html -->
<auro-button id="setCustomErrorBtn">Set custom error</auro-button>
<auro-button id="setCustomErrorClearBtn">Clear custom error</auro-button>
<br /><br />
<auro-input id="setCustomErrorExample" error="Initial error attribute value">
<span slot="label">Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="setCustomErrorBtn"&gt;Set custom error&lt;/auro-button&gt;
&lt;auro-button id="setCustomErrorClearBtn"&gt;Clear custom error&lt;/auro-button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;auro-input id="setCustomErrorExample" error="Initial error attribute value"&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/error.js -->
<pre class="language-js"><code class="language-js">export function customError() {
  const elem = document.querySelector('#setCustomErrorExample');
  // set custom error
  document.querySelector('#setCustomErrorBtn').addEventListener('click', () =&gt; {
    elem.error = "Custom Error Message";
  });
&#10;  // remove custom error
  document.querySelector('#setCustomErrorClearBtn').addEventListener('click', () =&gt; {
    elem.removeAttribute('error');
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="format">Format</auro-header>
<p>Use the <code>format</code> attribute to set the pattern the value is formatted to as the user types.</p>
<p>Default pattern characters:</p>
<ul>
<li><code>0</code>: a digit</li>
<li><code>a</code>: a letter</li>
<li><code>*</code>: any character</li>
</ul>
<p>See <auro-hyperlink href="https://imask.js.org/">IMask</auro-hyperlink> for more information on how to configure a mask.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/format.html) -->
<!-- The below content is automatically added from ../apiExamples/format.html -->
<auro-input format="47440000">
<span slot="label">Custom format</span>
<span slot="helpText">Format is: 47440000</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/format.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/format.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input format="47440000"&gt;
  &lt;span slot="label"&gt;Custom format&lt;/span&gt;
  &lt;span slot="helpText"&gt;Format is: 47440000&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="inputMode">Input mode</auro-header>
<p>Use the <code>inputmode</code> attribute to choose which on-screen keyboard mobile devices show, such as <code>tel</code> for a phone keypad. When not set, the input uses <code>numeric</code> for the <code>number</code>, <code>tel</code>, <code>credit-card</code>, and <code>date</code> types.</p>
<p class="note"><strong>Note:</strong> When you also set <code>type</code>, most browsers use <code>type</code> to choose the keyboard on mobile devices and ignore <code>inputmode</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
<auro-input inputmode="tel">
<span slot="label">Telephone</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input inputmode="tel"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="max">Max</auro-header>
<p>Use the <code>max</code> attribute to set the largest value allowed. It applies only when <code>type="number"</code>, or <code>type="date"</code> with a full date format; write dates in ISO format (<code>YYYY-MM-DD</code>).</p>
<p>Use <code>setCustomValidityRangeOverflow</code> with <code>max</code> to set the error message shown when the value is above <code>max</code>.</p>
<auro-header level="4">Date example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-date.html) -->
<!-- The below content is automatically added from ../apiExamples/max-date.html -->
<auro-input type="date" max="2023-03-25" setCustomValidityRangeOverflow="The selected date is past the defined maximum date.">
<span slot="label">Choose a date</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-date.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-date.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" max="2023-03-25" setCustomValidityRangeOverflow="The selected date is past the defined maximum date."&gt;
  &lt;span slot="label"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Number example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-number.html) -->
<!-- The below content is automatically added from ../apiExamples/max-number.html -->
<auro-input type="number" max="10" setCustomValidityRangeOverflow="The selected value is above the defined maximum.">
<span slot="label">Choose a number</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-number.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="number" max="10" setCustomValidityRangeOverflow="The selected value is above the defined maximum."&gt;
  &lt;span slot="label"&gt;Choose a number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="maxLength">Max length</auro-header>
<p>Use the <code>maxlength</code> attribute to set the most characters the user can enter.</p>
<p>Use <code>setCustomValidityTooLong</code> with <code>maxlength</code> to set the error message shown when the value is too long.</p>
<p class="note"><strong>Note:</strong> Don't set <code>maxlength</code> when <code>type</code> is <code>credit-card</code>, <code>tel</code>, or <code>date</code>, because those types set their own length.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-length.html) -->
<!-- The below content is automatically added from ../apiExamples/max-length.html -->
<auro-input maxlength="12" setCustomValidityTooLong="Enter no more than 12 characters." required>
<span slot="label">Voucher code</span>
<span slot="helpText">Please enter your 12-character voucher code.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-length.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/max-length.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input maxlength="12" setCustomValidityTooLong="Enter no more than 12 characters." required&gt;
  &lt;span slot="label"&gt;Voucher code&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your 12-character voucher code.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="min">Min</auro-header>
<p>Use the <code>min</code> attribute to set the smallest value allowed. It applies only when <code>type="number"</code>, or <code>type="date"</code> with a full date format; write dates in ISO format (<code>YYYY-MM-DD</code>).</p>
<p>Use <code>setCustomValidityRangeUnderflow</code> with <code>min</code> to set the error message shown when the value is below <code>min</code>.</p>
<auro-header level="4">Date example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-date.html) -->
<!-- The below content is automatically added from ../apiExamples/min-date.html -->
<auro-input type="date" min="2023-03-25" setCustomValidityRangeUnderflow="The selected date is before the defined minimum date.">
<span slot="label">Choose a date</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-date.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-date.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" min="2023-03-25" setCustomValidityRangeUnderflow="The selected date is before the defined minimum date."&gt;
  &lt;span slot="label"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4">Number example</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-number.html) -->
<!-- The below content is automatically added from ../apiExamples/min-number.html -->
<auro-input type="number" min="10" setCustomValidityRangeUnderflow="The selected value is below the defined minimum.">
<span slot="label">Choose a number</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-number.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="number" min="10" setCustomValidityRangeUnderflow="The selected value is below the defined minimum."&gt;
  &lt;span slot="label"&gt;Choose a number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="minLength">Min length</auro-header>
<p>Use the <code>minlength</code> attribute to set the fewest characters the value needs to be valid.</p>
<p>Use <code>setCustomValidityTooShort</code> with <code>minlength</code> to set the error message shown when the value is too short.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-length.html) -->
<!-- The below content is automatically added from ../apiExamples/min-length.html -->
<auro-input minlength="4" setCustomValidityTooShort="Please enter a full voucher code." required>
<span slot="label">Voucher code</span>
<span slot="helpText">Please enter your 4-character voucher code.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-length.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/min-length.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input minlength="4" setCustomValidityTooShort="Please enter a full voucher code." required&gt;
  &lt;span slot="label"&gt;Voucher code&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your 4-character voucher code.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="name">Name</auro-header>
<p>Use the <code>name</code> attribute to set the field name for the input. <code>auro-form</code> uses it to identify the field's value, and the input also passes it to the inner <code>&lt;input&gt;</code> element.</p>
<p>The <code>id</code> attribute identifies the element for CSS and JavaScript, while <code>name</code> identifies the input's value in the data that <code>auro-form</code> collects.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/name.html) -->
<!-- The below content is automatically added from ../apiExamples/name.html -->
<auro-input name="firstName">
<span slot="label">First name</span>
<span slot="helpText">Enter your legal first name.</span>
</auro-input>
<auro-input name="lastName">
<span slot="label">Last name</span>
<span slot="helpText">Enter your legal last name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/name.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/name.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input name="firstName"&gt;
  &lt;span slot="label"&gt;First name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter your legal first name.&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-input name="lastName"&gt;
  &lt;span slot="label"&gt;Last name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter your legal last name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No validation</auro-header>
<p>When a field is <code>required</code> but shouldn't be validated when it loses focus, use the <code>noValidate</code> attribute. Validation still runs when code sets the value or when <code>validateOnInput</code> is set.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ../apiExamples/no-validate.html -->
<auro-input noValidate required>
<span slot="label">Address</span>
<span slot="helpText">Please enter your home address.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/no-validate.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input noValidate required&gt;
  &lt;span slot="label"&gt;Address&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your home address.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="pattern">Pattern</auro-header>
<p>Use the <code>pattern</code> attribute to set a regular expression the whole value must match. This example also sets <code>spellcheck</code> to <code>false</code>, which sets <code>autocorrect</code> to <code>off</code> and <code>autocapitalize</code> to <code>none</code>.</p>
<p>Use the <code>setCustomValidityPatternMismatch</code> attribute to set the error message shown when the value doesn't match <code>pattern</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/pattern.html) -->
<!-- The below content is automatically added from ../apiExamples/pattern.html -->
<auro-input pattern="[a-z]{1,15}" spellcheck="false" setCustomValidityPatternMismatch="Use 1 to 15 lowercase letters, with no spaces.">
<span slot="label">Username</span>
<span slot="helpText">Please enter a username.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/pattern.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/pattern.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input pattern="[a-z]{1,15}" spellcheck="false" setCustomValidityPatternMismatch="Use 1 to 15 lowercase letters, with no spaces."&gt;
  &lt;span slot="label"&gt;Username&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter a username.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="readonly">Readonly</auro-header>
<p>Use the <code>readonly</code> attribute to prevent the user from editing the value of the input.</p>
<p>In this example, the user can't edit the value, but the buttons set and reset it in code. A read-only input doesn't show the clear button.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/readonly.html) -->
<!-- The below content is automatically added from ../apiExamples/readonly.html -->
<auro-button id="setReadonlyValueBtn">Set value to Auro Alaska</auro-button>
<auro-button id="resetReadonlyValueBtn">Reset</auro-button>
<br /><br />
<auro-input readonly id="readonlyExample">
<span slot="label">Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/readonly.html -->
<pre class="language-html"><code class="language-html">&lt;auro-button id="setReadonlyValueBtn"&gt;Set value to Auro Alaska&lt;/auro-button&gt;
&lt;auro-button id="resetReadonlyValueBtn"&gt;Reset&lt;/auro-button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;auro-input readonly id="readonlyExample"&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/readonly.js -->
<pre class="language-js"><code class="language-js">export function setReadonlyValue() {
  const elem = document.querySelector('#readonlyExample');
&#10;  // set value of auro-input element
  document.querySelector('#setReadonlyValueBtn').addEventListener('click', () =&gt; {
      elem.value = "Auro Alaska";
  });
&#10;  document.querySelector('#resetReadonlyValueBtn').addEventListener('click', () =&gt; {
    elem.value = undefined;
});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="required">Required</auro-header>
<p>When the field must be filled in, use the <code>required</code> attribute. It also removes the " (optional)" text after the label.</p>
<p>When a required field is empty, <code>validity</code> is <code>valueMissing</code>. Use the <code>setCustomValidityValueMissing</code> attribute to change the error message for this case.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/required.html) -->
<!-- The below content is automatically added from ../apiExamples/required.html -->
<auro-input required placeholder="John Doe">
<span slot="label">Full name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input required placeholder="John Doe"&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="type">Type</auro-header>
<auro-header level="4" id="typeCreditCard">Credit card</auro-header>
<p>Use the <code>type="credit-card"</code> attribute for a credit card formatted input.</p>
<p>A <code>type="credit-card"</code> input shows built-in help text when you don't supply your own.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card.html) -->
<!-- The below content is automatically added from ../apiExamples/credit-card.html -->
<auro-input type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Enter the number shown on your card.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter the number shown on your card.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<p>Use the <code>type="credit-card"</code> and <code>icon</code> attributes for a credit card formatted input with credit card icon support.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below content is automatically added from ../apiExamples/credit-card-icon.html -->
<auro-input icon type="credit-card" required>
<span slot="label">Card number</span>
<span slot="helpText">Enter the number shown on your card.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/credit-card-icon.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input icon type="credit-card" required&gt;
  &lt;span slot="label"&gt;Card number&lt;/span&gt;
  &lt;span slot="helpText"&gt;Enter the number shown on your card.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typeDate">Date</auro-header>
<p>Use the <code>type="date"</code> attribute for a date formatted input. The default date format comes from <code>locale</code>, such as <code>mm/dd/yyyy</code> for <code>en-US</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-day-year.html) -->
<!-- The below content is automatically added from ../apiExamples/month-day-year.html -->
<auro-input type="date">
<span slot="label">Arrival date</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-day-year.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/month-day-year.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date"&gt;
  &lt;span slot="label"&gt;Arrival date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<p>Use the <code>format</code> attribute to combine <code>mm</code>, <code>dd</code>, and <code>yyyy</code> or <code>yy</code> in any order.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/year-month-day.html) -->
<!-- The below content is automatically added from ../apiExamples/year-month-day.html -->
<auro-input type="date" format="yyyy/mm/dd">
<span slot="label">Arrival date</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/year-month-day.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/year-month-day.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" format="yyyy/mm/dd"&gt;
  &lt;span slot="label"&gt;Arrival date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-year.html) -->
<!-- The below content is automatically added from ../apiExamples/month-year.html -->
<auro-input type="date" format="mm/yy">
<span slot="label">Expiration date</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-year.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/month-year.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" format="mm/yy"&gt;
  &lt;span slot="label"&gt;Expiration date&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/day.html) -->
<!-- The below content is automatically added from ../apiExamples/day.html -->
<auro-input type="date" format="dd">
<span slot="label">Day</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/day.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/day.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="date" format="dd"&gt;
  &lt;span slot="label"&gt;Day&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typeEmail">Email</auro-header>
<p>Use the <code>type="email"</code> attribute for an email address. When the value isn't a valid email address, the input shows a built-in error message, unless you set <code>setCustomValidityForType</code>.</p>
<p>A <code>type="email"</code> input also shows built-in help text when you don't supply your own.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/email.html) -->
<!-- The below content is automatically added from ../apiExamples/email.html -->
<auro-input type="email" required>
<span slot="label">Email address</span>
<span slot="helpText">Please enter your email address.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/email.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/email.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="email" required&gt;
  &lt;span slot="label"&gt;Email address&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your email address.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typeNumber">Number</auro-header>
<p>Use the <code>type="number"</code> attribute for a number, such as a count of passengers. It shows a numeric keyboard on mobile devices.</p>
<p>Use the <code>number</code> type only for numbers people count or step through, not for numbers such as card or account numbers. The input doesn't currently mark decimal values as invalid. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">MDN Web Docs</a> for more information.</p>
<p class="note"><strong>Note:</strong> The input sets <code>inputmode="numeric"</code> for <code>type="number"</code> when you don't set <code>inputmode</code>, for the best mobile experience.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/number.html) -->
<!-- The below content is automatically added from ../apiExamples/number.html -->
<auro-input type="number" required>
<span slot="label">Number of passengers</span>
<span slot="helpText">Please enter the number of passengers.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/number.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/number.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="number" required&gt;
  &lt;span slot="label"&gt;Number of passengers&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter the number of passengers.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typePassword">Password</auro-header>
<p>Use the <code>type="password"</code> attribute for a password. In the <code>classic</code> layout, once the input has a value, a show/hide password button appears while the user hovers over or has focus in the input.</p>
<p>A <code>type="password"</code> input shows built-in help text when you don't supply your own.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/password.html) -->
<!-- The below content is automatically added from ../apiExamples/password.html -->
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
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/password.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/password.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="password" required&gt;
  &lt;span slot="ariaLabel.clear"&gt;Clear password&lt;/span&gt;
  &lt;span slot="ariaLabel.password.show"&gt;Show password&lt;/span&gt;
  &lt;span slot="ariaLabel.password.hide"&gt;Hide password&lt;/span&gt;
  &lt;span slot="label"&gt;Password&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter a secure password.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="typePhone">Phone number</auro-header>
<p>Use the <code>type="tel"</code> attribute for a phone number formatted input. The default format is <code>+1 (000) 000-0000</code>.</p>
<p class="note"><strong>Note:</strong> Use <code>type="tel"</code> with <code>inputmode="tel"</code> for the best mobile experience. Without <code>inputmode</code>, the input uses <code>numeric</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel.html) -->
<!-- The below content is automatically added from ../apiExamples/tel.html -->
<auro-input type="tel">
<span slot="label">Telephone</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/tel.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="tel"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<p>Use the <code>format</code> attribute to set a custom phone number format.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel-format.html) -->
<!-- The below content is automatically added from ../apiExamples/tel-format.html -->
<auro-input type="tel" format="+00 000 00 0000">
<span slot="label">Telephone</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel-format.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/tel-format.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input type="tel" format="+00 000 00 0000"&gt;
  &lt;span slot="label"&gt;Telephone&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="validateOnInput">Validate on input</auro-header>
<p>Use the <code>validateOnInput</code> attribute to validate the value as the user types, not only when the input loses focus. Use it with <code>pattern</code> when the user needs feedback before leaving the field.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/validate-on-input.html) -->
<!-- The below content is automatically added from ../apiExamples/validate-on-input.html -->
<auro-input validateOnInput required pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidityPatternMismatch="Full name requires two or more names with at least one space.">
<span slot="label">Full name</span>
<span slot="helpText">Please enter your full name as it appears on the card.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/validate-on-input.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/validate-on-input.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input validateOnInput required pattern="[a-zA-Z-.']+( +[a-zA-Z-.']+)+" setCustomValidityPatternMismatch="Full name requires two or more names with at least one space."&gt;
  &lt;span slot="label"&gt;Full name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name as it appears on the card.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="value">Value</auro-header>
<auro-header level="4" id="valueProgrammatic">Programmatic</auro-header>
<p>Use the <code>value</code> attribute to programmatically set the value of the input.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/programmatic-value.html) -->
<!-- The below content is automatically added from ../apiExamples/programmatic-value.html -->
<auro-input value="Alaska Airlines is the best!">
<span slot="label">Name</span>
<span slot="helpText">Please enter your full name.</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/programmatic-value.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/programmatic-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input value="Alaska Airlines is the best!"&gt;
  &lt;span slot="label"&gt;Name&lt;/span&gt;
  &lt;span slot="helpText"&gt;Please enter your full name.&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="swapValues">Swapping values between inputs</auro-header>
<p>This example uses a JavaScript function attached to an <code>auro-button</code> component's <code>click</code> event to swap the values of two <code>auro-input</code> elements, such as the departure and arrival airports in a flight search form.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/swap-value.html) -->
<!-- The below content is automatically added from ../apiExamples/swap-value.html -->
<auro-input id="swapExampleLeft">
<span slot="label">Left input</span>
<span slot="helpText">Help text</span>
</auro-input>
<auro-button id="swapExampleBtn">Swap values</auro-button>
<auro-input id="swapExampleRight">
<span slot="label">Right input</span>
<span slot="helpText">Help text</span>
</auro-input>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/swap-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-input id="swapExampleLeft"&gt;
  &lt;span slot="label"&gt;Left input&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;
&lt;auro-button id="swapExampleBtn"&gt;Swap values&lt;/auro-button&gt;
&lt;auro-input id="swapExampleRight"&gt;
  &lt;span slot="label"&gt;Right input&lt;/span&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
&lt;/auro-input&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/swap-value.js -->
<pre class="language-js"><code class="language-js">export function swapInputValues() {
  const btn = document.querySelector('#swapExampleBtn');
  const inputOne = document.querySelector('#swapExampleLeft');
  const inputTwo = document.querySelector('#swapExampleRight');
&#10;  btn.addEventListener('click', () =&gt; {
    const valueOne = inputOne.value;
    const valueTwo = inputTwo.value;
&#10;    inputOne.value = valueTwo;
    inputTwo.value = valueOne;
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
