'use strict';

var espree = require('espree');
var quote = require('quote');

function isJshint(text) {
  return /^jshint\ /.test(text);
}

function isSingleWord(text) {
  return /^[\w-]*$/.test(text);
}

function isValidCode(text) {
  if (isSingleWord(text) || isJshint(text)) {
    return false;
  }
  try {
    var ast = espree.parse(text, { ecmaVersion: 2022 });
    return !!ast;
  } catch (err) {
    return false;
  }
}

function firstLine(str) {
  return str.split('\n')[0];
}

function cut(str) {
  var line = firstLine(str);
  var MAX_LENGTH = 20;
  if (line.length > MAX_LENGTH) {
    line = line.substr(0, MAX_LENGTH) + ' ...';
  }
  return line;
}

module.exports = {
  meta: {
    type: 'suggestion',
    schema: []
  },
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        comments
          .filter(function (comment) {
            return isValidCode(comment.value.trim());
          })
          .forEach(function (commentedCode) {
            var code = cut(commentedCode.value.trim());
            var lines = commentedCode.loc.end.line - commentedCode.loc.start.line + 1;
            var linesMsg = '(' + lines + ' line' + (lines === 1 ? '' : 's') + ')';
            context.report({
              loc: commentedCode.loc,
              message: 'commented out code ' + quote(code) + ' ' + linesMsg
            });
          });
      }
    };
  }
};
