// eslint.config.js
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            '*.config.js?(x)',
            '*.d.ts',
            '**/*.js',
            'vite.config.ts',
            'vitest.config.ts'
        ]
    },
    // базовые правила JS
    eslint.configs.recommended,

    // базовые правила TypeScript
    ...tseslint.configs.recommended,

    // Prettier для отключения конфликтов
    prettier,

    {
        plugins: {
            import: importPlugin
        },
        rules: {
            // TypeScript rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

            // Import rules
            'import/prefer-default-export': 'off',
            'import/no-default-export': 'off',
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        {
                            pattern: '@{app,pages,widgets,features,entities,shared}/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: './**/*.scss',
                            group: 'index',
                            position: 'after'
                        }
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    'newlines-between': 'always'
                }
            ],

            // General rules
            'no-console': 'off',
            'no-nested-ternary': 'off',
            'no-param-reassign': 'off',
            'no-plusplus': 'off',
            'no-restricted-syntax': 'off',
            'no-underscore-dangle': 'off'
        }
    }
];
