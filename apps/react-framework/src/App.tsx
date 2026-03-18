import { Router, Route } from './router';
import Home from './pages/Home';
import SelectRemount from './pages/SelectRemount';
import SelectRemountMultiselect from './pages/SelectRemountMultiselect';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/select-remount" component={SelectRemount} />
      <Route path="/select-remount-multiselect" component={SelectRemountMultiselect} />
    </Router>
  );
}
