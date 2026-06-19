import { init, parse } from 'es-module-lexer';

export { init };

// Build a list of regexes that match a package name exactly or any of its
// subpaths (e.g. `lit` matches `lit` and `lit/directives/ref.js`).
export const buildAllowlist = (names) =>
  names.map((name) => new RegExp(`^${name}(?:/.+)?$`, 'u'));

// Returns bare specifiers in `source` that aren't matched by `allowed`.
// Relative (`./x`) and absolute (`/x`) imports are ignored; only bare
// specifiers can leak unbundled package references into a dist file.
export function findUnbundledImports(source, allowed) {
  const [imports] = parse(source);
  return [...new Set(imports.map((i) => source.slice(i.s, i.e)))]
    .filter((s) => !s.startsWith('.') && !s.startsWith('/'))
    .filter((s) => !allowed.some((re) => re.test(s)));
}
