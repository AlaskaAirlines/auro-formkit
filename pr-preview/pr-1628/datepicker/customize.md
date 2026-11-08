<auro-header level="1" id="overview">Datepicker - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#placement" class="level2 body-xs">Dropdown placement</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
<auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
<auro-anchorlink fluid href="#localization" class="level2 body-xs">Localization</auro-anchorlink>
<auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, size, and layout</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#calendarFocusDate" class="level2 body-xs">Calendar focus date</auro-anchorlink>
<auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom validation</auro-anchorlink>
<auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable component</auro-anchorlink>
<auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force error state</auro-anchorlink>
<auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input mode</auro-anchorlink>
<auro-anchorlink fluid href="#minMaxDate" class="level2 body-xs">Min/max date</auro-anchorlink>
<auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
<auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require selection</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="placement">Dropdown placement</auro-header>
<p>Set where the calendar dropdown opens with the <code>placement</code>, <code>offset</code>, <code>noFlip</code>, and <code>shift</code> attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
<div style="width: 400px">
<auro-datepicker offset="20" placement="bottom-start" noFlip>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">bottom-start with 20px offset and noFlip</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<br/>
<auro-datepicker offset="20" placement="bottom-start">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">bottom-start with 20px offset and flip</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<br/>
<auro-datepicker offset="20" placement="right" noFlip>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">right with 20px offset and noFlip</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
</div>
<div style="width: 600px; padding-top: 1em;">
<p>Range with <code>placement="bottom-start"</code>, <code>offset="20"</code>, <code>noFlip</code>, and <code>shift</code></p>
<auro-datepicker range offset="20" placement="bottom-start" shift noFlip minDate="2025-07-08">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker range headline</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->

<pre class="language-html"><code class="language-html">&lt;div style="width: 400px"&gt;
  &lt;auro-datepicker offset="20" placement="bottom-start" noFlip&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;bottom-start with 20px offset and noFlip&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;/auro-datepicker&gt;
  &lt;br/&gt;
  &lt;auro-datepicker offset="20" placement="bottom-start"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;bottom-start with 20px offset and flip&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;/auro-datepicker&gt;
  &lt;br/&gt;
  &lt;auro-datepicker offset="20" placement="right" noFlip&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;right with 20px offset and noFlip&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;/auro-datepicker&gt;
&lt;/div&gt;
&#10;&lt;div style="width: 600px; padding-top: 1em;"&gt;
  &lt;p&gt;Range with &lt;code&gt;placement="bottom-start"&lt;/code&gt;, &lt;code&gt;offset="20"&lt;/code&gt;, &lt;code&gt;noFlip&lt;/code&gt;, and &lt;code&gt;shift&lt;/code&gt;&lt;/p&gt;
  &lt;auro-datepicker range offset="20" placement="bottom-start" shift noFlip minDate="2025-07-08"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datepicker range headline&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
    &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
    &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
  &lt;/auro-datepicker&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
<p>CSS shadow parts let you style elements inside a web component's shadow DOM using the <code>::part()</code> pseudo-element. The following parts are exposed by <code>&lt;auro-datepicker&gt;</code>.</p>
<table class="auro_table">
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td><code>dropdown</code></td><td>The dropdown that holds the trigger, the calendar, and the help text.</td></tr>
<tr><td><code>trigger</code></td><td>The <code>&lt;div&gt;</code> in the dropdown's trigger that holds the calendar icon, the inputs, and the clear button or error icon.</td></tr>
<tr><td><code>wrapper</code></td><td>The container inside <code>trigger</code> that lays out the calendar icon, the inputs, and the clear button or error icon.</td></tr>
<tr><td><code>mainLabel</code></td><td>The label for the whole datepicker, rendered only when <code>layout="snowflake"</code>.</td></tr>
<tr><td><code>inputSection</code></td><td>The container that holds the date inputs.</td></tr>
<tr><td><code>accentIcon</code></td><td>The calendar icon shown before the inputs in the <code>snowflake</code> layout. The <code>classic</code> layout hides it and shows the start date input's own calendar icon instead.</td></tr>
<tr><td><code>input</code></td><td>Each date input: one, or two when <code>range</code> is set.</td></tr>
<tr><td><code>calendarWrapper</code></td><td>The container in the dropdown that holds the calendar.</td></tr>
<tr><td><code>calendar</code></td><td>The calendar in the dropdown, with the month grids, the previous and next month buttons, and the Done button.</td></tr>
<tr><td><code>helpTextSpan</code></td><td>The <code>&lt;div&gt;</code> that holds the help text or error message.</td></tr>
<tr><td><code>helpText</code></td><td>The <code>&lt;p&gt;</code> inside <code>helpTextSpan</code> that holds the help text or error message.</td></tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ../apiExamples/css-parts.html -->
<style>
  auro-datepicker.css-parts-demo::part(trigger) {
    border-color: orange;
  }
  auro-datepicker.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-datepicker.css-parts-demo::part(calendarWrapper) {
    max-height: 400px;
  }
