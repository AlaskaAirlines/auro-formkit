<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Counter

#### Min/Max and Value
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-minmax.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-minmax.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Disabled State
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/counter-disabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/counter-disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Counter Group

#### Group Properties
All available counter-group properties:

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/api-group-properties.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/api-group-properties.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Available Slots
All available slots for both components:

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/api-slots.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/api-slots.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Event Handling
Listen for `input` events to react to user interactions.

<code id="eventOutput">
  Event values will appear here
</code><br><br>

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/events.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/events.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

----

```javascript
const counter = document.getElementById('eventExample');
counter.addEventListener('input', (event) => {
  console.log(`Values updated: ${JSON.stringify(event.detail)}`);
});
```

</auro-accordion>

#### Custom Value Display
<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-value-text.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-value-text.html) -->
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Group Max/Min

The group counter max or min property sets the value for all counters in the group. If a counter has a max value set, the group max attribute will override it. All increment buttons as a result will be disabled to prevent the group of counters from exceeding the group max.

**Example has group max set to 12**

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/group-max.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/group-max.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Counter Max/Min

You can also individually set the max or min value for each counter in a group.

**Example has group max set to 12**

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/group-counter-max.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/group-counter-max.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Dropdown with fullscreen bib

You can make the dropdown open in fullscreen at a specific breakpoint by setting `fullscreenBreakpoint`.

The default value of `fullscreenBreakpoint` is `sm`. 

Breakpoint token can be found [here](https://auro.alaskaair.com/getting-started/developers/design-tokens)

To support fullcreen bib, setting `bib.fullscreen.headline` is **STRONGLY RECOMMENDED**.
You can also set `bib.fullscreen.footer` to add any additional options on fullscreen view.


<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-mobile-properties.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>


<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-mobile-properties.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>
