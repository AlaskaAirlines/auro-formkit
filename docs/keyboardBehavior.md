<h1 data-heading="Keyboard Behavior Reference">Keyboard Behavior Reference</h1>
<p>Defines every keyboard interaction for <strong>dropdown</strong>, <strong>select</strong>, <strong>combobox</strong>, <strong>datepicker</strong>, and <strong>counter-group</strong> (in dropdown mode) across desktop and fullscreen (mobile) modes.</p>
<p>For implementation details, strategy architecture, and WAI-ARIA rationale, see <a href="./keyboard-spec.md" data-href="./keyboard-spec.md" class="internal-link">keyboard-spec.md</a>.</p>
<hr>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../components/dropdown/docs/keyboardBehavior.md) -->
<!-- The below content is automatically added from ./../components/dropdown/docs/keyboardBehavior.md -->

## Auro-Dropdown Keyboard Behavior

### Tabindex Behavior

The default auro-dropdown trigger is a focusable element and participates in the standard tab order, responding to `Tab` and `Shift+Tab` key events per native browser behavior.

When the bib is collapsed, its content is excluded from the tab sequence. When expanded, tabbable elements within the bib are included in the natural tab order. In fullscreen mode, focus is trapped within the bib, and the tab sequence cycles through its focusable elements until the bib is closed or the viewport no longer meets the fullscreen condition.

### Key Events
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current State</th>
      <th>Focus Element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <!-- <tr>
      <td>Arrow Down</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Arrow Left</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Arrow Right</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>Arrow Up</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Opens the bib.</td>
    </tr> -->
    <tr>
      <td rowspan="2">Enter</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger</td>
      <td>Closes the bib.</td>
    </tr>
    <tr>
      <td>Escape</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger or bib content</td>
      <td>Closes the bib.</td>
    </tr>
    <tr>
      <td rowspan="2">Space</td>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Opens the bib.</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger</td>
      <td>Closes the bib.</td>
    </tr>
    <!-- <tr>
      <td rowspan="4">Tab</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Trigger</td>
      <td>Moves focus to the next focusable element including bib content.</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Moves focus to the next focusable element excluding bib content.</td>
    </tr>
    <tr>
      <td>Shift</td>
      <td>Expanded</td>
      <td>Trigger</td>
      <td>Moves focus to the previous focusable element including bib content.</td>
    </tr>
    <tr>
      <td>Shift</td>
      <td>Collapsed</td>
      <td>Trigger</td>
      <td>Moves focus to the previous focusable element excluding bib content.</td>
    </tr> -->
  </tbody>
</table>
<!-- <table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Modifier</th>
      <th>Current State</th>
      <th>Focus Element</th>
      <th>Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Tab</td>
      <td>-</td>
      <td>Expanded</td>
      <td>Bib content</td>
      <td>Moves focus to the next focusable element in the bib content.</td>
    </tr>
    <tr>
      <td>Shift</td>
      <td>Expanded</td>
      <td>Bib content</td>
      <td>Moves focus to the previous focusable element in the bib content.</td>
    </tr>
  </tbody>
</table> -->

## CODE ACTION ITEMS / TODO ITEMS
1. Remove the bridge for keyboard event bubbling out of the bib
1. Strip out event listers not listed in this document (e.g. arrow keys)
1. do not prevent any event bubbling beyond the focus trap of a fullscreen bib
<!-- AURO-GENERATED-CONTENT:END -->
<hr>
<h2 data-heading="7 — Dialog Keyboard Bridge (fullscreen)">7 — Dialog Keyboard Bridge (fullscreen)</h2>
<p>In fullscreen mode, the popup content lives inside a native <code>&#x3C;dialog></code> opened via <code>showModal()</code>. This creates an isolated focus scope — keyboard events inside the dialog do not naturally reach the parent component.</p>
<p>To bridge this, the following keys pressed inside the dialog are intercepted and re-dispatched to the parent component: <strong>Arrow Up</strong>, <strong>Arrow Down</strong>, <strong>Enter</strong>, <strong>Escape</strong>, and <strong>Tab</strong>. Modifier keys (Shift, Alt, Ctrl, Meta) are preserved.</p>
<p>Special cases:</p>
<ul>
<li><strong>Enter on a button</strong> (e.g., the close button): activates the button directly instead of re-dispatching.</li>
<li><strong>Escape</strong>: the native <code>&#x3C;dialog></code> also fires a <code>cancel</code> event, which is separately handled to close the dropdown.</li>
<li><strong>Tab</strong>: native dialog Tab-trapping is overridden so Tab reaches the parent component's close/select logic instead.</li>
</ul>
<p>All other keys (letter keys, numbers, etc.) pass through to native handling without interception.</p># Keyboard Behavior Reference

