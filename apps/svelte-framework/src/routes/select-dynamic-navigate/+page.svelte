<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const timer = setTimeout(() => {
			goto('/select-dynamic');
		}, 200);
		return () => clearTimeout(timer);
	});
</script>

<p>Navigating to select dynamic page...</p>
