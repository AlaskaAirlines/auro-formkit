import { Router, Route } from './router';
import Home from './pages/Home';
import SelectRemount from './pages/SelectRemount';
import SelectRemountMultiselect from './pages/SelectRemountMultiselect';
import SelectInteraction from './pages/SelectInteraction';
import ComboboxRemount from './pages/ComboboxRemount';
import ComboboxInteraction from './pages/ComboboxInteraction';
import CounterDropdown from './pages/CounterDropdown';
import CounterRemount from './pages/CounterRemount';
import CounterInteraction from './pages/CounterInteraction';
import SingleCounterRemount from './pages/SingleCounterRemount';
import DatepickerFullscreen from './pages/DatepickerFullscreen';
import DatepickerInteraction from './pages/DatepickerInteraction';
import CheckboxInteraction from './pages/CheckboxInteraction';
import DropdownInteraction from './pages/DropdownInteraction';
import FormInteraction from './pages/FormInteraction';
import InputInteraction from './pages/InputInteraction';
import MenuInteraction from './pages/MenuInteraction';
import RadioInteraction from './pages/RadioInteraction';
import SelectDynamic from './pages/SelectDynamic';
import SelectDynamicNavigate from './pages/SelectDynamicNavigate';
import ComboboxCitySearch from './pages/ComboboxCitySearch';
import ComboboxCitySearchFull from './pages/ComboboxCitySearchFull';
import ComboboxCitySearchPreselected from './pages/ComboboxCitySearchPreselected';
import ComboboxCitySearchPreselectedNavigate from './pages/ComboboxCitySearchPreselectedNavigate';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/select-remount" component={SelectRemount} />
      <Route path="/select-remount-multiselect" component={SelectRemountMultiselect} />
      <Route path="/select-interaction" component={SelectInteraction} />
      <Route path="/select-dynamic" component={SelectDynamic} />
      <Route path="/select-dynamic-navigate" component={SelectDynamicNavigate} />
      <Route path="/combobox-remount" component={ComboboxRemount} />
      <Route path="/combobox-interaction" component={ComboboxInteraction} />
      <Route path="/combobox-city-search" component={ComboboxCitySearch} />
      <Route path="/combobox-city-search-full" component={ComboboxCitySearchFull} />
      <Route path="/combobox-city-search-preselected" component={ComboboxCitySearchPreselected} />
      <Route path="/combobox-city-search-preselected-navigate" component={ComboboxCitySearchPreselectedNavigate} />
      <Route path="/counter-dropdown" component={CounterDropdown} />
      <Route path="/counter-remount" component={CounterRemount} />
      <Route path="/counter-interaction" component={CounterInteraction} />
      <Route path="/single-counter-remount" component={SingleCounterRemount} />
      <Route path="/datepicker-fullscreen" component={DatepickerFullscreen} />
      <Route path="/datepicker-interaction" component={DatepickerInteraction} />
      <Route path="/checkbox-interaction" component={CheckboxInteraction} />
      <Route path="/dropdown-interaction" component={DropdownInteraction} />
      <Route path="/form-interaction" component={FormInteraction} />
      <Route path="/input-interaction" component={InputInteraction} />
      <Route path="/menu-interaction" component={MenuInteraction} />
      <Route path="/radio-interaction" component={RadioInteraction} />
    </Router>
  );
}
