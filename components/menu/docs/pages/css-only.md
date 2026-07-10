<auro-header level="1">CSS only with native listbox</auro-header>

<p>For situations where the <code>&lt;auro-menu&gt;</code> web component cannot be used, a native HTML <code>&lt;ul role="listbox"&gt;</code> element can be styled with the Auro Design System tokens to approximate the visual appearance of <code>auro-menu</code>. Unlike <auro-hyperlink href="https://auro.alaskaair.com/components/auro/hyperlink/css-only" target="_blank">auro-hyperlink</auro-hyperlink>, <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">Web Core Style Sheets</auro-hyperlink> does not provide a prebuilt <code>.menu</code> class, so the styling must be authored manually using Auro design tokens. For very simple single-select use cases, a native <code>&lt;select&gt;</code> may also be an acceptable fallback, but it does not match the menu/listbox semantics as closely as a styled <code>&lt;ul&gt;</code>.</p>

<auro-header level="2">Styling a native listbox</auro-header>

<p>A native <code>&lt;ul&gt;</code> can be given <code>role="listbox"</code> (or <code>role="menu"</code>) and restyled with the Auro design tokens published by <auro-hyperlink href="https://alaskaairlines.github.io/WebCoreStyleSheets/" target="_blank">@aurodesignsystem/design-tokens</auro-hyperlink>. The pattern below replicates the spacing, hover, focus, and selected-state colors used by <code>auro-menu</code>.</p>

<pre><code>@import "./node_modules/@aurodesignsystem/design-tokens/dist/tokens/CSSCustomProperties.css";

