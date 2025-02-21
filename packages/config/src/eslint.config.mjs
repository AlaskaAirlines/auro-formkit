import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

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
...compat.extends("@aurodesignsystem/eslint-config")
];
