<auro-header level="1" id="overview">Dropdown: Customize</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
<auro-anchorlink fluid href="#background" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
<auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
<auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
<auro-anchorlink fluid href="#bibPosition" class="level2 body-xs">Bib position</auro-anchorlink>
<auro-anchorlink fluid href="#fullscreenBreakpoint" class="level2 body-xs">Fullscreen breakpoint</auro-anchorlink>
<auro-anchorlink fluid href="#matchWidth" class="level2 body-xs">Match width</auro-anchorlink>
<auro-anchorlink fluid href="#customBehavior">Behavior</auro-anchorlink>
<auro-anchorlink fluid href="#chevron" class="level2 body-xs">Chevron</auro-anchorlink>
<auro-anchorlink fluid href="#desktopModal" class="level2 body-xs">Desktop modal</auro-anchorlink>
<auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
<auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
<auro-anchorlink fluid href="#noToggle" class="level2 body-xs">No toggle</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="appearance">Appearance</auro-header>
<auro-header level="3" id="background">Light vs. dark background</auro-header>
<p>The <code>appearance</code> attribute sets the colors for the background the dropdown sits on. Use <code>inverse</code> on dark backgrounds and <code>default</code>, the default value, everywhere else.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-dropdown>
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<div slot="trigger">
            Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown&gt;
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-dropdown appearance="inverse">
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<div slot="trigger">
            Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown appearance="inverse"&gt;
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssTokens">Tokens</auro-header>
<p>Restyle the component by overriding the following CSS custom properties (design tokens).</p>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->
<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
&#10;:host(:not([ondark])),
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
&#10;:host([ondark]),
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
<auro-dropdown id="customTokensDropdown" layout="classic" shape="classic" size="lg" chevron>
<div style="padding: var(--ds-size-150);">
            Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
</div>
<span slot="helpText">Times are local to each airport</span>
<div slot="trigger">
            Flight details
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
&lt;auro-dropdown id="customTokensDropdown" layout="classic" shape="classic" size="lg" chevron&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;Times are local to each airport&lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="cssParts">CSS shadow parts</auro-header>
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
<td>The container for the icon that shows whether the bib is open. Exists only when <code>chevron</code> is set.</td>
</tr>
<tr>
<td><code>helpText</code></td>
<td>The help text container. Not currently rendered, so styles set on it have no effect; style the content in the <code>helpText</code> slot instead.</td>
</tr>
<tr>
<td><code>size</code></td>
<td>A hidden sizing element whose <code>width</code>, <code>height</code>, <code>max-width</code>, and <code>max-height</code> are copied to the bib. Applies only when <code>matchWidth</code> is set.</td>
</tr>
<tr>
<td><code>trigger</code></td>
<td>The trigger content container. Not currently rendered, so styles set on it have no effect; use <code>wrapper</code> instead.</td>
</tr>
<tr>
<td><code>wrapper</code></td>
<td>The trigger wrapper element surrounding the trigger content and chevron.</td>
</tr>
</tbody>
</table>
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/css-parts.html) -->
<!-- The below content is automatically added from ./../apiExamples/css-parts.html -->
<style>
          #cssPartsDropdown::part(wrapper) {
            border: 2px dashed #7b2d8e;
            border-radius: 8px;
            padding: var(--ds-size-100);
          }
          #cssPartsDropdown::part(chevron) {
            color: #7b2d8e;
          }
          #cssPartsDropdown::part(size) {
            max-height: 200px;
          }
</style>
<auro-dropdown id="cssPartsDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth>
<div style="padding: var(--ds-size-150);">
            Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
</div>
<span slot="helpText">Times are local to each airport</span>
<div slot="trigger">
            Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/css-parts.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/css-parts.html -->
<pre class="language-html"><code class="language-html">&lt;style&gt;
  #cssPartsDropdown::part(wrapper) {
    border: 2px dashed #7b2d8e;
    border-radius: 8px;
    padding: var(--ds-size-100);
  }
  #cssPartsDropdown::part(chevron) {
    color: #7b2d8e;
  }
  #cssPartsDropdown::part(size) {
    max-height: 200px;
  }
