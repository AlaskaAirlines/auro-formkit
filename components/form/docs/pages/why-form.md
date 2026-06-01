<auro-header level="1" id="overview">Why auro-form?</auro-header>

<p>The native <code>&lt;form&gt;</code> element handles submission and reset for standard HTML inputs, but it has no awareness of web components, cannot orchestrate validation across custom elements, and provides no centralized state management. <code>auro-form</code> fills these gaps for applications built with Auro components.</p>

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

<p>New elements added to the DOM are detected via <code>MutationObserver</code> and integrated automatically.</p>

<auro-header level="2" id="validationOrchestration">Validation orchestration</auro-header>

<p>Native forms validate each input independently. There is no built-in way to check "are all required fields valid?" without querying each element manually.</p>

<p><code>auro-form</code> provides:</p>

<ul>
  <li>A single <code>validity</code> getter that returns <code>'valid'</code>, <code>'invalid'</code>, or <code>null</code> based on the aggregate state of all child form elements</li>
  <li>Automatic validation of all elements on <code>submit()</code> — each element's <code>validate(true)</code> is called to force error display</li>
  <li>Per-element validity tracking via an internal <code>formState</code> object</li>
  <li>Listening for <code>auroFormElement-validated</code> events from child components to stay in sync</li>
</ul>

<auro-header level="2" id="centralizedState">Centralized state</auro-header>

<p>Native forms have no concept of "has the user touched anything?" or "what are all the current values?"</p>

<p><code>auro-form</code> tracks:</p>

<ul>
  <li><strong><code>value</code></strong> — A key-value object of all form element values, keyed by element <code>name</code></li>
  <li><strong><code>isInitialState</code></strong> — Whether any element has been modified since initialization</li>
  <li><strong>Submit/reset button state</strong> — Submit and reset buttons are automatically disabled based on form state (e.g., reset is disabled when the form is in its initial state)</li>
</ul>

<auro-header level="2" id="submitAndReset">Submit and reset</auro-header>

<p>Native form submission navigates to a URL or requires <code>event.preventDefault()</code> and manual value extraction.</p>

<p><code>auro-form</code> simplifies this:</p>

<ul>
  <li><strong><code>submit()</code></strong> — Validates all elements. If valid, dispatches a <code>submit</code> event with a <code>detail.value</code> object containing all form values. No page navigation.</li>
  <li><strong><code>reset()</code></strong> — Resets all child elements to their initial state, dispatches a <code>reset</code> event with <code>detail.previousValue</code> containing the pre-reset values.</li>
  <li><strong>Enter key</strong> — Pressing Enter on a form element triggers <code>submit()</code>, matching native form behavior. Textareas are excluded to allow newlines.</li>
</ul>

<auro-header level="2" id="eventNormalization">Event normalization</auro-header>

<p>Each Auro component dispatches its own events (<code>auroSelect-valueSet</code>, <code>auroDatePicker-valueSet</code>, etc.). Listening for all of these individually is error-prone.</p>

<p><code>auro-form</code> normalizes events:</p>

<ul>
  <li><code>input</code> — Fired when any child element receives user input</li>
  <li><code>change</code> — Fired when any child element's value changes, or when the form is initialized</li>
  <li><code>submit</code> — Fired with aggregated form values on valid submission</li>
  <li><code>reset</code> — Fired with previous values on reset</li>
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
      <td><code>value</code> object (all Auro components)</td>
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
      <td>Reset to initial state</td>
      <td>Native inputs only</td>
      <td>All Auro components</td>
    </tr>
    <tr>
      <td>Enter key submit</td>
      <td>Native inputs only</td>
      <td>All Auro components</td>
    </tr>
    <tr>
      <td>Event normalization</td>
      <td>No</td>
      <td>Unified input/change/submit/reset</td>
    </tr>
  </tbody>
</table>
