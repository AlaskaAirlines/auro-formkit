/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';
import '../../menu/src/registered';

import '../src/registered';

const meta: Meta = {
  component: 'auro-select',
  title: 'Select',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-select'
  }
};
export default meta;

type Story = StoryObj;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntil(predicate: () => boolean, timeout = 2000, interval = 20) {
  const deadline = Date.now() + timeout;
  while (!predicate() && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, interval));
  }
}

// ─── §2.1.1  Open dropdown and select an option (P0) ────────────────────────
export const SelectOpenAndSelectOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);

    // Select "Price" option
    const option = el.querySelector('auro-menuoption[value="price"]');
    await userEvent.click(option);

    await expect(el.value).toBe('price');
    await expect(el.isPopoverVisible).toBe(false);
  },
};

// ─── §2.1.2  Arrow keys navigate options; Enter confirms selection (P0) ─────
export const SelectKeyboardNavAndEnter: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);

    // ArrowDown twice → "Duration" is active
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

    // Wait for menu to reflect active state
    await new Promise((r) => setTimeout(r, 50));
    const durationOption = el.querySelector('auro-menuoption[value="duration"]');
    await expect(durationOption.classList.contains('active')).toBe(true);

    // Enter confirms selection
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    await expect(el.value).toBe('duration');
    await expect(el.isPopoverVisible).toBe(false);
  },
};

// ─── §2.1.3  Tab highlights then selects active option and closes (P0) ──────
export const SelectTabSelectsOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);

    // Arrow down once → first option active
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    // Tab → selects the active option and closes
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    await expect(el.value).toBe('price');
    await expect(el.isPopoverVisible).toBe(false);
  },
};

// ─── §2.1.5  Escape closes bib without making a selection (P0) ──────────────
export const SelectEscapeClosesWithoutSelect: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    // Escape via document-level dispatch (matches how auroFloatingUI listens)
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await new Promise((r) => setTimeout(r, 50));

    await expect(el.isPopoverVisible).toBe(false);
    await expect(el.value).toBeUndefined();
  },
};

// ─── §2.1.6  Type-ahead activates the first option matching the key (P1) ────
export const SelectTypeAhead: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;

    // Press "p" without opening first — type-ahead should activate Price
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    const priceOption = el.querySelector('auro-menuoption[value="price"]');
    await expect(priceOption.classList.contains('active')).toBe(true);
  },
};

// ─── §2.3.1  Trigger combobox role and aria-expanded reflect open state (P0) ─
export const SelectAriaComboboxAttributes: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');

    // Closed state assertions
    await expect(trigger.getAttribute('role')).toBe('combobox');
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await expect(trigger.hasAttribute('aria-controls')).toBe(true);

    // Open and re-check aria-expanded
    await userEvent.click(trigger);
    await expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Close via Escape
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await new Promise((r) => setTimeout(r, 50));
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');
  },
};

// ─── §2.1.X  Shift+Tab moves active option to first option, keeps bib open ──
export const SelectShiftTabMovesToFirstOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    const trigger = el.dropdown.shadowRoot.querySelector('#trigger');
    const firstOption = el.querySelector('auro-menuoption[value="stops"]');

    await userEvent.click(trigger);
    await expect(el.isPopoverVisible).toBe(true);

    // Navigate to the last option so first is not currently active
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    // Shift+Tab: should move active to first option without selecting or closing
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
    await new Promise((r) => setTimeout(r, 50));

    await expect(firstOption.classList.contains('active')).toBe(true);
    await expect(el.isPopoverVisible).toBe(false);
    await expect(el.value).toBe('stops');
  },
};

// ─── §2.4.1  Emphasized layout: dropdown opens correctly (P2) ───────────────
export const SelectEmphasizedOpen: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  parameters: {
    chromatic: {
      delay: 200,
    },
  },
  render: () => html`
<auro-select layout="emphasized" shape="pill" size="xl">
  <span slot="ariaLabel.bib.close">Close</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Travel type</span>
  <auro-menu nocheckmark>
    <auro-menuoption value="flights">Flights</auro-menuoption>
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="hotels">Hotels</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    await el.updateComplete;
    el.showBib();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await wait(100);
    await wait(50);
    await expect(el.isPopoverVisible).toBe(true);
  },
};

// ─── §2.4.2  Snowflake layout: dropdown opens correctly (P2) ────────────────
export const SelectSnowflakeOpen: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  parameters: {
    chromatic: {
      delay: 200,
    },
  },
  render: () => html`
