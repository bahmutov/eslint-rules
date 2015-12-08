var isConstant = require('./src/is-constant');

module.exports = function camelCase(context) {
  'use strict';

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
    Identifier: function (node) {
      var nameWithMaybeColon = context.getSource(node, 0, 1);
      if (nameWithMaybeColon[nameWithMaybeColon.length - 1] !== ':') {
        if (nameWithMaybeColon.indexOf('_') !== -1) {

          // allow constants FOO_BAR with all caps to use _
          var justName = node.name.trim();
          if (isConstant(justName)) {
            return;
          }

          // allow dangling underscore at the front or back only
          if (isFrontOrBackUnderscore(justName)) {
            return;
          }

          context.report(node, '`{{identifier}}` : _ in names only allowed in properties', {
            identifier: node.name
          });
        }
      }
    }
  };
};
