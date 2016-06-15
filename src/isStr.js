'use strict';

var isStr = function (x) {
  return x !== null && x !== undefined && x.constructor === String
};

module.exports = isStr;
