var oAssign = require('object-assign');
var namespaceFn = require('./namespace');

var ops = require('./ops');

var predicates = {
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

var core = {
  and: require('./ops/and'),
  conform: require('./conform'),
  fspec: require('./fspec'),
  isValid: require('./isValid'),
  keys: require('./keys'),
  props: require('./ops/props'),
  identity: require('./identity'),
  isProblem: require('./utils/isProblem'),
  Problem: require('./_Problem'),
};

var r = oAssign(namespaceFn, ops, core, predicates);

module.exports = r;
