module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {},
      extends: ['prettier', 'plugin:prettier/recommended'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/dot-notation': 'warn',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            overrides: {
              constructors: 'off',
            },
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/no-inferrable-types': 'off',
      },
    },
  ],
};
