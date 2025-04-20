import js from '@eslint/js';
import importPlugin from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import * as reactHooks from 'eslint-plugin-react-hooks';
import tseslint from "typescript-eslint";
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    configPrettier,
    {
        files: ["src/**/*.{ts,tsx}"],
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
        rules: {
          ...js.configs.recommended.rules,
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
        },
    },
    {
        files: ["src/**/*.{ts,tsx}"],
        rules: {
          ...tseslint.configs.recommended.rules,
          ...tseslint.configs.strict.rules,
          ...tseslint.configs.stylistic.rules,
          "@typescript-eslint/explicit-member-accessibility": "error",
          "@typescript-eslint/class-methods-use-this": "error",
          "@typescript-eslint/no-use-before-define": "error",
          "@typescript-eslint/no-unused-vars": "error",
        }
    },
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        ...pluginJsxA11y.configs.recommended.rules,
        "jsx-a11y/label-has-associated-control": ["error", {
          "controlComponents": ["Field"],
          "required": {
            "some": ["nesting"]
          }
        }],
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      settings: {
        react: {
          version: "detect"
        }
      },
      ...reactPlugin.configs.flat.recommended,
      rules: {
        ...reactPlugin.configs.flat.recommended.rules,
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [
          "error",
          {
            "extensions": [".jsx", ".tsx"]
          }
        ],
      }
    },
    {
      files: ['**/*.{ts,tsx}'],
      ...importPlugin.flatConfigs.recommended,
      rules: {
        ...importPlugin.flatConfigs.rules,
        "import/no-unresolved": "off",
        "import/extensions": [
          "off",
          "ignorePackages",
          {
            "ts": "never",
            "tsx": "never",
            "js": "never",
            "jsx": "never"
          }
        ],
      }
    },
    {
        ignores: ["**/*.config.mjs", "**/public/*", ".prettierrc.js", "**/dev-dist/*", "**/build/*", "vite.config.ts", "**/node_modules/*"],
    }
];

  