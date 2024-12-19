import { AuroCounter } from './auro-counter.js';
import { AuroCounterGroup } from './auro-counter-group.js';
import { AuroCounterButton } from './auro-counter-button.js';

AuroCounter.register();
AuroCounterGroup.register();
AuroCounterButton.register();

// Enable TypeScript support
export { AuroCounter, AuroCounterGroup, AuroCounterButton };
