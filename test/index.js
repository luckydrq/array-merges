'use strict';

var assert = require('assert');
var merge = require('..');

describe('test', function() {
  it('should only support array', function() {
    var shouldThrowError1 = false;
    var shouldThrowError2 = false;
    var shouldThrowError3 = false;
    var shouldThrowError4 = false;
    var shouldThrowError5 = false;
    try {
      merge(1, 2);
    } catch(e) {
      shouldThrowError1 = true;
    }
    try {
      merge('1', '2');
    } catch(e) {
      shouldThrowError2 = true;
    }
    try {
      merge(true, false);
    } catch(e) {
      shouldThrowError3 = true;
    }
    try {
      merge(null, null);
    } catch(e) {
      shouldThrowError4 = true;
    }
    try {
      merge(undefined, undefined);
    } catch(e) {
      shouldThrowError5 = true;
    }
    assert.equal(shouldThrowError1, true);
    assert.equal(shouldThrowError2, true);
    assert.equal(shouldThrowError3, true);
    assert.equal(shouldThrowError4, true);
    assert.equal(shouldThrowError5, true);
  });

  it('should provide default equal and merge', function() {
    var arr = merge([1, 2], [2, 3]);
    assert.equal(arr[0], 1);
    assert.equal(arr[1], 2);
    assert.equal(arr[2], 3);
    var arr2 = merge([{a: 1}], [{a: 1}]);
    assert.equal(arr2.length, 2);
    assert.equal(arr2[0].a, 1);
    assert.equal(arr2[1].a, 1);
  });

  it('should support defined equal', function() {
    var arr = merge([{a: 1}], [{a: 1}], {
      equal: function(prev, next) {
        return prev.a === next.a;
      }
    });
    assert.equal(arr.length, 1);
    assert.equal(arr[0].a, 1);
  });

  it('should support defined onMerge', function() {
    var arr = merge([1], [1, 2], {
      onMerge: function(prev, next) {
        return [prev, next];
      }
    });
    assert.equal(arr.length, 3);
    assert.equal(arr[0], 1);
    assert.equal(arr[1], 1);
    assert.equal(arr[2], 2);
  });
});
