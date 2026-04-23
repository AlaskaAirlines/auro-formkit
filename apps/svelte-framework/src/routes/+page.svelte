<script lang="ts">
	const suites: { label: string; path: string }[] = [
		{ label: 'auro-checkbox: interaction', path: '/checkbox-interaction' },
		{ label: 'auro-combobox: interaction', path: '/combobox-interaction' },
		{ label: 'auro-combobox: remount', path: '/combobox-remount' },
		{ label: 'auro-combobox: city search', path: '/combobox-city-search' },
		{ label: 'auro-combobox: city search (full planbook config)', path: '/combobox-city-search-full' },
		{ label: 'auro-combobox: city search (preselected)', path: '/combobox-city-search-preselected' },
		{ label: 'auro-combobox: city search (preselected, auto-navigate)', path: '/combobox-city-search-preselected-navigate' },
		{ label: 'auro-counter-group: dropdown keyboard', path: '/counter-dropdown' },
		{ label: 'auro-counter-group: interaction', path: '/counter-interaction' },
		{ label: 'auro-counter-group: remount', path: '/counter-remount' },
		{ label: 'auro-counter: remount (single)', path: '/single-counter-remount' },
		{ label: 'auro-datepicker: fullscreen', path: '/datepicker-fullscreen' },
		{ label: 'auro-datepicker: interaction', path: '/datepicker-interaction' },
		{ label: 'auro-dropdown: interaction', path: '/dropdown-interaction' },
		{ label: 'auro-form: interaction', path: '/form-interaction' },
		{ label: 'auro-input: interaction', path: '/input-interaction' },
		{ label: 'auro-menu: interaction', path: '/menu-interaction' },
		{ label: 'auro-radio: interaction', path: '/radio-interaction' },
		{ label: 'auro-select: interaction', path: '/select-interaction' },
		{ label: 'auro-select: remount', path: '/select-remount' },
		{ label: 'auro-select: remount (multiselect)', path: '/select-remount-multiselect' },
		{ label: 'auro-select: dynamic menu (preselected)', path: '/select-dynamic' },
		{ label: 'auro-select: dynamic menu (preselected, auto-navigate)', path: '/select-dynamic-navigate' },
	];
</script>

<h1>Svelte</h1>
<p>Framework Test Harness</p>
<ul>
	{#each suites as { label, path }}
		<li><a href={path}>{label}</a></li>
	{/each}
</ul>