</style>
<auro-datepicker class="css-parts-demo">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="fromLabel">CSS parts example</span>
<span slot="helpText">This datepicker has custom styles applied via CSS shadow parts.</span>
<span slot="bib.fullscreen.headline">Select date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/css-parts.html -->

<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-datepicker.css-parts-demo::part(trigger) {
    border-color: orange;
  }
  auro-datepicker.css-parts-demo::part(helpText) {
    color: green;
  }
  auro-datepicker.css-parts-demo::part(calendarWrapper) {
    max-height: 400px;
  }
&lt;/style&gt;
&lt;auro-datepicker class="css-parts-demo"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;CSS parts example&lt;/span&gt;
  &lt;span slot="helpText"&gt;This datepicker has custom styles applied via CSS shadow parts.&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="breakpoint">Fullscreen breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute sets the largest screen size at which the calendar opens fullscreen instead of in a dropdown. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-datepicker fullscreenBreakpoint="lg">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker fullscreenBreakpoint="lg"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="background">Light vs. dark background</auro-header>
<p>The <code>appearance</code> attribute sets the datepicker's colors for light or dark backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-datepicker>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-datepicker appearance="inverse">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker appearance="inverse"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="localization">Localization</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/localization.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/localization.md -->
<p>The component supports localization of the date format, the calendar's month and weekday names, and most visible strings and screen reader announcements. A few strings don't currently have a slot or attribute, such as the calendar's Done button and the word "selected" in date selection announcements, so they're always in English.</p>
<auro-header level="4" id="localizationTrigger">Trigger</auro-header>
<auro-header level="5" id="localizationTriggerVisibleStrings">Visible strings</auro-header>
<p>The visible strings rendered in the input, trigger, and fullscreen calendar aren't derived from <code>locale</code>. Most of them are projected through named slots so each language can supply its own translation. Pass a <code>&lt;span&gt;</code> with the matching <code>slot</code> attribute for every string you need to localize.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-visible-strings.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-visible-strings.html -->
<pre class="language-diff"><code class="language-diff">  &lt;auro-datepicker&gt;
+   &lt;span slot="fromLabel"&gt;Abreisedatum&lt;/span&gt;
+   &lt;span slot="helpText"&gt;Wählen Sie ein Datum&lt;/span&gt;
+   &lt;span slot="optionalFromLabel"&gt;(freiwillig)&lt;/span&gt;
+   &lt;span slot="bib.fullscreen.headline"&gt;Datum auswählen&lt;/span&gt;
+   &lt;span slot="bib.fullscreen.fromLabel"&gt;Abreisedatum&lt;/span&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Kalender schließen&lt;/span&gt;
  &lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="localizationCalendar">Calendar</auro-header>
<auro-header level="5" id="localizationCalendarVisibleStrings">Visible strings</auro-header>
<p>By default, the calendar weekday names rendered above the day grid and the month names rendered in the calendar header are derived from the active <code>locale</code> using the browser's <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</auro-hyperlink> API, so they update automatically when <code>locale</code> changes. Use the <code>monthNames</code> attribute to override the derived month names, for example to supply a translation the browser doesn't produce or to support a locale the browser doesn't recognize.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-calendar-strings-diff.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-calendar-strings-diff.html -->
<pre class="language-diff"><code class="language-diff">- &lt;auro-datepicker&gt;
+ &lt;auro-datepicker monthNames='["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]'&gt;
    &lt;span slot="fromLabel"&gt;Salida&lt;/span&gt;
    &lt;span slot="helpText"&gt;Seleccione un rango de fechas&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;(opcional)&lt;/span&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Cerrar calendario&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Seleccione una fecha&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Salida&lt;/span&gt;
  &lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p>The following live example sets the <code>monthNames</code> attribute on an <code>es-MX</code> datepicker:</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-calendar-strings.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-calendar-strings.html -->
<auro-datepicker
  range
  monthNames='["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]'
  locale="es-MX"
  rangeLabelStart="fecha de salida"
  rangeLabelEnd="fecha de regreso"
  rangeLabelBeforeRange="antes de la salida"
  rangeLabelInRange="entre vuelos"
  rangeLabelAfterRange="después del regreso"
  rangeLabelEndPreview="previsualizando fecha de regreso"
  navLabelPrevMonth="Ir al mes anterior"
  navLabelNextMonth="Ir al mes siguiente"
  calendarGridLabel="Días del mes del calendario"
  id="localizationExample">
