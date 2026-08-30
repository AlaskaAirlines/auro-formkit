import { deprecatedProseToFieldPlugin } from '@aurodesignsystem/auro-library/scripts/build/deprecatedProseToFieldPlugin.mjs';

export default {
  globs: ['components/**/src/*.js'],
  exclude: [
    'components/**/src/**/*.stories.ts',
    'components/**/dist/**/*.js'
  ],
  litelement: true,
  plugins: [deprecatedProseToFieldPlugin()]
};
