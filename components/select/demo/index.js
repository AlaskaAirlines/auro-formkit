// import { exampleFunction } from "exampleFile.js";

/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroSelect } from '../src/auro-select.js';
import '../../menu/src/index.js';

AuroSelect.register(); // registering to `auro-select`
AuroSelect.register('custom-select');
