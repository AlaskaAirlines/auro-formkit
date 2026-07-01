<auro-header level="1" id="overview">Why auro-combobox?</auro-header>

<p>The native <code>&lt;input list&gt;</code> with <code>&lt;datalist&gt;</code> provides a basic autocomplete experience, but it cannot be styled, has no concept of required selection, and offers no mobile-friendly layout. <code>auro-combobox</code> is a fully featured autocomplete and selection component designed for real-world use.</p>

<auro-header level="2" id="accessibility">Accessibility</auro-header>

<p>Native <code>&lt;datalist&gt;</code> support varies between browsers. Some announce suggestion counts, others do not. Keyboard behavior is inconsistent, and there is no standard way to communicate selection state to screen readers.</p>

<p><code>auro-combobox</code> provides:</p>

<ul>
  <li><strong>ARIA combobox pattern</strong> — The input carries <code>role="combobox"</code>, <code>aria-expanded</code>, and <code>aria-controls</code> to properly describe the relationship between the input and the suggestions list.</li>
  <li><strong>Active descendant tracking</strong> — <code>aria-activedescendant</code> moves with keyboard navigation so screen readers announce the highlighted option without moving DOM focus.</li>
  <li><strong>Live region announcements</strong> — Selections are announced via <code>aria-live="polite"</code>, and validation errors use <code>aria-live="assertive"</code>.</li>
  <li><strong>Full keyboard navigation</strong> — Arrow keys navigate options, Enter selects, Escape closes, Home/End jump to boundaries. A dedicated keyboard strategy handles all interactions.</li>
</ul>

<auro-header level="2" id="dualBehaviorModes">Dual behavior modes</auro-header>

<p>Native <code>&lt;datalist&gt;</code> always allows freeform input. There is no way to restrict the user to only the provided options.</p>

<p><code>auro-combobox</code> supports two modes:</p>

<ul>
  <li><strong>Suggestion mode</strong> (default) — The user can type any value. Suggestions are offered but not required.</li>
  <li><strong>Filter mode</strong> — Typing filters the list and sets the component's <code>value</code> to the typed text, but validation keeps the input invalid until a menu option is selected. Consumers relying on <code>value</code> as a "committed selection" should gate on <code>validity</code>.</li>
</ul>

<auro-header level="2" id="realtimeFiltering">Real-time filtering</auro-header>

<p><code>&lt;datalist&gt;</code> filtering is browser-controlled and cannot be customized. Some browsers match from the start of the option text, others match anywhere.</p>

<p><code>auro-combobox</code> filters options as the user types, with full control:</p>

<ul>
  <li><code>noFilter</code> disables filtering to show all options regardless of input</li>
  <li><code>matchWord</code> highlights the matched portion of each option</li>
  <li><code>persistInput</code> keeps the filter text visible after selection</li>
</ul>

<auro-header level="2" id="responsiveLayout">Responsive layout</auro-header>

<p>Native <code>&lt;datalist&gt;</code> renders a small browser-controlled popup that cannot be repositioned or resized.</p>

<p><code>auro-combobox</code> adapts to the viewport:</p>

<ul>
  <li><strong>Desktop</strong> — Suggestions appear as a positioned dropdown using Floating UI, with configurable placement, offset, flip, and shift behavior</li>
  <li><strong>Mobile</strong> — Suggestions open in a fullscreen dialog via <code>showModal()</code>, with a configurable breakpoint (<code>fullscreenBreakpoint</code>)</li>
  <li><strong>Width matching</strong> — The dropdown can match the input width or size independently</li>
</ul>

<auro-header level="2" id="validation">Validation</auro-header>

<p>Native <code>&lt;datalist&gt;</code> has no built-in validation beyond standard <code>required</code>.</p>

<p><code>auro-combobox</code> integrates with the Auro form validation system:</p>

<ul>
  <li>Required field validation with mode-aware messaging (separate messages for suggestion vs. filter mode)</li>
  <li>Custom error messages per validity state (<code>setCustomValidityCustomError</code>, <code>setCustomValidityValueMissing</code>, <code>setCustomValidityValueMissingFilter</code>)</li>
  <li>Validation on blur with <code>noValidate</code> opt-out</li>
  <li>Error display via help text with <code>role="alert"</code></li>
</ul>

<auro-header level="2" id="inputMasking">Input masking</auro-header>

<p><code>&lt;datalist&gt;</code> inputs have no formatting support.</p>

<p><code>auro-combobox</code> supports input masks via the <code>format</code> attribute, enabling structured input (e.g., dates, phone numbers) while still offering suggestions.</p>

<auro-header level="2" id="designSystemIntegration">Design system integration</auro-header>

<p><code>&lt;datalist&gt;</code> styling is entirely browser-controlled. The popup cannot be themed, and option rendering is limited to plain text.</p>

<p><code>auro-combobox</code> is built with the Auro Design System:</p>

<ul>
  <li>Three layout options: classic, emphasized, and snowflake</li>
  <li>Light and dark theme support (<code>appearance</code>)</li>
  <li>Checkmarks on selected options</li>
  <li>Rich HTML content in options (icons, descriptions, nested structure)</li>
  <li>CSS <code>::part()</code> selectors for styling</li>
</ul>

<auro-header level="2" id="summary">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Capability</th>
      <th><code>&lt;input list&gt;</code> + <code>&lt;datalist&gt;</code></th>
      <th><code>auro-combobox</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Restrict to options only</td>
      <td>No</td>
      <td>Yes (filter mode)</td>
    </tr>
    <tr>
      <td>Real-time filtering control</td>
      <td>Browser-controlled</td>
      <td>Fully configurable</td>
    </tr>
    <tr>
      <td>Keyboard navigation</td>
      <td>Inconsistent</td>
      <td>Full arrow/Enter/Escape/Home/End</td>
    </tr>
    <tr>
      <td>Screen reader announcements</td>
      <td>Inconsistent</td>
      <td>Live regions and active descendant</td>
    </tr>
    <tr>
      <td>Mobile fullscreen</td>
      <td>No</td>
      <td>Automatic at breakpoint</td>
    </tr>
    <tr>
      <td>Input masking</td>
      <td>No</td>
      <td>Yes (format attribute)</td>
    </tr>
    <tr>
      <td>Custom validation messages</td>
      <td>No</td>
      <td>Per-constraint messages</td>
    </tr>
    <tr>
      <td>Rich option content</td>
      <td>Plain text only</td>
      <td>Full HTML</td>
    </tr>
    <tr>
      <td>Theming</td>
      <td>No</td>
      <td>Three layouts + appearance modes</td>
    </tr>
  </tbody>
</table>
