<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-radio';
</script>

<div>
	<!-- Default radio group -->
	<section data-testid="default">
		<auro-radio-group>
			<span slot="legend">Favorite color</span>
			<auro-radio value="red" data-value="red" name="color">Red</auro-radio>
			<auro-radio value="blue" data-value="blue" name="color">Blue</auro-radio>
			<auro-radio value="green" data-value="green" name="color">Green</auro-radio>
		</auro-radio-group>
	</section>

	<!-- Group with a disabled option -->
	<section data-testid="with-disabled">
		<auro-radio-group>
			<span slot="legend">Options</span>
			<auro-radio value="opt1" data-value="opt1" name="opts">Option 1</auro-radio>
			<auro-radio value="opt2" data-value="opt2" name="opts" disabled>Option 2 (disabled)</auro-radio>
			<auro-radio value="opt3" data-value="opt3" name="opts">Option 3</auro-radio>
		</auro-radio-group>
	</section>

	<!-- Group with preset selection -->
	<section data-testid="preset">
		<auro-radio-group>
			<span slot="legend">Preset selection</span>
			<auro-radio value="alpha" data-value="alpha" name="preset">Alpha</auro-radio>
			<auro-radio value="beta" data-value="beta" name="preset" checked>Beta</auro-radio>
			<auro-radio value="gamma" data-value="gamma" name="preset">Gamma</auro-radio>
		</auro-radio-group>
	</section>

	<!-- Required group -->
	<section data-testid="required">
		<auro-radio-group required>
			<span slot="legend">Required selection</span>
			<auro-radio value="yes" data-value="yes" name="required">Yes</auro-radio>
			<auro-radio value="no" data-value="no" name="required">No</auro-radio>
		</auro-radio-group>
	</section>

	<!-- Entirely disabled group -->
	<section data-testid="disabled-group">
		<auro-radio-group disabled>
			<span slot="legend">Disabled group</span>
			<auro-radio value="a" data-value="a" name="dis">Alpha</auro-radio>
			<auro-radio value="b" data-value="b" name="dis">Bravo</auro-radio>
		</auro-radio-group>
	</section>

	<!-- Horizontal layout -->
	<section data-testid="horizontal">
		<auro-radio-group horizontal>
			<span slot="legend">Horizontal</span>
			<auro-radio value="x" data-value="x" name="horiz">X</auro-radio>
			<auro-radio value="y" data-value="y" name="horiz">Y</auro-radio>
			<auro-radio value="z" data-value="z" name="horiz">Z</auro-radio>
		</auro-radio-group>
	</section>

	<!-- Group with error attribute -->
	<section data-testid="with-error">
		<auro-radio-group error="Please select an option">
			<span slot="legend">Error state</span>
			<auro-radio value="e1" data-value="e1" name="error">E1</auro-radio>
			<auro-radio value="e2" data-value="e2" name="error">E2</auro-radio>
		</auro-radio-group>
	</section>

	<!-- noValidate group -->
	<section data-testid="no-validate">
		<auro-radio-group required noValidate>
			<span slot="legend">No validation</span>
			<auro-radio value="nv1" data-value="nv1" name="noval">NV1</auro-radio>
			<auro-radio value="nv2" data-value="nv2" name="noval">NV2</auro-radio>
		</auro-radio-group>
	</section>

	<button id="outside-element">Outside</button>
</div>
