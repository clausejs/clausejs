var oAssign = require('object-assign');
var namespaceFn = require('./namespace');

var ops = require('./ops');
var utils = require('./utils');

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
  isUndefined: require('./preds/isUndefined'),
};

var models = {
  Problem: require('./models/Problem'),
  Spec: require('./models/Spec'),
};

var r = oAssign(namespaceFn, ops, utils, models, predicates);

module.exports = r;
