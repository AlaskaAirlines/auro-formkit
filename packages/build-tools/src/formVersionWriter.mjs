import { readFile, mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Writes a version file for the specified dependency package.
 * Supports workspace and node_modules packages.
 * @param {string} pkg Dependency to write version file for
 * @returns {Promise<void>}
 */
export async function writeDepVersionFile(pkg) {
  const auroSubNameIndex = 5;
  
  // Function to find package.json path with workspace support
  async function findPackageJson(packageName) {
    // List of possible locations to check
    const possiblePaths = [
      // Direct workspace path
      resolve(process.cwd(), '..', packageName.replace('@auro-formkit/', ''), 'package.json'),
      // Workspace root node_modules
      resolve(process.cwd(), '../../node_modules', packageName, 'package.json'),
      // Component-level node_modules
      resolve(process.cwd(), 'node_modules', packageName, 'package.json'),
      // Try monorepo packages directory if it exists
      resolve(process.cwd(), '../../packages', packageName.replace('@auro-formkit/', ''), 'package.json')
    ];

    for (const path of possiblePaths) {
      if (existsSync(path)) {
        return path;
      }
    }

    throw new Error(`Could not find package.json for ${packageName} in any of the expected locations`);
  }

  try {
    // Get package.json path
    const packagePath = await findPackageJson(pkg);
    console.log(`Found package.json at: ${packagePath}`);
    
    // Read and parse package.json
    const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
    const { version } = packageJson;

    // Calculate paths
    const elemSubName = pkg.substring(pkg.indexOf('auro-') + auroSubNameIndex);
    const callerPath = fileURLToPath(import.meta.url);
    const pathParts = callerPath.split('/');
    const componentsIndex = pathParts.indexOf('components');
    const componentName = componentsIndex !== -1 ? pathParts[componentsIndex + 1] : null;
    const basePath = componentName
      ? `components/${componentName}/src`
      : 'src';
    const versionFilePath = `./${basePath}/${elemSubName}Version.js`;
    
    console.log(`Writing version file to: ${versionFilePath}`);

    // Ensure directory exists
    const directory = dirname(versionFilePath);
    if (!existsSync(directory)) {
      await mkdir(directory, { recursive: true });
    }

    // Write version file
    const fileContent = `export default '${version}';\n`;
    await writeFile(versionFilePath, fileContent);
    
    console.log(`Successfully wrote version file for ${pkg}`);
  } catch (error) {
    console.error(`Error processing ${pkg}:`, error);
    throw error;
  }
}
