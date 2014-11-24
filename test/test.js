gt.module('constant names');

var allCaps = /^[A-Z]+$/;
var allCapsWithUnderScore = /^[A-Z_]+$/;

gt.test('just caps', function () {
  gt.ok(!allCaps.test('foo'));
  gt.ok(allCaps.test('FOOBAR'));
  gt.ok(!allCaps.test('FOO_BAR'));
});

gt.test('caps with _', function () {
  gt.ok(!allCapsWithUnderScore.test('foo'));
  gt.ok(allCapsWithUnderScore.test('FOOBAR'));
  gt.ok(allCapsWithUnderScore.test('FOO_BAR'));
  gt.ok(allCapsWithUnderScore.test('F'));
  gt.ok(allCapsWithUnderScore.test('_'));
  gt.ok(!allCapsWithUnderScore.test('_foo'));
  gt.ok(allCapsWithUnderScore.test('STUDY_CONDITIONS_URL'));
});
