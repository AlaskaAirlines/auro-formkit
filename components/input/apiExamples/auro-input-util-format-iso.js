import { AuroInputUtil } from '@aurodesignsystem/auro-formkit/input';

const input = document.querySelector('auro-input');

// .value is always ISO, regardless of locale or format attribute
const iso = input.value; // e.g. '2024-01-15'

// Date string that's converted to user's locale and format.
AuroInputUtil.formatISODate(iso, input.format);

// Examples with explicit format:
AuroInputUtil.formatISODate(iso, 'mm/dd/yyyy'); // → '01/15/2024'
AuroInputUtil.formatISODate(iso, 'dd/mm/yyyy'); // → '15/01/2024'
AuroInputUtil.formatISODate(iso, 'yyyy/mm/dd'); // → '2024/01/15'
AuroInputUtil.formatISODate(iso, 'dd.mm.yyyy'); // → '15.01.2024'

// Returns undefined for empty or invalid input
AuroInputUtil.formatISODate(undefined, 'mm/dd/yyyy'); // → undefined
AuroInputUtil.formatISODate('not-a-date', 'mm/dd/yyyy'); // → undefined
