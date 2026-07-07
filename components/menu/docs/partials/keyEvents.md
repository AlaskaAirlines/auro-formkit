<div class="note">
  <p><strong>Note:</strong> <code>&lt;auro-menu&gt;</code> registers a <code>keydown</code> listener on its host. By default the menu is not focusable — no <code>tabindex</code> on the host, and menuoptions are <code>tabindex="-1"</code> — so the listener does not fire on its own. It fires whenever a <code>keydown</code> reaches the host, which happens in any of the following ways:</p>
  <ul>
    <li>A wrapping component focuses something inside the menu subtree and the event bubbles up to the host. In the standard integrations (<code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>), keyboard behavior is primarily parent-managed rather than bubble-driven: focus stays on the parent's trigger/input, and the parent captures keys there and drives the menu directly via its public <code>navigateOptions()</code> / <code>updateActiveOption()</code> methods and the menu's internal <code>makeSelection()</code> routine (<code>@private</code>, not part of the public menu API).</li>
    <li>A wrapping component dispatches or reroutes a <code>KeyboardEvent</code> at the menu programmatically (for example, <code>menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))</code>).</li>
    <li>The author makes the host focusable (for example, by adding <code>tabindex="0"</code> to the <code>&lt;auro-menu&gt;</code> element) and focuses it. The host already has <code>role="listbox"</code>, so this yields a bare, focusable listbox that responds to the keys in the table below. For full combobox semantics use <code>&lt;auro-select&gt;</code> or <code>&lt;auro-combobox&gt;</code>, or replicate their <code>aria-activedescendant</code> wiring from a separate trigger.</li>
  </ul>
  <p>Keys not listed below (<code>Home</code>, <code>End</code>, <code>Escape</code>, type-ahead) are handled by the parent — see the <code>&lt;auro-select&gt;</code> and <code>&lt;auro-combobox&gt;</code> keyboard behavior docs. An "interactive option" is one that is not <code>disabled</code>, <code>hidden</code>, or <code>static</code> — these are always skipped during navigation and selection, along with <code>&lt;hr&gt;</code> dividers.</p>
</div>

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Current State</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="5">ArrowDown</td>
      <td>No option is active</td>
      <td>The first interactive option becomes active.</td>
    </tr>
    <tr>
      <td>An option is active, followed by interactive options</td>
      <td>Advances the active option to the next interactive option.</td>
    </tr>
    <tr>
      <td>The last interactive option is active</td>
      <td>Wraps to the first interactive option.</td>
    </tr>
    <tr>
      <td>Menu has no options or all options are non-interactive</td>
      <td>No option becomes active; no <code>auroMenu-activatedOption</code> event fires.</td>
    </tr>
    <tr>
      <td>Menu is in <code>loading</code> state</td>
      <td>The rendered loading placeholder is inert (marked <code>disabled</code>) and is not part of <code>items</code>, so it cannot become active.</td>
    </tr>
    <tr>
      <td rowspan="4">ArrowUp</td>
      <td>No option is active</td>
      <td>The last interactive option becomes active.</td>
    </tr>
    <tr>
      <td>An option is active, preceded by interactive options</td>
      <td>Advances the active option to the previous interactive option.</td>
    </tr>
    <tr>
      <td>The first interactive option is active</td>
      <td>Wraps to the last interactive option.</td>
    </tr>
    <tr>
      <td>Menu has no options or all options are non-interactive</td>
      <td>No option becomes active.</td>
    </tr>
    <tr>
      <td rowspan="4">Enter</td>
      <td>Single-select, active option is not currently selected</td>
      <td>The active option is selected. Any previous selection is cleared. <code>auroMenu-selectedOption</code> fires.</td>
    </tr>
    <tr>
      <td>Single-select, active option is already selected</td>
      <td>No selection change, but <code>auroMenu-selectedOption</code> still fires so the parent can react (for example, close the dropdown).</td>
    </tr>
    <tr>
      <td>Multi-select</td>
      <td>The active option toggles selected. Other selections are preserved.</td>
    </tr>
    <tr>
      <td>Active option is disabled, hidden, or static</td>
      <td>Selection is a no-op.</td>
    </tr>
    <tr>
      <td rowspan="2">Tab</td>
      <td>An option is active</td>
      <td>The active option is selected (same behavior as <code>Enter</code>).<div class="note"><strong>Note:</strong> <code>Tab</code> does not <code>preventDefault</code>, so focus continues to the next element in the tabindex sequence after selection.</div></td>
    </tr>
    <tr>
      <td>No option is active</td>
      <td>Focus moves to the next tabbable element; no selection change.</td>
    </tr>
  </tbody>
</table>
