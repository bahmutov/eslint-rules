function isFunction(node) {
  return node.type === 'FunctionExpression';
}

function isSingleCall(node) {
  return node.body &&
    node.body.type === 'BlockStatement' &&
    node.body.body.length === 1 &&
    node.body.body[0].type === 'ExpressionStatement' &&
    node.body.body[0].expression.type === 'CallExpression';
}

function hasSameArguments(node) {
  var topArguments = node.params;
  var innerArguments = node.body.body[0].expression.arguments;

  return topArguments.length === innerArguments.length &&
    topArguments.every(function (arg, k) {
      return innerArguments[k].name === arg.name;
    });
}

function isPotentialPointFree(node) {
  return isFunction(node) &&
    isSingleCall(node) &&
    hasSameArguments(node);
}

module.exports = function (context) {
  'use strict';

  // read http://bahmutov.calepin.co/point-free-programming-is-not-pointless.html
  // for advantages of point-free programming

  return {
    FunctionExpression: function (node) {
      // console.log('function expression', node.id && node.id.name);

      if (isPotentialPointFree(node)) {
        // console.log('potential point-free candidate', node.id && node.id.name);
        // console.log(node.body.body[0].expression.arguments);
        context.report(node, node.id && node.id.name || 'function' + ' could potentially be point-free');
      }
    }
  };
};
