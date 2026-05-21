// Copyright (c) 2026 Alaska Airlines. All rights reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

/**
 * Tier-1 + Spanish localization strings for `auro-datepicker`.
 *
 * Keys:
 *  - `datepicker.calendar.prevMonth`
 *  - `datepicker.calendar.nextMonth`
 *  - `datepicker.bib.close`
 *  - `datepicker.input.invalidFormat` (supports `{pattern}` substitution).
 */

const STRINGS = {
  en: {
    'datepicker.calendar.prevMonth': 'Previous month',
    'datepicker.calendar.nextMonth': 'Next month',
    'datepicker.bib.close': 'Close',
    'datepicker.input.invalidFormat': 'Please enter date in {pattern}'
  },
  fr: {
    'datepicker.calendar.prevMonth': 'Mois précédent',
    'datepicker.calendar.nextMonth': 'Mois suivant',
    'datepicker.bib.close': 'Fermer',
    'datepicker.input.invalidFormat': 'Veuillez saisir la date au format {pattern}'
  },
  de: {
    'datepicker.calendar.prevMonth': 'Vorheriger Monat',
    'datepicker.calendar.nextMonth': 'Nächster Monat',
    'datepicker.bib.close': 'Schließen',
    'datepicker.input.invalidFormat': 'Bitte geben Sie das Datum im Format {pattern} ein'
  },
  ja: {
    'datepicker.calendar.prevMonth': '前の月',
    'datepicker.calendar.nextMonth': '次の月',
    'datepicker.bib.close': '閉じる',
    'datepicker.input.invalidFormat': '{pattern} 形式で日付を入力してください'
  },
  es: {
    'datepicker.calendar.prevMonth': 'Mes anterior',
    'datepicker.calendar.nextMonth': 'Mes siguiente',
    'datepicker.bib.close': 'Cerrar',
    'datepicker.input.invalidFormat': 'Introduzca la fecha en el formato {pattern}'
  },
  ar: {
    'datepicker.calendar.prevMonth': 'الشهر السابق',
    'datepicker.calendar.nextMonth': 'الشهر التالي',
    'datepicker.bib.close': 'إغلاق',
    'datepicker.input.invalidFormat': 'يرجى إدخال التاريخ بالتنسيق {pattern}'
  }
};

/**
 * Resolve the base-language code (e.g. `fr-CA` → `fr`) used as a fallback
 * when the full locale tag has no string table.
 * @param {string} locale - BCP47 locale tag.
 * @returns {string} Lowercase base-language code.
 */
function baseLanguage(locale) {
  if (!locale || typeof locale !== 'string') {
    return 'en';
  }
  return locale.split('-')[0].toLowerCase();
}

/**
 * Substitute `{var}` placeholders with values from `vars`.
 * @param {string} template - String containing `{name}` placeholders.
 * @param {object} [vars] - Map of placeholder names to substitution values.
 * @returns {string} Substituted string.
 */
function interpolate(template, vars) {
  if (!vars) {
    return template;
  }
  return template.replace(/\{(?<key>[a-zA-Z0-9_]+)\}/gu, (_match, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      return String(vars[key]);
    }
    return `{${key}}`;
  });
}

/**
 * Look up a translation for `key` under `locale`. Falls back to the base-language
 * table (e.g. `fr-CA → fr`) and finally to `en`.
 * @param {string} locale - BCP47 locale tag.
 * @param {string} key - Translation key.
 * @param {object} [vars] - Optional substitution values for `{name}` placeholders.
 * @returns {string} Resolved (and interpolated) string.
 */
export function translate(locale, key, vars) {
  const lang = baseLanguage(locale);
  const table = STRINGS[lang] || STRINGS.en;
  const value = table[key] || STRINGS.en[key] || key;
  return interpolate(value, vars);
}

export const DATEPICKER_I18N_STRINGS = STRINGS;
