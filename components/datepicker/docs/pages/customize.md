<auro-header level="1" id="overview">Datepicker - Customize</auro-header>
<div class="contentWrapper">
<nav>
  <auro-nav anchorNavContent=".scrollWrapper">
    <span slot="mobileToggleCollapsed">View More</span>
    <span slot="mobileToggleExpanded">View Less</span>
    <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
    <auro-anchorlink fluid href="#layout" class="level2 body-xs">Shape, Size & Layout</auro-anchorlink>
    <auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
    <auro-anchorlink fluid href="#placement" class="level2 body-xs">Bib Placement</auro-anchorlink>
    <auro-anchorlink fluid href="#breakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
    <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
    <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
    <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
    <auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
    <auro-anchorlink fluid href="#disableComponent" class="level2 body-xs">Disable Component</auro-anchorlink>
    <auro-anchorlink fluid href="#requireSelection" class="level2 body-xs">Require Selection</auro-anchorlink>
    <auro-anchorlink fluid href="#forceError" class="level2 body-xs">Force Error State</auro-anchorlink>
    <auro-anchorlink fluid href="#customValidation" class="level2 body-xs">Custom Validation</auro-anchorlink>
    <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validation</auro-anchorlink>
    <auro-anchorlink fluid href="#minMaxDate" class="level2 body-xs">Min/Max Date</auro-anchorlink>
    <auro-anchorlink fluid href="#monthNames" class="level2 body-xs">Month Names</auro-anchorlink>
    <auro-anchorlink fluid href="#localization" class="level2 body-xs">Localization</auro-anchorlink>
  </auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="layout">Shape, Size & Layout</auro-header>
<p>The <code>shape</code>, <code>size</code> and <code>layout</code> attributes work in collaboration to control the overall architecture of the component.</p>
<p>See the <a href="./design.html">Design page</a> for a detailed breakdown.</p>
<auro-header level="3" id="background">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="placement">Bib Placement</auro-header>
<p>The bib position can be customized with <code>placement</code>, <code>offset</code>, <code>flip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="breakpoint">Fullscreen Breakpoint</auro-header>
<p>The <code>fullscreenBreakpoint</code> attribute defines the screen size breakpoint at which the dropdown switches to fullscreen mode on mobile. Supported values are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, and <code>disabled</code>. The default value is <code>sm</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by changing the values of the following token(s) for the datepicker, dropdown, and input</p>
<auro-header level="4" id="cssTokensDatepicker">Datepicker</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../datepicker/src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensDropdown">Dropdown</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../dropdown/src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensInput">Input</auro-header>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../input/src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="4" id="cssTokensExample">Example</auro-header>
<p>The following example demonstrates overriding all available datepicker, dropdown, input, and calendar tokens.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="inputMode">Input Mode</auro-header>
<p>The <code>inputmode</code> attribute controls which virtual keyboard layout is presented on mobile devices.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disableComponent">Disable Component</auro-header>
<p>Use the <code>disabled</code> attribute to render the datepicker in a non-interactive state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="requireSelection">Require Selection</auro-header>
<p>Use the <code>required</code> attribute to require a date selection before form submission.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="forceError">Force Error State</auro-header>
<p>Use the <code>error</code> attribute to force the component into an error state with a custom message.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="customValidation">Custom Validation</auro-header>
<p>Use the <code>validity</code> attribute with a custom error message to provide specific feedback.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/validity.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/validity.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noValidate">No Validation</auro-header>
<p>Use the <code>noValidate</code> attribute to disable all validation on the component.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-validate.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-validate.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="minMaxDate">Min/Max Date</auro-header>
<p>Use the <code>minDate</code> and <code>maxDate</code> attributes to constrain the selectable date range.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/min-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/min-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/max-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/max-date.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="localization">Localization</auro-header>
<p>Use the <code>centralDate</code>, locale, and related attributes to configure the datepicker for different regions and languages.</p>
<auro-header level="4" id="rangeLabels">Screen Reader Labels</auro-header>
<p>The following attributes customize the labels announced by screen readers when navigating the calendar. Range labels apply when the <code>range</code> attribute is set; navigation labels apply to all configurations.</p>
<auro-table>
  <table>
    <thead>
      <tr>
        <th>Attribute</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>rangeLabelStart</code></td>
        <td>"range start"</td>
        <td>Announced on the departure/start date cell.</td>
      </tr>
      <tr>
        <td><code>rangeLabelEnd</code></td>
        <td>"range end"</td>
        <td>Announced on the return/end date cell.</td>
      </tr>
      <tr>
        <td><code>rangeLabelBeforeRange</code></td>
        <td>"before range"</td>
        <td>Announced on cells before the start date.</td>
      </tr>
      <tr>
        <td><code>rangeLabelInRange</code></td>
        <td>"in range"</td>
        <td>Announced on cells between the start and end dates.</td>
      </tr>
      <tr>
        <td><code>rangeLabelAfterRange</code></td>
        <td>"after range"</td>
        <td>Announced on cells after the end date (or after start when no end is selected).</td>
      </tr>
      <tr>
        <td><code>navLabelPrevMonth</code></td>
        <td>"Previous month"</td>
        <td>Accessible label for the previous month navigation button.</td>
      </tr>
      <tr>
        <td><code>navLabelNextMonth</code></td>
        <td>"Next month"</td>
        <td>Accessible label for the next month navigation button.</td>
      </tr>
      <tr>
        <td><code>calendarGridLabel</code></td>
        <td>"Calendar days of the month"</td>
        <td>Accessible label for the calendar grid containing the days of the month.</td>
      </tr>
    </tbody>
  </table>
</auro-table>
<auro-header level="4" id="regionalDate">Regional Date</auro-header>
<p>When the <code>locale</code> attribute is set, the component automatically derives the correct date format for that region — no need to set <code>format</code> manually. For example, <code>locale="en-US"</code> produces <code>mm/dd/yyyy</code>, <code>locale="de-DE"</code> produces <code>dd.mm.yyyy</code>, and <code>locale="ja-JP"</code> produces <code>yyyy/mm/dd</code>.</p>
<p>If <code>format</code> is explicitly set alongside <code>locale</code>, <code>format</code> always wins. Use this when a specific format is required regardless of region.</p>
<p>If no <code>locale</code> attribute is set on the element, the component walks up the DOM looking for the nearest ancestor with a <code>data-locale</code> attribute and uses that value. If none is found, it defaults to <code>en-US</code>.</p>
<auro-header level="4" id="monthNames">Month Names</auro-header>
<p>The <code>monthNames</code> attribute accepts an array of 12 month name strings displayed in the calendar header. When <code>monthNames</code> is <strong>not</strong> set, the component automatically derives localized month names from the active <code>locale</code> (falling back to <code>en-US</code> if no locale is set).</p>
<p>Use <code>monthNames</code> only when you need to override the locale-derived names — for example, to supply translated names that differ from the browser's built-in <code>Intl</code> output, or to support a locale the browser does not recognize.</p>
<pre><code>// Override month names (all 12 required, starting with January)
datepicker.monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
</code></pre>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/locale.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
