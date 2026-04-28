import { test, expect, type Page, type Locator } from './coverage-fixture';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wait for auro-datepicker to be fully registered and its dropdown ready. */
async function waitForDatepicker(page: Page, fixture: string) {
  await page.waitForFunction(
    (testId) => {
      const section = document.querySelector(`[data-testid="${testId}"]`);
      const el = section?.querySelector('auro-datepicker') as any;
      return (
        customElements.get('auro-datepicker') !== undefined &&
        el?.dropdown?.bibContent != null
      );
    },
    fixture,
    { timeout: 10_000 },
  );
}

/** Return the datepicker element scoped to a data-testid section. */
function dp(page: Page, fixture: string): Locator {
  return page.locator(`[data-testid="${fixture}"] auro-datepicker`);
}

/** Click the datepicker input to open the bib. */
async function openBib(page: Page, fixture: string) {
  await dp(page, fixture).evaluate((el: any) => {
    el.inputList[0].click();
  });
}

/** Check whether the dropdown bib is visible. */
function isBibVisible(page: Page, fixture: string) {
  return dp(page, fixture).evaluate((el: any) => {
    return Boolean(el.dropdown?.isPopoverVisible);
  });
}

/** Wait for the bib to become visible. */
async function waitForBibOpen(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 8_000 }).toBe(true);
}

/** Wait for the bib to close. */
async function waitForBibClosed(page: Page, fixture: string) {
  await expect.poll(() => isBibVisible(page, fixture), { timeout: 8_000 }).toBe(false);
}

/** Get the datepicker's value. */
function getValue(page: Page, fixture: string) {
  return dp(page, fixture).evaluate((el: any) => el.value);
}

/** Get the datepicker's valueEnd (range mode). */
function getValueEnd(page: Page, fixture: string) {
  return dp(page, fixture).evaluate((el: any) => el.valueEnd);
}

/** Get the month index (0-based) of the currently displayed central date. */
function getCentralMonth(page: Page, fixture: string) {
  return dp(page, fixture).evaluate((el: any) => {
    return new Date(el.centralDate).getMonth();
  });
}

/** Click a calendar cell by index within the first rendered calendar month. */
async function clickCalendarCell(page: Page, fixture: string, cellIndex: number) {
  await dp(page, fixture).evaluate((el: any, idx: number) => {
    const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
    const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
    const cells = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');
    const cell = cells[idx];
    const btn = cell.shadowRoot.querySelector('button');
    btn.click();
  }, cellIndex);
}

/** Click the previous-month navigation button. */
async function clickPrevMonth(page: Page, fixture: string) {
  await dp(page, fixture).evaluate((el: any) => {
    const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
    const prevBtn = calendar.shadowRoot.querySelector('.prevMonth');
    prevBtn.click();
  });
}

/** Click the next-month navigation button. */
async function clickNextMonth(page: Page, fixture: string) {
  await dp(page, fixture).evaluate((el: any) => {
    const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
    const nextBtn = calendar.shadowRoot.querySelector('.nextMonth');
    nextBtn.click();
  });
}

/** Check whether the bib is in fullscreen mode. */
function isBibFullscreen(page: Page, fixture: string) {
  return dp(page, fixture).evaluate((el: any) => {
    return Boolean(el.dropdown?.isBibFullscreen);
  });
}

/** Get the number of calendar months rendered. */
function getCalendarCount(page: Page, fixture: string) {
  return dp(page, fixture).evaluate((el: any) => {
    const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
    return calendar?.numCalendars ?? 0;
  });
}

/** Click the done/close button in the fullscreen bib footer. */
async function clickDoneButton(page: Page, fixture: string) {
  await dp(page, fixture).evaluate((el: any) => {
    const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
    const doneBtn = calendar.shadowRoot.querySelector('[slot="footer"]');
    doneBtn.click();
  });
}

/** Hover over a calendar cell by index. */
async function hoverCalendarCell(page: Page, fixture: string, cellIndex: number) {
  await dp(page, fixture).evaluate((el: any, idx: number) => {
    const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
    const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
    const cells = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');
    const cell = cells[idx];
    const btn = cell.shadowRoot.querySelector('button');
    btn.dispatchEvent(new MouseEvent('mouseover'));
  }, cellIndex);
}

