'use strict';

const plugin = require('./index.js');

module.exports = [
  {
    plugins: {
      'extra-rules': plugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      camelcase: 0,
      'extra-rules/camel_case': 1,
      'no-unused-vars': 0,
      'no-underscore-dangle': 0,
      'extra-rules/no-for-loops': 1,
      'extra-rules/no-long-files': [2, 70]
    }
  }
];
