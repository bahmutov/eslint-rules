var espree = require('espree');
var quote = require('quote');

function isValidCode(text) {
  'use strict';
  try {
    var ast = espree.parse(text);
    return !!ast;
  } catch (err) {
    return false;
  }
}

function firstLine(str) {
  'use strict';
  return str.split('\n')[0];
}

function cut(str) {
  'use strict';
  var line = firstLine(str);
  var MAX_LENGTH = 20;
  if (line.length > MAX_LENGTH) {
    line = line.substr(0, MAX_LENGTH) + ' ...';
  }
  return line;
}

module.exports = function (context) {
  'use strict';

  var comments = context.getAllComments();

  comments.filter(function (comment) {
    return isValidCode(comment.value);
  }).forEach(function (commentedCode) {
    var code = cut(commentedCode.value.trim());
    var lines = commentedCode.loc.end.line - commentedCode.loc.start.line + 1;
    var linesMsg = '(' + lines + ' line' + (lines === 1 ? '' : 's') + ')';
    context.report({
      loc: commentedCode.loc
    }, 'commented out code ' + quote(code) + ' ' + linesMsg);
  });

  return {};
};
