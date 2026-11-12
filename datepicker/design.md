<auro-header level="1" id="overview">Datepicker: Design</auro-header>
<div class="contentWrapper">
<div class="mainContent">
<div class="scrollWrapper">
<auro-header level="3" id="anatomy">Component anatomy</auro-header>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/layout/layout.md) -->
<!-- The below content is automatically added from ./../docs/partials/layout/layout.md -->
<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>Trigger:</strong> Shows the component label(s), current date value(s), and the state of the component, such as <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, or <code>invalid</code>. The trigger includes one or two text inputs (depending on whether <code>range</code> is set) that allow the user to type a date directly.
</li>
<li>
<strong>Calendar:</strong> Shows a monthly calendar grid in a dropdown. Users can navigate between months and select dates by clicking or tapping calendar cells. On smaller viewports the calendar opens in a fullscreen modal dialog.
</li>
<li>
<strong>Help text:</strong> Shows text below the trigger that explains what to enter. The error message replaces it when validation fails.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger includes the component label(s) and the current date value(s). The label is required, so screen reader users know what the datepicker is for.</p>
<p>When <code>range</code> is set, two inputs are shown, one for the start date and one for the end date, separated by a visual divider.</p>
<p>The trigger is a focusable element and visually responds to common UI states: <strong>Hover</strong> (<code>:hover</code>), <strong>Focus</strong> (<code>:focus</code> and <code>:focus-visible</code>), and <strong>Disabled</strong> (<code>:disabled</code>). The component doesn't have a visual response to the <strong>Active</strong> (<code>:active</code>) state.</p>
<auro-header level="4" id="triggerConditional">Conditional elements</auro-header>
<p>The trigger contains the following elements that render conditionally:</p>
<ul>
<li>
<strong>Calendar icon:</strong> A decorative calendar icon to the left of the input fields gives a visual cue that the component opens a calendar.
</li>
<li>
<strong>Clear button:</strong> Shows when the input has a value and someone hovers over the field or moves focus into it, so they can clear the date.
</li>
<li>
<strong>Validation error icon:</strong> Shows when the component is invalid, to flag a validation problem.
</li>
</ul>
<auro-header level="4" id="calendar">Calendar</auro-header>
<p>The calendar displays one or more months in a grid layout. Users interact with the calendar by clicking, tapping, or using arrow keys to navigate date cells and Enter/Space to select. The calendar supports:</p>
<ul>
<li>Navigating between months using previous/next arrows.</li>
<li>Arrow-key navigation between date cells with automatic cross-month boundary handling.</li>
<li>Date range highlighting when <code>range</code> is set.</li>
<li>Disabled dates outside the <code>minDate</code>/<code>maxDate</code> bounds.</li>
<li>Blackout dates that keyboard users can reach with the arrow keys but can't select.</li>
<li>Custom cell content via the <code>date_YYYY_MM_DD</code> slot.</li>
<li>Cell popovers via the <code>popover_YYYY_MM_DD</code> slot.</li>
</ul>
<auro-header level="4" id="helpText">Help text</auro-header>
<p>Help text isn't required. Add it when people, especially screen reader users, need more context to know what to enter.</p>
<p>If the component fails validation, the help text changes to show a validation help message instead of the default help text.</p>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default color</auro-header>
<p>Use the default colors when the component is on a light background.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-datepicker>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-datepicker appearance="inverse">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/appearance-inverse.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker appearance="inverse"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<!-- AURO-GENERATED-CONTENT:END -->
<auro-header level="3" id="shapeSizeLayout">Shape, size, and layout support</auro-header>
<p>The <code>auro-datepicker</code> component supports the <code>shape</code>, <code>size</code>, and <code>layout</code> feature set. The component defaults to <code>layout="classic"</code>, <code>shape="classic"</code>, and <code>size="lg"</code>.</p>
<auro-header level="4" id="classicLayout">Classic layout</auro-header>
<p>The <code>classic</code> layout is the default for <code>auro-datepicker</code>, so you don't need to set anything to get this look.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-datepicker>
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="snowflakeLayout">Snowflake layout</auro-header>
<p>The <code>snowflake</code> layout is a one-off layout that doesn't follow the usual pattern. Use it only as shown in the following example.</p>
<p>Use the <code>snowflake</code> layout only on dark backgrounds, with <code>appearance="inverse"</code>.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/snowflake/basic.html -->
<auro-datepicker layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY">
<span slot="ariaLabel.bib.close">Close calendar</span>
<span slot="label">Date</span>
<span slot="bib.fullscreen.headline">Datepicker headline</span>
<span slot="fromLabel">Choose a date</span>
<span slot="bib.fullscreen.fromLabel">Choose a date</span>
</auro-datepicker>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/snowflake/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/snowflake/basic.html -->
<pre class="language-html"><code class="language-html">&lt;auro-datepicker layout="snowflake" shape="snowflake" appearance="inverse" placeholder="MM/DD/YYYY"&gt;
  &lt;span slot="ariaLabel.bib.close"&gt;Close calendar&lt;/span&gt;
  &lt;span slot="label"&gt;Date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
</div>
</div>
</div>
