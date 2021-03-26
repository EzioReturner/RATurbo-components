module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'react/require-default-props': 0,
    'no-plusplus': 0,
    'no-unused-expressions': 0,
    'no-loop-func': 0,
    'no-underscore-dangle': 0,
    'no-restricted-globals': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/no-array-index-key': 1,
    '@typescript-eslint/camelcase': 0,
    'no-nested-ternary': 1,
    'import/no-unresolved': 0,
    'prefer-rest-params': 1,
    'no-lone-blocks': 1,
    'import/no-extraneous-dependencies': 1
  },
};
