<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>trigger:</strong> shows the component label or content and will render to reflect state of the component (e.g. <code>focus</code>, <code>hover</code>, <code>disabled</code>).
</li>
<li>
<strong>bib:</strong> the expandable content area that is shown/hidden when the trigger is activated.
</li>
<li>
<strong>chevron:</strong> an optional icon indicating the expanded/collapsed state of the dropdown. Visible when the <code>chevron</code> attribute is set.
</li>
<li>
<strong>help text:</strong> descriptive text rendered below the trigger intended to help clarify the intended use of the component instance.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger is a focusable element and will visually respond to common UI states - <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component does not have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="bib">Bib</auro-header>
<p>The bib is positioned relative to the trigger and may be configured to appear above or below. At smaller viewports the bib can switch to fullscreen mode based on the <code>fullscreenBreakpoint</code> setting.</p>
<auro-header level="4" id="helpText">Help Text</auro-header>
<p>Help text is not required. However, consideration should be given to how users will understand the full context of the component instance, particularly users reliant on accessibility tools like screen readers.</p>
