import { addons } from 'storybook/manager-api';
import {
  defaultConfig,
  type TagBadgeParameters,
} from 'storybook-addon-tag-badges/manager-helpers';
 
addons.setConfig({
  sidebar: {
    showRoots: false,
  },
  tagBadges: [
    {
      tags: 'chromatic-enabled',
      badge: {
        text: 'Snapshot',
        style: {
          backgroundColor: 'rgba(71, 157, 255, 0.07)',
          color: '#FC521F',
          fontWeight: 'bold',
        },
        tooltip: 'This story is included in Chromatic visual testing',
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});