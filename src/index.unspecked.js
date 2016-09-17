module.exports = {
  cat: require('./cat'),
  conform: require('./conform'),
  fspec: require('./fspec'),
  isValid: require('./isValid'),
  keys: require('./keys'),
  identity: require('./identity'),
  isProblem: require('./isProblem'),
  or: require('./or'),
  Problem: require('./_Problem'),
  zeroOrMore: require('./zeroOrMore'),
  oneOrMore: require('./oneOrMore'),

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
