var Spec = require('../_Spec');
var fspec = require('../fspec');
var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isSpecName = require('../utils/isSpecName');
var isRefName = require('../utils/isRefName');
var c = require('../ops/constants');
var nfaConformer = require('../nfa/conformer');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var fspec = require('../fspec');

var exprSpec = coerceIntoSpec(isExpr);
var specSpec = coerceIntoSpec(isSpec);
var nameSpec = coerceIntoSpec(isSpecName);
var refNameSpec = coerceIntoSpec(isRefName);

var catOp = genMultiArgOp(c.CAT);
var orOp = genMultiArgOp(c.OR);
var zeroOrMoreOp = genSingleArgOp(c.ZERO_OR_MORE);
var oneOrMoreOp = genSingleArgOp(c.ONE_OR_MORE);

var refNameOrExprSpec = orOp({
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
          expression: zeroOrMoreOp(
            catOp({
              named: [
                  { name: 'name', expr: {
                    expression: nameSpec,
                  } },
                  { name: 'expr', expr: {
                    expression: refNameOrExprSpec,
                  } },
                ],
            })
          ),
        },
      },
      {
        name: 'unnamed',
        expr: {
          expression: zeroOrMoreOp( refNameOrExprSpec ),
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
        expression: refNameOrExprSpec,
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
          return Object.assign({}, p, { expr: s });
        } else {
          console.error(p);
          throw 'Not implemented';
        }
        // console.log(p);
        // var s = coerceIntoSpec(p.expr);
        // return Object.assign({}, p, { expr: s });
      });

      var s = new Spec(
        type, { exprs: coercedExprs }, null, null
      );

      s.conform = nfaConformer(s);
      return s;
    } else {
      throw 'unnamed not impl';
    }
  };
}

function genSingleArgOp(type) {
  return function (conformedArgs) {
    var s = new Spec(
      type,
      { expr: coerceIntoSpec(conformedArgs) },
      null, null
    );

    s.conform = nfaConformer(s);
    return s;
  };
}

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

module.exports = {
  cat: fspec(multipleArgOpSpec).wrapConformedArgs(catOp),
  or: fspec(multipleArgOpSpec).wrapConformedArgs(orOp),
  zeroOrMore: fspec(singleArgOpSpec).wrapConformedArgs(zeroOrMoreOp),
  oneOrMore: fspec(singleArgOpSpec).wrapConformedArgs(oneOrMoreOp),
};
