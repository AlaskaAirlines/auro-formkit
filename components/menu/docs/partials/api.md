<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Using Keys

When setting the `value` property, matches are actually performed on the value of the `key` property of the `auro-menuoption` and not the `value` property. By default, the value of `key` is equal to the value of the `value` property. However, for advanced use cases, the `key` value can be overriden to allow for more specific matches.

In the below example, there is a list of "popular" options at the top, with the same values repeated underneath. To allow more specific selections, we can add a `key` attribute to the top options to allow them to be more specifically selected, or to prevent them from interfering with matches on the lower options.

In the below example, setting the value of the menu `'stops'` will select the bottom-most option with the value `'stops'`, and setting the value of menu to `'stops-top'` will select the top-most option with the value `'stops'` since the key now differs from the value. In either case, the resulting value of the menu will be `'stops'` because the resulting value of the menu is based on the `value` property and not the `key` property.

Due to a limitation with Lit change detection to the `value` property, if multiple options with the same exist and one is selected, you must first clear the current value before attempting to select another option with the same value, even if the keys are unique. See code example below.

_Note: Since the value passed to the `value` property when programmatically setting it is overwritten with the proper derived value once the menu has updated, note that it will take one lifecycle before the `value` property is updated to the value that represents the actual menu state._

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/keys.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/keys.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/keys.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Attribute Examples

#### allowDeselect

When set, the `allowDeselect` attribute allows the user to click on a selected menu option again to deselect it when the menu is not in multi-select mode.

When the menu is in multi-select mode, this attribute has no effect and the user will be able to deselect the last remaining selected option.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/allowDeselect.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/allowDeselect.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### noCheckmark<a name="noCheckmark"></a>

Applying the `noCheckmark` attribute will prevent the check icon from being shown on the selected option. The left padding to reserve space for the checkmark is also removed.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nocheckmark.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nocheckmark.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### disabled<a name="disabled"></a>

The `auro-menu` element with `disabled` will mark all `auro-menuoption` elements as disabled.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabledMenu.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabledMenu.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### matchWord<a name="matchWord"></a>

The `auro-menu` component supports the use of the `matchWord` attribute to highlight string parts of each menuoption that are equal to `matchWord`. The matching algorithm is case insensitive (e.g., `n` matches `N`).

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/matchWord.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/matchWord.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/matchWord.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Multi-Select<a name="multiSelect"></a>

The `auro-menu` supports a multi-select option. To use, place the `multiselect` attribute on the `<auro-menu>` element tag or update the `multiselect` property programmatically.

In multi-select mode, the `value` property will always return a valid JSON string that contains an array of selected values, e.g. `'["stops","duration","arrival"]'`, when accessed.

The value of the menu may be set via multiple methods when in multi-select mode: 
- Programmatically or via attribute by passing a valid JSON string that can be parsed using `JSON.parse`.
- Programmatically or via attribute by passing a single matching value in a string, e.g. `"stops"`.
- Programmatically by passing an array of string values, e.g. `["stops","duration","arrival"]`.

_Note: Other methods of setting the value may work but are not officially supported and may stop working unexpectedly._

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multiSelect.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multiSelect.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Optional Flag - `selectAllMatchingOptions`

When this flag is set on the `auro-menu` tag, when the value is set, any option with a matching key will be selected, even when multiple options with that key exist.

If not set, only the first matching option will be selected.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/selectAllMatchingOptions.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/selectAllMatchingOptions.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Loading<a name="loading"></a>
While content is loading, the menu can either remain empty or display a loading placeholder

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Common Use Cases

#### Scroll

When setting the `max-height` of `auro-menu`, all of the overflowing content can be accessed via a scrollbar.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/scroll.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/scroll.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Options with horizonal separator

To create a natural separation between options, simply use a `<hr>` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hr.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hr.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Nesting auro-menus to create sub-menus

The `auro-menu` element supports the placement of an `auro-menu` inside of another `auro-menu`. There is no technical limit to the level of nesting.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nestedMenu.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nestedMenu.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### An auro-menuoption element w/ disabled state

The `auro-menuoption` element supports the placement of the `disabled` attribute per option. A fully disabled list would be managed in an outer wrapping drop down menu element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Menu with pre-selected menu option

The `auro-menu` element supports a pre-selected option via the `selected` attribute on the `auro-menuoption` element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preselect.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preselect.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Menu with restricted width and long option

The `auro-menu` element supports scenarios where the outer parent element of the menu constrains its width and there are options with text longer than the pull down menu will support. Truncated content will be illustrated with an ellipsis.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/restrictedWidth.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/restrictedWidth.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Menu with hidden options

The `auro-menuoption` element supports scenarios where the menu option needs to be hidden. e.g. the only visible menu options contain the `matchWord`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hidden.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hidden.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Reset menu selection state

The `auro-menu` may be reset to a state with no menuoption selected by setting the `value` to `undefined`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Theme Support

The component may be restyled using the following code sample and changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/default/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->


<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/customColor.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/customColor.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>
