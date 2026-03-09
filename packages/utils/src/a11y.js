/**
 * Announces text to screen readers via an `aria-live` region inside the given shadow root.
 *
 * Expects the shadow root to contain an element with `id="srAnnouncement"`.
 * The text is cleared and re-set inside a `requestAnimationFrame` so that
 * repeated identical announcements still fire, and is cleared again after
 * {@link ANNOUNCEMENT_DURATION_MS} so VoiceOver cannot swipe to stale text.
 *
 * @param {ShadowRoot} shadowRoot - The shadow root containing the live region.
 * @param {string} text - The text to announce.
 */

const ANNOUNCEMENT_DURATION_MS = 1000;

export function announceToScreenReader(shadowRoot, text) {
  const liveRegion = shadowRoot.querySelector('#srAnnouncement');
  if (liveRegion) {
    // Clear and re-set to ensure the announcement fires even with same text
    liveRegion.textContent = '';
    requestAnimationFrame(() => {
      liveRegion.textContent = text;

      // Clear after the announcement so VoiceOver cannot swipe to stale text
      setTimeout(() => {
        liveRegion.textContent = '';
      }, ANNOUNCEMENT_DURATION_MS);
    });
  }
}
