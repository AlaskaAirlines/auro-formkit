const watchedItems = new Set();


/**
 * Function for setting the value of the lang attribute.
 * @private
 * @param {object} item - Individual DOM node from set of watchedItems.
 * @param {string} lang - Current language set for the document.
 */
function setLang(item, lang) {

  /**
   * It is desired that if the lang is `en` to maintain `undefined` as not to
   * add the `lang` attribute to the individual element.
   */
  item.lang = lang === 'en' ? undefined : lang;
}

/**
 * Change handler for MutationObserver() callback.
 * @private
 * @param {MutationRecord[]} mutationList - Observed list of mutations.
 */
function handleChange(mutationList) {
  const [mutation] = mutationList;
  const lang = mutation.target.getAttribute('lang');
  watchedItems.forEach((item) => {
    setLang(item, lang);
  });
}

if (typeof window !== "undefined") {
  if (window.MutationObserver) {
    const observer = new MutationObserver(handleChange);
    observer.observe(document.documentElement, { attributes: true,
      attributeFilter: ['lang'] });
  }
}

const stringsES = {
  'optional': 'opcional',
  'validCard': 'Por favor, introduzca un número de tarjeta de crédito válido.',
  'email': 'Introduzca una dirección de correo electrónico válida (nombre@dominio.com).',
  'password': `Las contraseñas válidas deben constar de al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.`,
  'credit-card': 'Por favor, introduzca un número de tarjeta de crédito válido.',
  'tel': 'Por favor, introduzca un número de teléfono válido.',
  'dateYYYY': 'Ingrese una fecha completa en el formato AAAA',
  'dateYYYYMM': 'Ingrese una fecha completa en el formato AAAA/MM',
  'dateYYYYMMDD': 'Ingrese una fecha completa en el formato AAAA/MM/DD',
  'dateYYYYDDMM': 'Ingrese una fecha completa en el formato AAAA/DD/MM',
  'dateMMYYYY': 'Ingrese una fecha completa en el formato MM/AAAA',
  'dateMMYY': 'Ingrese una fecha completa en el formato MM/AA',
  'dateMMDDYYYY': 'Ingrese una fecha completa en el formato MM/DD/AAAA',
  'dateDDMMYYYY': 'Ingrese una fecha completa en el formato DD/MM/AAAA',
  'dateDDMM': 'Ingrese una fecha completa en el formato DD/MM',
  'dateMMDD': 'Ingrese una fecha completa en el formato MM/DD',
  'dateYYMM': 'Ingrese una fecha completa en el formato AA/MM',
  'dateYY': 'Ingrese una fecha completa en el formato AA',
  'dateMM': 'Ingrese una fecha completa en el formato MM',
  'dateDD': 'Ingrese una fecha completa en el formato DD',
  'clearInput': 'Borrar campo de entrada',
  'showPassword': 'Mostrar contraseña',
  'hidePassword': 'Ocultar contraseña'
};

const stringsEN = {
  'optional': 'optional',
  'validCard': 'Please enter a valid credit card number.',
  'email': 'Please enter a valid email address (name@domain.com).',
  'password': 'Valid passwords must consist of at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.',
  'credit-card': 'Please enter a valid credit card number.',
  'tel': 'Please enter a valid phone number.',
  'dateYYYY': 'Please enter a complete date in the format YYYY',
  'dateYYYYMM': 'Please enter a complete date in the format YYYY/MM',
  'dateYYYYMMDD': 'Please enter a complete date in the format YYYY/MM/DD',
  'dateYYYYDDMM': 'Please enter a complete date in the format YYYY/DD/MM',
  'dateMMYYYY': 'Please enter a complete date in the format MM/YYYY',
  'dateMMYY': 'Please enter a complete date in the format MM/YY',
  'dateMMDDYYYY': 'Please enter a complete date in the format MM/DD/YYYY',
  'dateDDMMYYYY': 'Please enter a complete date in the format DD/MM/YYYY',
  'dateDDMM': 'Please enter a complete date in the format DD/MM',
  'dateMMDD': 'Please enter a complete date in the format MM/DD',
  'dateYYMM': 'Please enter a complete date in the format YY/MM',
  'dateYY': 'Please enter a complete date in the format YY',
  'dateMM': 'Please enter a complete date in the format MM',
  'dateDD': 'Please enter a complete date in the format DD',
  'clearInput': 'Clear input field',
  'showPassword': 'Show password',
  'hidePassword': 'Hide password'
};

/**
 * Function to support the selected of a string in the set lang.
 * @param {string} lang - Requested lang for content return.
 * @param {string} requestedString - String requested in context.
 * @private
 * @returns {string} Value of string request.
 */
export default function i18n(lang, requestedString) {
  if (lang === 'es') {
    return stringsES[requestedString];
  }

  return stringsEN[requestedString];
}

/**
 * @private
 * @param {object} element - Pass in the scope of the element in use.
 */
export function notifyOnLangChange(element) {
  if (!element.lang) {
    setLang(element, document.documentElement.lang);
  }
  watchedItems.add(element);
}

/**
 * @private
 * @param {object} element - Pass in the scope of the element in use.
 */
export function stopNotifyingOnLangChange(element) {
  watchedItems.delete(element);
}
