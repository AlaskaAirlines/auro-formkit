/* eslint-disable max-lines, jsdoc/require-jsdoc */

import { fixture, html } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import '../src/registered.js';
import '../../menu/src/registered.js';

/**
 * Testing fixture for persistInput attribute.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with persistInput attribute set.
 */
export async function persistInputFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  };

  return fixture(html`
  <auro-combobox required persistInput>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
};

/**
 * Testing fixture for shift+tab keyboard interaction.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element for testing shift+tab behavior.
 */
export async function shiftTabFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="sh-option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="sh-option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Grapes" id="sh-option-2">Grapes</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture for shift+tab when the first option is disabled.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element for disabled-first-option shift+tab tests.
 */
export async function shiftTabDisabledFirstFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="sh-dis-option-0" disabled>Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="sh-dis-option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Grapes" id="sh-dis-option-2">Grapes</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Default testing fixture for the base combobox behavior.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The default auro-combobox element used in tests.
 */
export async function defaultFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture with nested menu options for keyboard navigation coverage.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element containing a nested auro-menu.
 */
export async function nestedMenuFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }

  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="option 1" id="nested-option-0">option 1</auro-menuoption>
      <auro-menu>
        <auro-menuoption value="option a" id="nested-option-1">option a</auro-menuoption>
        <auro-menuoption value="option b" id="nested-option-2">option b</auro-menuoption>
      </auro-menu>
      <auro-menuoption value="option 2" id="nested-option-3">option 2</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture with an initial combobox value preselected.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element initialized with value="Apples".
 */
export async function presetValueFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
    <auro-combobox value="Apples">
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      </auro-menu>
    </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox behavior when check marks are enabled.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with the checkmark attribute set.
 */
export async function checkmarkFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox checkmark>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}


/**
 * Testing fixture for combobox with suggest attribute matching additional options.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with suggest attribute configured.
 */
export async function suggestFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" suggest="Apples" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox with required attribute validation.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with required attribute set.
 */
export async function requiredFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox required>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox with nomatch attribute for unmatched results.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with nomatch option configured.
 */
export async function noMatchFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption nomatch id="option-noMatch">No Matching Option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox with persistent attribute that always displays.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with persistent option configured.
 */
export async function persistentFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption persistent id="option-noMatch">Persistent</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox with filter behavior validation.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with filter behavior configured.
 */
export async function filterFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
    <auro-combobox behavior="filter" setCustomValidityValueMissingFilter="filter error">
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption persistent id="option-noMatch">Persistent</auro-menuoption>
      </auro-menu>
    </auro-combobox>
  `);
}

export async function requiredFilterBehaviorFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
    <auro-combobox behavior="filter" required>
      <span slot="label">Name</span>
      <auro-menu>
        <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
        <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
        <auro-menuoption persistent id="option-noMatch">Persistent</auro-menuoption>
      </auro-menu>
    </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox with custom event attribute on menu option.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with custom event option configured.
 */
export async function customEventFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption event="mycustomevent">Add new fruit</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox with noFilter attribute that disables option filtering.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with noFilter attribute configured.
 */
export async function noFilterFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox noFilter>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  `);
}

/**
 * Testing fixture for combobox with an empty menu that has no options.
 * @param {boolean} mobileView - Whether to render the fixture in mobile viewport.
 * @returns {Promise<HTMLElement>} The auro-combobox element with an empty auro-menu.
 */
export async function emptyMenuFixture(mobileView) {
  if (mobileView) {
    await setViewport({
      width: 500,
      height: 800
    });
  } else {
    await setViewport({
      width: 800,
      height: 800
    });
  }
  return fixture(html`
  <auro-combobox>
    <span slot="label">Name</span>
    <auro-menu></auro-menu>
  </auro-combobox>
  `);
}
