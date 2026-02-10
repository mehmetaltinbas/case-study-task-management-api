import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    tseslint.configs.recommended,
    {
        rules: {
            eqeqeq: 'error',
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-unused-vars': 'off',
            curly: 'error',
            'no-undef': 'error',
            'no-redeclare': 'error',
            'no-unreachable': 'error',
            semi: ['error', 'always'],
            quotes: ['warn', 'single'],
            indent: ['off', 4],
            'comma-dangle': ['off', 'never'],
            '@typescript-eslint/no-unused-vars': ['off'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-inferrable-types': 'warn',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/ban-ts-comment': 'warn',
        },
    },
]);
