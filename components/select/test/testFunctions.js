import { setViewport } from '@web/test-runner-commands';
import designTokens from '@aurodesignsystem/design-tokens/dist/legacy/auro-classic/JSONVariablesFlat.json' with { type: 'json' };

const mobileBreakpointWidth = parseInt(designTokens['ds-grid-breakpoint-sm'], 10) - 1;

export async function setScreenSize(mobileView) {
  if (mobileView) {
    await setViewport({
      width: mobileBreakpointWidth,
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
