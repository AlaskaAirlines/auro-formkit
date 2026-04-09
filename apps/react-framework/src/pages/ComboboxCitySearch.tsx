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

interface ComboboxWrapperProps {
  onSelectedValueChange: (value: string) => void;
}

function ComboboxWrapper({ onSelectedValueChange }: ComboboxWrapperProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const comboboxRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement & { loading?: boolean }>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync loading property onto the menu element (React doesn't reliably map boolean props on WCs)
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
    onSelectedValueChange(el?.value ?? '');
  }, [onSelectedValueChange]);

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

  return (
    <>
      <auro-combobox ref={comboboxRef} noFilter persistInput required autocomplete="off" dvInputOnly>
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

export default function ComboboxCitySearch() {
  const [show, setShow] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div>
      <button id="toggle" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Combobox
      </button>
      <div id="selected-value" data-testid="selected-value">{selectedValue}</div>
      {show && <ComboboxWrapper onSelectedValueChange={setSelectedValue} />}
    </div>
  );
}
