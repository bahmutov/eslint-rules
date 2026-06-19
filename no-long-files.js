module.exports = {
  meta: {
    docs: {},
    schema: [] // TODO: Define schema - this rule uses context.options
  },
  create: function (context) {
  'use strict';

  // TODO use context.getSourceLines()
  var src = require('fs').readFileSync(context.filename ?? context.getFilename(), 'utf-8');
  var linesN = src.split(require('os').EOL).length;
  // console.log(context.getFilename(), 'has', linesN, 'lines');

  var limit = parseInt(context.options[0]);
  if (limit > 0 && linesN > limit) {
    context.report({
      loc: {
        start: { line: 0 }
      }
    }, 'file line count ' + linesN + ' exceeded line limit ' + limit);
  }

  return {};
}
};
