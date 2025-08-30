export default [
    js.configs.recommended,
    {
        root: true,
        extends: ['airbnb', 'airbnb-typescript', 'plugin:prettier/recommended', 'plugin:react-hooks/recommended'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: ['./tsconfig.json', './config/tsc/tsconfig.node.json']
        },
        plugins: ['@typescript-eslint'],
        reportUnusedDisableDirectives: true,
        rules: {
            // TypeScript rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

            // Import rules
            'import/prefer-default-export': 'off',
            'import/no-default-export': 'error',
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
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    }
                }
            ],

            // General rules
            'no-console': 'error',
            'no-nested-ternary': 'off',
            'no-param-reassign': 'off',
            'no-plusplus': 'off',
            'no-restricted-syntax': 'off',
            'no-underscore-dangle': 'off',

            // React rules
            'react/destructuring-assignment': 'off',
            'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
            'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
            'react/no-danger': 'error',
            'react/require-default-props': 'off',
            'react/react-in-jsx-scope': 'off'
        },
        ignorePatterns: [
            'dist',
            'node_modules',
            '*.config.js?(x)',
            '*.d.ts',
            '*.js',
            'vite.config.ts',
            'vitest.config.ts',
            'babel.config.test.cjs'
        ]
    }
];
