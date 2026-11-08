<auro-header level="1" id="overview">Why auro-form?</auro-header>
<p>The native <code>&lt;form&gt;</code> element handles submission and reset for standard HTML inputs, but it has no awareness of web components, can't coordinate validation across custom elements, and provides no centralized state management. <code>auro-form</code> fills these gaps for applications built with Auro components.</p>
<auro-header level="2" id="customElementAwareness">Custom element awareness</auro-header>
<p>Native <code>&lt;form&gt;</code> relies on the browser's form association API, which web components must explicitly opt into via <code>ElementInternals</code>. Even when they do, coordinating validation state, required fields, and submission values across a mix of Auro components requires custom JavaScript.</p>
<p><code>auro-form</code> automatically discovers and manages:</p>
<ul>
<li><code>auro-input</code></li>
<li><code>auro-select</code></li>
<li><code>auro-datepicker</code></li>
<li><code>auro-combobox</code></li>
<li><code>auro-checkbox-group</code></li>
<li><code>auro-radio-group</code></li>
<li><code>auro-counter-group</code></li>
</ul>
<p>The form also picks up form elements added later, through <code>slotchange</code> events and a <code>MutationObserver</code>.</p>
<auro-header level="2" id="validationOrchestration">Validation orchestration</auro-header>
<p>Native forms validate each input independently, with no built-in way to check "are all required fields valid?" without querying each element manually.</p>
<p><code>auro-form</code> provides:</p>
<ul>
<li>A single <code>validity</code> getter that returns <code>valid</code>, <code>invalid</code>, or <code>null</code> based on the combined state of all enabled child form elements</li>
<li>Automatic validation of every enabled element on <code>submit()</code>, which calls each element's <code>validate(true)</code> to force its errors to show</li>
<li>Validity tracking for each element</li>
<li>Listening for <code>auroFormElement-validated</code> events from child components to stay in sync</li>
</ul>
<auro-header level="2" id="centralizedState">Centralized state</auro-header>
<p>Native forms have no concept of "has the user touched anything?" or "what are all the current values?"</p>
<p><code>auro-form</code> tracks:</p>
<ul>
<li><strong><code>value</code></strong>: A key-value object of all enabled form element values, keyed by element <code>name</code></li>
<li><strong><code>isInitialState</code></strong>: Whether every element still holds its starting value, with no failed validation</li>
<li><strong>Submit and reset button state</strong>: The form turns submit and reset buttons on and off to match its state, such as turning reset off while the form is unchanged and empty.</li>
</ul>
<auro-header level="2" id="submitAndReset">Submit and reset</auro-header>
<p>Native form submission navigates to a URL or requires <code>event.preventDefault()</code> and manual value extraction.</p>
<p><code>auro-form</code> simplifies this:</p>
<ul>
<li><strong><code>submit()</code></strong>: Validates every enabled element. If they're valid, dispatches a <code>submit</code> event with a <code>detail.value</code> object containing all enabled form values. No page navigation.</li>
<li><strong><code>reset()</code></strong>: Calls each child element's own <code>reset()</code>, then dispatches a <code>reset</code> event with <code>detail.previousValue</code> containing the pre-reset values.</li>
<li><strong>Enter key</strong>: Pressing Enter on a named, enabled form element runs <code>submit()</code>, matching native form behavior. The form skips textareas, so Enter still adds a new line there.</li>
</ul>
<auro-header level="2" id="eventNormalization">Event normalization</auro-header>
<p>Each Auro component dispatches its own events, such as <code>auroSelect-valueSet</code> and <code>auroDatePicker-toggled</code>. Listening for all of these individually is error-prone.</p>
<p><code>auro-form</code> normalizes events:</p>
<ul>
<li><code>input</code>: Fires when any child element receives user input.</li>
<li><code>change</code>: Fires when any child element's value changes, and when the form rebuilds its state.</li>
<li><code>submit</code>: Fires with aggregated form values on valid submission.</li>
<li><code>reset</code>: Fires with the previous values on reset.</li>
</ul>
<auro-header level="2" id="summary">Summary</auro-header>
<table>
<thead>
<tr>
<th>Capability</th>
<th><code>&lt;form&gt;</code></th>
<th><code>auro-form</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Web component discovery</td>
<td>Manual</td>
<td>Automatic (MutationObserver)</td>
</tr>
<tr>
<td>Aggregate validity</td>
<td>Manual querying</td>
<td>Single <code>validity</code> getter</td>
</tr>
<tr>
<td>Centralized values</td>
<td><code>FormData</code> (native inputs only)</td>
<td><code>value</code> object (Auro form elements)</td>
</tr>
<tr>
<td>Force validation on submit</td>
<td>Manual per-element</td>
<td>Automatic</td>
</tr>
<tr>
<td>Submit button auto-disable</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Reset fields</td>
<td>Native inputs only</td>
<td>Auro form elements</td>
</tr>
<tr>
<td>Enter key submit</td>
<td>Native inputs only</td>
<td>Auro form elements</td>
</tr>
<tr>
<td>Event normalization</td>
<td>No</td>
<td>Unified input/change/submit/reset</td>
</tr>
</tbody>
</table>
