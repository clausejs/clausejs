var ops = require('./ops');
var cat = ops.cat;
var or = ops.or;
var isBool = require('./preds/isBool');
var isStr = require('./preds/isStr');

var s = cat('var1', isBool, 'var2', isStr);
var s1 = or('b', isBool, 's', isStr);
// console.log(s.exprs);
// var r = s1.conform([true, 's'][1]);
console.log(r);
