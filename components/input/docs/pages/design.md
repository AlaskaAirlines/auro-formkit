<auro-header level="1" id="overview">Input - Design</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="3" id="anatomy">Component anatomy</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
      <!-- AURO-GENERATED-CONTENT:END -->
      <auro-header level="3" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
      <p>The <code>auro-input</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> attributes. It defaults to <code>layout="classic"</code>, <code>shape="classic"</code>, and <code>size="lg"</code>.</p>
      <auro-header level="4" id="classicLayout">Classic layout</auro-header>
      <p>The <code>classic</code> layout is the default for <code>auro-input</code>, so you don't need to set anything to get this look.</p>
      <div class="exampleWrapper">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </div>
      <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </auro-accordion>
      <auro-header level="4" id="emphasizedLayout">Emphasized layout</auro-header>
      <p>The <code>emphasized</code> layout is only supported on light backgrounds.</p>
      <p>The <code>emphasized</code> layout supports the following shapes:</p>
      <ul>
        <li><code>pill</code></li>
        <li><code>pill-left</code></li>
        <li><code>pill-right</code></li>
      </ul>
      <p>The <code>emphasized</code> layout supports the following sizes:</p>
      <ul>
        <li><code>xl</code></li>
      </ul>
      <div class="exampleWrapper--ondark">
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/emphasized/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </div>
      <auro-accordion alignRight>
        <span slot="trigger">See code</span>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/emphasized/basic.html) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </auro-accordion>
      <auro-header level="4" id="snowflakeLayout">Snowflake layout</auro-header>
      <p>The <code>snowflake</code> layout is a one-off layout that doesn't follow the usual pattern. Use it only as shown in the following example.</p>
      <p>Use the <code>snowflake</code> layout only on dark backgrounds, with <code>appearance="inverse"</code>.</p>
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
