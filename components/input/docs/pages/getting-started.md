<auro-header level="1" id="overview">Input - Getting Started</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#setup">Setup</auro-anchorlink>
      <auro-anchorlink fluid href="#recommendedSetup" class="level2 body-xs" onclick="openAccordion('recommendedAccordion')">Recommended</auro-anchorlink>
      <auro-anchorlink fluid href="#autoSetup" class="level2 body-xs" onclick="openAccordion('autoAccordion')">Auto</auro-anchorlink>
      <auro-anchorlink fluid href="#cdnSetup" class="level2 body-xs" onclick="openAccordion('cdnAccordion')">CDN</auro-anchorlink>
      <auro-anchorlink fluid href="#frameworks">Frameworks</auro-anchorlink>
      <auro-anchorlink fluid href="#react" class="level2 body-xs" onclick="openAccordion('react')">React</auro-anchorlink>
      <auro-anchorlink fluid href="#svelte" class="level2 body-xs" onclick="openAccordion('svelte')">Svelte</auro-anchorlink>
      <auro-anchorlink fluid href="#minimalConfig">Minimal Config</auro-anchorlink>
      <auro-anchorlink fluid href="#slots">Slots</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-label" class="level2 body-xs">label</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-helpText" class="level2 body-xs">helpText</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-optionalLabel" class="level2 body-xs">optionalLabel</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-displayValue" class="level2 body-xs">displayValue</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-clear" class="level2 body-xs">ariaLabel.clear</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-password-show" class="level2 body-xs">ariaLabel.password.show</auro-anchorlink>
      <auro-anchorlink fluid href="#slot-ariaLabel-password-hide" class="level2 body-xs">ariaLabel.password.hide</auro-anchorlink>
      <auro-anchorlink fluid href="#stateManagement">State Management</auro-anchorlink>
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
        <auro-header level="2" id="stateManagement">State Management</auro-header>
        <p>The following read-only properties reflect the current state of the component and can be accessed via JavaScript.</p>
        <auro-header level="3" id="hasFocus">hasFocus</auro-header>
        <p>Returns <code>true</code> when the input element currently has focus.</p>
        <auro-header level="3" id="hasValue">hasValue</auro-header>
        <p>Returns <code>true</code> when the input element has a value.</p>
        <auro-header level="3" id="validity">validity</auro-header>
        <p>Returns the current <code>validityState</code> of the component as a string. Possible values include <code>"valid"</code>, <code>"valueMissing"</code>, and <code>"customError"</code>.</p>
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
        <auro-header level="3" id="validate">validate()</auro-header>
        <p>Triggers validation on the component. Pass <code>true</code> to force validation even when <code>noValidate</code> is set.</p>
      </section>
      <section>
        <auro-header level="3" id="auroInputUtil">AuroInputUtil</auro-header>
        <p><code>AuroInputUtil</code> is a standalone utility exported from the package for working with date values. When <code>type="date"</code> is used, <code>.value</code> always stores the date as ISO (<code>YYYY-MM-DD</code>). Use these helpers to convert between ISO and any display format in your application.</p>
        <auro-header level="4" id="auroInputUtilFormatIso">formatISODate(isoStr, format)</auro-header>
        <p>Converts an ISO string from <code>.value</code> into a display format string (e.g. <code>'01/15/2024'</code>). Returns <code>undefined</code> for empty or invalid input. See <a href="customize">Customize</a> for full examples.</p>
        <pre class="language-js"><code class="language-js">AuroInputUtil.formatISODate('2024-01-15', 'dd/mm/yyyy'); // returns '15/01/2024</code></pre>
        <auro-header level="4" id="auroInputUtilToIso">toISOFormatString(date)</auro-header>
        <p>Converts a <code>Date</code> instance to an ISO string suitable for setting <code>input.value</code> programmatically. Throws for invalid input. See <a href="customize">Customize</a> for full examples.</p>
        <pre class="language-js"><code class="language-js">AuroInputUtil.toISOFormatString(new Date('2024/01/15')); // returns '2024-01-15</code></pre>
        <auro-header level="4" id="auroInputUtilToFormattedValue">toFormattedValue(valueObject, format)</auro-header>
        <p>Converts a date instance to a display-formatted string. For <code>type="date"</code> with a full date <code>format</code> (e.g. <code>mm/dd/yyyy</code>), it converts the ISO model value into the configured display format. Returns the value unchanged for non-date types or partial formats. Returns an empty string when the ISO value is structurally valid but contains an out-of-range date (e.g. month 99).</p>
        <p>This function is helpful when the datepicker value needs to be used in an API that only supports a specific date format. Regardless of the locale date format the user types, the value can be extracted in the necessary format.</p>
        <ul>
          <li><strong>valueObject</strong> — Pre-computed <code>Date</code> instance for the value (use <code>input.valueObject</code>).</li>
          <li><strong>format</strong> — The display format string (e.g. <code>'mm/dd/yyyy'</code>).</li>
        </ul>
        <pre class="language-js"><code class="language-js">AuroInputUtil.toFormattedValue(auroInput.valueObject, 'dd/mm/yyyy'); // returns '15/01/2024' for an ISO value of '2024-01-15'</code></pre>
      </section>
    </div>
  </div>
</div>
