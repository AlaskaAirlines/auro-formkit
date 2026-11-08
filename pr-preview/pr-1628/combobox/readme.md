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
<li><strong>Suggestion (default)</strong>: The user may type any value. The menu provides suggestions but doesn't restrict input.</li>
<li><strong>Filter</strong>: Typing filters the available options and sets the component's <code>value</code> to the typed text, but the input isn't valid until the user selects a menu option. Validation reports <code>valueMissing</code> until the typed value matches a chosen option.</li>
</ul>
<p>Common use cases:</p>
<ul>
<li><strong>Airport or city search</strong>: Type a city name or airport code to filter a long list of destinations.</li>
<li><strong>Country or region selection</strong>: Quickly find and select from a large set of geographic options.</li>
<li><strong>Autocomplete fields</strong>: Provide type-ahead suggestions for form fields where the set of valid values is known.</li>
<li><strong>Search with suggestions</strong>: Offer recommended results while still allowing freeform input.</li>
</ul>
<!-- AURO-GENERATED-CONTENT:END -->

## Combobox use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./docs/partials/useCases.md -->
Use `<auro-combobox>` when users need to:

* Search
  * Airports: The user looks for a specific airport by searching for the city name or airport code.
  * Sitewide: The user searches the whole site for a topic, and the combobox suggests matching results.
* Filter
  * Options: The user chooses filters for their search with the combobox.
* Select
  * Quantity: The user types a quantity to choose an option within a range, such as 2–34.
<!-- AURO-GENERATED-CONTENT:END -->

## Getting started

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/partials/readmeGettingStarted.md) -->
<!-- The below content is automatically added from ./docs/partials/readmeGettingStarted.md -->
For Getting Started instructions, visit the [auro-combobox Getting Started page](https://auro.alaskaair.com/components/auro/combobox/getting-started).
<!-- AURO-GENERATED-CONTENT:END -->
