<auro-header level="1" id="overview">Dropdown - Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS Shadow Parts</auro-anchorlink>
<auro-anchorlink fluid href="#bibPosition" class="level2 body-xs">Bib Position</auro-anchorlink>
<auro-anchorlink fluid href="#fullscreenBreakpoint" class="level2 body-xs">Fullscreen Breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match Width</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#chevron" class="level2 body-xs">Chevron</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
<auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
<auro-anchorlink fluid href="#noToggle" class="level2 body-xs">No Toggle</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="background">Light vs. Dark Background</auro-header>
<p>The <code>appearance</code> attribute defines whether the component renders on lighter or darker backgrounds. Supported values are <code>default</code> and <code>inverse</code>. The default value is <code>default</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-dropdown aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-dropdown appearance="inverse" aria-label="custom label">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown appearance="inverse" aria-label="custom label"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>The component may be restyled by overriding the following CSS custom properties (design tokens).</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
​
:host(:not([ondark])),
:host(:not([appearance="inverse"])) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-muted, #{v.$ds-basic-color-texticon-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-bold, #{v.$ds-basic-color-border-bold});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
​
:host([ondark]),
:host([appearance="inverse"]) {
  --ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #{v.$ds-basic-color-texticon-inverse-muted});
  --ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-inverse, #{v.$ds-basic-color-border-inverse});
  --ds-auro-dropdown-trigger-outline-color: transparent;
  --ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
  --ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-dropdownbib-background-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-container-color: var(--ds-advanced-color-shared-background-inverse, #{v.$ds-advanced-color-shared-background-inverse});
  --ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-inverse, #{v.$ds-basic-color-texticon-inverse});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below content is automatically added from ./../apiExamples/custom-tokens.html -->
<style>
#customTokensDropdown {
--ds-auro-dropdown-label-text-color: #5b1a6e;
--ds-auro-dropdown-trigger-background-color: #e8d5f5;
--ds-auro-dropdown-trigger-hover-background-color: #d4b8e8;
--ds-auro-dropdown-trigger-container-color: #f3eaf8;
--ds-auro-dropdown-trigger-border-color: #7b2d8e;
--ds-auro-dropdown-trigger-outline-color: #c9a4db;
--ds-auro-dropdown-trigger-text-color: #7b2d8e;
--ds-auro-dropdownbib-boxshadow-color: rgba(123, 45, 142, 0.3);
--ds-auro-dropdownbib-background-color: #f3eaf8;
--ds-auro-dropdownbib-container-color: #f3eaf8;
--ds-auro-dropdownbib-text-color: #5b1a6e;
}
</style>
<auro-dropdown id="customTokensDropdown" layout="classic" shape="classic" size="lg" chevron aria-label="Custom styled dropdown">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
</div>
<span slot="helpText">Help text</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/custom-tokens.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/custom-tokens.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #customTokensDropdown {
    --ds-auro-dropdown-label-text-color: #5b1a6e;
    --ds-auro-dropdown-trigger-background-color: #e8d5f5;
    --ds-auro-dropdown-trigger-hover-background-color: #d4b8e8;
    --ds-auro-dropdown-trigger-container-color: #f3eaf8;
    --ds-auro-dropdown-trigger-border-color: #7b2d8e;
    --ds-auro-dropdown-trigger-outline-color: #c9a4db;
    --ds-auro-dropdown-trigger-text-color: #7b2d8e;
    --ds-auro-dropdownbib-boxshadow-color: rgba(123, 45, 142, 0.3);
    --ds-auro-dropdownbib-background-color: #f3eaf8;
    --ds-auro-dropdownbib-container-color: #f3eaf8;
    --ds-auro-dropdownbib-text-color: #5b1a6e;
  }
