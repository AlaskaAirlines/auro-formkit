/* eslint-disable jsdoc/require-jsdoc, no-magic-numbers, no-param-reassign */

import { AuroMenu } from '../src/auro-menu.js';
import { AuroMenuOption } from '../src/auro-menuoption.js';

import { auroMenuLoadingExample } from '../apiExamples/loading.js';
import { auroMenuMatchWordExample } from '../apiExamples/match-word.js';
import { auroMenuResetExample } from '../apiExamples/reset.js';
import { auroMenuEventAttributeExample } from '../apiExamples/event-attribute.js';
import { auroMenuEventsExample } from '../apiExamples/events.js';
import { auroMenuPersistentExample } from '../apiExamples/persistent.js';
import { auroMenuSelectByValueExample } from '../apiExamples/select-by-value.js';

AuroMenu.register();
AuroMenuOption.register();
AuroMenu.register('custom-menu');
AuroMenuOption.register('custom-menuoption');

const examples = [
  auroMenuLoadingExample,
  auroMenuMatchWordExample,
  auroMenuResetExample,
  auroMenuEventAttributeExample,
  auroMenuEventsExample,
  auroMenuPersistentExample,
  auroMenuSelectByValueExample
];

export function initExamples(pending, initCount) {
  pending = pending || examples.slice();
  initCount = initCount || 0;
  const stillPending = [];

  for (const fn of pending) {
    try {
      fn();
    } catch (err) {
      stillPending.push(fn);
    }
  }

  if (stillPending.length && initCount <= 20) {
    setTimeout(() => {
      initExamples(stillPending, initCount + 1);
    }, 100);
  }
}

initExamples();
