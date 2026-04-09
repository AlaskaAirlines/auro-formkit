<script lang="ts">
	import '@aurodesignsystem/auro-formkit/auro-combobox';
	import '@aurodesignsystem/auro-formkit/auro-menu';

	interface Station {
		name: string;
		shortName?: string;
		code: string;
		subStations?: Station[];
	}

	const MOCK_CITIES: Station[] = [
		{ name: 'Seattle/Tacoma, WA', code: 'SEA' },
		{
			name: 'San Francisco Bay Area (All Airports)',
			code: 'BA3',
			shortName: 'SFO+2',
			subStations: [
				{ name: 'San Francisco, CA', code: 'SFO' },
				{ name: 'Oakland, CA', code: 'OAK' },
				{ name: 'San Jose, CA', code: 'SJC' },
			],
		},
		{ name: 'Portland, OR', code: 'PDX' },
		{
			name: 'Los Angeles (All Airports)',
			code: 'LA4',
			shortName: 'LAX+3',
			subStations: [
				{ name: 'Los Angeles, CA', code: 'LAX' },
				{ name: 'Burbank, CA', code: 'BUR' },
				{ name: 'Long Beach, CA', code: 'LGB' },
				{ name: 'Ontario, CA', code: 'ONT' },
			],
		},
		{ name: 'Anchorage, AK', code: 'ANC' },
		{
			name: 'New York (All Airports)',
			code: 'NYC',
			subStations: [
				{ name: 'John F. Kennedy, NY', code: 'JFK' },
				{ name: 'LaGuardia, NY', code: 'LGA' },
				{ name: 'Newark, NJ', code: 'EWR' },
			],
		},
		{ name: 'Boston, MA', code: 'BOS' },
		{ name: 'Denver, CO', code: 'DEN' },
		{ name: 'Honolulu, HI', code: 'HNL' },
		{ name: 'Juneau, AK', code: 'JNU' },
		{ name: 'Fairbanks, AK', code: 'FAI' },
	];

	function searchCities(query: string): Station[] {
		const q = query.toLowerCase();
		return MOCK_CITIES.filter(
			(city) =>
				city.name.toLowerCase().includes(q) ||
				city.code.toLowerCase() === q ||
				city.subStations?.some(
					(s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase() === q,
				),
		);
	}

	// Pre-seeded with SEA to test initial-value rendering with the full Planbook config.
	let comboboxElement = $state({} as any);
	let stations = $state<Station[]>([]);
	let loading = $state(false);
	let hasSearched = $state(false);
	let selectedValue = $state('SEA');
	let typedInputValue = $state('SEA');
	let appearance = $state<'default' | 'inverse'>('default');
	let showCombobox = $state(true);
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	const MISSING_FIELD_ERROR = 'Please select a departure city';

	function handleTextInput(event: Event) {
		const query = (event as CustomEvent<{ value: string }>).detail?.value ?? '';

		if (debounceTimer) clearTimeout(debounceTimer);

		if (!query) {
			stations = [];
			loading = false;
			return;
		}

		hasSearched = true;
		loading = true;

		debounceTimer = setTimeout(() => {
			stations = searchCities(query);
			loading = false;
		}, 300);
	}

	function handleOptionSelected(event: Event) {
		const el = event.target as any;
		selectedValue = el?.value ?? '';
	}

	function triggerValidation() {
		comboboxElement?.checkValidity?.();
	}

	function clearSelection() {
		selectedValue = '';
		typedInputValue = '';
		stations = [];
		hasSearched = false;
		if (comboboxElement?.reset) comboboxElement.reset();
	}
</script>

<div class="page">
	<h2 style="margin: 0 0 0.75rem;">Combobox: Full Planbook Config — Preselected (SEA)</h2>
	<p style="font-size: 0.85rem; color: #666; margin: 0 0 1rem;">
		Same as the full-options page but with <code>value="SEA"</code> set on load.<br />
		Tests that the combobox correctly reflects an initial value with all Planbook attributes active.
	</p>

	<div class="controls">
		<button onclick={() => (appearance = appearance === 'default' ? 'inverse' : 'default')}>
			Toggle appearance <em>({appearance})</em>
		</button>
		<button onclick={triggerValidation}>Validate</button>
		<button onclick={clearSelection}>Clear selection</button>
		<button id="toggle" onclick={() => (showCombobox = !showCombobox)}>
			{showCombobox ? 'Hide' : 'Show'} Combobox
		</button>
	</div>

	<div class="value-display" data-testid="selected-value">
		Selected value: <strong>{selectedValue || '(none)'}</strong>
	</div>

	{#if showCombobox}
		<auro-combobox
			bind:this={comboboxElement}
			appearance={appearance}
			value={selectedValue}
			typedValue={typedInputValue}
			oninput={handleOptionSelected}
			oninputValue={handleTextInput}
			noFilter={true}
			setCustomValidityValueMissing={MISSING_FIELD_ERROR}
			required
			persistInput
			dvInputOnly
			size="lg"
			shape="snowflake"
			layout="snowflake"
			fullscreenBreakpoint="md"
			autocomplete="off"
			noFlip
		>
			<span slot="label">From</span>
			<auro-menu loading={loading} hasLoadingPlaceholder>
				{#each stations as city (city.code)}
					<auro-menuoption value={city.code}>
						{city.name}
						{#if city.shortName}
							<span slot="displayValue">{city.shortName}</span>
						{/if}
					</auro-menuoption>
					{#if city.subStations}
						<auro-menu>
							{#each city.subStations as sub (sub.code)}
								<auro-menuoption value={sub.code}>
									{sub.name}
									<span slot="displayValue">{sub.code}</span>
								</auro-menuoption>
							{/each}
						</auro-menu>
					{/if}
				{/each}

				{#if hasSearched && stations.length === 0 && !loading}
					<auro-menuoption static nomatch data-testid="no-results">No cities found</auro-menuoption>
				{/if}

				<span slot="loadingText">Loading cities...</span>
			</auro-menu>
		</auro-combobox>
	{/if}
</div>

<style>
	.page {
		padding: 1.5rem;
		max-width: 600px;
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	.value-display {
		font-family: monospace;
		font-size: 0.9rem;
		margin-bottom: 1.25rem;
		padding: 0.5rem 0.75rem;
		background: #f5f5f5;
		border-radius: 4px;
	}
</style>