&lt;/style&gt;
&lt;auro-dropdown id="customTokensDropdown" layout="classic" shape="classic" size="lg" chevron aria-label="Custom styled dropdown"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;Help text&lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssParts">CSS Shadow Parts</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
<!-- The below content is automatically added from ./../docs/partials/customize/css-parts.md -->
<p>The following CSS shadow parts are available for styling:</p>
<table>
<thead>
<tr>
<th>Part</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>chevron</code></td>
<td>The collapsed/expanded state icon container.</td>
</tr>
<tr>
<td><code>helpText</code></td>
<td>The helpText content container.</td>
</tr>
<tr>
<td><code>size</code></td>
<td>The size of the dropdown bib (height, width, maxHeight, maxWidth only).</td>
</tr>
<tr>
<td><code>trigger</code></td>
<td>The trigger content container.</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ./../apiExamples/css-parts.html -->
<style>
#cssPartsDropdown::part(trigger) {
border: 2px dashed #7b2d8e;
border-radius: 8px;
padding: var(--ds-size-100);
}
#cssPartsDropdown::part(chevron) {
color: #7b2d8e;
}
#cssPartsDropdown::part(helpText) {
font-style: italic;
color: #5b1a6e;
}
#cssPartsDropdown::part(size) {
max-height: 200px;
}
</style>
<auro-dropdown id="cssPartsDropdown" layout="classic" shape="classic" size="lg" chevron aria-label="CSS parts styled dropdown">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
</div>
<span slot="helpText">Styled with ::part selectors</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #cssPartsDropdown::part(trigger) {
    border: 2px dashed #7b2d8e;
    border-radius: 8px;
    padding: var(--ds-size-100);
  }
  #cssPartsDropdown::part(chevron) {
    color: #7b2d8e;
  }
  #cssPartsDropdown::part(helpText) {
    font-style: italic;
    color: #5b1a6e;
  }
  #cssPartsDropdown::part(size) {
    max-height: 200px;
  }
&lt;/style&gt;
&lt;auro-dropdown id="cssPartsDropdown" layout="classic" shape="classic" size="lg" chevron aria-label="CSS parts styled dropdown"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;Styled with ::part selectors&lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="bibPosition">Bib Position</auro-header>
<p>Customize bib position with <code>placement</code>, <code>offset</code>, <code>noFlip</code>, <code>autoPlacement</code>, and <code>shift</code> attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
<style>
.floaterConfigDropdown::part(size) {
max-height: 200px;
}
</style>
<div aria-label="custom label">
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20" noFlip>
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<span slot="helpText">Trigger for bottom-end bib with 20px offset and noFlip</span>
</auro-dropdown>
</div>
<div aria-label="custom label">
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20">
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<div slot="helpText">
Trigger for bottom-end bib with 20px offset and flip
</div>
</auro-dropdown>
</div>
<div aria-label="custom label">
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="right" offset="20">
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<div slot="helpText">
Trigger for right bib with 20px offset and noFlip
</div>
</auro-dropdown>
</div>
<div aria-label="custom label">
<auro-dropdown width="350px" class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="bottom-start" shift offset="20">
<div width="500px">
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<div slot="trigger">
Trigger
</div>
<div slot="helpText">
Trigger for bottom-start bib with 20px offset, shift and noFlip
</div>
</auro-dropdown>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/floater-config.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/floater-config.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  .floaterConfigDropdown::part(size) {
    max-height: 200px;
  }
&lt;/style&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20" noFlip&gt;
    &lt;div&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;span slot="helpText"&gt;Trigger for bottom-end bib with 20px offset and noFlip&lt;/span&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20"&gt;
    &lt;div&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Trigger for bottom-end bib with 20px offset and flip
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="right" offset="20"&gt;
    &lt;div&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Trigger for right bib with 20px offset and noFlip
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&lt;div aria-label="custom label"&gt;
  &lt;auro-dropdown width="350px" class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="bottom-start" shift offset="20"&gt;
    &lt;div width="500px"&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
      &lt;p&gt;
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Trigger
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Trigger for bottom-start bib with 20px offset, shift and noFlip
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="fullscreenBreakpoint">Fullscreen Breakpoint</auro-header>
<p>Customize the breakpoint at which the dropdown switches to fullscreen mode with <code>fullscreenBreakpoint</code>. The default value is <code>sm</code>.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-dropdown id="fullscreen" fullscreenBreakpoint="sm" layout="classic" shape="classic" size="lg" chevron>
<div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
<auro-button id="fullscreenButton">
Dismiss Dropdown
</auro-button>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="fullscreen" fullscreenBreakpoint="sm" layout="classic" shape="classic" size="lg" chevron&gt;
  &lt;div&gt;
    &lt;p&gt;
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    &lt;/p&gt;
    &lt;p&gt;
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    &lt;/p&gt;
    &lt;p&gt;
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    &lt;/p&gt;
  &lt;/div&gt;
  &lt;auro-button id="fullscreenButton"&gt;
    Dismiss Dropdown
  &lt;/auro-button&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="matchWidth">Match Width</auro-header>
