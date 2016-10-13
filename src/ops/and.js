var fspec = require('../fspec');
var isExpr = require('../utils/isExpr');
var exprSpec = coerceIntoSpec(isExpr);
var ops = require('./');
var zeroOrMore = ops.zeroOrMore;
var or = ops.or;
var cat = ops.cat;

function and() {

}

module.exports = and;