&lt;/style&gt;
&lt;auro-dropdown id="cssPartsDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;Times are local to each airport&lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="bibPosition">Bib position</auro-header>
<p>Customize bib position with <code>placement</code>, <code>offset</code>, <code>noFlip</code>, and <code>shift</code> attributes.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/floater-config.html) -->
<!-- The below content is automatically added from ./../apiExamples/floater-config.html -->
<style>
          .floaterConfigDropdown::part(size) {
            max-height: 200px;
          }
</style>
<div>
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20" noFlip>
<div>
<p>
<strong>Changes:</strong> You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
</p>
<p>
<strong>Cancellations:</strong> If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
</p>
<p>
<strong>Baggage:</strong> Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
</p>
</div>
<div slot="trigger">
              Fare rules
</div>
<span slot="helpText">Uses <code>placement="bottom-end"</code>, <code>offset="20"</code>, and <code>noFlip</code></span>
</auro-dropdown>
</div>
<div>
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20">
<div>
<p>
<strong>Changes:</strong> You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
</p>
<p>
<strong>Cancellations:</strong> If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
</p>
<p>
<strong>Baggage:</strong> Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
</p>
</div>
<div slot="trigger">
              Fare rules
</div>
<div slot="helpText">
              Uses <code>placement="bottom-end"</code> and <code>offset="20"</code>, and flips when there isn't room
</div>
</auro-dropdown>
</div>
<div>
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="right" offset="20">
<div>
<p>
<strong>Changes:</strong> You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
</p>
<p>
<strong>Cancellations:</strong> If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
</p>
<p>
<strong>Baggage:</strong> Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
</p>
</div>
<div slot="trigger">
              Fare rules
</div>
<div slot="helpText">
              Uses <code>placement="right"</code>, <code>offset="20"</code>, and <code>noFlip</code>
</div>
</auro-dropdown>
</div>
<div>
<auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="bottom-start" shift offset="20">
<div>
<p>
<strong>Changes:</strong> You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
</p>
<p>
<strong>Cancellations:</strong> If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
</p>
<p>
<strong>Baggage:</strong> Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
</p>
</div>
<div slot="trigger">
              Fare rules
</div>
<div slot="helpText">
              Uses <code>placement="bottom-start"</code>, <code>offset="20"</code>, <code>shift</code>, and <code>noFlip</code>
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
&lt;div&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20" noFlip&gt;
    &lt;div&gt;
      &lt;p&gt;
        &lt;strong&gt;Changes:&lt;/strong&gt; You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Cancellations:&lt;/strong&gt; If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Baggage:&lt;/strong&gt; Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Fare rules
    &lt;/div&gt;
    &lt;span slot="helpText"&gt;Uses &lt;code&gt;placement="bottom-end"&lt;/code&gt;, &lt;code&gt;offset="20"&lt;/code&gt;, and &lt;code&gt;noFlip&lt;/code&gt;&lt;/span&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&#10;&lt;div&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth placement="bottom-end" offset="20"&gt;
    &lt;div&gt;
      &lt;p&gt;
        &lt;strong&gt;Changes:&lt;/strong&gt; You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Cancellations:&lt;/strong&gt; If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Baggage:&lt;/strong&gt; Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Fare rules
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Uses &lt;code&gt;placement="bottom-end"&lt;/code&gt; and &lt;code&gt;offset="20"&lt;/code&gt;, and flips when there isn't room
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&#10;&lt;div&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="right" offset="20"&gt;
    &lt;div&gt;
      &lt;p&gt;
        &lt;strong&gt;Changes:&lt;/strong&gt; You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Cancellations:&lt;/strong&gt; If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Baggage:&lt;/strong&gt; Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Fare rules
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Uses &lt;code&gt;placement="right"&lt;/code&gt;, &lt;code&gt;offset="20"&lt;/code&gt;, and &lt;code&gt;noFlip&lt;/code&gt;
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;
&#10;&lt;div&gt;
  &lt;auro-dropdown class="floaterConfigDropdown" layout="classic" shape="classic" size="lg" chevron matchWidth noFlip placement="bottom-start" shift offset="20"&gt;
    &lt;div&gt;
      &lt;p&gt;
        &lt;strong&gt;Changes:&lt;/strong&gt; You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Cancellations:&lt;/strong&gt; If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
      &lt;/p&gt;
      &lt;p&gt;
        &lt;strong&gt;Baggage:&lt;/strong&gt; Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;div slot="trigger"&gt;
      Fare rules
    &lt;/div&gt;
    &lt;div slot="helpText"&gt;
      Uses &lt;code&gt;placement="bottom-start"&lt;/code&gt;, &lt;code&gt;offset="20"&lt;/code&gt;, &lt;code&gt;shift&lt;/code&gt;, and &lt;code&gt;noFlip&lt;/code&gt;
    &lt;/div&gt;
  &lt;/auro-dropdown&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="fullscreenBreakpoint">Fullscreen breakpoint</auro-header>
