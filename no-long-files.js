'use strict';

module.exports = {
  meta: {
    type: 'suggestion',
    schema: [{ type: 'number' }]
  },
  create(context) {
    var src = require('fs').readFileSync(context.filename, 'utf-8');
    var linesN = src.split(require('os').EOL).length;

    var limit = parseInt(context.options[0]);
    if (limit > 0 && linesN > limit) {
      context.report({
        loc: { start: { line: 1, column: 0 } },
        message: 'file line count ' + linesN + ' exceeded line limit ' + limit
      });
    }

    return {};
  }
};