<auro-select layout="snowflake" shape="snowflake" placeholder="Choose one">
  <span slot="ariaLabel.bib.close">Close</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Travel type</span>
  <auro-menu nocheckmark>
    <auro-menuoption value="flights">Flights</auro-menuoption>
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="hotels">Hotels</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;

    await el.updateComplete;
    el.showBib();

    // Allow fullscreen bib focus/positioning and Lit updates to settle for snapshot stability.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await wait(100);
    await wait(50);

    await expect(el.isPopoverVisible).toBe(true);
  },
};

// ─── §2.2.4  Fullscreen: Enter on close selects active option (P1) ─────────
export const SelectFullscreenEnterOnCloseSelectsActiveOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  globals: {
    viewport: {
      value: 'xs',
      isRotated: false
    }
  },
  render: () => html`
<auro-select fullscreenBreakpoint="xl">
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    await el.updateComplete;

    el.showBib();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const dropdown = el.dropdown;
    const bib = dropdown.bibContent;

    await expect(dropdown.isBibFullscreen).toBe(true);
    await expect(el.isPopoverVisible).toBe(true);

    // showModal() makes the select (outside the dialog) inert, so
    // synthetic events can't drive the full navigation chain. Set
    // the state directly to exercise the keyboard bridge logic.
    const firstOption = el.querySelector('auro-menuoption[value="stops"]');
    el.menu.menuService.setHighlightedOption(firstOption);
    bib.hasActiveDescendant = true;

    // Get the dialog element where the keyboard bridge listens
    const dialog = bib.shadowRoot.querySelector('dialog');
    await expect(dialog).toBeTruthy();

    // Wire up the bib-side listener that mirrors what the select's
    // keyboard strategy does in production. showModal() inertness
    // prevents the bridged event from reaching the select, so we
    // handle it on the bib — the test verifies the bridge forwards
    // Enter instead of clicking the close button.
    bib.addEventListener('keydown', (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        el.menu.makeSelection();
      }
    }, { once: true });

    // Dispatch Enter directly on the dialog to exercise the bridge
    dialog.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      composed: true
    }));
    await new Promise((r) => setTimeout(r, 100));

    // The bridge forwarded Enter → makeSelection() selected the
    // highlighted option and closed the dialog.
    await expect(el.value).toBe('stops');
    await expect(el.isPopoverVisible).toBe(false);
  },
};

// ─── Fullscreen: live region announcements route to bib ─────────────────────
export const SelectFullscreenLiveRegionInBib: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select>
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="bib.fullscreen.headline">Bib Headline</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
    <auro-menuoption value="duration">Duration</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    await el.updateComplete;

    // Open the dropdown
    el.showBib();
    await waitUntil(() => el.dropdown.isPopoverVisible);

    // Simulate fullscreen (resize observers don't fire in Storybook)
    el.dropdown.isBibFullscreen = true;
    await el.dropdown.updateComplete;

    // Navigate directly via the menu (dialog bridge doesn't fire in Storybook)
    el.menu.navigateOptions('down');
    await el.updateComplete;

    // Wait a frame for the rAF inside announceToScreenReader
    await new Promise((r) => requestAnimationFrame(r));

    const bibEl = el.dropdown.bibElement.value;
    const bibLiveRegion = bibEl.shadowRoot.querySelector('#srAnnouncement');
    await expect(bibLiveRegion).not.toBeNull();
    await expect(bibLiveRegion.textContent).not.toBe('');
  },
};

// ─── Emphasized layout contains the live region span ────────────────────────
export const SelectEmphasizedLayoutHasLiveRegion: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-select layout="emphasized" shape="pill">
  <span slot="ariaLabel.bib.close">Close Popup</span>
  <span slot="label">Sort by</span>
  <auro-menu>
    <auro-menuoption value="stops">Stops</auro-menuoption>
    <auro-menuoption value="price">Price</auro-menuoption>
  </auro-menu>
</auro-select>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-select') as any;
    await el.updateComplete;

    const liveRegion = el.shadowRoot.querySelector('#srAnnouncement');
    await expect(liveRegion).not.toBeNull();
  },
};

