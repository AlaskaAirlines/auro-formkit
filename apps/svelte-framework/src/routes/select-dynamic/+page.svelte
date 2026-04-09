<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-select';
	import '@aurodesignsystem/auro-formkit/auro-menu';
	import { onMount } from 'svelte';

	const ALL_OPTIONS: [string, string][] = [
		['foo', 'Foo'],
		['bar', 'Bar'],
		['baz', 'Baz'],
	];

	// Preselected value set before options are available — mirrors the combobox city search pattern.
	let selectValue = $state<string>('bar');
	let options = $state<[string, string][]>([]);
	let showSelect = $state<boolean>(true);

	onMount(() => {
		// Simulate async option loading (e.g. an API call) arriving after the component mounts.
		const timer = setTimeout(() => {
			options = ALL_OPTIONS;
		}, 300);
		return () => clearTimeout(timer);
	});
</script>

<button id="toggle" onclick={() => (showSelect = !showSelect)}>
	{showSelect ? 'Hide' : 'Show'} Select
</button>

{#if showSelect}
	<auro-select value={selectValue}>
		<auro-menu>
			{#each options as [value, label]}
				<auro-menuoption {value}>{label}</auro-menuoption>
			{/each}
		</auro-menu>
	</auro-select>
{/if}
