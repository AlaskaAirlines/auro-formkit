import { Router, Route } from './router';
import Home from './pages/Home';
import SelectRemount from './pages/SelectRemount';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/select-remount" component={SelectRemount} />
    </Router>
  );
}
