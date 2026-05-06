<auro-header level="1" id="overview">Counter - Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<section>
<auro-header level="2" id="anatomy">Anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
The counter component consists of the following key elements:

- **Counter Label** — The main label text (default slot) identifying what is being counted
- **Description** — Optional supplementary text below the label (description slot)
- **Increment Button** — Increases the counter value by 1
- **Decrement Button** — Decreases the counter value by 1
- **Value Display** — Shows the current numeric value
- **Help Text** — Optional guidance text below the counter (helpText slot)

In a **counter group**, multiple counters are rendered together. When used with the `isDropdown` attribute, the group appears as a collapsible dropdown with a trigger element showing a label and summary of values.
<!-- AURO-GENERATED-CONTENT:END -->
</section>
<section>
<auro-header level="2" id="defaultLayout">Standalone Counter</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
Adults
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</section>
<section>
<auro-header level="2" id="groupLayout">Counter Group</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-counter-group>
<auro-counter>
Short label
</auro-counter>
<auro-counter>
Another short label
</auro-counter>
<auro-counter>
This is an example of the wrapping behavior for a long label
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</section>
<section>
<auro-header level="2" id="dropdownLayout">Dropdown Counter</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="label">Passengers</div>
<auro-counter>
Adults
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
Children
<span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
</auro-counter>
<auro-counter>
Lap Infants
<span slot="description">Under 2 years</span>
</auro-counter>
</auro-counter-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</section>
<section>
<auro-header level="2" id="colors">Colors</auro-header>
<auro-header level="3" id="defaultColor">Default Color</auro-header>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic-standalone.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic-standalone.html -->
<auro-counter>
Adults
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-header level="3" id="inverseColor">Inverse Color</auro-header>
<div class="exampleWrapper--ondark" aria-hidden>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-counter appearance="inverse">
Adults
</auro-counter>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
</section>
<section>
<auro-header level="2" id="shapeSizeLayout">Shape | Size | Layout Support</auro-header>
<p>The <code>auro-counter-group</code> component supports the <code>shape</code>, <code>size</code> and <code>layout</code> feature set. The component defaults to <code>layout="classic"</code>, <code>shape="classic"</code> and <code>size="lg"</code>.</p>
<auro-header level="3" id="classicLayout">Classic Layout</auro-header>
<p>The <code>classic</code> layout is default for <code>auro-counter-group</code>. No customization is needed to achieve this look.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown.html -->
<auro-counter-group isDropdown>
<span slot="ariaLabel.bib.close">Close Popup</span>
<span slot="bib.fullscreen.headline">Passengers</span>
<div slot="label">Passengers</div>
<auro-counter>
Adults
<span slot="description">18 years or older</span>
</auro-counter>
<auro-counter>
Children
<span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
</auro-counter>
<auro-counter>
Lap Infants
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Passengers&lt;/span&gt;
  &lt;div slot="label"&gt;Passengers&lt;/div&gt;
  &lt;auro-counter&gt;
    Adults
    &lt;span slot="description"&gt;18 years or older&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Children
    &lt;span slot="description"&gt;Under 17 years old. Restrictions apply if traveling without an adult.&lt;/span&gt;
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Lap Infants
    &lt;span slot="description"&gt;Under 2 years&lt;/span&gt;
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="snowflakeLayout">Snowflake Layout</auro-header>
<p>The <code>snowflake</code> layout is a unique, one off layout that does not follow the normal pattern. There is only one way to use snowflake as shown in the following example.</p>
<p>The <code>snowflake</code> layout is only expected to be used on dark backgrounds, in conjunction with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/dropdown-snowflake.html) -->
<!-- The below content is automatically added from ./../apiExamples/dropdown-snowflake.html -->
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown layout="snowflake" shape="snowflake" appearance="inverse">
<span slot="ariaLabel.bib.close">Close Popup</span>
<div slot="bib.fullscreen.headline">Group fullscreen label</div>
<auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor></auro-icon>
<div slot="label">Snowflake Dropdown Group</div>
<div slot="helpText">Total must be between 2-10</div>
<auro-counter>
Counter 1
</auro-counter>
<auro-counter>
Counter 2
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close Popup&lt;/span&gt;
  &lt;div slot="bib.fullscreen.headline"&gt;Group fullscreen label&lt;/div&gt;
  &lt;auro-icon slot="typeIcon" category="interface" name="account-stroke" customColor&gt;&lt;/auro-icon&gt;
  &lt;div slot="label"&gt;Snowflake Dropdown Group&lt;/div&gt;
  &lt;div slot="helpText"&gt;Total must be between 2-10&lt;/div&gt;
  &lt;auro-counter&gt;
    Counter 1
  &lt;/auro-counter&gt;
  &lt;auro-counter&gt;
    Counter 2
  &lt;/auro-counter&gt;
&lt;/auro-counter-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</section>
</div>
</div>
</div>
