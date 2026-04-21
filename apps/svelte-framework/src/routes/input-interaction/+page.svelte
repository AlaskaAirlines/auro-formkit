<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-input';
</script>

<div>
	<!-- Default text input -->
	<section data-testid="default">
		<auro-input name="text" bordered>
			<span slot="label">Full name</span>
		</auro-input>
	</section>

	<!-- Required input -->
	<section data-testid="required">
		<auro-input required name="requiredField" bordered>
			<span slot="label">Required field</span>
		</auro-input>
	</section>

	<!-- Email input -->
	<section data-testid="email">
		<auro-input type="email" required name="email" bordered>
			<span slot="label">Email address</span>
		</auro-input>
	</section>

	<!-- Password input -->
	<section data-testid="password">
		<auro-input type="password" name="password" bordered>
			<span slot="label">Password</span>
		</auro-input>
	</section>

	<!-- Credit card input -->
	<section data-testid="credit-card">
		<auro-input type="credit-card" name="cc" icon bordered>
			<span slot="label">Card number</span>
		</auro-input>
	</section>

	<!-- Disabled input -->
	<section data-testid="disabled">
		<auro-input disabled name="disabledField" value="Cannot edit" bordered>
			<span slot="label">Disabled</span>
		</auro-input>
	</section>

	<!-- Readonly input -->
	<section data-testid="readonly">
		<auro-input readonly name="readonlyField" value="Read only" bordered>
			<span slot="label">Read only</span>
		</auro-input>
	</section>

	<!-- Input with preset value -->
	<section data-testid="preset">
		<auro-input name="preset" value="Hello World" bordered>
			<span slot="label">Preset value</span>
		</auro-input>
	</section>

	<!-- Input with minLength/maxLength -->
	<section data-testid="length-constraints">
		<auro-input required name="constrained" minLength="3" maxLength="10" bordered>
			<span slot="label">3-10 characters</span>
		</auro-input>
	</section>

	<!-- Input with pattern -->
	<section data-testid="pattern">
		<auro-input required name="zipcode" pattern={"^\\d{5}$"} bordered>
			<span slot="label">ZIP code (5 digits)</span>
		</auro-input>
	</section>

	<!-- noValidate input -->
	<section data-testid="no-validate">
		<auro-input required name="noVal" noValidate bordered>
			<span slot="label">No validation</span>
		</auro-input>
	</section>

	<!-- Error attribute input -->
	<section data-testid="error-attr">
		<auro-input name="errorField" error="Custom error message" bordered>
			<span slot="label">Error field</span>
		</auro-input>
	</section>

	<button id="outside-element">Outside</button>
</div>
