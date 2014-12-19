'use strict';

/* eslint potential-point-free:1 */
function print(x) {
  console.log(x);
}
[1, 2, 3].forEach(function printX(x) {
  print(x);
});

function add(x, y) {
  return x + y;
}

var result = (function addThem(x, y) {
  add(x, y);
}(2, 3));
console.assert(result === 5);

// not potential point-free
result = (function add2(x) {
  add(x, 2);
}(2));
console.assert(result === 4);
