<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-counter';
</script>

<!-- Standalone counter: default (min=0, max=9) -->
<section data-testid="default">
	<auro-counter>
		Adults
		<span slot="description">18 years or older</span>
	</auro-counter>
</section>

<!-- Counter at max boundary -->
<section data-testid="at-max">
	<auro-counter value="9" min="0" max="9">
		Items
	</auro-counter>
</section>

<!-- Counter at min boundary -->
<section data-testid="at-min">
	<auro-counter value="0" min="0" max="9">
		Items
	</auro-counter>
</section>

<!-- Disabled counter -->
<section data-testid="disabled">
	<auro-counter disabled value="3" min="0" max="9">
		Disabled Counter
	</auro-counter>
</section>

<!-- Counter group as dropdown -->
<section data-testid="dropdown-group">
	<auro-counter-group isDropdown max="6">
		<span slot="ariaLabel.bib.close">Close</span>
		<span slot="bib.fullscreen.headline">Passengers</span>
		<div slot="label">Passengers</div>
		<auro-counter>
			Adults
			<span slot="description">18 years or older</span>
		</auro-counter>
		<auro-counter>
			Children
			<span slot="description">2–17 years</span>
		</auro-counter>
		<auro-counter>
			Infants
			<span slot="description">Under 2 years</span>
		</auro-counter>
	</auro-counter-group>
</section>

<button id="outside-element">Outside</button>
