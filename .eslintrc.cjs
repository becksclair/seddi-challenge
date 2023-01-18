module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript'
    ],
    ignorePatterns: ['.eslintrc.cjs'],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
    },
    plugins: [
        '@typescript-eslint',
        'react'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        indent: "off",
        danglingCommas: "off",
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/indent": ["warn", 4],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        eqeqeq: "off",
        "no-multiple-empty-lines": "off",
        "no-multi-spaces": "off",
        "brace-style": ["error", "stroustrup"],
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/brace-style": "off",
    }
}
