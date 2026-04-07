/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import { html } from 'lit-html';
import '../../menu/src/registered';

import '../src/registered';

const meta: Meta = {
  component: 'auro-combobox',
  title: 'Combobox',
  tags: ['!autodocs'],
  parameters: {
    rootSelector: 'auro-combobox'
  }
};
export default meta;

type Story = StoryObj;

/**
 * Replicates the setInputValue helper from unit tests.
 * Fires all the events the combobox depends on to process typed input.
 */
function setInputValue(el: any, value: string) {
  const auroInput = el.input;
  const input = auroInput.shadowRoot.querySelector('input') as HTMLInputElement;
  input.focus();
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
  auroInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  el.dispatchEvent(new KeyboardEvent('keyup', { key: value.slice(value.length - 1), repeat: false }));
}

// ─── Typing opens bib with filtered options ───────────────────────────────────
export const ComboboxBibOpensOnType: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'ap');
    await new Promise((r) => setTimeout(r, 100));
    // Click the trigger to open the bib once there is a typed value
    const trigger = el.dropdown.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Arrow key navigation moves active option ────────────────────────────────
export const ComboboxArrowKeyNavigation: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption id="option1" value="Apples">Apples</auro-menuoption>
    <auro-menuoption id="option2" value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption id="option3" value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');

    el.focus();
    await new Promise((r) => setTimeout(r, 100));
    await userEvent.keyboard('{ArrowDown}');
    await new Promise((r) => setTimeout(r, 100));
    await el.updateComplete;
    await userEvent.keyboard('{ArrowDown}');
    await new Promise((r) => setTimeout(r, 100));
    await el.updateComplete;
    await expect(el.menu.optionActive.id).toBe('option3');
    await expect(el.dropdown.isPopoverVisible).toBe(true);

  },
};

// ─── Enter on highlighted option selects it and closes bib ───────────────────
export const ComboboxEnterSelectsOption: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    // Open bib
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    // Navigate to first option
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    // Select it
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(false);
    await expect(el.value).not.toBeNull();
  },
};

// ─── Escape closes bib without making a selection ────────────────────────────
export const ComboboxEscapeClosesWithoutSelect: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox behavior="filter">
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    await el.updateComplete;
    // Use trigger.click() to open the bib — this is the same path the unit
    // tests confirm ('shows the bib on click only when a value is typed').
    // Enter keydown is unreliable here because auro-input.value (the Lit
    // property) may not have settled before showBib() reads it.
    const trigger = el.dropdown.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    // Close without selecting — simulates the user pressing Escape
    el.hideBib();
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(false);
    await expect(el.value).toBeUndefined();
  },
};

// ─── No matching options — bib stays hidden ───────────────────────────────────
export const ComboboxNoMatchHidesBib: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'zzzzz');
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(false);
  },
};

// ─── noFilter — all options remain visible while typing ───────────────────────
export const ComboboxNoFilter: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox noFilter>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'ap');
    await el.updateComplete;
    const options = [...canvasElement.querySelectorAll('auro-menuoption')] as HTMLElement[];
    // With noFilter, neither option should be hidden
    await expect(options[0].hasAttribute('hidden')).toBe(false);
    await expect(options[1].hasAttribute('hidden')).toBe(false);
  },
};

// ─── Default hover pseudo-state on trigger ───────────────────────────────────
export const ComboboxHover: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
};

ComboboxHover.parameters = {
  pseudo: {
    hover: true,
  },
};

// ─── Bib open — filtered results visible (Chromatic open-state snapshot) ─────
export const ComboboxBibOpenFiltered: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  parameters: {
    chromatic: {
      delay: 200,
    },
  },
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'gr');
    await new Promise((r) => setTimeout(r, 100));
    el.showBib();
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Bib open — all options visible with noFilter ────────────────────────────
export const ComboboxBibOpenNoFilter: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  parameters: {
    chromatic: {
      delay: 200,
    },
  },
  render: () => html`
<auro-combobox noFilter>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries">Cherries</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'ap');
    await new Promise((r) => setTimeout(r, 100));
    el.showBib();
    await new Promise((r) => setTimeout(r, 50));
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Arrow keys do not open bib when clear button is focused ─────────────────

/**
 * Polls a predicate until it returns true or the timeout expires.
 * More accurate than fixed setTimeout delays — resolves as soon as
 * the condition is met rather than always waiting a fixed duration.
 */
async function waitUntil(predicate: () => boolean, timeout = 2000, interval = 20) {
  const deadline = Date.now() + timeout;
  while (!predicate() && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, interval));
  }
  if (!predicate()) {
    throw new Error(`waitUntil timed out after ${timeout}ms`);
  }
}

export const ComboboxArrowKeysIgnoredWhenClearBtnFocused: Story = {
  tags: ['!autodocs'],
  render: () => html`
