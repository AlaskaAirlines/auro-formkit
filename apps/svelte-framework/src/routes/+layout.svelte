<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-combobox';
	import '@aurodesignsystem/auro-formkit/auro-counter';
	import '@aurodesignsystem/auro-formkit/auro-datepicker';
	import '@aurodesignsystem/auro-formkit/auro-menu';
	import '@aurodesignsystem/auro-formkit/auro-select';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>
