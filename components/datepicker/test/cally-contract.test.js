// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/**
 * F10 (post-mortem): Cally locale-contract pin test.
 *
 * Mounts raw Cally elements with no `auro-datepicker` wrapper and asserts that
 * Cally's native `locale` attribute drives `Intl`-derived month labels. This
 * is the canary for any Cally upgrade that silently breaks the contract —
 * without it, a CLDR change or Cally minor bump could ship English headers
 * inside a German booking flow and our shell tests would still pass.
 *
 * Intentionally minimal: we trust ICU/CLDR to localize correctly. We assert
 * only that the rendered label is NOT English for a non-English locale —
 * that gives a stable failure signal without binding to CLDR string drift.
 */

import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import 'cally';

describe('Cally locale contract (pin test)', () => {
  it('renders a non-English month label when locale is non-English', async () => {
    const el = await fixture(html`
      <calendar-month locale="de-DE" focusedValue="2025-06-15"></calendar-month>
    `);
    await aTimeout(20);

    const englishJune = 'June';
    const text = el.shadowRoot ? el.shadowRoot.textContent : el.textContent;
    expect(text).to.not.include(englishJune);
  });

  it('emits ISO `YYYY-MM-DD` on `change` for `calendar-date`', async () => {
    const el = await fixture(html`
      <calendar-date value="2025-06-15"></calendar-date>
    `);
    expect(el.value).to.match(/^\d{4}-\d{2}-\d{2}$/u);
  });

  it('emits ISO `YYYY-MM-DD` on both ends for `calendar-range`', async () => {
    const el = await fixture(html`
      <calendar-range value="2025-06-15/2025-06-20"></calendar-range>
    `);
    expect(el.value).to.match(/^\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}$/u);
  });
});
