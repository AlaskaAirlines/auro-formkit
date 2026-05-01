<auro-header level="1" id="overview">Input - Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View More</span>
      <span slot="mobileToggleExpanded">View Less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#activeLabel" class="level2 body-xs">Active Label</auro-anchorlink>
      <auro-anchorlink fluid href="#lightDarkBackground" class="level2 body-xs">Light vs. Dark Background</auro-anchorlink>
      <auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
      <auro-anchorlink fluid href="#optionalFlag" class="level2 body-xs">No optional flag</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#behavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
      <auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
      <auro-anchorlink fluid href="#format" class="level2 body-xs">Format</auro-anchorlink>
      <auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input Mode</auro-anchorlink>
      <auro-anchorlink fluid href="#max" class="level2 body-xs">Max</auro-anchorlink>
      <auro-anchorlink fluid href="#maxLength" class="level2 body-xs">Max Length</auro-anchorlink>
      <auro-anchorlink fluid href="#min" class="level2 body-xs">Min</auro-anchorlink>
      <auro-anchorlink fluid href="#minLength" class="level2 body-xs">Min Length</auro-anchorlink>
      <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No Validate</auro-anchorlink>
      <auro-anchorlink fluid href="#pattern" class="level2 body-xs">Pattern</auro-anchorlink>
      <auro-anchorlink fluid href="#readonly" class="level2 body-xs">Readonly</auro-anchorlink>
      <auro-anchorlink fluid href="#required" class="level2 body-xs">Required</auro-anchorlink>
      <auro-anchorlink fluid href="#setCustomValidity" class="level2 body-xs">Set Custom Validity</auro-anchorlink>
      <auro-anchorlink fluid href="#type" class="level2 body-xs">Type</auro-anchorlink>
      <auro-anchorlink fluid href="#validateOnInput" class="level2 body-xs">Validate on Input</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="activeLabel">Active Label</auro-header>
        <p>Use the <code>activeLabel</code> attribute to make the label stay fixed in the active position.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/active-label.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/active-label.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="lightDarkBackground">Light vs. Dark Background</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-default.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-default.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper--ondark">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/appearance-inverse.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/appearance-inverse.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="placeholder">Placeholder</auro-header>
        <p>Use the <code>placeholder</code> attribute to add a custom placeholder message within the element.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placeholder.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placeholder.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="optionalFlag">No optional flag</auro-header>
        <p>The <code>&lt;auro-input&gt;</code> supports an <code>optionalLabel</code> slot, where users can override the default <code>(optional)</code> notification text.</p>
        <p>Providing the slot with no content will remove it.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>The component may be restyled by changing the values of the following token(s).</p>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="behavior">Behavior</auro-header>
        <auro-header level="3" id="disabled">Disabled</auro-header>
        <p>Use the <code>disable</code> attribute to prevent the user from interacting with the input.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/disabled.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/disabled.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="error">Error</auro-header>
        <p>Use the <code>error</code> attribute to apply a persistent custom error that supersedes the HTML5 validation logic.</p>
        <p>A custom error message can be set using the <code>error</code> attribute, or it can be used in conjunction with the <code>setCustomValidityCustomError</code> attribute.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/error.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/error.js) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="format">Format</auro-header>
        <p>Use the <code>format</code> attribute to set the format of the IMask.</p>
        <p>Default masking definitions:</p>
        <ul>
          <li>0 : number</li>
          <li>a : letter</li>
          <li>* : any character</li>
        </ul>
        <p>See <a href="https://imask.js.org/">IMask</a> for more information on how to configure a mask.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/format.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/format.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="inputMode">Input Mode</auro-header>
        <p>Set the <code>inputmode</code> for the input.</p>
        <p><strong>IMPORTANT</strong>: If you are also passing a <code>type</code>, most browsers will use the <code>type</code> attribute to determine what keyboard to display on mobile devices and ignore the <code>inputmode</code> attribute.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/inputmode.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/inputmode.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="max">Max</auro-header>
        <p>Use the <code>max</code> attribute to define a maximum value used during validation. The attribute will only apply when <code>&lt;auro-input&gt;</code> also has a <code>type</code> attribute for <code>number</code> or any date format.</p>
        <p>The <code>setCustomValidityRangeOverflow</code> attribute may optionally be used in combination with the <code>max</code> attribute to define custom help text used when the input value is greater than the value of the <code>max</code> attribute.</p>
        <auro-header level="4">Date Example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Number Example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="maxLength">Max Length</auro-header>
        <p>Use the <code>maxlength</code> attribute to control the length of the input entered.</p>
        <p>The <code>setCustomValidityTooLong</code> attribute may optionally be used in combination with the <code>maxLength</code> attribute to define custom help text used when the length of the input is too long.</p>
        <p class="note"><strong>Note:</strong> This attribute is not intended to be used with a <code>type</code> or <code>format</code> that already has a defined length, such as credit-cards, dates or phone numbers.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-length.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-length.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="min">Min</auro-header>
        <p>Use the <code>min</code> attribute to define a minimum value used during validation. The attribute will only apply when <code>&lt;auro-input&gt;</code> also has a <code>type</code> attribute for <code>number</code> or any date format.</p>
        <p>The <code>setCustomValidityRangeUnderflow</code> attribute may optionally be used in combination with the <code>min</code> attribute to define custom help text used when the input value is less than the value of the <code>min</code> attribute.</p>
        <auro-header level="4">Date Example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Number Example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="minLength">Min Length</auro-header>
        <p>Use the <code>minlength</code> attribute to control the length of the input entered.</p>
        <p>The <code>setCustomValidityTooShort</code> attribute may optionally be used in combination with the <code>minLength</code> attribute to define custom help text used when the length of the input is not long enough.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-length.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-length.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noValidate">No Validate</auro-header>
        <p>For use cases where the field is <code>required</code>, but live validation is not wanted, use the <code>noValidate</code> attribute.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/no-validate.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/no-validate.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="pattern">Pattern</auro-header>
        <p>Use the <code>pattern</code> attribute to set custom input validation. This example also uses the <code>spellcheck</code> attribute set to <code>false</code> which in turn sets <code>autocorrect</code> to <code>off</code> and <code>autocapitalize</code> to <code>none</code>. Additionally the <code>maxlength</code> attribute sets the maximum length of characters that can be entered.</p>
        <p>The <code>&lt;auro-input&gt;</code> component supports setting a custom validity message specific to the pattern validation by using the <code>setCustomValidityPatternMismatch</code> attribute.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/pattern.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/pattern.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="readonly">Readonly</auro-header>
        <p>Use the <code>readonly</code> attribute to prevent the user from editing the value of the input.</p>
        <p>In this example, the user is able to programmatically change the value of the input by clicking the button or clear out the contents of the input.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/readonly.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/readonly.js) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="required">Required</auro-header>
        <p>When present, the <code>required</code> attribute specifies that an input field must be filled out before submitting the form.</p>
        <p>When the validity check fails, the validityState equals <code>valueMissing</code>. The error message for the <code>valueMissing</code> validityState can be changed to a custom string using the <code>setCustomValidityValueMissing</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="setCustomValidity">Set Custom Validity</auro-header>
        <p>The <code>setCustomValidity</code> attribute can be used to set a custom string for all validityStates. When the component is first loaded, if this attribute is set on the element, all validityStates (except <code>valid</code>) will display the defined message.</p>
        <p class="note"><strong>Note:</strong> Custom strings are NOT localized. It is the responsibility of the element consumer to provide localized strings when using this element property.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="type">Type</auro-header>
        <auro-header level="4" id="typePassword">Password</auro-header>
        <p>Use the <code>type="password"</code> attribute for a password style input. The hide/show password feature will automatically appear once a user begins to enter data.</p>
        <p>Default help text will be added to the input <code>type="password"</code> if custom help text is not provided.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/password.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/password.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typeEmail">Email</auro-header>
        <p>Use the <code>type="email"</code> attribute for an email style input. These examples illustrate the default error messaging per that browser. Content may vary.</p>
        <p>Default help text will be added to the input <code>type="email"</code> if custom help text is not provided.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/email.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/email.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typeNumber">Number</auro-header>
        <p>Use the <code>type="number"</code> attribute for a numeric style input and invoke a numeric virtual keyboard on handheld devices.</p>
        <p>This <code>number</code> input type should only be used for incremental numeric values, meaning values with decimals will be considered invalid. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">MDN Web Docs</a> for more information.</p>
        <p class="note"><strong>Note:</strong> We recommend using <code>type="number"</code> with <code>inputmode="numeric"</code> for the best mobile experience.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typeCreditCard">Credit Card</auro-header>
        <p>Use the <code>type="credit-card"</code> attribute for a credit card formatted input.</p>
        <p>Default help text will be added to the input <code>type="credit-card"</code> if custom help text is not provided.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <p>Use the <code>type="credit-card"</code> and <code>icon</code> attributes for a credit card formatted input with credit card icon support.</p>
        <p><strong>Dependency</strong>: Please be sure to also install <a href="https://auro.alaskaair.com/components/auro/icon/install">auro-icon</a> as a peer dependency.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typePhone">Phone Number</auro-header>
        <p>Use the <code>type="tel"</code> attribute for a phone number formatted input. The default format is <code>+1 (000) 000-0000</code>.</p>
        <p class="note"><strong>Note:</strong> We recommend using <code>type="tel"</code> with <code>inputmode="tel"</code> for the best mobile experience.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <p>Use the <code>format</code> attribute to set a custom phone number format.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/tel-format.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/tel-format.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typeDate">Date</auro-header>
        <p>Use the <code>type="date"</code> attribute for a date formatted input. The default date format is <code>mm/dd/yyyy</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-day-year.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-day-year.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <p>Use the <code>format</code> attribute to put together any combination of <code>mm</code>, <code>dd</code>, & <code>yyyy</code> or <code>yy</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/year-month-day.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/year-month-day.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-year.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-year.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/day.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/day.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="validateOnInput">Validate on Input</auro-header>
        <p>Use the <code>validateOnInput</code> attribute to enable live validation on the <code>input</code> event. Recommended use is with setting a custom <code>pattern</code> and validation is required prior to a <code>blur</code> event.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/validate-on-input.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/validate-on-input.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="value">Value</auro-header>
        <auro-header level="4" id="valueProgrammatic">Programmatic</auro-header>
        <p>Use the <code>value</code> attribute to programmatically set the value of the input.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/programmatic-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/programmatic-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="resetState">Reset State</auro-header>
        <p>Use the <code>reset()</code> method to reset the <code>&lt;auro-input&gt;</code>'s <code>value</code> and <code>validity</code> state. Doing so will preserve all other attributes and properties.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/reset-state.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/reset-state.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/reset-state.js) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
      <section>
        <auro-header level="2" id="swapValues">Swapping Values Between Inputs</auro-header>
        <p>Example illustrates using a JavaScript function attached to an <code>auro-button</code> component <code>click</code> event to swap the values of two <code>auro-input</code> elements. An example of this use case would be swapping the departure and arrival airports in a flight search form.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/swap-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/swap-value.js) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
      </section>
    </div>
  </div>
</div>
