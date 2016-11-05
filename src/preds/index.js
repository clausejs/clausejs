var isNum = require('./isNum');

module.exports = {
  isBool: require('./isBool'),
  isBoolean: require('./isBool'),
  isNull: require('./isNull'),
  isFn: require('./isFn'),
  isFunction: require('./isFn'),
  isNum,
  isNumber: isNum,
  isNatInt: require('./isNatInt'),
  isInt: require('./isInt'),
  isObj: require('./isObj'),
  isObject: require('./isObj'),
  isStr: require('./isStr'),
  isString: require('./isStr'),
  isUndefined: require('./isUndefined'),
  notEmpty: require('./notEmpty'),
};
