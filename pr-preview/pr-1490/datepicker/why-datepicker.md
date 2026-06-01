<auro-header level="1" id="overview">Why auro-datepicker?</auro-header>
<p>The native HTML <code>&lt;input type="date"&gt;</code> element provides a minimal date-picking experience, but it falls short for the needs of a complex, accessible, and branded application. <code>auro-datepicker</code> bridges those gaps with a purpose-built component designed for real-world use.</p>
<auro-header level="2" id="accessibility">Accessibility</auro-header>
<p>Native date inputs vary widely across browsers and platforms, with inconsistent screen reader announcements, keyboard behavior, and focus management.</p>
<p><code>auro-datepicker</code> provides:</p>
<ul>
<li><strong>Full keyboard navigation</strong> — Arrow keys move between days, months, and years. Enter and Space select a date. Escape closes the calendar. The <code>aria-activedescendant</code> pattern keeps DOM focus on the calendar grid wrapper while visually indicating the active cell, so screen readers stay in sync without duplicate announcements during rapid navigation.</li>
<li><strong>Rich ARIA semantics</strong> — Every cell is labeled with its full date, day-of-week, and contextual state (e.g. "selected", "today", "unavailable", "range start", "in range"). Screen reader users hear meaningful announcements, not just numbers.</li>
<li><strong>Live region announcements</strong> — Month changes are announced via <code>aria-live</code> so assistive technology users know the visible month has changed.</li>
<li><strong>Reduced motion support</strong> — Scrolling and transitions respect <code>prefers-reduced-motion</code>.</li>
<li><strong>Focus management</strong> — Opening the calendar moves focus to the calendar grid wrapper, with <code>aria-activedescendant</code> pointing to the active date cell. Closing it returns focus to the trigger input. The fullscreen dialog uses <code>showModal()</code> for native inert-background behavior, while the desktop modal traps focus within the bib.</li>
</ul>
<p>By contrast, native <code>&lt;input type="date"&gt;</code> delegates all of this to the browser, and the result differs significantly between Chrome, Safari, and Firefox — often with no keyboard navigation of the calendar grid at all on some platforms.</p>
<auro-header level="2" id="dateRangeSelection">Date range selection</auro-header>
<p>HTML has no native concept of a date range picker. Building one from two <code>&lt;input type="date"&gt;</code> elements requires custom logic for coordinating values, enforcing start-before-end ordering, and providing a unified visual experience.</p>
<p><code>auro-datepicker</code> handles this with a single <code>range</code> attribute, providing:</p>
<ul>
<li>Two coordinated input fields with shared calendar interaction</li>
<li>Visual range highlighting across the calendar grid</li>
<li>Customizable ARIA labels for range positions (start, end, in-range, before range, after range)</li>
<li>Automatic value coordination between departure and return dates</li>
</ul>
<auro-header level="2" id="blackoutDates">Blackout dates</auro-header>
<p>Native date inputs have no mechanism to mark specific dates as unavailable. <code>minDate</code> and <code>maxDate</code> can restrict to a range, but they cannot express "these specific dates within the range are not selectable."</p>
<p><code>auro-datepicker</code> supports a <code>blackoutDates</code> array of ISO date strings. Blacked-out dates are:</p>
<ul>
<li>Visually styled as unavailable</li>
<li>Announced as unavailable (with a customizable label like "sold out") to screen readers</li>
<li>Focusable but not selectable via click or keyboard</li>
<li>Validated on typed input — entering a blackout date triggers a <code>customError</code> validity state</li>
</ul>
<auro-header level="2" id="validation">Validation</auro-header>
<p>Native date validation is limited to <code>required</code>, <code>min</code>, and <code>max</code>. Error messages are browser-controlled and cannot be customized.</p>
<p><code>auro-datepicker</code> integrates with the Auro form validation system:</p>
<ul>
<li>Supports <code>required</code>, <code>minDate</code>, <code>maxDate</code>, and blackout date constraints</li>
<li>Custom error messages for each validity state (<code>setCustomValidityValueMissing</code>, <code>setCustomValidityRangeOverflow</code>, <code>setCustomValidityRangeUnderflow</code>, <code>setCustomValidityCustomError</code>)</li>
<li>Validation runs on blur, on value change, and when constraints change (e.g. <code>blackoutDates</code> is updated)</li>
<li>Dispatches <code>auroFormElement-validated</code> events so parent forms can react</li>
<li>Displays errors inline via the help text slot</li>
</ul>
<auro-header level="2" id="responsiveLayout">Responsive layout</auro-header>
<p>Native date inputs render a small, browser-controlled popup that cannot be styled or repositioned.</p>
<p><code>auro-datepicker</code> adapts to viewport size:</p>
<ul>
<li><strong>Desktop</strong> — Calendar appears as a positioned dropdown bib, with optional modal behavior (<code>desktopModal</code>) that traps focus and makes background content inert</li>
<li><strong>Mobile</strong> — Calendar opens as a fullscreen dialog via <code>showModal()</code>, with a configurable breakpoint (<code>fullscreenBreakpoint</code>). The virtual keyboard stays open during the transition so users can continue typing</li>
<li><strong>Multi-month</strong> — Desktop viewports can display two months side-by-side for range selection</li>
</ul>
<auro-header level="2" id="localization">Localization</auro-header>
<p>Native <code>&lt;input type="date"&gt;</code> follows the browser's locale for display format, but offers no control over month names, labels, or ARIA text.</p>
<p><code>auro-datepicker</code> supports:</p>
<ul>
<li>Custom <code>monthNames</code> arrays for any language</li>
<li>Localizable navigation labels (<code>navLabelPrevMonth</code>, <code>navLabelNextMonth</code>)</li>
<li>Localizable range position labels for screen readers</li>
<li>Customizable <code>blackoutLabel</code> text</li>
<li>Configurable date display format</li>
</ul>
<auro-header level="2" id="customCellContent">Custom cell content</auro-header>
<p>Native date inputs render a fixed grid of numbers. There is no way to add prices, icons, or supplementary information to individual dates.</p>
<p><code>auro-datepicker</code> supports per-date slot content:</p>
<ul>
<li><strong>Date slots</strong> (<code>date_MM_DD_YYYY</code>) — Add custom HTML below the date number (e.g. flight prices, availability indicators)</li>
<li><strong>Popover slots</strong> (<code>popover_MM_DD_YYYY</code>) — Add popover content that appears on hover or focus for a specific date</li>
<li><strong>Reference dates</strong> — Display reference data alongside dates for decision-making</li>
</ul>
<auro-header level="2" id="designSystemIntegration">Design system integration</auro-header>
<p>A native <code>&lt;input type="date"&gt;</code> cannot be styled to match a design system. Shadow DOM browser controls resist CSS customization, and the calendar popup is entirely outside author control.</p>
<p><code>auro-datepicker</code> is built with the Alaska Airlines Auro Design System:</p>
<ul>
<li>Consistent visual language with other Auro form components</li>
<li>Light and dark theme support (<code>appearance="default"</code> or <code>appearance="inverse"</code>)</li>
<li>CSS custom properties and <code>::part()</code> selectors for targeted styling</li>
<li>Composed from versioned Auro sub-components (dropdown, input, button, icon) for consistency</li>
</ul>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;input type="date"&gt;</code></th>
<th><code>auro-datepicker</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Keyboard navigation</td>
<td>Browser-dependent</td>
<td>Full arrow-key grid navigation</td>
</tr>
<tr>
<td>Screen reader support</td>
<td>Inconsistent</td>
<td>Rich ARIA labels and live regions</td>
</tr>
<tr>
<td>Date range</td>
<td>Not supported</td>
<td>Built-in with <code>range</code> attribute</td>
</tr>
<tr>
<td>Blackout dates</td>
<td>Not supported</td>
<td><code>blackoutDates</code> array with validation</td>
</tr>
<tr>
<td>Custom validation messages</td>
<td>Not supported</td>
<td>Per-constraint custom messages</td>
</tr>
<tr>
<td>Responsive layout</td>
<td>Fixed popup</td>
<td>Desktop dropdown / mobile fullscreen</td>
</tr>
<tr>
<td>Custom cell content</td>
<td>Not supported</td>
<td>Per-date slots and popovers</td>
</tr>
<tr>
<td>Localization</td>
<td>Browser locale only</td>
<td>Fully configurable labels and names</td>
</tr>
<tr>
<td>Theming</td>
<td>Minimal / browser-dependent</td>
<td>Full design system integration</td>
</tr>
</tbody>
</table>
