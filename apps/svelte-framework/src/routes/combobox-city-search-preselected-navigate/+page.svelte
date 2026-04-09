<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const timer = setTimeout(() => {
			goto('/combobox-city-search-preselected');
		}, 200);
		return () => clearTimeout(timer);
	});
</script>

<p>Navigating to preselected combobox page...</p>
