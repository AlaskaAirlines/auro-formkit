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

	let stations = $state<Station[]>([]);
	let loading = $state(false);
	let hasSearched = $state(false);
	let selectedValue = $state('');
	let showCombobox = $state(true);
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

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
</script>

<button id="toggle" onclick={() => (showCombobox = !showCombobox)}>
	{showCombobox ? 'Hide' : 'Show'} Combobox
</button>

<div id="selected-value" data-testid="selected-value">{selectedValue}</div>

{#if showCombobox}
	<auro-combobox
		noFilter
		persistInput
		required
		autocomplete="off"
		oninputValue={handleTextInput}
		oninput={handleOptionSelected}
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
