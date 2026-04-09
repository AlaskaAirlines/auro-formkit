import { Link } from '../router';

const SUITES: { label: string; path: string }[] = [
  { label: 'auro-select: remount', path: '/select-remount' },
  { label: 'auro-select: remount (auto-navigate)', path: '/select-remount-navigate' },
  { label: 'auro-select: remount (multiselect)', path: '/select-remount-multiselect' },
  { label: 'auro-select: remount (multiselect, auto-navigate)', path: '/select-remount-multiselect-navigate' },
  { label: 'auro-select: dynamic menu (preselected)', path: '/select-dynamic' },
  { label: 'auro-select: dynamic menu (preselected, auto-navigate)', path: '/select-dynamic-navigate' },
  { label: 'auro-combobox: remount', path: '/combobox-remount' },
  { label: 'auro-combobox: city search', path: '/combobox-city-search' },
  { label: 'auro-combobox: city search (full planbook config)', path: '/combobox-city-search-full' },
  { label: 'auro-combobox: city search (preselected)', path: '/combobox-city-search-preselected' },
  { label: 'auro-combobox: city search (preselected, auto-navigate)', path: '/combobox-city-search-preselected-navigate' },
  { label: 'auro-counter-group: dropdown keyboard', path: '/counter-dropdown' },
  { label: 'auro-counter-group: remount', path: '/counter-remount' },
  { label: 'auro-counter-group: remount (auto-navigate)', path: '/counter-remount-navigate' },
  { label: 'auro-counter: remount (single)', path: '/single-counter-remount' },
  { label: 'auro-counter: remount (single, auto-navigate)', path: '/single-counter-remount-navigate' },
];

export default function Home() {
  return (
    <main>
      <h1>React</h1>
      <p>Framework Test Harness</p>
      <ul>
        {SUITES.map(({ label, path }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
