module.exports = function (context) {
  'use strict';
  return {
    Function: function (node) {
      context.report(node, 'for loops are not allowed', { identifier: node.name });
    }
  };
};
