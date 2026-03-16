/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';

import '../../src/registered';

// ─── Tailwind Play CDN container-query regression stories ─────────────────────
// These stories use real Tailwind v4 utility classes (loaded via the Play CDN)
// to verify that auro-dropdown correctly escapes ancestor container queries and
// container types via the Popover API top layer, mirroring the inline-style
// coverage in ../../component.stories.ts §1.1.4.
//
// The Play CDN script is injected once per session by the `withTailwindCdn`
// global decorator in .storybook/preview.ts; see `parameters.requiresTailwindCdn`.
// Tailwind's built-in MutationObserver then picks up class names as each story
// renders, so no per-story script setup is needed.
//
// Container query breakpoints used below are Tailwind v4 arbitrary-value syntax
// (@[Npx]:) for precision, avoiding any ambiguity around named-breakpoint sizes.

const meta: Meta = {
  component: 'auro-dropdown',
  title: 'Tailwind/Dropdown/Container Queries',
  tags: ['!autodocs', 'tailwind-cdn'],
  parameters: {
    requiresTailwindCdn: true,
    rootSelector: 'auro-dropdown',
  }
};
export default meta;

type Story = StoryObj;

// ─── §1.1.4a-tw  Baseline — Tailwind @container (inline-size, P0) ────────────
// `@container` sets `container-type: inline-size` — identical semantics to the
// inline-style baseline in §1.1.4a but expressed through a Tailwind utility.
export const InlineSize: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[400px] h-[300px] overflow-visible border border-dashed border-gray-400 p-2">
  <div class="flex flex-col @[300px]:flex-row gap-2 mb-2">
    <span class="text-xs text-gray-500 font-sans">container-type: inline-size — Tailwind <code>@container</code></span>
  </div>
  <auro-dropdown chevron aria-label="dropdown in Tailwind @container">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (@container)</div>
    <div class="p-4 space-y-2 font-sans text-sm">
      <p>Bib must appear outside the dashed container box.</p>
      <p>Escape is via Popover API top layer — not via Tailwind layout.</p>
    </div>
  </auro-dropdown>
</div>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.1.4b-tw  Narrow @container — 200 px via Tailwind (P0) ────────────────
export const NarrowContainer: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[200px] h-[200px] overflow-visible border border-dashed border-gray-400 p-2">
  <span class="text-xs text-gray-500 font-sans block mb-2">200 px @container — bib must not be constrained</span>
  <auro-dropdown chevron aria-label="dropdown in narrow Tailwind @container">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (200 px)</div>
    <div class="p-4 space-y-2 font-sans text-sm">
      <p>Bib must <em>not</em> be constrained to 200 px width.</p>
      <p>Floating UI shift middleware should keep it within the viewport.</p>
    </div>
  </auro-dropdown>
</div>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.1.4c-tw  Nested @container ancestors via Tailwind (P0) ───────────────
export const NestedContainers: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[600px] border border-dashed border-gray-400 p-3">
  <span class="text-xs text-gray-500 font-sans block mb-2">outer @container — 600 px</span>
  <div class="@container w-[380px] border border-dotted border-gray-500 p-2">
    <span class="text-xs text-gray-500 font-sans block mb-2">inner @container — 380 px</span>
    <auro-dropdown chevron aria-label="dropdown in nested Tailwind @container ancestors">
      <span slot="label">Select option</span>
      <div slot="trigger">Trigger (nested)</div>
      <div class="p-4 font-sans text-sm">
        <p>Bib must escape both <code>@container</code> containing blocks and render in the top layer.</p>
      </div>
    </auro-dropdown>
  </div>
</div>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.1.4d-tw  Clipping parent — overflow-hidden + @container (P0) ─────────
export const OverflowHiddenContainer: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[400px] h-[120px] overflow-hidden border border-dashed border-red-400 p-2">
  <p class="text-xs text-red-400 font-sans m-0 mb-1">overflow-hidden + @container</p>
  <auro-dropdown chevron aria-label="dropdown in Tailwind overflow-hidden container">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (overflow-hidden)</div>
    <div class="p-4 font-sans text-sm space-y-2">
      <p>Bib must escape the <code>overflow-hidden</code> boundary via the top layer.</p>
      <p>Without the popover escape, this bib would be fully clipped and invisible.</p>
    </div>
  </auro-dropdown>
</div>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.1.4e-tw  Scrollable parent — overflow-auto + @container (P1) ─────────
export const ScrollableContainer: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="@container w-[400px] h-[250px] overflow-auto border border-dashed border-gray-400 p-2">
  <div class="h-[400px] pt-2">
    <auro-dropdown chevron aria-label="dropdown in Tailwind overflow-auto container">
      <span slot="label">Select option</span>
      <div slot="trigger">Trigger (overflow-auto)</div>
      <div class="p-4 font-sans text-sm space-y-2">
        <p>Bib must stay anchored to the trigger even inside a scrollable container.</p>
        <p>The popover top layer prevents the bib from scrolling with the container content.</p>
      </div>
    </auro-dropdown>
    <p class="mt-8 text-gray-400 font-sans text-sm">↓ scroll area below trigger</p>
  </div>
</div>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.1.4f-tw  container-type: size via Tailwind arbitrary property (P1) ───
// `container-type: size` constrains both axes — the strictest CSS containment
// form. We use Tailwind v4's arbitrary property syntax `[container-type:size]`
// so no custom utility or `<style>` block is needed.
export const TypeSize: Story = {
  tags: ['!autodocs', 'tailwind-cdn', 'chromatic-enabled'],
  render: () => html`
<div class="[container-type:size] w-[450px] h-[350px] overflow-visible border border-dashed border-gray-400 p-2">
  <span class="text-xs text-gray-500 font-sans block mb-2">container-type: size — Tailwind arbitrary property <code>[container-type:size]</code></span>
  <auro-dropdown chevron aria-label="dropdown in Tailwind container-type size">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (size)</div>
    <div class="p-4 font-sans text-sm space-y-2">
      <p>Bib must escape a <code>container-type: size</code> containing block, which constrains both axes.</p>
      <p>This is the strictest form of CSS containment — position: fixed must still escape via popover.</p>
    </div>
  </auro-dropdown>
</div>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};
