// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, no-magic-numbers, complexity, newline-per-chained-call, no-underscore-dangle,
   lit/binding-positions, lit/no-invalid-html, id-length, camelcase */

import { html } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import AuroFormValidation from '@aurodesignsystem/form-validation';
import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import { AuroBibtemplate } from '@aurodesignsystem/auro-bibtemplate';
import { AuroInput } from '@aurodesignsystem/auro-input';
import { AuroHelpText } from '@aurodesignsystem/auro-helptext';
import { AuroIcon } from '@aurodesignsystem/auro-icon/class';
import { AuroButton } from '@aurodesignsystem/auro-button/class';
import { AuroElement } from '@aurodesignsystem/auro-layout-element';
import formkitVersion from '@aurodesignsystem/version';
import i18n from '@aurodesignsystem/auro-input/src/i18n.js';
import { applyKeyboardStrategy, doubleRaf, guardTouchPassthrough } from '@aurodesignsystem/utils';
import { DomHandler } from '@aurodesignsystem/auro-library/scripts/runtime/domHandler/index.mjs';

// Cally — pulls in <calendar-date>, <calendar-range>, <calendar-month> definitions
import 'cally';

import { AuroDatepickerUtilities } from './utilities.js';
import { CalendarBridge, normalizeReferenceDates, toIsoLocal, firstDayOfWeekForLocale } from './calendarBridge.js';
import { datepickerKeyboardStrategy } from './datepickerKeyboardStrategy.js';
import { translate } from './i18nStrings.js';
import { buildLocaleDateMask } from '../../input/src/localeMask.js';

import iconVersion from './iconVersion.js';
import buttonVersion from './buttonVersion.js';

import styleCss from './styles/style-css.js';
import colorCss from './styles/color-css.js';
import tokensCss from './styles/tokens-css.js';
import shapeSizeCss from './styles/shapeSize-css.js';

import classicLayoutStyle from './styles/classic/style-css.js';
import classicLayoutColor from './styles/classic/color-css.js';
import snowflakeStyle from './styles/snowflake/style-css.js';
import snowflakeColors from './styles/snowflake/color-css.js';

import calendarStyleCss from './styles/style-auro-calendar-css.js';
import calendarColorCss from './styles/color-calendar-css.js';

/**
 * The `auro-datepicker` component provides users with a way to select a date or
 * date range from a calendar popup or fullscreen calendar on mobile. Internals
 * are powered by the Cally web component library for accessible calendar grid
 * rendering and keyboard navigation.
 *
 * @customElement auro-datepicker
 *
 * @slot helpText
 * @slot ariaLabel.bib.close
 * @slot ariaLabel.input.clear
 * @slot bib.fullscreen.headline
 * @slot bib.fullscreen.fromLabel
 * @slot bib.fullscreen.toLabel
 * @slot label
 * @slot toLabel
 * @slot fromLabel
 * @slot displayValue
 *
 * @csspart dropdown
 * @csspart trigger
 * @csspart input
 * @csspart calendarWrapper
 * @csspart calendar
 * @csspart helpTextSpan
 * @csspart helpText
 *
 * @event auroDatePicker-valueSet
 * @event auroDatePicker-toggled
 * @event auroDatePicker-monthChanged
 * @event auroFormElement-validated
 */
