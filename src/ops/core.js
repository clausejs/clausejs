var oAssign = require('object-assign');

var Spec = require('../models/Spec');
var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isSpecName = require('../utils/isSpecName');
var isRefName = require('../utils/isRefName');
var c = require('../ops/constants');
var nfaConformer = require('../nfa/conformer');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var fspec = require('./fspec');

var exprSpec = coerceIntoSpec(isExpr);
var specSpec = coerceIntoSpec(isSpec);
var nameSpec = coerceIntoSpec(isSpecName);
var refNameSpec = coerceIntoSpec(isRefName);

var catOp = genMultiArgOp(c.CAT);
var orOp = genMultiArgOp(c.OR);
var zeroOrMoreOp = genSingleArgOp(c.ZERO_OR_MORE);
var oneOrMoreOp = genSingleArgOp(c.ONE_OR_MORE);
var zeroOrOneOp = genSingleArgOp(c.ZERO_OR_ONE);

var RefNameOrExprSpec = orOp({
  named: [
      { name: 'refName', expr: {
        expression: refNameSpec,
      } },
      { name: 'expression', expr: {
        expression: exprSpec,
      } },
    ],
});

var multipleArgOpSpec = {
  args: orOp({
    named: [
      {
        name: 'named',
        expr: {
          expression: zeroOrMoreOp({
            expr: {
              expression: catOp({
                named: [
                    { name: 'name', expr: {
                      expression: nameSpec,
                    } },
                    { name: 'expr', expr: {
                      expression: RefNameOrExprSpec,
                    } },
                  ],
              }),
            },
          }),
        },
      },
      {
        name: 'unnamed',
        expr: {
          expression: zeroOrMoreOp({
            expr: {
              expression: RefNameOrExprSpec,
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
        expression: RefNameOrExprSpec,
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
        if(expr.expression) {
          var s = coerceIntoSpec(expr.expression);
          return oAssign({}, p, { expr: s });
        } else {
          console.error(p);
          throw 'Not implemented';
        }
        // console.log(p);
        // var s = coerceIntoSpec(p.expr);
        // return oAssign({}, p, { expr: s });
      });

      var s = new Spec(
        type, { exprs: coercedExprs }, null, null
      );

      s.conform = nfaConformer(s);
      return s;
    } else if (conformedArgs.unnamed){
      exprs = conformedArgs.unnamed;

      // console.log(exprs);
      var coercedExprs = exprs.map(function(p) {
        if(p.expression) {
          var s = coerceIntoSpec(p.expression);
          return oAssign({}, p, { expr: s });
        } else {
          console.error(p);
          throw 'Not implemented';
        }
        // console.log(p);
        // var s = coerceIntoSpec(p.expr);
        // return oAssign({}, p, { expr: s });
      });

      var s = new Spec(
        type, { exprs: coercedExprs }, null, null
      );

      s.conform = nfaConformer(s);
      return s;
    }
  };
}

function genSingleArgOp(type) {
  return function (conformedArgs) {
    var p = conformedArgs.expr;
    var expr;

    if(p.expression) {
      expr = p.expression;
    } else {
      throw 'not impl';
    }

    var s = new Spec(
      type,
      { expr: coerceIntoSpec(expr) },
      null, null
    );

    s.conform = nfaConformer(s);
    return s;
  };
}

module.exports = {
  cat: fspec(multipleArgOpSpec).wrapConformedArgs(catOp),
  or: fspec(multipleArgOpSpec).wrapConformedArgs(orOp),
  zeroOrMore: fspec(singleArgOpSpec).wrapConformedArgs(zeroOrMoreOp),
  zeroOrOne: fspec(singleArgOpSpec).wrapConformedArgs(zeroOrOneOp),
  oneOrMore: fspec(singleArgOpSpec).wrapConformedArgs(oneOrMoreOp),
  RefNameOrExprSpec: RefNameOrExprSpec,
};

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
