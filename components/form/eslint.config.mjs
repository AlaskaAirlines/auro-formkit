import auroConfig from '@auro-formkit/config/eslint';
import storybook from 'eslint-plugin-storybook';

export default [
  ...auroConfig,
  ...storybook.configs['flat/recommended']
];
