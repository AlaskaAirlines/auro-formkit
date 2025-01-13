import { AuroMenu } from './auro-menu.js';
import { AuroMenuOption } from './auro-menuoption.js';

AuroMenu.register();
AuroMenuOption.register();

// Enable TypeScript support
export { AuroMenu, AuroMenuOption };

export {
  arrayConverter,
  arrayOrUndefinedHasChanged,
  isOptionInteractive,
  dispatchMenuEvent
} from './auro-menu-utils.js';
