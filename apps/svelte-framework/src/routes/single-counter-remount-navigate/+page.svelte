<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const timer = setTimeout(() => {
			goto('/single-counter-remount');
		}, 200);
		return () => clearTimeout(timer);
	});
</script>

<p>Navigating to single counter remount page...</p>
