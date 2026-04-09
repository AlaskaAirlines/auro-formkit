import { useState, useEffect, useRef, useCallback, Fragment } from 'react';

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

const MISSING_FIELD_ERROR = 'Please select a departure city';

interface ComboboxFullProps {
  initialValue?: string;
  initialTypedValue?: string;
}

export function ComboboxFullWrapper({ initialValue = '', initialTypedValue = '' }: ComboboxFullProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [appearance, setAppearance] = useState<'default' | 'inverse'>('default');
  const comboboxRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set initial typedValue as a property (not an attribute) for reliability
  useEffect(() => {
    const el = comboboxRef.current as any;
    if (el && initialTypedValue) {
      el.typedValue = initialTypedValue;
    }
  }, [initialTypedValue]);

  // Sync loading property on auro-menu
  useEffect(() => {
    if (menuRef.current) {
      (menuRef.current as any).loading = loading;
    }
  }, [loading]);

  const handleTextInput = useCallback((event: Event) => {
    const query = (event as CustomEvent<{ value: string }>).detail?.value ?? '';

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query) {
      setStations([]);
      setLoading(false);
      return;
    }

    setHasSearched(true);
    setLoading(true);

    debounceRef.current = setTimeout(() => {
      setStations(searchCities(query));
      setLoading(false);
    }, 300);
  }, []);

  const handleOptionSelected = useCallback((event: Event) => {
    const el = event.target as any;
    setSelectedValue(el?.value ?? '');
  }, []);

  useEffect(() => {
    const el = comboboxRef.current;
    if (!el) return;
    el.addEventListener('inputValue', handleTextInput);
    el.addEventListener('input', handleOptionSelected);
    return () => {
      el.removeEventListener('inputValue', handleTextInput);
      el.removeEventListener('input', handleOptionSelected);
    };
  }, [handleTextInput, handleOptionSelected]);

  function triggerValidation() {
    (comboboxRef.current as any)?.checkValidity?.();
  }

  function reset() {
    setSelectedValue('');
    setStations([]);
    setHasSearched(false);
    (comboboxRef.current as any)?.reset?.();
  }

  return (
    <>
      <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 1rem' }}>
        Reproduces all attributes from <code>CitySearchInput.svelte</code>.<br />
        <code>use:validateOnSearch</code> is replaced by the "Validate" button below.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => setAppearance((a) => (a === 'default' ? 'inverse' : 'default'))}>
          Toggle appearance <em>({appearance})</em>
        </button>
        <button onClick={triggerValidation}>Validate</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div
        data-testid="selected-value"
        style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: '0.5rem 0.75rem', borderRadius: '4px', marginBottom: '1.25rem' }}
      >
        Selected value: <strong>{selectedValue || '(none)'}</strong>
      </div>

      <auro-combobox
        ref={comboboxRef}
        appearance={appearance}
        value={selectedValue}
        noFilter
        persistInput
        required
        dvInputOnly
        size="lg"
        shape="snowflake"
        layout="snowflake"
        fullscreenBreakpoint="md"
        autocomplete="off"
        noFlip
        setCustomValidityValueMissing={MISSING_FIELD_ERROR}
      >
        <span slot="label">From</span>
        <auro-menu ref={menuRef} hasLoadingPlaceholder>
          {stations.map((city) => (
            <Fragment key={city.code}>
              <auro-menuoption value={city.code}>
                {city.name}
                {city.shortName && <span slot="displayValue">{city.shortName}</span>}
              </auro-menuoption>
              {city.subStations && (
                <auro-menu>
                  {city.subStations.map((sub) => (
                    <auro-menuoption key={sub.code} value={sub.code}>
                      {sub.name}
                      <span slot="displayValue">{sub.code}</span>
                    </auro-menuoption>
                  ))}
                </auro-menu>
              )}
            </Fragment>
          ))}

          {hasSearched && stations.length === 0 && !loading && (
            <auro-menuoption static nomatch data-testid="no-results">
              No cities found
            </auro-menuoption>
          )}

          <span slot="loadingText">Loading cities...</span>
        </auro-menu>
      </auro-combobox>
    </>
  );
}

export default function ComboboxCitySearchFull() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: '1.5rem', maxWidth: '600px' }}>
      <h2 style={{ margin: '0 0 0.75rem' }}>Combobox: Full Planbook Config</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button id="toggle" onClick={() => setShow((s) => !s)}>
          {show ? 'Hide' : 'Show'} Combobox
        </button>
      </div>
      {show && <ComboboxFullWrapper />}
    </div>
  );
}
