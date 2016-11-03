var oAssign = require('object-assign');

var Spec = require('../models/Spec');
var isSpec = require('../utils/isSpec');
var isPred = require('../utils/isPred');
var isStr = require('../preds/isStr');
var isSpecName = require('../utils/isSpecName');
var isSpecRef = require('../utils/isSpecRef');
var c = require('../ops/constants');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var fspec = require('./fspec');
var walk = require('./walk');
var specSpec = coerceIntoSpec(isSpec);
var nameSpec = coerceIntoSpec(isSpecName);
var specSpecRef = coerceIntoSpec(isSpecRef);

var catOp = genMultiArgOp(c.CAT);
var orOp = genMultiArgOp(c.OR);
var zeroOrMoreOp = genSingleArgOp(c.Z_OR_M);
var oneOrMoreOp = genSingleArgOp(c.O_OR_M);
var zeroOrOneOp = genSingleArgOp(c.Z_OR_O);

var ExprSpec = orOp({
  named: [
      { name: 'specRef', expr: {
        spec: specSpecRef,
      } },
      { name: 'pred', expr: {
        pred: isPred,
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

var multipleArgOpSpec = {
  args: orOp({
    named: [
      {
        name: 'named',
        expr: {
          spec: zeroOrMoreOp({
            expr: {
              spec: orOp({
                unnamed: [
                  {
                    spec: NameExprOptionalComment,
                  },
                  // {
                  //   spec: collOfOp({
                  //     expr: NameExprSeq,
                  //   }),
                  // },
                ]
              })

            },
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
  }),
  ret: specSpec,
};

var singleArgOpSpec = {
  args: catOp({
    named: [
      { name: 'expr', expr: {
        spec: ExprSpec,
      } },
    ],
  }),
  ret: specSpec,
};

function genMultiArgOp(type) {
  return function (conformedArgs) {
    // console.log(conformedArgs);
    var exprs;
    if(conformedArgs.named) {
      exprs = conformedArgs.named;

      // console.log(exprs);
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
        } else {
          console.error(p);
          throw 'Not implemented';
        }
        // console.log(p);
        // var s = coerceIntoSpec(p.expr);
        // return oAssign({}, p, { expr: s });
      });

      var s = new Spec(
        type, coercedExprs, null, null
      );

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    } else if (conformedArgs.unnamed){
      exprs = conformedArgs.unnamed;

      // console.log(exprs);
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
        } else {
          console.error(p);
          throw 'Not implemented';
        }
        // console.log(p);
        // var s = coerceIntoSpec(p.expr);
        // return oAssign({}, p, { expr: s });
      });

      var s = new Spec(
        type, coercedExprs, null, null
      );

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    }
  };
}

function genSingleArgOp(type) {
  return function (conformedArgs) {
    var p = conformedArgs.expr;
    var expr;

    if(p.spec) {
      expr = p.spec;
    } else if (p.pred) {
      expr = coerceIntoSpec(p.pred);
    }else if (p.specRef) {
      expr = p.specRef;
    } else {
      throw 'internal err';
    }

    var s = new Spec(
      type,
      [coerceIntoSpec(expr)],
      null, null
    );

    s.conform = function conform(x) {
      return walk(s, x, { conform: true });
    }
    return s;
  };
}

var core = {
  cat: fspec(multipleArgOpSpec).wrapConformedArgs(catOp),
  or: fspec(multipleArgOpSpec).wrapConformedArgs(orOp),
  zeroOrMore: fspec(singleArgOpSpec).wrapConformedArgs(zeroOrMoreOp),
  zeroOrOne: fspec(singleArgOpSpec).wrapConformedArgs(zeroOrOneOp),
  oneOrMore: fspec(singleArgOpSpec).wrapConformedArgs(oneOrMoreOp),
  ExprSpec,
};

core['alt'] = core.or;
core['*'] = core.zeroOrMore;
core['+'] = core.oneOrMore;
core['?'] = core.zeroOrOne;

module.exports = core;

// ///////////////////////////////////////////////////////////
// var isBool = require('../preds/isBool');
// var isStr = require('../preds/isStr');
//
// // var boolOrStr = orOp({
// //   named: [
// //     { name: 'var1', expr: coerceIntoSpec(isBool) },
// //     { name: 'var2', expr: coerceIntoSpec(isStr) },
// //   ],
// // });
//
// var bb = zeroOrMoreOp(
//   catOp({
//     named: [
//       {name: 'verifi', expr: coerceIntoSpec(isBool)},
//       {name: 'commenti', expr: coerceIntoSpec(isStr)},
//     ],
//   })
// );
//
// var b = orOp({
//   named: [
//     { name: 'group1', expr: bb},
//     { name: 'group2', expr: coerceIntoSpec(isStr) },
//   ],
// });
//
// var r = b.conform([
//   true, 'z',
//   true, 'c',
//   false, 'e',
//   'z',
// ]);
// // var r = s.conform([
// //   true, 'z',
// //   false, 'w',
// //   'z',
// // ]);
// console.log(r);
// ///////////////////////////////////////////////////////////
