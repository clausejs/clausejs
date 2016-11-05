var {isBool, isFn} = require('../preds');
var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isProblem = require('../utils/isProblem');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var exprSpec = coerceIntoSpec(isExpr);
var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var {oneOrMore, zeroOrOne, or, cat} = require('./core');
var fspec = require('./fspec');
var conformWalker = require('../utils/conformWalker');

var AndSpec = fspec({
  args: cat('exprs', oneOrMore(isExpr), 'walker', zeroOrOne(isFn)),
  ret: isSpec,
});

function andOp(conformedArgs) {
  var { exprs } = conformedArgs;

  var andS = new Spec('AND', exprs, null, null, null);
  andS.conform = function andWalk(x, opts) {
    walk(andS, x, opts);
  }
  return andS;
}


module.exports = AndSpec.instrumentConformed(andOp);
