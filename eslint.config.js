import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import eslintConfigLove from 'eslint-config-love'
import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default [
  {
    ignores: ['dist/'],
  },
  {
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.jsx', '**/*.js', '**/*.ts', '**/*.tsx'],
    ...eslintConfigLove,
  },
  {
    files: ['**/*.jsx', '**/*.js', '**/*.ts', '**/*.tsx'],
    ...pluginReactConfig,
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@stylistic/array-bracket-newline': ['error', { 'multiline': true }],
      '@stylistic/array-element-newline': ['error', { 'consistent': true, 'multiline': true }],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      '@stylistic/keyword-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/member-delimiter-style': ['error', { 'multiline': { 'delimiter': 'none' }, 'singleline': { 'delimiter': 'comma' } }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-newline': ['error', { 'consistent': true, 'multiline': true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }],
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      'array-bracket-spacing': ['error', 'never'],
      'arrow-body-style': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'complexity': 'off',
      'eslint-comments/require-description': 'off',
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'max-lines': 'off',
      'max-nested-callbacks': ['error', 5],
      'no-console': 'warn',
      'no-misused-spread': 'off',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'caughtErrorsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      'promise/avoid-new': 'off',
      'react/function-component-definition': ['error', { 'namedComponents': 'function-declaration', 'unnamedComponents': 'arrow-function' }],
      'react/jsx-curly-spacing': ['error', { 'when': 'never', 'children': true }],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-wrap-multilines': ['error', { 'prop': 'parens-new-line' }],
      'react/react-in-jsx-scope': 'off',
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
    },
  },
]
