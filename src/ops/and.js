var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isBool = require('../preds/isBool');
var isProblem = require('../utils/isProblem');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var exprSpec = coerceIntoSpec(isExpr);
var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var core = require('./core');
var oneOrMore = core.oneOrMore;
var or = core.or;
var cat = core.cat;
var fspec = require('./fspec');

var AndSpec = fspec({
  args: cat('exprs', oneOrMore(isExpr)),
  ret: isSpec,
});

function andOp(conformedArgs) {
  var exprs = conformedArgs.exprs;

  var conformFn = _genAndConformer(exprs);
  var andS = new Spec('AND', { exprs: exprs }, conformFn, null);
  return andS;
}

function _genAndConformer(exprs) {
  return function andConformer(data) {
    var results = exprs.map(function(e) {
      e = coerceIntoSpec(e);
      return e.conform(data);
    });

    var problems = results.filter(isProblem);

    if(problems.length === 0) {
      return data;
    } else {
      return new Problem(data, problems, 'One or more expressions failed AND test');
    }
  }
}

module.exports = AndSpec.wrapConformedArgs(andOp);
