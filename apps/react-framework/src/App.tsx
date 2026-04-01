import { Router, Route } from './router';
import Home from './pages/Home';
import SelectRemount from './pages/SelectRemount';
import SelectRemountMultiselect from './pages/SelectRemountMultiselect';
import ComboboxRemount from './pages/ComboboxRemount';
import CounterDropdown from './pages/CounterDropdown';
import CounterRemount from './pages/CounterRemount';
import SingleCounterRemount from './pages/SingleCounterRemount';
import DatepickerFullscreen from './pages/DatepickerFullscreen';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/select-remount" component={SelectRemount} />
      <Route path="/select-remount-multiselect" component={SelectRemountMultiselect} />
      <Route path="/combobox-remount" component={ComboboxRemount} />
      <Route path="/counter-dropdown" component={CounterDropdown} />
      <Route path="/counter-remount" component={CounterRemount} />
      <Route path="/single-counter-remount" component={SingleCounterRemount} />
      <Route path="/datepicker-fullscreen" component={DatepickerFullscreen} />
    </Router>
  );
}
