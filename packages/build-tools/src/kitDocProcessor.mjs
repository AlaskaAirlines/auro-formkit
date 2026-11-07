import { Logger } from "@aurodesignsystem/auro-library/scripts/utils/logger.mjs";
import fs from "node:fs/promises";
import {
  fromAuroComponentRoot,
  processContentForFile,
  templateFiller
} from "@aurodesignsystem/auro-library/scripts/utils/sharedFileProcessorUtils.mjs";

// Read the scoped package name (e.g. "@aurodesignsystem/auro-formkit") from the
// root package.json so monorepoName never needs to be hardcoded here.
const { name } = JSON.parse(await fs.readFile(fromAuroComponentRoot('package.json'), 'utf8'));

// Strip the npm scope prefix ("@scope/") to get the bare package name used in
// template variables such as {{ monorepoName }} (e.g. "auro-formkit").
export const monorepoVars = {
  'monorepoName': name.replace(/^@[^/]+\//, ''),
};

/**
 * Processor config object.
 * @typedef {Object} ProcessorConfig
 * @prop {String} [component=undefined] - The name of the component to process docs for. The processor doesn't currently read this option.
 * @prop {boolean} [overwriteLocalCopies=true] - The processor doesn't currently read this option.
 * @prop {string} [remoteReadmeVersion="master"] - The release version tag to use instead of master. The processor doesn't currently read this option.
 * @prop {string} [remoteReadmeVariant=""] - The variant string to use for the README source, such as `_esm` for `README_esm.md`. The processor doesn't currently read this option.
 */


/**
 * The default processor configuration.
 * @type {ProcessorConfig}
 */
export const defaultDocsProcessorConfig = {
  component: undefined,
  overwriteLocalCopies: true,
  remoteReadmeVersion: "master",
  // eslint-disable-next-line no-warning-comments
  // TODO: remove this variant when all components are updated to use latest auro-library
  // AND the default README.md is updated to use the new paths
  remoteReadmeVariant: "_updated_paths"
};

/**
 * @param {ProcessorConfig} config - The configuration for this processor.
 * @returns {import('@aurodesignsystem/auro-library/scripts/utils/sharedFileProcessorUtils').FileProcessorConfig[]}
 */
export const fileConfigs = (config) => [
  // README.md
  {
    identifier: 'README.md',
    input: fromAuroComponentRoot(`docs/templates/kitReadmeTemplate.md`),
    output: fromAuroComponentRoot(`README.md`)
  },
  {
    identifier: 'RELEASE_NOTES.md',
    input: fromAuroComponentRoot(`docs/templates/RELEASE_NOTES.md`),
    output: fromAuroComponentRoot(`RELEASE_NOTES.md`)
  }
];

/**
 *
 * @param {ProcessorConfig} config - The configuration for this processor.
 * @return {Promise<void>}
 */
export async function processDocFiles(config = defaultDocsProcessorConfig) {
  // setup
  await templateFiller.extractNames();

  for (const fileConfig of fileConfigs(config)) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await processContentForFile({ ...fileConfig, extraVars: monorepoVars });
    } catch (err) {
      Logger.error(`Error processing ${fileConfig.identifier}: ${err.message}`);
    }
  }
}

processDocFiles().catch(err => {
  Logger.error(`Failed to process docs: ${err}`);
});
