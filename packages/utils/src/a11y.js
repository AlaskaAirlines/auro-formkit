/**
 * Announces text to screen readers via an `aria-live` region inside the given shadow root.
 *
 * Expects the shadow root to contain an element with `id="srAnnouncement"`.
 * The text is cleared and re-set inside a `requestAnimationFrame` so that
 * repeated identical announcements still fire, and is cleared again after
 * {@link ANNOUNCEMENT_DURATION_MS} so VoiceOver cannot swipe to stale text.
 *
 * @param {ShadowRoot|null} shadowRoot - The shadow root containing the live region, or `null` (in which case the call is a no-op).
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

/**
 * Returns the shadow root where live-region announcements should be routed.
 *
 * In fullscreen mode the component's own live region sits outside the modal
 * dialog and is inert, so announcements must go to the bib's live region
 * (inside the dialog) instead.
 *
 * @param {HTMLElement} dropdown - The `auro-dropdown` element.
 * @param {ShadowRoot} fallbackRoot - The component's own shadow root (used in desktop mode).
 * @returns {ShadowRoot|null} The shadow root containing the target `#srAnnouncement` element,
 *   or `null` when fullscreen mode is active but the bib shadow root is not yet available
 *   (the announcement is silently skipped rather than sent to the inert host shadow root).
 */
export function getAnnouncementRoot(dropdown, fallbackRoot) {
  if (dropdown.isBibFullscreen) {
    const bibEl = dropdown.bibElement && dropdown.bibElement.value;
    return (bibEl && bibEl.shadowRoot) || null;
  }
  return fallbackRoot;
}

export function announceToScreenReader(shadowRoot, text) {
  if (!shadowRoot) return;
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
 * Used when opening a fullscreen dialog to wait for the dialog to render
 * (first frame) and then for a Lit update cycle to complete (second frame)
 * before performing an action like focusing the close button.
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
 * fullscreen dialog can "pass through" to content beneath the finger —
 * the touchstart opens the dialog, but the finger is still on the screen,
 * so the subsequent touchend / click lands on whatever element sits at
 * those coordinates (e.g. a menu option or calendar cell), selecting it
 * unintentionally. This does NOT happen with mouse clicks because
 * showModal() promotes the dialog to the top layer synchronously and the
 * click has already completed.
 *
 * Guard: only activates on devices whose primary input is coarse.
 * Laptops with a touchscreen report `pointer: fine` (trackpad / mouse is
 * primary) so they are unaffected. Re-enables on the next touchstart,
 * which is the user's first deliberate gesture inside the dialog.
 *
 * @param {HTMLElement} element - The element to disable pointer events on
 *   (e.g. the menu or calendar wrapper).
 */
export function guardTouchPassthrough(element) {
  if (!element || !window.matchMedia('(pointer: coarse)').matches) return;

  element.style.pointerEvents = 'none';
  document.addEventListener('touchstart', () => {
    element.style.pointerEvents = '';
  }, { once: true });
}

/**
 * Closes the fullscreen dialog element synchronously.
 *
 * When a dropdown closes, Lit's async update cycle may call `dialog.close()`
 * too late — the browser's native focus restoration (back to `document.body`)
 * can race with the `requestAnimationFrame` in {@link restoreTriggerAfterClose},
 * stealing focus back to `body` after it was already placed on the trigger.
 *
 * Calling this *before* `restoreTriggerAfterClose` ensures the dialog's native
 * focus restore fires first, so the rAF wins the race.
 *
 * @param {HTMLElement} dropdown - The `auro-dropdown` element whose bib may
 *   contain a `<dialog>`.
 */
export function closeFullscreenDialog(dropdown) {
  const bibEl = dropdown.bibElement && dropdown.bibElement.value;
  if (bibEl) {
    bibEl.close();
  }
}

/**
 * Restores the dropdown trigger after a fullscreen dialog closes.
 *
 * Removes the `inert` attribute from the trigger so it is accessible again,
 * and restores focus to the given target after one animation frame. The rAF
 * delay lets Lit's microtask update cycle call `dialog.close()` first —
 * without it the browser's native dialog focus restoration can conflict.
 *
 * The focus is only applied if the dropdown is still closed at the time the
 * rAF fires, guarding against a rapid close-then-reopen race.
 *
 * @param {HTMLElement} dropdown - The `auro-dropdown` element.
 * @param {HTMLElement} focusTarget - The element to focus (e.g. trigger or input).
 */
export function restoreTriggerAfterClose(dropdown, focusTarget) {
  dropdown.trigger.inert = false;

  requestAnimationFrame(() => {
    if (!dropdown.isPopoverVisible) {
      focusTarget.focus();
    }
  });
}
