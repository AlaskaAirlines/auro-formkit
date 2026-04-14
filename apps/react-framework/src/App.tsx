import { Router, Route } from './router';
import Home from './pages/Home';
import SelectRemount from './pages/SelectRemount';
import SelectRemountMultiselect from './pages/SelectRemountMultiselect';
import SelectRemountNavigate from './pages/SelectRemountNavigate';
import SelectRemountMultiselectNavigate from './pages/SelectRemountMultiselectNavigate';
import SelectDynamic from './pages/SelectDynamic';
import SelectDynamicNavigate from './pages/SelectDynamicNavigate';
import ComboboxRemount from './pages/ComboboxRemount';
import ComboboxCitySearch from './pages/ComboboxCitySearch';
import ComboboxCitySearchFull from './pages/ComboboxCitySearchFull';
import ComboboxCitySearchPreselected from './pages/ComboboxCitySearchPreselected';
import ComboboxCitySearchPreselectedNavigate from './pages/ComboboxCitySearchPreselectedNavigate';
import CounterDropdown from './pages/CounterDropdown';
import CounterRemount from './pages/CounterRemount';
import CounterRemountNavigate from './pages/CounterRemountNavigate';
import SingleCounterRemount from './pages/SingleCounterRemount';
import SingleCounterRemountNavigate from './pages/SingleCounterRemountNavigate';
import DatepickerFullscreen from './pages/DatepickerFullscreen';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/select-remount" component={SelectRemount} />
      <Route path="/select-remount-navigate" component={SelectRemountNavigate} />
      <Route path="/select-remount-multiselect" component={SelectRemountMultiselect} />
      <Route path="/select-remount-multiselect-navigate" component={SelectRemountMultiselectNavigate} />
      <Route path="/select-dynamic" component={SelectDynamic} />
      <Route path="/select-dynamic-navigate" component={SelectDynamicNavigate} />
      <Route path="/combobox-remount" component={ComboboxRemount} />
      <Route path="/combobox-city-search" component={ComboboxCitySearch} />
      <Route path="/combobox-city-search-full" component={ComboboxCitySearchFull} />
      <Route path="/combobox-city-search-preselected" component={ComboboxCitySearchPreselected} />
      <Route path="/combobox-city-search-preselected-navigate" component={ComboboxCitySearchPreselectedNavigate} />
      <Route path="/counter-dropdown" component={CounterDropdown} />
      <Route path="/counter-remount" component={CounterRemount} />
      <Route path="/counter-remount-navigate" component={CounterRemountNavigate} />
      <Route path="/single-counter-remount" component={SingleCounterRemount} />
      <Route path="/single-counter-remount-navigate" component={SingleCounterRemountNavigate} />
      <Route path="/datepicker-fullscreen" component={DatepickerFullscreen} />
    </Router>
  );
}
