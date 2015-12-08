gt.module('is constant fn');

var isConstant = require('../src/is-constant')

gt.test('just caps', function () {
  gt.ok(!isConstant('foo'));
  gt.ok(isConstant('FOOBAR'));
});

gt.test('caps with underscores', function () {
  gt.ok(isConstant('FOO_BAR'));
});

gt.test('caps with underscores and numbers', function () {
  gt.ok(isConstant('FOO5_BAR'));
});

gt.test('cannot start with a number', function () {
  gt.ok(!isConstant('5FOO'));
});
