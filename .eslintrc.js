module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  plugins: ['react'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    quotes: ['single'],
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'import/export': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
};