<p>Set <code>fullscreenBreakpoint</code> to the screen width, such as <code>sm</code>, at or below which the open bib fills the screen. When it isn't set, or is set to <code>disabled</code>, the bib never goes fullscreen.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/fullscreen-breakpoint.html) -->
<!-- The below content is automatically added from ./../apiExamples/fullscreen-breakpoint.html -->
<auro-dropdown id="fullscreen" fullscreenBreakpoint="sm" layout="classic" shape="classic" size="lg" chevron>
<div>
<p>
<strong>Changes:</strong> You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
</p>
<p>
<strong>Cancellations:</strong> If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
</p>
<p>
<strong>Baggage:</strong> Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
</p>
</div>
<auro-button id="fullscreenButton">
            Dismiss dropdown
</auro-button>
<div slot="trigger">
            Fare rules
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
      &lt;strong&gt;Changes:&lt;/strong&gt; You can change this ticket any time before departure. If your new flight costs more, you pay the difference in fare. If it costs less, the difference goes back to you as credit for a future trip.
    &lt;/p&gt;
    &lt;p&gt;
      &lt;strong&gt;Cancellations:&lt;/strong&gt; If you cancel before departure, the full value of your ticket stays available as credit. Use the credit to book a new trip for yourself or someone else on your reservation.
    &lt;/p&gt;
    &lt;p&gt;
      &lt;strong&gt;Baggage:&lt;/strong&gt; Carry-on bags must fit in the overhead bin or under the seat in front of you. Checked bag fees depend on your route, fare, and status, and are shown before you pay.
    &lt;/p&gt;
  &lt;/div&gt;
&#10;  &lt;auro-button id="fullscreenButton"&gt;
    Dismiss dropdown
  &lt;/auro-button&gt;
  &lt;div slot="trigger"&gt;
    Fare rules
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="matchWidth">Match width</auro-header>
<p>Set <code>matchWidth</code> to make the bib the same width as the trigger.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/match-width.html) -->
<!-- The below content is automatically added from ./../apiExamples/match-width.html -->
<auro-dropdown id="matchWidthDropdownExample" layout="classic" shape="classic" size="lg" matchWidth>
<div style="padding: var(--ds-size-150);">
            Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<br />
<auro-button id="matchWidthButton">
              Dismiss dropdown
</auro-button>
</div>
<span slot="helpText">
            Times are local to each airport
</span>
<div slot="trigger">
            Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/match-width.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/match-width.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="matchWidthDropdownExample" layout="classic" shape="classic" size="lg" matchWidth&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
    &lt;br /&gt;
    &lt;auro-button id="matchWidthButton"&gt;
      Dismiss dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Times are local to each airport
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Flight details
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
<auro-dropdown chevron>
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<div slot="trigger">
            Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/chevron.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/chevron.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown chevron&gt;
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="desktopModal">Desktop modal</auro-header>
<p>Set <code>desktopModal</code> to make the open bib act as a modal dialog when it isn't fullscreen. The rest of the page becomes <code>inert</code>, and keyboard focus stays in the bib until it closes. A fullscreen bib already behaves this way, because it opens with the <code>&lt;dialog&gt;</code> element's <code>showModal()</code> method.</p>
<auro-header level="3" id="disabled">Disabled</auro-header>
<p>Set <code>disabled</code> to turn the dropdown off. The trigger is shown in a muted style and can't open the bib.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/disabled.html -->
<auro-dropdown
          disabled
          chevron
          layout="classic" shape="classic" size="lg">
          Choose a seat from the seat map.
