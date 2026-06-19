'use strict';

module.exports = {
  meta: {
    type: 'suggestion',
    schema: []
  },
  create(context) {
    function report(node) {
      context.report({ node, message: 'for loops are not allowed' });
    }

    return {
      ForStatement: report,
      ForInStatement: report,
      ForOfStatement: report
    };
  }
};
