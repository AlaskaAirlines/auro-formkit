import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

/**
 * Fetches the docs/pages/ directory listing, builds a nav bar with links to
 * each .md file, and prepends it to <body>. Clicking a link renders that page
 * without a full reload. Pass the path to the pages directory relative to the
 * HTML file, e.g. '../docs/pages/'.
 *
 * @param {string} pagesDir - Path to the docs/pages directory.
 * @param {string} [activeFile] - Filename (no path) of the currently active page.
 */
export async function injectPageNav(pagesDir, activeFile) {
  let files = [];
  try {
    const res = await fetch(`${pagesDir}pages.json`);
    if (!res.ok) {
      return;
    }
    files = await res.json();
  } catch {
    return;
  }

  if (!files.length) {
    return;
  }

  const nav = document.createElement('nav');
  nav.id = 'page-nav';

  files.forEach((file) => {
    const label = file.replace(/\.md$/, '').replace(/-/g, ' ');
    const a = document.createElement('auro-hyperlink');
    a.textContent = label;
    a.setAttribute('href', `./${file.replace(/\.md$/, '.html')}`);
    a.setAttribute('type', 'cta');
    a.setAttribute('variant', 'ghost');
    a.setAttribute('size', 'sm');
    a.dataset.page = file;

    if (file === activeFile) {
      a.setAttribute('variant', 'tertiary');
    }

    nav.appendChild(a);
  });

  document.body.prepend(nav);
}

export async function renderPage(mdPath) {
  if (!document.getElementById('page-nav')) {
    let pagesDir;
    if (mdPath.includes('/docs/pages/')) {
      pagesDir = mdPath.substring(0, mdPath.lastIndexOf('/') + 1);
    } else {
      // mdPath is like './index.md' served from demo/ — pages.json is co-located
      pagesDir = mdPath.substring(0, mdPath.lastIndexOf('/') + 1);
    }
    const activeFile = mdPath.split('/').pop();
    await injectPageNav(pagesDir, activeFile);
  }

  const response = await fetch(mdPath);
  const text = await response.text();
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(text);

  document.querySelector('main').innerHTML = String(result);
  addCopyButtons();
}

function addCopyButtons() {
  document.querySelectorAll('pre code[class*="language-"], pre code[class*="hljs"]').forEach((code) => {
    const pre = code.parentElement;
    const wrapper = document.createElement('div');
    wrapper.className = 'pre-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      const raw = code.textContent;
      const text = raw.replace(/\u200B/g, '').replace(/^\n+/, '').replace(/\n+$/, '\n').replace(/^\$ /, '');
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
      });
    });
    wrapper.appendChild(btn);
  });
}

export function openAccordion(id) {
  document.querySelectorAll('auro-accordion').forEach((accordion) => {
    accordion.removeAttribute('expanded');
  });
  const target = document.getElementById(id);
  if (target) {
    target.setAttribute('expanded', '');
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 550);
  }
}

window.openAccordion = openAccordion;
