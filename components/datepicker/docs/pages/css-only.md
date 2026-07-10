<auro-header level="1">CSS only with native date input</auro-header>

<p>For situations where the <code>&lt;auro-datepicker&gt;</code> web component cannot be used, a native HTML <code>&lt;input type="date"&gt;</code> element can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-datepicker</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.datepicker</code> class, so the styling must be authored manually using Auro design tokens.</p>

<auro-header level="2">Styling a native date input</auro-header>

<p>The native date input can be reset and restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the size, border, and focus-state colors used by <code>auro-datepicker</code>. Note that the browser-controlled calendar UI rendered by <code>&lt;input type="date"&gt;</code> cannot be styled — only the input chrome (the field itself) responds to CSS.</p>

<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";

.datepicker {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: var(--ds-size-600, 3rem);
  padding: 0 var(--ds-size-200, 1rem);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: var(--ds-border-radius, 4px);
  background-color: var(--ds-color-container-primary-default, #ffffff);
  color: var(--ds-color-text-primary-default, #1d252c);
  font-family: var(--ds-font-family-default, sans-serif);
  font-size: var(--ds-text-body-default-size, 1rem);
  line-height: var(--ds-text-body-default-height, 1.5);
  cursor: pointer;
}

.datepicker:focus-visible {
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: 2px;
}

.datepicker:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.datepicker:invalid {
  border-color: var(--ds-color-border-error-default, #d50000);
}
</code></pre>

<auro-header level="3">Basic date input</auro-header>

<p>Apply the <code>.datepicker</code> class to a native <code>&lt;input type="date"&gt;</code> element and pair it with a <code>&lt;label&gt;</code>:</p>

<pre><code>&lt;label&gt;
  Departure date
  &lt;input type="date" class="datepicker" name="departure" /&gt;
&lt;/label&gt;</code></pre>

<auro-header level="3">Date range using two inputs</auro-header>

<p>HTML has no native range input, so a range must be approximated with two separate <code>&lt;input type="date"&gt;</code> elements. The <code>min</code> attribute on the second input can be used to constrain the return date to be on or after the departure date, but this coordination must be wired up with JavaScript:</p>

<pre><code>&lt;fieldset&gt;
  &lt;legend&gt;Travel dates&lt;/legend&gt;
  &lt;label&gt;
    Departure
    &lt;input type="date" class="datepicker" name="departure" id="departure" /&gt;
  &lt;/label&gt;
  &lt;label&gt;
    Return
    &lt;input type="date" class="datepicker" name="return" id="return" /&gt;
  &lt;/label&gt;
&lt;/fieldset&gt;</code></pre>

<auro-header level="2">What you lose without auro-datepicker</auro-header>

<p>While the CSS above replicates the <strong>visual styling</strong> of the <code>auro-datepicker</code> input chrome, the following functionality built into the <code>auro-datepicker</code> web component is <strong>not available</strong> when using plain HTML:</p>

<auro-header level="3">Accessibility</auro-header>

<p>Native date inputs vary widely across browsers and platforms, with inconsistent screen reader announcements, keyboard behavior, and focus management. <code>auro-datepicker</code> provides full arrow-key navigation of the calendar grid, rich ARIA labels on every cell (including state like "selected", "today", "unavailable", "in range"), <code>aria-live</code> announcements when the visible month changes, support for <code>prefers-reduced-motion</code>, and managed focus when the calendar opens and closes. With a native input, all of this is delegated to the browser and often differs significantly between Chrome, Safari, and Firefox — sometimes with no keyboard navigation of the calendar grid at all.</p>

<auro-header level="3">Date range selection</auro-header>

<p>HTML has no native concept of a date range picker. Building one from two <code>&lt;input type="date"&gt;</code> elements requires custom logic for coordinating values, enforcing start-before-end ordering, and providing a unified visual experience. <code>auro-datepicker</code> handles this with a single <code>range</code> attribute, providing two coordinated input fields, visual range highlighting across the calendar grid, customizable ARIA labels for range positions, and automatic value coordination between the start and end dates.</p>

<auro-header level="3">Blackout dates</auro-header>

<p>Native date inputs have no mechanism to mark specific dates as unavailable. <code>min</code> and <code>max</code> can restrict to a contiguous range, but they cannot express "these specific dates within the range are not selectable." <code>auro-datepicker</code> supports a <code>blackoutDates</code> array of ISO date strings that are visually styled as unavailable, announced to screen readers with a customizable label, focusable but not selectable, and validated on typed input to surface a <code>customError</code> validity state.</p>

<auro-header level="3">Custom validation</auro-header>

<p>Native date validation is limited to <code>required</code>, <code>min</code>, and <code>max</code>, and error messages are browser-controlled. <code>auro-datepicker</code> integrates with the Auro form validation system, exposing per-constraint setters (<code>setCustomValidityValueMissing</code>, <code>setCustomValidityRangeOverflow</code>, <code>setCustomValidityRangeUnderflow</code>, <code>setCustomValidityCustomError</code>), running validation on blur, on value change, and when constraints change, dispatching <code>auroFormElement-validated</code> events, and displaying errors inline via the help text slot.</p>

<auro-header level="3">Responsive layout</auro-header>

<p>Native date inputs render a small, browser-controlled popup that cannot be styled or repositioned. <code>auro-datepicker</code> adapts to viewport size: on desktop the calendar appears as a positioned dropdown bib, with an optional <code>desktopModal</code> mode that traps focus and makes background content inert; on mobile it opens as a fullscreen dialog via <code>showModal()</code> with a configurable <code>fullscreenBreakpoint</code>; and on desktop range mode it can display two months side-by-side.</p>

<auro-header level="3">Localization</auro-header>

<p>Native <code>&lt;input type="date"&gt;</code> follows the browser's locale for display format but offers no control over month names, navigation labels, or ARIA text. <code>auro-datepicker</code> supports custom <code>monthNames</code> arrays for any language, localizable navigation labels (<code>navLabelPrevMonth</code>, <code>navLabelNextMonth</code>), localizable range position labels for screen readers, a customizable <code>blackoutLabel</code>, and a configurable date display format.</p>

<auro-header level="3">Custom cell content</auro-header>

<p>Native date inputs render a fixed grid of numbers, with no way to add prices, icons, or supplementary information to individual dates. <code>auro-datepicker</code> supports per-date slot content via <code>date_YYYY_MM_DD</code> slots for content rendered below each date number (e.g. flight prices) and <code>popover_YYYY_MM_DD</code> slots for content that appears on hover or focus for a specific date, enabling reference data alongside dates for decision-making.</p>

<auro-header level="3">Design system integration</auro-header>

<p>A native <code>&lt;input type="date"&gt;</code> cannot be styled to match a design system — shadow DOM browser controls resist CSS customization and the calendar popup is entirely outside author control. <code>auro-datepicker</code> is built with the Auro Design System, providing consistent visual language with other Auro form components, light and dark theme support (<code>appearance="default"</code> or <code>appearance="inverse"</code>), CSS custom properties and <code>::part()</code> selectors for targeted styling, and composition from versioned Auro sub-components (dropdown, input, button, icon).</p>

<auro-header level="2">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Native <code>&lt;input type="date"&gt;</code> with Auro tokens</th>
      <th><code>auro-datepicker</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design-system-aligned styling</td>
      <td>Input chrome only (author-written CSS)</td>
      <td>Built-in across input and calendar</td>
    </tr>
    <tr>
      <td>Calendar UI styling</td>
      <td>Not possible (browser-controlled)</td>
      <td>Full control via tokens and parts</td>
    </tr>
    <tr>
      <td>Keyboard navigation</td>
      <td>Browser-dependent</td>
      <td>Full arrow-key grid navigation</td>
    </tr>
    <tr>
      <td>Screen reader support</td>
      <td>Inconsistent across browsers</td>
      <td>Rich ARIA labels and live regions</td>
    </tr>
    <tr>
      <td>Date range</td>
      <td>Manual (two coordinated inputs)</td>
      <td>Built-in via <code>range</code> attribute</td>
    </tr>
    <tr>
      <td>Blackout dates</td>
      <td>Not supported</td>
      <td><code>blackoutDates</code> array with validation</td>
    </tr>
    <tr>
      <td>Custom validation messages</td>
      <td>Limited to <code>setCustomValidity()</code></td>
      <td>Per-constraint custom messages</td>
    </tr>
    <tr>
      <td>Responsive layout</td>
      <td>Fixed browser popup</td>
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
      <td>Dark background support</td>
      <td>Manual</td>
      <td>Yes (<code>appearance="inverse"</code>)</td>
    </tr>
    <tr>
      <td>Form validation events</td>
      <td>Not supported</td>
      <td><code>auroFormElement-validated</code></td>
    </tr>
    <tr>
      <td>Multi-brand theming</td>
      <td>Static (import-time tokens)</td>
      <td>Full (design tokens + component logic)</td>
    </tr>
  </tbody>
</table>

<auro-header level="2">Recommendation</auro-header>

<p>Use <code>auro-datepicker</code> whenever possible. Fall back to a CSS-styled native <code>&lt;input type="date"&gt;</code> only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to accept the browser's calendar UI as-is and to reimplement range coordination, blackout handling, custom validation messaging, and accessibility affordances yourself.</p>
