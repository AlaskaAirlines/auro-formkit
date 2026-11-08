<auro-header level="1" id="overview">Menu: VoiceOver behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-menu&gt;</code> component. It covers announcements and interactions for menu navigation and option selection.</p>

<div class="note"><strong>Note:</strong> In the standard integrations (<code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>), keyboard focus stays on the parent trigger or input and <strong>doesn't</strong> move into the menu. The parent captures keys and drives the menu, and the active option is announced via <code>aria-activedescendant</code> on the trigger rather than by moving DOM focus between options. The focus-on-the-menu behavior described alongside the standalone case below only applies when an author makes <code>&lt;auro-menu&gt;</code> itself focusable (for example, <code>tabindex="0"</code>).</p>

<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive announcements</auro-header>

<auro-header level="3" id="voiceOverMenuContainer">Menu container</auro-header>
<p>When the listbox is exposed, such as when the parent's dropdown opens or a standalone focusable menu receives focus, VoiceOver announces:</p>
<ol>
  <li><strong>Role:</strong> <em>"list box"</em>, from the root <code>&lt;auro-menu&gt;</code>. Nested menus use <code>role="group"</code> with <code>aria-label="submenu"</code>.</li>
  <li><strong>Item count:</strong> The number of visible options, such as <em>"5 items"</em>.</li>
  <li><strong>Multi-select:</strong> When <code>multiSelect</code> is set on the root menu, <code>aria-multiselectable="true"</code> is exposed so VoiceOver announces the listbox as multi-selectable.</li>
  <li><strong>Loading:</strong> While <code>loading</code> is set, <code>aria-busy="true"</code> is exposed so VoiceOver signals that the option set isn't stable yet.</li>
</ol>

<auro-header level="3" id="voiceOverMenuOptions">Menu options</auro-header>
<p>Each <code>auro-menuoption</code> announces the following when the parent field points at it (via <code>aria-activedescendant</code>) or when the user reads through the listbox:</p>
<ol>
  <li><strong>Label:</strong> The option's text content</li>
  <li><strong>Role:</strong> <em>"option"</em></li>
  <li><strong>Position:</strong> Position in the list, such as <em>"3 of 5"</em>. When the menu is used inside <code>&lt;auro-select&gt;</code> or <code>&lt;auro-combobox&gt;</code>, each option receives <code>aria-setsize</code> and <code>aria-posinset</code>. Standalone <code>&lt;auro-menu&gt;</code> doesn't set these attributes itself; positional announcements outside a select/combobox host rely on VoiceOver's own listbox item count.</li>
  <li><strong>Selected state:</strong> <em>"selected"</em> if <code>aria-selected="true"</code> is set on the option</li>
  <li><strong>Disabled state:</strong> <em>"dimmed"</em> if <code>aria-disabled="true"</code> is set on the option</li>
</ol>
<div class="note"><strong>Note:</strong> <code>&lt;auro-menuoption&gt;</code> isn't in the tab order: <code>tabindex="-1"</code> keeps it out. In a select or combobox context, focus stays on the parent trigger and the active option is pointed at via <code>aria-activedescendant</code> (using <code>ariaActiveDescendantElement</code> to cross the shadow-root boundary).</div>

<auro-header level="3" id="voiceOverSelection">Selection</auro-header>
<p>In a select or combobox context, the parent captures Enter (and Tab) on its trigger/input and commits the active option through the menu; the menu itself doesn't receive the key. When the selection is committed:</p>
<ul>
  <li>VoiceOver announces the option label followed by <em>"selected"</em></li>
  <li>In multi-select mode, previously selected options remain selected and their state is preserved</li>
</ul>
<p>A standalone focusable menu (see the note at the top of this page) handles Enter and Tab on its own host, producing the same selection announcement.</p>

<auro-header level="2" id="voiceOverWorkflow">Navigation workflow</auro-header>
<p>In the standard select/combobox integrations, focus remains on the parent trigger or input throughout. The menu is a listbox the parent points into, not a place focus moves to:</p>
<ol>
  <li><strong>Open the listbox:</strong> Activating the trigger (or typing in a combobox) exposes the menu; VoiceOver announces the listbox role and item count</li>
  <li><strong>Navigate options:</strong> Arrow Down/Up keys pressed on the trigger move the active option; <code>aria-activedescendant</code> updates and VoiceOver announces each option's label, role, and position</li>
  <li><strong>Select an option:</strong> Enter (captured by the parent) commits the active option; VoiceOver confirms the selection</li>
  <li><strong>Exit:</strong> The parent handles Escape and Tab: Escape closes the listbox, and Tab commits the active option before moving focus to the next element in the tab sequence</li>
</ol>
<p>A standalone focusable menu follows the same active-option model, except focus is on the menu host and the menu handles Arrow, Enter, and Tab directly. See the menu's key events documentation for the full standalone key table.</p>

<auro-header level="2" id="voiceOverNestedMenus">Nested menus</auro-header>
<p>Nested <code>auro-menu</code> elements have <code>role="group"</code>, not <code>role="listbox"</code>, with <code>aria-label="submenu"</code> unless you set your own <code>aria-label</code>. The root menu treats the options in nested menus as part of its own list and owns their selection.</p>
