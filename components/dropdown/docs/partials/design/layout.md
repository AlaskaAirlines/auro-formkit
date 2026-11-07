<p>The component consists of the following elements:</p>
<ul>
  <li>
    <strong>Trigger:</strong> shows the component label or content, and changes to reflect the component's state, such as <code>focus</code>, <code>hover</code>, or <code>disabled</code>.
  </li>
  <li>
    <strong>Bib:</strong> the expandable content area that is shown/hidden when the trigger is activated.
  </li>
  <li>
    <strong>Chevron:</strong> an optional icon indicating the expanded/collapsed state of the dropdown. Visible when the <code>chevron</code> attribute is set.
  </li>
  <li>
    <strong>Help text:</strong> text below the trigger that helps people understand how to use the dropdown.
  </li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger is a focusable element and visually responds to common UI states: <strong>Hover</strong> <em>(<code>:hover</code>)</em>, <strong>Focus</strong> <em>(<code>:focus-within</code>)</em>, and <strong>Disabled</strong> <em>(the <code>disabled</code> attribute)</em>. The <strong>Active</strong> <em>(<code>:active</code>)</em> state uses the same style as focus.</p>
<auro-header level="4" id="bib">Bib</auro-header>
<p>The bib opens next to the trigger, on the side that <code>placement</code> sets. On screens at or below the <code>fullscreenBreakpoint</code> width, the bib fills the screen instead.</p>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text is optional. Consider how people, especially screen reader users, understand the full context of the dropdown without it.</p>
