/**
 * Shared async-wait helpers for Storybook play functions.
 *
 * All timing-dependent waits in play functions should use one of these
 * helpers so the strategy is documented in one place and easy to reason about.
 *
 * - `wait(ms)`              — fixed delay for state-settling after events
 * - `waitForDoubleFrame()`  — two rAF cycles; ensures layout/paint is complete
 * - `waitUntil(predicate)`  — polls a condition; more robust than a fixed delay
 */

/** Pause for a fixed number of milliseconds. */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait for two animation frames (layout + paint).
 * Use after DOM mutations that need to be visually settled before assertions.
 */
export function waitForDoubleFrame(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

/**
 * Poll a predicate until it returns true or the timeout expires.
 * More accurate than fixed `setTimeout` delays — resolves as soon as
 * the condition is met rather than always waiting a fixed duration.
 */
export async function waitUntil(
  predicate: () => boolean,
  timeout = 2000,
  interval = 20,
): Promise<void> {
  const deadline = Date.now() + timeout;
  while (!predicate() && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, interval));
  }
}
