<auro-header level="1" id="overview">Form - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#layout">Layout</auro-anchorlink>
      <auro-anchorlink fluid href="#columnLayout" class="level2 body-xs">Column Layout</auro-anchorlink>
      <auro-anchorlink fluid href="#complexForm" class="level2 body-xs">Complex Form</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="layout">Layout</auro-header>
        <p>The <code>auro-form</code> component does not enforce any layout on its children. Use standard CSS techniques to arrange form elements as needed.</p>
        <auro-header level="3" id="columnLayout">Column Layout</auro-header>
        <p>Use CSS Grid or Flexbox to arrange form elements in columns.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/column-layout.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/column-layout.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="complexForm">Complex Form</auro-header>
        <p>A more complex form layout with multiple element types, nested containers, and a submit/cancel button group.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/complex.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
