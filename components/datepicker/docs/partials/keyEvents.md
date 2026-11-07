<auro-header level="3" id="keyEvents-trigger">Trigger input</auro-header>
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current state</th>
      <th>Focus element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Enter</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger input, <strong>NOT</strong> the input clear button</td>
      <td>Opens the calendar and moves focus to the calendar grid, and the <code>aria-live</code> region announces the active date. The Enter key behavior overrides the inherited <code>auro-dropdown</code> key behavior outlined below.</td>
    </tr>
    <tr>
      <td>Space</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger input, <strong>NOT</strong> the input clear button</td>
      <td>Opens the calendar and moves focus to the calendar grid, and the <code>aria-live</code> region announces the active date. The Space key behavior overrides the inherited <code>auro-dropdown</code> key behavior outlined below.</td>
    </tr>
  </tbody>
</table>
<auro-header level="3" id="keyEvents-calendar">Calendar</auro-header>
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current state</th>
      <th>Focus element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Enter</td>
      <td rowspan="3">-</td>
      <td rowspan="3">Expanded</td>
      <td>Previous month button</td>
      <td>Shows the previous month.</td>
    </tr>
    <tr>
      <td>Next month button</td>
      <td>Shows the next month.</td>
    </tr>
    <tr>
      <td>Done button</td>
      <td>Closes the calendar.</td>
    </tr>
      <tr>
      <td rowspan="3">Space</td>
      <td rowspan="3">-</td>
      <td rowspan="3">Expanded</td>
      <td>Previous month button</td>
      <td>Shows the previous month.</td>
    </tr>
    <tr>
      <td>Next month button</td>
      <td>Shows the next month.</td>
    </tr>
    <tr>
      <td>Done button</td>
      <td>Closes the calendar.</td>
    </tr>
  </tbody>
</table>
<auro-header level="3" id="keyEvents-calendarGrid">Calendar grid</auro-header>
<p>When the calendar is open, DOM focus stays on the <code>#calendarGrid</code> wrapper. The active cell is tracked with an <code>active</code> property on the cell host and an <code>.activeCell</code> class on its button; no <code>aria-activedescendant</code> or proxy element is used. Arrow keys move the active cell indicator without wrapping; when a boundary is reached the calendar navigates to the adjacent month. A debounced <code>aria-live</code> region announces the full date context after navigation pauses.</p>
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current state</th>
      <th>Focus element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ArrowRight</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Calendar grid (any date active)</td>
      <td>Moves the active indicator to the next day. If at the end of the month, navigates to the first focusable day of the next month.</td>
    </tr>
    <tr>
      <td>ArrowLeft</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Calendar grid (any date active)</td>
      <td>Moves the active indicator to the previous day. If at the start of the month, navigates to the last focusable day of the previous month.</td>
    </tr>
    <tr>
      <td>ArrowDown</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Calendar grid (any date active)</td>
      <td>Moves the active indicator to the same day of the week in the next week (+7 days). Navigates to the next month if needed.</td>
    </tr>
    <tr>
      <td>ArrowUp</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Calendar grid (any date active)</td>
      <td>Moves the active indicator to the same day of the week in the previous week (−7 days). Navigates to the previous month if needed.</td>
    </tr>
    <tr>
      <td>Enter / Space</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Calendar grid (any date active)</td>
      <td>Selects the active date. Blackout dates can be active but can't be selected.</td>
    </tr>
    <tr>
      <td>Escape</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Calendar grid (any date active)</td>
      <td>Closes the calendar and returns focus to the trigger input.</td>
    </tr>
    <tr>
      <td>Tab</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Calendar grid (any date active)</td>
      <td>Moves focus from the calendar grid to the Done button.</td>
    </tr>
  </tbody>
</table>
