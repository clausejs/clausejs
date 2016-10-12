var ops = require('./ops');
var cat = ops.cat;
var isBool = require('./preds/isBool');
var isStr = require('./preds/isStr');

var s = cat('var1', isBool, 'var2', isStr);
var r = s.conform([true, 's']);
// console.log(r);
