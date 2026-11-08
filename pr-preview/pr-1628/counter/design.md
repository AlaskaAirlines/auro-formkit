<auro-header level="1" id="overview">Counter: Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="anatomy">Anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
<p>The counter is made up of these parts:</p>
<ul>
<li><strong>Label</strong>: The text in the default slot, which names what's being counted.</li>
<li><strong>Description</strong>: Optional supporting text below the label, set with the <code>description</code> slot.</li>
<li><strong>Minus button</strong>: Lowers the value by 1.</li>
<li><strong>Value</strong>: Shows the current number.</li>
<li><strong>Plus button</strong>: Raises the value by 1.</li>
<li><strong>Help text</strong>: Optional guidance below the counter, set with the <code>helpText</code> slot.</li>
</ul>
<p>A <strong>counter group</strong> shows several counters together. With the <code>isDropdown</code> attribute, the group appears as a dropdown whose trigger shows a label and a summary of the counters' values.</p>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="defaultLayout">Standalone counter</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</section>
<section>
<auro-header level="2" id="groupLayout">Counter group</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-counter-group>
<auro-counter>
            Short label
<span slot="ariaLabel.minus">Decrease short label</span>
<span slot="ariaLabel.plus">Increase short label</span>
</auro-counter>
<auro-counter>
            Another short label
<span slot="ariaLabel.minus">Decrease another short label</span>
<span slot="ariaLabel.plus">Increase another short label</span>
</auro-counter>
<auro-counter>
            This is an example of the wrapping behavior for a long label
<span slot="ariaLabel.minus">Decrease long label</span>
<span slot="ariaLabel.plus">Increase long label</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</section>
<section>
<auro-header level="2" id="dropdownLayout">Dropdown counter</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="label">Passengers</div>
<auro-counter>
            Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
            Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
</auro-counter>
<auro-counter>
            Lap infants
<span slot="ariaLabel.minus">Remove lap infant</span>
<span slot="ariaLabel.plus">Add lap infant</span>
<span slot="description">Under 2 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</section>
<section>
<auro-header level="2" id="colors">Colors</auro-header>
<auro-header level="3" id="defaultColor">Default color</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-header level="3" id="inverseColor">Inverse color</auro-header>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-counter appearance="inverse">
          Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
</auro-counter>
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
<!-- The below content is automatically added from ./../apiExamples/dropdown.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="label">Passengers</div>
<auro-counter>
            Adults
<span slot="ariaLabel.minus">Remove adult</span>
<span slot="ariaLabel.plus">Add adult</span>
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
            Children
<span slot="ariaLabel.minus">Remove child</span>
<span slot="ariaLabel.plus">Add child</span>
<span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
</auro-counter>
<auro-counter>
            Lap infants
<span slot="ariaLabel.minus">Remove lap infant</span>
<span slot="ariaLabel.plus">Add lap infant</span>
<span slot="description">Under 2 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown.html -->
<pre class="language-html"><code class="language-html">&lt;auro-counter-group isDropdown&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
  &lt;div slot="label"&gt;Passengers&lt;/div&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="ariaLabel.minus"&gt;Remove adult&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add adult&lt;/span&gt;
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="ariaLabel.minus"&gt;Remove child&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add child&lt;/span&gt;
    &lt;span slot="description"&gt;Under 17 years old. Restrictions apply if traveling without an adult.&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Lap infants
    &lt;span slot="ariaLabel.minus"&gt;Remove lap infant&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Add lap infant&lt;/span&gt;
    &lt;span slot="description"&gt;Under 2 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="snowflakeLayout">Snowflake layout</auro-header>
<p>The <code>snowflake</code> layout is a unique, one-off layout that doesn't follow the normal pattern. Use it only as shown in the following example.</p>
<p>Use the <code>snowflake</code> layout only on dark backgrounds, with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-snowflake.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown-snowflake.html -->
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown layout="snowflake" shape="snowflake" appearance="inverse">
<span slot="ariaLabel.bib.close">Close popup</span>
<div slot="bib.fullscreen.headline">Group fullscreen label</div>
<auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor></auro-icon>
<div slot="label">Snowflake dropdown group</div>
<div slot="helpText">Total must be between 2–10</div>
<auro-counter>
            Counter 1
<span slot="ariaLabel.minus">Decrease counter 1</span>
<span slot="ariaLabel.plus">Increase counter 1</span>
</auro-counter>
<auro-counter>
            Counter 2
<span slot="ariaLabel.minus">Decrease counter 2</span>
<span slot="ariaLabel.plus">Increase counter 2</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/dropdown-snowflake.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/dropdown-snowflake.html -->
<pre class="language-html"><code class="language-html">&lt;!-- Example of counter-group properties --&gt;
&lt;auro-counter-group max="10" min="2" isDropdown layout="snowflake" shape="snowflake" appearance="inverse"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close popup&lt;/span&gt;
  &lt;div slot="bib.fullscreen.headline"&gt;Group fullscreen label&lt;/div&gt;
  &lt;auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor&gt;&lt;/auro-icon&gt;
  &lt;div slot="label"&gt;Snowflake dropdown group&lt;/div&gt;
  &lt;div slot="helpText"&gt;Total must be between 2–10&lt;/div&gt;
  &lt;auro-counter&gt;
    Counter 1
    &lt;span slot="ariaLabel.minus"&gt;Decrease counter 1&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Increase counter 1&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Counter 2
    &lt;span slot="ariaLabel.minus"&gt;Decrease counter 2&lt;/span&gt;
    &lt;span slot="ariaLabel.plus"&gt;Increase counter 2&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
