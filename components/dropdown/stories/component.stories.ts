/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';

import '../src/registered';

const meta: Meta = {
  component: 'auro-dropdown',
  title: 'Dropdown',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-dropdown'
  }
};
export default meta;

type Story = StoryObj;

// ─── §1.3.1  Click opens the bib (P0) ───────────────────────────────────────
export const DropdownOpenViaClick: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-dropdown chevron aria-label="dropdown example">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.3.1  Click twice toggles closed (P0) ────────────────────────────────
export const DropdownToggleViaClick: Story = {
  tags: ['!autodocs'],
  render: () => html`
<auro-dropdown chevron aria-label="dropdown toggle">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    const el = canvasElement.querySelector('auro-dropdown');

    await userEvent.click(trigger);
    await expect(el).toHaveAttribute('open');

    await userEvent.click(trigger);
    await expect(el).not.toHaveAttribute('open');
  },
};

// ─── §1.3.2  Enter key opens the bib (P0) ───────────────────────────────────
export const DropdownOpenViaEnter: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-dropdown chevron aria-label="dropdown keyboard enter">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.3.2  Space key opens the bib (P0) ───────────────────────────────────
export const DropdownOpenViaSpace: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-dropdown chevron aria-label="dropdown keyboard space">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    trigger.focus();
    // Dispatch keydown directly: userEvent.keyboard('{Space}') on a role="button"
    // element also fires a synthetic click (ARIA button pattern) which would
    // immediately toggle the bib closed. dispatchEvent fires only the keydown.
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
    // Wait one tick for Lit's microtask update to reflect the `open` attribute.
    await new Promise((r) => setTimeout(r, 0));
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.3.3  noToggle: second click does NOT close the bib (P1) ─────────────
export const DropdownNoToggle: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-dropdown chevron noToggle aria-label="dropdown no toggle">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    const el = canvasElement.querySelector('auro-dropdown');

    await userEvent.click(trigger);
    await expect(el).toHaveAttribute('open');

    // Second click should NOT close the bib
    await userEvent.click(trigger);
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.3.4  disableEventShow: click blocked; programmatic show works (P1) ──
export const DropdownDisableEventShow: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-dropdown chevron disableEventShow aria-label="dropdown disable event show">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    const el = canvasElement.querySelector('auro-dropdown') as any;

    // Click must not open the bib when disableEventShow is set
    await userEvent.click(trigger);
    await expect(el).not.toHaveAttribute('open');

    // Programmatic show() must still work.
    // show() updates isPopoverVisible through Lit's microtask update cycle;
    // wait one tick for the `open` attribute to be reflected to the DOM.
    el.show();
    await new Promise((r) => setTimeout(r, 0));
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.7.1  Emphasized layout renders and opens correctly (P2) ─────────────
export const DropdownEmphasizedLayoutOpen: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-dropdown layout="emphasized" shape="pill" chevron aria-label="emphasized dropdown">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.7.2  Snowflake layout renders and opens correctly (P2) ──────────────
export const DropdownSnowflakeLayoutOpen: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-dropdown layout="snowflake" chevron aria-label="snowflake dropdown">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    const el = canvasElement.querySelector('auro-dropdown');
    await expect(el).toHaveAttribute('open');
  },
};

// ─── §1.5.1  auroDropdown-triggerClick event fires on click (P0) ────────────
export const DropdownTriggerClickEvent: Story = {
  tags: ['!autodocs'],
  render: () => html`
<auro-dropdown chevron aria-label="dropdown event">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-dropdown');
    let triggerClickFired = false;
    el!.addEventListener('auroDropdown-triggerClick', () => { triggerClickFired = true; });

    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);
    await expect(triggerClickFired).toBe(true);
  },
};

