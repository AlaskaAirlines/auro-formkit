<p>The component supports complete localization, including visible strings, screen reader announcements and locale based date formatting.</p>
<auro-header level="4" id="localizationVisibleStrings">Visible strings</auro-header>
<p>The visible strings rendered in the input are not derived from <code>locale</code> — they are projected through named slots so each language can supply its own translation. Pass a <code>&lt;span&gt;</code> with the matching <code>slot</code> attribute for every string you need to localize.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-visible-strings.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="localizationA11yStrings">Screen reader strings</auro-header>
<p>Assistive-technology announcements that are not visible in the UI are also exposed as named slots so they can be translated independently. These strings are not derived from <code>locale</code>; supply translated values for every language you support.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-screenreader-strings.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p class="note"><strong>Note:</strong> Custom validation messages set via <code>setCustomValidity*</code> attributes are also not localized — supply translated strings yourself when using those properties.</p>
<auro-header level="4" id="localizationDateFormatting">Date formatting</auro-header>
<p>When <code>type="date"</code> is set, the <code>locale</code> attribute drives the date format used by the input mask. Setting <code>locale</code> automatically selects the regional format (for example <code>en-US</code> → <code>mm/dd/yyyy</code>, <code>de-DE</code> → <code>dd.mm.yyyy</code>, <code>ja-JP</code> → <code>yyyy/mm/dd</code>), derived from the browser's <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</auro-hyperlink> API, so <code>format</code> does not need to be set manually.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p>If no <code>locale</code> attribute is present, the component walks up the DOM looking for the nearest ancestor with a <code>data-locale</code> attribute; if none is found, it defaults to <code>en-US</code>.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-inherited.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p>If <code>format</code> is set alongside <code>locale</code>, <code>format</code> always wins.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-formatted.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>