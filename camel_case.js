'use strict';

var isConstant = require('./src/is-constant');

module.exports = {
  meta: {
    type: 'suggestion',
    schema: []
  },
  create(context) {
    const sourceCode = context.sourceCode;

    function isFrontOrBackUnderscore(str) {
      var k = str.indexOf('_');
      if (k === 0 || k === str.length - 1) {
        return true;
      }
      k = str.lastIndexOf('_');
      if (k === str.length - 1) {
        return true;
      }
      return false;
    }

    return {
      Identifier(node) {
        var nameWithMaybeColon = sourceCode.getText(node, 0, 1);
        if (nameWithMaybeColon[nameWithMaybeColon.length - 1] !== ':') {
          if (nameWithMaybeColon.indexOf('_') !== -1) {
            var justName = node.name.trim();
            if (isConstant(justName)) {
              return;
            }
            if (isFrontOrBackUnderscore(justName)) {
              return;
            }
            context.report({
              node,
              message: '`{{identifier}}` : _ in names only allowed in properties',
              data: { identifier: node.name }
            });
          }
        }
      }
    };
  }
};
