<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-checkbox';
</script>

<!-- Single checkbox -->
<section data-testid="default">
	<auro-checkbox value="agree">I agree to the terms</auro-checkbox>
</section>

<!-- Disabled checkbox -->
<section data-testid="disabled">
	<auro-checkbox disabled value="disabled">Disabled option</auro-checkbox>
</section>

<!-- Pre-checked checkbox -->
<section data-testid="checked">
	<auro-checkbox checked value="checked">Pre-checked option</auro-checkbox>
</section>

<!-- Checkbox group -->
<section data-testid="group">
	<auro-checkbox-group>
		<span slot="legend">Favorite fruits</span>
		<auro-checkbox value="apples" name="fruits">Apples</auro-checkbox>
		<auro-checkbox value="oranges" name="fruits">Oranges</auro-checkbox>
		<auro-checkbox value="bananas" name="fruits">Bananas</auro-checkbox>
	</auro-checkbox-group>
</section>

<!-- Required checkbox group -->
<section data-testid="required-group">
	<auro-checkbox-group required>
		<span slot="legend">Required selection</span>
		<auro-checkbox value="option1" name="required">Option 1</auro-checkbox>
		<auro-checkbox value="option2" name="required">Option 2</auro-checkbox>
	</auro-checkbox-group>
</section>

<!-- Disabled group -->
<section data-testid="disabled-group">
	<auro-checkbox-group disabled>
		<span slot="legend">Disabled group</span>
		<auro-checkbox value="a" name="disabled-group">Alpha</auro-checkbox>
		<auro-checkbox value="b" name="disabled-group">Bravo</auro-checkbox>
	</auro-checkbox-group>
</section>

<button id="outside-element">Outside</button>
