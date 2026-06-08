<!--
The README.md file is a compiled document. No edits should be made directly to this file.

README.md is created by running `npm run build:docs`.

This file is generated based on a template fetched from
`../../docs/templates/componentReadmeTemplate.md`
and copied to `./componentDocs/README.md` each time the docs are compiled.

The following sections are editable by making changes to the following files:

| SECTION                | DESCRIPTION                                       | FILE LOCATION                              |
|------------------------|---------------------------------------------------|--------------------------------------------|
| Description            | Description of the component                      | `./docs/partials/description.md`           |
| Use Cases              | Examples for when to use this component           | `./docs/partials/useCases.md`              |
| Getting Started        | Getting started link for this component           | `./docs/partials/readmeGettingStarted.md`  |
-->

# Combobox

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/description.md) -->
<!-- The below content is automatically added from ./docs/partials/description.md -->
<p><code>&lt;auro-combobox&gt;</code> combines a text input with a filterable dropdown menu, letting users either type a value or pick one from a list. As the user types, the menu narrows to show only matching options.</p>
<p>The component supports two modes:</p>
<ul>
<li><strong>Suggestion (default)</strong> — The user may type any value. The menu provides suggestions but does not restrict input.</li>
<li><strong>Filter</strong> — The user must select from the menu. Typing filters the available options but does not set the component's value. The value is only set when a menu option is selected.</li>
</ul>
<p>Common use cases:</p>
<ul>
<li><strong>Airport or city search</strong> — Type a city name or airport code to filter a long list of destinations.</li>
<li><strong>Country or region selection</strong> — Quickly find and select from a large set of geographic options.</li>
<li><strong>Autocomplete fields</strong> — Provide type-ahead suggestions for form fields where the set of valid values is known.</li>
<li><strong>Search with suggestions</strong> — Offer recommended results while still allowing freeform input.</li>
</ul>
<!-- AURO-GENERATED-CONTENT:END -->

## Combobox Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
The `<auro-combobox>` element should be used in situations where users may:

* Search
  * Airports: user looks for a specific airport by searching for the city name or airport code
  * Site wide: user searches for a topic site wide and combobox makes suggestions on searchable results
* Filter
  * Options: user chooses filters for their search by using combobox
* Select
  * Quantity: user types a quantity to select an option within a range (for example, the user may be limited to 2-34)
<!-- AURO-GENERATED-CONTENT:END -->

## Getting Started

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeGettingStarted.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeGettingStarted.md -->
For Getting Started instructions, visit the [auro-combobox Getting Started page](https://auro.alaskaair.com/components/auro/combobox/getting-started).
<!-- AURO-GENERATED-CONTENT:END -->
