module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
    extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended', // <-- adds Prettier support
    ],
  rules: {
    'no-console': 'warn',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/max-attributes-per-line': ['error', { 'singleline': 3 }],
  },
}
