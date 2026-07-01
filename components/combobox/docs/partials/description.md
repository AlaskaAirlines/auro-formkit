<p><code>&lt;auro-combobox&gt;</code> combines a text input with a filterable dropdown menu, letting users either type a value or pick one from a list. As the user types, the menu narrows to show only matching options.</p>

<p>The component supports two modes:</p>
<ul>
  <li><strong>Suggestion (default)</strong> — The user may type any value. The menu provides suggestions but does not restrict input.</li>
  <li><strong>Filter</strong> — Typing filters the available options and sets the component's <code>value</code> to the typed text, but the input is not considered valid until a menu option is selected. Validation surfaces <code>valueMissing</code> until the typed value matches a chosen option.</li>
</ul>

<p>Common use cases:</p>
<ul>
  <li><strong>Airport or city search</strong> — Type a city name or airport code to filter a long list of destinations.</li>
  <li><strong>Country or region selection</strong> — Quickly find and select from a large set of geographic options.</li>
  <li><strong>Autocomplete fields</strong> — Provide type-ahead suggestions for form fields where the set of valid values is known.</li>
  <li><strong>Search with suggestions</strong> — Offer recommended results while still allowing freeform input.</li>
</ul>