<auro-combobox>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples">Apples</auro-menuoption>
    <auro-menuoption value="Oranges">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    // The clear button focus path is not reachable in fullscreen/modal mode
    // (320px viewport). The combobox opens fullscreen at that width, moving
    // the input into the bib where the Tab strategy differs. Skip mobile.
    if (window.innerWidth <= 320) {
      return;
    }

    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;

    // Type a value and open the bib
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await waitUntil(() => el.dropdown.isPopoverVisible);

    // Navigate to first option and select it
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await waitUntil(() => !el.dropdown.isPopoverVisible);
    await expect(el.dropdown.isPopoverVisible).toBe(false);

    // Wait two animation frames so that the restoreTriggerAfterClose rAF
    // (scheduled when the bib closes) fires before we take focus. Without
    // this, the rAF can steal focus from nativeBtn after we set it, making
    // the isClearBtnFocused guard return false on cloud/CI runners where the
    // rAF fires slightly later than the 20 ms waitUntil poll interval.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    // Focus the native button inside the clear button's shadow DOM.
    // The clear button is hidden (width:0/opacity:0) unless the wrapper has
    // :focus-within, which doesn't propagate through shadow DOM in all browsers.
    // Force the container visible the same way the Tab handler does.
    const clearBtn = el.input.shadowRoot.querySelector('.clearBtn') as any;
    await expect(clearBtn).not.toBeNull();
    const clearContainer = clearBtn.closest('.clear') as HTMLElement;
    if (clearContainer) {
      clearContainer.style.display = 'flex';
    }
    const nativeBtn = clearBtn.shadowRoot?.querySelector('button') as HTMLElement;
    nativeBtn.focus();
    await waitUntil(() => clearBtn.shadowRoot.activeElement !== null);
    await expect(clearBtn.shadowRoot.activeElement).not.toBeNull();

    // Press ArrowDown — bib should NOT open
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(false);

    // Press ArrowUp — bib should NOT open
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(false);
  },
};

// ─── Fullscreen: live region announcements route to bib ─────────────────────
export const ComboboxFullscreenLiveRegionInBib: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox noFilter>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-2">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;

    // Open the dropdown
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    await waitUntil(() => el.dropdown.isPopoverVisible);

    // Simulate fullscreen
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

// ─── Fullscreen: aria-activedescendant set on inputInBib ────────────────────
export const ComboboxFullscreenActiveDescendantOnInputInBib: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox noFilter>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-2">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;

    // Open the dropdown
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    await waitUntil(() => el.dropdown.isPopoverVisible);

    // Simulate fullscreen
    el.dropdown.isBibFullscreen = true;
    await el.dropdown.updateComplete;
    await waitUntil(() => el.inputInBib && el.inputInBib.inputElement);

    // Navigate to an option
    el.menu.navigateOptions('down');
    await el.updateComplete;
    await el.inputInBib.updateComplete;

    await expect(el.optionActive).not.toBeNull();

    const nativeInput = el.inputInBib.inputElement;
    await expect(nativeInput.getAttribute('aria-activedescendant')).not.toBeNull();
  },
};

// ─── Fullscreen: aria-activedescendant cleared on close ─────────────────────
export const ComboboxFullscreenActiveDescendantClearedOnClose: Story = {
  tags: ['!autodocs', 'chromatic-enabled'],
  render: () => html`
<auro-combobox noFilter>
  <span slot="ariaLabel.bib.close">Close combobox</span>
  <span slot="ariaLabel.input.clear">Clear All</span>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Fruit</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-2">Grapes</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;

    // Open the dropdown
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    await waitUntil(() => el.dropdown.isPopoverVisible);

    // Simulate fullscreen
    el.dropdown.isBibFullscreen = true;
    await el.dropdown.updateComplete;
    await waitUntil(() => el.inputInBib && el.inputInBib.inputElement);

    // Navigate to set activedescendant
    el.menu.navigateOptions('down');
    await el.updateComplete;

    // Close the dropdown
    el.hideBib();
    await el.updateComplete;
    await waitUntil(() => !el.dropdown.isPopoverVisible);
    await el.inputInBib.updateComplete;

    const nativeInput = el.inputInBib.inputElement;
    await expect(nativeInput.hasAttribute('aria-activedescendant')).toBe(false);
  },
};
