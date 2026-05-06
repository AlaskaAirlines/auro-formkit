import {unified} from 'https://esm.sh/unified';
import remarkParse from 'https://esm.sh/remark-parse';
import remarkGfm from 'https://esm.sh/remark-gfm';
import remarkRehype from 'https://esm.sh/remark-rehype';
import rehypeRaw from 'https://esm.sh/rehype-raw';
import rehypeHighlight from 'https://esm.sh/rehype-highlight';
import rehypeStringify from 'https://esm.sh/rehype-stringify';

export async function renderPage(mdPath) {
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