<span slot="ariaLabel.bib.close">Cerrar calendario</span>
<span slot="fromLabel">Salida</span>
<span slot="toLabel">Regreso</span>
<span slot="helpText">Seleccione un rango de fechas</span>
<span slot="optionalFromLabel">(opcional)</span>
<span slot="optionalToLabel">(opcional)</span>
<span slot="bib.fullscreen.headline">Seleccione fechas</span>
<span slot="bib.fullscreen.fromLabel">Salida</span>
<span slot="bib.fullscreen.toLabel">Regreso</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/localization-calendar-strings.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/localization-calendar-strings.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker
  range
  monthNames='["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]'
  locale="es-MX"
  rangeLabelStart="fecha de salida"
  rangeLabelEnd="fecha de regreso"
  rangeLabelBeforeRange="antes de la salida"
  rangeLabelInRange="entre vuelos"
  rangeLabelAfterRange="después del regreso"
  rangeLabelEndPreview="previsualizando fecha de regreso"
  navLabelPrevMonth="Ir al mes anterior"
  navLabelNextMonth="Ir al mes siguiente"
  calendarGridLabel="Días del mes del calendario"
  id="localizationExample"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Cerrar calendario&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Salida&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Regreso&lt;/span&gt;
  &lt;span slot="helpText"&gt;Seleccione un rango de fechas&lt;/span&gt;
  &lt;span slot="optionalFromLabel"&gt;(opcional)&lt;/span&gt;
  &lt;span slot="optionalToLabel"&gt;(opcional)&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Seleccione fechas&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Salida&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Regreso&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="5" id="localizationCalendarA11yStrings">Screen reader strings</auro-header>
<p>Screen reader announcements, including range descriptors (<code>rangeLabelStart</code>, <code>rangeLabelEnd</code>, <code>rangeLabelEndPreview</code>, <code>rangeLabelBeforeRange</code>, <code>rangeLabelInRange</code>, <code>rangeLabelAfterRange</code>), month navigation labels (<code>navLabelPrevMonth</code>, <code>navLabelNextMonth</code>), and the calendar grid label (<code>calendarGridLabel</code>), are exposed as individual attributes so they can be translated independently of the visible UI. These strings aren't derived from <code>locale</code>, so supply translated values for every language you support, including the <code>ariaLabel.bib.close</code> slot.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-screenreader-strings.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-screenreader-strings.html -->
<pre class="language-diff"><code class="language-diff">  &lt;auro-datepicker
    locale="de-DE"
    range
+   rangeLabelStart="Startdatum"
+   rangeLabelEnd="Enddatum"
+   rangeLabelBeforeRange="vor dem Zeitraum"
+   rangeLabelInRange="im Zeitraum"
+   rangeLabelAfterRange="nach dem Zeitraum"
+   rangeLabelEndPreview="Vorschau Enddatum"
+   navLabelPrevMonth="Vorheriger Monat"
+   navLabelNextMonth="Nächster Monat"
+   calendarGridLabel="Kalendertage des Monats"&gt;
    &lt;span slot="fromLabel"&gt;Abreise&lt;/span&gt;
    &lt;span slot="toLabel"&gt;Rückkehr&lt;/span&gt;
    &lt;span slot="helpText"&gt;Wählen Sie einen Zeitraum&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;(freiwillig)&lt;/span&gt;
    &lt;span slot="optionalToLabel"&gt;(freiwillig)&lt;/span&gt;
+   &lt;span slot="ariaLabel.bib.close"&gt;Kalender schließen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datum auswählen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Abreise&lt;/span&gt;
    &lt;span slot="bib.fullscreen.toLabel"&gt;Rückkehr&lt;/span&gt;
  &lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="localizationDateFormatting">Date formatting</auro-header>
<p>The <code>locale</code> attribute drives the date format used by the input and the calendar. Setting <code>locale</code> automatically selects the regional format (for example <code>en-US</code> → <code>mm/dd/yyyy</code>, <code>de-DE</code> → <code>dd.mm.yyyy</code>, <code>ja-JP</code> → <code>yyyy/mm/dd</code>), derived from the browser's <code>Intl</code> API, so you don't need to set <code>format</code> yourself.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-locale.html -->
<pre class="language-diff"><code class="language-diff">- &lt;auro-datepicker&gt;
+ &lt;auro-datepicker locale="de-DE"&gt;
    &lt;span slot="fromLabel"&gt;Deutsches Datum&lt;/span&gt;
    &lt;span slot="helpText"&gt;Hilfetext&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;(freiwillig)&lt;/span&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Kalender schließen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datum auswählen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Deutsches Datum&lt;/span&gt;
  &lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p>If no <code>locale</code> attribute is present, the component walks up the DOM looking for the nearest ancestor with a <code>data-locale</code> attribute; if none is found, it defaults to <code>en-US</code>.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-inherited.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-locale-inherited.html -->
