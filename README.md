# eslint-plugin-extra-rules

> Additional rules for eslint

[![NPM][eslint-rules-icon] ][eslint-rules-url]

[![Build status][eslint-rules-ci-image] ][eslint-rules-ci-url]
[![dependencies][eslint-rules-dependencies-image] ][eslint-rules-dependencies-url]
[![devdependencies][eslint-rules-devdependencies-image] ][eslint-rules-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)

## Install

    npm install --save-dev eslint-plugin-extra-rules

## Example Configuration

Add to your `.eslintrc`:

``` js
{
    "plugins": ["extra-rules"],
    "rules": {
        "extra-rules/no-commented-out-code": "warn",
        // Your other rules...
    }
}
```

## Rules

### no-commented-out-code

> Detects code in the single or multiline comments

```js
/* eslint extra-rules/no-commented-out-code: "warn" */
/*
function foo() {
  return 'foo';
}*/
// this is normal comment
function baz() {
  'use strict';
  // and this is another normal comment
  // var bar = 'bar';
  return 'baz';
}
```

Produces the following output:

     2:0  warning  commented out code "function foo() {" (4 lines)  no-commented-out-code
    10:2  warning  commented out code "var bar = 'bar';" (1 line)   no-commented-out-code

### no-long-files

> Detect source files with too many lines

    first argument: rule severity (0 - no check, 1 - warning, 2 - error)
    second argument: max number of allowed lines
    "no-long-files": [2, 70]

Prints something like

    potential-point-free.js
      0:0  error  file line count 51 exceeded line limit 50  no-long-files

### camel_case

> ESLint rule for enforcing camelCame names but allowing _ in property names

We want to use camelCase in variable names, but want to still allow
underscores in JSON objects:

    var goodObject = {
      property_name: 1,
      another_property: 2
    };

[jshint](http://jshint.com/docs/) has *camelcase* rule that forces EVERY name
to be camelCased

    $ jshint index.js
    index.js: line 2, col 0, Identifier 'property_name' is not in camel case.
    index.js: line 3, col 0, Identifier 'another_property' is not in camel case.
    2 errors

There are manual workarounds:

* disable this specific rule using `// jshint ignore:lint` or `// jshint -W106`
* write property names using quotes, for example `'property_name': 1`

Both workarounds are hacky.

I wrote a more flexible rule called [camel_case](camel_case.js)
for [eslint](https://github.com/eslint/eslint). The rule looks one character *after*
the identifier to see if it is followed by colon `:` character.
If yes, this is a property name inside an object, and underscore character `_` is allowed.

### no-for-loops

Warns or errors if you use for loops in your code. I consider for loops harmful for their side effects,
and even consider `.forEach` dangerous, see [Avoid forEach][avoid forEach].

### no-single-line-objects

Does not allow you to nest objects into single line. Single property object can be single line

```js
// allowed
var foo = { foo: 'foo' };
// not allowed
var foo = { foo: 'foo', bar: 'bar' };
var foo = { foo: { bar: 'bar' } };
```

### potential-point-free

Warns if a function just calls another function passing arguments and can potentially
become point-free. Point-free programming [eliminates complexity and superfluous variables][point-free].
Only functions with single call expression are considered. The arguments must match exactly.

```js
/* eslint extra-rules/potential-point-free: "warn" */
function print(x) {
  console.log(x);
}
[1, 2, 3].forEach(function printX(x) {
  print(x);
});
// output 7:18  warning  printX   potential-point-free
```

Note: due to signatures and optional arguments, sometimes functions should not be point free directly.
For example the array iterators pass item, index and the array itself, which causes problems for `parseInt`

```js
['1', '2', '3'].forEach(parseInt);
// [1, 'NaN', 'NaN']
```

In this case, you can use [unary adaptor](http://glebbahmutov.com/blog/iterator-callbacks/) or
3rd party iterator with simpler signature, [R.forEach](http://ramdajs.com/docs/R.html#forEach).

## Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/eslint-rules/issues) on Github


## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[eslint-rules-icon]: https://nodei.co/npm/eslint-plugin-extra-rules.png?downloads=true
[eslint-rules-url]: https://npmjs.org/package/eslint-plugin-extra-rules
[eslint-rules-ci-image]: https://travis-ci.org/bahmutov/eslint-rules.png?branch=master
[eslint-rules-ci-url]: https://travis-ci.org/bahmutov/eslint-rules
[eslint-rules-dependencies-image]: https://david-dm.org/bahmutov/eslint-rules.png
[eslint-rules-dependencies-url]: https://david-dm.org/bahmutov/eslint-rules
[eslint-rules-devdependencies-image]: https://david-dm.org/bahmutov/eslint-rules/dev-status.png
[eslint-rules-devdependencies-url]: https://david-dm.org/bahmutov/eslint-rules#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[avoid forEach]: http://aeflash.com/2014-11/avoid-foreach.html
[point-free]: http://glebbahmutov.com/blog/point-free-programming-is-not-pointless/
