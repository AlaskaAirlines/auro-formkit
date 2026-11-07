<script lang="ts">
	// Design tokens come from the installed package (not the CDN) so tests don't
	// depend on network timing or on whatever `@latest` happens to be. The legacy
	// tokens define `--ds-grid-breakpoint-*`, which drives fullscreen bib detection.
	import '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/CSSCustomProperties.css';
	import '@aurodesignsystem/design-tokens/dist/themes/alaska/CSSCustomProperties--alaska.min.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>
