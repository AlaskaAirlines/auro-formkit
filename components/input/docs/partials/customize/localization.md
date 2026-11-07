<p>Translate every string the input shows or announces, and use <code>locale</code> to set the date format.</p>
<auro-header level="4" id="localizationVisibleStrings">Visible strings</auro-header>
<p>The visible strings in the input don't come from <code>locale</code>. They're passed in through named slots, so you supply the translation for each language. Pass a <code>&lt;span&gt;</code> with the matching <code>slot</code> attribute for every string you need to translate.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-visible-strings.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="localizationA11yStrings">Screen reader strings</auro-header>
<p>Text that screen readers announce but that isn't shown on screen, such as the clear button's name, is also passed in through named slots, so you can translate it separately. These strings don't come from <code>locale</code> either, so supply translated text for every language you support.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-screenreader-strings.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p class="note"><strong>Note:</strong> The input doesn't translate the messages you set with the <code>setCustomValidity*</code> attributes either, so supply translated text when you use them. The built-in help text and error messages follow <code>lang</code>, which has Spanish (<code>es</code>) and English text.</p>
<auro-header level="4" id="localizationDateFormatting">Date formatting</auro-header>
<p>When <code>type="date"</code> is set, the <code>locale</code> attribute sets the date format the input uses as the user types. Setting <code>locale</code> picks the region's format from the browser's <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</auro-hyperlink> API, such as <code>mm/dd/yyyy</code> for <code>en-US</code>, <code>dd.mm.yyyy</code> for <code>de-DE</code>, and <code>yyyy/mm/dd</code> for <code>ja-JP</code>, so you don't need to set <code>format</code>.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p>If no <code>locale</code> attribute is present, the component walks up the DOM looking for the nearest ancestor with a <code>data-locale</code> attribute; if none is found, it defaults to <code>en-US</code>.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-inherited.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p>If <code>format</code> is set alongside <code>locale</code>, <code>format</code> always wins.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-formatted.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p>The following live example shows several locale configurations in action:</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>