export class AuroDatePicker extends AuroElement {
  static get shadowRootOptions() {
    return {
      ...AuroElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  constructor() {
    super();

    /** @private */
    this.util = new AuroDatepickerUtilities();

    /** @private */
    this.bridge = new CalendarBridge();

    this.appearance = 'default';
    this.touched = false;
    this.disabled = false;
    this.dvInputOnly = false;
    this.required = false;
    this.onDark = false;
    this.range = false;
    this.stacked = false;
    this.noValidate = false;
    this.validity = undefined;
    this._value = undefined;
    this._valueEnd = undefined;
    this._minDate = undefined;
    this._maxDate = undefined;
    this._calendarFocusDate = undefined;
    this.format = undefined;
    this.fullscreenBreakpoint = 'sm';

    /** @private */
    this._monthNamesOverride = undefined;

    /** @private */
    this._resolvedLocale = 'en-US';

    /** @private */
    this._prevLocaleDefaultFormat = undefined;

    /** @private */
    this._dateFormatterCache = new Map();

    /** @private */
    this._monthNamesCache = new Map();

    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.shift = false;
    this.autoPlacement = false;
    this.largeFullscreenHeadline = false;

    /** @private */
    this.hasDisplayValueContent = true;

    /** @private */
    this.hasFocus = false;

    /** @private */
    this.hasValue = false;

    /** @private */
    this.hasAllValues = false;

    /** @private */
    this.validation = new AuroFormValidation();

    /** @private */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    const versioning = new AuroDependencyVersioning();

    /** @private */
    this.dropdownTag = versioning.generateTag('auro-formkit-datepicker-dropdown', formkitVersion, AuroDropdown);

    /** @private */
    this.bibtemplateTag = versioning.generateTag('auro-formkit-datepicker-bibtemplate', formkitVersion, AuroBibtemplate);

    /** @private */
    this.buttonTag = versioning.generateTag('auro-formkit-datepicker-button', buttonVersion, AuroButton);

    /** @private */
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);

    /** @private */
    this.inputTag = versioning.generateTag('auro-formkit-datepicker-input', formkitVersion, AuroInput);

    /** @private */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', formkitVersion, AuroHelpText);

    this.handleClick = this.handleClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleCalendarFocusDay = this.handleCalendarFocusDay.bind(this);
    this.handleCalendarPointerOver = this.handleCalendarPointerOver.bind(this);
    this.handleCalendarPointerOut = this.handleCalendarPointerOut.bind(this);

    // Layout config
    this.layout = 'classic';
    this.shape = 'classic';
    this.size = 'lg';
  }

  static get properties() {
    return {
      appearance: { type: String,
        reflect: true },
      autoPlacement: { type: Boolean,
        reflect: true },

      /** Date to first show in the calendar (ISO `YYYY-MM-DD`). */
      calendarFocusDate: { type: String,
        reflect: true,
        noAccessor: true },

      /** Currently visible month marker (ISO `YYYY-MM-DD`, non-reflected). */
      centralDate: { type: String },

      /** BCP47 locale tag (e.g. `de-DE`). Defaults to `DomHandler.getLocale(this)`. */
      locale: { type: String,
        reflect: true },

      disabled: { type: Boolean,
        reflect: true },
      dvInputOnly: { type: Boolean,
        reflect: true },
      error: { type: String,
        reflect: true },

      hasFocus: { type: Boolean,
        reflect: false },

      /** @private */
      hasValue: { type: Boolean,
        reflect: false },

      /** @private */
      hasAllValues: { type: Boolean,
        reflect: false },

      format: { type: String,
        reflect: true },
      fullscreenBreakpoint: { type: String,
        reflect: true },
      inputmode: { type: String,
        attribute: true,
        reflect: true },
      largeFullscreenHeadline: { type: Boolean,
        reflect: true },
      layout: { type: String,
        reflect: true },

      /** Maximum allowed date as ISO `YYYY-MM-DD`. */
      maxDate: { type: String,
        reflect: true,
        noAccessor: true },

      /** Minimum allowed date as ISO `YYYY-MM-DD`. */
      minDate: { type: String,
        reflect: true,
        noAccessor: true },

      /**
       * @deprecated Auto-derived from `locale` via `Intl.DateTimeFormat`.
       * Assign a 12-element array to override.
       */
      monthNames: { type: Array,
        noAccessor: true },

      /** @private */
      monthFirst: { type: Boolean },

      noFlip: { type: Boolean,
        reflect: true },
      shift: { type: Boolean,
        reflect: true },
      noValidate: { type: Boolean,
        reflect: true },
      offset: { type: Number,
        reflect: true },
      onDark: { type: Boolean,
        reflect: true },
      placeholder: { type: String,
        reflect: true },
      placeholderEndDate: { type: String,
        reflect: true },
      placement: { type: String,
        reflect: true },
      range: { type: Boolean,
        reflect: true },

      /** Decorated reference dates (ISO `YYYY-MM-DD` or legacy `MM/DD/YYYY`). */
      referenceDates: { type: Array,
        reflect: true },

      /**
       * Optional callback `(date: Date) => { parts?: string[], label?: string, ariaLabel?: string } | null`
       * for per-cell decoration. Replaces the legacy `date_MM_DD_YYYY` / `popover_MM_DD_YYYY` slots.
       */
      dayDecorations: { attribute: false },

      required: { type: Boolean,
        reflect: true },
      setCustomValidity: { type: String },
      setCustomValidityCustomError: { type: String },
      setCustomValidityRangeOverflow: { type: String },
      setCustomValidityRangeUnderflow: { type: String },
      setCustomValidityValueMissing: { type: String },
      stacked: { type: Boolean,
        reflect: true },
      validity: { type: String,
        reflect: true },

      /** Selected start date as ISO `YYYY-MM-DD`. */
      value: { type: String,
        noAccessor: true },

      /** Selected end date as ISO `YYYY-MM-DD` (range mode). */
      valueEnd: { type: String,
        noAccessor: true },

      /** @private */
      touched: { type: Boolean,
        reflect: true,
        attribute: false }
    };
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss,
      shapeSizeCss,
      classicLayoutStyle,
      classicLayoutColor,
      snowflakeStyle,
      snowflakeColors,
      calendarStyleCss,
      calendarColorCss
    ];
  }

