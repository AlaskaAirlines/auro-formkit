<auro-header level="1">CSS only with native disclosure</auro-header>
<p>When you can't use the <code>&lt;auro-dropdown&gt;</code> web component, style a native HTML <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> element with Auro Design System tokens to approximate its look. <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> doesn't provide a prebuilt <code>.dropdown</code> class, as it does for <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, so write the styles yourself with Auro design tokens.</p>
<auro-header level="2">Styling a native disclosure</auro-header>
<p>Reset and restyle the native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> pair with the Auro design tokens published by <auro-hyperlink href="https://www.npmjs.com/package/@aurodesignsystem/design-tokens" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the trigger border, spacing, and panel colors used by <code>auro-dropdown</code>.</p>
<pre><code>/* Color tokens */
@import "./node_modules/@aurodesignsystem/design-tokens/dist/themes/alaska/CSSCustomProperties--alaska.css";
/* Size, border-radius, and typography tokens */
@import "./node_modules/@aurodesignsystem/design-tokens/dist/legacy/auro-classic/CSSCustomProperties.css";
&#10;.dropdown {
  position: relative;
  display: inline-block;
}
&#10;.dropdown &gt; summary {
  list-style: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--ds-size-100, 0.5rem);
  padding: var(--ds-size-100, 0.5rem) var(--ds-size-150, 0.75rem);
  border: 1px solid var(--ds-basic-color-border-bold, #585e67);
  border-radius: var(--ds-border-radius, 4px);
  background-color: var(--ds-basic-color-surface-default, #ffffff);
  color: var(--ds-basic-color-texticon-default, #2a2a2a);
  font-family: var(--ds-font-family-default, sans-serif);
}
&#10;.dropdown &gt; summary::-webkit-details-marker {
  display: none;
}
&#10;.dropdown &gt; summary::after {
  content: "";
  width: var(--ds-size-150, 0.75rem);
  height: var(--ds-size-150, 0.75rem);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231d1d1d' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  transition: transform 150ms ease;
}
&#10;.dropdown[open] &gt; summary::after {
  transform: rotate(180deg);
}
&#10;.dropdown &gt; summary:focus-visible {
  outline: 2px solid var(--ds-basic-color-border-brand, #00274a);
  outline-offset: 2px;
}
&#10;.dropdown-bib {
  position: absolute;
  top: calc(100% + var(--ds-size-50, 0.25rem));
  left: 0;
  z-index: 1;
  min-width: 100%;
  padding: var(--ds-size-100, 0.5rem);
  border: 1px solid var(--ds-basic-color-border-bold, #585e67);
  border-radius: var(--ds-border-radius, 4px);
  background-color: var(--ds-basic-color-surface-default, #ffffff);
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
<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-dropdown</code>, the following functionality built into the <code>auro-dropdown</code> web component <strong>isn't available</strong> when you use plain HTML:</p>
<auro-header level="3">Floating UI positioning</auro-header>
<p><code>auro-dropdown</code> uses Floating UI to position the bib relative to the trigger and supports a <code>placement</code> attribute with twelve values (<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, and their <code>-start</code>/<code>-end</code> variants). A native <code>&lt;details&gt;</code> panel is absolutely positioned by the author and doesn't adapt to alternate placements without additional CSS for each case.</p>
<auro-header level="3">Flip to stay on-screen</auro-header>
<p><code>auro-dropdown</code> flips the bib to the opposite side of the trigger when it would otherwise be clipped by the viewport. Set <code>noFlip</code> to keep the bib at its <code>placement</code>. A CSS-only panel stays where it's authored and overflows the viewport when there isn't enough room.</p>
<auro-header level="3">Shift to stay on-screen</auro-header>
<p><code>auro-dropdown</code> supports a <code>shift</code> attribute that nudges the bib along its axis so it remains fully visible inside the viewport. Native disclosures have no equivalent: a panel positioned with CSS that runs past the viewport edge is simply clipped or causes horizontal scroll.</p>
<auro-header level="3">Match-width and offset control</auro-header>
<p><code>auro-dropdown</code> exposes <code>matchWidth</code> to size the bib to the trigger and a numeric <code>offset</code> for the gap between trigger and bib. With native HTML, both must be implemented manually with CSS and, in the case of dynamic trigger widths, JavaScript measurement.</p>
<auro-header level="3">Mobile fullscreen behavior</auro-header>
<p><code>auro-dropdown</code> supports a <code>fullscreenBreakpoint</code>, such as <code>sm</code>, that switches the bib into a fullscreen presentation at or below that screen width, and a <code>desktopModal</code> option for modal behavior on larger viewports. Native <code>&lt;details&gt;</code> has no responsive presentation: the panel renders the same way on every screen size.</p>
<auro-header level="3">Hover trigger</auro-header>
<p><code>auro-dropdown</code> supports a <code>hoverToggle</code> property that opens the bib on mouseover and closes it on mouseout. It doesn't currently work as an HTML attribute, so set it in JavaScript after the dropdown renders. Native <code>&lt;details&gt;</code> only responds to click on the <code>&lt;summary&gt;</code>; hover-to-open requires custom JavaScript.</p>
<auro-header level="3">Focus management</auro-header>
<p><code>auro-dropdown</code> provides a <code>focus()</code> method that moves focus to the first focusable element inside the bib when it's open, or to the trigger when it's closed. It also supports <code>focusShow</code> to open the bib on trigger focus. Native <code>&lt;details&gt;</code> leaves focus on the <code>&lt;summary&gt;</code> after toggle and offers no built-in focus-into-panel behavior.</p>
<auro-header level="3">Click-outside and focus-loss dismissal</auro-header>
<p><code>auro-dropdown</code> closes the bib when people click outside the component or move focus out of it. Set <code>noHideOnThisFocusLoss</code> to keep it open when focus moves out. Native <code>&lt;details&gt;</code> stays open until the <code>&lt;summary&gt;</code> is clicked again, so click-outside and focus-out dismissal must be wired up manually.</p>
<auro-header level="3">Keyboard handling</auro-header>
<p><code>auro-dropdown</code> opens and closes the bib with <code>Enter</code> and <code>Space</code> on the trigger, closes it with <code>Escape</code>, and coordinates <code>Tab</code> behavior with the bib contents. Set <code>disableKeyboardHandling</code> to handle the trigger keys yourself. Native <code>&lt;details&gt;</code> only toggles on <code>Enter</code>/<code>Space</code> on the <code>&lt;summary&gt;</code> and offers no panel-internal keyboard model.</p>
<auro-header level="3">ARIA wiring</auro-header>
<p><code>auro-dropdown</code> sets a role on the trigger with <code>a11yRole</code>, manages <code>aria-expanded</code> and <code>aria-controls</code> for roles other than the default <code>button</code>, such as <code>combobox</code>, and emits an <code>auroDropdown-idAdded</code> event so you can wire <code>aria-controls</code> to the generated bib ID. Native <code>&lt;details&gt;</code> exposes a disclosure role with <code>open</code> state but doesn't expose a generated panel ID, and any custom role (for example, <code>combobox</code> or <code>menu</code>) must be added and kept in sync by hand.</p>
<auro-header level="3">Chevron indicator</auro-header>
<p><code>auro-dropdown</code> supports a <code>chevron</code> attribute that renders a collapsed/expanded indicator with the correct rotation and design-token color. With native HTML you must author the indicator yourself: the example above uses a background-image SVG and a <code>[open]</code> selector to rotate it.</p>
<auro-header level="3">Error and help-text presentation</auro-header>
<p><code>auro-dropdown</code> exposes <code>error</code>, which shows the trigger in an error style, and a <code>helpText</code> slot that renders supporting text below the trigger. Native <code>&lt;details&gt;</code> has no concept of error state or help text, so both must be authored and toggled manually.</p>
<auro-header level="3">Imperative show/hide and toggle events</auro-header>
<p><code>auro-dropdown</code> exposes <code>show()</code> and <code>hide()</code> methods, a <code>disableEventShow</code> option to lock it to programmatic control, and emits <code>auroDropdown-toggled</code> and <code>auroDropdown-triggerClick</code> events. Native <code>&lt;details&gt;</code> emits a single <code>toggle</code> event and is toggled by user interaction with the <code>&lt;summary&gt;</code>; coordinated open/close logic across components must be written by hand.</p>
<auro-header level="3">Multi-brand theming</auro-header>
<p>Both <code>auro-dropdown</code> and the CSS above read Auro design tokens through CSS custom properties, so both follow the brand theme whose token file you load. The difference is upkeep: the component's styles update with the package, while you maintain the CSS-only styles yourself.</p>
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
<td>Flip</td>
<td>Not supported</td>
<td>Automatic; disable with <code>noFlip</code></td>
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
<td>Automatic; <code>focus()</code> also moves focus into an open bib</td>
</tr>
<tr>
<td>Click-outside / focus-loss dismiss</td>
<td>Manual JS</td>
<td>Built-in; <code>noHideOnThisFocusLoss</code> keeps it open on focus loss</td>
</tr>
<tr>
<td>Keyboard model</td>
<td><code>Enter</code>/<code>Space</code> on summary only</td>
<td><code>Enter</code> / <code>Space</code> / <code>Escape</code> / <code>Tab</code></td>
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
<td><code>error</code>, <code>helpText</code> slot</td>
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
<td>Follows the loaded tokens; you maintain the CSS</td>
<td>Follows the loaded tokens; styles maintained in the component</td>
</tr>
</tbody>
</table>
<auro-header level="2">Recommendation</auro-header>
<p>Use <code>auro-dropdown</code> whenever possible. Fall back to a CSS-styled native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> only in environments that don't support custom elements or when integrating with third-party systems that require plain HTML, and be prepared to reimplement positioning, focus management, click-outside dismissal, keyboard behavior, and responsive presentation yourself.</p>
