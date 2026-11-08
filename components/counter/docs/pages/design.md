<auro-header level="1" id="overview">Counter: Design</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="anatomy">Anatomy</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="defaultLayout">Standalone counter</auro-header>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
      </section>
      <section>
        <auro-header level="2" id="groupLayout">Counter group</auro-header>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
      </section>
      <section>
        <auro-header level="2" id="dropdownLayout">Dropdown counter</auro-header>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
      </section>
      <section>
        <auro-header level="2" id="colors">Colors</auro-header>
        <auro-header level="3" id="defaultColor">Default color</auro-header>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-header level="3" id="inverseColor">Inverse color</auro-header>
        <div class="exampleWrapper--ondark" aria-hidden>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
      </section>
      <section>
        <auro-header level="2" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
        <p>The <code>auro-counter-group</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> feature set when <code>isDropdown</code> is set. The component defaults to <code>layout="classic"</code>, <code>shape="classic"</code>, and <code>size="xl"</code>.</p>
        <auro-header level="3" id="classicLayout">Classic layout</auro-header>
        <p>The <code>classic</code> layout is default for <code>auro-counter-group</code>. No customization is needed to achieve this look.</p>
        <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="snowflakeLayout">Snowflake layout</auro-header>
        <p>The <code>snowflake</code> layout is a unique, one-off layout that doesn't follow the normal pattern. Use it only as shown in the following example.</p>
        <p>Use the <code>snowflake</code> layout only on dark backgrounds, with <code>appearance="inverse"</code>.</p>
        <div class="exampleWrapper--ondark">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-snowflake.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-snowflake.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
