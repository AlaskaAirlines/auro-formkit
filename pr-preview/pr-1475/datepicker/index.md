<auro-header level="1" id="overview">Datepicker - Overview and UX Guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User Stories</auro-anchorlink>
<auro-anchorlink fluid href="#selectDate" class="level2 body-xs">Select a Date</auro-anchorlink>
<auro-anchorlink fluid href="#selectRange" class="level2 body-xs">Select a Range</auro-anchorlink>
<auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset Value</auro-anchorlink>
<auro-anchorlink fluid href="#skipSelection" class="level2 body-xs">Skip Selection</auro-anchorlink>
<auro-anchorlink fluid href="#popoverSlot" class="level2 body-xs">Date Popover</auro-anchorlink>
<auro-anchorlink fluid href="#blackoutDates" class="level2 body-xs">Blackout Dates</auro-anchorlink>
<auro-anchorlink fluid href="#viewportSize" class="level2 body-xs">Viewport Size</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
      The <code>&lt;auro-datepicker&gt;</code> element allows users to select a date, or a pair of dates identifying a range, either with text input or by making a section in a calendar. The <code>&lt;auro-datepicker&gt;</code> element is the combination of <auro-hyperlink href="http://auro.alaskaair.com/components/auro/dropdown">auro-dropdown</auro-hyperlink>, <auro-hyperlink href="http://auro.alaskaair.com/components/auro/input">auro-input</auro-hyperlink>, and Auro's extension of <auro-hyperlink href="https://www.npmjs.com/package/wc-range-datepicker" target="_blank">wc-range-datepicker</auro-hyperlink>.
<!-- AURO-GENERATED-CONTENT:END -->
<section>
<auro-header level="2" id="userStories">User Stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/index/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/index/userStories.md -->
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
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-datepicker>
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
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
<!-- The below content is automatically added from ./../apiExamples/range.html -->
<auro-datepicker range>
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/range.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/range.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker range&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Range Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="presetValue">Preset a value</auro-header>
<p>Use the <code>value</code> attribute to set an initial date. For range datepickers, use both <code>value</code> and <code>valueEnd</code> to preset the full range.</p>
<p>Values may also be set programmatically at any time by updating the <code>value</code> and <code>valueEnd</code> properties via JavaScript.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value.html) -->
<!-- The below content is automatically added from ./../apiExamples/preset-value.html -->
<auro-datepicker value="06/15/2026">
<span slot="bib.fullscreen.headline">Preset Date</span>
<span slot="fromLabel">Departure</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preset-value.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker value="06/15/2026"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Preset Date&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value-range.html) -->
<!-- The below content is automatically added from ./../apiExamples/preset-value-range.html -->
<auro-datepicker range value="06/15/2026" valueEnd="06/22/2026">
<span slot="bib.fullscreen.headline">Preset Range</span>
<span slot="fromLabel">Departure</span>
<span slot="toLabel">Return</span>
<span slot="bib.fullscreen.fromLabel">Departure</span>
<span slot="bib.fullscreen.toLabel">Return</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value-range.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preset-value-range.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker range value="06/15/2026" valueEnd="06/22/2026"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Preset Range&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="toLabel"&gt;Return&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Departure&lt;/span&gt;
  &lt;span slot="bib.fullscreen.toLabel"&gt;Return&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="skipSelection">Skip selection</auro-header>
<p>The datepicker does not force the user to select a date. If no selection is made and the field is not <code>required</code>, the user can move past the datepicker without entering a value.</p>
<p>If the field is <code>required</code>, moving focus away without selecting a date triggers validation and renders the <code>valueMissing</code> error state.</p>
<auro-header level="3" id="popoverSlot">Popover slot</auro-header>
<p>Use the <code>popover_MM_DD_YYYY</code> slot to display additional information when the user hovers over a calendar cell. This is useful for showing pricing, availability, or other contextual details for specific dates.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/popover-slot.html) -->
<!-- The below content is automatically added from ./../apiExamples/popover-slot.html -->
<auro-datepicker centralDate="12/03/2023" calendarStartDate="12/01/2023" calendarEndDate="12/31/2023" minDate="12/04/2023" maxDate="12/09/2023">
<span slot="bib.fullscreen.headline">Popover Slot Example</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
<span slot="popover_12_03_2023">Tickets for this day are sold out</span>
<span slot="date_12_03_2023">$560</span>
<span slot="popover_12_04_2023">34 seats available</span>
<span slot="date_12_04_2023">$245</span>
<span slot="popover_12_05_2023">18 seats available</span>
<span slot="date_12_05_2023">$312</span>
<span slot="popover_12_06_2023">Tickets for this day are sold out</span>
<span slot="date_12_06_2023">$489</span>
<span slot="popover_12_07_2023">52 seats available</span>
<span slot="date_12_07_2023">$198</span>
<span slot="popover_12_08_2023">7 seats available</span>
<span slot="date_12_08_2023">$375</span>
<span slot="popover_12_09_2023">41 seats available</span>
<span slot="date_12_09_2023">$220</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/popover-slot.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/popover-slot.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker centralDate="12/03/2023" calendarStartDate="12/01/2023" calendarEndDate="12/31/2023" minDate="12/04/2023" maxDate="12/09/2023"&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Popover Slot Example&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="popover_12_03_2023"&gt;Tickets for this day are sold out&lt;/span&gt;
  &lt;span slot="date_12_03_2023"&gt;$560&lt;/span&gt;
  &lt;span slot="popover_12_04_2023"&gt;34 seats available&lt;/span&gt;
  &lt;span slot="date_12_04_2023"&gt;$245&lt;/span&gt;
  &lt;span slot="popover_12_05_2023"&gt;18 seats available&lt;/span&gt;
  &lt;span slot="date_12_05_2023"&gt;$312&lt;/span&gt;
  &lt;span slot="popover_12_06_2023"&gt;Tickets for this day are sold out&lt;/span&gt;
  &lt;span slot="date_12_06_2023"&gt;$489&lt;/span&gt;
  &lt;span slot="popover_12_07_2023"&gt;52 seats available&lt;/span&gt;
  &lt;span slot="date_12_07_2023"&gt;$198&lt;/span&gt;
  &lt;span slot="popover_12_08_2023"&gt;7 seats available&lt;/span&gt;
  &lt;span slot="date_12_08_2023"&gt;$375&lt;/span&gt;
  &lt;span slot="popover_12_09_2023"&gt;41 seats available&lt;/span&gt;
  &lt;span slot="date_12_09_2023"&gt;$220&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="blackoutDates">Blackout dates with custom label</auro-header>
<p>Use the <code>blackoutLabel</code> attribute to customize the screen reader announcement for blackout (disabled but in-range) dates. The default label is <code>"unavailable"</code>. This is useful when you want to provide more context about why a date cannot be selected, such as <code>"sold out"</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/blackout-label.html) -->
<!-- The below content is automatically added from ./../apiExamples/blackout-label.html -->
<auro-datepicker id="blackoutLabelExample" blackoutLabel="sold out">
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/blackout-label.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/blackout-label.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker id="blackoutLabelExample" blackoutLabel="sold out"&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="viewportSize">Viewport size</auro-header>
<p>The datepicker automatically adapts its presentation based on viewport size. On larger screens, the calendar opens in a floating popover anchored to the trigger. On smaller screens, the calendar opens in a fullscreen dialog.</p>
<p>The breakpoint at which the fullscreen behavior activates is controlled by the <code>fullscreenBreakpoint</code> attribute. The default value is <code>sm</code>. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-datepicker fullscreenBreakpoint="lg">
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
