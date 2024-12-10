import { Logger } from "@aurodesignsystem/auro-library/scripts/utils/logger.mjs";
import {
  fromAuroComponentRoot,
  generateReadmeUrl,
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
    input: {
      remoteUrl: generateReadmeUrl(config.remoteReadmeVersion, config.remoteReadmeVariant),
      fileName: fromAuroComponentRoot(`components/${config.component}/docTemplates/README.md`),
      overwrite: config.overwriteLocalCopies
    },
    output: fromAuroComponentRoot(`components/${config.component}/README.md`)
  },
  // index.md
  {
    identifier: 'index.md',
    input: fromAuroComponentRoot(`components/${config.component}/docs/partials/index.md`),
    output: fromAuroComponentRoot(`components/${config.component}/demo/index.md`),
    mdMagicConfig: {
      output: {
        directory: fromAuroComponentRoot(`components/${config.component}/demo`)
      }
    }
  },
  // api.md
  {
    identifier: 'api.md',
    input: fromAuroComponentRoot(`components/${config.component}/docs/partials/api.md`),
    output: fromAuroComponentRoot(`components/${config.component}/demo/api.md`),
    preProcessors: [templateFiller.formatApiTable],
  }
];

/**
 *
 * @param {ProcessorConfig} config - The configuration for this processor.
 * @return {Promise<void>}
 */
export async function processDocFiles(componentName) {
  const config = { ...defaultDocsProcessorConfig };
  if (componentName) {
    config.component = componentName;
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
  } else {
    Logger.error('no component name provided');
  }
}

function main() {
  const optionIndex = process.argv.indexOf('--component');
  const componentName = process.argv[optionIndex + 1];
  processDocFiles(componentName).then(() => {
    Logger.log('Docs processed successfully for ' + componentName);
  }).
    catch((err) => {
      Logger.error(`Error processing docs: ${err.message}`);
  });
}

main();
