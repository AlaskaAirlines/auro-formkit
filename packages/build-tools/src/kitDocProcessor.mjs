import { Logger } from "@aurodesignsystem/auro-library/scripts/utils/logger.mjs";
import {
  fromAuroComponentRoot,
  processContentForFile,
  templateFiller
} from "@aurodesignsystem/auro-library/scripts/utils/sharedFileProcessorUtils.mjs";

/**
 * Processor config object.
 * @typedef {Object} ProcessorConfig
 * @property {String} [component=undefined] - The name of component to process docs.
 * @property {boolean} [overwriteLocalCopies=true] - The release version tag to use instead of master.
 * @property {string} [remoteReadmeVersion="master"] - The release version tag to use instead of master.
 * @property {string} [remoteReadmeVariant=""] - The variant string to use for the README source.
 * (like "_esm" to make README_esm.md).
 */


/**
 * @param {ProcessorConfig} config - The configuration for this processor.
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
    input: fromAuroComponentRoot(`docs/templates/README.md`),
    output: fromAuroComponentRoot(`README.md`)
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
      await processContentForFile(fileConfig);
    } catch (err) {
      Logger.error(`Error processing ${fileConfig.identifier}: ${err.message}`);
    }
  }
}

processDocFiles().catch(err => {
  Logger.error(`Failed to process docs: ${err}`);
});