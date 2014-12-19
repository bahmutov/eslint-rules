'use strict';

/* globals module */
module.exports = function(context) {

  return {
    Function: function(node) {
      context.report(node, "for loops are not allowed", { identifier: node.name });
    }
  };
};
