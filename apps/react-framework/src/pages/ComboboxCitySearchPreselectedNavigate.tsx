import { useEffect } from 'react';

export default function ComboboxCitySearchPreselectedNavigate() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.pushState({}, '', '/combobox-city-search-preselected');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return <p>Navigating to preselected combobox page...</p>;
}
