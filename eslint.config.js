import js from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import prettierConfig from "eslint-config-prettier";

export default tsEslint.config(
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.astro/**"],
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  prettierConfig
);
