<auro-header level="3" id="selectDate">Select a date</auro-header>
<ol>
  <li>
    Move focus to the datepicker input
    <div class="note">
      <p>
        The label moves from the placeholder position to the active position above the input area. The input is ready to accept a typed date value.
      </p>
    </div>
  </li>
  <li>
    Click the input or press <kbd>Enter</kbd> / <kbd>Space</kbd> to open the calendar
    <div class="note">
      <p>
        The calendar opens to the month of <code>calendarFocusDate</code> or the selected date. With neither set, it first opens to the current month. The active date is chosen in this order:
      </p>
      <ol>
        <li>The selected date, if it's within the <code>minDate</code> to <code>maxDate</code> range.</li>
        <li>Today's date, if it's in the month shown and enabled.</li>
        <li>The first enabled date in the months shown.</li>
        <li>The nearest enabled date after today, then before today.</li>
      </ol>
    </div>
  </li>
  <li>
    Select a date by clicking a calendar cell or by typing a date directly into the input
    <div class="note">
      <p>
        When a valid date is selected, the <code>value</code> property is updated. The calendar remains open so additional dates can be reviewed. Close the calendar by pressing Escape or activating the Done button. If the user types a date, it must match the configured <code>format</code> (default <code>mm/dd/yyyy</code>).
      </p>
    </div>
  </li>
  <li>
    Move focus away from the datepicker
    <div class="note">
      <p>
        Validation is triggered on blur by default. If the value doesn't meet the configured constraints, such as <code>required</code>, <code>minDate</code>, or <code>maxDate</code>, the component renders an error state with a help text message.
      </p>
    </div>
  </li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="selectRange">Select a date range</auro-header>
<p>When the <code>range</code> attribute is set, the datepicker renders two inputs: one for the start date and one for the end date.</p>
<ol>
  <li>Select a start date: the start date is set, and the calendar stays open for the end date.</li>
  <li>Select an end date: the end date is set, and the date range is highlighted in the calendar.</li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/range.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/range.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="presetValue">Preset a value</auro-header>
<p>Use the <code>value</code> attribute to set an initial date. For range datepickers, use both <code>value</code> and <code>valueEnd</code> to preset the full range.</p>
<p>To change the dates at any time, set the <code>value</code> and <code>valueEnd</code> properties in JavaScript.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value-range.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value-range.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="skipSelection">Skip selection</auro-header>
<p>The datepicker doesn't force the user to select a date. If no selection is made and the field isn't <code>required</code>, the user can move past the datepicker without entering a value.</p>
<p>If the field is <code>required</code>, moving focus away without selecting a date triggers validation and renders the <code>valueMissing</code> error state.</p>
<auro-header level="3" id="popoverSlot">Popover slot</auro-header>
<p>Use the <code>popover_YYYY_MM_DD</code> slot to display additional information when the user hovers over a calendar cell or moves to it with the keyboard. This is useful for showing pricing, availability, or other contextual details for specific dates.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/popover-slot.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/popover-slot.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="blackoutDates">Blackout dates with custom label</auro-header>
<p>Use the <code>blackoutLabel</code> attribute to customize the screen reader announcement for blackout (disabled but in-range) dates. The default label is <code>"unavailable"</code>. This is useful when you want to provide more context about why a date can't be selected, such as <code>"sold out"</code>.</p>
<p>When a user types a blackout date into the input, the datepicker validates the entry and displays a <code>customError</code> message. The default message is <code>"Selected date is unavailable"</code>. Use the <code>setCustomValidityCustomError</code> attribute to provide a custom error message, for example <code>setCustomValidityCustomError="That date is sold out"</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/blackout-label.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/blackout-label.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="referenceDates">Reference dates</auro-header>
<p>Use the <code>referenceDates</code> attribute to highlight specific dates on the calendar. Reference dates are displayed with a distinct visual treatment to draw attention to dates of interest, such as the cheapest travel dates or dates with special availability.</p>
<p class="note"><strong>Note:</strong> Add popover slot content for each reference date to explain why it's marked.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reference-dates.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reference-dates.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="viewportSize">Viewport size</auro-header>
<p>The datepicker automatically adapts its presentation based on viewport size. On larger screens, the calendar opens in a floating popover anchored to the trigger. On smaller screens, the calendar opens in a fullscreen dialog.</p>
<p>The breakpoint at which the fullscreen behavior activates is controlled by the <code>fullscreenBreakpoint</code> attribute. The default value is <code>sm</code>. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
