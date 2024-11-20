import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';

/*
  Starts dev servers with unique ports for all workspaces in the monorepo.

  It is intended to be used in conjunction with the `dev` script in the root
  package.json file.

  The script will read the package.json file for each workspace and extract the
  "dev" script. It then executes the script & assigns a unique port number.
  If the "dev" script is not found, the script will skip that workspace.

  This script avoids manually assigning ports to each workspace and ensures
  that each workspace has a unique port number. It also avoids port conflicts
  by killing any existing processes on the port before starting the server.
*/

// base port to start from
const BASE_PORT = 9001;

// get the build-tools directory path
const buildToolsDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = join(buildToolsDir, '..', '..', '..');

// get valid workspaces that have package.json and dev script
const getWorkspaces = () => {
  const workspaces = [];
  
  const checkAndReadDir = (dir) => {
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
      .filter(file => statSync(join(dir, file)).isDirectory())
      .filter(file => {
        // check if package.json exists and has a `dev` script
        const packageJsonPath = join(dir, file, 'package.json');
        if (!existsSync(packageJsonPath)) return false;
        
        try {
          const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
          return packageJson.scripts?.dev?.includes('web-dev-server');
        } catch {
          return false;
        }
      })
      .map(file => ({
        name: file,
        path: join(dir, file)
      }));
  };

  // get components with `dev` scripts
  const componentsDir = join(monorepoRoot, 'components');
  workspaces.push(...checkAndReadDir(componentsDir));

  return workspaces;
};

// get all valid workspaces
const workspaces = getWorkspaces();

console.log('Found workspaces with dev scripts:', workspaces.map(w => w.name).join(', '));

// kill any process on a port (Unix/Mac)
const killProcessOnPort = async (port) => {
  try {
    await spawn('lsof', ['-ti', `:${port}`], { stdio: 'pipe' })
      .on('exit', (code) => {
        if (code === 0) {
          spawn('kill', ['-9', `$(lsof -ti :${port})`], { shell: true });
        }
      });
  } catch (e) {
    // ignore errors - port might not be in use
  }
};

// start `dev` servers with incremental ports
const startDevServers = async () => {
  for (const [index, workspace] of workspaces.entries()) {
    const port = BASE_PORT + index;
    
    try {
      // kill any existing process on the port
      await killProcessOnPort(port);
      
      // wait a moment for the port to clear, avoid race conditions
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const packageJson = JSON.parse(
        readFileSync(join(workspace.path, 'package.json'), 'utf-8')
      );
      const devCommand = packageJson.scripts.dev;
      
      // add or replace port in command
      const commandWithPort = devCommand.includes('--port')
        ? devCommand.replace(/--port\s+\d+/, `--port ${port}`)
        : `${devCommand} --port ${port}`;
      
      console.log(`Starting ${workspace.name} on port ${port}`);
      console.log(`Command: ${commandWithPort}`);
      
      // split command into program and args
      const [cmd, ...args] = commandWithPort.split(' ');
      
      // spawn process
      const child = spawn(cmd, args, {
        stdio: 'inherit',
        shell: true,
        cwd: workspace.path,
        env: { ...process.env, PORT: port.toString() }
      });

      child.on('error', (error) => {
        console.error(`Error starting ${workspace.name}:`, error);
      });
      
      // add small delay between starting servers, avoid race conditions
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (e) {
      console.error(`Error starting ${workspace.name}:`, e.message);
    }
  }
};

// run the servers
startDevServers().catch(console.error);