<pre class="language-diff"><code class="language-diff">+ &lt;div data-locale="ja-JP"&gt;
    &lt;auro-datepicker&gt;
      &lt;span slot="fromLabel"&gt;継承された ja-JP 日付形式&lt;/span&gt;
      &lt;span slot="helpText"&gt;ヘルプテキスト&lt;/span&gt;
      &lt;span slot="optionalFromLabel"&gt;（任意）&lt;/span&gt;
      &lt;span slot="ariaLabel.bib.close"&gt;カレンダーを閉じる&lt;/span&gt;
      &lt;span slot="bib.fullscreen.headline"&gt;日付を選択&lt;/span&gt;
      &lt;span slot="bib.fullscreen.fromLabel"&gt;出発日&lt;/span&gt;
    &lt;/auro-datepicker&gt;
+ &lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p>If <code>format</code> is set alongside <code>locale</code>, <code>format</code> always wins.</p>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/localization-locale-formatted.html) -->
<!-- The below content is automatically added from ./../apiExamples/localization-locale-formatted.html -->
<pre class="language-diff"><code class="language-diff">  &lt;auro-datepicker
+   locale="de-DE"
+   format="mm/dd/yyyy"&gt;
    &lt;span slot="fromLabel"&gt;Deutsches Datum mit mm/dd/yyyy-Format&lt;/span&gt;
    &lt;span slot="helpText"&gt;Hilfetext&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;(freiwillig)&lt;/span&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Kalender schließen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datum auswählen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Deutsches Datum&lt;/span&gt;
  &lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<p>The following live example shows several locale configurations in action:</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/locale.html) -->
<!-- The below content is automatically added from ./../apiExamples/locale.html -->
<div data-locale="de-DE">
<p class="body-sm"><strong>de-DE</strong></p>
<auro-datepicker
    locale="de-DE"
    range
    rangeLabelStart="Startdatum"
    rangeLabelEnd="Enddatum"
    rangeLabelBeforeRange="vor dem Zeitraum"
    rangeLabelInRange="im Zeitraum"
    rangeLabelAfterRange="nach dem Zeitraum"
    rangeLabelEndPreview="Vorschau Enddatum"
    navLabelPrevMonth="Vorheriger Monat"
    navLabelNextMonth="Nächster Monat"
    calendarGridLabel="Kalendertage des Monats">
<span slot="ariaLabel.bib.close">Kalender schließen</span>
<span slot="fromLabel">Abreisedatum</span>
<span slot="toLabel">Rückkehrdatum</span>
<span slot="helpText">Hilfetext</span>
<span slot="optionalFromLabel">(freiwillig)</span>
<span slot="optionalToLabel">(freiwillig)</span>
<span slot="bib.fullscreen.headline">Datum auswählen</span>
<span slot="bib.fullscreen.fromLabel">Abreisedatum</span>
<span slot="bib.fullscreen.toLabel">Rückkehrdatum</span>
</auro-datepicker>
<p class="body-sm"><strong>zh-CN</strong></p>
<auro-datepicker
    locale="zh-CN"
    range
    rangeLabelStart="开始日期"
    rangeLabelEnd="结束日期"
    rangeLabelBeforeRange="在此期间之前"
    rangeLabelInRange="在此期间内"
    rangeLabelAfterRange="在此期间之后"
    rangeLabelEndPreview="预览结束日期"
    navLabelPrevMonth="上个月"
    navLabelNextMonth="下个月"
    calendarGridLabel="本月的日历天数">
<span slot="ariaLabel.bib.close">关闭日历</span>
<span slot="fromLabel">出发日期</span>
<span slot="toLabel">返回日期</span>
<span slot="helpText">帮助文本</span>
<span slot="optionalFromLabel">（可选）</span>
<span slot="optionalToLabel">（可选）</span>
<span slot="bib.fullscreen.headline">选择日期</span>
<span slot="bib.fullscreen.fromLabel">出发日期</span>
<span slot="bib.fullscreen.toLabel">返回日期</span>
</auro-datepicker>
<p class="body-sm"><strong>Inherited de-DE (via <code>data-locale</code>)</strong></p>
<auro-datepicker
    range
    rangeLabelStart="Startdatum"
    rangeLabelEnd="Enddatum"
    rangeLabelBeforeRange="vor dem Zeitraum"
    rangeLabelInRange="im Zeitraum"
    rangeLabelAfterRange="nach dem Zeitraum"
    rangeLabelEndPreview="Vorschau Enddatum"
    navLabelPrevMonth="Vorheriger Monat"
    navLabelNextMonth="Nächster Monat"
    calendarGridLabel="Kalendertage des Monats">
