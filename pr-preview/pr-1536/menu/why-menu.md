<auro-header level="1" id="overview">Why auro-menu?</auro-header>
<p>Native HTML has no dedicated menu component for selection lists. <code>&lt;select&gt;</code> only accepts <code>&lt;option&gt;</code> elements with plain text. Building a rich, accessible, keyboard-navigable menu with nested groups, loading states, and multi-select support requires significant custom work. <code>auro-menu</code> provides this as a composable primitive.</p>
<auro-header level="2" id="accessibility">Accessibility</auro-header>
<p>Custom list implementations often fail to provide correct ARIA semantics, keyboard navigation, or screen reader announcements.</p>
<p><code>auro-menu</code> provides:</p>
<ul>
<li><strong>Keyboard navigation</strong> — Arrow keys move between options, Enter selects, Escape cancels, Home/End jump to the first and last options.</li>
<li><strong>Active option tracking</strong> — The currently highlighted option is tracked programmatically, enabling <code>aria-activedescendant</code> patterns in parent components like <code>auro-select</code> and <code>auro-combobox</code>.</li>
<li><strong>Multi-select semantics</strong> — When <code>multiSelect</code> is enabled, <code>aria-multiselectable</code> is set on the menu.</li>
<li><strong>Loading state</strong> — <code>aria-busy</code> is set during loading, with customizable loading icon and text slots.</li>
</ul>
<auro-header level="2" id="richOptionContent">Rich option content</auro-header>
<p><code>&lt;option&gt;</code> elements accept only plain text. There is no native way to add icons, descriptions, or nested structure to options.</p>
<p><code>auro-menu</code> options support:</p>
<ul>
<li>Full HTML content in each option</li>
<li>Icons alongside option text</li>
<li>Nested submenus for hierarchical navigation</li>
<li>Checkmark indicators for selected options (configurable via <code>noCheckmark</code>)</li>
</ul>
<auro-header level="2" id="multiselect">Multi-select</auro-header>
<p>Native <code>&lt;select multiple&gt;</code> renders a fixed-height list box that is widely considered a poor user experience. There is no checkmark feedback, and the interaction model (Ctrl+click) is unintuitive.</p>
<p><code>auro-menu</code> provides:</p>
<ul>
<li>Checkmark indicators for each selected option</li>
<li>A <code>value</code> that returns a JSON-stringified array of selections</li>
<li>Click-to-toggle behavior that deselects an already-selected option</li>
<li><code>selectAllMatchingOptions</code> for bulk selection operations</li>
<li><code>clearSelection()</code> and <code>reset()</code> methods for programmatic control</li>
</ul>
<auro-header level="2" id="searchAndFiltering">Search and filtering</auro-header>
<p>Native menus have no concept of filtering or highlighting matched text.</p>
<p><code>auro-menu</code> supports:</p>
<ul>
<li><code>matchWord</code> to highlight matching portions of option text as the user types (used by <code>auro-combobox</code> for real-time filtering)</li>
<li>Programmatic <code>navigateOptions(direction)</code> for keyboard-driven traversal</li>
</ul>
<auro-header level="2" id="loadingState">Loading state</auro-header>
<p>Native selects have no loading pattern. When options are fetched asynchronously, there is no standard way to communicate this to the user.</p>
<p><code>auro-menu</code> provides:</p>
<ul>
<li>A <code>loading</code> attribute that displays a loading indicator</li>
<li><code>loadingIcon</code> and <code>loadingText</code> slots for custom loading UI</li>
<li><code>auroMenu-loadingChange</code> event when the loading state changes</li>
</ul>
<auro-header level="2" id="composability">Composability</auro-header>
<p><code>auro-menu</code> is designed as a building block. It is the selection engine inside:</p>
<ul>
<li><strong><code>auro-select</code></strong> — Dropdown selection</li>
<li><strong><code>auro-combobox</code></strong> — Autocomplete with filtering</li>
</ul>
<p>This architecture means selection behavior, keyboard navigation, and ARIA semantics are consistent across all selection components.</p>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;select&gt;</code> / <code>&lt;option&gt;</code></th>
<th><code>auro-menu</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Rich HTML in options</td>
<td>Plain text only</td>
<td>Full HTML</td>
</tr>
<tr>
<td>Nested submenus</td>
<td>Not supported</td>
<td>Built-in</td>
</tr>
<tr>
<td>Multi-select with checkmarks</td>
<td>Ctrl+click list box</td>
<td>Checkmark toggle</td>
</tr>
<tr>
<td>Search/filter highlighting</td>
<td>No</td>
<td><code>matchWord</code> attribute</td>
</tr>
<tr>
<td>Loading state</td>
<td>No</td>
<td>Built-in with custom slots</td>
</tr>
<tr>
<td>Keyboard navigation</td>
<td>Browser-dependent</td>
<td>Full arrow/Enter/Escape/Home/End</td>
</tr>
<tr>
<td>Composable primitive</td>
<td>No</td>
<td>Foundation for select and combobox</td>
</tr>
<tr>
<td>Multi-select deselect</td>
<td>Ctrl+click list box</td>
<td>Click-to-toggle in multi-select</td>
</tr>
</tbody>
</table>
