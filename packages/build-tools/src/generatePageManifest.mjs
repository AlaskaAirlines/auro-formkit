import fs from 'node:fs';
import path from 'node:path';

const pagesDir = path.resolve(process.cwd(), 'docs/pages');
const outFile = path.resolve(process.cwd(), 'demo/pages.json');

if (!fs.existsSync(pagesDir)) {
  process.exit(0);
}

const pages = fs.readdirSync(pagesDir)
  .filter((f) => f.endsWith('.md'))
  .sort();

pages.push('readme.md');

fs.writeFileSync(outFile, JSON.stringify(pages));
