<auro-header level="1">CSS only with native disclosure</auro-header>
<p>For situations where the <code>&lt;auro-dropdown&gt;</code> web component cannot be used, a native HTML <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> element can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-dropdown</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.dropdown</code> class, so the styling must be authored manually using Auro design tokens.</p>
<auro-header level="2">Styling a native disclosure</auro-header>
<p>The native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> pair can be reset and restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the trigger border, spacing, and panel colors used by <code>auro-dropdown</code>.</p>
<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";
​
.dropdown {
  position: relative;
  display: inline-block;
}
​
.dropdown &gt; summary {
  list-style: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--ds-size-100, 0.5rem);
  padding: var(--ds-size-100, 0.5rem) var(--ds-size-150, 0.75rem);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: var(--ds-border-radius, 4px);
  background-color: var(--ds-color-container-primary-default, #ffffff);
  color: var(--ds-color-text-primary-default, #1d1d1d);
  font-family: var(--ds-font-family-default, sans-serif);
}
​
.dropdown &gt; summary::-webkit-details-marker {
  display: none;
}
​
.dropdown &gt; summary::after {
  content: "";
  width: var(--ds-size-150, 0.75rem);
  height: var(--ds-size-150, 0.75rem);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231d1d1d' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  transition: transform 150ms ease;
}
​
.dropdown[open] &gt; summary::after {
  transform: rotate(180deg);
}
​
.dropdown &gt; summary:focus-visible {
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: 2px;
}
​
.dropdown-bib {
  position: absolute;
  top: calc(100% + var(--ds-size-50, 0.25rem));
  left: 0;
  z-index: 1;
  min-width: 100%;
  padding: var(--ds-size-100, 0.5rem);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: var(--ds-border-radius, 4px);
  background-color: var(--ds-color-container-primary-default, #ffffff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}</code></pre>
<auro-header level="3">Basic disclosure</auro-header>
<p>Apply the <code>.dropdown</code> class to a <code>&lt;details&gt;</code> element with a <code>&lt;summary&gt;</code> trigger and a panel container:</p>
<pre><code>&lt;details class="dropdown"&gt;
  &lt;summary&gt;More options&lt;/summary&gt;
  &lt;div class="dropdown-bib"&gt;
    &lt;p&gt;Panel content goes here.&lt;/p&gt;
  &lt;/div&gt;
&lt;/details&gt;</code></pre>
<auro-header level="3">Disclosure with a list of actions</auro-header>
<p>The panel can hold any markup. For a menu-like list, author the items as a plain unordered list:</p>
<pre><code>&lt;details class="dropdown"&gt;
  &lt;summary&gt;Account&lt;/summary&gt;
  &lt;div class="dropdown-bib"&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="/profile"&gt;Profile&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/settings"&gt;Settings&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/logout"&gt;Log out&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/details&gt;</code></pre>
<auro-header level="2">What you lose without auro-dropdown</auro-header>
<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-dropdown</code>, the following functionality built into the <code>auro-dropdown</code> web component is <strong>not available</strong> when using plain HTML:</p>
<auro-header level="3">Floating-UI positioning</auro-header>
<p><code>auro-dropdown</code> uses Floating UI to position the bib relative to the trigger and supports a <code>placement</code> attribute with twelve values (<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, and their <code>-start</code>/<code>-end</code> variants). A native <code>&lt;details&gt;</code> panel is absolutely positioned by the author and does not adapt to alternate placements without additional CSS for each case.</p>
<auro-header level="3">Auto-placement and flip</auro-header>
<p><code>auro-dropdown</code> exposes <code>autoPlacement</code> and the inverse <code>noFlip</code> option so the bib can automatically pick the side of the trigger with the most available space and flip when it would otherwise be clipped by the viewport. A CSS-only panel stays where it is authored and will overflow the viewport when there is not enough room.</p>
<auro-header level="3">Shift to stay on-screen</auro-header>
<p><code>auro-dropdown</code> supports a <code>shift</code> attribute that nudges the bib along its axis so it remains fully visible inside the viewport. Native disclosures have no equivalent — a panel positioned with CSS that runs past the viewport edge is simply clipped or causes horizontal scroll.</p>
<auro-header level="3">Match-width and offset control</auro-header>
<p><code>auro-dropdown</code> exposes <code>matchWidth</code> to size the bib to the trigger and a numeric <code>offset</code> for the gap between trigger and bib. With native HTML, both must be implemented manually with CSS and, in the case of dynamic trigger widths, JavaScript measurement.</p>
<auro-header level="3">Mobile fullscreen behavior</auro-header>
<p><code>auro-dropdown</code> supports a <code>fullscreenBreakpoint</code> (defaulting to <code>sm</code>) that switches the bib into a fullscreen presentation on small viewports, and a <code>desktopModal</code> option for modal behavior on larger viewports. Native <code>&lt;details&gt;</code> has no responsive presentation — the panel renders the same way on every screen size.</p>
<auro-header level="3">Hover trigger</auro-header>
<p><code>auro-dropdown</code> supports a <code>hoverToggle</code> attribute that opens the bib on mouseover and closes it on mouseout. Native <code>&lt;details&gt;</code> only responds to click on the <code>&lt;summary&gt;</code>; hover-to-open requires custom JavaScript.</p>
<auro-header level="3">Focus management</auro-header>
<p><code>auro-dropdown</code> provides a <code>focus()</code> method that moves focus to the first focusable element inside the bib when it is open, or to the trigger when it is closed. It also supports <code>focusShow</code> to open the bib on trigger focus. Native <code>&lt;details&gt;</code> leaves focus on the <code>&lt;summary&gt;</code> after toggle and offers no built-in focus-into-panel behavior.</p>
<auro-header level="3">Click-outside and focus-loss dismissal</auro-header>
<p><code>auro-dropdown</code> closes the bib when the user clicks outside the component or moves focus out of it, and exposes <code>noHideOnThisFocusLoss</code> to opt out. Native <code>&lt;details&gt;</code> stays open until the <code>&lt;summary&gt;</code> is clicked again — click-outside and focus-out dismissal must be wired up manually.</p>
<auro-header level="3">Keyboard handling</auro-header>
<p><code>auro-dropdown</code> includes a keyboard strategy for arrow-key navigation, <code>Escape</code> to close, and <code>Tab</code> behavior coordinated with the bib contents, and lets consumers opt out via <code>disableKeyboardHandling</code>. Native <code>&lt;details&gt;</code> only toggles on <code>Enter</code>/<code>Space</code> on the <code>&lt;summary&gt;</code> and offers no panel-internal keyboard model.</p>
<auro-header level="3">ARIA wiring</auro-header>
<p><code>auro-dropdown</code> sets an <code>a11yRole</code> on the trigger, manages <code>aria-expanded</code>, and emits an <code>auroDropdown-idAdded</code> event so consumers can wire <code>aria-controls</code> to the generated bib ID. Native <code>&lt;details&gt;</code> exposes a disclosure role with <code>open</code> state but does not expose a generated panel ID, and any custom role (for example, <code>combobox</code> or <code>menu</code>) must be added and kept in sync by hand.</p>
<auro-header level="3">Chevron indicator</auro-header>
<p><code>auro-dropdown</code> supports a <code>chevron</code> attribute that renders a collapsed/expanded indicator with the correct rotation and design-token color. With native HTML you must author the indicator yourself — the example above uses a background-image SVG and a <code>[open]</code> selector to rotate it.</p>
<auro-header level="3">Error and help-text presentation</auro-header>
<p><code>auro-dropdown</code> exposes <code>error</code>, <code>errorMessage</code>, and a <code>helpText</code> slot that renders supporting text below the trigger with the correct error styling. Native <code>&lt;details&gt;</code> has no concept of error state or help text — both must be authored and toggled manually.</p>
<auro-header level="3">Imperative show/hide and toggle events</auro-header>
<p><code>auro-dropdown</code> exposes <code>show()</code> and <code>hide()</code> methods, a <code>disableEventShow</code> option to lock it to programmatic control, and emits <code>auroDropdown-toggled</code> and <code>auroDropdown-triggerClick</code> events. Native <code>&lt;details&gt;</code> emits a single <code>toggle</code> event and is toggled by user interaction with the <code>&lt;summary&gt;</code>; coordinated open/close logic across components must be written by hand.</p>
<auro-header level="3">Multi-brand theming</auro-header>
<p><code>auro-dropdown</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only disclosure is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>
<auro-header level="2">Summary</auro-header>
<table>
<thead>
<tr>
<th>Feature</th>
<th>Native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> with Auro tokens</th>
<th><code>auro-dropdown</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Design-system-aligned styling</td>
<td>Manual (author-written CSS)</td>
<td>Built-in</td>
</tr>
<tr>
<td>Dark background support</td>
<td>Manual</td>
<td>Yes (<code>appearance="inverse"</code>)</td>
</tr>
<tr>
<td>Bib placement</td>
<td>Fixed by author CSS</td>
<td>12 <code>placement</code> values</td>
</tr>
<tr>
<td>Auto-placement and flip</td>
<td>Not supported</td>
<td><code>autoPlacement</code> / <code>noFlip</code></td>
</tr>
<tr>
<td>Shift to stay on-screen</td>
<td>Not supported</td>
<td><code>shift</code></td>
</tr>
<tr>
<td>Match trigger width</td>
<td>Manual CSS/JS</td>
<td><code>matchWidth</code></td>
</tr>
<tr>
<td>Offset / gap control</td>
<td>Manual CSS</td>
<td><code>offset</code></td>
</tr>
<tr>
<td>Mobile fullscreen</td>
<td>Not supported</td>
<td><code>fullscreenBreakpoint</code></td>
</tr>
<tr>
<td>Desktop modal</td>
<td>Not supported</td>
<td><code>desktopModal</code></td>
</tr>
<tr>
<td>Hover to open</td>
<td>Manual JS</td>
<td><code>hoverToggle</code></td>
</tr>
<tr>
<td>Focus into bib on open</td>
<td>Manual JS</td>
<td><code>focus()</code> / <code>focusShow</code></td>
</tr>
<tr>
<td>Click-outside / focus-loss dismiss</td>
<td>Manual JS</td>
<td>Built-in (with opt-out)</td>
</tr>
<tr>
<td>Keyboard model</td>
<td><code>Enter</code>/<code>Space</code> on summary only</td>
<td>Arrow / <code>Escape</code> / <code>Tab</code> strategy</td>
</tr>
<tr>
<td>ARIA wiring</td>
<td>Native disclosure role only</td>
<td><code>a11yRole</code>, <code>aria-expanded</code>, generated bib ID</td>
</tr>
<tr>
<td>Chevron indicator</td>
<td>Manual</td>
<td><code>chevron</code></td>
</tr>
<tr>
<td>Error / help text</td>
<td>Manual</td>
<td><code>error</code>, <code>errorMessage</code>, <code>helpText</code> slot</td>
</tr>
<tr>
<td>Imperative show / hide</td>
<td>Not supported</td>
<td><code>show()</code> / <code>hide()</code></td>
</tr>
<tr>
<td>Toggle events</td>
<td><code>toggle</code></td>
<td><code>auroDropdown-toggled</code>, <code>auroDropdown-triggerClick</code></td>
</tr>
<tr>
<td>Multi-brand theming</td>
<td>Static (import-time tokens)</td>
<td>Full (design tokens + component logic)</td>
</tr>
</tbody>
</table>
<auro-header level="2">Recommendation</auro-header>
<p>Use <code>auro-dropdown</code> whenever possible. Fall back to a CSS-styled native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to reimplement positioning, focus management, click-outside dismissal, keyboard behavior, and responsive presentation yourself.</p>
