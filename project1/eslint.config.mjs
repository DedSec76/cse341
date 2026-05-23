import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier"

export default defineConfig([
  { files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
    },
  },

  prettierConfig,
]);
