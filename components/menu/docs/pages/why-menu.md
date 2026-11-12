<auro-header level="1" id="overview">Why auro-menu?</auro-header>

<p>Native HTML has no dedicated menu component for selection lists. <code>&lt;select&gt;</code> only accepts <code>&lt;option&gt;</code> elements with plain text. Building a rich, accessible, keyboard-navigable menu with nested groups, loading states, and multi-select support requires significant custom work. <code>auro-menu</code> provides this as a composable primitive.</p>

<auro-header level="2" id="accessibility">Accessibility</auro-header>

<p>Custom list implementations often fail to provide correct ARIA semantics, keyboard navigation, or screen reader announcements.</p>

<p><code>auro-menu</code> provides:</p>

<ul>
  <li><strong>Keyboard navigation:</strong> Arrow Up/Down move the active option; Enter selects it; Tab selects and moves focus out of the menu.</li>
  <li><strong>Active option tracking:</strong> The menu tracks the highlighted option, so parent components, such as <code>auro-select</code> and <code>auro-combobox</code>, can point <code>aria-activedescendant</code> at it.</li>
  <li><strong>Multi-select semantics:</strong> When <code>multiSelect</code> is on, the menu sets <code>aria-multiselectable</code>.</li>
  <li><strong>Loading state:</strong> The menu sets <code>aria-busy</code> while loading, and shows the content of the <code>loadingIcon</code> and <code>loadingText</code> slots in place of the options.</li>
</ul>

<auro-header level="2" id="richOptionContent">Rich option content</auro-header>

<p><code>&lt;option&gt;</code> elements accept only plain text. Native HTML has no way to add icons, descriptions, or nested structure to options.</p>

<p><code>auro-menu</code> options support:</p>

<ul>
  <li>Full HTML content in each option</li>
  <li>Icons alongside option text</li>
  <li>Nested submenus that indent groups of options</li>
  <li>Checkmark indicators for selected options (configurable via <code>noCheckmark</code>)</li>
</ul>

<p>Highlighting <code>matchword</code> text rebuilds an option's content as plain text, so markup such as icons is lost. Set <code>persistent</code> on options whose markup you need to keep.</p>

<auro-header level="2" id="multiselect">Multi-select</auro-header>

<p>Native <code>&lt;select multiple&gt;</code> shows a fixed-height list box with no checkmarks, and selecting more than one option takes Ctrl+click, which is hard to discover.</p>

<p><code>auro-menu</code> provides:</p>

<ul>
  <li>Checkmark indicators for each selected option</li>
  <li>A <code>value</code> that returns a JSON-stringified array of selections</li>
  <li>Click-to-toggle behavior that deselects an already-selected option</li>
  <li><code>reset()</code> method for programmatic control</li>
</ul>

<auro-header level="2" id="searchAndFiltering">Search and filtering</auro-header>

<p>Native menus have no concept of filtering or highlighting matched text.</p>

<p><code>auro-menu</code> supports:</p>

<ul>
  <li><auro-hyperlink href="customize#matchWord"><code>matchWord</code></auro-hyperlink> to highlight the parts of each option's text that match what someone types. <code>auro-combobox</code> sets it while it filters options.</li>
  <li>Programmatic <code>navigateOptions(direction)</code> for keyboard-driven traversal</li>
</ul>

<auro-header level="2" id="loadingState">Loading state</auro-header>

<p>Native selects have no loading pattern. When options load asynchronously, native HTML has no standard way to tell people they're still loading.</p>

<p><code>auro-menu</code> provides:</p>

<ul>
  <li>A <code>loading</code> attribute that replaces the options with a loading placeholder</li>
  <li><code>loadingIcon</code> and <code>loadingText</code> slots for the icon and text the placeholder shows</li>
  <li><code>auroMenu-loadingChange</code> event when the loading state changes</li>
</ul>

<auro-header level="2" id="composability">Composability</auro-header>

<p><code>auro-menu</code> is a building block. It's the selection engine inside:</p>

<ul>
  <li><strong><code>auro-select</code>:</strong> Dropdown selection</li>
  <li><strong><code>auro-combobox</code>:</strong> Autocomplete with filtering</li>
</ul>

<p>This architecture means selection behavior, keyboard navigation, and ARIA semantics are consistent across <code>auro-select</code> and <code>auro-combobox</code>.</p>

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
      <td><code>matchword</code> attribute</td>
    </tr>
    <tr>
      <td>Loading state</td>
      <td>No</td>
      <td>Built-in with custom slots</td>
    </tr>
    <tr>
      <td>Keyboard navigation</td>
      <td>Browser-dependent</td>
      <td>Arrow Up/Down, Enter, Tab</td>
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
