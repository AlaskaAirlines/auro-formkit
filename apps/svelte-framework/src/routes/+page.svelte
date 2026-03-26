<script lang="ts">
	const suites: { label: string; path: string }[] = [
		{ label: 'auro-select: remount', path: '/select-remount' },
		{ label: 'auro-select: remount (multiselect)', path: '/select-remount-multiselect' },
		{ label: 'auro-combobox: remount', path: '/combobox-remount' },
		{ label: 'auro-counter-group: dropdown keyboard', path: '/counter-dropdown' },
		{ label: 'auro-counter-group: remount', path: '/counter-remount' },
		{ label: 'auro-counter: remount (single)', path: '/single-counter-remount' },
	];
</script>

<h1>Svelte</h1>
<p>Framework Test Harness</p>
<ul>
	{#each suites as { label, path }}
		<li><a href={path}>{label}</a></li>
	{/each}
</ul>
