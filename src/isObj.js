'use strict';

var isObject = function(x) {
  return typeof x === "object" && x !== null;
};

module.exports = isObject;
