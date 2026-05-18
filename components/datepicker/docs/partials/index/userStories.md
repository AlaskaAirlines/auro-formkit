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
        The calendar bib opens and displays the current month. The focused cell is determined in the following priority order:
      </p>
      <ol>
        <li>The currently selected date (if one exists and is within the valid min/max range).</li>
        <li>Today's date (if it is enabled — within the min/max range).</li>
        <li>The first future enabled date.</li>
        <li>The first past enabled date.</li>
      </ol>
    </div>
  </li>
  <li>
    Select a date by clicking a calendar cell or by typing a date directly into the input
    <div class="note">
      <p>
        When a valid date is selected, the <code>value</code> property is updated and the calendar closes (on desktop). If the user types a date, it must match the configured <code>format</code> (default <code>mm/dd/yyyy</code>).
      </p>
    </div>
  </li>
  <li>
    Move focus away from the datepicker
    <div class="note">
      <p>
        Validation is triggered on blur by default. If the value does not meet the configured constraints (e.g. <code>required</code>, <code>minDate</code>, <code>maxDate</code>), the component renders an error state with a help text message.
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
<p>When the <code>range</code> attribute is set, the datepicker renders two inputs — one for the start date and one for the end date.</p>
<ol>
  <li>Select a departure date — the start date is set and focus moves to the return input</li>
  <li>Select a return date — the end date is set and the date range is highlighted in the calendar</li>
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
<p>Values may also be set programmatically at any time by updating the <code>value</code> and <code>valueEnd</code> properties via JavaScript.</p>
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
<p>The datepicker does not force the user to select a date. If no selection is made and the field is not <code>required</code>, the user can move past the datepicker without entering a value.</p>
<p>If the field is <code>required</code>, moving focus away without selecting a date triggers validation and renders the <code>valueMissing</code> error state.</p>
<auro-header level="3" id="popoverSlot">Popover slot</auro-header>
<p>Use the <code>popover_MM_DD_YYYY</code> slot to display additional information when the user hovers over a calendar cell. This is useful for showing pricing, availability, or other contextual details for specific dates.</p>
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
<p>Use the <code>blackoutLabel</code> attribute to customize the screen reader announcement for blackout (disabled but in-range) dates. The default label is <code>"unavailable"</code>. This is useful when you want to provide more context about why a date cannot be selected, such as <code>"sold out"</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/blackout-label.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/blackout-label.html) -->
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