<span slot="ariaLabel.bib.close">Kalender schließen</span>
<span slot="fromLabel">Abreisedatum (geerbt aus <code>data-locale="de-DE"</code>)</span>
<span slot="toLabel">Rückkehrdatum</span>
<span slot="helpText">Hilfetext</span>
<span slot="optionalFromLabel">(freiwillig)</span>
<span slot="optionalToLabel">(freiwillig)</span>
<span slot="bib.fullscreen.headline">Datum auswählen</span>
<span slot="bib.fullscreen.fromLabel">Abreisedatum</span>
<span slot="bib.fullscreen.toLabel">Rückkehrdatum</span>
</auro-datepicker>
<p class="body-sm"><strong>ja-JP with explicit <code>format="mm/dd/yyyy"</code></strong></p>
<auro-datepicker
    locale="ja-JP"
    format="mm/dd/yyyy"
    range
    rangeLabelStart="開始日"
    rangeLabelEnd="終了日"
    rangeLabelBeforeRange="この期間の前"
    rangeLabelInRange="この期間内"
    rangeLabelAfterRange="この期間の後"
    rangeLabelEndPreview="終了日プレビュー"
    navLabelPrevMonth="前の月"
    navLabelNextMonth="次の月"
    calendarGridLabel="カレンダーの日付">
