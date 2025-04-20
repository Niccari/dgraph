import js from '@eslint/js';
import importPlugin from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from "typescript-eslint";
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
  },
  {
    ignores: ["**/*.config.mjs", "**/public/*", ".prettierrc.js", "**/dev-dist/*", "**/build/*", "vite.config.ts", "**/node_modules/*"],
  },
  {
    plugins: {
      "jsx-a11y": pluginJsxA11y,
      "react-hooks": reactHooks,
      "react": reactPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2023,
      },
      parserOptions: {
        sourceType: "module",
        project: ["tsconfig.json"],
       },
    },
  },
  {
    settings: {
      react: {
        version: "detect"
      }
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  configPrettier,
  {
    rules: {
      "max-len": ["warn", {
        code: 120,
        ignoreUrls: true,
        ignoreComments: true
      }],
      "class-methods-use-this": "off",
      "no-use-before-define": "off",
      "no-unused-vars": "off",
      "no-redeclare": "off",
      "lines-between-class-members": [
        "error",
        "always",
        {
          "exceptAfterSingleLine": true
        }
      ],
      "no-void": [
        "error",
        {
          "allowAsStatement": true
        }
      ],
      "no-param-reassign": "error",
      "semi": "error",
      "jsx-a11y/label-has-associated-control": ["error", {
        "controlComponents": ["Field"],
        "required": {
          "some": ["nesting"]
        }
      }],
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/class-methods-use-this": "error",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        "error",
        {
          "extensions": [".jsx", ".tsx"]
        }
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": "error",
      "import/no-unresolved": "off",
    },
  },
];
