'use strict';

/* globals module */
module.exports = function(context) {

  return {
    ForStatement: function(node) {
      context.report(node, "for loops are not allowed", { identifier: node.name });
    }
  };
};
