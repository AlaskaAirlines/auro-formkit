<auro-header level="1" id="overview">Input: Getting started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal config</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-clear" class="level2 body-xs">ariaLabel.clear</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-password-show" class="level2 body-xs">ariaLabel.password.show</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-password-hide" class="level2 body-xs">ariaLabel.password.hide</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State management</auro-anchorlink>
      <auro-anchorlink fluid href="#hasFocus" class="level2 body-xs">hasFocus</auro-anchorlink>
      <auro-anchorlink fluid href="#hasValue" class="level2 body-xs">hasValue</auro-anchorlink>
      <auro-anchorlink fluid href="#validity" class="level2 body-xs">Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
      <auro-anchorlink fluid href="#publicFunctions">Functions</auro-anchorlink>
      <auro-anchorlink fluid href="#clear" class="level2 body-xs">clear()</auro-anchorlink>
      <auro-anchorlink fluid href="#focus" class="level2 body-xs">focus()</auro-anchorlink>
      <auro-anchorlink fluid href="#reset" class="level2 body-xs">reset()</auro-anchorlink>
      <auro-anchorlink fluid href="#validate" class="level2 body-xs">validate()</auro-anchorlink>
      <auro-anchorlink fluid href="#auroInputUtilFormatIso" class="level2 body-xs">formatISODate()</auro-anchorlink>
      <auro-anchorlink fluid href="#auroInputUtilToIso" class="level2 body-xs">toISOFormatString()</auro-anchorlink>
      <auro-anchorlink fluid href="#auroInputUtilToFormattedValue" class="level2 body-xs">toFormattedValue()</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/install.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/frameworks.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/minimal-config.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/getting-started/slots.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="stateManagement">State management</auro-header>
        <p>Read the following properties with JavaScript to get the component's current state. The component sets <code>hasFocus</code>, <code>hasValue</code>, and <code>validity</code> itself, so read them instead of setting them.</p>
        <auro-header level="3" id="hasFocus">hasFocus</auro-header>
        <p>Returns <code>true</code> when the input element currently has focus.</p>
        <auro-header level="3" id="hasValue">hasValue</auro-header>
        <p>Returns <code>true</code> when the input element has a value.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the result of the last validation as a string, such as <code>valid</code>, <code>valueMissing</code>, or <code>customError</code>. It's <code>undefined</code> until the input is first validated.</p>
        <auro-header level="3" id="value">value</auro-header>
        <p>Gets or sets the current value of the input element.</p>
      </section>
      <section>
        <auro-header level="2" id="publicFunctions">Functions</auro-header>
        <p>The following public methods are available on the <code>&lt;auro-input&gt;</code> element.</p>
        <auro-header level="3" id="clear">clear()</auro-header>
        <p>Clears the current value of the input.</p>
        <auro-header level="3" id="focus">focus()</auro-header>
        <p>Programmatically moves focus to the input element.</p>
        <auro-header level="3" id="reset">reset()</auro-header>
        <p>Resets the component to its initial state, clearing the value and validation state.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/reset-state.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/reset-state.js) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Validates the value and updates <code>validity</code> and <code>errorMessage</code>. Pass <code>true</code> to validate even while the input has focus or before the user has interacted with it. <code>noValidate</code> doesn't stop this method from validating.</p>
      </section>
      <section>
        <auro-header level="3" id="auroInputUtil">AuroInputUtil</auro-header>
        <p><code>AuroInputUtil</code> is a standalone utility exported from the package for working with date values. When <code>type="date"</code> uses a full date format, <code>.value</code> stores a valid, complete date as ISO (<code>YYYY-MM-DD</code>). Use these helpers to convert between ISO and any display format in your application.</p>
        <auro-header level="4" id="auroInputUtilFormatIso">formatISODate(isoStr, format)</auro-header>
        <p>Converts an ISO string from <code>.value</code> into a display format string, such as <code>01/15/2024</code>. Returns <code>undefined</code> for empty or invalid input.</p>
        <pre class="language-js"><code class="language-js">AuroInputUtil.formatISODate('2024-01-15', 'dd/mm/yyyy'); // returns '15/01/2024'</code></pre>
        <auro-header level="4" id="auroInputUtilToIso">toISOFormatString(date)</auro-header>
        <p>Converts a <code>Date</code> instance to an ISO string you can use to set <code>input.value</code> in code. Throws an error when the argument isn't a valid <code>Date</code>.</p>
        <pre class="language-js"><code class="language-js">AuroInputUtil.toISOFormatString(new Date('2024/01/15')); // returns '2024-01-15'</code></pre>
        <auro-header level="4" id="auroInputUtilToFormattedValue">toFormattedValue(valueObject, format)</auro-header>
        <p>Converts a <code>Date</code> instance to a string in the given date format, such as <code>15/01/2024</code> for <code>dd/mm/yyyy</code>. Returns <code>undefined</code> when <code>valueObject</code> isn't a valid <code>Date</code> or <code>format</code> is empty.</p>
        <p>Use it when an API needs the date in a specific format, whatever format the user typed it in.</p>
        <ul>
          <li><strong>valueObject</strong>: The <code>Date</code> to format, such as <code>input.valueObject</code>.</li>
          <li><strong>format</strong>: The display format, such as <code>mm/dd/yyyy</code>.</li>
        </ul>
        <pre class="language-js"><code class="language-js">AuroInputUtil.toFormattedValue(auroInput.valueObject, 'dd/mm/yyyy'); // returns '15/01/2024' for an ISO value of '2024-01-15'</code></pre>
      </section>
    </div>
  </div>
</div>