<p>When the <code>matchWidth</code> attribute is applied, the width of the dropdown bib will match the width of the trigger element.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/match-width.html -->
<auro-dropdown id="matchWidth" layout="classic" shape="classic" size="lg" matchWidth aria-label="Label content for screen reader">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="matchWidthButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/match-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="matchWidth" layout="classic" shape="classic" size="lg" matchWidth aria-label="Label content for screen reader"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="matchWidthButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
<section>
<auro-header level="2" id="customBehavior">Behavior</auro-header>
<auro-header level="3" id="chevron">Chevron</auro-header>
<p>Use the <code>chevron</code> attribute to add a chevron icon to the dropdown trigger indicating expand/collapse state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/chevron.html) -->
<!-- The below content is automatically added from ./../apiExamples/chevron.html -->
<auro-dropdown aria-label="custom label" chevron>
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/chevron.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/chevron.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" chevron&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="disabled">Disabled</auro-header>
<p>Use the <code>disabled</code> attribute to disable interaction with the dropdown.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-dropdown
aria-label="custom label"
disabled
chevron
layout="classic" shape="classic" size="lg">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Name
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
<auro-dropdown
aria-label="custom label"
disabled
appearance="inverse"
chevron
layout="classic" shape="classic" size="lg">
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Name
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  aria-label="custom label"
  disabled
  chevron
  layout="classic" shape="classic" size="lg"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Name
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  aria-label="custom label"
  disabled
  appearance="inverse"
  chevron
  layout="classic" shape="classic" size="lg"&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Name
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="error">Error</auro-header>
<p>Use the <code>error</code> attribute to apply a persistent error state styling on the dropdown.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-dropdown id="error" layout="classic" shape="classic" size="lg" error id="errorDropdownExample">
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="errorButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Element label (default text will be read by screen reader)
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
<auro-dropdown id="inverseError" appearance="inverse" layout="classic" shape="classic" size="lg" error>
<div style="padding: var(--ds-size-150);">
Lorem ipsum solar
<br />
<auro-button id="inverseErrorButton">
Dismiss Dropdown
</auro-button>
</div>
<span slot="helpText">
Help text
</span>
<span slot="label">
Element label (default text will be read by screen reader)
</span>
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="error" layout="classic" shape="classic" size="lg" error id="errorDropdownExample"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="errorButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Element label (default text will be read by screen reader)
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="inverseError" appearance="inverse" layout="classic" shape="classic" size="lg" error&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Lorem ipsum solar
    &lt;br /&gt;
    &lt;auro-button id="inverseErrorButton"&gt;
      Dismiss Dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Help text
  &lt;/span&gt;
  &lt;span slot="label"&gt;
    Element label (default text will be read by screen reader)
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noToggle">No Toggle</auro-header>
<p>Use the <code>noToggle</code> attribute so the trigger will only show the dropdown bib, not toggle it closed.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-toggle.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-toggle.html -->
<auro-dropdown aria-label="custom label" noToggle>
Lorem ipsum solar
<div slot="trigger">
Trigger
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-toggle.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-toggle.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown aria-label="custom label" noToggle&gt;
  Lorem ipsum solar
  &lt;div slot="trigger"&gt;
    Trigger
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
