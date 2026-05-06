<auro-header level="1" id="overview">Checkbox - Overview and UX Guide</auro-header>
<div class="contentWrapper">
<nav>
<auro-nav anchorNavContent=".scrollWrapper">
<span slot="mobileToggleCollapsed">View More</span>
<span slot="mobileToggleExpanded">View Less</span>
<auro-anchorlink fluid href="#description">Description</auro-anchorlink>
<auro-anchorlink fluid href="#userStories">User Stories</auro-anchorlink>
<auro-anchorlink fluid href="#selectOptions" class="level2 body-xs">Select Options</auro-anchorlink>
<auro-anchorlink fluid href="#presetValue" class="level2 body-xs">Preset Value</auro-anchorlink>
<auro-anchorlink fluid href="#skipSelection" class="level2 body-xs">Skip Selection</auro-anchorlink>
</auro-nav>
</nav>
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="2" id="description">Description</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
<code>&lt;auro-checkbox&gt;</code> is a <auro-hyperlink href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements" target="_blank">HTML custom element</auro-hyperlink> for the purpose of allowing users to select one or more options of a limited number of choices.
<!-- AURO-GENERATED-CONTENT:END -->
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-checkbox-group>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="basic" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="basic" id="checkbox-basic2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="basic" id="checkbox-basic3"&gt;Checkbox option that has some extra text that should wrap when rendered in a narrow container&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="basic" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<section>
<auro-header level="2" id="userStories">User Stories</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
The <code>&lt;auro-checkbox&gt;</code> element should be used in situations where users may:

* Be filling out a form
* Need to select one or more options
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/index/userStories.md) -->
<!-- The below content is automatically added from ./../docs/partials/index/userStories.md -->
<auro-header level="3" id="selectOptions">Select one or more options</auro-header>
<ol>
<li>
Move focus to a checkbox
<div class="note">
<p>
Each checkbox is an independent tab stop. Focus moves to the checkbox via <kbd>Tab</kbd> or by clicking/tapping the checkbox or its label.
</p>
</div>
</li>
<li>
Toggle the checkbox
<div class="note">
<p>
Press <kbd>Space</kbd> or click/tap to toggle the <code>checked</code> state. Multiple checkboxes can be checked simultaneously.
</p>
</div>
</li>
<li>
Move focus away from the checkbox group
<div class="note">
<p>
If the group is <code>required</code>, validation is triggered on blur. If no checkbox is checked the component renders the <code>valueMissing</code> error state.
</p>
</div>
</li>
</ol>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-checkbox-group>
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="basic" id="checkbox-basic2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option that has some extra text that should wrap when rendered in a narrow container</auro-checkbox>
<auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="basic" id="checkbox-basic1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="basic" id="checkbox-basic2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="basic" id="checkbox-basic3"&gt;Checkbox option that has some extra text that should wrap when rendered in a narrow container&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="basic" id="checkbox-basic4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="presetValue">Preset checked options</auro-header>
<p>Use the <code>checked</code> attribute on individual <code>&lt;auro-checkbox&gt;</code> elements to preset which options are selected on initial render.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/preset-checked.html) -->
<!-- The below content is automatically added from ./../apiExamples/preset-checked.html -->
<auro-checkbox-group>
<span slot="legend">Select your preferences</span>
<auro-checkbox value="wifi" name="preset" id="checkbox-preset1" checked>Wi-Fi</auro-checkbox>
<auro-checkbox value="power" name="preset" id="checkbox-preset2" checked>Power outlet</auro-checkbox>
<auro-checkbox value="legroom" name="preset" id="checkbox-preset3">Extra legroom</auro-checkbox>
<auro-checkbox value="window" name="preset" id="checkbox-preset4">Window seat</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/preset-checked.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/preset-checked.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group&gt;
  &lt;span slot="legend"&gt;Select your preferences&lt;/span&gt;
  &lt;auro-checkbox value="wifi" name="preset" id="checkbox-preset1" checked&gt;Wi-Fi&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="power" name="preset" id="checkbox-preset2" checked&gt;Power outlet&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="legroom" name="preset" id="checkbox-preset3"&gt;Extra legroom&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="window" name="preset" id="checkbox-preset4"&gt;Window seat&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="3" id="skipSelection">Skip selection</auro-header>
<p>The checkbox group does not force the user to make a selection. If no checkbox is checked and the group is not <code>required</code>, the user can move past the group without checking any option.</p>
<p>If the group is <code>required</code>, moving focus away without checking any option triggers validation and renders the <code>valueMissing</code> error state.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/required.html) -->
<!-- The below content is automatically added from ./../apiExamples/required.html -->
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
<span slot="legend">Form label goes here</span>
<auro-checkbox value="value1" name="required" id="checkbox-required1">Checkbox option</auro-checkbox>
<auro-checkbox value="value2" name="required" id="checkbox-required2">Checkbox option</auro-checkbox>
<auro-checkbox value="value3" name="required" id="checkbox-required3">Checkbox option</auro-checkbox>
<auro-checkbox value="value4" name="required" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/required.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/required.html -->
<pre class="language-html"><code class="language-html">&lt;auro-checkbox-group required setCustomValidityValueMissing="Please select an option"&gt;
  &lt;span slot="legend"&gt;Form label goes here&lt;/span&gt;
  &lt;auro-checkbox value="value1" name="required" id="checkbox-required1"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value2" name="required" id="checkbox-required2"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value3" name="required" id="checkbox-required3"&gt;Checkbox option&lt;/auro-checkbox&gt;
  &lt;auro-checkbox value="value4" name="required" id="checkbox-required4"&gt;Checkbox option&lt;/auro-checkbox&gt;
&lt;/auro-checkbox-group&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
</section>
</div>
</div>
</div>
