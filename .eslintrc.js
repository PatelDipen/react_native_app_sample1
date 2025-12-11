module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        printWidth: 100,
        endOfLine: 'lf',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
  },
};
