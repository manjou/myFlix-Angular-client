import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { rules } from "eslint-plugin-tsdoc";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: [
      "@typescript-eslint",
      "prettier",
      "eslint-plugin-tsdoc"
    ],
    rules: {
      "tsdoc/syntax": "warn"
    }
  }
];

