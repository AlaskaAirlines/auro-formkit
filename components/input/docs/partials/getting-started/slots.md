<auro-header level="2" id="slots">Slots</auro-header>
<p>The following named slots are available on the <code>&lt;auro-input&gt;</code> element.</p>
<auro-header level="3" id="slot-label">label</auro-header>
<p>The field's label, which screen readers also announce as the field's name. Every input needs one.</p>
<auro-header level="3" id="slot-helpText">helpText</auro-header>
<p>Help text shown below the field, such as a hint about what to enter. An error message replaces it while the input is invalid. When the slot is empty, <code>password</code>, <code>email</code>, <code>credit-card</code>, and <code>tel</code> inputs show built-in help text.</p>
<auro-header level="3" id="slot-optionalLabel">optionalLabel</auro-header>
<p>Text shown after the label when the input isn't <code>required</code>, in place of the default " (optional)". To show nothing, put an empty element in the slot, such as <code>&lt;span slot="optionalLabel"&gt;&lt;/span&gt;</code>.</p>
<auro-header level="3" id="slot-displayValue">displayValue</auro-header>
<p>Content shown in place of the value when the input has a value and doesn't have focus, such as a city name for an airport code. It also hides the label unless <code>dvInputOnly</code> is set.</p>
<auro-header level="3" id="slot-ariaLabel-clear">ariaLabel.clear</auro-header>
<p>Text screen readers announce for the clear button, for example "Clear full name". Defaults to "Clear Input".</p>
<auro-header level="3" id="slot-ariaLabel-password-show">ariaLabel.password.show</auro-header>
<p>Text screen readers announce for the button that shows the password, for example "Show password". Defaults to "Show Password".</p>
<auro-header level="3" id="slot-ariaLabel-password-hide">ariaLabel.password.hide</auro-header>
<p>Text screen readers announce for the button that hides the password, for example "Hide password". Defaults to "Hide Password".</p>
