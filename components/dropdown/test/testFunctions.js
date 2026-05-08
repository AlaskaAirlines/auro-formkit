import { expect } from "@open-wc/testing";

/**
 * Asserts that the dropdown popover is currently visible.
 * @param {HTMLElement} el - The auro-dropdown element under test.
 * @returns {void}
 */
export function expectPopoverShown(el) {
  expect(el.isPopoverVisible).to.equal(true);
}

/**
 * Asserts that the dropdown popover is currently hidden.
 * @param {HTMLElement} el - The auro-dropdown element under test.
 * @returns {void}
 */
export function expectPopoverHidden(el) {
  expect(el.isPopoverVisible).to.equal(false);
}
