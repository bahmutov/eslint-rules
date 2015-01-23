// detect if object with multiple properties is written in single line
// For example this is confusing `margins: {top: 20, bottom: 20, left: 20, right: 90}`
/* global module */
module.exports = function (context) {
  'use strict';

  return {
    ObjectExpression: function (node) {
      var nProperties = node.properties.length;
      if (nProperties > 1) {
        var nLines = node.loc.end.line - node.loc.start.line;
        if (nLines < nProperties) {
          context.report(node, 'too many object properties (' + nProperties +
            ') written in ' + (nLines + 1) + ' line(s)');
        }
      }
    }
  };
};
