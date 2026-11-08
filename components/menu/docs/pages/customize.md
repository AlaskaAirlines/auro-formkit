<auro-header level="1" id="overview">Menu - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#restrictedWidth" class="level2 body-xs">Restricted width</auro-anchorlink>
      <auro-anchorlink fluid href="#scroll" class="level2 body-xs">Scroll</auro-anchorlink>
      <auro-anchorlink fluid href="#nocheckmark" class="level2 body-xs">No checkmark</auro-anchorlink>
      <auro-anchorlink fluid href="#dividers" class="level2 body-xs">Dividers</auro-anchorlink>
      <auro-anchorlink fluid href="#nestedMenu" class="level2 body-xs">Nested menu</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#static" class="level2 body-xs">Static options</auro-anchorlink>
      <auro-anchorlink fluid href="#matchWord" class="level2 body-xs">Match word</auro-anchorlink>
      <auro-anchorlink fluid href="#persistent" class="level2 body-xs">Persistent option</auro-anchorlink>
      <auro-anchorlink fluid href="#nomatch" class="level2 body-xs">No match placeholder</auro-anchorlink>
      <auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled options</auro-anchorlink>
      <auro-anchorlink fluid href="#disabledMenu" class="level2 body-xs">Disabled menu</auro-anchorlink>
      <auro-anchorlink fluid href="#loading" class="level2 body-xs">Loading</auro-anchorlink>
      <auro-anchorlink fluid href="#hidden" class="level2 body-xs">Hidden options</auro-anchorlink>
      <auro-anchorlink fluid href="#multiselect" class="level2 body-xs">Multi-select</auro-anchorlink>
      <auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset value</auro-anchorlink>
      <auro-anchorlink fluid href="#presetValueMultiselect" class="level2 body-xs">Preset value (multi-select)</auro-anchorlink>
      <auro-anchorlink fluid href="#nonUniqueValues" class="level2 body-xs">Non-unique option values</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>Restyle the component by overriding the following CSS custom properties (design tokens).</p>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/default/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="restrictedWidth">Restricted width</auro-header>
        <p>Use inline styles or a wrapping container to restrict the width of the menu. Long option text doesn't wrap: it's cut off with an ellipsis.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/restricted-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/restricted-width.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="scroll">Scroll</auro-header>
        <p>Use <code>max-height</code> to constrain the menu height. When options overflow the container, the menu becomes scrollable.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/scroll.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/scroll.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="nocheckmark">No checkmark</auro-header>
        <p>Use the <code>nocheckmark</code> attribute to hide the selection checkmark icon on menu options.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nocheckmark.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nocheckmark.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="dividers">Dividers</auro-header>
        <p>Insert standard <code>&lt;hr&gt;</code> elements between <code>auro-menuoption</code> elements to create visual group separators. Dividers can't be selected, and keyboard navigation skips them.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hr.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hr.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="nestedMenu">Nested menu</auro-header>
        <p>Nest additional <code>auro-menu</code> elements inside the default slot to create indented groups of options. The outermost menu owns the selection for every option, including options in nested menus.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nested-menu.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nested-menu.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="customBehavior">Behavior</auro-header>
        <auro-header level="3" id="static">Static options</auro-header>
        <p>Add the <code>static</code> attribute to an <code>auro-menuoption</code> to make it non-interactive: the option renders, but keyboard navigation skips it and it can't be selected. Use it for section headings or informational rows inside a menu.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/static.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/static.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="matchWord">Match word</auro-header>
        <p>Set the <code>matchWord</code> property to a string, and any option whose text contains it, ignoring case, shows the matching part in bold. Set it from an input's <code>keyup</code> handler to highlight matches as someone types. <code>&lt;auro-combobox&gt;</code> sets it for you.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-word.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-word.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="persistent">Persistent option</auro-header>
        <p>Add the <code>persistent</code> attribute to an <code>auro-menuoption</code> to opt it out of <code>matchWord</code> highlighting. The option remains fully interactive, but its label is never rewritten. Use it for utility rows, such as "Add new…", that should render the same whatever the filter string is.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persistent.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persistent.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="nomatch">No match placeholder</auro-header>
        <p>Add the <code>nomatch</code> attribute to an option to mark it as the "no matching results" row. <code>&lt;auro-combobox&gt;</code> shows it only when nothing matches what someone typed, and hides it otherwise. On its own, <code>auro-menu</code> shows it like any other option.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nomatch.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nomatch.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disabled">Disabled options</auro-header>
        <p>Use the <code>disabled</code> attribute on <code>auro-menuoption</code> to prevent interaction with specific options.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disabledMenu">Disabled menu</auro-header>
        <p>Use the <code>disabled</code> attribute on <code>auro-menu</code> to disable the entire menu and all of its options.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled-menu.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled-menu.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="loading">Loading</auro-header>
        <p>Use the <code>loading</code> attribute on <code>auro-menu</code> to indicate that options are being fetched asynchronously. Optional <code>loadingIcon</code> and <code>loadingText</code> slots let you customize the placeholder: a spinner, a message, both, or neither.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="hidden">Hidden options</auro-header>
        <p>Use the <code>hidden</code> attribute on <code>auro-menuoption</code> to hide an option from view and from screen readers while keeping it in the DOM. Keyboard navigation skips hidden options, but the menu's <code>value</code> and <code>selectByValue()</code> can still select them.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hidden.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hidden.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="multiselect">Multi-select</auro-header>
        <p>Use the <code>multiselect</code> attribute on <code>auro-menu</code> to let people select more than one option. Choosing a selected option again deselects it.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multi-select.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multi-select.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="presetValue">Preset value</auro-header>
        <p>Use the <code>value</code> attribute on <code>auro-menu</code> to set the selected option when the menu renders. The value must match a selectable option; if it matches an option marked <code>disabled</code> or <code>static</code>, no option is selected and <code>auroMenu-selectValueFailure</code> fires.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="presetValueMultiselect">Preset value with multi-select</auro-header>
        <p>When using <code>multiselect</code>, set the <code>value</code> attribute to a JSON stringified array of values to pre-select multiple options.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value-multiselect.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value-multiselect.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="nonUniqueValues">Non-unique option values</auro-header>
        <p>Two or more <code>auro-menuoption</code> elements may share the same <code>value</code>. This is common when the <code>value</code> represents a coarser grouping than the option label, such as several airports that all serve the same city. The menu tracks the specific option a user selects rather than resolving by <code>value</code> alone, so selecting one of several options that share a <code>value</code> highlights exactly the option that was chosen.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <p>In <code>multiselect</code> mode, options that share a <code>value</code> are tracked independently, so each can be selected and removed on its own. Selections are stored in DOM order regardless of the order in which they were chosen.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/duplicate-values-multiselect.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/duplicate-values-multiselect.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
