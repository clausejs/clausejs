var oAssign = require('object-assign');

var Spec = require('../models/Spec');
var isSpec = require('../utils/isSpec');
var isPred = require('../utils/isPred');
var isObj = require('../preds/isObj');
var isUndefined = require('../preds/isUndefined');
var isStr = require('../preds/isStr');
var isSpecName = require('../utils/isSpecName');
var namedFn = require('../utils/namedFn');
var isSpecRef = require('../utils/isSpecRef');
var isDelayedSpec = require('../utils/isDelayedSpec');
var c = require('../ops/constants');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var fspec = require('./fspec');
var walk = require('../walk');
var specSpec = coerceIntoSpec(isSpec);
var nameSpec = coerceIntoSpec(isSpecName);

var catOp = genMultiArgOp(c.CAT);
var orOp = genMultiArgOp(c.OR);
var zeroOrMoreOp = genSingleArgOp(c.Z_OR_M);
var oneOrMoreOp = genSingleArgOp(c.O_OR_M);
var zeroOrOneOp = genSingleArgOp(c.Z_OR_O);
var collOfOp = genSingleArgOp(c.COLL_OF);

var ExprSpec = orOp({
  named: [
      { name: 'specRef', expr: {
        spec: isSpecRef,
      } },
      { name: 'pred', expr: {
        pred: isPred,
      } },
      { name: 'delayedSpec', expr: {
        spec: isDelayedSpec,
      } },
      { name: 'spec', expr: {
        pred: isSpec,
      } },
    ],
});

var NameExprSeq = catOp({
  named: [
      { name: 'name', expr: {
        spec: nameSpec,
      } },
      { name: 'expr', expr: {
        spec: ExprSpec,
      } },
    ],
});

var NameCommentExprSeq = catOp({
  named: [
      { name: 'name', expr: {
        spec: nameSpec,
      } },
      { name: 'comment', expr: {
        spec: isStr,
      } },
      { name: 'expr', expr: {
        spec: ExprSpec,
      } },
    ],
});

var NameExprOptionalComment = orOp({
  unnamed: [
    { spec: NameExprSeq },
    { spec: NameCommentExprSeq },
  ]
})

var MultipleArgSpec = orOp({
  named: [
    {
      name: 'named',
      expr: {
        spec: orOp({
          unnamed: [
            {
              spec: zeroOrMoreOp({
                expr: {
                  spec: NameExprOptionalComment,
                },
              })
            },
            {
              spec: collOfOp({
                expr: {
                  spec: NameExprOptionalComment,
                },
              })
            },
          ]
        }),
      },
    },
    {
      name: 'unnamed',
      expr: {
        spec: zeroOrMoreOp({
          expr: {
            spec: ExprSpec,
          },
        }),
      },
    },
  ],
});

var multipleArgOpSpec = {
  args: MultipleArgSpec,
  ret: specSpec,
};

var singleArgOpSpec = {
  args: catOp({
    named: [
      {
        name: 'expr',
        expr: {
          spec: ExprSpec,
        }
      },
      {
        name: 'opts',
        expr: {
          spec: zeroOrOneOp({
            expr: {
              pred: isObj,
            }
          }),
        }
      },
    ],
  }),
  ret: specSpec,
};

function genMultiArgOp(type) {
  return namedFn(type, function (conformedArgs) {
    var exprs;
    if(conformedArgs.named) {
      exprs = conformedArgs.named;

      var coercedExprs = exprs.map(function(p) {
        var expr = p.expr;
        if(expr.spec) {
          var s = expr.spec;
          return oAssign({}, p, { expr: s, spec: undefined });
        } else if (expr.pred) {
          var s = coerceIntoSpec(expr.pred);
          return oAssign({}, p, { expr: s, pred: undefined });
        } else if (expr.specRef) {
          var s = expr.specRef;
          return oAssign({}, p, { expr: s, specRef: undefined });
        } else if (expr.delayedSpec) {
          var s = expr.delayedSpec;
          return oAssign({}, p, { expr: s, delayedSpec: undefined });
        } else {
          console.error(p);
          throw 'Not implemented';
        }
      });

      var s = new Spec( type, coercedExprs, null, null, null);

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    } else if (conformedArgs.unnamed){
      exprs = conformedArgs.unnamed;

      var coercedExprs = exprs.map(function(p) {
        if(p.spec) {
          var s = p.spec;
          return oAssign({}, p, { expr: s, spec: undefined });
        } else if (p.pred) {
          var s = coerceIntoSpec(p.pred);
          return oAssign({}, p, { expr: s, pred: undefined });
        } else if (p.specRef) {
          var s = p.specRef;
          return oAssign({}, p, { expr: s, specRef: undefined });
        } else if (p.delayedSpec) {
          var s = p.delayedSpec;
          return oAssign({}, p, { expr: s, delayedSpec: undefined });
        } else {
          console.error(p);
          throw 'Not implemented';
        }
      });

      var s = new Spec(type, coercedExprs, null, null, null);

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    }
  });
}

function genSingleArgOp(type) {
  return namedFn(type, function (conformedArgs) {
    var p = conformedArgs.expr;
    var opts = conformedArgs.opts;
    var expr;

    if(p.spec) {
      expr = p.spec;
    } else if (p.pred) {
      expr = coerceIntoSpec(p.pred);
    } else if (p.specRef) {
      expr = p.specRef;
    } else if (p.delayedSpec) {
      expr = p.delayedSpec;
    } else {
      throw 'internal err';
    }

    var s = new Spec(
      type,
      [coerceIntoSpec(expr)],
      opts,
      null, null
    );

    s.conform = function conform(x) {
      return walk(s, x, { conform: true });
    }
    return s;
  });
}

var collOf = fspec(singleArgOpSpec).instrumentConformed(collOfOp);

var core = {
  cat: fspec(multipleArgOpSpec).instrumentConformed(catOp),
  or: fspec(multipleArgOpSpec).instrumentConformed(orOp),
  zeroOrMore: fspec(singleArgOpSpec).instrumentConformed(zeroOrMoreOp),
  zeroOrOne: fspec(singleArgOpSpec).instrumentConformed(zeroOrOneOp),
  oneOrMore: fspec(singleArgOpSpec).instrumentConformed(oneOrMoreOp),
  ExprSpec,
  collOf,
  arrayOf: collOf,
};

core['alt'] = core.or;
core['*'] = core.zeroOrMore;
core['+'] = core.oneOrMore;
core['?'] = core.zeroOrOne;

module.exports = core;
