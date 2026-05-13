import { AuroInputUtil } from '@aurodesignsystem/auro-formkit/input';

const input = document.querySelector('auro-input');

// Convert a Date to ISO, then set it on the input
const today = new Date();
input.value = AuroInputUtil.toISOFormatString(today); // e.g. '2024-01-15'

// Convert a specific date
AuroInputUtil.toISOFormatString(new Date(2024, 0, 15)); // → '2024-01-15'