/** Check whether a calendar cell at the given index has hovered state. */
function isCellHovered(page: Page, fixture: string, cellIndex: number) {
  return dp(page, fixture).evaluate((el: any, idx: number) => {
    const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
    const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
    const cells = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');
    return Boolean(cells[idx]?.hovered);
  }, cellIndex);
}

// ─── Suite ────────────────────────────────────────────────────────────────────

interface SuiteOptions {
  route: string;
}

export function datepickerInteractionSuite(framework: string, options?: SuiteOptions) {
  const route = options?.route ?? '/datepicker-interaction';
  const label = `auro-datepicker interaction in ${framework}`;

  // ─── Desktop tests ────────────────────────────────────────────────────────

  test.describe(`${label} — desktop`, () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await waitForDatepicker(page, 'default');
    });

    // ── Open / Close ──────────────────────────────────────────────────────

    test.describe('Open and close', () => {
      test('opens the bib when the input is clicked', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');
      });

      test('closes the bib when clicking outside', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.locator('#outside-element').click();
        await waitForBibClosed(page, 'default');
      });

      test('closes the bib when Escape is pressed', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        await page.keyboard.press('Escape');
        await waitForBibClosed(page, 'default');
      });

      test('does not open the bib when Enter is pressed on the input', async ({ page }) => {
        await dp(page, 'default').evaluate((el: any) => el.focus());
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);

        const visible = await isBibVisible(page, 'default');
        expect(visible).toBe(false);
      });

      test('does not open the bib when Space is pressed on the input', async ({ page }) => {
        await dp(page, 'default').evaluate((el: any) => el.focus());
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);

        const visible = await isBibVisible(page, 'default');
        expect(visible).toBe(false);
      });

      test('typing in the input does not open the bib', async ({ page }) => {
        await dp(page, 'default').evaluate((el: any) => el.focus());

        // Type a digit into the input
        await page.keyboard.press('0');
        await page.waitForTimeout(100);

        const visible = await isBibVisible(page, 'default');
        expect(visible).toBe(false);
      });
    });

    // ── Calendar month navigation ─────────────────────────────────────────

    test.describe('Calendar month navigation', () => {
      test('navigates to the previous month', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        const initialMonth = await getCentralMonth(page, 'default');

        await clickPrevMonth(page, 'default');

        await expect.poll(() => getCentralMonth(page, 'default')).toBe(
          initialMonth === 0 ? 11 : initialMonth - 1,
        );
      });

      test('navigates to the next month', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        const initialMonth = await getCentralMonth(page, 'default');

        await clickNextMonth(page, 'default');

        await expect.poll(() => getCentralMonth(page, 'default')).toBe(
          initialMonth === 11 ? 0 : initialMonth + 1,
        );
      });

      test('navigates multiple months forward', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        const initialMonth = await getCentralMonth(page, 'default');

        await clickNextMonth(page, 'default');
        await expect.poll(() => getCentralMonth(page, 'default')).not.toBe(initialMonth);

        await clickNextMonth(page, 'default');

        await expect.poll(() => getCentralMonth(page, 'default')).toBe(
          (initialMonth + 2) % 12,
        );
      });
    });

    // ── Date selection ────────────────────────────────────────────────────

    test.describe('Date selection', () => {
      test('clicking a calendar cell selects the date', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        // Click the 5th cell (some day in the rendered month)
        await clickCalendarCell(page, 'default', 4);

        await expect.poll(() => getValue(page, 'default'), { timeout: 5_000 }).toBeTruthy();
      });

      test('clicking a cell sets the correct date value', async ({ page }) => {
        await openBib(page, 'default');
        await waitForBibOpen(page, 'default');

        // Get the date from cell[2] before clicking, then click and verify
        const expectedDate = await dp(page, 'default').evaluate((el: any) => {
          const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
          const calendarMonth = calendar.shadowRoot.querySelector('auro-formkit-calendar-month');
          const cells = calendarMonth.shadowRoot.querySelectorAll('auro-formkit-calendar-cell');
          return el.convertWcTimeToDate(cells[2].day.date);
        });

        await clickCalendarCell(page, 'default', 2);

        await expect.poll(() => getValue(page, 'default'), { timeout: 5_000 }).toBe(expectedDate);
      });
    });

    // ── Date range selection ──────────────────────────────────────────────

    test.describe('Date range selection', () => {
      test('clicking two dates sets value and valueEnd', async ({ page }) => {
        await waitForDatepicker(page, 'range');
        await openBib(page, 'range');
        await waitForBibOpen(page, 'range');

        // Click dateFrom (cell 4)
        await clickCalendarCell(page, 'range', 4);

        // Wait for dateFrom to be set before clicking dateTo
        await expect.poll(() => getValue(page, 'range'), { timeout: 5_000 }).toBeTruthy();

        // Click dateTo (cell 10)
        await clickCalendarCell(page, 'range', 10);

        await expect.poll(() => getValueEnd(page, 'range'), { timeout: 5_000 }).toBeTruthy();

        const value = await getValue(page, 'range');
        const valueEnd = await getValueEnd(page, 'range');

        expect(value).toBeDefined();
        expect(value).not.toBe('');
        expect(valueEnd).toBeDefined();
        expect(valueEnd).not.toBe('');
      });

      test('cannot set dateTo to a date earlier than dateFrom', async ({ page }) => {
        await waitForDatepicker(page, 'range');
        await openBib(page, 'range');
        await waitForBibOpen(page, 'range');

        // Click dateFrom at cell 10 (later in the month)
        await clickCalendarCell(page, 'range', 10);
        await expect.poll(() => getValue(page, 'range'), { timeout: 5_000 }).toBeTruthy();

        const valueAfterFirst = await getValue(page, 'range');
        expect(valueAfterFirst).toBeDefined();

        // Try to click dateTo at cell 5 (earlier in the month)
        await clickCalendarCell(page, 'range', 5);

        // Give the component a moment to process, then verify rejection
        // This is a negative assertion - we need a brief wait since there's no state change to poll
        await page.waitForTimeout(200);

        // valueEnd should be undefined — earlier date rejected
        const valueEnd = await getValueEnd(page, 'range');
        expect(valueEnd).toBeUndefined();
      });

      test('renders two calendars in range mode on desktop', async ({ page }) => {
        await waitForDatepicker(page, 'range');
        await openBib(page, 'range');
        await waitForBibOpen(page, 'range');

        const count = await getCalendarCount(page, 'range');
        expect(count).toBe(2);
      });
    });

    // ── Hover preview ─────────────────────────────────────────────────────

    test.describe('Hover preview', () => {
      test('hovering a cell after selecting dateFrom shows hovered state in range mode', async ({ page }) => {
        await waitForDatepicker(page, 'range');
        await openBib(page, 'range');
        await waitForBibOpen(page, 'range');

        // Select dateFrom (cell 3)
        await clickCalendarCell(page, 'range', 3);
        await expect.poll(() => getValue(page, 'range'), { timeout: 5_000 }).toBeTruthy();

        // Hover over a later cell (cell 8) — should show hovered state
        await hoverCalendarCell(page, 'range', 8);

        // A cell between dateFrom and hovered should be marked hovered
        await expect.poll(() => isCellHovered(page, 'range', 6), { timeout: 3_000 }).toBe(true);
      });
    });

    // ── Clear button ──────────────────────────────────────────────────────

    test.describe('Clear button', () => {
      test('Enter on clear button clears value without opening the bib', async ({ page }) => {
        await waitForDatepicker(page, 'preset');

        // Verify preset value is set
        const initialValue = await getValue(page, 'preset');
        expect(initialValue).not.toBe('');

        // Focus the datepicker, then Tab to the clear button
        await dp(page, 'preset').evaluate((el: any) => el.focus());
        await expect(dp(page, 'preset')).toBeFocused();
        await page.keyboard.press('Tab');

        // Press Enter to trigger the clear button
        await page.keyboard.press('Enter');

        await expect.poll(() => getValue(page, 'preset'), { timeout: 5_000 }).toBe(undefined);

        const visible = await isBibVisible(page, 'preset');
        expect(visible).toBe(false);
      });

      test('Space on clear button clears value without opening the bib', async ({ page }) => {
        await waitForDatepicker(page, 'preset');

        const initialValue = await getValue(page, 'preset');
        expect(initialValue).not.toBe('');

        await dp(page, 'preset').evaluate((el: any) => el.focus());
        await expect(dp(page, 'preset')).toBeFocused();
        await page.keyboard.press('Tab');

        await page.keyboard.press('Space');

        await expect.poll(() => getValue(page, 'preset'), { timeout: 5_000 }).toBe(undefined);

        const visible = await isBibVisible(page, 'preset');
        expect(visible).toBe(false);
      });
    });
  });

  // ─── Fullscreen mobile tests ──────────────────────────────────────────────

  test.describe(`${label} — fullscreen mobile`, () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ page }) => {
      await page.goto(route);
      await waitForDatepicker(page, 'default');
    });

    test('opens in fullscreen mode on mobile viewport', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(() => isBibFullscreen(page, 'default'), { timeout: 5_000 }).toBe(true);
    });

    test('renders twelve calendars in fullscreen mobile', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(() => isBibFullscreen(page, 'default'), { timeout: 5_000 }).toBe(true);

      const count = await getCalendarCount(page, 'default');
      expect(count).toBe(12);
    });

    test('done button closes the fullscreen bib', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(() => isBibFullscreen(page, 'default'), { timeout: 5_000 }).toBe(true);

      await clickDoneButton(page, 'default');
      await waitForBibClosed(page, 'default');
    });

    test('date selection in fullscreen sets the value', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(() => isBibFullscreen(page, 'default'), { timeout: 5_000 }).toBe(true);

      await clickCalendarCell(page, 'default', 4);

      await expect.poll(() => getValue(page, 'default'), { timeout: 5_000 }).toBeTruthy();

      const value = await getValue(page, 'default');
      expect(value).toBeDefined();
      expect(value).not.toBe('');
    });

    test('focus moves to the close button when fullscreen dialog opens', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(() => isBibFullscreen(page, 'default'), { timeout: 5_000 }).toBe(true);

      // Wait for focus cycle (rAF)
      await expect.poll(async () => {
        return dp(page, 'default').evaluate((el: any) => {
          const calendar = el.shadowRoot.querySelector('auro-formkit-calendar');
          const bibtemplateTag = calendar.bibtemplateTag?._$litStatic$;
          if (!bibtemplateTag) return false;
          const bibtemplate = calendar.shadowRoot.querySelector(bibtemplateTag);
          if (!bibtemplate) return false;
          const closeBtn = bibtemplate.shadowRoot.querySelector('#closeButton');
          return bibtemplate.shadowRoot.activeElement === closeBtn;
        });
      }, { timeout: 5_000 }).toBe(true);
    });

    test('trigger is set to inert while fullscreen dialog is open', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(() => isBibFullscreen(page, 'default'), { timeout: 5_000 }).toBe(true);

      const triggerInert = await dp(page, 'default').evaluate((el: any) => {
        return el.dropdown.trigger.inert;
      });

      expect(triggerInert).toBe(true);
    });

    test('trigger inert and focus are restored after fullscreen dialog closes', async ({ page }) => {
      await openBib(page, 'default');
      await waitForBibOpen(page, 'default');

      await expect.poll(() => isBibFullscreen(page, 'default'), { timeout: 5_000 }).toBe(true);

      // Verify trigger is inert while open
      await expect.poll(async () =>
        dp(page, 'default').evaluate((el: any) => el.dropdown.trigger.inert),
      ).toBe(true);

      // Close via done button
      await clickDoneButton(page, 'default');
      await waitForBibClosed(page, 'default');

      // Trigger should no longer be inert
      await expect.poll(async () =>
        dp(page, 'default').evaluate((el: any) => el.dropdown.trigger.inert),
      ).toBe(false);

      // Popover should be closed
      await expect.poll(() => isBibVisible(page, 'default')).toBe(false);
    });
  });
}
