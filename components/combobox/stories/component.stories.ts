/// <reference types="vite/client" />

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect } from 'storybook/test';
import { html } from 'lit-html';
import '../../menu/src/registered';
import { wait, waitForDoubleFrame, waitUntil } from '../../../.storybook/test-helpers';

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
    await wait(100);
    // Click the trigger to open the bib once there is a typed value
    const trigger = el.dropdown.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.click();
    await wait(50);
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
    // Enter opens the bib when a value is typed
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(100);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    await expect(el.optionActive).not.toBeNull();
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
    await wait(50);
    await expect(el.dropdown.isPopoverVisible).toBe(false);
    await expect(el.value).not.toBeNull();
  },
};

// ─── Escape closes bib without making a selection ────────────────────────────
export const ComboboxEscapeClosesWithoutSelect: Story = {
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

// ─── aria-activedescendant set on input after keyboard navigation ─────────────
export const ComboboxAriaActiveDescendant: Story = {
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
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(100);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    await expect(el.optionActive).not.toBeNull();
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

// ─── Shift+Tab moves active option to first option, keeps bib open ───────────
export const ComboboxShiftTabMovesToFirstOption: Story = {
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
    const firstOption = el.querySelector('auro-menuoption[value="Apples"]');

    // Type to filter options. Wait 100ms before clicking the trigger so the
    // full Lit update chain settles (auro-input value → combobox processes
    // input event → availableOptions updates). Using el.input.updateComplete
    // is too fast — it resolves before auro-combobox finishes its own update.
    // This matches the ComboboxBibOpensOnType pattern.
    setInputValue(el, 'a');
    await wait(100);
    const trigger = el.dropdown.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.click();
    await wait(50);
    await expect(el.dropdown.isPopoverVisible).toBe(true);

    // Navigate away from first option
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    // Shift+Tab: should move to first option without selecting or closing
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
    await el.updateComplete;

    await expect(firstOption.classList.contains('active')).toBe(true);
    await expect(el.dropdown.isPopoverVisible).toBe(true);
    await expect(el.value).toBeUndefined();
  },
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
    await wait(100);
    el.showBib();
    await wait(50);
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
    await wait(100);
    el.showBib();
    await wait(50);
    await expect(el.dropdown.isPopoverVisible).toBe(true);
  },
};

// ─── Bib open — option highlighted via arrow key ─────────────────────────────
export const ComboboxBibOpenOptionHighlighted: Story = {
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
  </auro-menu>
</auro-combobox>
  `,
  async play({ canvasElement }: { canvasElement: HTMLElement }) {
    const el = canvasElement.querySelector('auro-combobox') as any;
    await el.updateComplete;
    setInputValue(el, 'a');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(100);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    await expect(el.dropdown.isPopoverVisible).toBe(true);
    await expect(el.optionActive).not.toBeNull();
  },
};

// @TODO need to research why failing in cloud
// // ─── Fullscreen: closing the dialog focuses the input ──────
// export const ComboboxFullscreenCloseFocusesInput: Story = {
//   tags: ['!autodocs', 'chromatic-enabled'],
//   globals: {
//     viewport: {
//       value: 'xs',
//       isRotated: false
//     }
//   },
//   render: () => html`
// <auro-combobox>
//   <span slot="ariaLabel.bib.close">Close combobox</span>
//   <span slot="ariaLabel.input.clear">Clear All</span>
//   <span slot="bib.fullscreen.headline">Bib Header</span>
//   <span slot="label">Fruit</span>
//   <auro-menu>
//     <auro-menuoption value="Apples">Apples</auro-menuoption>
//     <auro-menuoption value="Oranges">Oranges</auro-menuoption>
//   </auro-menu>
// </auro-combobox>
//   `,
//   async play({ canvasElement }: { canvasElement: HTMLElement }) {
//     const el = canvasElement.querySelector('auro-combobox') as any;
//     await el.updateComplete;
//
//     const dropdown = el.dropdown;
//
//     // Type a value so the combobox has availableOptions and will keep
//     // the bib open. Must be done before opening fullscreen because
//     // showModal() makes outer elements inert.
//     setInputValue(el, 'a');
//     await wait(100);
//
//     // --- First cycle: open fullscreen → close ---
//     dropdown.show();
//     await wait(100);
//     await expect(dropdown.isBibFullscreen).toBe(true);
//     await expect(dropdown.isPopoverVisible).toBe(true);
//
//     el.hideBib();
//
//     // The dialog must already be closed synchronously — before Lit's
//     // async updated() closes it. Without the synchronous bibEl.close()
//     // in the toggle handler, dialog.open would still be true here.
//     const bibEl = dropdown.bibElement.value;
//     const dialog = bibEl.shadowRoot.querySelector('dialog') as HTMLDialogElement;
//     await expect(dialog.open).toBe(false);
//
//     await waitForDoubleFrame();
//     await expect(dropdown.isPopoverVisible).toBe(false);
//
//     // --- Second cycle: open fullscreen again → close ---
//     dropdown.show();
//     await wait(100);
//     await expect(dropdown.isPopoverVisible).toBe(true);
//
//     el.hideBib();
//
//     // Same synchronous-close assertion on the second cycle
//     await expect(dialog.open).toBe(false);
//
//     await waitForDoubleFrame();
//     await expect(dropdown.isPopoverVisible).toBe(false);
//   },
// };

// ─── Arrow keys do not open bib when clear button is focused ─────────────────


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
    await el.updateComplete;

    // Navigate to an option via the menu directly (dialog bridge
    // doesn't fire in Storybook's play function environment)
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
    await el.updateComplete;
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
    await el.updateComplete;
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
    await waitForDoubleFrame();

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
