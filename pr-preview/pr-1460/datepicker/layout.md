<p>The component consists of the following elements:</p>
<ul>
<li>
<strong>trigger:</strong> shows the component label(s), current date value(s), and will render to reflect the state of the component (e.g. <code>focus</code>, <code>hover</code>, <code>disabled</code>, <code>valid</code>, <code>invalid</code>). The trigger includes one or two text inputs (depending on whether <code>range</code> is set) that allow the user to type a date directly.
</li>
<li>
<strong>calendar:</strong> a monthly calendar grid rendered in a dropdown bib. Users can navigate between months and select dates by clicking or tapping calendar cells. On smaller viewports the calendar opens in a fullscreen modal dialog.
</li>
<li>
<strong>help text:</strong> descriptive text rendered below the trigger intended to help clarify the intended use of the component instance and any current validation error with instructions to resolve those errors.
</li>
</ul>
<auro-header level="4" id="trigger">Trigger</auro-header>
<p>The trigger includes the component label(s) and the current date value(s). The label is required to ensure correct behavior with accessibility tools such as screen readers.</p>
<p>When <code>range</code> is set, two inputs are shown — one for the departure date and one for the return date — separated by a visual divider.</p>
<p>The trigger is a focusable element and will visually respond to common UI states — <strong>Hover</strong> <em>(:hover)</em>, <strong>Focus</strong> <em>(:focus / :focus-visible)</em>, <strong>Disabled</strong> <em>(:disabled)</em>. The component does not have a visual response to the <strong>Active</strong> <em>(:active)</em> state.</p>
<auro-header level="4" id="triggerConditional">Conditional Elements</auro-header>
<p>The trigger contains the following elements that render conditionally:</p>
<ul>
<li>
<strong>Calendar icon:</strong> a decorative calendar icon rendered to the left of the input field(s). Provides a visual cue that the component opens a calendar.
</li>
<li>
<strong>Clear button:</strong> rendered when the input has a value, allowing the user to clear the current date selection.
</li>
<li>
<strong>Validation error icon:</strong> rendered when the component is in an invalid state, visually indicating a validation problem.
</li>
</ul>
<auro-header level="4" id="calendar">Calendar</auro-header>
<p>The calendar displays one or more months in a grid layout. Users interact with the calendar by clicking on individual date cells. The calendar supports:</p>
<ul>
<li>Navigating between months using previous/next arrows.</li>
<li>Date range highlighting when <code>range</code> is set.</li>
<li>Disabled dates outside the <code>minDate</code>/<code>maxDate</code> bounds.</li>
<li>Custom cell content via the <code>date_MM_DD_YYYY</code> slot.</li>
<li>Cell popovers via the <code>popover_MM_DD_YYYY</code> slot.</li>
</ul>
<auro-header level="4" id="helpText">Help Text</auro-header>
<p>Help text is not required. However, consideration should be given to how users will understand the full context of the component instance, particularly users reliant on accessibility tools like screen readers.</p>
<p>If the component fails validation, the help text will change to show a validation help message instead of the default help text.</p>
<auro-header level="3" id="colors">Colors</auro-header>
<auro-header level="4" id="defaultColor">Default Color</auro-header>
<p>When the component is used on a light background.</p>
<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-datepicker>
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
<auro-header level="4" id="inverseColor">Inverse Color</auro-header>
<p>When the component is used on a darker background, set <code>appearance="inverse"</code> to invert the component colors for proper contrast and visibility.</p>
<div class="exampleWrapper--ondark">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
<!-- The below content is automatically added from ./../apiExamples/appearance-inverse.html -->
<auro-datepicker appearance="inverse">
<span slot="ariaLabel.bib.close">Close Calendar</span>
<span slot="bib.fullscreen.headline">Datepicker Headline</span>
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
  &lt;span slot="ariaLabel.bib.close"&gt;Close Calendar&lt;/span&gt;
  &lt;span slot="bib.fullscreen.headline"&gt;Datepicker Headline&lt;/span&gt;
  &lt;span slot="fromLabel"&gt;Choose a date&lt;/span&gt;
  &lt;span slot="bib.fullscreen.fromLabel"&gt;Choose a date&lt;/span&gt;
&lt;/auro-datepicker&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
