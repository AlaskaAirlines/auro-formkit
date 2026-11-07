<auro-header level="1" id="overview">Why auro-select?</auro-header>

<p>The native <code>&lt;select&gt;</code> element is one of the most difficult HTML elements to style, has no support for rich option content, and behaves inconsistently across browsers. <code>auro-select</code> provides a fully styled, accessible, and feature-rich replacement.</p>

<auro-header level="2" id="accessibility">Accessibility</auro-header>

<p>Native <code>&lt;select&gt;</code> has basic accessibility, but the dropdown behavior, keyboard navigation, and screen reader announcements vary between browsers and platforms.</p>

<p><code>auro-select</code> provides:</p>

<ul>
  <li><strong>ARIA combobox pattern:</strong> The trigger uses <code>role="combobox"</code> with <code>aria-expanded</code>, <code>aria-controls</code>, and <code>aria-activedescendant</code> for proper screen reader semantics.</li>
  <li><strong>Full keyboard navigation:</strong> Arrow Up and Arrow Down move through the options (with Alt or Control to jump to the first or last option), Enter selects, Escape closes, Home and End jump to the first and last options, and Tab selects the active option, closes the bib, and moves focus on.</li>
  <li><strong>Screen reader announcements:</strong> <code>aria-live="polite"</code> announces selections, and <code>aria-live="assertive"</code> announces validation errors. Each option carries <code>aria-setsize</code> and <code>aria-posinset</code> for position context.</li>
  <li><strong>Active descendant:</strong> Focus stays on the trigger while arrow keys highlight options, so screen readers announce the highlighted option without disrupting focus.</li>
</ul>

<auro-header level="2" id="richOptionContent">Rich option content</auro-header>

<p><code>&lt;option&gt;</code> elements accept only plain text, with no native way to add icons, secondary text, or nested groups.</p>

<p><code>auro-select</code> uses <code>auro-menu</code> internally, enabling:</p>

<ul>
  <li>Full HTML content in each option (icons, descriptions, badges)</li>
  <li>Nested option groups for hierarchical organization</li>
  <li>Checkmark indicators for the selected option</li>
</ul>

<auro-header level="2" id="multiselect">Multi-select</auro-header>

<p>Native <code>&lt;select multiple&gt;</code> renders a scrollable list box, a UI pattern widely regarded as confusing. Users must Ctrl+click to select multiple items, and the list shows no checkmarks or other visual feedback.</p>

<p><code>auro-select</code> with <code>multiSelect</code> provides:</p>

<ul>
  <li>A bib that stays open between selections</li>
  <li>Checkmarks on each selected option</li>
  <li>A JSON-stringified array value for easy consumption</li>
  <li><code>reset()</code> to clear all selections</li>
</ul>

<auro-header level="2" id="responsiveLayout">Responsive layout</auro-header>

<p>Native <code>&lt;select&gt;</code> renders a browser-controlled popup that can't be repositioned, resized, or presented differently on mobile.</p>

<p><code>auro-select</code> adapts to the viewport:</p>

<ul>
  <li><strong>Desktop:</strong> Options appear in a positioned dropdown using Floating UI, with configurable placement, offset, and flip behavior, plus shift in the emphasized layout</li>
  <li><strong>Mobile:</strong> Options open in a fullscreen dialog at or below a configurable breakpoint (<code>fullscreenBreakpoint</code>)</li>
  <li><strong>Width control:</strong> In the classic layout, the dropdown matches the trigger's width unless <code>flexMenuWidth</code> lets it size to its options; in other layouts, <code>matchWidth</code> sizes it to the trigger</li>
</ul>

<auro-header level="2" id="validation">Validation</auro-header>

<p>Native <code>&lt;select&gt;</code> validation is limited to <code>required</code>. Error messages are browser-controlled.</p>

<p><code>auro-select</code> integrates with the Auro form validation system:</p>

<ul>
  <li>Required field validation with custom messaging</li>
  <li>Custom error messages per validity state (<code>setCustomValidityCustomError</code>, <code>setCustomValidityValueMissing</code>)</li>
  <li><code>noValidate</code> to disable auto-validation on blur</li>
  <li>Error messages shown in place of the <code>helpText</code> slot content</li>
  <li>Dispatches <code>auroFormElement-validated</code> events for parent form coordination</li>
</ul>

<auro-header level="2" id="displayValueCustomization">Display value customization</auro-header>

<p>Native <code>&lt;select&gt;</code> always shows the selected option's text and can't display a formatted or alternative representation.</p>

<p><code>auro-select</code> provides:</p>

<ul>
  <li>A <code>displayValue</code> slot for custom HTML rendering of the selected value</li>
  <li>A <code>placeholder</code> attribute for empty-state text</li>
  <li><code>forceDisplayValue</code> to keep showing the <code>displayValue</code> content while the bib is open</li>
</ul>

<auro-header level="2" id="designSystemIntegration">Design system integration</auro-header>

<p>Native <code>&lt;select&gt;</code> styling is notoriously difficult. The dropdown arrow, option list, and selected value display are all browser-controlled and resist CSS customization.</p>

<p><code>auro-select</code> is built with the Auro Design System:</p>

<ul>
  <li>Three layout options: <code>classic</code>, <code>emphasized</code>, and <code>snowflake</code></li>
  <li>Shape variants: <code>classic</code>, <code>pill</code>, <code>pill-left</code>, <code>pill-right</code>, and <code>snowflake</code></li>
  <li>Size options: <code>lg</code>, and <code>xl</code> for the emphasized layout</li>
  <li>Light and dark theme support (<code>appearance</code>)</li>
  <li>CSS <code>::part()</code> selectors, such as <code>dropdownChevron</code>, <code>dropdownSize</code>, <code>helpText</code>, and <code>displayValue</code></li>
</ul>

<auro-header level="2" id="summary">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Capability</th>
      <th><code>&lt;select&gt;</code></th>
      <th><code>auro-select</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Styleable dropdown</td>
      <td>No (browser-controlled)</td>
      <td>Fully styled</td>
    </tr>
    <tr>
      <td>Rich HTML in options</td>
      <td>Plain text only</td>
      <td>Full HTML (icons, groups, descriptions)</td>
    </tr>
    <tr>
      <td>Multi-select UX</td>
      <td>Ctrl+click list box</td>
      <td>Checkmark dropdown</td>
    </tr>
    <tr>
      <td>Keyboard navigation</td>
      <td>Basic</td>
      <td>Full (arrows, Alt+arrows, Home/End)</td>
    </tr>
    <tr>
      <td>Screen reader announcements</td>
      <td>Varies by browser</td>
      <td>Consistent ARIA live regions</td>
    </tr>
    <tr>
      <td>Mobile fullscreen</td>
      <td>No</td>
      <td>Automatic at breakpoint</td>
    </tr>
    <tr>
      <td>Viewport-aware positioning</td>
      <td>No</td>
      <td>Floating UI with flip</td>
    </tr>
    <tr>
      <td>Custom validation messages</td>
      <td>Browser-controlled</td>
      <td>Per-constraint custom messages</td>
    </tr>
    <tr>
      <td>Display value customization</td>
      <td>No</td>
      <td><code>displayValue</code> slot</td>
    </tr>
    <tr>
      <td>Theming</td>
      <td>No</td>
      <td>Three layouts + appearance modes</td>
    </tr>
  </tbody>
</table>
