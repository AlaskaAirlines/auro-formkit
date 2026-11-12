const watchedItems = new Set();


/**
 * Sets an element's `lang` to the page's language.
 * @private
 * @param {object} item - The element to update.
 * @param {string} lang - The page's current language.
 */
function setLang(item, lang) {

  /**
   * When the language is `en`, leave `lang` undefined so the
   * element doesn't get a `lang` attribute.
   */
  item.lang = lang === 'en' ? undefined : lang;
}

/**
 * Called when the page's `lang` attribute changes. Updates `lang` on every watched element.
 * @private
 * @param {MutationRecord[]} mutationList - The observed mutations.
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
 * Gets a built-in string in the requested language. Only `es` returns Spanish; every other language returns English.
 * @param {string} lang - The language to return the string in, such as `es`.
 * @param {string} requestedString - The key of the string to return, such as `email`.
 * @private
 * @returns {string} The string in the requested language.
 */
export default function i18n(lang, requestedString) {
  if (lang === 'es') {
    return stringsES[requestedString];
  }

  return stringsEN[requestedString];
}

/**
 * Registers an element to have its `lang` updated when the page's `lang` changes.
 * Sets the element's `lang` from the page first when it has none.
 * @private
 * @param {object} element - The element to update.
 */
export function notifyOnLangChange(element) {
  if (!element.lang) {
    setLang(element, document.documentElement.lang);
  }
  watchedItems.add(element);
}

/**
 * Stops updating an element's `lang` when the page's `lang` changes.
 * @private
 * @param {object} element - The element to stop updating.
 */
export function stopNotifyingOnLangChange(element) {
  watchedItems.delete(element);
}
