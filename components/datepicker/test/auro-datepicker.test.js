import { fixture, html, expect, elementUpdated, nextFrame } from '@open-wc/testing';
import '../src/index.js';

describe('auro-datepicker', () => {
  it('auro-datepicker is accessible', async () => {
    const el = await fixture(html`
      <auro-datepicker range cssclass="testClass"></auro-datepicker>
    `);

    await expect(el).to.be.accessible({
      ignoredRules: ['nested-interactive']
    });
  });

  it('web component is successfully created in the document', async () => {
    // This test fails when attributes are put onto the component before it is attached to the DOM
    const el = document.createElement('auro-datepicker');

    await expect(el.localName).to.equal('auro-datepicker');
  });

  it('custom element is defined', async () => {
    const el = await !!customElements.get("auro-datepicker");

    await expect(el).to.be.true;
  });

  it('can programmatically apply focus to input', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    const input = getInput(el, 0);

    el.focus();

    await expect(el.shadowRoot.activeElement).to.be.equal(input);
  });

  it('can programmatically apply focus to input desired input with range support', async () => {
    const el = await fixture(html`
      <auro-datepicker range></auro-datepicker>
    `);

    const input = getInput(el, 1);

    el.focus('endDate');

    await expect(el.shadowRoot.activeElement).to.be.equal(input);
  });

  it('opens the bib when clicking on the dropdown trigger', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    const input = getInput(el, 0);
    input.click();

    await expect(el.dropdown.isPopoverVisible).to.be.true;
  });

  it('hides dropdown the dropdown or its children lose focus', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    const input = getInput(el, 0);
    input.click();

    await expect(el.dropdown.isPopoverVisible).to.be.true;

    const button = document.createElement('button');
    document.body.appendChild(button);

    button.click();

    await expect(el.dropdown.isPopoverVisible).to.be.false;
  });

  it('handles the required state being set', async () => {
    const el = await fixture(html`
      <auro-datepicker required></auro-datepicker>
    `);

    const input = getInput(el, 0);

    await expect(el.hasAttribute('validity')).to.be.false;

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('valueMissing');

    input.value = '03/03/2023';

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('valid');
  });

  it('auro-input receives the required attribute from auro-datepicker', async () => {
    const el = await fixture(html`
      <auro-datepicker required></auro-datepicker>
    `);

    const input = getInput(el, 0);

    await expect(el.hasAttribute('required')).to.be.true;
    await expect(input.hasAttribute('required')).to.be.true;
  });

  it('can preset a value', async () => {
    const el = await fixture(html`
      <auro-datepicker value="01/01/2022"></auro-datepicker>
    `);

    await elementUpdated(el);

    const input = getInput(el, 0);

    const setDate = new Date('01/01/2022').toDateString();
    const inputDate = new Date(input.value).toDateString();

    await expect(inputDate).to.be.equal(setDate);
  });

  it('can preset a range', async () => {
    const el = await fixture(html`
      <auro-datepicker range value="01/01/2023" valueEnd="01/15/2023"></auro-datepicker>
    `);

    await elementUpdated(el);

    const departInput = getInput(el, 0);

    const setDepartDate = new Date('01/01/2023').toDateString();
    const departInputDate = new Date(departInput.value).toDateString();

    await expect(departInputDate).to.be.equal(setDepartDate);

    const returnInput = getInput(el, 1);

    const setReturnDate = new Date('01/15/2023').toDateString();
    const returnInputDate = new Date(returnInput.value).toDateString();

    await expect(returnInputDate).to.be.equal(setReturnDate);
  });

  it('respects maxDate setting on datepicker when range is false', async () => {
    const el = await fixture(html`
      <auro-datepicker maxDate="01/01/2022"></auro-datepicker>
    `);

    const input = getInput(el, 0);

    input.value = "01/01/2022";

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('valid');

    input.value = "01/02/2022";

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
  });

  it('respects maxDate setting on second input', async () => {
    const el = await fixture(html`
      <auro-datepicker range maxDate="01/05/2022"></auro-datepicker>
    `);

    const input1 = getInput(el, 0);
    const input2 = getInput(el, 1);

    input1.value = "01/01/2022";

    input2.value = "01/08/2022";

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
  });

  it('resets datepicker when maxDate is at an earlier date than current value', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    el.value = '03/02/2023';

    await elementUpdated(el);

    el.maxDate = '02/26/2023';

    await elementUpdated(el);

    await expect(el.value).to.be.equal(undefined);
  });

  it('respects minDate setting', async () => {
    const el = await fixture(html`
      <auro-datepicker minDate="01/02/2022"></auro-datepicker>
    `);

    const input = getInput(el, 0);

    input.value = "01/02/2022";

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('valid');

    input.value = "01/01/2022";

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
  });

  it('respects minDate setting on second input', async () => {
    const el = await fixture(html`
      <auro-datepicker range minDate="01/05/2022"></auro-datepicker>
    `);

    const input1 = getInput(el, 0);
    const input2 = getInput(el, 1);

    input1.value = "01/02/2022";
    input2.value = "01/06/2022";

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('rangeUnderflow');
  });

  it('resets datepicker when minDate is at a later date than current value', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    el.value = '03/02/2023';

    await elementUpdated(el);

    el.minDate = '03/09/2023';

    await elementUpdated(el);

    await expect(el.value).to.be.equal(undefined);
  });

  it('updates centralDate when minDate is later than centralDate', async () => {
    const el = await fixture(html`
      <auro-datepicker calendarFocusDate="03/02/2023"></auro-datepicker>
    `);

    await elementUpdated(el);

    el.minDate = '04/09/2023';

    await elementUpdated(el);

    const central = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;
    const min = el.minDate;

    await expect(min).to.be.equal(central);
  });

  it('selecting a dateFrom date by clicking on the calendar sets the correct value', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    await elementUpdated(el);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();
    
    const calendarMonth = calendar.shadowRoot.querySelector('auro-calendar-month');

    const calendarCell = calendarMonth.shadowRoot.querySelectorAll('auro-calendar-cell');

    const dateFrom = calendarCell[1];

    const dateFromBtn = dateFrom.shadowRoot.querySelector('button');

    dateFromBtn.click();

    const dateSelected = el.convertWcTimeToDate(dateFrom.day.date);

    await elementUpdated(el);

    await expect(el.value).to.equal(dateSelected);
  });

  it('selecting a dateTo date by clicking on the calendar sets the correct value', async () => {
    const el = await fixture(html`
      <auro-datepicker range></auro-datepicker>
    `);

    await elementUpdated(el);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');
    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);

    const calendarMonth = calendar.shadowRoot.querySelector('auro-calendar-month');

    const calendarCell = calendarMonth.shadowRoot.querySelectorAll('auro-calendar-cell');

    const dateFrom = calendarCell[1];
    const dateFromBtn = dateFrom.shadowRoot.querySelector('button');

    dateFromBtn.click();

    const dateFromSelected = el.convertWcTimeToDate(dateFrom.day.date);

    await elementUpdated(el);

    await expect(el.value).to.equal(dateFromSelected);

    const dateTo = calendarCell[1];
    const dateToBtn = dateTo.shadowRoot.querySelector('button');

    dateToBtn.click();

    const dateToSelected = el.convertWcTimeToDate(dateTo.day.date);

    await elementUpdated(el);

    await expect(el.valueEnd).to.equal(dateToSelected);
  });

  it('attempting to set the dateTo to a date earlier than dateFrom by clicking on the calendar does not set the valueFrom', async () => {
    const el = await fixture(html`
      <auro-datepicker range></auro-datepicker>
    `);

    await elementUpdated(el);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    const calendarMonth = calendar.shadowRoot.querySelector('auro-calendar-month');

    const calendarCell = calendarMonth.shadowRoot.querySelectorAll('auro-calendar-cell');

    const dateFrom = calendarCell[10];
    const dateFromBtn = dateFrom.shadowRoot.querySelector('button');

    dateFromBtn.click();

    const dateFromSelected = el.convertWcTimeToDate(dateFrom.day.date);

    await elementUpdated(el);

    await expect(el.value).to.equal(dateFromSelected);

    const dateTo = calendarCell[8];
    const dateToBtn = dateTo.shadowRoot.querySelector('button');

    dateToBtn.click();

    await elementUpdated(el);

    await expect(el.valueEnd).to.equal(undefined);
  });

  it('hides the prev month button when viewing the first available month', async () => {
    const date = new Date();
    const fullDate = `${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + (date.getDate())).slice(-2)}/${date.getFullYear()}`;

    const el = await fixture(html`
      <auro-datepicker calendarStartDate="${fullDate}"></auro-datepicker>
    `);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');
    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    await expect(calendar.showPrevMonthBtn).to.be.false;
  });

  it('hides the next month button when viewing the last available month', async () => {
    const el = await fixture(html`
      <auro-datepicker maxDate="04/17/2023"></auro-datepicker>
    `);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await expect(calendar.showNextMonthBtn).to.be.false;
  });

  it('removing error attribute reruns validity even when value is undefined', async () => {
    const el = await fixture(html`
      <auro-datepicker error="custom error message"></auro-datepicker>
    `);

    await expect(el.getAttribute('validity')).to.be.equal('customError');

    el.removeAttribute('error');

    await elementUpdated(el);

    await expect(el.hasAttribute('validity')).to.be.true;
  });

  it('setting customValidityValueMissing also sets it on the input', async () => {
    const el = await fixture(html`
      <auro-datepicker setCustomValidityValueMissing="The value is missing!"></auro-datepicker>
    `);

    const input = getInput(el, 0);

    await elementUpdated(el);

    await expect(input.getAttribute('setCustomValidityValueMissing')).to.be.equal('The value is missing!');
  });

  // BUG IN ERROR MESSAGE CODE (Next two tests)
  it('dateFrom error message shown when dateTo is also invalid', async () => {
    const el = await fixture(html`
      <auro-datepicker range required minDate="04/15/2023" value="04/20/2023" setCustomValidityRangeUnderflow="Before min date"></auro-datepicker>
    `);

    const input1 = getInput(el, 0);
    const input2 = getInput(el, 1);

    el.focus();
    el.blur();

    await elementUpdated(el);

    await expect(el.errorMessage).to.be.equal(input1.errorMessage);
    await expect(input2.errorMessage).to.be.equal(undefined);
  });

  it('dateTo error message shown when dateFrom is valid', async () => {
    const el = await fixture(html`
      <auro-datepicker range maxDate="03/03/2023" value="03/01/2023" valueEnd="03/30/2023"></auro-datepicker>
    `);

    await elementUpdated(el);

    await expect(el.getAttribute('validity')).to.be.equal('rangeOverflow');
  });

  it('changing calendarFocusDate changes month visibility', async () => {
    const el = await fixture(html`
      <auro-datepicker calendarFocusDate="03/23/2023"></auro-datepicker>
    `);

    await elementUpdated(el);

    const calendar = el.shadowRoot.querySelector('auro-calendar');

    const central = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(central).to.be.equal('03/23/2023');

    el.calendarFocusDate = '04/25/2024';

    await elementUpdated(el);

    const centralAfter = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(centralAfter).to.be.equal('04/25/2024');
  });

  it('renders a single calendar by default', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');
    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    await expect(calendar.numCalendars).to.be.equal(1);
  });

  it('renders two calendars when range attribute is present', async () => {
    const el = await fixture(html`
      <auro-datepicker range></auro-datepicker>
    `);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    await expect(calendar.numCalendars).to.be.equal(2);
  });

  it.skip('renders twelve calendars in mobile version', async () => {
    window.innerWidth = 550;

    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    await expect(calendar.numCalendars).to.be.equal(12);
  });

  it('updates input value when value is changed', async () => {
    const el = await fixture(html`
      <auro-datepicker range></auro-datepicker>
    `);

    const input1 = getInput(el, 0);
    const input2 = getInput(el, 1);

    setInputValue(input1, '04/03/2023');
    setInputValue(input2, '04/04/2023');

    await elementUpdated(el);

    el.valueEnd = '04/09/202';

    await elementUpdated(el);

    expect(input2.value).to.equal('04/09/202');

    el.valueEnd = undefined;

    await elementUpdated(el);

    expect(input2.value).to.equal('');
  });

  it.skip('render correct number of calendars with calendarStartDate and calendarEndDate in mobile', async () => {
    window.innerWidth = 550;

    const el = await fixture(html`
      <auro-datepicker range calendarStartDate="03/04/2023" calendarEndDate="05/05/2023"></auro-datepicker>
    `);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    await expect(calendar.numCalendars).to.equal(3);
  });

  it('handlePrevMonth changes current calendar month', async () => {
    const el = await fixture(html`
      <auro-datepicker value="02/01/2023"></auro-datepicker>
    `);

    await elementUpdated(el);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');
    const prevMonthBth = calendar.shadowRoot.querySelector('.prevMonth');

    const central = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(central).to.equal('02/01/2023');

    prevMonthBth.click();

    await elementUpdated(el);

    const centralAfter = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(centralAfter).to.contain('01/01/2023');

    prevMonthBth.click();

    await elementUpdated(el);

    const centralAfterAgain = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(centralAfterAgain).to.contain('12/01/2022');
  });

  it('handleNextMonth changes current calendar month', async () => {
    const el = await fixture(html`
      <auro-datepicker value="11/01/2023"></auro-datepicker>
    `);

    await elementUpdated(el);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');
    const nextMonthBth = calendar.shadowRoot.querySelector('.nextMonth');

    const central = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(central).to.equal('11/01/2023');

    nextMonthBth.click();

    await elementUpdated(el);
    
    const centralAfter = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(centralAfter).to.contain('12/01/2023');

    nextMonthBth.click();

    await elementUpdated(el);

    const centralAfterAgain = `${("0" + (new Date(el.centralDate).getMonth() + 1)).slice(-2)}/${("0" + new Date(el.centralDate).getDate()).slice(-2)}/${new Date(el.centralDate).getFullYear()}`;

    await expect(centralAfterAgain).to.contain('01/01/2024');
  });

  it('shows dropdown when user is typing in input', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    const input = getInput(el, 0);

    input.dispatchEvent(new KeyboardEvent('keyup', { key: '0' }));

    await elementUpdated(el);

    await expect(el.dropdown.isPopoverVisible).to.be.true;
  });

  it.skip('closes the mobile bib when clicking the bottom done', async () => {
    window.innerWidth = 550;

    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');
    const input = getInput(el, 0);

    const closeBtn = calendar.shadowRoot.querySelector('.mobileFooterActions auro-button');

    input.click()

    await elementUpdated();

    await expect(el.dropdown.isPopoverVisible).to.be.true;

    closeBtn.click();

    await elementUpdated();

    await expect(el.dropdown.isPopoverVisible).to.be.false;
  });

  it('datepicker correctly parses date slot name and passes content down to cell correctly', async () => {
    const el = await dateSlotFixture();

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();
    
    const calendarMonth = calendar.shadowRoot.querySelector('auro-calendar-month');
    const calendarCell = [...calendarMonth.shadowRoot.querySelectorAll('auro-calendar-cell')];

    const dateData = [...el.querySelectorAll('[slot^="date_"]')];

    for (const cell of calendarCell) {
      const span = cell.querySelector('span');
      let spanContentMatch = false;

      if (span) {
        dateData.forEach((item) => {
          if (item.innerHTML === span.innerHTML) {
            spanContentMatch = true;
          }
        });

        await expect(spanContentMatch).to.be.true;
      }
    }
  });

  it('datepicker passes popover slot content down to cell correctly', async () => {
    const el = await popoverSlotFixture();

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    const calendarMonth = calendar.shadowRoot.querySelector('auro-calendar-month');
    const calendarCell = [...calendarMonth.shadowRoot.querySelectorAll('auro-calendar-cell')];

    const popoverData = [...el.querySelectorAll('[slot^="popover_"]')];

    for (const cell of calendarCell) {
      const span = cell.querySelector('span');
      let spanContentMatch = false;

      if (span) {
        popoverData.forEach((item) => {
          if (item.innerHTML === span.innerHTML) {
            spanContentMatch = true;
          }
        });

        await expect(spanContentMatch).to.be.true;
      }
    }
  });

  it('auro-calendar-cells handles hover event correctly', async () => {
    const el = await fixture(html`
      <auro-datepicker></auro-datepicker>
    `);

    await elementUpdated(el);

    const dropdown = el.shadowRoot.querySelector('[auro-dropdown]');
    const calendar = dropdown.bibContent.querySelector('auro-calendar');

    await dropdown.querySelector('[auro-input]').click();
    await expect(dropdown.isPopoverVisible).to.be.true;
    await elementUpdated(calendar.shadowRoot);
    await nextFrame();

    const calendarMonth = calendar.shadowRoot.querySelector('auro-calendar-month');
    const calendarCell = [...calendarMonth.shadowRoot.querySelectorAll('auro-calendar-cell')];

    const cell = calendarCell[0];
    const cellButton = cell.shadowRoot.querySelector('button');

    cellButton.dispatchEvent(new MouseEvent('mouseover'));

    await expect(cell.hovered).to.be.true;
  });

  // Test needs to be skipped until cleave.js issue is resolved
  it.skip('reset method clears the value and validity state', async () => {
    const el = await fixture(html`
      <auro-datepicker range minDate="06/30/2025" value="02/14/2025" valueEnd="04/05/2025"></auro-datepicker>
    `);

    await expect(el.value).to.be.equal('02/14/2025');
    await expect(el.valueEnd).to.be.equal('04/05/2025');
    await expect(el.validity).to.be.equal('rangeUnderflow');

    el.reset();

    await elementUpdated(el);

    await expect(el.hasAttribute('validity')).to.be.false;
    await expect(el.value).to.be.equal(undefined);
    await expect(el.valueEnd).to.be.equal(undefined);
  });
});

async function dateSlotFixture() {
  return await fixture(html`
    <auro-datepicker centralDate="10/01/2023">
      <span slot="date_10_01_2023">$1322</span>
      <span slot="date_10_02_2023">$234</span>
      <span slot="date_10_11_2023">$784</span>
      <span slot="date_10_15_2023">$567</span>
      <span slot="date_10_16_2023">$12345</span>
    </auro-datepicker>
  `);
}

async function popoverSlotFixture() {
  return await fixture(html`
    <auro-datepicker centralDate="10/01/2023">
      <span slot="popover_10_01_2023">$1322</span>
      <span slot="popover_10_02_2023">$234</span>
      <span slot="popover_10_11_2023">$784</span>
      <span slot="popover_10_15_2023">$567</span>
      <span slot="popover_10_16_2023">$12345</span>
    </auro-datepicker>
  `);
}

function setInputValue(auroInput, value) {
  auroInput.value = value;
}

function getInput(el, index) {
  return el.inputList[index];
}
