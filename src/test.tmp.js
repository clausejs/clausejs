var ops = require('./ops');
var cat = ops.cat;
var or = ops.or;
var isBool = require('./preds/isBool');
var isStr = require('./preds/isStr');

var s = cat('var1', isBool, 'var2', isStr);
var s1 = or(isBool, isStr);
// console.log(s.exprs);
var r = s1.conform('s');
console.log(r);
