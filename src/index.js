var oAssign = require('object-assign');
var namespaceFn = require('./namespace');

var ops = require('./ops');
var utils = require('./utils');

var predicates = require('./preds');

var models = {
  Problem: require('./models/Problem'),
  Spec: require('./models/Spec'),
};

var r = oAssign(namespaceFn, ops, utils, models, predicates);

module.exports = r;