<span slot="ariaLabel.bib.close">カレンダーを閉じる</span>
<span slot="fromLabel">出発日</span>
<span slot="toLabel">帰国日</span>
<span slot="helpText">ヘルプテキスト</span>
<span slot="optionalFromLabel">（任意）</span>
<span slot="optionalToLabel">（任意）</span>
<span slot="bib.fullscreen.headline">日付を選択</span>
<span slot="bib.fullscreen.fromLabel">出発日</span>
<span slot="bib.fullscreen.toLabel">帰国日</span>
</auro-datepicker>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/locale.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/locale.html -->
<pre class="language-html"><code class="language-html">&lt;div data-locale="de-DE"&gt;
  &lt;p class="body-sm"&gt;&lt;strong&gt;de-DE&lt;/strong&gt;&lt;/p&gt;
  &lt;auro-datepicker
    locale="de-DE"
    range
    rangeLabelStart="Startdatum"
    rangeLabelEnd="Enddatum"
    rangeLabelBeforeRange="vor dem Zeitraum"
    rangeLabelInRange="im Zeitraum"
    rangeLabelAfterRange="nach dem Zeitraum"
    rangeLabelEndPreview="Vorschau Enddatum"
    navLabelPrevMonth="Vorheriger Monat"
    navLabelNextMonth="Nächster Monat"
    calendarGridLabel="Kalendertage des Monats"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Kalender schließen&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;Abreisedatum&lt;/span&gt;
    &lt;span slot="toLabel"&gt;Rückkehrdatum&lt;/span&gt;
    &lt;span slot="helpText"&gt;Hilfetext&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;(freiwillig)&lt;/span&gt;
    &lt;span slot="optionalToLabel"&gt;(freiwillig)&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datum auswählen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Abreisedatum&lt;/span&gt;
    &lt;span slot="bib.fullscreen.toLabel"&gt;Rückkehrdatum&lt;/span&gt;
  &lt;/auro-datepicker&gt;
  &lt;p class="body-sm"&gt;&lt;strong&gt;zh-CN&lt;/strong&gt;&lt;/p&gt;
  &lt;auro-datepicker
    locale="zh-CN"
    range
    rangeLabelStart="开始日期"
    rangeLabelEnd="结束日期"
    rangeLabelBeforeRange="在此期间之前"
    rangeLabelInRange="在此期间内"
    rangeLabelAfterRange="在此期间之后"
    rangeLabelEndPreview="预览结束日期"
    navLabelPrevMonth="上个月"
    navLabelNextMonth="下个月"
    calendarGridLabel="本月的日历天数"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;关闭日历&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;出发日期&lt;/span&gt;
    &lt;span slot="toLabel"&gt;返回日期&lt;/span&gt;
    &lt;span slot="helpText"&gt;帮助文本&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;（可选）&lt;/span&gt;
    &lt;span slot="optionalToLabel"&gt;（可选）&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;选择日期&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;出发日期&lt;/span&gt;
    &lt;span slot="bib.fullscreen.toLabel"&gt;返回日期&lt;/span&gt;
  &lt;/auro-datepicker&gt;
  &lt;p class="body-sm"&gt;&lt;strong&gt;Inherited de-DE (via &lt;code&gt;data-locale&lt;/code&gt;)&lt;/strong&gt;&lt;/p&gt;
  &lt;auro-datepicker
    range
    rangeLabelStart="Startdatum"
    rangeLabelEnd="Enddatum"
    rangeLabelBeforeRange="vor dem Zeitraum"
    rangeLabelInRange="im Zeitraum"
    rangeLabelAfterRange="nach dem Zeitraum"
    rangeLabelEndPreview="Vorschau Enddatum"
    navLabelPrevMonth="Vorheriger Monat"
    navLabelNextMonth="Nächster Monat"
    calendarGridLabel="Kalendertage des Monats"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;Kalender schließen&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;Abreisedatum (geerbt aus &lt;code&gt;data-locale="de-DE"&lt;/code&gt;)&lt;/span&gt;
    &lt;span slot="toLabel"&gt;Rückkehrdatum&lt;/span&gt;
    &lt;span slot="helpText"&gt;Hilfetext&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;(freiwillig)&lt;/span&gt;
    &lt;span slot="optionalToLabel"&gt;(freiwillig)&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;Datum auswählen&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;Abreisedatum&lt;/span&gt;
    &lt;span slot="bib.fullscreen.toLabel"&gt;Rückkehrdatum&lt;/span&gt;
  &lt;/auro-datepicker&gt;
  &lt;p class="body-sm"&gt;&lt;strong&gt;ja-JP with explicit &lt;code&gt;format="mm/dd/yyyy"&lt;/code&gt;&lt;/strong&gt;&lt;/p&gt;
  &lt;auro-datepicker
    locale="ja-JP"
    format="mm/dd/yyyy"
    range
    rangeLabelStart="開始日"
    rangeLabelEnd="終了日"
    rangeLabelBeforeRange="この期間の前"
    rangeLabelInRange="この期間内"
    rangeLabelAfterRange="この期間の後"
    rangeLabelEndPreview="終了日プレビュー"
    navLabelPrevMonth="前の月"
    navLabelNextMonth="次の月"
    calendarGridLabel="カレンダーの日付"&gt;
    &lt;span slot="ariaLabel.bib.close"&gt;カレンダーを閉じる&lt;/span&gt;
    &lt;span slot="fromLabel"&gt;出発日&lt;/span&gt;
    &lt;span slot="toLabel"&gt;帰国日&lt;/span&gt;
    &lt;span slot="helpText"&gt;ヘルプテキスト&lt;/span&gt;
    &lt;span slot="optionalFromLabel"&gt;（任意）&lt;/span&gt;
    &lt;span slot="optionalToLabel"&gt;（任意）&lt;/span&gt;
    &lt;span slot="bib.fullscreen.headline"&gt;日付を選択&lt;/span&gt;
    &lt;span slot="bib.fullscreen.fromLabel"&gt;出発日&lt;/span&gt;
    &lt;span slot="bib.fullscreen.toLabel"&gt;帰国日&lt;/span&gt;
  &lt;/auro-datepicker&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="layout">Shape, size, and layout</auro-header>
