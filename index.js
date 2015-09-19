'use strict';

var assert = require('assert');

module.exports = function(arr1, arr2, opts) {
  assert(Array.isArray(arr1));
  assert(Array.isArray(arr2));

  opts = opts || {};
  var equal = opts.equal || defaultEqual;
  var onMerge = opts.onMerge || defaultOnMerge;
  assert(typeof equal === 'function');
  assert(typeof onMerge === 'function');

  var list = [];
  // copy from arr1
  for (var k = 0; k < arr1.length; k++) {
    list[k] = new Node(arr1[k]);
  }

  for (var i = 0; i < arr2.length; i++) {
    var next = arr2[i];
    var isEqual = false;

    for (var j = 0; j < arr1.length; j++) {
      var prev = arr1[j];
      if (equal(prev, next)) {
        var result = onMerge(prev, next);
        list[j].concat(result);
        isEqual = true;
        break;
      }
    }

    if (!isEqual) {
      list.push(new Node(next));
    }
  }

  var resultArr = [];
  for (var m = 0; m < list.length; m++) {
    var node = list[m];
    resultArr = resultArr.concat(node.pointer || [node.val]);
  }

  return resultArr;
};

function defaultEqual(prev, next) {
  return prev === next;
}

function defaultOnMerge(prev, next) {
  return [prev];
}

function Node(val) {
  this.val = val;
  this.pointer = null;
}

Node.prototype.concat = function(arr) {
  if (this.pointer) {
    this.pointer = this.pointer.concat(arr);
  } else {
    this.pointer = arr;
  }
  return this;
};