.menu {
  list-style: none;
  margin: 0;
  padding: var(--ds-size-100, 0.5rem) 0;
  background-color: var(--ds-color-container-primary-default, #ffffff);
  border: 1px solid var(--ds-color-border-ui-default, #6e767f);
  border-radius: var(--ds-border-radius, 4px);
}

.menu__option {
  padding: var(--ds-size-100, 0.5rem) var(--ds-size-200, 1rem);
  color: var(--ds-color-text-primary-default, #1d1f24);
  cursor: pointer;
  user-select: none;
}

.menu__option:hover {
  background-color: var(--ds-color-container-ui-hover-default, #f0f5ff);
}

.menu__option:focus-visible {
  outline: 2px solid var(--ds-color-border-active-default, #01426a);
  outline-offset: -2px;
}

.menu__option[aria-selected="true"] {
  background-color: var(--ds-color-container-ui-selected-default, #01426a);
  color: var(--ds-color-text-inverse-default, #ffffff);
}

.menu__option[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
}
</code></pre>

<auro-header level="3">Basic listbox</auro-header>

<p>Apply the <code>.menu</code> class to a <code>&lt;ul&gt;</code> with <code>role="listbox"</code> and give each <code>&lt;li&gt;</code> the <code>option</code> role:</p>

<pre><code>&lt;ul class="menu" role="listbox" aria-label="Cabin class"&gt;
  &lt;li class="menu__option" role="option" tabindex="0" aria-selected="true"&gt;Economy&lt;/li&gt;
  &lt;li class="menu__option" role="option" tabindex="-1" aria-selected="false"&gt;Premium&lt;/li&gt;
  &lt;li class="menu__option" role="option" tabindex="-1" aria-selected="false"&gt;First&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<auro-header level="3">Listbox with a disabled option</auro-header>

<p>Use <code>aria-disabled="true"</code> on individual options that should not be selectable:</p>

<pre><code>&lt;ul class="menu" role="listbox" aria-label="Seat"&gt;
  &lt;li class="menu__option" role="option" tabindex="0" aria-selected="false"&gt;12A&lt;/li&gt;
  &lt;li class="menu__option" role="option" tabindex="-1" aria-selected="false" aria-disabled="true"&gt;12B&lt;/li&gt;
  &lt;li class="menu__option" role="option" tabindex="-1" aria-selected="false"&gt;12C&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<auro-header level="2">What you lose without auro-menu</auro-header>

<p>While the CSS above replicates the <strong>visual styling</strong> of <code>auro-menu</code>, the following functionality built into the <code>auro-menu</code> and <code>auro-menuoption</code> web components is <strong>not available</strong> when using plain HTML:</p>

<auro-header level="3">Active-option tracking</auro-header>

<p><code>auro-menu</code> tracks the active option internally (via an <code>active</code> CSS class on the current <code>auro-menuoption</code>) rather than moving DOM focus between options. In typical integrations (<code>&lt;auro-select&gt;</code>, <code>&lt;auro-combobox&gt;</code>), focus remains on the parent trigger/input and <code>aria-activedescendant</code> points at the active option; if you make <code>&lt;auro-menu&gt;</code> focusable (e.g., <code>tabindex="0"</code>), the same active-option model applies while focus is on the menu host. With plain HTML, you must pick one focus model — either roving <code>tabindex="0"</code>/<code>tabindex="-1"</code>, or <code>aria-activedescendant</code> on the container — and wire up the DOM writes yourself on every key event.</p>

<auro-header level="3">Arrow-key navigation</auro-header>

<p><code>auro-menu</code> handles <code>ArrowUp</code>, <code>ArrowDown</code>, <code>Enter</code>, and <code>Tab</code> to move the highlight and commit selections. Native <code>&lt;ul&gt;</code> elements have no built-in keyboard model — you must wire up <code>keydown</code> listeners, track the highlighted index, and prevent default browser scrolling on the arrow keys yourself.</p>

<auro-header level="3">matchWord highlighting</auro-header>

<p><code>auro-menu</code> supports a <code>matchWord</code> attribute that highlights matched substrings within option labels — used by <code>auro-combobox</code> to visually mark the user's typed input inside each filtered option. Plain HTML provides no equivalent; you must walk each option and wrap matched substrings yourself.</p>

<auro-header level="3">Type-ahead navigation</auro-header>

<p>Type-ahead — jumping the active option to whichever entry starts with the letters the user typed — is <strong>not</strong> handled by <code>auro-menu</code> itself. It is provided by the parent selection component (<code>auro-select</code>, <code>auro-combobox</code>) which captures printable characters on its trigger and calls back into the menu. A plain-HTML listbox has no such wiring and would need a bespoke keydown handler that tracks a rolling character buffer and resolves it against the option list.</p>

<auro-header level="3">Nested submenu support</auro-header>

<p><code>auro-menu</code> detects nested <code>auro-menu</code> elements, applies the correct <code>role="group"</code>, and computes indentation per level. The root menu treats all descendant options as a single flat list, so selecting an option inside a nested menu updates the root menu's <code>value</code> and <code>optionSelected</code> — the root always owns the selection state. With plain HTML, you must apply nested ARIA roles and indentation manually.</p>

<auro-header level="3">Selection state coordination</auro-header>

<p><code>auro-menu</code> keeps <code>optionSelected</code>, <code>value</code>, and each option's <code>aria-selected</code> state in sync internally. With native HTML, you must update <code>aria-selected</code> on every option yourself on each change and manage your own source of truth for the selected value.</p>

<auro-header level="3">ARIA roles and live announcements</auro-header>

<p><code>auro-menu</code> automatically applies <code>role="listbox"</code>, <code>aria-multiselectable</code>, <code>aria-busy</code> during loading, and per-option <code>role="option"</code> with <code>aria-selected</code> and <code>aria-disabled</code>. Plain HTML requires you to author every one of these attributes by hand and keep them in sync with state — and to add any additional live-region announcements yourself.</p>

<auro-header level="3">Value emission and events</auro-header>

<p><code>auro-menu</code> dispatches a structured set of events — <code>auroMenu-selectedOption</code>, <code>auroMenu-activatedOption</code>, <code>auroMenu-optionsChange</code>, <code>auroMenu-selectValueReset</code>, <code>auroMenu-selectValueFailure</code>, and <code>auroMenu-loadingChange</code> — so parent components can react to highlight, selection, and lifecycle changes. Native listboxes emit no equivalent events; you must dispatch your own.</p>

<auro-header level="3">Multi-select with array value</auro-header>

<p><code>auro-menu</code> supports <code>multiselect</code>, exposing the selection as a JSON-stringified array via <code>value</code> and as an array of elements via <code>optionSelected</code>. With plain HTML, you must track multiple selections yourself, manage the <code>aria-multiselectable</code> attribute, and serialize the result manually.</p>

<auro-header level="3">Multi-select deselect</auro-header>

<p>In multi-select mode, clicking an already-selected option toggles it off. Native listboxes have no built-in deselect concept for individual options; you must implement the toggle behavior and update <code>aria-selected</code> yourself.</p>

<auro-header level="3">Select-by-value and reset</auro-header>

<p><code>auro-menu</code> exposes a <code>value</code> attribute that drives selection programmatically (accepting a JSON-stringified array in multi-select mode) and a single <code>reset()</code> method that clears all selection and validation state. With plain HTML, you must walk the list to find a matching option, set its state, and write your own reset routine.</p>

<auro-header level="3">Loading state</auro-header>

<p><code>auro-menu</code> renders a built-in loading placeholder via <code>loadingIcon</code> and <code>loadingText</code> slots, sets <code>aria-busy</code>, and emits <code>auroMenu-loadingChange</code> when the loading attribute toggles. With plain HTML, you must render a placeholder, manage <code>aria-busy</code>, and signal loading transitions yourself.</p>

<auro-header level="3">Shape and size variants</auro-header>

<p><code>auro-menu</code> supports <code>shape</code> (<code>box</code>, <code>round</code>) and <code>size</code> (<code>sm</code>, <code>md</code>) variants that adjust spacing and corner radii consistently across the menu and its options. A CSS-only listbox must reauthor each variant by hand.</p>

<auro-header level="3">Multi-brand theming</auro-header>

<p><code>auro-menu</code> consumes Auro design tokens through its component logic, so it automatically picks up brand-specific theming when token packages are swapped. A CSS-only listbox is tied to whichever tokens were imported at author time and will not respond to runtime theme switching the way the web component does.</p>

<auro-header level="2">Summary</auro-header>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Native <code>&lt;ul role="listbox"&gt;</code> with Auro tokens</th>
      <th><code>auro-menu</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design-system-aligned styling</td>
      <td>Manual (author-written CSS)</td>
      <td>Built-in</td>
    </tr>
    <tr>
      <td>Active-option tracking</td>
      <td>Manual (roving tabindex or <code>aria-activedescendant</code>)</td>
      <td>Built-in (<code>active</code> class on the current option)</td>
    </tr>
    <tr>
      <td>Arrow-key navigation</td>
      <td>Manual <code>keydown</code> handling</td>
      <td>Built-in</td>
    </tr>
    <tr>
      <td><code>matchWord</code> highlighting</td>
      <td>Not supported</td>
      <td>Built-in via <code>matchWord</code></td>
    </tr>
    <tr>
      <td>Type-ahead navigation</td>
      <td>Not supported</td>
      <td>Provided by parent <code>auro-select</code> / <code>auro-combobox</code></td>
    </tr>
    <tr>
      <td>Nested submenus</td>
      <td>Manual roles and indentation</td>
      <td>Automatic level detection</td>
    </tr>
    <tr>
      <td>Selection state coordination</td>
      <td>Manual <code>aria-selected</code> sync</td>
      <td>Coordinated internally</td>
    </tr>
    <tr>
      <td>ARIA roles and <code>aria-busy</code></td>
      <td>Manual</td>
      <td>Automatic</td>
    </tr>
    <tr>
      <td>Selection and lifecycle events</td>
      <td>Not supported</td>
      <td><code>auroMenu-*</code> event suite</td>
    </tr>
    <tr>
      <td>Multi-select with array value</td>
      <td>Manual aggregation</td>
      <td><code>multiselect</code> + <code>value</code></td>
    </tr>
    <tr>
      <td>Multi-select deselect</td>
      <td>Manual</td>
      <td>Click-to-toggle built in</td>
    </tr>
    <tr>
      <td>Select-by-value and reset</td>
      <td>Manual</td>
      <td><code>value</code> attribute + <code>reset()</code></td>
    </tr>
    <tr>
      <td>Loading state</td>
      <td>Manual</td>
      <td>Built-in via <code>loading</code></td>
    </tr>
    <tr>
      <td>Shape and size variants</td>
      <td>Manual CSS</td>
      <td><code>shape</code> / <code>size</code> attributes</td>
    </tr>
    <tr>
      <td>Multi-brand theming</td>
      <td>Static (import-time tokens)</td>
      <td>Full (design tokens + component logic)</td>
    </tr>
  </tbody>
</table>

<auro-header level="2">Recommendation</auro-header>

<p>Use <code>auro-menu</code> and <code>auro-menuoption</code> whenever possible. Fall back to a CSS-styled native listbox only in environments where custom elements are not supported or when integrating with third-party systems that require plain HTML — and be prepared to reimplement roving focus, keyboard navigation, selection coordination, and the full set of ARIA semantics yourself.</p>
