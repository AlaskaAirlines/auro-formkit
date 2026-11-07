<auro-header level="1" id="overview">Dropdown - Design</auro-header>
<div class="contentWrapper">
  <div class="mainContent">
    <div class="scrollWrapper">
      <auro-header level="3" id="anatomy">Component anatomy</auro-header>
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/design/layout.md) -->
      <!-- AURO-GENERATED-CONTENT:END -->
      <auro-header level="3" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
      <p>The <code>auro-dropdown</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> attributes. None of them has a default value, so set all three, such as <code>layout="classic" shape="classic" size="lg"</code>, to get the standard look.</p>
      <auro-header level="4" id="classicLayout">Classic layout</auro-header>
      <p>The <code>classic</code> layout is the standard look for <code>auro-dropdown</code>. Set <code>layout="classic"</code> to use it.</p>
      <div class="exampleWrapper">
      <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/classic/basic.html) -->
      <!-- AURO-GENERATED-CONTENT:END -->
      </div>
      <auro-accordion alignRight>
        <span slot="trigger">See code</span>
      <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/classic/basic.html) -->
      <!-- AURO-GENERATED-CONTENT:END -->
      </auro-accordion>
      <auro-header level="4" id="emphasizedLayout">Emphasized layout</auro-header>
      <p>The <code>emphasized</code> layout is only supported on dark backgrounds.</p>
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
      <p>The <code>snowflake</code> layout is a unique, one-off layout that doesn't follow the normal pattern. Use it only as shown in the following example.</p>
      <p>Use the <code>snowflake</code> layout only on dark backgrounds, together with <code>appearance="inverse"</code>.</p>
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