<p>The <code>shape</code>, <code>size</code>, and <code>layout</code> attributes work together to set the datepicker's overall look.</p>
<p>See the <auro-hyperlink href="design">Design page</auro-hyperlink> for a detailed breakdown.</p>
</section>
<section>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>Restyle the datepicker by changing the values of the following tokens for the datepicker, dropdown, and input.</p>
<auro-header level="4" id="cssTokensDatepicker">Datepicker</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../datepicker/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../datepicker/src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">/* stylelint-disable color-function-notation */
&#10;@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  // datepicker
  --ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-datepicker-error-icon-color: var(--ds-basic-color-status-error, #{v.$ds-basic-color-status-error});
  --ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-datepicker-outline-color: transparent;
&#10;  // calendar
  --ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-calendar-nav-btn-border-color: transparent;
  --ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #{v.$ds-basic-color-brand-primary});
  --ds-auro-calendar-nav-btn-container-color: transparent;
  --ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-border-color: transparent;
  --ds-auro-calendar-cell-container-color: transparent;
  --ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #{v.$ds-advanced-color-shared-background-muted});
  --ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
&#10;:host([ondark]),
:host([appearance="inverse"]) {
  // datepicker
  --ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-datepicker-error-icon-color: var(--ds-advanced-color-state-error-inverse, #{v.$ds-advanced-color-state-error-inverse});
  --ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-datepicker-outline-color: transparent;
&#10;  // calendar
  --ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-calendar-nav-btn-border-color: transparent;
  --ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #{v.$ds-basic-color-brand-primary});
  --ds-auro-calendar-nav-btn-container-color: transparent;
  --ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, #{v.$ds-basic-color-border-divider});
  --ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-border-color: transparent;
  --ds-auro-calendar-cell-container-color: transparent;
  --ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #{v.$ds-advanced-color-shared-background-muted});
  --ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensDropdown">Dropdown</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../dropdown/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../dropdown/src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
&#10;:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
&#10;:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensExample">Example</auro-header>
<p>The following example overrides a selection of datepicker, dropdown, input, and calendar tokens.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-tokens.html -->
<style>
  auro-datepicker.token-demo {
    /* Datepicker tokens */
    --ds-auro-datepicker-range-input-divider-color: mediumpurple;
    --ds-auro-datepicker-label-text-color: darkslateblue;
    --ds-auro-datepicker-outline-color: transparent;
    /* Dropdown tokens */
    --ds-auro-dropdown-trigger-border-color: mediumpurple;
    --ds-auro-dropdown-trigger-background-color: lavender;
    --ds-auro-dropdown-trigger-hover-background-color: lavender;
    --ds-auro-dropdown-trigger-container-color: lavender;
    --ds-auro-dropdown-trigger-text-color: darkslateblue;
    --ds-auro-dropdown-trigger-outline-color: transparent;
    --ds-auro-dropdownbib-boxshadow-color: rgba(100, 100, 200, 0.3);
    --ds-auro-dropdownbib-background-color: ghostwhite;
    --ds-auro-dropdownbib-container-color: ghostwhite;
    --ds-auro-dropdownbib-text-color: darkslateblue;
    /* Input tokens */
    --ds-auro-input-border-color: mediumpurple;
    --ds-auro-input-container-color: lavender;
    --ds-auro-input-caret-color: mediumpurple;
    --ds-auro-input-label-text-color: darkslateblue;
    --ds-auro-input-placeholder-text-color: slategray;
    --ds-auro-input-text-color: darkslateblue;
    /* Calendar tokens */
    --ds-auro-calendar-nav-btn-chevron-color: mediumpurple;
    --ds-auro-calendar-month-header-color: darkslateblue;
    --ds-auro-calendar-month-container-color: ghostwhite;
    --ds-auro-calendar-month-divider-color: mediumpurple;
    --ds-auro-calendar-cell-text-color: darkslateblue;
    --ds-auro-calendar-cell-in-range-color: lavender;
    --ds-auro-calendar-cell-border-color: transparent;
    --ds-auro-calendar-cell-container-color: transparent;
  }
</style>
<auro-datepicker class="token-demo" range>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.headline">Select dates</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-tokens.html -->

<pre class="language-html"><code class="language-html">&lt;style&gt;
  auro-datepicker.token-demo {
    /* Datepicker tokens */
    --ds-auro-datepicker-range-input-divider-color: mediumpurple;
    --ds-auro-datepicker-label-text-color: darkslateblue;
    --ds-auro-datepicker-outline-color: transparent;
    /* Dropdown tokens */
    --ds-auro-dropdown-trigger-border-color: mediumpurple;
    --ds-auro-dropdown-trigger-background-color: lavender;
    --ds-auro-dropdown-trigger-hover-background-color: lavender;
    --ds-auro-dropdown-trigger-container-color: lavender;
    --ds-auro-dropdown-trigger-text-color: darkslateblue;
    --ds-auro-dropdown-trigger-outline-color: transparent;
    --ds-auro-dropdownbib-boxshadow-color: rgba(100, 100, 200, 0.3);
    --ds-auro-dropdownbib-background-color: ghostwhite;
    --ds-auro-dropdownbib-container-color: ghostwhite;
    --ds-auro-dropdownbib-text-color: darkslateblue;
    /* Input tokens */
    --ds-auro-input-border-color: mediumpurple;
    --ds-auro-input-container-color: lavender;
    --ds-auro-input-caret-color: mediumpurple;
    --ds-auro-input-label-text-color: darkslateblue;
    --ds-auro-input-placeholder-text-color: slategray;
    --ds-auro-input-text-color: darkslateblue;
    /* Calendar tokens */
    --ds-auro-calendar-nav-btn-chevron-color: mediumpurple;
    --ds-auro-calendar-month-header-color: darkslateblue;
    --ds-auro-calendar-month-container-color: ghostwhite;
    --ds-auro-calendar-month-divider-color: mediumpurple;
    --ds-auro-calendar-cell-text-color: darkslateblue;
    --ds-auro-calendar-cell-in-range-color: lavender;
    --ds-auro-calendar-cell-border-color: transparent;
    --ds-auro-calendar-cell-container-color: transparent;
  }
&lt;/style&gt;
&lt;auro-datepicker class="token-demo" range&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Select dates&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="cssTokensInput">Input</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../input/src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../../input/src/styles/tokens.scss -->

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
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="calendarFocusDate">Calendar focus date</auro-header>
<p>Use the <code>calendarFocusDate</code> attribute to control which month the calendar first renders. When set alongside <code>value</code> and <code>valueEnd</code>, <code>calendarFocusDate</code> takes precedence for the visible month.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/calendar-focus-date.html) -->
<!-- The below content is automatically added from ./../apiExamples/calendar-focus-date.html -->
<auro-datepicker range value="2026-06-15" valueEnd="2026-06-22" calendarFocusDate="2026-12-01">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">calendarFocusDate example</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/calendar-focus-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/calendar-focus-date.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker range value="2026-06-15" valueEnd="2026-06-22" calendarFocusDate="2026-12-01"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;calendarFocusDate example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="customValidation">Custom validation</auro-header>
<p>Use the <code>setCustomValidity</code> attributes, such as <code>setCustomValidityValueMissing</code>, to replace the built-in error messages with specific feedback.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/validity.html) -->
<!-- The below content is automatically added from ./../apiExamples/validity.html -->
<auro-datepicker required setCustomValidityValueMissing="Please select a departure date.">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">validity example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/validity.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/validity.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker required setCustomValidityValueMissing="Please select a departure date."&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;validity example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableComponent">Disable component</auro-header>
<p>Use the <code>disabled</code> attribute to turn the datepicker off, so people can't type a date or open the calendar.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-datepicker disabled>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Choose a date</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker disabled&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force error state</auro-header>
<p>Use the <code>error</code> attribute to force the component into an error state with a custom message.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-button id="undefinedValueExampleBtnAddError">Set error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError">Remove error</auro-button>
<br />
<auro-datepicker error="Custom error message" id="errorExample">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Error example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->

<pre class="language-html"><code class="language-html">&lt;auro-button id="undefinedValueExampleBtnAddError"&gt;Set error&lt;/auro-button&gt;
&lt;auro-button id="undefinedValueExampleBtnRemoveError"&gt;Remove error&lt;/auro-button&gt;
&lt;br /&gt;
&lt;auro-datepicker error="Custom error message" id="errorExample"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Error example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="inputMode">Input mode</auro-header>
<p>Use the <code>inputmode</code> attribute to choose which on-screen keyboard phones and tablets show, such as <code>numeric</code> for a number pad.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- The below content is automatically added from ./../apiExamples/inputmode.html -->
<auro-datepicker inputmode="numeric">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/inputmode.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker inputmode="numeric"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="minMaxDate">Min/max date</auro-header>
<p>Use the <code>minDate</code> and <code>maxDate</code> attributes to constrain the selectable date range.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/min-date.html) -->
<!-- The below content is automatically added from ./../apiExamples/min-date.html -->
<auro-datepicker minDate="2028-03-25" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date.">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">minDate example</span>
<span slot="fromLabel">Choose a date on or after 03/25/2028</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/min-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/min-date.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker minDate="2028-03-25" setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;minDate example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date on or after 03/25/2028&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-date.html) -->
<!-- The below content is automatically added from ./../apiExamples/max-date.html -->
<auro-datepicker maxDate="2023-03-25" setCustomValidityRangeOverflow="Selected date is later than maximum date.">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">maxDate example</span>
<span slot="fromLabel">Choose a date on or before 03/25/2023</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-date.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/max-date.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker maxDate="2023-03-25" setCustomValidityRangeOverflow="Selected date is later than maximum date."&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;maxDate example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date on or before 03/25/2023&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No validation</auro-header>
<p>Use the <code>noValidate</code> attribute to turn off the automatic validation that runs when focus leaves the datepicker.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-validate.html -->
<auro-datepicker required noValidate>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">noValidate example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-validate.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker required noValidate&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;noValidate example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require selection</auro-header>
<p>Use the <code>required</code> attribute to make a date required. When a required datepicker is left empty, validation fails with <code>valueMissing</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-datepicker required>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Required example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<br />
<auro-datepicker required range>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Required example</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->

<pre class="language-html"><code class="language-html">&lt;auro-datepicker required&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Required example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;
&lt;br /&gt;
&lt;auro-datepicker required range&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Required example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