Defines every keyboard interaction for **dropdown**, **select**, **combobox**, **datepicker**, and **counter-group** (in dropdown mode) across desktop and fullscreen (mobile) modes.

For implementation details, strategy architecture, and WAI-ARIA rationale, see [[keyboard-spec.md](https://github.com/AlaskaAirlines/auro-formkit/discussions/keyboard-spec.md)](./keyboard-spec.md).

---

## 1 — Shared: Dropdown Trigger (all components, popup closed)

These keys apply to all five components when the trigger is focused and the popup is **not** open.

| Key             | Behavior                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| **Enter**       | Opens the popup.                                                                                            |
| **Space**       | Opens the popup.                                                                                            |
| **Arrow Down**  | Opens the popup.                                                                                            |
| **Arrow Up**    | Opens the popup.                                                                                            |
| **Tab**         | Moves focus to the next focusable element on the page (standard browser behavior). Does not open the popup. |
| **Shift + Tab** | Moves focus to the previous focusable element. Does not open the popup.                                     |

> **Note:** Enter and Space on the trigger act as a toggle — if the popup is already open, they close it (unless `noToggle` is set).

### Shared Menu Behavior (select and combobox)

This behavior only applies to when the popup is open.

| Key                       | Behavior                                                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Shift + Tab**           | Resets the active (highlighted) option to the first non-disabled option in the list.                                                     |
| Arrow Up                  | Navigates to the next non-disabled option in the list. If on the first option jump to the last non-disabled option in the list.          |
| Arrow Down                | Navigates to the previous non-disabled option in the list. If on the last option then jump to the first non-disabled option in the list. |
| Option/Command Arrow Up   | Jump to first non-disabled option in the list.                                                                                           |
| Option/Command Arrow Down | Jump to last non-disabled option in the list.                                                                                            |
| Home                      | Jump to first non-disabled option in the list.                                                                                           |
| End                       | Jump to last non-disabled option in the list.                                                                                            |

---

## 2 — Select

### Desktop — Popup Open

| Key            | Condition             | Behavior                                                                                                                                                    |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enter**      | —                     | Selects the highlighted option. Closes the popup. Focus returns to the trigger.                                                                             |
| **Space**      | —                     | Selects the highlighted option. Closes the popup. Focus returns to the trigger.                                                                             |
| **Escape**     | —                     | Closes the popup without selecting. Focus returns to the trigger.                                                                                           |
| **Tab**        | Option highlighted    | Selects the highlighted option. Closes the popup. Focus moves to the next focusable element.                                                                |
| **Tab**        | No option highlighted | Closes the popup without selecting. Focus moves to the next focusable element. (I believe this state won't exist since an option will always be highlighted) |
| **Home**       | —                     | Moves visual focus to the first non-disabled option.                                                                                                        |
| **End**        | —                     | Moves visual focus to the last non-disabled option.                                                                                                         |
| **Letter key** | —                     | Type-ahead: moves visual focus to the next option starting with the typed character. Pressing the same letter cycles through matches.                       |

### Fullscreen — Dialog Open

| Key            | Condition             | Behavior                                                                                                                                        |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enter**      | Option highlighted    | Selects the highlighted option. Closes the dialog. Focus returns to the trigger.                                                                |
| **Enter**      | Focus on close button | Activates the close button. Closes the dialog. Focus returns to the trigger.                                                                    |
| **Escape**     | —                     | Closes the dialog without selecting. Focus returns to the trigger.                                                                              |
| **Tab**        | Option highlighted    | Selects the highlighted option. Closes the dialog. Focus returns to the trigger.                                                                |
| **Tab**        | No option highlighted | Closes the dialog without selecting. Focus returns to the trigger. (I believe this state won't exist since an option will always be highlighted) |

---

## 3 — Combobox

The combobox trigger contains a text input, so keyboard behavior differs from select — typing opens a suggestion option list rather than performing type-ahead.

When the popup opens, if no option is already active, the first matching option automatically becomes the active (highlighted) option.

### Popup Open

| Key                               | Condition             | Behavior                                                                                                                                                    |
| --------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Letter/Number** (key size of 1) | —                     | Characters are typed into the input. Options filter in real time to match.                                                                                  |
| **Arrow Down**                    | —                     | Moves visual focus to the next non-disabled matching option.                                                                                                |
| **Arrow Up**                      | —                     | Moves visual focus to the previous non-disabled matching option.                                                                                            |
| **Enter**                         | Option highlighted    | Selects the highlighted option. Closes the popup. Focus moves to the clear button.                                                                          |
| **Enter**                         | No option highlighted | Opens the popup (if closed).                                                                                                                                |
| **Escape**                        | —                     | Closes the popup without selecting. Typed text remains in the input.                                                                                        |
| **Tab**                           | Option highlighted    | Selects the highlighted option. Closes the popup. Focus moves to the clear button.                                                                          |
| **Tab**                           | No option highlighted | Closes the popup without selecting. Focus moves to the next focusable element. (I believe this state won't exist since an option will always be highlighted) |
### Popup Closed

Opens the popup if closed and matching options exist. 

| Key                               | Condition                               | Behavior                                                                                                                                                    |
| --------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Letter/Number** (key size of 1) | —                                       | Characters are typed into the input. Options filter in real time to match.                                                                                  |
| **Arrow Down**                    | —                                       | Moves visual focus to the next non-disabled matching option.                                                                                                |
| **Arrow Up**                      | —                                       | Moves visual focus to the previous non-disabled matching option.                                                                                            |
| Enter                             | Input value undefined                   | Opens the popup                                                                                                                                             |
| Enter                             | Input value is a non-zero length string | Opens the popup                                                                                                                                             |
| **Escape**                        | —                                       | Closes the popup without selecting. Typed text remains in the input.                                                                                        |
| **Tab**                           | Option highlighted                      | Selects the highlighted option. Closes the popup. Focus moves to the clear button.                                                                          |
| **Tab**                           | No option highlighted                   | Closes the popup without selecting. Focus moves to the next focusable element. (I believe this state won't exist since an option will always be highlighted) |
### Fullscreen — Dialog Is Currently Open

Focus starts in the search input inside the dialog. The dialog may also contain a clear button when the input has a value.

| Key                               | Condition                                    | Behavior                                                                                                                                                                                        |
| --------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Letter/Number** (key size of 1) | —                                            | Characters are typed into the fullscreen input. Options filter in real time.                                                                                                                    |
| **Arrow Down**                    | —                                            | Moves visual focus to the next non-disabled matching option.                                                                                                                                    |
| **Arrow Up**                      | —                                            | Moves visual focus to the previous non-disabled matching option.                                                                                                                                |
| **Enter**                         | Option highlighted                           | Selects the highlighted option. Closes the dialog. Focus returns to the trigger.                                                                                                                |
| **Enter**                         | Focus on close button                        | Activates the close button. Closes the dialog. Focus returns to the trigger.                                                                                                                    |
| **Escape**                        | —                                            | Closes the dialog without selecting. Focus returns to the trigger.                                                                                                                              |
| **Tab**                           | Focus on input, clear button visible         | Moves focus to the clear button.                                                                                                                                                                |
| **Tab**                           | Focus on clear button, option highlighted    | Selects the highlighted option. Closes the dialog. Focus returns to the trigger. (I don't believe this state will exist. if focus is on the Clear button, the dialog should already be closed. ) |
| **Tab**                           | Focus on clear button, no option highlighted | Closes the dialog without selecting. Focus returns to the trigger.                                                                                                                              |
| **Tab**                           | No clear button / empty input                | Closes the dialog. Focus returns to the trigger.  (I believe this state won't exist since an option will always be highlighted)                                                                  |

---

## 4 — Datepicker

### Desktop — Calendar Open

| Key | Behavior |
|---|---|
| **Arrow keys** | Navigate between dates in the calendar grid. |
| **Enter** | Selects the focused date. For single mode, closes the popup. For range mode, sets start date on first press and end date on second press, then closes. |
| **Escape** | Closes the calendar without selecting. Focus returns to the trigger. |
| **Tab** | Moves focus between interactive elements inside the calendar (month navigation, dates, clear button). |
| **Enter / Space** | On the clear (reset) button: clears the date input. Focus returns to the date input. |

### Fullscreen — Dialog Open

| Key | Behavior |
|---|---|
| **Arrow keys** | Navigate between dates in the calendar grid. |
| **Enter** | Selects the focused date. Same range behavior as desktop. |
| **Escape** | Closes the dialog without selecting. Focus returns to the trigger. |
| **Tab** | Closes the fullscreen dialog. Focus returns to the trigger. |
| **Enter / Space** | On the close button: closes the dialog. Focus returns to the trigger. |

---

## 5 — Counter-Group (dropdown mode)

### Desktop — Popup Open

| Key | Behavior |
|---|---|
| **Arrow Up** | Increments the focused counter by 1 (up to max). |
| **Arrow Down** | Decrements the focused counter by 1 (down to min). |
| **Tab** | Moves focus between the focusable elements within the popup. |
| **Enter / Space** | On the close button: closes the dialog. Focus returns to the trigger. |
| **Escape** | Closes the popup. Focus returns to the trigger. |
| **Home** | Sets the value of the focused counter to its max. |
| **End** | Sets the value of the focused counter to its min. |

### Fullscreen — Dialog Open

| Key | Behavior |
|---|---|
| **Arrow Up** | Increments the focused counter by 1 (up to max). |
| **Arrow Down** | Decrements the focused counter by 1 (down to min). |
| **Tab** | Closes the fullscreen dialog. Focus returns to the trigger. (This one should be "Moves focus between the focusable elements within the popup") |
| **Enter / Space** | On the close button: closes the dialog. Focus returns to the trigger. |
| **Escape** | Closes the dialog. Focus returns to the trigger. |
| **Home** | Sets the value of the focused counter to its max. |
| **End** | Sets the value of the focused counter to its min. |

---

## 6 — Initial Focus on Fullscreen Open

When a component opens in fullscreen mode, focus moves into the dialog automatically:

| Component | Focus Target | Reason |
|---|---|---|
| **Select** | Close button | No text input in the dialog. Close button is the first interactive element. |
| **Combobox** | Search input inside the dialog | User is typing a search query. Focusing the input lets them continue typing and keeps the virtual keyboard open on mobile. |
| **Datepicker** | Close button | Calendar is visual/touch-oriented. Close button is the first interactive element. |
| **Counter-Group** | Close button | Counters use +/- buttons, not text input. Close button is the first interactive element. |

---

## 7 — Dialog Keyboard Bridge (fullscreen)

In fullscreen mode, the popup content lives inside a native `<dialog>` opened via `showModal()`. This creates an isolated focus scope — keyboard events inside the dialog do not naturally reach the parent component.

To bridge this, the following keys pressed inside the dialog are intercepted and re-dispatched to the parent component: **Arrow Up**, **Arrow Down**, **Enter**, **Escape**, and **Tab**. Modifier keys (Shift, Alt, Ctrl, Meta) are preserved.

Special cases:
- **Enter on a button** (e.g., the close button): activates the button directly instead of re-dispatching.
- **Escape**: the native `<dialog>` also fires a `cancel` event, which is separately handled to close the dropdown.
- **Tab**: native dialog Tab-trapping is overridden so Tab reaches the parent component's close/select logic instead.

All other keys (letter keys, numbers, etc.) pass through to native handling without interception.