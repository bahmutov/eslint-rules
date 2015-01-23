module.exports = function (context) {
  'use strict';

  console.log('no-long-files called');
  var src = require('fs').readFileSync(context.getFilename(), 'utf-8');
  var linesN = src.split(require('os').EOL).length;
  console.log(context.getFilename(), 'has', linesN, 'lines');

  var limit = context.options[0] || 200;

  if (linesN > limit) {
    console.log(linesN + ' exceeded line limit', limit);
  }

  return {};
};
