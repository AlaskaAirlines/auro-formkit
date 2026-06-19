import { expect } from '@open-wc/testing';
import { buildAllowlist, findUnbundledImports, init } from '../src/unbundledImports.js';

const ALLOWED = buildAllowlist(['lit', 'lit-element', 'lit-html', '@lit', '@lit-labs']);

before(async () => {
  await init;
});

describe('findUnbundledImports', () => {
  it('flags a bare workspace import that is not on the allowlist', () => {
    const src = `import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';`;
    expect(findUnbundledImports(src, ALLOWED)).to.deep.equal(['@aurodesignsystem/auro-dropdown']);
  });

  it('allows lit and lit subpaths', () => {
    const src = `import { html } from 'lit'; import { ref } from 'lit/directives/ref.js';`;
    expect(findUnbundledImports(src, ALLOWED)).to.deep.equal([]);
  });

  it('allows @lit-labs scoped imports', () => {
    const src = `import { Task } from '@lit-labs/task';`;
    expect(findUnbundledImports(src, ALLOWED)).to.deep.equal([]);
  });

  it('ignores relative and absolute imports', () => {
    const src = `import './local.js'; import '/abs/path.js';`;
    expect(findUnbundledImports(src, ALLOWED)).to.deep.equal([]);
  });
});
