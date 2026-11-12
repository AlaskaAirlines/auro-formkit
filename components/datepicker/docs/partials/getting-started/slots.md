<auro-header level="2" id="slots">Slots</auro-header>
<p>The following slots are available on the <code>&lt;auro-datepicker&gt;</code> element.</p>
<auro-header level="3" id="slot-fromLabel">fromLabel</auro-header>
<p>Label for the start date input, or the only input, such as "Departure date". Also gives the calendar dialog its accessible name.</p>
<auro-header level="3" id="slot-toLabel">toLabel</auro-header>
<p>Label for the end date input when <code>range</code> is set, such as "Return date".</p>
<auro-header level="3" id="slot-label">label</auro-header>
<p>Label for the whole datepicker in the <code>snowflake</code> layout, such as "Travel dates".</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Help text shown below the datepicker. An error message replaces it while the datepicker is invalid.</p>
<auro-header level="3" id="slot-ariaLabel-input-clear">ariaLabel.input.clear</auro-header>
<p>Text read by screen readers for the clear button, for example "Clear dates". Defaults to "Clear input field".</p>
<auro-header level="3" id="slot-ariaLabel-bib-close">ariaLabel.bib.close</auro-header>
<p>Text read by screen readers for the close button in the fullscreen calendar, for example "Close calendar". It has no default, so always provide it.</p>
<auro-header level="3" id="slot-bib-fullscreen-headline">bib.fullscreen.headline</auro-header>
<p>Headline shown at the top of the fullscreen (mobile) calendar, above the date labels.</p>
<auro-header level="3" id="slot-bib-fullscreen-fromLabel">bib.fullscreen.fromLabel</auro-header>
<p>Label shown above the start date in the fullscreen (mobile) calendar.</p>
<auro-header level="3" id="slot-bib-fullscreen-toLabel">bib.fullscreen.toLabel</auro-header>
<p>Label shown above the end date in the fullscreen (mobile) calendar when <code>range</code> is set.</p>
<auro-header level="3" id="slot-date">date_YYYY_MM_DD</auro-header>
<p>Content shown under the day number in the calendar for one date, such as a price. Replace <code>YYYY_MM_DD</code> with the date, for example <code>slot="date_2026_01_15"</code>. Add the <code>highlight</code> attribute to show the text in the success color.</p>
<auro-header level="3" id="slot-popover">popover_YYYY_MM_DD</auro-header>
<p>Content shown in a popover when someone points to a date in the calendar or moves to it with the keyboard. Replace <code>YYYY_MM_DD</code> with the date, for example <code>slot="popover_2026_01_15"</code>.</p>