// ─── §1.5.2  auroDropdown-toggled event fires on open and close (P0) ────────
export const DropdownToggledEvent: Story = {
  tags: ['!autodocs'],
  render: () => html`
<auro-dropdown chevron aria-label="dropdown toggled event">
  <span slot="label">Select option</span>
  <div slot="trigger">Trigger</div>
  <div style="padding: 1rem;">Bib content</div>
</auro-dropdown>
  `,
  async play({ canvas, canvasElement }: { canvas: any; canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-dropdown');
    let toggleCount = 0;
    el!.addEventListener('auroDropdown-toggled', () => { toggleCount++; });

    const trigger = await canvas.findByShadowRole('button');
    await userEvent.click(trigger);  // open → first toggle
    await userEvent.click(trigger);  // close → second toggle
    await expect(toggleCount).toBe(2);
  },
};

// ─── §1.1.4  Container-type containment escape ──────────────────────────────
// The Floating UI library positions the bib with `position: fixed` + computed
// `top`/`left` values.  CSS `container-type` creates a new containing block,
// which traps `position: fixed` elements relative to the container rather than
// the viewport, causing the bib to be mispositioned or clipped.  The bib host
// uses `popover="manual"` + `showPopover()` to promote itself to the browser's
// top layer, escaping any ancestor containing block.  Each story below stresses
// a different container-query configuration so Chromatic can visually catch any
// regression in the escape mechanism.

// ─── §1.1.4a  Baseline — container-type: inline-size (P0) ──────────────────
export const DropdownInContainerTypeInlineSize: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="container-type: inline-size; width: 400px; height: 300px; overflow: visible; border: 1px dashed #aaa; padding: 0.5rem;">
  <auro-dropdown chevron aria-label="dropdown in container-type: inline-size">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (inline-size)</div>
    <div style="padding: 1rem;">
      <p>Bib content — must appear outside the dashed container box.</p>
      <p>If this panel is clipped or offset relative to the container, the popover escape has regressed.</p>
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

// ─── §1.1.4b  Narrow container — 200 px inline-size (P0) ───────────────────
export const DropdownInNarrowContainerType: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="container-type: inline-size; width: 200px; height: 200px; overflow: visible; border: 1px dashed #aaa; padding: 0.5rem;">
  <auro-dropdown chevron aria-label="dropdown in narrow 200px container">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (200 px)</div>
    <div style="padding: 1rem;">
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

// ─── §1.1.4c  Nested inline-size ancestors (P0) ─────────────────────────────
export const DropdownInNestedContainerTypes: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="container-type: inline-size; width: 600px; border: 1px dashed #aaa; padding: 0.75rem;">
  <div style="container-type: inline-size; width: 380px; border: 1px dotted #888; padding: 0.5rem;">
    <auro-dropdown chevron aria-label="dropdown in nested container-type ancestors">
      <span slot="label">Select option</span>
      <div slot="trigger">Trigger (nested)</div>
      <div style="padding: 1rem;">
        <p>Bib must escape both containing blocks and render in the top layer.</p>
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

// ─── §1.1.4d  Clipping parent — overflow: hidden + container-type (P0) ──────
export const DropdownInClippingContainerType: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="container-type: inline-size; width: 400px; height: 120px; overflow: hidden; border: 1px dashed #e55; padding: 0.5rem;">
  <p style="margin: 0 0 0.25rem; font-size: 0.75rem; color: #e55;">overflow: hidden</p>
  <auro-dropdown chevron aria-label="dropdown in clipping container">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (clipped parent)</div>
    <div style="padding: 1rem;">
      <p>Bib must escape the <code>overflow: hidden</code> boundary via the top layer.</p>
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

// ─── §1.1.4e  Scrollable parent — overflow: auto + container-type (P1) ──────
export const DropdownInScrollableContainerType: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="container-type: inline-size; width: 400px; height: 250px; overflow: auto; border: 1px dashed #aaa; padding: 0.5rem;">
  <div style="height: 400px; padding-top: 0.5rem;">
    <auro-dropdown chevron aria-label="dropdown in scrollable container">
      <span slot="label">Select option</span>
      <div slot="trigger">Trigger (scrollable)</div>
      <div style="padding: 1rem;">
        <p>Bib must stay anchored to the trigger even inside a scrollable container.</p>
        <p>The popover top layer prevents the bib from scrolling with the container content.</p>
      </div>
    </auro-dropdown>
    <p style="margin-top: 2rem; color: #888; font-size: 0.85rem;">↓ scroll area below trigger</p>
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

// ─── §1.1.4f  container-type: size variant (P1) ─────────────────────────────
export const DropdownInContainerTypeSize: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<div style="container-type: size; width: 450px; height: 350px; overflow: visible; border: 1px dashed #aaa; padding: 0.5rem;">
  <auro-dropdown chevron aria-label="dropdown in container-type: size">
    <span slot="label">Select option</span>
    <div slot="trigger">Trigger (size)</div>
    <div style="padding: 1rem;">
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

// Counter-group interaction stories live in components/counter/stories/component.stories.ts
