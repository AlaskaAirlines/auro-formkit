<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-select';
	import '@aurodesignsystem/auro-formkit/auro-menu';

	const options: [string, string][] = [
		['foo', 'Foo'],
		['bar', 'Bar'],
		['baz', 'Baz'],
	];

	let selectValue = $state<string>('bar');
	let showSelect = $state<boolean>(true);

	function setInvalidValue() {
		const el = document.querySelector('auro-select') as any;
		if (el) el.value = 'invalid-option';
	}
</script>

<button id="toggle" onclick={() => (showSelect = !showSelect)}>
	{showSelect ? 'Hide' : 'Show'} Select
</button>
<button id="set-invalid" onclick={setInvalidValue}>Set Invalid Value</button>

{#if showSelect}
	<auro-select value={selectValue}>
		<auro-menu>
			{#each options as [value, label]}
				<auro-menuoption {value}>{label}</auro-menuoption>
			{/each}
		</auro-menu>
	</auro-select>
{/if}

<style>
	#toggle {
		margin-right: 1rem;
	}
</style>
