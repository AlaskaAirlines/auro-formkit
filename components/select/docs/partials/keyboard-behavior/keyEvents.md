<div class="note">
  <p><strong>Note:</strong> The "Focused element" column below indicates the initial <code>event.target</code> — the element that has DOM focus when the key is pressed. The select's keyboard strategy listener is attached once to the <code>&lt;auro-select&gt;</code> host; it receives events via composed bubbling regardless of display mode. When the bib is displayed as a fullscreen dialog (see <code>fullscreenBreakpoint</code>), focus moves to the dialog's close button rather than remaining on the trigger, but keydown events still bubble across the shadow-root boundary up to the host listener, and <code>aria-activedescendant</code> continues to track the active option. An "active option" is one that is not <code>disabled</code>, <code>hidden</code>, or <code>static</code> — these are always skipped during navigation and type-ahead matching.</p>
</div>

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current State</th>
      <th>Focused element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="8">ArrowDown</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the next active option in the list. If the current <code>active</code> option is the last active option, the active state wraps to the first active option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Meta (Command / Windows key)</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On Windows, <code>Meta</code> + arrow key combinations are reserved by the operating system for window management. Windows users should use <code>Control</code> or <code>Alt</code> instead.
        </div>
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the last active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Alt (Option)</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the last active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Control</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Meta</code> or <code>Alt</code> instead.
        </div>
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the last active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="8">ArrowUp</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the previous active option in the list. If the current <code>active</code> option is the first active option, the active state wraps to the last active option.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Meta (Command / Windows key)</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On Windows, <code>Meta</code> + arrow key combinations are reserved by the operating system for window management. Windows users should use <code>Control</code> or <code>Alt</code> instead.
        </div>
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the first active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Alt (Option)</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the first active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Control</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib.
        <div class="note">
          <strong>Note:</strong> On macOS, <code>Control</code> + arrow key combinations are reserved by the operating system for Mission Control and Application Windows. macOS users should use <code>Meta</code> or <code>Alt</code> instead.
        </div>
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the first active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">End</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib and advances the <code>active</code> option to the last active option in the list.
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the last active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="3">Enter</td>
      <td rowspan="3">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>Opens the bib. Bubbling is stopped so that a parent form does not treat Enter as a submit.</td>
    </tr>
    <tr>
      <td>Expanded, without <code>multiSelect</code></td>
      <td>Trigger element</td>
      <td>
        The current <code>active</code> option is selected, and the bib closes.
      </td>
    </tr>
    <tr>
      <td>Expanded, with <code>multiSelect</code></td>
      <td>Trigger element</td>
      <td>
        The current <code>active</code> option is toggled; the bib stays open so additional options can be selected.
      </td>
    </tr>
    <tr>
      <td rowspan="3">Escape</td>
      <td rowspan="3">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Clears the type-ahead buffer. No other change; the event is allowed to bubble so an ancestor dialog or drawer may still handle it.
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Clears the type-ahead buffer and closes the bib. Bubbling is stopped so that an ancestor dialog, drawer, or popup does not also close.
      </td>
    </tr>
    <tr>
      <td>Expanded, fullscreen bib</td>
      <td>Close button</td>
      <td>
        The Escape keydown bubbles from the close button to the select's keyboard strategy, which clears the type-ahead buffer and calls <code>dropdown.hide()</code> — the same handler as the popover case. The native <code>&lt;dialog&gt;</code> <code>cancel</code> → <code>auro-bib-cancel</code> path is a fallback that closes the bib if the strategy did not run. Focus is restored to the trigger on close.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Home</td>
      <td rowspan="2">-</td>
      <td>Collapsed</td>
      <td>Trigger element</td>
      <td>
        Opens the bib and advances the <code>active</code> option to the first active option in the list.
      </td>
    </tr>
    <tr>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Advances the <code>active</code> option to the first active option in the list.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Tab</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        The bib closes. If there is an <code>active</code> option, it is selected first in single-select, or toggled in <code>multiSelect</code>. If no option is active, focus simply moves on without a selection change.
        <div class="note">
          <strong>Note:</strong> <code>Tab</code> does not <code>preventDefault</code>, so the browser continues to move focus to the next element in the tabindex sequence after the selection is applied.
        </div>
      </td>
    </tr>
    <tr>
      <td>Shift</td>
      <td>Expanded</td>
      <td>Trigger element</td>
      <td>
        Same behavior as <code>Tab</code>: the bib closes and any <code>active</code> option is selected (single-select) or toggled (<code>multiSelect</code>). The strategy does not read <code>shiftKey</code>; only the browser's own focus traversal reverses direction, moving focus to the previous element in the tabindex sequence.
      </td>
    </tr>
    <tr>
      <td rowspan="2">Space</td>
      <td rowspan="2">-</td>
      <td>Collapsed or Expanded, type-ahead buffer active</td>
      <td>Trigger element</td>
      <td>
        Extends the type-ahead buffer with a space character. The <code>active</code> option advances if the buffer matches an active option; the bib state is unchanged. See the <a href="customize.html#typeAhead">Type-Ahead</a> section on the Customize page.
      </td>
    </tr>
    <tr>
      <td>Collapsed or Expanded, type-ahead buffer empty</td>
      <td>Trigger element</td>
      <td>
        Toggles the bib — opens it when collapsed and closes it when expanded. No selection change occurs.
      </td>
    </tr>
    <tr>
      <td>Any printable character (other than Space)</td>
      <td>-</td>
      <td>Collapsed or Expanded</td>
      <td>Trigger element</td>
      <td>
        Extends the type-ahead buffer. When the buffer matches an active option's displayed text, the <code>active</code> option advances to that option and the bib opens if it was collapsed. A keystroke that does not match any option leaves the bib state unchanged. Repeated keystrokes within <code>typeaheadTimeoutMs</code> (default 500&nbsp;ms) extend the buffer; pressing the same character repeatedly cycles through matching options. Keys chorded with <code>Ctrl</code>, <code>Meta</code>, or <code>Alt</code> are ignored so browser and OS shortcuts do not leak into the buffer. See the <a href="customize.html#typeAhead">Type-Ahead</a> section on the Customize page.
      </td>
    </tr>
  </tbody>
</table>
