/* eslint-disable no-underscore-dangle */

import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      'node_modules/**',
      'components/**/*Version.js',
      'components/**/apiExamples/**',
      'components/**/test/**/*',
      'components/**/demo/**/*',
      'components/**/dist/**/*',
      "components/**/vendor/**"
    ]
  },
  ...fixupConfigRules(compat.extends("@aurodesignsystem/eslint-config")),
  {
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module'
    }
  }
];
