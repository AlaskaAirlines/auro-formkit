## Auro-Dropdown Keyboard Behavior

### Tab Behavior

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/tabindex.md) -->
<!-- The below content is automatically added from ./../docs/partials/tabindex.md -->
<p>The trigger is a focusable element and participates in the standard tab order, responding to <code>Tab</code> and <code>Shift+Tab</code> key events per <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex">native browser behavior.<auro-hyperlink></p>
<p> When the component is <code>disabled</code> it is removed from the tab order by the browser. VoiceOver's virtual cursor (swipe navigation) can still encounter the component, but standard keyboard <code>Tab</code> navigation skips it.</p>
<p>When the bib is collapsed, the bib content is excluded from the tab sequence. When expanded, focusable elements within the bib content are included in the natural tab order. In fullscreen mode, focus is trapped within the bib, and the tab sequence cycles through the bib content focusable elements until the bib is closed or the viewport no longer meets the fullscreen condition.</p>
<!-- AURO-GENERATED-CONTENT:END -->

### Key Events

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

## DEVELOPER NOTES / CODE ACTION ITEMS / TODO ITEMS
1. Remove the bridge for keyboard event bubbling out of the bib
1. Strip out event listers not listed in this document (e.g. arrow keys)
1. do not prevent any event bubbling beyond the focus trap of a fullscreen bib
