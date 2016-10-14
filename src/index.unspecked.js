var ops = require('./ops');
module.exports = {
  cat: ops.cat,
  zeroOrMore: ops.zeroOrMore,
  oneOrMore: ops.oneOrMore,
  zeroOrOne: ops.zeroOrOne,
  or: ops.or,
  conform: require('./conform'),
  fspec: require('./fspec'),
  isValid: require('./isValid'),
  keys: require('./keys'),
  identity: require('./identity'),
  isProblem: require('./utils/isProblem'),
  Problem: require('./_Problem'),

  /* Predicates */
  isBool: require('./preds/isBool'),
  isBoolean: require('./preds/isBool'),
  isFn: require('./preds/isFn'),
  isFunction: require('./preds/isFn'),
  isNum: require('./preds/isNum'),
  isObj: require('./preds/isObj'),
  isObject: require('./preds/isObj'),
  isStr: require('./preds/isStr'),
  isString: require('./preds/isStr'),
};