<div slot="trigger">
            Seat
</div>
<span slot="helpText">
            Seat selection opens after you choose a flight
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
<auro-dropdown
          disabled
          appearance="inverse"
          chevron
          layout="classic" shape="classic" size="lg">
          Choose a seat from the seat map.
<div slot="trigger">
            Seat
</div>
<span slot="helpText">
            Seat selection opens after you choose a flight
</span>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  disabled
  chevron
  layout="classic" shape="classic" size="lg"&gt;
  Choose a seat from the seat map.
  &lt;div slot="trigger"&gt;
    Seat
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Seat selection opens after you choose a flight
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-disabled.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-disabled.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown
  disabled
  appearance="inverse"
  chevron
  layout="classic" shape="classic" size="lg"&gt;
  Choose a seat from the seat map.
  &lt;div slot="trigger"&gt;
    Seat
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Seat selection opens after you choose a flight
  &lt;/span&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="error">Error</auro-header>
<p>Set <code>error</code> to show the trigger in an error style. It doesn't show a message, so put one in the <code>helpText</code> slot.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/error.html) -->
<!-- The below content is automatically added from ./../apiExamples/error.html -->
<auro-dropdown layout="classic" shape="classic" size="lg" error id="errorDropdownExample">
<div style="padding: var(--ds-size-150);">
            Choose a seat from the seat map.
<br />
<auro-button id="errorButton">
              Dismiss dropdown
</auro-button>
</div>
<span slot="helpText">
            Select a seat to continue
</span>
<div slot="trigger">
            Seat
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse-error.html -->
<auro-dropdown id="inverseError" appearance="inverse" layout="classic" shape="classic" size="lg" error>
<div style="padding: var(--ds-size-150);">
            Choose a seat from the seat map.
<br />
<auro-button id="inverseErrorButton">
              Dismiss dropdown
</auro-button>
</div>
<span slot="helpText">
            Select a seat to continue
</span>
<div slot="trigger">
            Seat
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown layout="classic" shape="classic" size="lg" error id="errorDropdownExample"&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Choose a seat from the seat map.
    &lt;br /&gt;
    &lt;auro-button id="errorButton"&gt;
      Dismiss dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Select a seat to continue
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Seat
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse-error.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse-error.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown id="inverseError" appearance="inverse" layout="classic" shape="classic" size="lg" error&gt;
  &lt;div style="padding: var(--ds-size-150);"&gt;
    Choose a seat from the seat map.
    &lt;br /&gt;
    &lt;auro-button id="inverseErrorButton"&gt;
      Dismiss dropdown
    &lt;/auro-button&gt;
  &lt;/div&gt;
  &lt;span slot="helpText"&gt;
    Select a seat to continue
  &lt;/span&gt;
  &lt;div slot="trigger"&gt;
    Seat
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="noToggle">No toggle</auro-header>
<p>Use the <code>noToggle</code> attribute so the trigger only opens the bib and doesn't close it. Pressing <code>Escape</code> or moving focus away still closes the bib.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/no-toggle.html) -->
<!-- The below content is automatically added from ./../apiExamples/no-toggle.html -->
<auro-dropdown noToggle>
          Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
<div slot="trigger">
            Flight details
</div>
</auro-dropdown>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/no-toggle.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/no-toggle.html -->
<pre class="language-html"><code class="language-html">&lt;auro-dropdown noToggle&gt;
  Seattle (SEA) to Anchorage (ANC), departs 8:15 AM
  &lt;div slot="trigger"&gt;
    Flight details
  &lt;/div&gt;
&lt;/auro-dropdown&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
