<auro-header level="1" id="overview">Menu - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#restrictedWidth" class="level2 body-xs">Restricted Width</auro-anchorlink>
      <auro-anchorlink fluid href="#scroll" class="level2 body-xs">Scroll</auro-anchorlink>
      <auro-anchorlink fluid href="#nocheckmark" class="level2 body-xs">No Checkmark</auro-anchorlink>
      <auro-anchorlink fluid href="#dividers" class="level2 body-xs">Dividers</auro-anchorlink>
      <auro-anchorlink fluid href="#nestedMenu" class="level2 body-xs">Nested Menu</auro-anchorlink>
      <auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#static" class="level2 body-xs">Static Options</auro-anchorlink>
      <auro-anchorlink fluid href="#matchWord" class="level2 body-xs">Match Word</auro-anchorlink>
      <auro-anchorlink fluid href="#persistent" class="level2 body-xs">Persistent Option</auro-anchorlink>
      <auro-anchorlink fluid href="#nomatch" class="level2 body-xs">No Match Placeholder</auro-anchorlink>
      <auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled Options</auro-anchorlink>
      <auro-anchorlink fluid href="#disabledMenu" class="level2 body-xs">Disabled Menu</auro-anchorlink>
      <auro-anchorlink fluid href="#loading" class="level2 body-xs">Loading</auro-anchorlink>
      <auro-anchorlink fluid href="#hidden" class="level2 body-xs">Hidden Options</auro-anchorlink>
      <auro-anchorlink fluid href="#multiselect" class="level2 body-xs">Multi-Select</auro-anchorlink>
      <auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset Value</auro-anchorlink>
      <auro-anchorlink fluid href="#presetValueMultiselect" class="level2 body-xs">Preset Value (Multi)</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>The component may be restyled by overriding the following CSS custom properties (design tokens).</p>
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
        <auro-header level="3" id="restrictedWidth">Restricted Width</auro-header>
        <p>Use inline styles or a wrapping container to restrict the width of the menu. Long option text will wrap within the available space.</p>
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
        <auro-header level="3" id="nocheckmark">No Checkmark</auro-header>
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
        <p>Insert standard <code>&lt;hr&gt;</code> elements between <code>auro-menuoption</code> elements to create visual group separators. Dividers are non-interactive and are skipped during keyboard navigation.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hr.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hr.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="nestedMenu">Nested Menu</auro-header>
        <p>Nest additional <code>auro-menu</code> elements inside the default slot to create sub-menus. Each nested menu maintains its own selection state.</p>
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
        <auro-header level="3" id="static">Static Options</auro-header>
        <p>Add the <code>static</code> attribute to an <code>auro-menuoption</code> to make it non-interactive — the option renders but is skipped during keyboard navigation and cannot be selected. Useful for section headers or informational rows inside a menu.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/static.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/static.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="matchWord">Match Word</auro-header>
        <p>Set the <code>matchWord</code> property to a string, and any option whose text contains that substring will render the matching portion visually highlighted. Typically driven by an input's <code>keyup</code> handler to power real-time filtering — this is the mechanism <code>&lt;auro-combobox&gt;</code> uses to highlight matches as the user types.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-word.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-word.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="persistent">Persistent Option</auro-header>
        <p>Add the <code>persistent</code> attribute to an <code>auro-menuoption</code> to opt it out of <code>matchWord</code> highlighting. The option remains fully interactive but its label is never rewritten — useful for utility rows like "Add new…" that should render identically regardless of the current filter string.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/persistent.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/persistent.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="nomatch">No Match Placeholder</auro-header>
        <p>Mark an option with the <code>nomatch</code> attribute to designate it as the placeholder shown when no other options match the user's input. When paired with <code>&lt;auro-combobox&gt;</code>, the combobox toggles the <code>hidden</code> attribute on this option automatically based on filter results.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/nomatch.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/nomatch.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disabled">Disabled Options</auro-header>
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
        <auro-header level="3" id="disabledMenu">Disabled Menu</auro-header>
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
        <p>Use the <code>loading</code> attribute on <code>auro-menu</code> to indicate that options are being fetched asynchronously. Optional <code>loadingIcon</code> and <code>loadingText</code> slots let you customize the placeholder — a spinner, message, both, or neither.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/loading.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/loading.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="hidden">Hidden Options</auro-header>
        <p>Use the <code>hidden</code> attribute on <code>auro-menuoption</code> to visually hide an option while keeping it in the DOM.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/hidden.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/hidden.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="multiselect">Multi-Select</auro-header>
        <p>Use the <code>multiselect</code> attribute on <code>auro-menu</code> to allow multiple options to be selected simultaneously.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/multi-select.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/multi-select.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="presetValue">Preset Value</auro-header>
        <p>Use the <code>value</code> attribute on <code>auro-menu</code> to set the selected option when the menu renders. The value must match a selectable option; if it matches an option marked <code>disabled</code> or <code>static</code>, no option is selected and <code>auroMenu-selectValueFailure</code> is dispatched.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-value.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="presetValueMultiselect">Preset Value with Multi-Select</auro-header>
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
      </section>
    </div>
  </div>
</div>
