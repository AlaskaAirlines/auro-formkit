<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-counter';

	const initialValues = [2, 1, 0];
	let showCounter = $state<boolean>(true);
</script>

<button id="toggle" onclick={() => (showCounter = !showCounter)}>
	{showCounter ? 'Hide' : 'Show'} Counter
</button>

{#if showCounter}
	<auro-counter-group isDropdown>
		<span slot="ariaLabel.bib.close">Close</span>
		<span slot="bib.fullscreen.headline">Passengers</span>
		<div slot="label">Passengers</div>
		<div slot="valueText">Open passengers</div>
		<auro-counter name="adults" value={String(initialValues[0])}>
			Adults
			<span slot="description">18 years or older</span>
		</auro-counter>
		<auro-counter name="children" value={String(initialValues[1])}>
			Children
			<span slot="description">2–17 years</span>
		</auro-counter>
		<auro-counter name="infants" value={String(initialValues[2])}>
			Infants
			<span slot="description">Under 2 years</span>
		</auro-counter>
	</auro-counter-group>
{/if}

<style>
	#toggle {
		margin-bottom: 1rem;
	}
</style>
