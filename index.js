/* eslint-disable */
require('console-assert').browserify()

module.exports = {
  rules: {
    "camel_case": require('./camel_case'),
    "no-commented-out-code": require('./no-commented-out-code'),
    "no-for-loops": require('./no-for-loops'),
    "no-long-files": require('./no-long-files'),
    "no-single-line-objects": require('./no-single-line-objects'),
    "potential-point-free": require('./potential-point-free')
  }
}
