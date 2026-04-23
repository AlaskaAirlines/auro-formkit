<auro-header level="1" id="overview">Combobox - Layout</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">

### Component Anatomy

The `auro-combobox` component is composed of two key parts:

- **Trigger** — The visible, interactive input element that the user types into or clicks to expand the component. The trigger displays the current selection, user input, or placeholder text.
- **Bib** — The expandable panel that appears when the trigger is activated. The bib contains the menu options that the user may select by clicking on them.

When the trigger is activated, the bib expands to reveal the available options. As the user types, the options are filtered to match the input. Selecting an option from the bib updates the trigger's displayed value and collapses the bib.

### Shape | Size | Layout Support

The `auro-combobox` component supports the `shape`, `size` and `layout` feature set. The component defaults to the `layout="classic"`, `shape="classic"` and `size="lg"`.

#### Classic Layout (Legacy)

The `classic` layout is default for `auro-combobox`. No customization is needed to achieve this look.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Emphasized Layout

The `emphasized` layout is only supported on light backgrounds.

The `emphasized` layout supports the following shapes:
- `pill`
- `pill-left`
- `pill-right`

The `emphasized` layout supports the following sizes:
- `xl`

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Snowflake Layout

The `snowflake` layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.

The `snowflake` layout is only expected to be used on dark backgrounds, in conjunction with `appearance="inverse"`.

<div class="exampleWrapper--ondark">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

    </div>
  </div>
</div>
