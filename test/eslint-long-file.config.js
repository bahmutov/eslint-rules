'use strict';

const plugin = require('../index.js');

module.exports = [
  {
    plugins: {
      'extra-rules': plugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs'
    },
    rules: {
      'extra-rules/no-long-files': [1, 100]
    }
  }
];
