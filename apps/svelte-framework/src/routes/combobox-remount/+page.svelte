<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-combobox';
	import '@aurodesignsystem/auro-formkit/auro-menu';

	const options: [string, string][] = [
		['Apples', 'Apples'],
		['Oranges', 'Oranges'],
		['Peaches', 'Peaches'],
		['Grapes', 'Grapes'],
	];

	let comboboxValue = $state<string>('Apples');
	let showCombobox = $state<boolean>(true);

	function setInvalidValue() {
		const el = document.querySelector('auro-combobox') as any;
		if (el) el.value = 'invalid-option';
	}
</script>

<button id="toggle" onclick={() => (showCombobox = !showCombobox)}>
	{showCombobox ? 'Hide' : 'Show'} Combobox
</button>
<button id="set-invalid" onclick={setInvalidValue}>Set Invalid Value</button>

{#if showCombobox}
	<auro-combobox behavior="filter" value={comboboxValue}>
		<auro-menu>
			{#each options as [value, label]}
				<auro-menuoption {value}>{label}</auro-menuoption>
			{/each}
		</auro-menu>
	</auro-combobox>
{/if}

<style>
	#toggle {
		margin-right: 1rem;
	}
</style>
