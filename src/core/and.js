var {isBool, isFn} = require('../preds');
var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isProblem = require('../utils/isProblem');
var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var { oneOrMore, zeroOrOne, or, cat } = require('./regex');
var fspec = require('./fspec');
var walk = require('../walk');

var AndSpec = fspec({
  args: cat('exprs', oneOrMore(isExpr), 'walker', zeroOrOne(isFn)),
  ret: isSpec,
});

function andOp(conformedArgs) {
  var { exprs } = conformedArgs;

  var andS = new Spec('AND', exprs, null, null, null);
  andS.conform = function andConform(x) {
    return walk(andS, x, { conform: true });
  }
  return andS;
}


module.exports = AndSpec.instrumentConformed(andOp);
