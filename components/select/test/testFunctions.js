import { setViewport } from '@web/test-runner-commands';

export async function setScreenSize(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
}

/**
 * Returns the shadow root that contains the live region for screen reader
 * announcements. Mirrors `_getAnnouncementRoot()` on the component so tests
 * always query the correct root regardless of fullscreen state.
 *
 * @param {object} dropdown - The auro-dropdown element.
 * @param {ShadowRoot} fallbackShadowRoot - The host component's shadow root.
 * @returns {ShadowRoot}
 */
export function getAnnouncementRoot(dropdown, fallbackShadowRoot) {
  if (dropdown.isBibFullscreen && dropdown.isPopoverVisible && dropdown.bibElement?.value) {
    return dropdown.bibElement.value.shadowRoot;
  }
  return fallbackShadowRoot;
}
