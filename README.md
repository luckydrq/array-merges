# array-merge
Merge arrays under strategy

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

- options.equal: Function used to make comparation. Default is
```javascript
function (prev, next) {
  return prev === next;
}
```

- options.onMerge: Hook that determines the merge result between two
  elements that are judged as equal. Default is
```javascript
function(prev, next) {
  return [prev];  // abandon dulicate element
}
```
## Lisence
MIT
