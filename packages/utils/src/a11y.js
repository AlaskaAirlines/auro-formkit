/**
 * Announces text to screen readers via an `aria-live` region inside the given shadow root.
 *
 * Expects the shadow root to contain an element with `id="srAnnouncement"`, and
 * does nothing when it's missing. The text is cleared, then set again in a
 * `requestAnimationFrame` callback so that repeated identical announcements still
 * fire. It's cleared again after {@link ANNOUNCEMENT_DURATION_MS} so VoiceOver
 * users can't swipe to stale text.
 *
 * @param {ShadowRoot} shadowRoot - The shadow root containing the live region.
 * @param {string} text - The text to announce.
 */

const ANNOUNCEMENT_DURATION_MS = 1000;

// Tracks the clear-after-announce timeout per shadowRoot so simultaneous
// announcements from different components don't cancel each other.
// A WeakMap (rather than a single module-level variable) is needed because
// ES modules are singletons — a shared variable would let a rapid call from
// one component cancel another component's pending clear, leaving stale text
// in the first component's live region.
const pendingClearTimeouts = new WeakMap();

export function announceToScreenReader(shadowRoot, text) {
  const liveRegion = shadowRoot.querySelector('#srAnnouncement');
  if (liveRegion) {
    // Cancel any pending clear so a previous announcement's timeout
    // doesn't blank this one before the screen reader can read it.
    clearTimeout(pendingClearTimeouts.get(shadowRoot));

    // Clear and re-set to ensure the announcement fires even with same text
    liveRegion.textContent = '';
    requestAnimationFrame(() => {
      liveRegion.textContent = text;

      // Clear after the announcement so VoiceOver cannot swipe to stale text
      pendingClearTimeouts.set(shadowRoot, setTimeout(() => {
        liveRegion.textContent = '';
      }, ANNOUNCEMENT_DURATION_MS));
    });
  }
}

/**
 * Schedules a callback after two animation frames.
 *
 * Use it when opening a fullscreen dialog, to wait for the dialog to render
 * (first frame) and then for a Lit update cycle to complete (second frame)
 * before an action such as focusing the close button.
 *
 * @param {Function} fn - The callback to execute after two animation frames.
 */
export function doubleRaf(fn) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

/**
 * Prevents touch pass-through when a fullscreen dialog opens on a touch device.
 *
 * On coarse-pointer devices (phones / tablets), the tap that opens the
 * fullscreen dialog can "pass through" to content beneath the finger: the
 * `touchstart` opens the dialog, but the finger is still on the screen, so the
 * `touchend` or `click` that follows lands on whatever element sits at those
 * coordinates, such as a menu option or calendar cell, selecting it
 * unintentionally. Mouse clicks don't have this problem, because
 * `showModal()` promotes the dialog to the top layer synchronously and the
 * click has already completed.
 *
 * Guard: only activates on devices whose primary input is coarse.
 * Laptops with a touchscreen report `pointer: fine` (trackpad / mouse is
 * primary), so they're unaffected. Re-enables pointer events on the next `touchstart`,
 * which is the user's first deliberate gesture inside the dialog.
 *
 * @param {HTMLElement} element - The element to disable pointer events on, such
 *   as the menu or calendar wrapper.
 */
export function guardTouchPassthrough(element) {
  if (!element || !window.matchMedia('(pointer: coarse)').matches) return;

  element.style.pointerEvents = 'none';
  document.addEventListener('touchstart', () => {
    element.style.pointerEvents = '';
  }, { once: true });
}

/**
 * Restores the dropdown trigger after a fullscreen dialog closes, so keyboard users keep their place.
 * Removes the `inert` attribute from the trigger, then, after one animation frame, moves focus to
 * the given target if the dropdown is still closed and focus is inside the trigger.
 * The one-frame wait lets Lit finish closing the dialog first, because the browser's native dialog
 * focus restoration can conflict otherwise.
 *
 * @param {HTMLElement} dropdown - The `auro-dropdown` element.
 * @param {HTMLElement} focusTarget - The element to focus, such as the trigger or the input.
 */
export function restoreTriggerAfterClose(dropdown, focusTarget) {
  dropdown.trigger.inert = false;

  // Wait a frame so that dialog.close() has completed and the browser's
  // native focus restoration has run before we attempt to focus the
  // trigger / input programmatically.
  requestAnimationFrame(() => {
    if (!dropdown.isPopoverVisible && dropdown.trigger.contains(document.activeElement)) {
      focusTarget.focus();
    }
  });
}
