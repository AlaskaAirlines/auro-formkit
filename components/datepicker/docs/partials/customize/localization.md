<p>The component supports complete localization, including visible strings, screen reader announcements, and locale-based date formatting.</p>
<auro-header level="4" id="localizationTrigger">Trigger</auro-header>
<auro-header level="5" id="localizationTriggerVisibleStrings">Visible Strings</auro-header>
<p>The visible strings rendered in the input, trigger, and fullscreen bib are not derived from <code>locale</code> — they are projected through named slots so each language can supply its own translation. Pass a <code>&lt;span&gt;</code> with the matching <code>slot</code> attribute for every string you need to localize.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-visible-strings.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="localizationCalendar">Calendar</auro-header>
<auro-header level="5" id="localizationCalendarVisibleStrings">Visible Strings</auro-header>
<p>By default, the calendar weekday names rendered above the day grid and the month names rendered in the calendar header are derived from the active <code>locale</code> using the browser's <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</auro-hyperlink> API, so they update automatically when <code>locale</code> changes. Use the <code>monthNames</code> attribute to override the derived month names — for example, to supply a translation the browser does not produce or to support a locale the browser does not recognize.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-calendar-strings.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<p>The following live example sets <code>monthNames</code> imperatively on an <code>es-MX</code> picker:</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/localization.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="5" id="localizationCalendarA11yStrings">Screen Reader Strings</auro-header>
<p>Assistive-technology announcements — range descriptors (<code>rangeLabelStart</code>, <code>rangeLabelEnd</code>, <code>rangeLabelBeforeRange</code>, <code>rangeLabelInRange</code>, <code>rangeLabelAfterRange</code>), month navigation labels (<code>navLabelPrevMonth</code>, <code>navLabelNextMonth</code>), and the calendar grid label (<code>calendarGridLabel</code>) — are exposed as individual attributes so they can be translated independently of the visible UI. These strings are not derived from <code>locale</code>; supply translated values for every language you support.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-screenreader-strings.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="localizationDateFormatting">Date Formatting</auro-header>
<p>The <code>locale</code> attribute drives the date format used by the input and the calendar. Setting <code>locale</code> automatically selects the regional format (for example <code>en-US</code> → <code>mm/dd/yyyy</code>, <code>de-DE</code> → <code>dd.mm.yyyy</code>, <code>ja-JP</code> → <code>yyyy/mm/dd</code>), derived from the browser's <code>Intl</code> API, so <code>format</code> does not need to be set manually.</p>
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
