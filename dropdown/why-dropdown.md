<auro-header level="1" id="overview">Why auro-dropdown?</auro-header>
<p>Native HTML has no dedicated dropdown/popover primitive that combines trigger management, content positioning, focus trapping, and responsive behavior. Building a dropdown from <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> or custom <code>&lt;div&gt;</code> toggles requires significant work for accessibility and positioning. <code>auro-dropdown</code> provides a production-ready solution.</p>
<auro-header level="2" id="accessibility">Accessibility</auro-header>
<p>Custom dropdown implementations often break keyboard navigation, fail to trap focus, or leave background content interactive when the dropdown is open.</p>
<p><code>auro-dropdown</code> provides:</p>
<ul>
<li><strong>Focus trapping:</strong> In desktop modal mode, Tab and Shift+Tab cycle within the dropdown content. The rest of the page becomes inert. The implementation handles focus across shadow DOM boundaries.</li>
<li><strong>Native dialog semantics:</strong> On screens at or below the <code>fullscreenBreakpoint</code> you set, the dropdown opens via <code>showModal()</code>, which provides browser-native focus trapping and background inert behavior.</li>
<li><strong>ARIA attributes:</strong> The trigger has a configurable <code>role</code> (default: <code>button</code>), and with other roles, such as <code>combobox</code>, it also carries <code>aria-expanded</code> and <code>aria-controls</code>. Components that wrap the dropdown, such as <code>auro-select</code>, <code>auro-combobox</code>, and <code>auro-datepicker</code>, give the bib's dialog an accessible name from their own label.</li>
<li><strong>Focus routing:</strong> The <code>focus()</code> method moves focus to the first focusable element in the open bib, or to the trigger when the bib is closed.</li>
<li><strong>Escape to close:</strong> Pressing <code>Escape</code> closes the open bib.</li>
</ul>
<auro-header level="2" id="positioning">Positioning</auro-header>
<p>Positioning a dropdown relative to its trigger, while accounting for viewport edges, scroll containers, and dynamic content, is a complex problem that native HTML doesn't solve.</p>
<p><code>auro-dropdown</code> integrates Floating UI with:</p>
<ul>
<li>Configurable <code>placement</code> (12 positions: top/bottom/left/right with start/center/end)</li>
<li><code>offset</code> control for gap between trigger and content</li>
<li><code>noFlip</code> to prevent automatic repositioning</li>
<li><code>shift</code> to slide the dropdown along the edge to avoid clipping</li>
<li><code>matchWidth</code> to size the dropdown to the trigger width</li>
<li>Layout containment escape so the dropdown isn't clipped by ancestor <code>overflow</code> or <code>&lt;dialog&gt;</code> elements</li>
</ul>
<auro-header level="2" id="responsiveBehavior">Responsive behavior</auro-header>
<p>Native disclosure elements have no concept of viewport-aware presentation.</p>
<p><code>auro-dropdown</code> adapts to the viewport:</p>
<ul>
<li><strong>Desktop:</strong> Content appears as a positioned panel with optional modal behavior.</li>
<li><strong>Mobile:</strong> Content opens as a fullscreen dialog at or below the breakpoint you set with <code>fullscreenBreakpoint</code> (<code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, or <code>xl</code>). It doesn't go fullscreen when <code>fullscreenBreakpoint</code> isn't set or is <code>disabled</code>.</li>
<li><strong>Desktop modal:</strong> <code>desktopModal</code> makes background siblings inert, traps focus within the dropdown, and prevents interaction with page content, all without going fullscreen.</li>
</ul>
<auro-header level="2" id="contentagnostic">Content-agnostic</auro-header>
<p>Unlike <code>&lt;select&gt;</code>, which only accepts <code>&lt;option&gt;</code> elements, <code>auro-dropdown</code> accepts any HTML content in its default slot. This makes it the foundation for composed components, such as <code>auro-select</code>, <code>auro-combobox</code>, and <code>auro-counter-group</code>.</p>
<auro-header level="2" id="triggerFlexibility">Trigger flexibility</auro-header>
<p>The <code>trigger</code> slot accepts any content, such as plain text, buttons, inputs, or complex custom elements. The component detects whether the trigger content is focusable and adjusts <code>tabindex</code> and ARIA attributes accordingly.</p>
<auro-header level="2" id="designSystemIntegration">Design system integration</auro-header>
<p><code>auro-dropdown</code> is built with the Auro Design System:</p>
<ul>
<li>Three layout options: <code>classic</code>, <code>emphasized</code>, and <code>snowflake</code></li>
<li>Light and dark theme support (<code>appearance</code>)</li>
<li>Chevron indicator for expand/collapse state</li>
<li>CSS <code>::part()</code> selectors (<code>wrapper</code>, <code>chevron</code>, and <code>size</code>)</li>
<li>Help text slot and an error style (<code>error</code>)</li>
</ul>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;details&gt;</code> / custom div</th>
<th><code>auro-dropdown</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Viewport-aware positioning</td>
<td>No</td>
<td>Floating UI with flip and shift</td>
</tr>
<tr>
<td>Focus trapping</td>
<td>No</td>
<td>Desktop modal + fullscreen dialog</td>
</tr>
<tr>
<td>Background inert</td>
<td>No</td>
<td>Automatic in modal modes</td>
</tr>
<tr>
<td>Keyboard close (Escape)</td>
<td>No</td>
<td>Built-in</td>
</tr>
<tr>
<td>Mobile fullscreen</td>
<td>No</td>
<td>At the <code>fullscreenBreakpoint</code> you set</td>
</tr>
<tr>
<td>Any HTML content</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Trigger detection</td>
<td>No</td>
<td>Auto-detects focusable content</td>
</tr>
<tr>
<td>Theming</td>
<td>No</td>
<td>Three layouts + appearance modes</td>
</tr>
</tbody>
</table>
