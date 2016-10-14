var fspec = require('../fspec');
var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isBool = require('../preds/isBool');
var isProblem = require('../utils/isProblem');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var exprSpec = coerceIntoSpec(isExpr);
var Spec = require('../_Spec');
var ops = require('./');
var oneOrMore = ops.oneOrMore;
var or = ops.or;
var cat = ops.cat;

var AndSpec = fspec({
  args: cat('exprs', oneOrMore(isExpr)),
  ret: isSpec,
});

function and(conformedArgs) {
  var exprs = conformedArgs;

  var conformFn = _genAndConformer(exprs);
  var andS = new Spec('AND', exprs, conformFn, null);
  return andS;
}

function _genAndConformer(exprs) {
  return function andConformer(data) {
    var results = exprs.map(function(e) {
      return e.conform(data);
    });

    var problems = e.filter(isProblem);

    if(problems.length === 0) {
      return data;
    } else {
      return new Problem(data, problems, 'One or more expressions failed AND test');
    }
  }
}

module.exports = AndSpec.wrapConformedArgs(and);
