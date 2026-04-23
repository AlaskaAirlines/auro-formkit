import { Logger } from "@aurodesignsystem/auro-library/scripts/utils/logger.mjs";
import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  fromAuroComponentRoot,
  processContentForFile,
  templateFiller
} from "@aurodesignsystem/auro-library/scripts/utils/sharedFileProcessorUtils.mjs";

/**
 * Processor config object.
 * @typedef {Object} ProcessorConfig
 * @prop {String} [component=undefined] - The name of component to process docs.
 * @prop {boolean} [overwriteLocalCopies=true] - The release version tag to use instead of master.
 * @prop {string} [remoteReadmeVersion="master"] - The release version tag to use instead of master.
 * @prop {string} [remoteReadmeVariant=""] - The variant string to use for the README source.
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
 * Get the version from the root package.json
 * @returns {Promise<string>}
 */
async function getPackageVersion() {
  const packageJsonPath = fromAuroComponentRoot('package.json');
  const packageContent = await fs.readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageContent);
  return packageJson.version;
}

const formkitVersion = await getPackageVersion();

export const monorepoVars = {
  formkitVersion,
  'monorepoName': 'auro-formkit',
  'dependentComponents': [], //  populated by componentDependencyTree in processDocFiles
  'componentList': [], //  populated by componentDependencyTree in processDocFiles
}

export const componentDependencyTree = {
  'checkbox': ['checkbox'],
  'combobox': ['dropdown', 'input', 'menu', 'combobox'],
  'counter': ['counter'],
  'datepicker': ['dropdown', 'input', 'popover', 'datepicker'],
  'dropdown': ['dropdown'],
  'form': ['form'],
  'input': ['input'],
  'menu': ['menu'],
  'radio': ['radio'],
  'select': ['dropdown', 'menu', 'select'],
}

export const componentTree = {
  'checkbox': ['checkbox', 'checkbox-group'],
  'combobox': ['combobox'],
  'counter': ['counter', 'counter-group'],
  'datepicker': ['datepicker'],
  'dropdown': ['dropdown'],
  'form': ['form'],
  'input': ['input'],
  'menu': ['menu', 'menu-option'],
  'radio': ['radio', 'radio-group'],
  'select': ['select']
}

/**
 * @param {ProcessorConfig} config - The configuration for this processor.
 * @returns {import('@aurodesignsystem/auro-library/scripts/utils/sharedFileProcessorUtils').FileProcessorConfig[]}
 */
export const fileConfigs = (config) => [
  // README.md
  {
    identifier: 'README.md',
    input: fromAuroComponentRoot(`docs/templates/componentReadmeTemplate.md`),
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
  },
  // keyboardBehavior.md
  {
    identifier: 'keyboard-behavior.md',
    input: fromAuroComponentRoot(`components/${config.component}/docs/partials/keyboard-behavior.md`),
    output: fromAuroComponentRoot(`components/${config.component}/demo/keyboard-behavior.md`),
    preProcessors: [templateFiller.formatApiTable],
  },
  // layout.md
  {
    identifier: 'layout.md',
    input: fromAuroComponentRoot(`components/${config.component}/docs/partials/layout.md`),
    output: fromAuroComponentRoot(`components/${config.component}/demo/layout.md`),
  },
  // install.md
  {
    identifier: 'install.md',
    input: fromAuroComponentRoot(`components/${config.component}/docs/partials/install.md`),
    output: fromAuroComponentRoot(`components/${config.component}/demo/install.md`),
  },
  // accessibility.md
  {
    identifier: 'accessibility.md',
    input: fromAuroComponentRoot(`components/${config.component}/docs/partials/accessibility.md`),
    output: fromAuroComponentRoot(`components/${config.component}/demo/accessibility.md`),
  },
  // voiceover.md
  {
    identifier: 'voiceover.md',
    input: fromAuroComponentRoot(`components/${config.component}/docs/partials/voiceover.md`),
    output: fromAuroComponentRoot(`components/${config.component}/demo/voiceover.md`),
  },
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

    await templateFiller.extractNames();

    for (const fileConfig of fileConfigs(config)) {
      // Skip files whose input doesn't exist for this component
      if (!existsSync(fileConfig.input)) {
        Logger.log(`Skipping ${fileConfig.identifier} — input file not found for ${config.component}`);
        continue;
      }

      try {
        const dependencies = componentDependencyTree[config.component];
        const components = componentTree[config.component];
        
        // Modify this section to format the components array for templating
        const formattedComponents = components.map(name => ({
          name,
          capitalizedName: name.charAt(0).toUpperCase() + name.slice(1)
        }));

        await processContentForFile({ 
          ...fileConfig, 
          extraVars: { 
            ...monorepoVars, 
            dependentComponents: dependencies, 
            componentList: formattedComponents,
            hasMultipleComponents: components.length > 1
          } 
        });

        // Resolve any AURO-GENERATED-CONTENT tags that were introduced by inlined partials.
        // These tags have empty content (START immediately followed by END) because markdown-magic
        // only runs one pass and doesn't process tags introduced during that same pass.
        if (fileConfig.output.endsWith('.md')) {
          const outputDir = path.dirname(fileConfig.output);
          let outputContents = await fs.readFile(fileConfig.output, 'utf8');
          const emptyTagPattern = /<!-- AURO-GENERATED-CONTENT:START \((FILE|CODE):src=([^)]+)\) -->\n<!-- AURO-GENERATED-CONTENT:END -->/g;
          let match;
          let modified = false;

          while ((match = emptyTagPattern.exec(outputContents)) !== null) {
            const [fullMatch, type, srcPath] = match;
            const resolvedPath = path.resolve(outputDir, srcPath);

            if (existsSync(resolvedPath)) {
              const fileContent = readFileSync(resolvedPath, 'utf8');
              let replacement;

              if (type === 'FILE') {
                replacement = `<!-- AURO-GENERATED-CONTENT:START (FILE:src=${srcPath}) -->\n<!-- The below content is automatically added from ${srcPath} -->\n${fileContent}\n<!-- AURO-GENERATED-CONTENT:END -->`;
              } else {
                // CODE: wrap in a fenced code block
                const ext = path.extname(srcPath).slice(1) || 'html';
                replacement = `<!-- AURO-GENERATED-CONTENT:START (CODE:src=${srcPath}) -->\n<!-- The below code snippet is automatically added from ${srcPath} -->\n\n\`\`\`${ext}\n${fileContent}\n\`\`\`\n<!-- AURO-GENERATED-CONTENT:END -->`;
              }

              outputContents = outputContents.replace(fullMatch, replacement);
              modified = true;
            }
          }

          if (modified) {
            await fs.writeFile(fileConfig.output, outputContents);
          }
        }
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
    // Copy README.md to component demo folder
    fs.copyFile(
      fromAuroComponentRoot(`components/${componentName}/README.md`),
      fromAuroComponentRoot(`components/${componentName}/demo/readme.md`)
    ).then(() => {
      Logger.log(`${componentName} README.md copied successfully`);
    }).catch(err => {
      Logger.error(`Error copying ${componentName} README.md: ${err.message}`);
    });
  }).
    catch((err) => {
      Logger.error(`Error processing docs: ${err.message}`);
  });
}

main();
