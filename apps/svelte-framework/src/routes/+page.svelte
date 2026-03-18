<script lang="ts">
	const suites: { label: string; path: string }[] = [
		{ label: 'auro-select: remount', path: '/select-remount' },
		{ label: 'auro-select: remount (multiselect)', path: '/select-remount-multiselect' },
	];
</script>

<h1>Svelte</h1>
<p>Framework Test Harness</p>
<ul>
	{#each suites as { label, path }}
		<li><a href={path}>{label}</a></li>
	{/each}
</ul>
