<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-counter';

	const initialValue = 3;
	let showCounter = $state<boolean>(true);
</script>

<button id="toggle" onclick={() => (showCounter = !showCounter)}>
	{showCounter ? 'Hide' : 'Show'} Counter
</button>

{#if showCounter}
	<auro-counter value={String(initialValue)} min="0" max="9">
		Bags
		<span slot="description">Number of checked bags</span>
	</auro-counter>
{/if}

<style>
	#toggle {
		margin-bottom: 1rem;
	}
</style>
