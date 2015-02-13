var espree = require('espree');
var quote = require('quote');

function isJshint(text) {
  'use strict';
  return /^jshint\ /.test(text);
}
console.assert(isJshint('jshint -W098'));
console.assert(!isJshint('not jshint'));

function isSingleWord(text) {
  'use strict';
  return /^[\w-]*$/.test(text);
}
console.assert(isSingleWord('fooBar'));
console.assert(isSingleWord(''));
console.assert(isSingleWord('click'));
console.assert(isSingleWord('browser-specific'));
console.assert(!isSingleWord('var bar'));

function isValidCode(text) {
  'use strict';
  if (isSingleWord(text) || isJshint(text)) {
    return false;
  }

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
    return isValidCode(comment.value.trim());
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
