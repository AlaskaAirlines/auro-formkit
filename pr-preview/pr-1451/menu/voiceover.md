<auro-header level="1" id="overview">Menu - VoiceOver Behavior</auro-header>
<p>This page documents the VoiceOver experience when using the <code>&lt;auro-menu&gt;</code> component. It covers announcements and interactions for menu navigation and option selection.</p>
<auro-header level="2" id="voiceOverInteractiveAnnouncements">Interactive Announcements</auro-header>
<auro-header level="3" id="voiceOverMenuContainer">Menu Container</auro-header>
<p>When focus enters the menu, VoiceOver announces:</p>
<ol>
<li><strong>Role:</strong> <em>"list box"</em></li>
<li><strong>Item count:</strong> The number of visible options (e.g., <em>"5 items"</em>)</li>
</ol>
<auro-header level="3" id="voiceOverMenuOptions">Menu Options</auro-header>
<p>Each <code>auro-menuoption</code> announces the following when focused:</p>
<ol>
<li><strong>Label:</strong> The option's text content</li>
<li><strong>Role:</strong> <em>"option"</em></li>
<li><strong>Position:</strong> Position in the list (e.g., <em>"3 of 5"</em>)</li>
<li><strong>Selected state:</strong> <em>"selected"</em> if the option is currently selected</li>
<li><strong>Disabled state:</strong> <em>"dimmed"</em> if the option is disabled</li>
</ol>
<auro-header level="3" id="voiceOverSelection">Selection</auro-header>
<p>When an option is selected via Enter or Space:</p>
<ul>
<li>VoiceOver announces the option label followed by <em>"selected"</em></li>
<li>In multi-select mode, previously selected options remain selected and their state is preserved</li>
</ul>
<auro-header level="2" id="voiceOverWorkflow">Navigation Workflow</auro-header>
<ol>
<li><strong>Enter the menu:</strong> Focus moves into the listbox; VoiceOver announces role and item count</li>
<li><strong>Navigate options:</strong> Use Arrow Down/Up keys; VoiceOver announces each option's label, role, and position</li>
<li><strong>Select an option:</strong> Press Enter or Space; VoiceOver confirms the selection</li>
<li><strong>Exit:</strong> Tab out of the menu or press Escape (when used within a dropdown context)</li>
</ol>
<auro-header level="2" id="voiceOverNestedMenus">Nested Menus</auro-header>
<p>When a nested <code>auro-menu</code> is encountered, VoiceOver announces a new listbox context. Each nested menu maintains its own option count and position tracking.</p>
