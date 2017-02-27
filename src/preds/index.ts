import isNum from './isNum';
import isNatInt from "./isNatInt";
import isInt from "./isInt";
import isBool from "./isBool";
import isFn from "./isFn";
import isObj from "./isObj";
import isPlainObj from "./isPlainObj";
import equals from "./equals";
import oneOf from "./oneOf";
import isStr from "./isStr";
import isDate from "./isDate";
import not from "./not";
import instanceOf from "./instanceOf";
import isUuid from "./isUuid";
import isNull from "./isNull";
import isUndefined from "./isUndefined";
import notEmpty from "./notEmpty";

var isArray = Array.isArray;

export {
  isNull, isUndefined,
  notEmpty,
  isBool, isBool as isBoolean,
  isFn, isFn as isFunction,
  isNum, isNum as isNumber,
  isNatInt, isNatInt as isNaturalNumber,
  isInt, isInt as isInteger,
  isObj, isObj as isObject,
  isPlainObj, isPlainObj as isPlainObject,
  isStr, isStr as isString,
  isArray, isArray as isArr,
  equals, equals as equal, equals as equalsTo, equals as eq,
  oneOf,
  not,
  isDate,
  instanceOf,
  isUuid, isUuid as isUUID
};