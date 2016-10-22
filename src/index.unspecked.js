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
};

var models = {
  isProblem: require('./utils/isProblem'),
  Problem: require('./models/Problem'),
};


var r = oAssign(namespaceFn, ops, utils, models, predicates);

module.exports = r;
