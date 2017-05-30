function isConstant(str) {
  var allCapsWithUnderScore = /^[A-Z_][A-Z_\d]*$/;
  return allCapsWithUnderScore.test(str);
}

module.exports = isConstant;
