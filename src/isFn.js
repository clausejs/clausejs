'use strict';

function isFunction(x) {
  var getType = {};
  return x && getType.toString.call(x) === '[object Function]';
};

module.exports = isFunction;
