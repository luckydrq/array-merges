# array-merges
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Merge arrays into one.

## Example
```javascript
var merge = require('array-merges');
var arr = merge([{a: 1}], [{a: 1}], {
  equal: function(prev, next) {
    return prev.a === next.a;
  },
  onMerge: function(prev, next) {
    return [prev, next];
  }
});
console.log(arr); // [{a: 1}, {a: 1}]
```
## Options
- options.equal: Define equal logic between two elements. Use
  strict equal mode by default(as below).
```js
function (prev, next) {
  return prev === next;
}
```

- options.onMerge: Define the merge result between two
  elements that are equal. Returns first element by default(as below).
```js
function(prev, next) {
  return [prev];
}
```
## Lisence
MIT

[npm-image]: https://img.shields.io/npm/v/array-merges.svg?style=flat-square
[npm-url]: https://npmjs.org/package/array-merges
[travis-image]: https://img.shields.io/travis/luckydrq/array-merges/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/luckydrq/array-merges
[coveralls-image]: https://img.shields.io/coveralls/luckydrq/array-merges/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/luckydrq/array-merges?branch=master
