<auro-header level="1" id="overview">Select - Keyboard Behavior</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <!-- <span slot="label">Anchor Navigation</span> -->
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#keyboard">Keyboard Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#tabBehavior" class="level2 body-xs">Tab Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#keyEvents" class="level2 body-xs">Key Events</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
  <div class="scrollWrapper">
    <auro-header level="2" id="tabBehavior">Tab Behavior</auro-header>
    <p>The <code>&lt;auro-select></code> component inherits the default tabindex behavior of <code>&lt;auro-dropdown></code> with no modifications.</p>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/tabindex.md) -->
    <!-- The below content is automatically added from ./../../dropdown/docs/partials/tabindex.md -->
    <p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior.</auro-hyperlink></p>
    <p> When the component is <code>disabled</code> it is removed from the tab order by the browser. VoiceOver's virtual cursor (swipe navigation) can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
    <p>When the bib is collapsed, the bib content is excluded from the tab sequence. When expanded, focusable elements within the bib content are included in the natural tab order. In fullscreen mode, focus is trapped within the bib, and the tab sequence cycles through the bib content focusable elements until the bib is closed or the viewport no longer meets the fullscreen condition.</p>
    <!-- AURO-GENERATED-CONTENT:END -->
    <p>There are no focusable elements inside the <code>&lt;auro-select></code> bib content.</p>
    <div class="stepDetails">
      <strong>Note:</strong> The following HTML5 select element keyboard behavior is unsupported in <code>&lt;auro-select multiSelect></code>:
      <ul>
        <li><strong>Extending selection (Shift+Arrow)</strong></li>
        <li><strong>Select all (Cmd+A):</strong> Select all options</li>
      </ul>
    </div>
    <auro-header level="2" id="keyEvents">Key Events</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/keyEvents.md) -->
    <!-- The below content is automatically added from ./../docs/partials/keyEvents.md -->
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
        <tr>
          <td rowspan="6">ArrowDown</td>
          <td rowspan="2">-</td>
          <td>Collapsed</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the next enabled option in the list. If the current <code>activeOption</code> is the last enabled option, selection wraps to the first enabled option.
          </td>
        </tr>
        <tr>
          <td rowspan="2">Command</td>
          <td>Collapsed</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the last enabled option in the list.
          </td>
        </tr>
        <tr>
          <td rowspan="2">Option</td>
          <td>Collapsed</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the last enabled option in the list.
          </td>
        </tr>
        <tr>
          <td rowspan="6">ArrowUp</td>
          <td rowspan="2">-</td>
          <td>Collapsed</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the previous enabled option in the list. If the current <code>activeOption</code> is the first enabled option, selection wraps to the last enabled option.
          </td>
        </tr>
        <tr>
          <td rowspan="2">Command</td>
          <td>Collapsed</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the first enabled option in the list.
          </td>
        </tr>
        <tr>
          <td rowspan="2">Option</td>
          <td>Collapsed</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the first enabled option in the list.
          </td>
        </tr>
        <tr>
          <td>End</td>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the last enabled option in the list.
          </td>
        </tr>
          <tr>
          <td>Enter</td>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            The current <code>activeOption</code> is selected.
          </td>
        </tr>
        <tr>
          <td>Home</td>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the first enabled option in the list.
          </td>
        </tr>
        <tr>
          <td>PageDown</td>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            The browser advances the <code>activeOption</code> by approximately one “page” of visible options (typically equal to the number of rendered rows). The scroll position updates in tandem so that the newly active option is brought into view, usually aligning near the bottom of the visible list.
          </td>
        </tr>
        <tr>
          <td>PageUp</td>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            The browser moves the <code>activeOption</code> up by approximately one “page” of visible items (typically equal to the number of rendered rows). The scroll position updates accordingly so the newly active option is brought into view, often aligning near the top of the visible list.
          </td>
        </tr>
        <tr>
          <td rowspan="2">Tab</td>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            The current <code>activeOption</code> is selected.
            <br />
            <i><strong>Note:</strong> the page will also navigate to the next focusable element in the tabindex order.</i>
          </td>
        </tr>
        <tr>
          <td>Shift</td>
          <td>Expanded</td>
          <td>*<sup><a href="#fn_FocusAll">1</a></sup></td>
          <td>
            Advances the <code>activeOption</code> to the first enabled option in the list.
            <br />
            <i><strong>Note:</strong> the page will <strong>NOT</strong> navigate to the previous focusable element in the tabindex order.</i>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- AURO-GENERATED-CONTENT:END -->
    <auro-header level="3" id="keyEventsDropdown">Key Events inherited from Auro-Dropdown</auro-header>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../dropdown/docs/partials/keyEvents.md) -->
    <!-- The below content is automatically added from ./../../dropdown/docs/partials/keyEvents.md -->
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
        <tr>
          <td rowspan="2">Enter</td>
          <td>-</td>
          <td>Collapsed</td>
          <td>*<sup>1</sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup>1</sup></td>
          <td>Closes the bib.</td>
        </tr>
        <tr>
          <td>Escape</td>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup>1</sup></td>
          <td>Closes the bib.</td>
        </tr>
        <tr>
          <td rowspan="2">Space</td>
          <td>-</td>
          <td>Collapsed</td>
          <td>*<sup>1</sup></td>
          <td>Opens the bib.</td>
        </tr>
        <tr>
          <td>-</td>
          <td>Expanded</td>
          <td>*<sup>1</sup></td>
          <td>Closes the bib.</td>
        </tr>
      </tbody>
    </table>
    <!-- AURO-GENERATED-CONTENT:END -->
    <section class="footnotes">
    <hr />
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../../docs/partials/footnotes/1.md) -->
    <!-- The below content is automatically added from ./../../../docs/partials/footnotes/1.md -->
    <span class="fineprint" id="fn_FocusAll">
    1. Current focus is `:host` or any focusable element within the component.
    </span>
    <!-- AURO-GENERATED-CONTENT:END -->
    </section>
  </div>
</div>