  static register(name = 'auro-datepicker') {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroDatePicker);
  }

  /**
   * Flips to `true` after the first `auroDatePicker-valueSet` dispatch so the
   * deprecation warning is logged once per page session.
   * @private
   */
  static _deprecationWarned = false;

  // ---------------------------------------------------------------------
  // ISO 8601 date property accessors
  //
  // value/valueEnd/minDate/maxDate/calendarFocusDate accept and emit ISO
  // `YYYY-MM-DD` only. Non-ISO assignment logs `console.warn` and is ignored.
  // Empty string or undefined clears the property.

  /**
   * Selected start date as ISO `YYYY-MM-DD`.
   * @returns {string|undefined} ISO date string or undefined.
   */
  get value() {
    return this._value;
  }

  set value(next) {
    this._setIsoProp('_value', 'value', next);
  }

  /**
   * Selected end date as ISO `YYYY-MM-DD` (range mode).
   * @returns {string|undefined} ISO date string or undefined.
   */
  get valueEnd() {
    return this._valueEnd;
  }

  set valueEnd(next) {
    this._setIsoProp('_valueEnd', 'valueEnd', next);
  }

  /**
   * Minimum allowed date as ISO `YYYY-MM-DD`.
   * @returns {string|undefined} ISO date string or undefined.
   */
  get minDate() {
    return this._minDate;
  }

  set minDate(next) {
    this._setIsoProp('_minDate', 'minDate', next);
  }

  /**
   * Maximum allowed date as ISO `YYYY-MM-DD`.
   * @returns {string|undefined} ISO date string or undefined.
   */
  get maxDate() {
    return this._maxDate;
  }

  set maxDate(next) {
    this._setIsoProp('_maxDate', 'maxDate', next);
  }

  /**
   * Initial calendar focus date as ISO `YYYY-MM-DD`.
   * @returns {string|undefined} ISO date string or undefined.
   */
  get calendarFocusDate() {
    return this._calendarFocusDate;
  }

  set calendarFocusDate(next) {
    this._setIsoProp('_calendarFocusDate', 'calendarFocusDate', next);
  }

  /**
   * @param {string} storage - Private storage field name.
   * @param {string} propName - Public property name (for requestUpdate + warn).
   * @param {string|undefined} incoming - Incoming value.
   * @private
   * @returns {void}
   */
  _setIsoProp(storage, propName, incoming) {
    const isClear = incoming === undefined || incoming === null || incoming === '';
    const isIso = typeof incoming === 'string' && (/^\d{4}-\d{2}-\d{2}$/u).test(incoming);
    if (!isClear && !isIso) {
      // eslint-disable-next-line no-console
      console.warn(`auro-datepicker: "${incoming}" is not ISO 8601 (YYYY-MM-DD); ignoring`);
      return;
    }
    const old = this[storage];
    const next = isClear ? undefined : incoming;
    if (next !== old) {
      this[storage] = next;
      this.requestUpdate(propName, old);
    }
  }

  /**
   * Local-time `Date` parsed from an ISO `YYYY-MM-DD` string. Uses
   * `new Date(y, m-1, d)` to avoid the UTC off-by-one drift of `new Date(iso)`.
   * @param {string|undefined} iso
   * @returns {Date|undefined}
   * @private
   */
  _isoToLocalDate(iso) {
    if (!iso) {
      return undefined;
    }
    const match = iso.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u);
    if (!match || !match.groups) {
      return undefined;
    }
    const { year, month, day } = match.groups;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  /**
   * Read-only local-time `Date` for `value`.
   * @returns {Date|undefined} Local-time Date or undefined.
   */
  get valueObject() {
    return this._isoToLocalDate(this._value);
  }

  /**
   * Read-only local-time `Date` for `valueEnd`.
   * @returns {Date|undefined} Local-time Date or undefined.
   */
  get valueEndObject() {
    return this._isoToLocalDate(this._valueEnd);
  }

  /**
   * Read-only local-time `Date` for `minDate`.
   * @returns {Date|undefined} Local-time Date or undefined.
   */
  get minDateObject() {
    return this._isoToLocalDate(this._minDate);
  }

  /**
   * Read-only local-time `Date` for `maxDate`.
   * @returns {Date|undefined} Local-time Date or undefined.
   */
  get maxDateObject() {
    return this._isoToLocalDate(this._maxDate);
  }

  /**
   * Read-only local-time `Date` for `calendarFocusDate`.
   * @returns {Date|undefined} Local-time Date or undefined.
   */
  get calendarFocusDateObject() {
    return this._isoToLocalDate(this._calendarFocusDate);
  }

  /**
   * Long-form month names. Auto-derived from the resolved locale unless the
   * consumer assigns a 12-element array override.
   * @returns {string[]}
   */
  get monthNames() {
    if (Array.isArray(this._monthNamesOverride) && this._monthNamesOverride.length === 12) {
      return this._monthNamesOverride;
    }
    const locale = this._resolvedLocale || 'en-US';
    let cached = this._monthNamesCache.get(locale);
    if (!cached) {
      const fmt = new Intl.DateTimeFormat(locale, { month: 'long' });
      cached = Array.from({ length: 12 }, (_unused, idx) => fmt.format(new Date(2000, idx, 1)));
      this._monthNamesCache.set(locale, cached);
    }
    return cached;
  }

  set monthNames(next) {
    const old = this._monthNamesOverride;
    this._monthNamesOverride = Array.isArray(next) && next.length === 12 ? next : undefined;
    this.requestUpdate('monthNames', old);
  }

  /**
   * Convenience accessor returning `[value]` or `[value, valueEnd]` for range.
   * @returns {string[]}
   */
  get values() {
    if (this.range && this.value && this.valueEnd) {
      return [
        this.value,
        this.valueEnd
      ];
    }
    if (this.value) {
      return [this.value];
    }
    return [];
  }

  /** @private */
  get labelHidden() {
    return this.hasDisplayValueContent && this.dvInputOnly && !this.hasFocus && this.hasAllValues;
  }

  /** @private */
  get dvHidden() {
    return !this.hasDisplayValueContent || this.hasFocus || !this.hasAllValues;
  }

  /** @private */
  get displayValueFontClass() {
    if (this.layout && this.layout.startsWith('emphasized')) {
      let typeSize = 'accent-xl';
      if (this.hasDisplayValueContent) {
        if (!this.hasValue) {
          typeSize = 'body-sm';
        }
      } else if (this.noFocusOrValue) {
        typeSize = 'body-sm';
      }
      return typeSize;
    }
    if (this.layout === 'snowflake') {
      return 'body-lg';
    }
    if (this.layout === 'classic' && this.shape === 'snowflake') {
      return 'body-lg';
    }
    return 'body-default';
  }

  /** @private */
  get commonDisplayValueWrapperClasses() {
    return {
      'displayValueWrapper': true,
      'util_displayHiddenVisually': this.dvHidden,
      [this.displayValueFontClass]: true,
    };
  }

  get hasError() {
    return this.validity !== undefined && this.validity !== 'valid';
  }

  // ---------------------------------------------------------------------
  // Public methods

  /**
   * Focus the datepicker trigger input.
   * @param {string} focusInput - Pass `endDate` to focus the end input (range mode).
   */
  focus(focusInput = '') {
    this.hasFocus = true;
    if (this.range && focusInput === 'endDate' && this.inputList && this.inputList[1]) {
      this.inputList[1].focus();
    } else if (this.inputList && this.inputList[0]) {
      this.inputList[0].focus();
    }
  }

  blur() {
    super.blur();
    this.hideBib();
  }

  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  showBib() {
    if (this.dropdown && !this.dropdown.isPopoverVisible) {
      this.dropdown.show();
    }
  }

  reset() {
    this.resetInputs();
    this.validation.reset(this);
  }

  resetInputs() {
    if (this.inputList) {
      this.inputList.forEach((input) => input.reset());
    }
  }

  clear() {
    this.resetInputs();
  }

  validate(force = false) {
    if (!this.inputList || this.inputList.length === 0) {
      return;
    }
    this.inputList[0].validate(force);
    if (this.range && this.inputList[1]) {
      this.inputList[1].validate(force);
    }
    this.validation.validate(this, force);
  }

  /**
   * Move focus into the calendar grid. Used by keyboard strategy after ArrowDown.
   */
  focusCalendar() {
    const cal = this.shadowRoot && this.shadowRoot.querySelector('calendar-range, calendar-date');
    if (cal && typeof cal.focus === 'function') {
      cal.focus();
    }
  }

  // ---------------------------------------------------------------------
  // Event notification

  /** @private */
  notifyValueChanged() {
    this.dispatchEvent(new Event('auroDatePicker-valueSet', { bubbles: true,
      composed: true }));
    if (!AuroDatePicker._deprecationWarned) {
      AuroDatePicker._deprecationWarned = true;
      // eslint-disable-next-line no-console
      console.warn('auro-datepicker: `auroDatePicker-valueSet` is deprecated. Listen for the standard `input` event with `event.detail.value` / `event.detail.valueEnd` (ISO 8601).');
    }
    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: {
        value: this._value,
        valueEnd: this._valueEnd
      }
    }));
  }

  /** @private */
  notifyDatepickerToggled() {
    this.dispatchEvent(new CustomEvent('auroDatePicker-toggled', {
      bubbles: true,
      composed: true,
      detail: { expanded: this.dropdown.isPopoverVisible }
    }));
  }

  /**
   * @private
   * @param {number} month - 1-based month.
   * @param {number} year - Full year.
   * @param {number} numCalendars - Number of visible calendars.
   */
  notifyMonthChanged(month, year, numCalendars = 1) {
    this.dispatchEvent(new CustomEvent('auroDatePicker-monthChanged', {
      bubbles: true,
      composed: true,
      detail: { month,
        year,
        numCalendars }
    }));
  }

  // ---------------------------------------------------------------------
  // Cally event bridge

  /**
   * Handle Cally's `change` event. For `<calendar-date>` the `value` is a single
   * ISO date; for `<calendar-range>` it is `YYYY-MM-DD/YYYY-MM-DD`.
   * @param {Event} event
   * @private
   */
  handleCalendarChange(event) {
    const {target} = event;
    if (!target) {
      return;
    }
    const cVal = target.value || '';
    if (this.range) {
      const [
        start,
        end
      ] = cVal.split('/');
      const startIso = start && this.util.toIso(start);
      const endIso = end && this.util.toIso(end);
      if (startIso !== this.value) {
        this.value = startIso || undefined;
      }
      if (endIso !== this.valueEnd) {
        this.valueEnd = endIso || undefined;
      }
      this.bridge.setHoverIso(undefined);
      this.notifyValueChanged();

      // If both ends now resolved while bib is non-fullscreen, close it.
      if (this.value && this.valueEnd && this.dropdown && !this.dropdown.isBibFullscreen) {
        // Don't auto-close — let user dismiss; matches today's UX where users
        // can re-pick. Keep open to allow corrections.
      }
    } else {
      const iso = this.util.toIso(cVal);
      if (iso !== this.value) {
        this.value = iso || undefined;
      }
      this.notifyValueChanged();
      if (this.dropdown && !this.dropdown.isBibFullscreen) {
        this.dropdown.hide();
      }
    }
  }

  /**
   * Handle Cally's `focusday` event — fires when keyboard or programmatic focus
   * moves to a new day. Drives `calendarFocusDate` and emits month-changed
   * (dedupe via the bridge).
   * @param {CustomEvent} event
   * @private
   */
  handleCalendarFocusDay(event) {
    const day = event.detail && event.detail.day;
    if (!(day instanceof Date)) {
      return;
    }
    const iso = toIsoLocal(day);
    if (iso !== this.calendarFocusDate) {
      this.calendarFocusDate = iso;
    }
    const month = day.getMonth() + 1;
    const year = day.getFullYear();
    if (this.bridge.monthChanged(month, year)) {
      this.notifyMonthChanged(month, year, this.numVisibleMonths());
    }
  }

  /**
   * @private
   * @param {PointerEvent} event - Pointer event from the calendar.
   */
  handleCalendarPointerOver(event) {
    if (!this.range || !this.value || this.valueEnd) {
      return;
    }
    const cellEl = event.composedPath().find((el) => el && el.dataset && el.dataset.date);
    const iso = cellEl && cellEl.dataset && cellEl.dataset.date;
    if (iso && iso !== this.bridge._hoverIso) {
      this.bridge.setHoverIso(iso);
      this._refreshGetDayParts();
    }
  }

  /**
   * @private
   * @param {PointerEvent} event - Pointer event from the calendar.
   */
  handleCalendarPointerOut(event) {
    if (!this.range || !this.value || this.valueEnd) {
      return;
    }
    if (event.relatedTarget && this.contains(event.relatedTarget)) {
      return;
    }
    this.bridge.setHoverIso(undefined);
    this._refreshGetDayParts();
  }

  /** @private */
  numVisibleMonths() {
    const cal = this.shadowRoot && this.shadowRoot.querySelector('calendar-range, calendar-date');
    if (!cal) {
      return 1;
    }
    const months = cal.getAttribute('months');
    return months ? Number(months) || 1 : 1;
  }

  /** @private */
  _refreshGetDayParts() {
    const cal = this.shadowRoot && this.shadowRoot.querySelector('calendar-range, calendar-date');
    if (!cal) {
      return;
    }
    cal.getDayParts = this.bridge.buildGetDayParts({
      referenceIsoSet: normalizeReferenceDates(this.referenceDates),
      dayDecorations: this.dayDecorations,
      rangeStartIso: this.value,
      rangeEndIso: this.valueEnd
    });
  }

  // ---------------------------------------------------------------------
  // Wire-up

  /** @private */
  checkDisplayValueSlotChange() {
    let nodes = this.shadowRoot.querySelector('slot[name="displayValue"]').assignedNodes();
    if (nodes && nodes[0] && nodes[0].tagName === 'SLOT') {
      nodes = nodes[0].assignedNodes();
    }
    this.hasDisplayValueContent = nodes.length > 0;
  }

  /** @private */
  configureDropdown() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);
    this.bibtemplate = this.shadowRoot.querySelector(this.bibtemplateTag._$litStatic$);

    const labelElement = this.querySelector('[slot="fromLabel"]');
    if (labelElement) {
      this.dropdown.bibDialogLabel = labelElement.textContent.trim() || undefined;
    }

    this.dropdown.addEventListener('auroDropdown-triggerClick', () => {
      if (!this.dropdown.isPopoverVisible) {
        this.dropdown.show();
      }
    });

    this.dropdown.addEventListener('auroDropdown-toggled', () => {
      this.notifyDatepickerToggled();

      if (this.dropdown.isPopoverVisible && this.dropdown.isBibFullscreen) {
        this.dropdown.trigger.inert = true;
        this.dropdown.updateComplete.then(() => {
          const bibEl = this.dropdown.bibElement && this.dropdown.bibElement.value;
          if (bibEl && this.dropdown.isPopoverVisible) {
            bibEl.close();
            bibEl.open(true);
            doubleRaf(() => {
              if (this.bibtemplate && typeof this.bibtemplate.focusCloseButton === 'function') {
                this.bibtemplate.focusCloseButton();
              }
            });
          }
        });
        const wrapper = this.shadowRoot.querySelector('.calendarWrapper');
        if (wrapper) {
          guardTouchPassthrough(wrapper);
        }
      } else if (!this.dropdown.isPopoverVisible) {
        this.dropdown.trigger.inert = false;
        if (this.hasFocus) {
          requestAnimationFrame(() => {
            if (!this.dropdown.isPopoverVisible && this.inputList && this.inputList[0]) {
              this.inputList[0].focus();
            }
          });
        }
      }
    });

    this.dropdown.addEventListener('auroDropdown-strategy-change', () => {
      if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible) {
        this.dropdown.trigger.inert = true;
        this.dropdown.updateComplete.then(() => {
          const bibEl = this.dropdown.bibElement && this.dropdown.bibElement.value;
          if (bibEl && this.dropdown.isPopoverVisible) {
            bibEl.close();
            bibEl.open(true);
          }
        });
      } else if (!this.dropdown.isBibFullscreen) {
        this.dropdown.trigger.inert = false;
      }
    });
  }

  /** @private */
  configureInput() {
    this.triggerInput = this.dropdown.querySelector('[slot="trigger"]');
    this.inputList = [...this.dropdown.querySelectorAll(this.inputTag._$litStatic$)];

    this.inputList.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        event.stopPropagation();
        const displayValue = input.value;
        const iso = this.util.validDateStr(displayValue, this.format)
          ? this.util.displayToIso(displayValue, this.format)
          : undefined;
        if (index === 0) {
          if (iso !== this.value) {
            this.value = iso;
          }
        } else if (index === 1) {
          if (iso !== this.valueEnd) {
            this.valueEnd = iso;
          }
        }
        this.notifyValueChanged();
      });

      input.addEventListener('auroFormElement-validated', (evt) => {
        evt.stopPropagation();
        if (evt.detail.validity === 'customError') {
          this.validity = evt.detail.validity;
          this.errorMessage = evt.detail.message;
        } else if (evt.target === this.inputList[0]) {
          this.validity = evt.detail.validity;
          this.errorMessage = evt.detail.message;
        } else if (this.inputList.length > 1 && evt.target === this.inputList[1] && (this.inputList[0].validity === 'valid' || this.inputList[0].validity === undefined)) {
          this.validity = evt.detail.validity;
          this.errorMessage = evt.detail.message;
        }
      });
    });
  }

  /** @private */
  configureCalendar() {
    const cal = this.shadowRoot.querySelector('calendar-range, calendar-date');
    if (!cal) {
      return;
    }
    this.calendar = cal;
    cal.addEventListener('change', this.handleCalendarChange);
    cal.addEventListener('focusday', this.handleCalendarFocusDay);
    cal.addEventListener('pointerover', this.handleCalendarPointerOver);
    cal.addEventListener('pointerout', this.handleCalendarPointerOut);
    this._refreshGetDayParts();
  }

  /** @private */
  configureDatepicker() {
    this.addEventListener('focusin', () => {
      this.touched = true;
      this.hasFocus = true;
    });
    this.addEventListener('focusout', () => {
      this.hasFocus = false;
      if (this.noValidate) {
        return;
      }
      if (!this.contains(document.activeElement)) {
        this.validate();
      }
    });
  }

  /** @private */
  configureClickHandler() {
    this.addEventListener('click', this.handleClick);
  }

  firstUpdated() {
    this.runtimeUtils.handleComponentTagRename(this, 'auro-datepicker');
    this.configureDropdown();
    this.configureInput();
    this.configureCalendar();
    this.configureDatepicker();
    this.configureClickHandler();
    applyKeyboardStrategy(this, datepickerKeyboardStrategy);
  }

  connectedCallback() {
    super.connectedCallback();
    this._domHandler = this._domHandler || new DomHandler();
    this._resolveLocale();
    this._observeAncestorLocale();
    this._applyLocaleFormatPrecedence();
    this.bridge.setLocale(this._resolvedLocale);
    if (this.format) {
      this.monthFirst = this.format.indexOf('mm') < this.format.indexOf('yyyy');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._localeMutationObserver) {
      this._localeMutationObserver.disconnect();
      this._localeMutationObserver = null;
    }
  }

  /**
   * Resolve the effective locale via `DomHandler.getLocale`: own `locale` attr →
   * nearest ancestor `data-locale` → `en-US`.
   * @private
   */
  _resolveLocale() {
    try {
      this._resolvedLocale = this._domHandler.getLocale(this);
    } catch {
      this._resolvedLocale = 'en-US';
    }
  }

  /**
   * Re-resolve locale when an ancestor toggles `data-locale`.
   * @private
   */
  _observeAncestorLocale() {
    if (typeof MutationObserver === 'undefined' || this._localeMutationObserver) {
      return;
    }
    this._localeMutationObserver = new MutationObserver(() => {
      const next = this._domHandler.getLocale(this);
      if (next !== this._resolvedLocale) {
        this._resolvedLocale = next;
        this._applyLocaleFormatPrecedence();
        this.bridge.setLocale(this._resolvedLocale);
        this.requestUpdate();
      }
    });
    this._localeMutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-locale'],
      subtree: true
    });
  }

  /**
   * Implements `format`/`locale` precedence:
   *  - If `format` is unset OR equals the previous locale's default pattern,
   *    overwrite `format` with the new locale's default pattern.
   *  - Otherwise leave `format` untouched (consumer override).
   * @private
   */
  _applyLocaleFormatPrecedence() {
    const nextDefault = buildLocaleDateMask(this._resolvedLocale).pattern;
    if (!this.format || this.format === this._prevLocaleDefaultFormat) {
      this.format = nextDefault;
      this.monthFirst = nextDefault.indexOf('mm') < nextDefault.indexOf('yyyy');
    }
    this._prevLocaleDefaultFormat = nextDefault;
  }

  // ---------------------------------------------------------------------

  /** @private */
  setHasValue() {
    if (!this.range) {
      this.hasValue = Boolean(this.value && this.value.length > 0);
      this.hasAllValues = this.hasValue;
      return;
    }
    // eslint-disable-next-line no-extra-parens
    this.hasValue = Boolean((this.value && this.value.length > 0) || (this.valueEnd && this.valueEnd.length > 0));
    this.hasAllValues = Boolean(this.value && this.valueEnd);
  }

  updated(changedProperties) {
    if (changedProperties.has('locale')) {
      this._resolveLocale();
      this._applyLocaleFormatPrecedence();
      this.bridge.setLocale(this._resolvedLocale);
    }

    if (changedProperties.has('format') && this.format) {
      this.monthFirst = this.format.indexOf('mm') < this.format.indexOf('yyyy');
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.previousTabIndex = this.getAttribute('tabindex');
        this.setAttribute('tabindex', '-1');
      } else if (!this.disabled && this.previousTabIndex > -1) {
        this.tabIndex = this.previousTabIndex;
      } else {
        this.removeAttribute('tabindex');
      }
    }

    if (changedProperties.has('value')) {
      this._syncInputFromIso(0, this.value);
      this.setHasValue();
      if (!this.calendarFocusDate && this.value) {
        this.calendarFocusDate = this.value;
      }
      this._syncCalendarValue();
    }

    if (changedProperties.has('valueEnd') && this.inputList && this.inputList[1]) {
      this._syncInputFromIso(1, this.valueEnd);
      this.setHasValue();
      this._syncCalendarValue();
      this.validate();
    }

    // Range validity: drop valueEnd if it preceeds value.
    if (this.value && this.valueEnd && this.value > this.valueEnd) {
      this.valueEnd = undefined;
    }

    if (changedProperties.has('minDate') && this.minDate && this.value && this.value < this.minDate) {
      this.value = undefined;
      if (this.range && this.valueEnd) {
        this.valueEnd = undefined;
      }
    }

    if (changedProperties.has('maxDate') && this.maxDate && this.value && this.value > this.maxDate) {
      this.value = undefined;
      if (this.range && this.valueEnd) {
        this.valueEnd = undefined;
      }
    }

    if (changedProperties.has('referenceDates') || changedProperties.has('dayDecorations')) {
      this._refreshGetDayParts();
    }

    if (changedProperties.has('error')) {
      const lastInput = this.inputList && this.inputList[this.inputList.length - 1];
      if (lastInput) {
        if (this.hasAttribute('error')) {
          lastInput.setAttribute('error', this.getAttribute('error'));
        } else {
          lastInput.removeAttribute('error');
        }
        this.validation.validate(lastInput, true);
      }
    }
  }

  /**
   * @private
   * @param {number} index - Input list index (0 start, 1 end).
   * @param {string|undefined} iso - ISO date string to display.
   */
  _syncInputFromIso(index, iso) {
    if (!this.inputList || !this.inputList[index]) {
      return;
    }
    const input = this.inputList[index];
    const display = iso ? this.util.isoToDisplay(iso, this.format) : '';
    if (input.value !== display) {
      input.value = display || '';
    }
  }

  /** @private */
  _syncCalendarValue() {
    if (!this.calendar) {
      return;
    }
    if (this.range) {
      if (this.value && this.valueEnd) {
        this.calendar.value = `${this.value}/${this.valueEnd}`;
      } else if (this.value) {
        // Cally range expects both ends; while only start is set, leave value blank
        // so it doesn't paint a partial range. Hover preview handles transient UX.
        this.calendar.value = '';
      } else {
        this.calendar.value = '';
      }
    } else {
      this.calendar.value = this.value || '';
    }
    if (this.calendarFocusDate) {
      this.calendar.setAttribute('focused-date', this.calendarFocusDate);
    }
  }

  // ---------------------------------------------------------------------
  // Rendering

  /**
   * @private
   * @param {Event} event - Click event.
   */
  handleClick(event) {
    const [initTarget] = event.composedPath();
    const layoutRequiresHandling = ['snowflake'].includes(this.layout);
    const targetIsInput = initTarget && initTarget.tagName === 'INPUT';
    const isFocusAlreadyOnInput = this.inputList && this.inputList.includes(this.shadowRoot.activeElement);
    if (layoutRequiresHandling && !targetIsInput && !isFocusAlreadyOnInput && !event.composedPath().includes(this.dropdown.bibContent)) {
      this.inputList[0].focus();
    }
  }

  /**
   * @private
   * @param {Event} event - Click event from the clear control.
   */
  handleClearClick(event) {
    event.stopPropagation();
    this.resetInputs();
    this.value = undefined;
    this.valueEnd = undefined;
    this.notifyValueChanged();
    this.focus();
  }

  /**
   * @private
   * @param {number} length - Desired output length.
   * @returns {string} Random alphanumeric string.
   */
  generateRandomString(length) {
    return Math.random().toString(36).substring(2, length + 2);
  }

  /** @private */
  _shortDateFormatter() {
    const locale = this._resolvedLocale || 'en-US';
    let fmt = this._dateFormatterCache.get(locale);
    if (!fmt) {
      fmt = new Intl.DateTimeFormat(locale, { month: 'short',
        day: '2-digit' });
      this._dateFormatterCache.set(locale, fmt);
    }
    return fmt;
  }

  /**
   * @private
   * @param {string|undefined} iso - ISO date string to format.
   * @returns {string} Localized short date, or empty string.
   */
  formatShortDate(iso) {
    if (!iso) {
      return '';
    }
    const d = this.util.isoToDate(iso);
    if (!d) {
      return '';
    }
    return this._shortDateFormatter().format(d).replace(',', '');
  }

  /**
   * Format an ISO range as a localized string using `Intl.formatRange` when
   * available. Falls back to `"start – end"`.
   * @param {string|undefined} startIso
   * @param {string|undefined} endIso
   * @returns {string}
   * @private
   */
  _formatRange(startIso, endIso) {
    const start = this.util.isoToDate(startIso);
    const end = this.util.isoToDate(endIso);
    if (!start || !end) {
      return '';
    }
    const fmt = this._shortDateFormatter();
    if (typeof fmt.formatRange === 'function') {
      try {
        return fmt.formatRange(start, end);
      } catch {
        // fall through
      }
    }
    return `${fmt.format(start)} – ${fmt.format(end)}`;
  }

  /**
   * @private
   * @param {string|undefined} iso - ISO date string.
   * @returns {import('lit').TemplateResult} Display template.
   */
  renderDisplayTextDate(iso) {
    return html`
      <div>
        <div class="displayValueText body-lg">
          ${iso ? this.formatShortDate(iso) : undefined}
        </div>
      </div>
    `;
  }

  /** @private */
  renderDateInputs() {
    const inputClasses = {
      'util_displayHiddenVisually': !this.hasValue && !this.hasFocus && this.layout !== 'classic',
      'parentBorder': this.layout === 'classic'
    };

    return html`
      <div class="inputContainer">
        <${this.inputTag}
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          ?hideLabelVisually="${this.layout !== 'classic'}"
          .format="${this.format}"
          .locale="${this._resolvedLocale}"
          .max="${ifDefined(this.maxDate ? this.util.isoToDisplay(this.maxDate, this.format) : undefined)}"
          .min="${ifDefined(this.minDate ? this.util.isoToDisplay(this.minDate, this.format) : undefined)}"
          .placeholder="${this.placeholder}"
          .size="${this.size}"
          .shape="${this.shape}"
          class="dateFrom ${classMap(inputClasses)}"
          id="${this.generateRandomString(12)}"
          inputmode="${ifDefined(this.inputmode)}"
          layout="classic"
          noValidate
          part="input"
          setCustomValidity="${ifDefined(this.setCustomValidity)}"
          setCustomValidityCustomError="${ifDefined(this.setCustomValidityCustomError)}"
          setCustomValidityValueMissing="${ifDefined(this.setCustomValidityValueMissing)}"
          setCustomValidityRangeOverflow="${ifDefined(this.setCustomValidityRangeOverflow)}"
          setCustomValidityRangeUnderflow="${ifDefined(this.setCustomValidityRangeUnderflow)}"
          type="date"
        >
          ${this.layout !== 'classic'
            ? html`<span slot="displayValue">${this.renderDisplayTextDate(this.value)}</span>`
            : undefined}
          <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}</span>
          <span slot="label"><slot name="fromLabel"></slot></span>
        </${this.inputTag}>
      </div>

      ${this.range ? html`<div class="inputDivider"></div>` : undefined}

      ${this.range ? html`
        <div class="inputContainer">
          <${this.inputTag}
            appearance="${this.onDark ? 'inverse' : this.appearance}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?hideLabelVisually="${this.layout !== 'classic'}"
            .format="${this.format}"
            .locale="${this._resolvedLocale}"
            .max="${ifDefined(this.maxDate ? this.util.isoToDisplay(this.maxDate, this.format) : undefined)}"
            .min="${ifDefined(this.minDate ? this.util.isoToDisplay(this.minDate, this.format) : undefined)}"
            .placeholder="${this.placeholderEndDate || this.placeholder}"
            .size="${this.size}"
            .shape="${this.shape}"
            class="dateTo ${classMap(inputClasses)}"
            id="${this.generateRandomString(12)}"
            layout="classic"
            noValidate
            part="input"
            setCustomValidity="${ifDefined(this.setCustomValidity)}"
            setCustomValidityCustomError="${ifDefined(this.setCustomValidityCustomError)}"
            setCustomValidityValueMissing="${ifDefined(this.setCustomValidityValueMissing)}"
            setCustomValidityRangeOverflow="${ifDefined(this.setCustomValidityRangeOverflow)}"
            setCustomValidityRangeUnderflow="${ifDefined(this.setCustomValidityRangeUnderflow)}"
            type="date"
          >
            ${this.layout !== 'classic'
              ? html`<span slot="displayValue">${this.renderDisplayTextDate(this.valueEnd)}</span>`
              : undefined}
            <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}</span>
            <span slot="label"><slot name="toLabel"></slot></span>
          </${this.inputTag}>
        </div>
      ` : undefined}
    `;
  }

  /** @private */
  renderSnowflakeLayout() {
    const accentsClassMap = { error: this.hasError };
    const inputSectionClassMap = {
      inputSection: true,
      hasValue: this.hasValue,
      hasFocus: this.hasFocus,
      util_displayHiddenVisually: !this.dvHidden
    };
    const labelClassMap = {
      mainLabel: true,
      hasValue: this.hasValue,
      hasFocus: this.hasFocus,
      util_displayHiddenVisually: this.labelHidden,
      [this.hasFocus || this.hasValue ? 'body-xs' : 'body-lg']: true,
    };

    return html`
      <div class="wrapper trigger" part="wrapper">
        <div class="accents left">${this.renderHtmlIconCalendar()}</div>
        <div class="mainContent">
          <label class="${classMap(labelClassMap)}" part="mainLabel">
            <slot name="label"></slot>
          </label>
          <div class="${classMap(inputSectionClassMap)}" part="inputSection">
            ${this.renderDateInputs()}
          </div>
          <div class="${classMap(this.commonDisplayValueWrapperClasses)}">
            <slot name="displayValue" @slotchange=${this.checkDisplayValueSlotChange}>
              <span>
                ${this.range && this.value && this.valueEnd
                  ? this._formatRange(this.value, this.valueEnd)
                  : this.formatShortDate(this.value)}
              </span>
            </slot>
          </div>
        </div>
        <div class="accents right ${classMap(accentsClassMap)}">
          ${this.hasError ? this.renderHtmlIconError() : this.renderHtmlActionClear()}
        </div>
      </div>
    `;
  }

  /** @private */
  renderClassicLayout() {
    const accentsClassMap = { error: this.hasError };
    const inputSectionClassMap = {
      inputSection: true,
      hasValue: this.hasValue,
      hasFocus: this.hasFocus,
    };

    return html`
      <div class="wrapper trigger" part="wrapper">
        <div class="accents left">${this.renderHtmlIconCalendar()}</div>
        <div class="mainContent">
          <div class="${classMap(inputSectionClassMap)}" part="inputSection">
            ${this.renderDateInputs()}
          </div>
        </div>
        <div class="accents right ${classMap(accentsClassMap)}">
          ${this.hasError ? this.renderHtmlIconError() : this.renderHtmlActionClear()}
        </div>
      </div>
    `;
  }

  /** @private */
  renderLayoutFromAttributes() {
    switch (this.layout) {
      case 'snowflake':
        return this.renderSnowflakeLayout();
      default:
        return this.renderClassicLayout();
    }
  }

  /** @private */
  renderHtmlActionClear() {
    const clearActionClassMap = {
      notification: true,
      clear: true,
      util_displayHidden: (!this.value || this.value.length === 0) && (!this.valueEnd || this.valueEnd.length === 0),
    };
    return html`
      <div class="${classMap(clearActionClassMap)}">
        <${this.buttonTag}
          @click="${this.handleClearClick}"
          ?onDark="${this.onDark}"
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          aria-label="${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}"
          class="notificationBtn clearBtn"
          shape="circle"
          size="sm"
          variant="ghost">
          <${this.iconTag}
            ?customColor="${this.onDark || this.appearance === 'inverse'}"
            category="interface"
            name="x-lg">
          </${this.iconTag}>
        </${this.buttonTag}>
      </div>
    `;
  }

  /** @private */
  renderHtmlIconError() {
    return html`
      <div class="notification error">
        <${this.iconTag}
          category="alert"
          customColor
          name="error-stroke">
        </${this.iconTag}>
      </div>
    `;
  }

  /** @private */
  renderHtmlIconCalendar() {
    return html`
      <${this.iconTag}
        appearance="${this.onDark ? 'inverse' : this.appearance}"
        category="interface"
        class="accentIcon"
        name="calendar"
        part="accentIcon"
        variant="${this.disabled ? 'disabled' : 'muted'}">
      </${this.iconTag}>
    `;
  }

  /** @private */
  renderHtmlHelpText() {
    return html`
      ${!this.validity || this.validity === undefined || this.validity === 'valid'
        ? html`
          <${this.helpTextTag} appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        `
        : html`
          <${this.helpTextTag} error appearance="${this.onDark ? 'inverse' : this.appearance}">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `}
    `;
  }

  /**
   * @private
   * @returns {import('lit').TemplateResult} Calendar template.
   */
  renderCalendar() {
    const months = 2;
    return html`
      <div class="calendarWrapper" part="calendarWrapper">
        <div class="calendars">
          ${this.range
            ? html`
              <calendar-range
                part="calendar"
                months="${months}"
                locale="${this._resolvedLocale}"
                first-day-of-week="${firstDayOfWeekForLocale(this._resolvedLocale)}"
                .value="${this._calendarValue()}"
                min="${ifDefined(this.minDate)}"
                max="${ifDefined(this.maxDate)}"
                focused-date="${ifDefined(this.calendarFocusDate)}">
                ${this._renderCalendarNavSlots()}
                <calendar-month locale="${this._resolvedLocale}"></calendar-month>
                <calendar-month locale="${this._resolvedLocale}" offset="1"></calendar-month>
              </calendar-range>
            `
            : html`
              <calendar-date
                part="calendar"
                locale="${this._resolvedLocale}"
                first-day-of-week="${firstDayOfWeekForLocale(this._resolvedLocale)}"
                .value="${this.value || ''}"
                min="${ifDefined(this.minDate)}"
                max="${ifDefined(this.maxDate)}"
                focused-date="${ifDefined(this.calendarFocusDate)}">
                ${this._renderCalendarNavSlots()}
                <calendar-month locale="${this._resolvedLocale}"></calendar-month>
              </calendar-date>
            `}
        </div>
      </div>
    `;
  }

  /**
   * @private
   * @returns {string} The ISO-formatted calendar value for Cally.
   */
  _calendarValue() {
    if (this.value && this.valueEnd) {
      return `${this.value}/${this.valueEnd}`;
    }
    return this.value || '';
  }

  /**
   * @private
   * @returns {import('lit').TemplateResult} Previous/next nav button slot content.
   */
  _renderCalendarNavSlots() {
    return html`
      <${this.buttonTag}
        slot="previous"
        class="calendarNavBtn"
        shape="circle"
        size="sm"
        variant="ghost"
        aria-label="${translate(this._resolvedLocale, 'datepicker.calendar.prevMonth')}">
        <${this.iconTag} category="interface" name="chevron-left"></${this.iconTag}>
      </${this.buttonTag}>
      <${this.buttonTag}
        slot="next"
        class="calendarNavBtn"
        shape="circle"
        size="sm"
        variant="ghost"
        aria-label="${translate(this._resolvedLocale, 'datepicker.calendar.nextMonth')}">
        <${this.iconTag} category="interface" name="chevron-right"></${this.iconTag}>
      </${this.buttonTag}>
    `;
  }

  render() {
    const dropdownElementClassMap = { hasFocus: this.hasFocus };

    return html`
      <slot name="ariaLabel.input.clear" hidden @slotchange=${this.requestUpdate}></slot>

      <${this.dropdownTag}
        appearance="${this.onDark ? 'inverse' : this.appearance}"
        ?autoPlacement="${this.autoPlacement}"
        ?disabled="${this.disabled}"
        ?error="${this.validity !== undefined && this.validity !== 'valid'}"
        ?noFlip="${this.noFlip}"
        ?shift="${this.shift}"
        .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
        .layout="${this.layout}"
        .matchWidth="${false}"
        .offset="${this.offset}"
        .placement="${this.placement}"
        .shape="${this.shape}"
        .size="${this.size}"
        class="${classMap(dropdownElementClassMap)}"
        disableEventShow
        for="dropdownMenu"
        part="dropdown">
        <div slot="trigger" class="dpTriggerContent" part="trigger">
          ${this.renderLayoutFromAttributes()}
        </div>
        <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}" @close-click="${this.hideBib}">
          <slot name="ariaLabel.bib.close" slot="ariaLabel.close">${translate(this._resolvedLocale, 'datepicker.bib.close')}</slot>
          <slot name="bib.fullscreen.headline" slot="header"></slot>
          ${this.renderCalendar()}
        </${this.bibtemplateTag}>
        <div slot="helpText" part="helpTextSpan">
          ${this.renderHtmlHelpText()}
        </div>
      </${this.dropdownTag}>
    `;
  }
}
