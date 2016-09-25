var cat = require('./ops').cat;
var isStr = require('./preds/isStr');
var isBool = require('./preds/isBool');

console.log(cat('first', isStr, 'second', isBool));
