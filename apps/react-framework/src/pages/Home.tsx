import { Link } from '../router';

const SUITES: { label: string; path: string }[] = [
  { label: 'auro-select: remount', path: '/select-remount' },
  { label: 'auro-select: remount (multiselect)', path: '/select-remount-multiselect' },
  { label: 'auro-combobox: remount', path: '/combobox-remount' },
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
