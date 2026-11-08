// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-lines, no-magic-numbers, complexity, newline-per-chained-call, no-underscore-dangle, lit/binding-positions,
   lit/no-invalid-html, no-unused-expressions */

import { html } from 'lit/static-html.js';
import {classMap} from "lit/directives/class-map.js";

import AuroFormValidation from '@aurodesignsystem/form-validation';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { dateFormatter } from '@aurodesignsystem/auro-library/scripts/runtime/dateUtilities/dateFormatter.mjs';
import { DomHandler } from '@aurodesignsystem/auro-library/scripts/runtime/domHandler';
import { getDateFormatFromLocale } from '@aurodesignsystem/auro-input/src/utilities.js';
import { AuroDatepickerUtilities } from './utilities.js';
import { UtilitiesCalendarRender } from './utilitiesCalendarRender.js';

import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

// Import touch detection lib
import styleCss from "./styles/style-css.js";
import colorCss from "./styles/color-css.js";
import tokensCss from "./styles/tokens-css.js";
import shapeSizeCss from "./styles/shapeSize-css.js";

// layouts
import classicLayoutStyle from "./styles/classic/style-css.js";
import classicLayoutColor from "./styles/classic/color-css.js";
import snowflakeStyle from "./styles/snowflake/style-css.js";
import snowflakeColors from "./styles/snowflake/color-css.js";

import './auro-calendar.js';

import { AuroDropdown } from '@aurodesignsystem/auro-dropdown';
import { AuroInput, AuroInputUtil } from '@aurodesignsystem/auro-input';
import { AuroHelpText } from "@aurodesignsystem/auro-helptext";
import formkitVersion from '@aurodesignsystem/version';

import { ifDefined } from "lit/directives/if-defined.js";
import {AuroElement} from "@aurodesignsystem/auro-layout-element";
import i18n from "@aurodesignsystem/auro-input/src/i18n.js";

import { AuroIcon } from '@aurodesignsystem/auro-icon/class';
import iconVersion from './iconVersion.js';

import { AuroButton } from "@aurodesignsystem/auro-button/class";
import buttonVersion from './buttonVersion.js';

import { doubleRaf, guardTouchPassthrough, applyKeyboardStrategy } from '@aurodesignsystem/utils';
import { datepickerKeyboardStrategy } from './datepickerKeyboardStrategy.js';


// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * A date field that lets people type a date or choose it from a calendar, including a start and end date for a range.
 *
 * **Key capabilities**
 * - **Date ranges**: `range` adds a second input for an end date and highlights the chosen range in the calendar.
 * - **Limits and unavailable dates**: `minDate` and `maxDate` turn off dates outside a range, and `blackoutDates` marks single dates people can't select.
 * - **Validation**: `required` shows an error when no date is chosen, and the `setCustomValidity` attributes replace the built-in error messages.
 * - **Content on dates**: The `date_YYYY_MM_DD` and `popover_YYYY_MM_DD` slots add content to a date in the calendar, such as a price.
 * - **Localization**: `locale` sets the date format and the month and weekday names, and attributes and slots let you translate every other label.
 * - **Fullscreen on small screens**: `fullscreenBreakpoint` sets the screen size at or below which the calendar opens fullscreen.
 *
 * **Example**
 * ```html
 * <auro-datepicker>
 *   <span slot="fromLabel">Departure date</span>
 *   <span slot="ariaLabel.bib.close">Close calendar</span>
 *   <span slot="bib.fullscreen.headline">Choose a date</span>
 * </auro-datepicker>
 * ```
 * @summary An accessible date field with a calendar, date ranges, blackout dates, validation, and localization.
 * @customElement auro-datepicker
 *
 * @slot helpText - Help text shown below the datepicker, such as the date format to use. An error message replaces it while the datepicker is invalid. {@category ui}
 * @slot ariaLabel.bib.close - Text read by screen readers for the close button in the fullscreen calendar, for example "Close calendar". It has no default, so without it the button has no accessible name. {@requiredWhen always} {@category a11y}
 * @slot ariaLabel.input.clear - Text read by screen readers for the clear button, for example "Clear dates". Defaults to "Clear input field", or a Spanish translation when the datepicker has `lang="es"`. {@category a11y}
 * @slot bib.fullscreen.headline - Headline shown at the top of the fullscreen calendar, such as "Choose travel dates". {@requiredWhen always} {@category ui}
 * @slot bib.fullscreen.dateLabel - Deprecated: Use `bib.fullscreen.fromLabel` instead. Label shown above the start date in the fullscreen calendar. {@category ui}
 * @slot bib.fullscreen.fromLabel - Label shown above the start date in the fullscreen calendar, such as "Departure". {@category ui}
 * @slot bib.fullscreen.toLabel - Label shown above the end date in the fullscreen calendar of a range, such as "Return". {@relevantWhen range} {@category ui}
 * @slot label - Label for the whole datepicker in the `snowflake` layout, such as "Travel dates". The `classic` layout doesn't show it. {@category ui}
 * @slot toLabel - Label for the end date input of a range, such as "Return date". {@relevantWhen range} {@requiredWhen range} {@category ui}
 * @slot fromLabel - Label for the start date input, or the only input, such as "Departure date". Also gives the calendar dialog its accessible name. {@requiredWhen always} {@category ui}
 * @slot optionalFromLabel - Text shown after the start date input's label when `required` isn't set, in place of "(optional)", such as a translation. {@relevantWhen !required} {@category ui}
 * @slot optionalToLabel - Text shown after the end date input's label when `range` is set and `required` isn't, in place of "(optional)", such as a translation. {@relevantWhen range} {@category ui}
 * @slot date_YYYY_MM_DD - Content shown under the day number in the calendar for one date, such as a price. Replace `YYYY_MM_DD` with the date, as in `date_2025_04_21`, and add the `highlight` attribute to show the text in the success color. {@category ui}
 * @slot popover_YYYY_MM_DD - Content shown in a popover when someone points to a date in the calendar or moves to it with the keyboard, such as seat availability. Replace `YYYY_MM_DD` with the date, as in `popover_2025_04_21`. Screen readers read it with the date. {@category ui}
 * @csspart dropdown - The dropdown that holds the trigger, the calendar, and the help text.
 * @csspart trigger - The `<div>` in the dropdown's trigger that holds the calendar icon, the inputs, and the clear button.
 * @csspart wrapper - The `<div>` inside `trigger` that lays out the calendar icon, the inputs, and the clear button or error icon.
 * @csspart mainLabel - The `<label>` that holds the `label` slot, rendered only when `layout="snowflake"`.
 * @csspart inputSection - The `<div>` that holds the date inputs.
 * @csspart accentIcon - The calendar icon shown before the inputs in the `snowflake` layout. The `classic` layout hides it and shows the start date input's own calendar icon instead.
 * @csspart input - Each date input: one, or two when `range` is set.
 * @csspart calendarWrapper - The `<div>` in the dropdown that holds the calendar.
 * @csspart calendar - The calendar shown in the dropdown.
 * @csspart helpTextSpan - The `<div>` that holds the help text or error message.
 * @csspart helpText - The `<p>` that holds the help text or error message.
 * @event auroDatePicker-toggled - Notifies that the calendar dropdown opened or closed, with `event.detail.expanded` set to `true` when it opened.
 * @event auroDatePicker-monthChanged - Notifies that the calendar moved to a different month, such as when someone selects the next month button.
 * @event auroFormElement-validated - Notifies each time the datepicker validates, with the result in `event.detail.validity` and `event.detail.message`.
 * @event auroDatePicker-newSlotContent - Notifies the calendar's day cells to copy their `date_YYYY_MM_DD` and `popover_YYYY_MM_DD` slot content again, such as after `blackoutDates` or `referenceDates` changes. The datepicker doesn't currently fire it on its own when slot content is added.
 * @event input - Notifies that the datepicker's value has changed.
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

    /**
     * @private
     */
    this.util = new AuroDatepickerUtilities();

    /**
     * @private
     */
    this.calendarRenderUtil = new UtilitiesCalendarRender();

    /**
     *  @private
     */
    this.domHandler = new DomHandler();

    // If `calendarStartDate` is set, use that as the central date. Otherwise, use the current date.
    this.calendarRenderUtil.updateCentralDate(this, this.calendarStartDateObject ?? new Date());

    /** @type {'default' | 'inverse'} */
    this.appearance = "default";
    this.touched = false;
    this.disabled = false;
    this.dvInputOnly = false;
    this.required = false;
    this.onDark = false;
    this.range = false;
    this.rangeLabelStart = 'range start';
    this.rangeLabelEnd = 'range end';
    this.rangeLabelBeforeRange = 'before range';
    this.rangeLabelInRange = 'in range';
    this.rangeLabelAfterRange = 'after range';
    this.rangeLabelEndPreview = 'previewing range end';

    /** @type {string[]} */
    this.blackoutDates = [];
    this.blackoutLabel = 'unavailable';
    this.navLabelPrevMonth = 'Previous month';
    this.navLabelNextMonth = 'Next month';
    this.calendarGridLabel = 'Calendar days of the month';
    this.stacked = false;
    this.noValidate = false;
    this.validity = undefined;
    this.value = undefined;
    this.valueEnd = undefined;
    this.calendarStartDate = undefined;
    this.calendarEndDate = undefined;
    this.calendarFocusDate = this.value;

    /** @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'} */
    this.fullscreenBreakpoint = 'sm';
    this._validLocale = 'en-US';
    // floaterConfig
    /** @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'} */
    this.placement = 'bottom-start';
    this.offset = 0;
    this.noFlip = false;
    this.shift = false;
    this.autoPlacement = false;

    this.largeFullscreenHeadline = false;

    /**
     * @private
     * @type {HTMLElement[]}
     */
    this.dateSlotContent = [];

    /**
     * @private
     */
    this.hasDisplayValueContent = true;

    /**
     * @private
     */
    this.hasFocus = false;

    /**
     * @private
     */
    this.hasValue = false;

    /**
     * @private
     */
    this.hasAllValues = false;

    /**
     * @private
     */
    this.validation = new AuroFormValidation();

    /**
     * @private
     */
    this.runtimeUtils = new AuroLibraryRuntimeUtils();

    /**
     * @private
     */
    this.forceScrollOnNextMobileCalendarRender = false;

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();

    /**
     * @private
     */
    this.dropdownTag = versioning.generateTag('auro-formkit-datepicker-dropdown', formkitVersion, AuroDropdown);

    /**
     * @private
     */
    this.buttonTag = versioning.generateTag('auro-formkit-datepicker-button', buttonVersion, AuroButton);

    /**
     * @private
     */
    this.iconTag = versioning.generateTag('auro-formkit-input-icon', iconVersion, AuroIcon);

    /**
     * @private
     */
    this.inputTag = versioning.generateTag('auro-formkit-datepicker-input', formkitVersion, AuroInput);

    /**
     * @private
     */
    this.helpTextTag = versioning.generateTag('auro-formkit-input-helptext', formkitVersion, AuroHelpText);

    /**
     * @private
     */
    this.handleClick = this.handleClick.bind(this);

    /**
     * Single AbortController shared by every listener registered in the
     * configure* methods. Lets disconnectedCallback tear all of them down
     * with one abort() call.
     *
     * The genuine leak risk is the listeners attached to children that can
     * outlive the host if they get reparented: `this.dropdown`,
     * `this.calendar`, and the inputs inside the dropdown's slot.
     * Listeners attached to `this` (for example, focusin/focusout on the host)
     * form a self-contained reference graph that the GC can collect with
     * the host anyway, but they share the same signal so the cleanup
     * pattern stays uniform across all configure* sites.
     * @private
     */
    this._listenerAbortController = new AbortController();

    /**
     * @private
     */
    this.handleClearClick = this.handleClearClick.bind(this);

    this.initializeArchitectureDefaults();
  }

  // Defaults for the inherited layout/shape/size architecture props are set in a
  // helper (not the constructor body) so the CEM analyzer keeps their `@type`
  // unions instead of inferring `string` from a constructor-literal assignment.
  // See AlaskaAirlines/discussions#653.
  initializeArchitectureDefaults() {
    this.layout = 'classic';
    this.shape = 'classic';
    this.size = 'lg';
  }

  // This function is to define props used within the scope of this component
  // Be sure to review  https://lit-element.polymer-project.org/guide/properties#reflected-attributes
  // to understand how to use reflected attributes with your property settings.
  static get properties() {
    return {
      // ...super.properties,

      /**
       * Sets the datepicker's colors for the background it sits on. Use `inverse` on dark backgrounds and `default` on light ones.
       * @type {'default' | 'inverse'}
       * @default 'default'
       * @category ui
       */
      appearance: {
        type: String,
        reflect: true
      },

      /**
       * Deprecated: Use `placement` instead.
       * Places the calendar dropdown on whichever side of the input has the most space. The dropdown already flips to the opposite side when it doesn't fit, unless `noFlip` is set.
       * @deprecated Use `placement` instead.
       * @category ui
       */
      autoPlacement: {
        type: Boolean,
        attribute: "autoplacement",
        reflect: true
      },

      /**
       * Sets dates people can't select, such as sold-out days, as ISO date strings (`YYYY-MM-DD`). These dates look unavailable in the calendar, and typing one in fails validation with `customError`.
       * To change the list, assign a new array, such as `el.blackoutDates = [...el.blackoutDates, '2024-12-25']`, because the datepicker doesn't notice changes made in place, such as `push()`.
       * @type {string[]}
       * @category behavior
       */
      blackoutDates: {
        type: Array,
        attribute: 'blackoutdates',
        reflect: true
      },

      /**
       * Sets the text screen readers add to blackout dates, the dates in `blackoutDates`. Set it to explain why people can't choose those dates, such as `sold out`.
       * @default 'unavailable'
       * @category a11y
       */
      blackoutLabel: {
        type: String,
        attribute: 'blackoutlabel',
        reflect: true
      },

      /**
       * Sets the last month the calendar can show, as an ISO date string such as `2025-12-31`. People can't move past that month, but unlike `maxDate`, it doesn't turn off any dates.
       * @category behavior
       */
      calendarEndDate: {
        type: String,
        attribute: 'calendarenddate',
        reflect: true
      },

      /**
       * Sets the name screen readers announce for the calendar's grid of days. Set it to translate the default.
       * @default 'Calendar days of the month'
       * @category a11y
       */
      calendarGridLabel: {
        type: String,
        attribute: 'calendargridlabel',
        reflect: true
      },

      /**
       * Sets the date whose month the calendar shows when it opens, such as `2025-12-01`. It takes priority over `value` for the month shown. When not set, the datepicker sets it to the first valid `value`, or to `minDate`.
       * @category behavior
       */
      calendarFocusDate: {
        type: String,
        attribute: 'calendarfocusdate',
        reflect: true
      },

      /**
       * Sets the first month the calendar can show, as an ISO date string such as `2025-01-01`. People can't move before that month, and the fullscreen calendar starts there, but unlike `minDate`, it doesn't turn off any dates.
       * @category behavior
       */
      calendarStartDate: {
        type: String,
        attribute: 'calendarstartdate',
        reflect: true
      },

      /**
       * Sets the date whose month the calendar shows, such as `2025-04-01`. When the calendar opens, it moves to the month of `calendarFocusDate` or `value` instead, if either is set.
       * @category behavior
       */
      centralDate: {
        type: String,
        attribute: 'centraldate'
      },

      /**
       * Turns the datepicker off. A disabled datepicker is shown in a muted style, people can't type a date or open the calendar, and keyboard users can't tab to it.
       * @category ui
       */
      disabled: {
        type: Boolean,
        reflect: true
      },

      /**
       * Hides the `label` slot while the display value shows in place of the date inputs, which is when every date is filled in and the datepicker doesn't have focus. Only affects the `snowflake` layout. Without it, the label stays visible above the display value.
       * @category ui
       */
      dvInputOnly: {
        type: Boolean,
        attribute: 'dvinputonly',
        reflect: true
      },

      /**
       * Shows an error state with this text as the error message, such as "Choose a later date", unless `setCustomValidity` or `setCustomValidityCustomError` is set. While `error` is set, `validity` stays `customError`.
       * @category behavior
       */
      error: {
        type: String,
        reflect: true
      },

      /**
       * Sets the order and separators of the typed date, such as `mm/dd/yyyy` or `dd.mm.yyyy`. When not set, the format comes from `locale`, such as `mm/dd/yyyy` for `en-US`.
       * @category behavior
       */
      format: {
        type: String,
        reflect: true
      },

      /**
       * Sets the language and region for the date format and the calendar's month and weekday names, such as `en-US` or `fr-FR`. When not set, the datepicker uses the `data-locale` attribute of the nearest ancestor that has one, or `en-US`. An unsupported value falls back to `en-US`.
       * @category behavior
       */
      locale: {
        type: String,
        reflect: true
      },

      /**
       * Sets the largest screen size at which the calendar opens fullscreen instead of in a dropdown, such as `sm`. Use `disabled` to never open it fullscreen.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabled'}
       * @default 'sm'
       * @category ui
       */
      fullscreenBreakpoint: {
        type: String,
        attribute: "fullscreenbreakpoint",
        reflect: true
      },

      /**
       * @private
       */
      hasAllValues: {
        type: Boolean,
        attribute: false,
        reflect: false
      },

      hasFocus: {
        type: Boolean,
        attribute: false,
        reflect: false,
      },

      /**
       * @private
       */
      hasValue: {
        type: Boolean,
        attribute: false,
        reflect: false,
      },

      /**
       * Sets which on-screen keyboard phones and tablets show when someone types a date, such as `numeric` for a number pad (the input's `inputmode`). In a range, it applies only to the start date input.
       * @type {'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'}
       * @category behavior
       */
      inputmode: {
        type: String,
        attribute: true,
        reflect: true
      },

      /**
       * Shows the fullscreen calendar's headline in a larger heading style.
       * @category ui
       */
      largeFullscreenHeadline: {
        type: Boolean,
        attribute: 'largefullscreenheadline',
        reflect: true
      },

      /**
       * Sets the datepicker's layout. Use `classic` (the default) for a standard date field, and `snowflake` only on dark backgrounds with `appearance="inverse"`. The `snowflake` layout shows one label for the whole datepicker, from the `label` slot, and shows chosen dates as short text, such as "Apr 21".
       * @type {'classic' | 'snowflake'}
       * @default 'classic'
       * @category ui
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      /**
       * Sets the shape of the datepicker.
       * @type {'box' | 'classic' | 'pill' | 'pill-left' | 'pill-right' | 'rounded' | 'snowflake'}
       * @default 'classic'
       * @category ui
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Sets the size of the datepicker.
       * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
       * @default 'lg'
       * @category ui
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Sets the latest date people can choose, as an ISO date string such as `2025-12-31`. Later dates are turned off in the calendar, a typed later date fails validation with `rangeOverflow`, and setting it clears the chosen dates when the start date is later.
       * @category behavior
       */
      maxDate: {
        type: String,
        attribute: 'maxdate',
        reflect: true
      },

      /**
       * Sets the earliest date people can choose, as an ISO date string such as `2025-01-01`. Earlier dates are turned off in the calendar, a typed earlier date fails validation with `rangeUnderflow`, and setting it clears the chosen dates when the start date is earlier.
       * @category behavior
       */
      minDate: {
        type: String,
        attribute: 'mindate',
        reflect: true
      },

      /**
       * Doesn't currently do anything. The calendar's month heading shows the month before the year whenever `format` puts `mm` before `yyyy`.
       * @category ui
       */
      monthFirst: {
        type: Boolean,
        attribute: 'monthfirst'
      },

      /**
       * Sets the 12 month names shown in the calendar, from January to December, such as abbreviated or translated names. When not set, the names come from `locale`.
       * @type {string[]}
       * @category ui
       */
      monthNames: {
        type: Array,
        attribute: 'monthnames'
      },

      /**
       * Sets the name screen readers announce for the next month button. Set it to translate the default.
       * @default 'Next month'
       * @category a11y
       */
      navLabelNextMonth: {
        type: String,
        attribute: 'navlabelnextmonth',
        reflect: true
      },

      /**
       * Sets the name screen readers announce for the previous month button. Set it to translate the default.
       * @default 'Previous month'
       * @category a11y
       */
      navLabelPrevMonth: {
        type: String,
        attribute: 'navlabelprevmonth',
        reflect: true
      },

      /**
       * Keeps the calendar dropdown in the `placement` position even when there isn't room for it there. By default, the dropdown flips to the opposite side when it doesn't fit.
       * @category ui
       */
      noFlip: {
        type: Boolean,
        attribute: 'noflip',
        reflect: true
      },

      /**
       * Turns off the automatic validation that runs when focus leaves the datepicker. Changing the end date of a range or `blackoutDates` still validates it.
       * @category behavior
       */
      noValidate: {
        type: Boolean,
        attribute: 'novalidate',
        reflect: true
      },

      /**
       * Sets the space, in pixels, between the input and the calendar dropdown.
       * @default 0
       * @category ui
       */
      offset: {
        type: Number,
        reflect: true
      },

      /**
       * Deprecated: Use `appearance="inverse"` instead.
       * Switches the datepicker to colors designed for dark backgrounds.
       * @deprecated Use `appearance="inverse"` instead.
       * @category ui
       */
      onDark: {
        type: Boolean,
        attribute: 'ondark',
        reflect: true
      },

      /**
       * Sets the hint text shown in an empty input, such as `MM/DD/YYYY`. When not set, the input shows the date format in capital letters. In a range, the end date input uses it too, unless `placeholderEndDate` is set.
       * @category ui
       */
      placeholder: {
        type: String,
        reflect: true
      },

      /**
       * Sets the hint text shown in the end date input of a range when it's empty. When not set, the end date input uses `placeholder`.
       * @relevantWhen range
       * @category ui
       */
      placeholderEndDate: {
        type: String,
        attribute: 'placeholderenddate',
        reflect: true
      },

      /**
       * Sets where the calendar dropdown opens relative to the input, such as `bottom-start` (below the input, lined up with its start edge). The dropdown still flips to the opposite side when it doesn't fit, unless `noFlip` is set.
       * @type {'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-end' | 'left-start' | 'left-end'}
       * @default 'bottom-start'
       * @category ui
       */
      placement: {
        type: String,
        reflect: true
      },

      /**
       * Lets people choose a start date and an end date. Adds a second input for the end date, and on larger screens the calendar shows two months side by side.
       * @category behavior
       */
      range: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets the text screen readers add to dates after the end of a chosen range. While someone is still choosing the end date, later dates use `rangeLabelEndPreview` instead.
       * @relevantWhen range
       * @default 'after range'
       * @category a11y
       */
      rangeLabelAfterRange: {
        type: String,
        attribute: 'rangelabelafterrange',
        reflect: true
      },

      /**
       * Sets the text screen readers add to dates before the start of a range.
       * @relevantWhen range
       * @default 'before range'
       * @category a11y
       */
      rangeLabelBeforeRange: {
        type: String,
        attribute: 'rangelabelbeforerange',
        reflect: true
      },

      /**
       * Sets the text screen readers add to the end date of a range.
       * @relevantWhen range
       * @default 'range end'
       * @category a11y
       */
      rangeLabelEnd: {
        type: String,
        attribute: 'rangelabelend',
        reflect: true
      },

      /**
       * Sets the text screen readers add to a date after the start date while someone is choosing the end date of a range. It tells screen reader users that pressing Enter makes that date the end of the range.
       * @relevantWhen range
       * @default 'previewing range end'
       * @category a11y
       */
      rangeLabelEndPreview: {
        type: String,
        attribute: 'rangelabelendpreview',
        reflect: true
      },

      /**
       * Sets the text screen readers add to dates inside a chosen range.
       * @relevantWhen range
       * @default 'in range'
       * @category a11y
       */
      rangeLabelInRange: {
        type: String,
        attribute: 'rangelabelinrange',
        reflect: true
      },

      /**
       * Sets the text screen readers add to the start date of a range.
       * @relevantWhen range
       * @default 'range start'
       * @category a11y
       */
      rangeLabelStart: {
        type: String,
        attribute: 'rangelabelstart',
        reflect: true
      },

      /**
       * Sets dates to mark in the calendar for comparison, such as the dates of an earlier trip, as an array of ISO date strings (`YYYY-MM-DD`). Marked dates get an outline. Add `popover_YYYY_MM_DD` content to explain why each date is marked.
       * @type {string[]}
       * @category ui
       */
      referenceDates: {
        type: Array,
        attribute: 'referencedates',
        reflect: true
      },

      /**
       * Makes a date required. When it's empty, validation fails with `valueMissing`, and in a range, both dates are required. When not set, each input's label shows "(optional)".
       * @relevantWhen !noValidate
       * @category behavior
       */
      required: {
        type: Boolean,
        reflect: true
      },

      /**
       * Sets one error message for every kind of validation error except a blackout date, in place of the built-in messages and the other `setCustomValidity` messages. For a blackout date, use `setCustomValidityCustomError`.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidity: {
        type: String,
        attribute: 'setcustomvalidity'
      },

      /**
       * Sets the error message shown when `validity` is `customError`, in place of the `error` text. It also replaces the "Selected date is unavailable" message shown when someone types a blackout date.
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityCustomError: {
        type: String,
        attribute: 'setcustomvaliditycustomerror'
      },

      /**
       * Sets the error message shown when the date is later than `maxDate` (`rangeOverflow`).
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityRangeOverflow: {
        type: String,
        attribute: 'setcustomvalidityrangeoverflow'
      },

      /**
       * Sets the error message shown when the date is earlier than `minDate` (`rangeUnderflow`).
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityRangeUnderflow: {
        type: String,
        attribute: 'setcustomvalidityrangeunderflow'
      },

      /**
       * Sets the error message shown when `required` is set and no date is chosen (`valueMissing`).
       * @relevantWhen !noValidate
       * @category behavior
       */
      setCustomValidityValueMissing: {
        type: String,
        attribute: 'setcustomvalidityvaluemissing'
      },

      /**
       * Moves the calendar dropdown along the input's edge so the edge of the screen doesn't cut it off.
       * @category ui
       */
      shift: {
        type: Boolean,
        reflect: true
      },

      /**
       * Doesn't currently change the datepicker's appearance or behavior.
       * @category ui
       */
      stacked: {
        type: Boolean,
        reflect: true
      },

      /**
       * Indicates whether the datepicker is in a dirty state (has been interacted with).
       * @private
       */
      touched: {
        type: Boolean,
        reflect: true,
        attribute: false
      },

      /**
       * Reports the datepicker's current validation state, such as `valid`, `valueMissing`, `rangeOverflow`, or `customError`. The datepicker sets it when it validates, so read it instead of setting it.
       * @category behavior
       */
      validity: {
        type: String,
        reflect: true
      },

      /**
       * Sets the chosen date, or the start date of a range, as an ISO date string such as `2025-04-21`.
       * @category behavior
       */
      value: {
        type: String
      },

      /**
       * Sets the end date of a range, as an ISO date string such as `2025-04-28`. When it's earlier than `value`, the datepicker clears it.
       * @relevantWhen range
       * @category behavior
       */
      valueEnd: {
        type: String,
        attribute: 'valueend'
      }
    };
  }

  static get styles() {
    return [
      styleCss,
      colorCss,
      tokensCss,

      // layout util
      shapeSizeCss,

      // layouts
      classicLayoutStyle,
      classicLayoutColor,
      snowflakeStyle,
      snowflakeColors
    ];
  }

  /**
   * Registers the element with the browser under a tag name.
   * @param {string} [name="auro-datepicker"] - The tag name to register the element under.
   *
   * @example
   * AuroDatePicker.register("custom-datepicker") // registers the element as <custom-datepicker>
   *
   */
  static register(name = "auro-datepicker") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroDatePicker);
  }

  /**
   * Gets the chosen dates as an array: `[value, valueEnd]` when a range has both dates, `[value]` when only a start date is set, or `[]` when no date is set.
   * @returns {string[]} The chosen dates, as ISO date strings.
   * @category behavior
   */
  get values() {
    // If range, and both populated, return both values in an array
    // - NOTE: both are required here, so we don't have something like `['10/22/25', undefined]`
    if (this.range && this.value && this.valueEnd) {
      return [
        this.value,
        this.valueEnd
      ];
    }

    // This if block catches instances where `value` is present, no matter if valueEnd is selected yet
    if (this.value) {
      return [this.value];
    }

    return [];
  }

  /**
   * Checks whether the `snowflake` layout's main label is visually hidden.
   * @returns {boolean} True if the label is hidden; false otherwise.
   * @private
   */
  get labelHidden() {
    return this.hasDisplayValueContent && this.dvInputOnly && !this.hasFocus && this.hasAllValues;
  }

  /**
   * Checks whether the display value container is visually hidden.
   * @returns {boolean} True if the display value is hidden; false otherwise.
   * @private
   */
  get dvHidden() {
    return !this.hasDisplayValueContent || this.hasFocus || !this.hasAllValues;
  }

  /**
   * Gets the input font class for the current layout and state.
   * @private
   * @returns {string} The font class for the input.
   */
  get displayValueFontClass() {
    if (this.layout.startsWith('emphasized')) {
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
      // same for both hidden and visible
      return 'body-lg';
    }

    // edge case for enabling visual overrides in datepicker
    if (this.layout === 'classic' && this.shape === 'snowflake') {
      return 'body-lg';
    }

    // classic layout (default) - same for both hidden and visible
    return 'body-default';
  }

  /**
   * Gets the classes shared by every display value wrapper.
   * @private
   * @returns {Object} The class map for Lit's `classMap` directive.
   */
  get commonDisplayValueWrapperClasses() {
    return {
      'displayValueWrapper': true,
      'util_displayHiddenVisually': this.dvHidden,
      [this.displayValueFontClass]: true,
    };
  }

  /**
   * Checks whether the `displayValue` slot has content to render.
   * @private
   * @returns {void}
   */
  checkDisplayValueSlotChange() {
    let nodes = this.shadowRoot.querySelector('slot[name="displayValue"]').assignedNodes();

    // Handle when DisplayValue is multi-level slot content (e.g. combobox passing displayValue to input)
    if (nodes && nodes[0] && nodes[0].tagName === 'SLOT') {
      nodes = nodes[0].assignedNodes();
    }

    let hasContent = false;

    if (nodes.length > 0) {
      hasContent = true;
    }

    this.hasDisplayValueContent = hasContent;
  }

  /**
   * Moves the calendar view to `calendarFocusDate` when it changes.
   * @private
   * @returns {void}
   */
  handleFocusDateChange() {
    if (this.calendarFocusDate && dateFormatter.isValidDate(this.calendarFocusDate)) {
      this.calendarRenderUtil.updateCentralDate(this, this.calendarFocusDateObject);

      this.forceScrollOnNextMobileCalendarRender = true;
    }
  }

  /**
   * @private
   * @param {Number} length - The number of characters in the returned random string.
   * @returns {string}
   */
  generateRandomString(length) {
    return Math.random().toString(36).substring(2, length + 2);
  }

  /**
   * Moves keyboard focus to the start date input, or to the end date input of a range.
   * @param {String} [focusInput=''] - The input to focus. Use `endDate` for the end date input of a range, or leave it out for the start date input.
   * @returns {void}
   */
  focus(focusInput = '') {
    this.hasFocus = true;
    this.range && focusInput === 'endDate' ? this.inputList[1].focus() : this.inputList[0].focus();
  }

  /**
   * Converts a date to the Unix timestamp, in seconds, that the vendored range datepicker uses.
   * @private
   * @param {Date} date - The date to convert.
   * @returns {Number} The Unix timestamp, in seconds.
   */
  convertToWcValidTime(date) {
    return date?.getTime() / 1000;
  }

  // ─── Read-only *Object properties ─────────────────────────────────────────

  /**
   * Gets `value` as a `Date` object, or `undefined` when `value` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get valueObject() {
    return this.value && dateFormatter.isValidDate(this.value) ? dateFormatter.stringToDateInstance(this.value) : undefined;
  }

  /**
   * Gets `valueEnd` as a `Date` object, or `undefined` when `valueEnd` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get valueEndObject() {
    return this.valueEnd && dateFormatter.isValidDate(this.valueEnd) ? dateFormatter.stringToDateInstance(this.valueEnd) : undefined;
  }

  /**
   * Gets `minDate` as a `Date` object, or `undefined` when `minDate` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get minDateObject() {
    return this.minDate && dateFormatter.isValidDate(this.minDate) ? dateFormatter.stringToDateInstance(this.minDate) : undefined;
  }

  /**
   * Gets `maxDate` as a `Date` object, or `undefined` when `maxDate` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get maxDateObject() {
    return this.maxDate && dateFormatter.isValidDate(this.maxDate) ? dateFormatter.stringToDateInstance(this.maxDate) : undefined;
  }

  /**
   * Gets `calendarStartDate` as a `Date` object, or `undefined` when `calendarStartDate` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get calendarStartDateObject() {
    return this.calendarStartDate && dateFormatter.isValidDate(this.calendarStartDate) ? dateFormatter.stringToDateInstance(this.calendarStartDate) : undefined;
  }

  /**
   * Gets `calendarEndDate` as a `Date` object, or `undefined` when `calendarEndDate` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get calendarEndDateObject() {
    return this.calendarEndDate && dateFormatter.isValidDate(this.calendarEndDate) ? dateFormatter.stringToDateInstance(this.calendarEndDate) : undefined;
  }

  /**
   * Gets `centralDate` as a `Date` object, or `undefined` when `centralDate` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get centralDateObject() {
    return this.centralDate && dateFormatter.isValidDate(this.centralDate) ? dateFormatter.stringToDateInstance(this.centralDate) : undefined;
  }

  /**
   * Gets `calendarFocusDate` as a `Date` object, or `undefined` when `calendarFocusDate` is empty or isn't a valid date.
   * @returns {Date|undefined}
   * @category behavior
   */
  get calendarFocusDateObject() {
    return this.calendarFocusDate && dateFormatter.isValidDate(this.calendarFocusDate) ? dateFormatter.stringToDateInstance(this.calendarFocusDate) : undefined;
  }

  // ─── Vendor calendar time conversions ─────────────────────────────────────

  /**
   * Converts a Unix timestamp (seconds) from the vendored range-datepicker
   * (`src/vendor/wc-range-datepicker/day.js`) to an ISO date string.
   *
   * Timezone contract:
   * - INPUT: `time` is assumed to be the seconds-since-epoch of **local
   *   midnight** for the intended calendar day. The vendor's Day constructor
   *   builds it via `date-fns format(date, 't')` from a locally-constructed
   *   Date, so this assumption currently holds end-to-end.
   * - OUTPUT: `dateFormatter.toISOFormatString` reads the Date's local
   *   getFullYear/getMonth/getDate components, so the returned YYYY-MM-DD
   *   string matches the local calendar day.
   *
   * If the vendor ever switches to emitting UTC-midnight timestamps, this
   * conversion will silently shift the returned date by one day in zones
   * west of UTC. Any vendor swap should re-verify this contract; the TZ
   * regression suite (`npm run test:hst`, UTC-10) will catch the symptom.
   *
   * @private
   * @param {number} time - The Unix timestamp, in seconds, of local midnight on the day.
   * @returns {string} The ISO date string (`YYYY-MM-DD`) for the local calendar day.
   */
  convertWcTimeToDate(time) {
    return dateFormatter.toISOFormatString(new Date(time * 1000));
  }

  /**
   * Dispatches the `input` event to notify that the value changed.
   * @private
   * @returns {void}
   */
  notifyValueChanged() {
    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: this.value,
    }));
  }

  /**
   * Passes a valid `centralDate` to the calendar so it shows that month.
   * @private
   * @returns {void}
   */
  handleCentralDateChange() {
    if (this.centralDateObject) {
      this.calendar.centralDate = this.centralDate;
    }
  }

  /**
   * Dispatches `auroDatePicker-toggled` when the calendar opens or closes.
   * @private
   * @returns {void}
   */
  notifyDatepickerToggled() {
    this.dispatchEvent(new CustomEvent('auroDatePicker-toggled', {
      bubbles: true,
      composed: true,
      detail: {
        expanded: this.dropdown.isPopoverVisible,
      },
    }));
  }

  /**
   * Dispatches `auroDatePicker-monthChanged` when the calendar's visible month changes.
   * @param {Object} event - The `auroCalendar-centralDateChanged` event from the calendar.
   * @private
   * @returns {void}
   */
  notifyMonthChanged(event) {
    this.dispatchEvent(new CustomEvent('auroDatePicker-monthChanged', {
      bubbles: true,
      composed: true,
      detail: {
        month: event.detail.month,
        year: event.detail.year,
        numCalendars: event.detail.numCalendars,
      },
    }));
  }

  /**
   * Attempts to focus the active calendar cell using a rAF retry loop.
   * Shared by both fullscreen and desktop open paths.
   * @private
   * @returns {void}
   */
  focusActiveCellWhenReady() {
    const MAX_ATTEMPTS = 20;
    let attempts = 0;

    const tryFocus = () => {
      attempts += 1;
      const allCells = this.calendar.getAllFocusableCells();

      if (!allCells.length && attempts < MAX_ATTEMPTS) {
        requestAnimationFrame(tryFocus);
        return;
      }

      // Compute and mark the active cell
      if (this.calendar.activeCellDate === null || this.calendar.activeCellDate === undefined) {
        this.calendar.activeCellDate = this.calendar.computeActiveDate();
      }
      if (this.calendar.activeCellDate !== undefined) {
        this.calendar.setActiveCell(this.calendar.activeCellDate);
      }

      // If no cell matched (e.g. centralDate month differs from the rendered
      // range on mobile), fall back to the first rendered enabled cell.
      let activeCell = allCells.find((cell) => cell.active);
      if (!activeCell && allCells.length) {
        const [fallback] = allCells;
        if (fallback.day) {
          this.calendar.activeCellDate = fallback.day.date;
          this.calendar.setActiveCell(this.calendar.activeCellDate);
          activeCell = allCells.find((cell) => cell.active);
        }
      }

      // Focus the calendar grid wrapper. The live region (announced just
      // below) handles the SR announcement for the active cell.
      if (activeCell) {
        this.calendar.focusActiveCell();

        // Announce the initial active cell via the live region.
        // Delay the announcement so it arrives after VoiceOver finishes
        // speaking the focus-change announcement for the grid wrapper.
        // Without this delay, VoiceOver drops the live region update
        // because it's already mid-announcement from the focus move.
        const announcement = this.calendar.buildFocusAnnouncement(activeCell.day.date);
        setTimeout(() => {
          this.calendar.announceSelection(announcement);
        }, 500);

        // On mobile fullscreen — or when an explicit focusDate change has
        // requested a forced scroll on the next render — scroll the active
        // cell into view. Doing this here (after activeCellDate has been
        // resolved by the rAF loop above) prevents a no-op scroll that
        // would happen if we tried to scroll before the cell was set.
        if (this.dropdown.isBibFullscreen || this.forceScrollOnNextMobileCalendarRender) {
          this.calendar.scrollToActiveCell();
          this.forceScrollOnNextMobileCalendarRender = false;
        }
      } else if (attempts < MAX_ATTEMPTS) {
        requestAnimationFrame(tryFocus);
      }
    };

    requestAnimationFrame(tryFocus);
  }

  /**
   * Binds all behavior needed to the dropdown after rendering.
   * @private
   * @returns {void}
   */
  configureDropdown() {
    this.dropdown = this.shadowRoot.querySelector(this.dropdownTag._$litStatic$);

    // The datepicker manages its own open/close lifecycle (Space/Escape/date-select/done).
    // Prevent the floater's document-level focusin handler from closing the bib
    // when focus moves from the trigger into the calendar cells (which live inside
    // a top-layer popover where :focus-within on the dropdown host returns false).
    this.dropdown.noHideOnThisFocusLoss = true;

    // Pass label text to the dropdown bib for accessible dialog naming.
    // Without this, the fullscreen <dialog> has no accessible name and
    // screen readers announce it as just "dialog" with no context.
    const labelElement = this.querySelector('[slot="fromLabel"]');
    if (labelElement) {
      this.dropdown.bibDialogLabel = labelElement.textContent.trim() || undefined;
    }

    const { signal } = this._listenerAbortController;

    this.dropdown.addEventListener('auroDropdown-triggerClick', () => {
      if (!this.isPopoverVisible) {
        this.dropdown.show();
      }
    }, { signal });

    this.dropdown.addEventListener('auroDropdown-toggled', () => {
      this.notifyDatepickerToggled();

      if (this.dropdown.isPopoverVisible) {
        // Reset calendar focus state so it recomputes from the current selection.
        // Without this, reopening after navigating to a month without a selected
        // date leaves activeCellDate pointing at a cell in a different month than
        // what centralDate renders, causing all cells to have tabindex="-1".
        this.calendar.activeCellDate = null;

        // On open, reset the visible month to a predictable source rather than
        // whichever month the user last navigated to. Route through updateCentralDate
        // so centralDate stays first-of-month.
        // Priority: calendarFocusDate (when valid) -> value (when set) -> today (when neither is set).
        // Respect consumer-provided centralDate/calendarStartDate/minDate when neither calendarFocusDate nor value is set.
        if (this.calendarFocusDate && dateFormatter.isValidDate(this.calendarFocusDate)) {
          this.calendarRenderUtil.updateCentralDate(this, this.calendarFocusDateObject);
        } else if (this.valueObject) {
          this.calendarRenderUtil.updateCentralDate(this, this.value);
        } else if (!this.centralDate && !this.calendarStartDate && !this.minDate) {
          this.calendarRenderUtil.updateCentralDate(this, new Date());
        }
      }

      // This forces the calendar to render when the dropdown is opened.
      // It is not rendered by default
      this.calendar.visible = this.dropdown.isPopoverVisible;

      if (this.dropdown.isPopoverVisible) {
        if (this.dropdown.isBibFullscreen) {
          // Hide the trigger from assistive technology so VoiceOver cannot
          // reach it behind the fullscreen dialog.
          // Set this immediately (before updateComplete) so that the trigger
          // is already inert when the modal opens. noHideOnThisFocusLoss
          // prevents the floater from closing the bib when focus leaves.
          this.dropdown.trigger.inert = true;

          // The dropdown sets disableFocusTrap, so its own updated() lifecycle
          // opens the dialog as non-modal (dialog.setAttribute('open', '')).
          // Only showModal() promotes the dialog to the top layer and makes
          // background content inert — which is what prevents VoiceOver from
          // swiping to content behind the fullscreen calendar.
          //
          // We must wait for the dropdown's Lit update cycle to finish before
          // re-opening as modal. Both isPopoverVisible and isBibFullscreen
          // change in the same showBib() call; the dropdown's updated() handles
          // the isBibFullscreen change by closing and re-opening the dialog
          // as non-modal. Waiting for updateComplete ensures we act after that
          // cycle, so our close() + open(true) is the final state.
          this.dropdown.updateComplete.then(() => {
            const bibEl = this.dropdown.bibElement?.value;
            if (bibEl && this.dropdown.isPopoverVisible) {
              bibEl.close();
              bibEl.open(true);

              doubleRaf(() => {
                this.focusActiveCellWhenReady();
              });
            }
          });

          guardTouchPassthrough(this.shadowRoot.querySelector('.calendarWrapper'));
        } else {
          // Desktop (non-fullscreen) modal: make the trigger inert so users
          // cannot interact with the input while the modal bib is open.
          if (this.dropdown.desktopModal) {
            this.dropdown.trigger.inert = true;
          }

          // Desktop (non-fullscreen): focus the active calendar cell.
          this.dropdown.updateComplete.then(() => {
            this.focusActiveCellWhenReady();
          });
        }
      } else {
        // Always clear the inert flag. Only restore focus to the input when the datepicker
        // still has focus (e.g. Escape, date selected) — not when the user tabbed away,
        // which would pull them back and require extra Tab presses to escape.
        //
        // `_restoreFocusOnClose` is set by the Escape handler in
        // datepickerKeyboardStrategy.js to force restore even when hasFocus
        // has already been cleared — hidePopover() (desktop non-modal path)
        // can drop focus to <body> before this update fires.
        this.dropdown.trigger.inert = false;
        const shouldRestoreFocus = this.hasFocus || this._restoreFocusOnClose;
        this._restoreFocusOnClose = false;
        if (shouldRestoreFocus) {
          requestAnimationFrame(() => {
            if (!this.dropdown.isPopoverVisible) {
              this.inputList[0].focus();
            }
          });
        }
      }

      // Note: the forceScrollOnNextMobileCalendarRender scroll-into-view
      // happens inside focusActiveCellWhenReady() once activeCellDate has
      // been resolved by its rAF wait — not here in a setTimeout(0), which
      // fired before the active date was set and silently no-op'd.
    }, { signal });

    // Handle responsive strategy changes while the dropdown is open
    // (e.g. resizing from desktop → mobile or vice versa).
    // When the strategy changes to fullscreen, the dropdown's own updated()
    // will close and reopen the dialog as non-modal (because disableFocusTrap
    // is set). We wait for that cycle to complete via updateComplete, then
    // re-open as modal so showModal() promotes the dialog to the top layer
    // and makes background content inert for screen readers.
    this.dropdown.addEventListener('auroDropdown-strategy-change', () => {
      if (this.dropdown.isBibFullscreen && this.dropdown.isPopoverVisible) {
        this.dropdown.trigger.inert = true;
        this.dropdown.updateComplete.then(() => {
          const bibEl = this.dropdown.bibElement?.value;
          if (bibEl && this.dropdown.isPopoverVisible) {
            bibEl.close();
            bibEl.open(true);
          }

          // Re-render the calendar with the new fullscreen layout,
          // then restore focus after the re-render completes.
          this.calendar.isFullscreen = true;
          this.calendar.updateComplete.then(() => {
            doubleRaf(() => {
              this.focusActiveCellWhenReady();
            });
          });
        });
      } else if (!this.dropdown.isBibFullscreen) {
        // Switching from fullscreen to floating — only restore trigger accessibility
        // when the bib is closed or the desktop layout is not a modal. A desktopModal
        // dropdown keeps the trigger inert while open, matching the desktop-open path.
        if (!this.dropdown.isPopoverVisible || !this.dropdown.desktopModal) {
          this.dropdown.trigger.inert = false;
        }

        // Re-render the calendar with the desktop layout,
        // then restore focus after the re-render completes.
        this.dropdown.updateComplete.then(() => {
          this.calendar.isFullscreen = false;
          this.calendar.updateComplete.then(() => {
            doubleRaf(() => {
              this.focusActiveCellWhenReady();
            });
          });
        });
      }
    }, { signal });
  }

  /**
   * Binds all behavior needed to the input after rendering.
   * @private
   * @returns {void}
   */
  configureInput() {
    this.triggerInput = this.dropdown.querySelector('[slot="trigger"]');

    this.inputList = [...this.dropdown.querySelectorAll(this.inputTag._$litStatic$)];

    const { signal } = this._listenerAbortController;

    this.inputList.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        event.stopPropagation();

        if (index === 0) {
          this.value = input.value || undefined;
        } else if (index === 1) {
          this.valueEnd = input.value || undefined;
        }

        this.notifyValueChanged();
      }, { signal });

      input.addEventListener('auroFormElement-validated', (evt) => {
        // not to bubble up input's validated event.
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
      }, { signal });
    });
  }

  /**
   * Binds all behavior needed to the calendar after rendering.
   * @private
   * @returns {void}
   */
  configureCalendar() {
    this.calendar = this.shadowRoot.querySelector('auro-formkit-calendar');
    this.calendar.datepicker = this;
    this.calendar.dropdown = this.dropdown;

    const { signal } = this._listenerAbortController;

    this.calendar.addEventListener('auroCalendar-dateSelected', () => {
      // Compare the input's ISO value against the *converted* calendar
      // timestamp (the vendor's `dateFrom`/`dateTo` are Unix-seconds
      // strings — comparing the input ISO directly against them would
      // never match, so the write would fire on every event and emit
      // redundant input/change activity).
      if (this.calendar.dateFrom !== undefined) {
        const fromIso = this.convertWcTimeToDate(this.calendar.dateFrom);
        if (this.inputList[0].value !== fromIso) {
          this.inputList[0].value = fromIso;
        }
      }

      if (this.inputList[1] && this.calendar.dateTo) {
        const toIso = this.convertWcTimeToDate(this.calendar.dateTo);
        if (this.inputList[1].value !== toIso) {
          this.inputList[1].value = toIso;
        }
      }
    }, { signal });

    this.calendar.addEventListener('auroCalendar-dismissRequest', () => {
      this.dropdown.hide();
    }, { signal });

    this.calendar.addEventListener('auroCalendar-centralDateChanged', (event) => {
      const match = this.centralDateObject && this.util.datesMatch(event.detail.date, this.centralDateObject);

      if (!match) {
        this.calendarRenderUtil.updateCentralDate(this, event.detail.date);
      }

      this.notifyMonthChanged(event);
    }, { signal });
  }

  /**
   * Binds all behavior needed to the datepicker after rendering.
   * @private
   * @returns {void}
   */
  configureDatepicker() {
    // These listeners are on `this` (the host), so they would GC with the
    // host even without the abort signal — see the leak rationale on
    // `_listenerAbortController`. The signal is still passed for uniform
    // cleanup semantics with the child-element listeners in the other
    // configure* methods.
    const { signal } = this._listenerAbortController;

    this.addEventListener('focusin', () => {
      this.touched = true;
      this.hasFocus = true;
    }, { signal });

    this.addEventListener('focusout', () => {
      this.hasFocus = false;

      if (this.noValidate) {
        return;
      }

      if (!this.matches(':focus-within')) {
        this.validate();
      }
    }, { signal });

    if (this.valueObject) {
      this.calendar.dateFrom = this.convertToWcValidTime(this.valueObject);
    }

    if (this.valueEndObject) {
      this.calendar.dateTo = this.convertToWcValidTime(this.valueEndObject);
    }
  }

  /**
   * Blurs the datepicker and hides the dropdown as part of blur action.
   * @private
   * @returns {void}
   */
  blur() {
    super.blur();
    this.hideBib();
  }

  /**
   * Closes the calendar if it's open.
   * @returns {void}
   */
  hideBib() {
    if (this.dropdown && this.dropdown.isPopoverVisible) {
      this.dropdown.hide();
    }
  }

  /**
   * Opens the calendar if it's closed.
   * @returns {void}
   */
  showBib() {
    if (this.dropdown && !this.dropdown.isPopoverVisible) {
      this.dropdown.show();
    }
  }

  /**
   * Keeps the datepicker in sync with the calendar's central date.
   * @private
   * @param {CustomEvent} event - The event from the calendar with the new central date.
   * @returns {void}
   */
  handleCalendarCentralDateChange(event) {
    const match = this.util.datesMatch(event.detail.date, this.centralDateObject);

    if (!match) {
      this.calendarRenderUtil.updateCentralDate(this, event.detail.date);
    }
  }

  /**
   * Sets `value`, or `valueEnd` in a range, to the date of the calendar cell someone selected.
   * @private
   * @param {Number} time - The Unix timestamp, in seconds, of the selected date.
   * @returns {void}
   */
  handleCellClick(time) {
    this.cellClickActive = true;

    // convertWcTimeToDate now returns an ISO string directly
    const newDate = this.convertWcTimeToDate(time);

    let onEndValue = false;
    if (dateFormatter.isValidDate(newDate)) {

      if (this.range) {
        if (this.valueObject && !this.valueEndObject) {
          // verify the date is after this.value to insure we are setting a proper range
          if (dateFormatter.stringToDateInstance(newDate) >= this.valueObject) {
            onEndValue = true;
          }
        } else if (this.valueObject && this.valueEndObject) {
          // both dateTo and dateFrom are valid, then reset dateEnd
          // set input's value directly as the callback restores this.valueEnd to the old value
          this.inputList[1].value = undefined;
          // callback will set valueEnd to undefined
        }
      }

      if (onEndValue) {
        this.valueEnd = newDate;
      } else {
        this.value = newDate;
      }
    }
  }

  /**
   * Emits an event to notify the calendar cells to fetch their slot content.
   * @private
   * @returns {void}
   */
  pushSlotContent() {
    this.dispatchEvent(new CustomEvent('auroDatePicker-newSlotContent'));
  }

  /**
   * Clears the chosen dates. Unlike `reset()`, the datepicker still counts as used, so the next validation can report a missing date.
   */
  resetInputs() {
    this.inputList.forEach((input) => {
      input.reset();
    });
  }

  /**
   * Clears the chosen dates and the validation state.
   * @returns {void}
   */
  reset() {
    this.resetInputs();
    this.validation.reset(this);
  }

  /**
   * Clears the chosen dates, like `resetInputs()`.
   * @returns {void}
   */
  clear() {
    this.resetInputs();
  }

  /**
   * Checks whether a formatted date string matches a blackout date.
   * @private
   * @param {string} dateStr - An ISO date string (`YYYY-MM-DD`), such as `value`.
   * @returns {boolean} True if the date is in `blackoutDates`; false otherwise.
   */
  isBlackoutDate(dateStr) {
    if (!Array.isArray(this.blackoutDates) ||
      this.blackoutDates.length === 0 ||
      !dateStr ||
      !dateFormatter.isValidDate(dateStr)) {
      return false;
    }

    return this.blackoutDates.includes(dateStr);
  }

  /**
   * Checks the chosen dates and updates `validity` and the error message.
   * @param {boolean} [force=false] - If true, validates even when the datepicker has focus or hasn't been used yet, so an empty required datepicker reports `valueMissing`. If false, validates only when focus is outside the datepicker and it has been used or has a value.
   */
  validate(force = false) {
    this.inputList[0].validate(force);
    if (this.range) {
      this.inputList[1].validate(force);
    }

    this.validation.validate(this, force);

    // After standard validation, check blackout dates for typed input
    if (this.validity !== 'customError' &&
      (this.isBlackoutDate(this.value) || (this.range && this.isBlackoutDate(this.valueEnd)))) { // eslint-disable-line no-extra-parens
      const msg = this.setCustomValidityCustomError || 'Selected date is unavailable';
      this.validity = 'customError';
      this.errorMessage = msg;

      this.dispatchEvent(new CustomEvent('auroFormElement-validated', {
        bubbles: true,
        composed: true,
        detail: {
          validity: this.validity,
          message: this.errorMessage
        }
      }));
    }
  }

  /**
   * Sets `hasValue` and `hasAllValues` from the current dates.
   * @private
   */
  setHasValue() {
    if (!this.range) {
      this.hasValue = this.value && this.value.length > 0;
      this.hasAllValues = this.hasValue;
      return;
    }

    // eslint-disable-next-line no-extra-parens
    this.hasValue = (this.value && this.value.length > 0) || (this.valueEnd && this.valueEnd.length > 0);
    this.hasAllValues = (this.value && this.value.length > 0) && (this.valueEnd && this.valueEnd.length > 0); // eslint-disable-line no-extra-parens
  }

  /**
   * Checks whether the datepicker has a validation error.
   * @returns {boolean} True if `validity` is set to anything other than `valid`; false otherwise.
   */
  get hasError() {
    return this.validity !== undefined && this.validity !== 'valid';
  }

  /**
   * Per-class dedup set used by `_warnInvalidLocale`. Static so the dedup
   * spans every datepicker instance on the page; lives on the class (not
   * at module scope) so it stays an encapsulated implementation detail of
   * this component and does not interfere with WCA's class-JSDoc
   * attachment.
   * @private
   */
  static _warnedInvalidLocales = new Set();

  /**
   * Logs a one-time `console.debug` when an unsupported locale falls back to
   * en-US. Deduped by the offending tag so noisy re-renders that resurface
   * the same bad value stay quiet, but each new bad value still signals so
   * consumers can spot the typo or missing tag.
   * @private
   * @param {string|undefined} badLocale - The locale value that failed.
   * @returns {void}
   */
  _warnInvalidLocale(badLocale) {
    // Stringify without coalescing — `String(undefined)` / `String(null)`
    // surface the actual offending value in the log, instead of the
    // ambiguous `Locale ""` that `String(badLocale ?? '')` would produce.
    // Dedup still works correctly because each unique stringification
    // becomes its own Set entry.
    const key = String(badLocale);
    const seen = AuroDatePicker._warnedInvalidLocales;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    // eslint-disable-next-line no-console
    console.debug(`[auro-datepicker] Locale "${key}" is not supported by Intl.DateTimeFormat. Falling back to "en-US". Pass a BCP 47 tag such as "en-US", "fr-FR", or "ja-JP".`);
  }

  /**
   * Checks whether `locale` is supported before each update, and keeps `format`, the calendar's reference dates, and `valueEnd` in sync.
   * @ignore
   * @param {Map} changedProperties - The map of properties that have changed since the last update.
   * @returns {void}
   */
  willUpdate(changedProperties) {
    if (changedProperties.has('locale')) {
      try {
        const supported = Intl.DateTimeFormat.supportedLocalesOf([this.locale], { localeMatcher: 'lookup' });
        if (supported.length > 0) {
          this._validLocale = this.locale;
        } else {
          this._validLocale = 'en-US';
          this._warnInvalidLocale(this.locale);
        }
      } catch {
        this._validLocale = 'en-US';
        this._warnInvalidLocale(this.locale);
      }

      const previousLocaleFormat = getDateFormatFromLocale(changedProperties.get('locale'));
      if (!changedProperties.has('format') && (!this.format || this.format.toLowerCase() === previousLocaleFormat)) {
        this.format = getDateFormatFromLocale(this._validLocale);
      }
    }

    if (changedProperties.has('referenceDates') && this.calendar) {
      this.calendar.requestUpdate();
      this.dispatchEvent(new CustomEvent('auroDatePicker-newSlotContent'));
    }

    // Range invariant: if a value change (from click or programmatic) has
    // moved start past end, clear valueEnd here so both properties land in
    // the SAME reactive cycle. Doing it in updated() would schedule a
    // second cycle after cellClickActive/wasCellClick has already been
    // consumed by the value branch, leaving the valueEnd branch to run
    // with a stale handshake and racing with any intervening programmatic
    // value assignments.
    if ((changedProperties.has('value') || changedProperties.has('valueEnd')) &&
      this.valueObject && this.valueEndObject && this.valueObject > this.valueEndObject) {
      this.valueEnd = undefined;
    }
  }

  updated(changedProperties) {
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

    if (changedProperties.has('calendarStartDate')) {
      this.calendar.setAttribute('calendarStartDate', this.calendarStartDate || '');
    }

    if (changedProperties.has('calendarEndDate')) {
      this.calendar.setAttribute('calendarEndDate', this.calendarEndDate || '');
    }

    if (changedProperties.has('value')) {

      // Change the calendar focus to the first valid date value only the first time the value is set
      if (!this.calendarFocusDate && dateFormatter.isValidDate(this.value) && !this.dropdown.isPopoverVisible) {
        this.calendarFocusDate = this.value;

        // Let the calendar know to scroll to the focus date when it is next rendered on mobile
        this.forceScrollOnNextMobileCalendarRender = true;
      }

      if (this.cellClickActive) {
        this.cellClickActive = false;
        this.wasCellClick = true;
      } else {
        this.wasCellClick = false;
      }

      if (this.value && dateFormatter.isValidDate(this.value)) {
        this.calendar.dateFrom = this.convertToWcValidTime(this.valueObject);
        this.calendarRenderUtil.updateCentralDate(this, this.valueObject);
      } else {
        if (this.inputList[0].value !== this.value) {
          this.inputList[0].value = this.value || '';
        }

        if (this.calendar.dateFrom !== undefined) {
          this.calendar.dateFrom = undefined;
        }
      }

      // update the inputs — auro-input accepts ISO directly
      if (this.inputList[0].value !== this.value) {
        if (this.value) {
          this.inputList[0].value = this.value;
        } else {
          this.inputList[0].value = '';
        }
      }

      if (this.value && this.value.length === this.inputList[0].lengthForType && !(this.wasCellClick && this.range)) {
        // Skip centralDate update when user clicked a cell in range mode
        // to prevent the displayed months from shifting. Route through
        // updateCentralDate so centralDate stays first-of-month — direct
        // assignment of the raw value briefly holds a mid-month string
        // and violates the invariant that observers (e.g. calendar sync)
        // rely on.
        this.calendarRenderUtil.updateCentralDate(this, this.value);
      }

      this.setHasValue();
    }

    if (changedProperties.has('blackoutDates')) {
      // Force calendar cells to re-render with updated blackout state.
      // requestUpdate on the calendar alone is insufficient because cells
      // don't receive blackoutDates as a bound property. Dispatching the
      // slot content event triggers handleSlotContent → requestUpdate on each cell.
      if (this.calendar) {
        this.calendar.requestUpdate();
        this.dispatchEvent(new CustomEvent('auroDatePicker-newSlotContent'));
      }

      // Re-run validation so that a previously valid value that now falls on
      // a blackout date is flagged, and vice versa.
      if (this.value || this.valueEnd) {
        this.validate();
      }
    }

    if (changedProperties.has('valueEnd') && this.inputList[1]) {
      if (this.cellClickActive) {
        this.cellClickActive = false;
        this.wasCellClick = true;
      } else {
        this.wasCellClick = false;
      }

      // update the calendar
      if (this.valueEndObject) {
        this.calendar.dateTo = this.convertToWcValidTime(this.valueEndObject);
        if (!this.wasCellClick) {
          this.calendarRenderUtil.updateCentralDate(this, this.valueEndObject);
        }
      } else {
        if (this.inputList[1].value !== this.valueEnd) {
          this.inputList[1].value = this.valueEnd || '';
        }

        if (this.calendar.dateTo !== undefined) {
          this.calendar.dateTo = undefined;
        }
      }

      // update the inputs — auro-input accepts ISO directly
      if (this.inputList[1].value !== this.valueEnd) {
        if (this.valueEnd) {
          this.inputList[1].value = this.valueEnd;
        } else {
          this.inputList[1].value = '';
        }
      }

      if (this.valueEnd && this.valueEnd.length === this.inputList[1].lengthForType && !this.wasCellClick) {
        // Skip centralDate update when user clicked a cell in range mode
        // to prevent the displayed months from shifting. Route through
        // updateCentralDate to preserve the first-of-month invariant
        // (see matching comment in the value branch above).
        this.calendarRenderUtil.updateCentralDate(this, this.valueEnd);
      }

      this.validate();
      this.setHasValue();
    }

    // Run focus-date handling AFTER value/valueEnd so that when a consumer sets
    // calendarFocusDate together with value, the focus date wins for the visible
    // month instead of being overwritten by the value branch's updateCentralDate.
    if (changedProperties.has('calendarFocusDate')) {
      this.handleFocusDateChange();
    }

    if (changedProperties.has('error')) {
      // Error attribute is passed down to the last input in the list to control the error state
      // This is done to prevent error icon from displaying on both inputs in range support
      const lastInput = this.inputList[this.inputList.length - 1];

      if (this.hasAttribute('error')) {
        // Set the error attribute on the last input
        lastInput.setAttribute('error', this.getAttribute('error'));
      } else {
        // Remove the error attribute on the last input
        lastInput.removeAttribute('error');
      }

      // Validate the last input
      this.validation.validate(lastInput, true);
    }

    // This resets the datepicker when the minDate is set to a new value that is
    // a later date than the current value date
    if (changedProperties.has('minDate') && this.minDate) {
      if (this.minDateObject) {
        const minDateMonth = this.minDateObject.getMonth() + 1;
        const minDateYear = this.minDateObject.getFullYear();

        // This sets the visible month of the calendar to the minDate when the minDate is later
        // than the current visible date
        if (minDateYear > this.calendar.year) {
          this.calendarRenderUtil.updateCentralDate(this, this.minDateObject);
        } else if (minDateYear === this.calendar.year && minDateMonth > this.calendar.month) {
          this.calendarRenderUtil.updateCentralDate(this, this.minDateObject);
        }

        if (!changedProperties.has('value') && this.valueObject && this.minDateObject > this.valueObject) {
          this.value = undefined;

          if (this.range && this.valueEnd) {
            this.valueEnd = undefined;
          }

          this.calendarRenderUtil.updateCentralDate(this, this.minDateObject);
        }

        // When there is no focusDate and no value, set the focusDate to the minDate
        const nothingSet = !this.calendarFocusDate && !this.value;
        const earlierThanMinDate = this.calendarFocusDate && dateFormatter.isValidDate(this.calendarFocusDate) && this.calendarFocusDateObject < this.minDateObject;

        if (nothingSet || earlierThanMinDate) {
          this.calendarFocusDate = this.minDate;
        }
      }

      this.calendar.requestUpdate();
    }

    // This resets the datepicker when the maxDate is set to a new value that is
    // an earlier date than the current value date
    if (changedProperties.has('maxDate')) {
      if (this.maxDate && dateFormatter.isValidDate(this.maxDate)) {
        const maxDateMonth = this.maxDateObject.getMonth() + 1;
        const maxDateYear = this.maxDateObject.getFullYear();

        // This sets the visible month of the calendar to the maxDate when the maxDate is earlier
        // than the current visible date
        if (maxDateYear < this.calendar.year) {
          this.calendarRenderUtil.updateCentralDate(this, this.maxDateObject);
        } else if (maxDateYear === this.calendar.year && maxDateMonth < this.calendar.month) {
          this.calendarRenderUtil.updateCentralDate(this, this.maxDateObject);
        }
      }

      if (this.maxDate && !changedProperties.has('value') && this.valueObject && this.maxDateObject < this.valueObject) {
        this.value = undefined;

        if (this.range && this.valueEnd) {
          this.valueEnd = undefined;
        }

        this.calendarRenderUtil.updateCentralDate(this, this.maxDateObject);
      }

      this.calendar.requestUpdate();
    }

    if (changedProperties.has('centralDate')) {
      this.handleCentralDateChange();
    }
  }

  /**
   * Handles the transfer of content between slots in the component.
   *
   * @private
   * @method handleSlotToSlot
   * @param {Event} event - The event object containing information about the slot transfer.
   * @throws {TypeError} If no light DOM element is assigned to the slot.
   */
  handleSlotToSlot(event) {
    const slot = this.querySelector(`[slot='${event.target.name}']`);
    this.calendar.injectSlot(event.target.name, slot.cloneNode(true));
  }

  /**
   * Handles click events on the datepicker.
   * @param {PointerEvent} event - The pointer event object.
   * @private
   * @returns {void}
   */
  handleClick(event) {
    const path = event.composedPath();
    const [initTarget] = path;
    const pathIncludesBib = path.includes(this.dropdown?.bibContent);
    const triggerIsInert = this.dropdown?.trigger?.inert;

    // When desktopModal is open, the datepicker marks the dropdown's #trigger
    // element inert to keep AT and Tab off the input. Inert also blocks pointer
    // events, so a click on the visible trigger area passes through to the
    // wrapper <div> that sits alongside #trigger in the dropdown's shadow root.
    // composedPath() then no longer contains #trigger, and the floater's
    // window-level click-outside handler treats the click as an outside click
    // and closes the bib. Suppress that misdetection here: if the click lands
    // inside the trigger's bounds and outside the bib, stop propagation before
    // it reaches the window listener.
    if (this.dropdown?.isPopoverVisible && triggerIsInert && !pathIncludesBib) {
      const triggerRect = this.dropdown.trigger?.getBoundingClientRect();
      if (triggerRect &&
          event.clientX >= triggerRect.left && event.clientX <= triggerRect.right &&
          event.clientY >= triggerRect.top && event.clientY <= triggerRect.bottom) {
        event.stopPropagation();
      }
    }

    // Determine if the current layout requires special handling
    const layoutRequiresHandling = ['snowflake'].includes(this.layout);

    // Determine if the target is an input element
    const targetIsInput = initTarget.tagName === 'INPUT';
    const isFocusAlreadyOnInput = this.inputList.includes(this.shadowRoot.activeElement);

    if (layoutRequiresHandling && !targetIsInput && !isFocusAlreadyOnInput && !pathIncludesBib) {
      // Focus the first input
      this.inputList[0].focus();
    }
  }

  /**
   * Sets up click handling for the datepicker.
   * @private
   * @returns {void}
   */
  configureClickHandler() {
    this.addEventListener('click', this.handleClick, { signal: this._listenerAbortController.signal });
  }

  firstUpdated() {

    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, 'auro-datepicker');

    // If the element was disconnected before this first render finished,
    // disconnectedCallback's microtask already aborted the controller. The
    // connectedCallback reinit guard skips that case because `hasUpdated`
    // is still false. Mint a fresh controller here so configure* registers
    // listeners against a live signal.
    if (this._listenerAbortController.signal.aborted) {
      this._listenerAbortController = new AbortController();
    }

    this.configureDropdown();
    this.configureInput();
    this.configureCalendar();
    this.configureDatepicker();
    this.configureClickHandler();
    applyKeyboardStrategy(this, datepickerKeyboardStrategy);
  }

  connectedCallback() {
    super.connectedCallback();

    // True reconnect after `disconnectedCallback` aborted our controller:
    // the existing signal is dead, so listeners registered against it
    // would never fire. Create a fresh controller and re-run the
    // configure* wiring (each method is idempotent — it just re-caches
    // child refs and re-registers listeners against the new signal).
    // `hasUpdated` gates this so the *first* connect (which precedes
    // firstUpdated) still falls through to firstUpdated's initial wiring.
    if (this.hasUpdated && this._listenerAbortController.signal.aborted) {
      this._listenerAbortController = new AbortController();
      this.configureDropdown();
      this.configureInput();
      this.configureCalendar();
      this.configureDatepicker();
      this.configureClickHandler();
    }

    this.locale = this.domHandler.getLocale(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Defer so that re-parenting (auro-drawer slotting it into a dialog,
    // for example) does not abort listeners we still need after reconnect.
    queueMicrotask(() => {
      if (!this.isConnected) {
        this._listenerAbortController.abort();
      }
    });
  }

  // layout render methods
  // ------------------------------------

  /**
   * Renders the snowflake layout for the datepicker.
   * @private
   * @returns {import("lit").TemplateResult}
   */
  renderSnowflakeLayout() {
    const accentsClassMap = {
      'error': this.hasError
    };

    const inputSectionClassMap = {
      'inputSection': true,

      'hasValue': this.hasValue,
      'hasFocus': this.hasFocus,
      'util_displayHiddenVisually': !this.dvHidden
    };

    const labelClassMap = {
      'mainLabel': true,

      'hasValue': this.hasValue,
      'hasFocus': this.hasFocus,
      'util_displayHiddenVisually': this.labelHidden,
      [this.hasFocus || this.hasValue ? 'body-xs' : 'body-lg']: true,
    };

    return html`
      <div
        class="wrapper trigger"
        part="wrapper">
        <div class="accents left">
          ${this.renderHtmlIconCalendar()}
        </div>
        <div class="mainContent">
          <label class="${classMap(labelClassMap)}" part="mainLabel">
            <slot name="label"></slot>
          </label>
          <div class="${classMap(inputSectionClassMap)}" part="inputSection">
            ${this.renderHtmlInputs()}
          </div>
          <div class="${classMap(this.commonDisplayValueWrapperClasses)}">
            <slot name="displayValue" @slotchange=${this.checkDisplayValueSlotChange}>
              <span>
                ${this.formatShortDate(this.valueObject)}${this.range ? html`–${this.formatShortDate(this.valueEndObject)}` : undefined}
              </span>
            </slot>
          </div>
        </div>
        <div class="accents right ${classMap(accentsClassMap)}">
          ${this.hasError
            ? this.renderHtmlIconError()
            : this.renderHtmlActionClear()
          }
        </div>
      </div>
    `;
  }

  /**
   * Renders the classic layout for the datepicker.
   * @private
   * @returns {import("lit").TemplateResult}
   */
  renderClassicLayout() {
    const accentsClassMap = {
      error: this.hasError
    };

    const inputSectionClassMap = {
      inputSection: true,

      hasValue: this.hasValue,
      hasFocus: this.hasFocus,
    };

    return html`
      <div
        class="wrapper trigger"
        part="wrapper">
        <div class="accents left">
          ${this.renderHtmlIconCalendar()}
        </div>
        <div class="mainContent">
          <div class="${classMap(inputSectionClassMap)}" part="inputSection">
            ${this.renderHtmlInputs()}
          </div>
        </div>
        <div class="accents right ${classMap(accentsClassMap)}">
          ${this.hasError
            ? this.renderHtmlIconError()
            : this.renderHtmlActionClear()
          }
        </div>
      </div>
    `;
  }

  /**
   * Renders the layout based on the `layout` attribute.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderLayoutFromAttributes() {
    switch (this.layout) {
      case 'snowflake':
        return this.renderSnowflakeLayout();
      default:
        return this.renderClassicLayout();
    }
  }

  // eslint-disable-next-line no-warning-comments
  // TODO: move this to date utility when time allows :(
  /**
   * Formats a date as a short month and day in the datepicker's `locale`, such as "Apr 21" for `en-US`.
   * @private
   * @param {Date} date - The date to format.
   * @returns {string}
   */
  formatShortDate(date) {
    // should render like Apr 21
    const options = {
      month: 'short',
      day: '2-digit'
    };

    return date?.toLocaleDateString(this.locale, options).replace(',', '');
  }

  /**
   * Formats a date as a short month and day and renders it.
   * @private
   * @param {Date} date - The date value to format and render.
   * @returns {import('lit').TemplateResult}
   */
  renderDisplayTextDate(date) {
    const displayTextClasses = {
      'displayValueText': true,
      'body-lg': true
    };

    return html`
        <div>
          <div class="${classMap(displayTextClasses)}">
            ${date
        ? this.formatShortDate(date)
        : undefined
      }
          </div>
        </div>
    `;
  }

  /**
   * Renders the HTML inputs for the datepicker.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlInputs() {
    const inputClasses = {
      "util_displayHiddenVisually": !this.hasValue && !this.hasFocus && this.layout !== "classic",
      "parentBorder": this.layout === "classic"
    };

    return html`
      <div class="inputContainer">
        <${this.inputTag}
          appearance="${this.onDark ? 'inverse' : this.appearance}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          ?hideLabelVisually="${this.layout !== 'classic'}"
          format="${this.format}"
          locale="${this._validLocale}"
          .max="${this.maxDate}"
          .min="${this.minDate}"
          .placeholder="${this.placeholder}"
          .size="${this.size}"
          .shape="${this.shape}"
          class="dateFrom ${classMap(inputClasses)}"
          id="${this.generateRandomString(12)}"
          inputmode="${ifDefined(this.inputmode)}"
          layout="classic"
          noValidate
          part="input"
          setCustomValidity="${this.setCustomValidity}"
          setCustomValidityCustomError="${this.setCustomValidityCustomError}"
          setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
          setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
          setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
          type="date"
        >
          ${this.layout !== "classic"
        ? html`
              <span slot="displayValue">
                ${this.renderDisplayTextDate(this.valueObject)}
              </span>
            `
        : undefined
      }
          <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}</span>
          <span slot="label"><slot name="fromLabel"></slot></span>
          <slot name="optionalFromLabel" slot="optionalLabel"> (optional)</slot>
        </${this.inputTag}>
      </div>

      <!--  Divider  -->
      ${this.range ? html`
        <div class="inputDivider"></div>
      ` : undefined}

      ${this.range ? html`
        <div class="inputContainer">
          <${this.inputTag}
            appearance="${this.onDark ? 'inverse' : this.appearance}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?hideLabelVisually="${this.layout !== 'classic'}"
            .format="${this.format}"
            locale="${this._validLocale}"
            .max="${this.maxDate}"
            .min="${this.minDate}"
            .placeholder="${this.placeholderEndDate || this.placeholder}"
            .size="${this.size}"
            .shape="${this.shape}"
            class="dateTo ${classMap(inputClasses)}"
            id="${this.generateRandomString(12)}"
            layout="classic"
            noValidate
            part="input"
            setCustomValidity="${this.setCustomValidity}"
            setCustomValidityCustomError="${this.setCustomValidityCustomError}"
            setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
            setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
            setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
            type="date"
          >
            ${this.layout !== "classic"
          ? html`
              <span slot="displayValue">
                ${this.renderDisplayTextDate(this.valueEndObject)}
              </span>
            `
          : undefined
        }
            <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || this.runtimeUtils.getSlotText(this, 'ariaLabel.input.clear') || i18n(this.lang, 'clearInput')}</span>
            <span slot="label"><slot name="toLabel"></slot></span>
            <slot name="optionalToLabel" slot="optionalLabel"> (optional)</slot>
          </${this.inputTag}>
        </div>
      ` : undefined}
    `;
  }

  // ------------------------------------
  // end of layout render

  // icons/actions
  // ------------------------------------

  /**
   * Handles click on the clear button.
   * @private
   * @param {MouseEvent} event - The mouse event from the clear button click.
   * @returns {void}
   */
  handleClearClick(event) {
    event.stopPropagation();
    this.resetInputs();
    this.focus();
  }

  /**
   * Renders the clear action button.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlActionClear() {
    const clearActionClassMap = {
      'notification': true,
      'clear': true,
      'util_displayHidden': (!this.value || this.value.length === 0) && (!this.valueEnd || this.valueEnd.length === 0),
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
            name="x-lg"
            >
          </${this.iconTag}>
        </${this.buttonTag}>
      </div>
    `;
  }

  /**
   * Renders the error icon.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlIconError() {
    const clearActionClassMap = {
      'notification': true,
      'error': true,
      // 'util_displayHidden': (!this.value || this.value.length === 0) && (!this.valueEnd || this.valueEnd.length === 0),
    };

    return html`
      <div class="${classMap(clearActionClassMap)}">
        <${this.iconTag}
          category="alert"
          customColor
          name="error-stroke"
          >
        </${this.iconTag}>
      </div>
    `;
  }

  /**
   * Renders the calendar icon.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderHtmlIconCalendar() {
    return html`
      <${this.iconTag}
        appearance="${this.onDark ? 'inverse' : this.appearance}"
        category="interface"
        class="accentIcon"
        name="calendar"
        part="accentIcon"
        variant="${this.disabled ? 'disabled' : 'muted'}">
      </${this.iconTag}>`;
  }

  /**
   * Renders the help text, or the error message when the datepicker is invalid.
   * @private
   * @returns {import('lit').TemplateResult} The help text or error message HTML.
   */
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
        `
      }
    `;
  }

  /**
   * Renders the calendar.
   * @private
   * @returns {import('lit').TemplateResult}
   */
  renderCalendar() {
    return html`
      <auro-formkit-calendar
        ?largeFullscreenHeadline="${this.largeFullscreenHeadline}"
        ?noRange="${!this.range}"
        .format="${this.format}"
        .monthFirst="${this.format.indexOf('mm') < this.format.indexOf('yyyy')}"
        .maxDate="${this.maxDate}"
        .minDate="${this.minDate}"
        .monthNames="${this.monthNames}"
        .localeCode="${this._validLocale}"
        .mobileBreakpoint="${this.mobileBreakpoint}"
        part="calendar"
      >
        <slot name="ariaLabel.bib.close" slot="ariaLabel.close" @slotchange="${this.handleSlotToSlot}">Close</slot>
        <slot slot="bib.fullscreen.headline" name="bib.fullscreen.headline" @slotchange="${this.handleSlotToSlot}"></slot>
        <slot slot="bib.fullscreen.dateLabel" name="bib.fullscreen.dateLabel" @slotchange="${this.handleSlotToSlot}"></slot>
        <slot slot="bib.fullscreen.toLabel" name="bib.fullscreen.toLabel" @slotchange="${this.handleSlotToSlot}"></slot>
        <slot slot="bib.fullscreen.fromLabel" name="bib.fullscreen.fromLabel" @slotchange="${this.handleSlotToSlot}"></slot>
        <span slot="bib.fullscreen.fromStr" class="body-default">${AuroInputUtil.toFormattedValue(this.valueObject, this.format) || html`<span class="placeholderDate">${(this.format || 'mm/dd/yyyy').toUpperCase()}</span>`}</span>
        ${this.range ? html`<span slot="bib.fullscreen.toStr" class="body-default">${AuroInputUtil.toFormattedValue(this.valueEndObject, this.format) || html`<span class="placeholderDate">${(this.format || 'mm/dd/yyyy').toUpperCase()}</span>`}</span>` : undefined}
      </auro-formkit-calendar>
    `;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const dropdownElementClassMap = {
      hasFocus: this.hasFocus
    };

    // Base HTML render() handles dropdown and calendar bib
    return html`
      <!-- Hidden slot for clear button aria-label -->
      <slot name="ariaLabel.input.clear" hidden @slotchange=${() => this.requestUpdate()}></slot>

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
          desktopModal
          disableEventShow
          for="dropdownMenu"
          part="dropdown"
        >
          <div slot="trigger" class="dpTriggerContent" part="trigger">
            ${this.renderLayoutFromAttributes()}
          </div>

          <div class="calendarWrapper" part="calendarWrapper">
            ${this.renderCalendar()}
          </div>
          <div slot="helpText" part="helpTextSpan">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
    `;
  }
}
