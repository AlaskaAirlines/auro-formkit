<auro-header level="1" id="overview">Menu</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#useCases">User Stories</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
The <code>&lt;auro-menu&gt;</code> element provides a list of options for a user to select from.

A list of options is created within the <code>&lt;slot&gt;</code> of the <code>&lt;auro-menu&gt;</code> element by using the <code>&lt;auro-menuoption&gt;</code> element to define options. Use a standard <code>&lt;hr&gt;</code> element to create dividers within the list of options.

The <code>&lt;auro-menu&gt;</code> element is designed for contextual menus, e.g. a dropdown menus. They are not intended to be used for navigation menus which have a different semantic meaning. The <code>&lt;auro-menu&gt;</code> element does not support hide/show functionality within its scope. This functionality will be managed by a wrapping element such as a drop-down menu composite element.
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="useCases">User Stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The <code>&lt;auro-menu&gt;</code> element is not intended for stand-alone use. It serves as the options list within <auro-hyperlink href="https://auro.alaskaair.com/components/auro/select" target="_blank">auro-select</auro-hyperlink> and <auro-hyperlink href="https://auro.alaskaair.com/components/auro/combobox" target="_blank">auro-combobox</auro-hyperlink>. Refer to those components for use cases and implementation guidance.
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
