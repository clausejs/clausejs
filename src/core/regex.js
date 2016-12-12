var oAssign = require( 'object-assign' );

var Spec = require( '../models/Spec' );
var isSpec = require( '../utils/isSpec' );
var isPred = require( '../utils/isPred' );
var specFromAlts = require( '../utils/specFromAlts' );
var isObj = require( '../preds/isObj' );
var isStr = require( '../preds/isStr' );
var isSpecName = require( '../utils/isSpecName' );
var namedFn = require( '../utils/namedFn' );
var isSpecRef = require( '../utils/isSpecRef' );
var isDelayedSpec = require( '../utils/isDelayedSpec' );
var c = require( '../core/constants' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var fspec = require( './fspec' );
var walk = require( '../walk' );
var specSpec = coerceIntoSpec( isSpec );
var nameSpec = coerceIntoSpec( isSpecName );

var catOp = genMultiArgOp( c.CAT );
var orOp = genMultiArgOp( c.OR );
var zeroOrMoreOp = genSingleArgOp( c.Z_OR_M );
var oneOrMoreOp = genSingleArgOp( c.O_OR_M );
var zeroOrOneOp = genSingleArgOp( c.Z_OR_O );
var collOfOp = genSingleArgOp( c.COLL_OF );

var ExprSpec = orOp( {
  withLabels: [
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
} );

var NameExprSeq = catOp( {
  withLabels: [
    { name: 'name', expr: {
      spec: nameSpec,
    } },
    { name: 'expr', expr: {
      spec: ExprSpec,
    } },
  ],
} );

var NameExprOptionalComment = catOp( {
  withLabels: [
    { name: 'name', expr: {
      spec: nameSpec,
    } },
    { name: 'comment', expr: {
      spec: zeroOrOneOp( {
        expr: {
          pred: isStr,
        }
      } ),
    } },
    { name: 'expr', expr: {
      spec: ExprSpec,
    } },
  ],
} );

var MultipleArgSpec = orOp( {
  withLabels: [
    {
      name: 'withLabels',
      expr: {
        spec: orOp( {
          withoutLabels: [
            {
              spec: zeroOrMoreOp( {
                expr: {
                  spec: NameExprOptionalComment,
                },
              } )
            },
            {
              spec: collOfOp( {
                expr: {
                  spec: NameExprOptionalComment,
                },
              } )
            },
          ]
        } ),
      },
    },
    {
      name: 'withoutLabels',
      expr: {
        spec: zeroOrMoreOp( {
          expr: {
            spec: ExprSpec,
          },
        } ),
      },
    },
  ],
} );

var multipleArgOpSpec = {
  args: MultipleArgSpec,
  ret: specSpec,
};

var singleArgOpSpec = {
  args: catOp( {
    withLabels: [
      {
        name: 'expr',
        expr: {
          spec: ExprSpec,
        }
      },
      {
        name: 'opts',
        expr: {
          spec: zeroOrOneOp( {
            expr: {
              pred: isObj,
            }
          } ),
        }
      },
    ],
  } ),
  ret: specSpec,
};

function genMultiArgOp( type ) {
  return namedFn( type, function _( conformedArgs ) {
    var exprs;
    if ( conformedArgs.withLabels ) {
      exprs = conformedArgs.withLabels;

      var coercedExprs = exprs.map( ( p ) => {
        var alts = p.expr;
        var s = specFromAlts( alts );

        return oAssign( {}, p, {
          expr: s,
          spec: undefined, pred: undefined,
          specRef: undefined, delayedSpec: undefined } );
      } );

      var fragments = coercedExprs.reduce(
        ( curr, { name, expr }, idx ) =>
          curr
            .concat( [ `"${name}"`, ', ', expr, ] )
            .concat( idx < coercedExprs.length - 1 ? [ ', ' ] : [] )
          , [] );
      let opts = {
        named: true,
      };
      var s = new Spec( {
        type,
        exprs: coercedExprs,
        fragments,
        opts,
      } );

      s.conform = function conform( x ) {
        return walk( s, x, { conform: true } );
      };
      return s;
    } else if ( conformedArgs.withoutLabels ) {
      exprs = conformedArgs.withoutLabels;

      coercedExprs = exprs.map( ( p ) => {
        var s;
        if ( p.spec ) {
          s = p.spec;
          return oAssign( {}, p, { expr: s, spec: undefined } );
        } else if ( p.pred ) {
          s = coerceIntoSpec( p.pred );
          return oAssign( {}, p, { expr: s, pred: undefined } );
        } else if ( p.specRef ) {
          s = p.specRef;
          return oAssign( {}, p, { expr: s, specRef: undefined } );
        } else if ( p.delayedSpec ) {
          s = p.delayedSpec;
          return oAssign( {}, p, { expr: s, delayedSpec: undefined } );
        } else {
          console.error( p );
          throw '!';
        }
      } );

      let opts = {
        named: false,
      };

      s = new Spec( {
        type,
        exprs: coercedExprs,
        opts,
        fragments: coercedExprs.reduce(
          ( curr, { expr }, idx ) =>
            curr
              .concat( [ expr ] )
              .concat( idx < coercedExprs.length - 1 ? [ ', ' ] : [] ),
            [] )
      } );

      s.conform = function conform( x ) {
        return walk( s, x, { conform: true } );
      };
      return s;
    }
  } );
}

function genSingleArgOp( type ) {
  return namedFn( type, function _( conformedArgs ) {
    var p = conformedArgs.expr;
    var opts = conformedArgs.opts;
    var expr;

    if ( p.spec ) {
      expr = p.spec;
    } else if ( p.pred ) {
      expr = coerceIntoSpec( p.pred );
    } else if ( p.specRef ) {
      expr = p.specRef;
    } else if ( p.delayedSpec ) {
      expr = p.delayedSpec;
    } else {
      throw 'internal err';
    }
    const sureSpec = coerceIntoSpec( expr );
    var s = new Spec( {
      type,
      exprs: [ sureSpec ],
      fragments: [ sureSpec ],
      opts,
    } );

    s.conform = function conform( x ) {
      return walk( s, x, { conform: true } );
    }
    return s;
  } );
}

var CollOfSpec = fspec( singleArgOpSpec );
var collOf = CollOfSpec.instrumentConformed( collOfOp );

var CatFnSpec = fspec( multipleArgOpSpec );
var OrFnSpec = fspec( multipleArgOpSpec );
var ZeroOrMoreFnSpec = fspec( singleArgOpSpec );
var OneOrMoreFnSpec = fspec( singleArgOpSpec );
var ZeroOrOneFnSpec = fspec( singleArgOpSpec );

var core = {
  cat: CatFnSpec.instrumentConformed( catOp ),
  or: OrFnSpec.instrumentConformed( orOp ),
  zeroOrMore: ZeroOrMoreFnSpec.instrumentConformed( zeroOrMoreOp ),
  zeroOrOne: ZeroOrOneFnSpec.instrumentConformed( zeroOrOneOp ),
  oneOrMore: OneOrMoreFnSpec.instrumentConformed( oneOrMoreOp ),
  ExprSpec,
  CatFnSpec,
  OrFnSpec,
  ZeroOrMoreFnSpec, OneOrMoreFnSpec, ZeroOrOneFnSpec,
  CollOfSpec,
  collOf,
};

core[ 'alt' ] = core.or;
core[ '*' ] = core.zeroOrMore;
core[ '+' ] = core.oneOrMore;
core[ '?' ] = core.zeroOrOne;

module.exports = core;

// // //
// var TestSpec = orOp( {
//   withLabels: [
//     {
//       name: 'withLabels',
//       expr: {
//         spec: orOp( {
//           withoutLabels: [
//             {
//               spec: zeroOrMoreOp( {
//                 expr: {
//                   spec: NameExprOptionalComment,
//                 },
//               } )
//             },
//             {
//               spec: collOfOp( {
//                 expr: {
//                   spec: NameExprOptionalComment,
//                 },
//               } )
//             },
//           ]
//         } ),
//       },
//     },
//     {
//       name: 'withoutLabels',
//       expr: {
//         spec: zeroOrMoreOp( {
//           expr: {
//             spec: ExprSpec,
//           },
//         } ),
//       },
//     },
//   ],
// } );
