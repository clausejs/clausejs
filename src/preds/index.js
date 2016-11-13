var isNum = require('./isNum');
var isNatInt = require('./isNatInt');
var isInt = require('./isInt');
var isBool = require('./isBool');
var isFn = require('./isFn');
var isObj = require('./isObj');
var isStr = require('./isStr');
var isArray = Array.isArray;

module.exports = {
  isNull: require('./isNull'),
  isUndefined: require('./isUndefined'),
  notEmpty: require('./notEmpty'),
  isBool, isBoolean: isBool,
  isFn, isFunction: isFn,
  isNum, isNumber: isNum,
  isNatInt, isNaturalNumber: isNatInt,
  isInt, isInteger: isInt,
  isObj, isObject: isObj,
  isStr, isString: isStr,
  isArray,
};
