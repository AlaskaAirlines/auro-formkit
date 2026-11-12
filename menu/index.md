<auro-header level="1" id="overview">Menu</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View more</span>
<span slot="mobileToggleExpanded">View less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#useCases">User stories</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<p>The <code>&lt;auro-menu&gt;</code> element shows a list of options that people choose from.</p>
<p>Add each option as an <code>&lt;auro-menuoption&gt;</code> element inside <code>&lt;auro-menu&gt;</code>. Use a standard <code>&lt;hr&gt;</code> element to add a divider between options.</p>
<p>Use <code>&lt;auro-menu&gt;</code> as the options list of a selection control, such as a dropdown. Don't use it for site navigation menus, which need different ARIA roles. The menu doesn't show or hide itself: the component that wraps it, such as <code>&lt;auro-select&gt;</code> or <code>&lt;auro-combobox&gt;</code>, handles that.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="useCases">User stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
        The <code>&lt;auro-menu&gt;</code> element isn't intended for stand-alone use. It serves as the options list within <auro-hyperlink href="https://auro.alaskaair.com/components/auro/select" target="_blank">auro-select</auro-hyperlink> and <auro-hyperlink href="https://auro.alaskaair.com/components/auro/combobox" target="_blank">auro-combobox</auro-hyperlink>. Refer to those components for use cases and implementation guidance.
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
