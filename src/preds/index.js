var isNum = require( './isNum' );
var isNatInt = require( './isNatInt' );
var isInt = require( './isInt' );
var isBool = require( './isBool' );
var isFn = require( './isFn' );
var isObj = require( './isObj' );
var equals = require( './equals' );
var oneOf = require( './oneOf' );
var isStr = require( './isStr' );
var isDate = require( './isDate' );
var instanceOf = require( './instanceOf' );
var isUuid = require( './isUuid' );
var isArray = Array.isArray;

var e = {
  isNull: require( './isNull' ),
  isUndefined: require( './isUndefined' ),
  notEmpty: require( './notEmpty' ),
  isBool, isBoolean: isBool,
  isFn, isFunction: isFn,
  isNum, isNumber: isNum,
  isNatInt, isNaturalNumber: isNatInt,
  isInt, isInteger: isInt,
  isObj, isObject: isObj,
  isStr, isString: isStr,
  isArray, isArr: isArray,
  equal: equals, equals, equalsTo: equals, eq: equals,
  oneOf,
  isDate,
  instanceOf,
  isUuid, isUUID: isUuid,
};

e.default = e;
module.exports = e;
