<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-menu

The `auro-menu` element provides users a way to select from a list of options.

## Properties

| Property                   | Attribute                  | Modifiers | Type                  | Default     | Description                                      |
|----------------------------|----------------------------|-----------|-----------------------|-------------|--------------------------------------------------|
| [allowDeselect](#allowDeselect)            | `allowDeselect`            |           | `boolean`             | false       | Allows deselecting an already selected option when clicked again in single-select mode. |
| [currentLabel](#currentLabel)             |                            | readonly  | `string`              |             |                                                  |
| [disabled](#disabled)                 | `disabled`                 |           | `boolean`             |             | When true, the entire menu and all options are disabled. |
| [hasLoadingPlaceholder](#hasLoadingPlaceholder)    | `hasLoadingPlaceholder`    |           | `boolean`             |             | Indicates whether the menu has a loadingIcon or loadingText to render when in a loading state. |
| [index](#index)                    |                            |           | `number`              |             |                                                  |
| [items](#items)                    |                            | readonly  | `HTMLElement[]`       |             |                                                  |
| [loading](#loading)                  | `loading`                  |           | `boolean`             | false       | When true, displays a loading state using the loadingIcon and loadingText slots if provided. |
| [matchWord](#matchWord)                | `matchword`                |           | `string`              | "undefined" | Specifies a string used to highlight matched string parts in options. |
| [multiSelect](#multiSelect)              | `multiselect`              |           | `boolean`             | false       | When true, the selected option can be multiple options. |
| [noCheckmark](#noCheckmark)              | `nocheckmark`              |           | `boolean`             | false       | When true, selected option will not show the checkmark. |
| [optionActive](#optionActive)             | `optionactive`             |           | `object`              | "undefined" | Specifies the current active menuOption.         |
| [optionSelected](#optionSelected)           | `optionSelected`           |           | `object`              | "undefined" | An array of currently selected menu options, type `HTMLElement` by default. In multi-select mode, `optionSelected` is an array of HTML elements. |
| [options](#options)                  |                            | readonly  | `array`               |             | Available menu options.                          |
| [selectAllMatchingOptions](#selectAllMatchingOptions) | `selectAllMatchingOptions` |           | `boolean`             | false       | When true, selects all options that match the provided value/key when setting value and multiselect is enabled. |
| [selectedOption](#selectedOption)           |                            | readonly  | `HTMLElement \| null` |             | Gets the first selected option, or null if none. |
| [selectedOptions](#selectedOptions)          |                            | readonly  | `HTMLElement[]`       |             | Gets the currently selected options.             |
| [value](#value)                    | `value`                    |           | `string`              | "undefined" | The value of the selected option. In multi-select mode, this is a JSON stringified array of selected option values. |

## Methods

| Method               | Type                          | Description                                      |
|----------------------|-------------------------------|--------------------------------------------------|
| [reset](#reset)              | `(): void`                    | Resets the menu to its initial state.<br />This is the only way to return value to undefined. |
| [updateActiveOption](#updateActiveOption) | `(option: HTMLElement): void` | Updates the currently active option in the menu.<br /><br />**option**: The option to set as active. |

## Events

| Event                         | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `auroMenu-activatedOption`    | `CustomEvent<Element>`                           | Notifies that a menuoption has been made `active`. |
| `auroMenu-customEventFired`   | `CustomEvent<any>`                               | Notifies that a custom event has been fired.     |
| `auroMenu-deselectPrevented`  | `CustomEvent<{ values: HTMLElement[] }>`         | Notifies that deselection was prevented and includes the affected options in `detail.values`. |
| `auroMenu-loadingChange`      | `CustomEvent<{ loading: boolean; hasLoadingPlaceholder: boolean; }>` | Notifies when the loading attribute is changed.  |
| `auroMenu-optionsChange`      | `CustomEvent<{ options: any; }>`                 |                                                  |
| `auroMenu-selectValueFailure` | `CustomEvent<any>`                               | Notifies that an attempt to select a menuoption by matching a value has failed. |
| `auroMenu-selectValueReset`   | `CustomEvent<any>`                               | Notifies that the component value has been reset. |
| `auroMenu-selectedOption`     | `CustomEvent<any>`                               | Notifies that a new menuoption selection has been made. |

## Slots

| Name          | Description                                 |
|---------------|---------------------------------------------|
|               | Slot for insertion of menu options.         |
| [loadingIcon](#loadingIcon) | Icon to show while loading attribute is set |
| [loadingText](#loadingText) | Text to show while loading attribute is set |

# auro-menuoption

The `auro-menuoption` element provides users a way to define a menu option.

## Properties

| Property      | Attribute  | Modifiers | Type      | Default | Description                                      |
|---------------|------------|-----------|-----------|---------|--------------------------------------------------|
| [disabled](#disabled)    | `disabled` |           | `boolean` | false   | When true, disables the menu option.             |
| [iconTag](#iconTag)     |            |           |           |         |                                                  |
| [isActive](#isActive)    |            | readonly  | `boolean` |         | Returns whether the menu option is currently active and selectable.<br />An option is considered active if it is not hidden, not disabled, and not static. |
| [key](#key)         | `key`      |           | `string`  |         | Allows users to set a unique key for the menu option for specified option selection. If no key is provided, the value property will be used. |
| [noMatch](#noMatch)     | `nomatch`  |           | `boolean` | false   | When true, marks this option as the "no matching results" placeholder shown by combobox when the user's input does not match any available options. Enables distinct styling and prevents the option from being treated as a selectable match. |
| [selected](#selected)    | `selected` |           | `boolean` | false   | Specifies that an option is selected.            |
| [tabIndex](#tabIndex)    | `tabIndex` |           | `number`  |         | Specifies the tab index of the menu option.      |
| [unsubscribe](#unsubscribe) |            |           | `number`  | null    |                                                  |
| [value](#value)       | `value`    |           | `string`  |         | Specifies the value to be sent to a server.      |

## Methods

| Method                | Type                          | Description                                      |
|-----------------------|-------------------------------|--------------------------------------------------|
| [attachTo](#attachTo)            | `(service: Object): void`     | Attaches this menu option to a menu service and subscribes to its events.<br />This method enables the option to participate in menu selection and highlighting logic.<br /><br />**service**: The menu service instance to attach to. |
| [bindEvents](#bindEvents)          | `(): void`                    | Sets up event listeners for user interaction with the menu option.<br />This function enables click and mouse enter events to trigger selection and highlighting logic. |
| [handleMenuChange](#handleMenuChange)    | `(event: Object): void`       | Handles changes from the menu service and updates the option's state.<br />This function synchronizes the option's properties and selection/highlight state with menu events.<br /><br />**event**: The event object from the menu service. |
| [setInternalSelected](#setInternalSelected) | `(isSelected: boolean): void` | Updates the internal selected state of the menu option bypassing 'updated' and triggers custom events if selected.<br />This function ensures the option's selection state is synchronized with menu logic and notifies listeners.<br /><br />**isSelected**: Whether the option should be marked as selected. |
| [setSelected](#setSelected)         | `(isSelected: boolean): void` | Sets the selected state of the menu option.<br />This function updates whether the option is currently selected.<br /><br />**isSelected**: Whether the option should be marked as selected. |
| [updateActive](#updateActive)        | `(isActive: boolean): void`   | Updates the active state and visual highlighting of the menu option.<br />This function toggles the option's active status and applies or removes the active CSS class.<br /><br />**isActive**: Whether the option should be marked as active. |

## Events

| Event                      | Type                | Description                                      |
|----------------------------|---------------------|--------------------------------------------------|
| `auroMenuOption-click`     | `CustomEvent<this>` |                                                  |
| `auroMenuOption-mouseover` | `CustomEvent<this>` | Notifies that this option has been hovered over. |

## Slots

| Name      | Description                                |
|-----------|--------------------------------------------|
| [default](#default) | The default slot for the menu option text. |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Deselect Option

When set, the `allowDeselect` attribute allows the user to click on a selected menu option again to deselect it when the menu is not in multi-select mode.

When the menu is in multi-select mode, this attribute has no effect and the user will be able to deselect the last remaining selected option.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/allow-deselect.html) -->
<!-- The below content is automatically added from ./../apiExamples/allow-deselect.html -->
<auro-menu allowDeselect>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/allow-deselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/allow-deselect.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu allowDeselect&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

The `auro-menu` element with `disabled` will mark all `auro-menuoption` elements as disabled.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-menu.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled-menu.html -->
<auro-menu disabled>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab">Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share">Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-menu.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled-menu.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu disabled&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab"&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share"&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Single Disabled Option

The `auro-menuoption` element supports the placement of the `disabled` attribute per option. A fully disabled list would be managed in an outer wrapping drop down menu element.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-menu>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share" disabled>Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab" disabled&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share" disabled&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Keys

When setting the `value` property, matches are actually performed on the value of the `key` property of the `auro-menuoption` and not the `value` property. By default, the value of `key` is equal to the value of the `value` property. However, for advanced use cases, the `key` value can be overriden to allow for more specific matches.

In the below example, there is a list of "popular" options at the top, with the same values repeated underneath. To allow more specific selections, we can add a `key` attribute to the top options to allow them to be more specifically selected, or to prevent them from interfering with matches on the lower options.

In the below example, setting the value of the menu `'stops'` will select the bottom-most option with the value `'stops'`, and setting the value of menu to `'stops-top'` will select the top-most option with the value `'stops'` since the key now differs from the value. In either case, the resulting value of the menu will be `'stops'` because the resulting value of the menu is based on the `value` property and not the `key` property.

Due to a limitation with Lit change detection to the `value` property, if multiple options with the same exist and one is selected, you must first clear the current value before attempting to select another option with the same value, even if the keys are unique. See code example below.

_Note: Since the value passed to the `value` property when programmatically setting it is overwritten with the proper derived value once the menu has updated, note that it will take one lifecycle before the `value` property is updated to the value that represents the actual menu state._

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/keys.html) -->
<!-- The below content is automatically added from ./../apiExamples/keys.html -->
<auro-button id="stopsTopButton">Call `menu.value = 'stops-top'`</auro-button>
<auro-button id="stopsButton">Call `menu.value = 'stops'`</auro-button>
<auro-menu id="keys-menu">
<auro-menuoption value="stops" key="stops-top">Stops</auro-menuoption>
<auro-menuoption value="price" key="price-top">Price</auro-menuoption>
<hr>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
</auro-menu>
<p id="output" class="body-sm"></p>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/keys.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/keys.html -->

<pre class="language-html"><code class="language-html">&lt;auro-button id="stopsTopButton"&gt;Call `menu.value = 'stops-top'`&lt;/auro-button&gt;
&lt;auro-button id="stopsButton"&gt;Call `menu.value = 'stops'`&lt;/auro-button&gt;
&lt;auro-menu id="keys-menu"&gt;
  &lt;auro-menuoption value="stops" key="stops-top"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price" key="price-top"&gt;Price&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;
&lt;p id="output" class="body-sm"&gt;&lt;/p&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/keys.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/keys.js -->

<pre class="language-js"><code class="language-js">export function initKeysExample() {
  const menu = document.getElementById('keys-menu');
  const stopsButton = document.getElementById('stopsButton');
  const stopsTopButton = document.getElementById('stopsTopButton');
  const output = document.getElementById('output');
​
  const createConsoleEntry = (message) =&gt; {
    const node = document.createElement('span');
    node.innerHTML = message;
    output.appendChild(node);
    output.appendChild(document.createElement('br'));
  };
​
  const resetConsole = () =&gt; {
    output.innerHTML = '';
  };
​
  const updateMenuValue = (value) =&gt; {
    resetConsole();
    createConsoleEntry(`Setting menu.value: &lt;em&gt;"${value}"&lt;/em&gt;`);
    menu.value = '';
    menu.value = value;
    createConsoleEntry(`menu.value before next lifecycle: &lt;em&gt;"${menu.value}"&lt;/em&gt;`);
    setTimeout(() =&gt; {
      createConsoleEntry(`menu.value after lifecycle: &lt;em&gt;"${menu.value}"&lt;/em&gt;`);
    });
  };
​
  stopsButton.addEventListener('click', () =&gt; {
    updateMenuValue('stops');
  });
​
  stopsTopButton.addEventListener('click', () =&gt; {
    updateMenuValue('stops-top');
  });
};</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Loading

While content is loading, the menu can either remain empty or display a loading placeholder

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
<!-- The below content is automatically added from ./../apiExamples/loading.html -->
<auro-button id="loadingExampleToggleButton">Toggle Loading</auro-button>
<table id="loadingExampleTable">
<thead>
<tr>
<td width="25%">Spinner + Text</td>
<td width="25%">Text Only</td>
<td width="25%">Spinner Only</td>
<td width="25%">None</td>
</tr>
</thead>
<tr>
<td>
<auro-menu>
<auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
</td>
<td>
<auro-menu>
<span slot="loadingText">Loading...</span>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
</td>
<td>
<auro-menu>
<auro-loader slot="loadingIcon" orbit xs></auro-loader>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
</td>
<td>
<auro-menu>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
</td>
</tr>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.html -->

<pre class="language-html"><code class="language-html">&lt;auro-button id="loadingExampleToggleButton"&gt;Toggle Loading&lt;/auro-button&gt;
&lt;table id="loadingExampleTable"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;td width="25%"&gt;Spinner + Text&lt;/td&gt;
      &lt;td width="25%"&gt;Text Only&lt;/td&gt;
      &lt;td width="25%"&gt;Spinner Only&lt;/td&gt;
      &lt;td width="25%"&gt;None&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tr&gt;
    &lt;td&gt;
      &lt;auro-menu&gt;
        &lt;auro-loader slot="loadingIcon" orbit xs&gt;&lt;/auro-loader&gt;&lt;span slot="loadingText"&gt;Loading...&lt;/span&gt;
        &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/td&gt;
    &lt;td&gt;
      &lt;auro-menu&gt;
        &lt;span slot="loadingText"&gt;Loading...&lt;/span&gt;
        &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/td&gt;
    &lt;td&gt;
      &lt;auro-menu&gt;
        &lt;auro-loader slot="loadingIcon" orbit xs&gt;&lt;/auro-loader&gt;
        &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/td&gt;
    &lt;td&gt;
      &lt;auro-menu&gt;
        &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
        &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
      &lt;/auro-menu&gt;
    &lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/loading.js -->

<pre class="language-js"><code class="language-js">export function auroMenuLoadingExample() {
  document.querySelector("#loadingExampleToggleButton").addEventListener("click", () =&gt; {
    document.querySelectorAll("#loadingExampleTable auro-menu").forEach(menu =&gt; menu.toggleAttribute("loading"));
  });
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Match Word

Use the `matchWord` attribute to highlight string parts of each menuoption that are equal to `matchWord`. The matching algorithm is case insensitive (e.g., `n` matches `N`).

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-word.html) -->
<!-- The below content is automatically added from ./../apiExamples/match-word.html -->
<auro-input id="matchWordInput" required>
<span slot="label">Enter a value to match in the menu</span>
</auro-input>
<br />
<auro-menu id="matchWordMenu">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menu>
<auro-menuoption value="apples">Apples</auro-menuoption>
<auro-menuoption value="oranges">Oranges</auro-menuoption>
<auro-menuoption value="peaches">Peaches</auro-menuoption>
</auro-menu>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-word.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/match-word.html -->

<pre class="language-html"><code class="language-html">&lt;auro-input id="matchWordInput" required&gt;
  &lt;span slot="label"&gt;Enter a value to match in the menu&lt;/span&gt;
&lt;/auro-input&gt;
&lt;br /&gt;
&lt;auro-menu id="matchWordMenu"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="peaches"&gt;Peaches&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-word.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/match-word.js -->

<pre class="language-js"><code class="language-js">function updateMatch() {
  let matchWordMenu = document.querySelector('#matchWordMenu');
​
  matchWordMenu.matchWord = matchWordInput.value;
}
​
export function auroMenuMatchWordExample() {
  let matchWordInput = document.querySelector('#matchWordInput');
​
  matchWordInput.addEventListener('keyup', updateMatch);
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Multi-Select

The `auro-menu` supports a multi-select option. To use, place the `multiselect` attribute on the `<auro-menu>` element tag or update the `multiselect` property programmatically.

In multi-select mode, the `value` property will always return a valid JSON string that contains an array of selected values, e.g. `'["stops","duration","arrival"]'`, when accessed.

The value of the menu may be set via multiple methods when in multi-select mode: 
- Programmatically or via attribute by passing a valid JSON string that can be parsed using `JSON.parse`.
- Programmatically or via attribute by passing a single matching value in a string, e.g. `"stops"`.
- Programmatically by passing an array of string values, e.g. `["stops","duration","arrival"]`.

_Note: Other methods of setting the value may work but are not officially supported and may stop working unexpectedly._

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multi-select.html) -->
<!-- The below content is automatically added from ./../apiExamples/multi-select.html -->
<auro-menu multiselect>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multi-select.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/multi-select.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu multiselect&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### No Checkmark

Applying the `noCheckmark` attribute will prevent the check icon from being shown on the selected option. The left padding to reserve space for the checkmark is also removed.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nocheckmark.html) -->
<!-- The below content is automatically added from ./../apiExamples/nocheckmark.html -->
<auro-menu nocheckmark>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<hr>
<auro-menu>
<auro-menuoption value="apples">Apples</auro-menuoption>
<auro-menuoption value="oranges">Oranges</auro-menuoption>
<auro-menuoption value="pears">Pears</auro-menuoption>
<auro-menuoption value="grapes">Grapes</auro-menuoption>
<auro-menuoption value="kiwi">Kiwi</auro-menuoption>
<hr>
<auro-menu>
<auro-menuoption value="person">Person</auro-menuoption>
<auro-menuoption value="woman">Woman</auro-menuoption>
<auro-menuoption value="man">Man</auro-menuoption>
<auro-menuoption value="camera">Camera</auro-menuoption>
<auro-menuoption value="tv">TV</auro-menuoption>
</auro-menu>
</auro-menu>
<hr>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<hr>
<auro-menu>
<auro-menuoption value="cars">Cars</auro-menuoption>
<auro-menuoption value="trucks">Trucks</auro-menuoption>
<auro-menuoption value="boats">Boats</auro-menuoption>
<auro-menuoption value="planes">Planes</auro-menuoption>
<auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
</auro-menu>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nocheckmark.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/nocheckmark.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu nocheckmark&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pears"&gt;Pears&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="grapes"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="kiwi"&gt;Kiwi&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu&gt;
      &lt;auro-menuoption value="person"&gt;Person&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="woman"&gt;Woman&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="man"&gt;Man&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="camera"&gt;Camera&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="tv"&gt;TV&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-menu&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu&gt;
    &lt;auro-menuoption value="cars"&gt;Cars&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="trucks"&gt;Trucks&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="boats"&gt;Boats&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="planes"&gt;Planes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="motorcycles"&gt;Motorcycles&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Select All Matching Options

Use the `selectAllMatchingOptions` attribute to enable selecting all options with matching keys when `value` is set programmatically.

If not set, only the first matching option will be selected.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/select-all-matching-options.html) -->
<!-- The below content is automatically added from ./../apiExamples/select-all-matching-options.html -->
<p>With <code>selectAllMatchingOptions</code> enabled:</p>
<auro-button id="selectAllBtn">Set <code>menu.value</code> to <code>'stops'</code></auro-button>
<auro-button id="resetAllBtn">Reset Menu</auro-button>
<auro-menu multiselect selectAllMatchingOptions id="selectAllMenu">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<hr>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
</auro-menu>
<br/>
<br/>
<br/>
<p>Without <code>selectAllMatchingOptions</code> enabled:</p>
<auro-button id="selectFirstBtn">Set <code>menu.value</code> to <code>'stops'</code></auro-button>
<auro-button id="resetFirstBtn">Reset Menu</auro-button>
<auro-menu multiselect id="selectFirstMenu">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<hr>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/select-all-matching-options.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/select-all-matching-options.html -->

<pre class="language-html"><code class="language-html">&lt;p&gt;With &lt;code&gt;selectAllMatchingOptions&lt;/code&gt; enabled:&lt;/p&gt;
&lt;auro-button id="selectAllBtn"&gt;Set &lt;code&gt;menu.value&lt;/code&gt; to &lt;code&gt;'stops'&lt;/code&gt;&lt;/auro-button&gt;
&lt;auro-button id="resetAllBtn"&gt;Reset Menu&lt;/auro-button&gt;
&lt;auro-menu multiselect selectAllMatchingOptions id="selectAllMenu"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;
&lt;br/&gt;
&lt;br/&gt;
&lt;br/&gt;
&lt;p&gt;Without &lt;code&gt;selectAllMatchingOptions&lt;/code&gt; enabled:&lt;/p&gt;
&lt;auro-button id="selectFirstBtn"&gt;Set &lt;code&gt;menu.value&lt;/code&gt; to &lt;code&gt;'stops'&lt;/code&gt;&lt;/auro-button&gt;
&lt;auro-button id="resetFirstBtn"&gt;Reset Menu&lt;/auro-button&gt;
&lt;auro-menu multiselect id="selectFirstMenu"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/select-all-matching-options.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/select-all-matching-options.js -->

<pre class="language-js"><code class="language-js">export const initSelectAllMatchingOptionsExample = () =&gt; {
​
  const selectAllBtn = document.getElementById('selectAllBtn');
  const selectAllMenu = document.getElementById('selectAllMenu');
  const selectFirstBtn = document.getElementById('selectFirstBtn');
  const selectFirstMenu = document.getElementById('selectFirstMenu');
  const resetAllBtn = document.getElementById('resetAllBtn');
  const resetFirstBtn = document.getElementById('resetFirstBtn');
​
  selectAllBtn.addEventListener('click', () =&gt; {
    selectAllMenu.value = 'stops';
  });
​
  resetAllBtn.addEventListener('click', () =&gt; {
    selectAllMenu.reset();
  });
​
  selectFirstBtn.addEventListener('click', () =&gt; {
    selectFirstMenu.value = 'stops';
  });
​
  resetFirstBtn.addEventListener('click', () =&gt; {
    selectFirstMenu.reset();
  });
};</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Preselect Option

The `auro-menu` element supports a pre-selected option via the `selected` attribute on the `auro-menuoption` element.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preselect.html) -->
<!-- The below content is automatically added from ./../apiExamples/preselect.html -->
<auro-menu>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window" selected>New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share" disabled>Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preselect.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preselect.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window" selected&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab" disabled&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share" disabled&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### Scroll

When setting the `max-height` of `auro-menu`, all of the overflowing content can be accessed via a scrollbar.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/scroll.html) -->
<!-- The below content is automatically added from ./../apiExamples/scroll.html -->
<auro-menu id="alpha" style="max-height: 200px">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<hr>
<auro-menu id="beta">
<auro-menuoption value="apples">Apples</auro-menuoption>
<auro-menuoption value="oranges">Oranges</auro-menuoption>
<auro-menuoption value="pears">Pears</auro-menuoption>
<auro-menuoption value="grapes">Grapes</auro-menuoption>
<auro-menuoption value="kiwi">Kiwi</auro-menuoption>
<hr>
<auro-menu id="charlie">
<auro-menuoption value="person">Person</auro-menuoption>
<auro-menuoption value="woman">Woman</auro-menuoption>
<auro-menuoption value="man">Man</auro-menuoption>
<auro-menuoption value="camera">Camera</auro-menuoption>
<auro-menuoption value="tv">TV</auro-menuoption>
</auro-menu>
</auro-menu>
<hr>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<hr>
<auro-menu id="delta">
<auro-menuoption value="cars">Cars</auro-menuoption>
<auro-menuoption value="trucks">Trucks</auro-menuoption>
<auro-menuoption value="boats">Boats</auro-menuoption>
<auro-menuoption value="planes">Planes</auro-menuoption>
<auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
</auro-menu>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/scroll.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/scroll.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu id="alpha" style="max-height: 200px"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu id="beta"&gt;
    &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pears"&gt;Pears&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="grapes"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="kiwi"&gt;Kiwi&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu id="charlie"&gt;
      &lt;auro-menuoption value="person"&gt;Person&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="woman"&gt;Woman&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="man"&gt;Man&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="camera"&gt;Camera&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="tv"&gt;TV&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-menu&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu id="delta"&gt;
    &lt;auro-menuoption value="cars"&gt;Cars&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="trucks"&gt;Trucks&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="boats"&gt;Boats&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="planes"&gt;Planes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="motorcycles"&gt;Motorcycles&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Options with Horizontal Separator

To create a natural separation between options, simply use a `<hr>` element.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hr.html) -->
<!-- The below content is automatically added from ./../apiExamples/hr.html -->
<auro-menu>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab">Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share">Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hr.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/hr.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab"&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share"&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Submenu / Nested Menu

The `auro-menu` element supports the placement of an `auro-menu` inside of another `auro-menu`. There is no technical limit to the level of nesting.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nested-menu.html) -->
<!-- The below content is automatically added from ./../apiExamples/nested-menu.html -->
<auro-menu id="alpha">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<hr>
<auro-menu id="beta">
<auro-menuoption value="apples">Apples</auro-menuoption>
<auro-menuoption value="oranges">Oranges</auro-menuoption>
<auro-menuoption value="pears">Pears</auro-menuoption>
<auro-menuoption value="grapes">Grapes</auro-menuoption>
<auro-menuoption value="kiwi">Kiwi</auro-menuoption>
<hr>
<auro-menu id="charlie">
<auro-menuoption value="person">Person</auro-menuoption>
<auro-menuoption value="woman">Woman</auro-menuoption>
<auro-menuoption value="man">Man</auro-menuoption>
<auro-menuoption value="camera">Camera</auro-menuoption>
<auro-menuoption value="tv">TV</auro-menuoption>
</auro-menu>
</auro-menu>
<hr>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
<hr>
<auro-menu id="delta">
<auro-menuoption value="cars">Cars</auro-menuoption>
<auro-menuoption value="trucks">Trucks</auro-menuoption>
<auro-menuoption value="boats">Boats</auro-menuoption>
<auro-menuoption value="planes">Planes</auro-menuoption>
<auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
</auro-menu>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nested-menu.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/nested-menu.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu id="alpha"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration"&gt;Duration&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu id="beta"&gt;
    &lt;auro-menuoption value="apples"&gt;Apples&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="oranges"&gt;Oranges&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="pears"&gt;Pears&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="grapes"&gt;Grapes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="kiwi"&gt;Kiwi&lt;/auro-menuoption&gt;
    &lt;hr&gt;
    &lt;auro-menu id="charlie"&gt;
      &lt;auro-menuoption value="person"&gt;Person&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="woman"&gt;Woman&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="man"&gt;Man&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="camera"&gt;Camera&lt;/auro-menuoption&gt;
      &lt;auro-menuoption value="tv"&gt;TV&lt;/auro-menuoption&gt;
    &lt;/auro-menu&gt;
  &lt;/auro-menu&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menu id="delta"&gt;
    &lt;auro-menuoption value="cars"&gt;Cars&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="trucks"&gt;Trucks&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="boats"&gt;Boats&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="planes"&gt;Planes&lt;/auro-menuoption&gt;
    &lt;auro-menuoption value="motorcycles"&gt;Motorcycles&lt;/auro-menuoption&gt;
  &lt;/auro-menu&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Restricted Width and Long Option

The `auro-menu` element supports scenarios where the outer parent element of the menu constrains its width and there are options with text longer than the pull down menu will support. Truncated content will be illustrated with an ellipsis.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/restricted-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/restricted-width.html -->
<auro-menu style="width: 300px">
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab">Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as 'option_10_redevelopment_hover_scenario.png'</auro-menuoption>
<hr>
<auro-menuoption value="share">Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/restricted-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/restricted-width.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu style="width: 300px"&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab"&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as 'option_10_redevelopment_hover_scenario.png'&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share"&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Hidden Options

The `auro-menuoption` element supports scenarios where the menu option needs to be hidden. e.g. the only visible menu options contain the `matchWord`.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hidden.html) -->
<!-- The below content is automatically added from ./../apiExamples/hidden.html -->
<auro-menu>
<auro-menuoption value="new tab">New tab</auro-menuoption>
<auro-menuoption value="new window">New window</auro-menuoption>
<auro-menuoption value="open file">Open file</auro-menuoption>
<auro-menuoption value="open location">Open location</auro-menuoption>
<hr>
<auro-menuoption value="close window">Close window</auro-menuoption>
<auro-menuoption value="close tab" hidden>Close tab</auro-menuoption>
<auro-menuoption value="save page as...">Save page as...</auro-menuoption>
<hr>
<auro-menuoption value="share" disabled>Share</auro-menuoption>
<hr>
<auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hidden.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/hidden.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu&gt;
  &lt;auro-menuoption value="new tab"&gt;New tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="new window"&gt;New window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open file"&gt;Open file&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="open location"&gt;Open location&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="close window"&gt;Close window&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="close tab" hidden&gt;Close tab&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="save page as..."&gt;Save page as...&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="share" disabled&gt;Share&lt;/auro-menuoption&gt;
  &lt;hr&gt;
  &lt;auro-menuoption value="print"&gt;Print&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Reset Menu Selection State

The `auro-menu` may be reset to a state with no menuoption selected by setting the `value` to `undefined`.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset.html) -->
<!-- The below content is automatically added from ./../apiExamples/reset.html -->
<auro-menu id="resetExample">
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration" selected>Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<br/><br/>
<auro-button id="resetExampleBtn">RESET</auro-button>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset.html -->

<pre class="language-html"><code class="language-html">&lt;auro-menu id="resetExample"&gt;
  &lt;auro-menuoption value="stops"&gt;Stops&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="price"&gt;Price&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="duration" selected&gt;Duration&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="departure"&gt;Departure&lt;/auro-menuoption&gt;
  &lt;auro-menuoption value="arrival"&gt;Arrival&lt;/auro-menuoption&gt;
&lt;/auro-menu&gt;
&lt;br/&gt;&lt;br/&gt;
&lt;auro-button id="resetExampleBtn"&gt;RESET&lt;/auro-button&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset.js) -->
<!-- The below code snippet is automatically added from ./../apiExamples/reset.js -->

<pre class="language-js"><code class="language-js">export function auroMenuResetExample() {
  const resetExampleBtnElem = document.querySelector('#resetExampleBtn');
  const resetExampleElem = document.querySelector('#resetExample');
​
  if (resetExampleElem &amp;&amp; resetExampleBtnElem) {
    resetExampleBtnElem.addEventListener('click', () =&gt; {
      resetExampleElem.reset();
    });
  }
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
