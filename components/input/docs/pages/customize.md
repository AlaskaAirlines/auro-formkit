<auro-header level="1" id="overview">Input: Customize</auro-header>
<div class="contentWrapper">
  <nav>
    <auro-nav anchorNavContent=".scrollWrapper">
      <span slot="mobileToggleCollapsed">View more</span>
      <span slot="mobileToggleExpanded">View less</span>
      <auro-anchorlink fluid href="#appearance">Appearance</auro-anchorlink>
      <auro-anchorlink fluid href="#activeLabel" class="level2 body-xs">Active label</auro-anchorlink>
      <auro-anchorlink fluid href="#cssParts" class="level2 body-xs">CSS shadow parts</auro-anchorlink>
      <auro-anchorlink fluid href="#dvInputOnly" class="level2 body-xs">Display value input only</auro-anchorlink>
      <auro-anchorlink fluid href="#icon" class="level2 body-xs">Icon</auro-anchorlink>
      <auro-anchorlink fluid href="#lightDarkBackground" class="level2 body-xs">Light vs. dark background</auro-anchorlink>
      <auro-anchorlink fluid href="#localization" class="level2 body-xs">Localization</auro-anchorlink>
      <auro-anchorlink fluid href="#optionalFlag" class="level2 body-xs">Optional flag</auro-anchorlink>
      <auro-anchorlink fluid href="#placeholder" class="level2 body-xs">Placeholder</auro-anchorlink>
      <auro-anchorlink fluid href="#simple" class="level2 body-xs">Simple</auro-anchorlink>
      <auro-anchorlink fluid href="#cssTokens" class="level2 body-xs">Tokens</auro-anchorlink>
      <auro-anchorlink fluid href="#behavior">Behavior</auro-anchorlink>
      <auro-anchorlink fluid href="#autocomplete" class="level2 body-xs">Autocomplete</auro-anchorlink>
      <auro-anchorlink fluid href="#autocorrect" class="level2 body-xs">Autocorrect</auro-anchorlink>
      <auro-anchorlink fluid href="#setCustomValidity" class="level2 body-xs">Custom validation messages</auro-anchorlink>
      <auro-anchorlink fluid href="#disabled" class="level2 body-xs">Disabled</auro-anchorlink>
      <auro-anchorlink fluid href="#error" class="level2 body-xs">Error</auro-anchorlink>
      <auro-anchorlink fluid href="#format" class="level2 body-xs">Format</auro-anchorlink>
      <auro-anchorlink fluid href="#inputMode" class="level2 body-xs">Input mode</auro-anchorlink>
      <auro-anchorlink fluid href="#max" class="level2 body-xs">Max</auro-anchorlink>
      <auro-anchorlink fluid href="#maxLength" class="level2 body-xs">Max length</auro-anchorlink>
      <auro-anchorlink fluid href="#min" class="level2 body-xs">Min</auro-anchorlink>
      <auro-anchorlink fluid href="#minLength" class="level2 body-xs">Min length</auro-anchorlink>
      <auro-anchorlink fluid href="#name" class="level2 body-xs">Name</auro-anchorlink>
      <auro-anchorlink fluid href="#noValidate" class="level2 body-xs">No validation</auro-anchorlink>
      <auro-anchorlink fluid href="#pattern" class="level2 body-xs">Pattern</auro-anchorlink>
      <auro-anchorlink fluid href="#readonly" class="level2 body-xs">Readonly</auro-anchorlink>
      <auro-anchorlink fluid href="#required" class="level2 body-xs">Required</auro-anchorlink>
      <auro-anchorlink fluid href="#type" class="level2 body-xs">Type</auro-anchorlink>
      <auro-anchorlink fluid href="#validateOnInput" class="level2 body-xs">Validate on input</auro-anchorlink>
      <auro-anchorlink fluid href="#value" class="level2 body-xs">Value</auro-anchorlink>
    </auro-nav>
  </nav>
  <div class="mainContent">
    <div class="scrollWrapper">
      <section>
        <auro-header level="2" id="appearance">Appearance</auro-header>
        <auro-header level="3" id="activeLabel">Active label</auro-header>
        <p>Use the <code>activeLabel</code> attribute to make the label stay fixed in the active position. This applies only to the default <code>classic</code> layout; the emphasized and snowflake layouts always render the label inside the field and are unaffected.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/active-label.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/active-label.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/css-parts.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/css-parts.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/css-parts.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="dvInputOnly">Display value input only</auro-header>
        <p>Use the <code>dvInputOnly</code> attribute to keep the label visible while <code>displayValue</code> slot content is shown in place of the value. Without this attribute, the <code>displayValue</code> content hides both the label and the value.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/dv-input-only.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/dv-input-only.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="icon">Icon</auro-header>
        <p>Use the <code>icon</code> attribute to show a card icon left of the value that changes to the detected card brand as the user types. Applies only when <code>type="credit-card"</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="lightDarkBackground">Light vs. dark background</auro-header>
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
        <auro-header level="3" id="localization">Localization</auro-header>
        <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/customize/localization.md) -->
        <!-- AURO-GENERATED-CONTENT:END -->
        <auro-header level="3" id="optionalFlag">Optional flag</auro-header>
        <p>Use the <code>optionalLabel</code> slot to replace the " (optional)" text shown after the label when the input isn't <code>required</code>.</p>
        <p>To show nothing, put an empty element in the slot, such as <code>&lt;span slot="optionalLabel"&gt;&lt;/span&gt;</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/optional-label.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/optional-label.html) -->
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
        <auro-header level="3" id="simple">Simple</auro-header>
        <p>Use the <code>simple</code> attribute to remove the field's border and background, such as when the input is placed inside the trigger of <code>auro-dropdown</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/simple.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/simple.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="cssTokens">Tokens</auro-header>
        <p>Change the values of the following tokens to restyle the component.</p>
        <!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
        <!-- AURO-GENERATED-CONTENT:END -->
      </section>
      <section>
        <auro-header level="2" id="behavior">Behavior</auro-header>
        <auro-header level="3" id="autocomplete">Autocomplete</auro-header>
        <p>Use the <code>autocomplete</code> attribute to control what the browser can suggest for autofill. At this time, only <code>autocomplete="off"</code> is supported.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/autocomplete.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/autocomplete.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="autocorrect">Autocorrect</auro-header>
        <p>Set the <code>autocorrect</code> attribute to <code>off</code> to stop Safari on iOS from correcting words as the user types.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/autocorrect.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/autocorrect.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="setCustomValidity">Custom validation messages</auro-header>
        <p>The input has several properties that set the error message for each kind of validation error. When <code>setCustomValidity</code> is set, it's used for every error and replaces the error-specific messages.</p>
        <ul>
          <li><strong><code>setCustomValidity</code></strong>: Shown for every validation error. When set, it replaces the messages from <code>error</code> and every other property in this list.</li>
          <li><strong><code>setCustomValidityValueMissing</code></strong>: Shown when the component is <code>required</code> and the user leaves it empty.</li>
          <li><strong><code>setCustomValidityForType</code></strong>: Shown when the value doesn't fit the <code>type</code>, such as a badly formed email address, an incomplete card number, or an incomplete date.</li>
          <li><strong><code>setCustomValidityBadInput</code></strong>: Doesn't currently change any message, because the input never reports <code>badInput</code>.</li>
          <li><strong><code>setCustomValidityRangeOverflow</code></strong>: Shown when the value is above <code>max</code>.</li>
          <li><strong><code>setCustomValidityRangeUnderflow</code></strong>: Shown when the value is below <code>min</code>.</li>
          <li><strong><code>setCustomValidityTooLong</code></strong>: Shown when the value is longer than <code>maxlength</code>.</li>
          <li><strong><code>setCustomValidityTooShort</code></strong>: Shown when the value is shorter than <code>minlength</code>.</li>
          <li><strong><code>setCustomValidityPatternMismatch</code></strong>: Shown when the value doesn't match <code>pattern</code>, or when <code>type="date"</code> and the date isn't a real calendar date, such as a month of <code>13</code>. For dates, it falls back to "Invalid Date Format Entered" when not set.</li>
        </ul>
        <p>The input picks the error message in this order: <code>setCustomValidity</code>, then the error-specific property, then the browser's own message.</p>
        <p class="note"><strong>Note:</strong> The input doesn't translate these messages, so supply translated text for each language you support.</p>
        <auro-header level="4">One message for every error</auro-header>
        <p>Use <code>setCustomValidity</code> to set one message for every kind of validation error.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Range overflow</auro-header>
        <p>Use <code>setCustomValidityRangeOverflow</code> to set the message shown when the value is above <code>max</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-range-overflow.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-range-overflow.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Range underflow</auro-header>
        <p>Use <code>setCustomValidityRangeUnderflow</code> to set the message shown when the value is below <code>min</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-range-underflow.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-range-underflow.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Too long</auro-header>
        <p>Use <code>setCustomValidityTooLong</code> to set the message shown when the value is longer than <code>maxlength</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-too-long.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-too-long.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Too short</auro-header>
        <p>Use <code>setCustomValidityTooShort</code> to set the message shown when the value is shorter than <code>minlength</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-too-short.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-too-short.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Type validation</auro-header>
        <p>Use <code>setCustomValidityForType</code> to set the message shown when the value doesn't fit the <code>type</code>, such as a badly formed email address.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-for-type.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-for-type.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Value missing</auro-header>
        <p>Use <code>setCustomValidityValueMissing</code> to set the message shown when a <code>required</code> field is left empty.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/set-custom-validity-value-missing.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/set-custom-validity-value-missing.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="disabled">Disabled</auro-header>
        <p>Use the <code>disabled</code> attribute to stop the user from interacting with the input.</p>
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
        <p>Use the <code>error</code> attribute to show an error that stays until you remove the attribute, in place of the input's built-in validation.</p>
        <p>The <code>error</code> value is the error message, unless you also set <code>setCustomValidityCustomError</code> or <code>setCustomValidity</code>, which replace it.</p>
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
        <p>Use the <code>format</code> attribute to set the pattern the value is formatted to as the user types.</p>
        <p>Default pattern characters:</p>
        <ul>
          <li><code>0</code>: a digit</li>
          <li><code>a</code>: a letter</li>
          <li><code>*</code>: any character</li>
        </ul>
        <p>See <auro-hyperlink href="https://imask.js.org/">IMask</auro-hyperlink> for more information on how to configure a mask.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/format.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/format.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="inputMode">Input mode</auro-header>
        <p>Use the <code>inputmode</code> attribute to choose which on-screen keyboard mobile devices show, such as <code>tel</code> for a phone keypad. When not set, the input uses <code>numeric</code> for the <code>number</code>, <code>tel</code>, <code>credit-card</code>, and <code>date</code> types.</p>
        <p class="note"><strong>Note:</strong> When you also set <code>type</code>, most browsers use <code>type</code> to choose the keyboard on mobile devices and ignore <code>inputmode</code>.</p>
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
        <p>Use the <code>max</code> attribute to set the largest value allowed. It applies only when <code>type="number"</code>, or <code>type="date"</code> with a full date format; write dates in ISO format (<code>YYYY-MM-DD</code>).</p>
        <p>Use <code>setCustomValidityRangeOverflow</code> with <code>max</code> to set the error message shown when the value is above <code>max</code>.</p>
        <auro-header level="4">Date example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Number example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/max-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/max-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="maxLength">Max length</auro-header>
        <p>Use the <code>maxlength</code> attribute to set the most characters the user can enter.</p>
        <p>Use <code>setCustomValidityTooLong</code> with <code>maxlength</code> to set the error message shown when the value is too long.</p>
        <p class="note"><strong>Note:</strong> Don't set <code>maxlength</code> when <code>type</code> is <code>credit-card</code>, <code>tel</code>, or <code>date</code>, because those types set their own length.</p>
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
        <p>Use the <code>min</code> attribute to set the smallest value allowed. It applies only when <code>type="number"</code>, or <code>type="date"</code> with a full date format; write dates in ISO format (<code>YYYY-MM-DD</code>).</p>
        <p>Use <code>setCustomValidityRangeUnderflow</code> with <code>min</code> to set the error message shown when the value is below <code>min</code>.</p>
        <auro-header level="4">Date example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-date.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4">Number example</auro-header>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="minLength">Min length</auro-header>
        <p>Use the <code>minlength</code> attribute to set the fewest characters the value needs to be valid.</p>
        <p>Use <code>setCustomValidityTooShort</code> with <code>minlength</code> to set the error message shown when the value is too short.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/min-length.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/min-length.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="name">Name</auro-header>
        <p>Use the <code>name</code> attribute to set the field name for the input. <code>auro-form</code> uses it to identify the field's value, and the input also passes it to the inner <code>&lt;input&gt;</code> element.</p>
        <p>The <code>id</code> attribute identifies the element for CSS and JavaScript, while <code>name</code> identifies the input's value in the data that <code>auro-form</code> collects.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/name.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/name.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="noValidate">No validation</auro-header>
        <p>When a field is <code>required</code> but shouldn't be validated when it loses focus, use the <code>noValidate</code> attribute. Validation still runs when code sets the value or when <code>validateOnInput</code> is set.</p>
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
        <p>Use the <code>pattern</code> attribute to set a regular expression the whole value must match. This example also sets <code>spellcheck</code> to <code>false</code>, which sets <code>autocorrect</code> to <code>off</code> and <code>autocapitalize</code> to <code>none</code>.</p>
        <p>Use the <code>setCustomValidityPatternMismatch</code> attribute to set the error message shown when the value doesn't match <code>pattern</code>.</p>
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
        <p>In this example, the user can't edit the value, but the buttons set and reset it in code. A read-only input doesn't show the clear button.</p>
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
        <p>When the field must be filled in, use the <code>required</code> attribute. It also removes the " (optional)" text after the label.</p>
        <p>When a required field is empty, <code>validity</code> is <code>valueMissing</code>. Use the <code>setCustomValidityValueMissing</code> attribute to change the error message for this case.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/required.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="3" id="type">Type</auro-header>
        <auro-header level="4" id="typeCreditCard">Credit card</auro-header>
        <p>Use the <code>type="credit-card"</code> attribute for a credit card formatted input.</p>
        <p>A <code>type="credit-card"</code> input shows built-in help text when you don't supply your own.</p>
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
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/credit-card-icon.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/credit-card-icon.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typeDate">Date</auro-header>
        <p>Use the <code>type="date"</code> attribute for a date formatted input. The default date format comes from <code>locale</code>, such as <code>mm/dd/yyyy</code> for <code>en-US</code>.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/month-day-year.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/month-day-year.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <p>Use the <code>format</code> attribute to combine <code>mm</code>, <code>dd</code>, and <code>yyyy</code> or <code>yy</code> in any order.</p>
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
        <auro-header level="4" id="typeEmail">Email</auro-header>
        <p>Use the <code>type="email"</code> attribute for an email address. When the value isn't a valid email address, the input shows a built-in error message, unless you set <code>setCustomValidityForType</code>.</p>
        <p>A <code>type="email"</code> input also shows built-in help text when you don't supply your own.</p>
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
        <p>Use the <code>type="number"</code> attribute for a number, such as a count of passengers. It shows a numeric keyboard on mobile devices.</p>
        <p>Use the <code>number</code> type only for numbers people count or step through, not for numbers such as card or account numbers. The input doesn't currently mark decimal values as invalid. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">MDN Web Docs</a> for more information.</p>
        <p class="note"><strong>Note:</strong> The input sets <code>inputmode="numeric"</code> for <code>type="number"</code> when you don't set <code>inputmode</code>, for the best mobile experience.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/number.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typePassword">Password</auro-header>
        <p>Use the <code>type="password"</code> attribute for a password. In the <code>classic</code> layout, once the input has a value, a show/hide password button appears while the user hovers over or has focus in the input.</p>
        <p>A <code>type="password"</code> input shows built-in help text when you don't supply your own.</p>
        <div class="exampleWrapper">
          <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/password.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </div>
        <auro-accordion alignRight>
          <span slot="trigger">See code</span>
          <!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/password.html) -->
          <!-- AURO-GENERATED-CONTENT:END -->
        </auro-accordion>
        <auro-header level="4" id="typePhone">Phone number</auro-header>
        <p>Use the <code>type="tel"</code> attribute for a phone number formatted input. The default format is <code>+1 (000) 000-0000</code>.</p>
        <p class="note"><strong>Note:</strong> Use <code>type="tel"</code> with <code>inputmode="tel"</code> for the best mobile experience. Without <code>inputmode</code>, the input uses <code>numeric</code>.</p>
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
        <auro-header level="3" id="validateOnInput">Validate on input</auro-header>
        <p>Use the <code>validateOnInput</code> attribute to validate the value as the user types, not only when the input loses focus. Use it with <code>pattern</code> when the user needs feedback before leaving the field.</p>
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
        <auro-header level="2" id="swapValues">Swapping values between inputs</auro-header>
        <p>This example uses a JavaScript function attached to an <code>auro-button</code> component's <code>click</code> event to swap the values of two <code>auro-input</code> elements, such as the departure and arrival airports in a flight search form.</p>
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
