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

var SpecSpec = coerceIntoSpec( isSpec );
var SpecRefSpec = coerceIntoSpec( isSpecRef );
var DelayedSpecSpec = coerceIntoSpec( isDelayedSpec );
var PredSpec = coerceIntoSpec( isPred );

var ExprSpec = orOp( {
  withLabels: [
    { name: 'spec', expr: {
      spec: SpecSpec,
    } },
    { name: 'pred', expr: {
      spec: PredSpec,
    } },
    { name: 'delayedSpec', expr: {
      spec: DelayedSpecSpec,
    } },
    { name: 'specRef', expr: {
      spec: SpecRefSpec,
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

var singleArgOpSpecFn = ( optSpec ) => ( {
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
            expr: optSpec
          } ),
        }
      },
    ],
  } ),
  ret: specSpec,
} );

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
      console.error( p );
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

var CollOfSpec = fspec( singleArgOpSpecFn( { pred: isObj } ) );
var collOf = CollOfSpec.instrumentConformed( collOfOp );

var CatFnSpec = fspec( multipleArgOpSpec );
var OrFnSpec = fspec( multipleArgOpSpec );
var ZeroOrMoreFnSpec = fspec( singleArgOpSpecFn( { pred: isObj } ) );
var OneOrMoreFnSpec = fspec( singleArgOpSpecFn( { pred: isObj } ) );
var ZeroOrOneFnSpec = fspec( singleArgOpSpecFn( { pred: isObj } ) );

var core = {
  cat: CatFnSpec.instrumentConformed( catOp ),
  or: OrFnSpec.instrumentConformed( orOp ),
  zeroOrMore: ZeroOrMoreFnSpec.instrumentConformed( zeroOrMoreOp ),
  zeroOrOne: ZeroOrOneFnSpec.instrumentConformed( zeroOrOneOp ),
  oneOrMore: OneOrMoreFnSpec.instrumentConformed( oneOrMoreOp ),
  ExprSpec, SpecSpec, PredSpec, DelayedSpecSpec, SpecRefSpec,
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
//
var isStr = require( '../preds/isStr' );
var isObj = require( '../preds/isObj' );
var isNum = require( '../preds/isNum' );
var isBool = require( '../preds/isBool' );

var NestedSpec = catOp( {
  withoutLabels: [
    { spec: catOp( {
      withoutLabels: [
        { pred: isNum },
        { pred: isBool }
      ]
    } ) },
    { spec: catOp( {
      withoutLabels: [
        { spec: zeroOrMoreOp( {
          expr: {
            pred: isNum
          },
        } ) },
        { spec: catOp( {
          withoutLabels: [
            { pred: isBool }
          ]
        } ) },
        { spec: oneOrMoreOp( {
          expr: {
            pred: isNum
          },
        } ) },
        { spec: zeroOrOneOp( {
          expr: {
            pred: isObj
          },
        } ) },
      ]
    } ) }
  ]
} );

var data = [ 22, true, 44, 23, false, 23, ];
var r = NestedSpec.conform( data );

console.log( r );

// var CCSpec = catOp( {
//   withoutLabels: [
//     { pred: isStr },
//     { spec: zeroOrOneOp( {
//       expr: {
//         pred: isStr
//       }
//     } ) }
//   ]
// } );
// var TestSpec1 = orOp( {
//   withoutLabels: [
//     {
//       spec: CCSpec,
//     },
//     {
//       pred: isStr,
//     }
//   ],
// } );
// var TestSpec2 = orOp( {
//   withoutLabels: [
//     {
//       spec: isNum,
//     },
//     {
//       pred: isBool,
//     },
//     {
//       pred: isStr,
//     },
//   ],
// } );
// var TS3 = orOp( {
//   withLabels: [
//     {
//       name: 'hello',
//       expr: {
//         pred: isStr
//       }
//     },
//     {
//       name: 'zeeExpr',
//       expr: {
//         pred: isPred
//       }
//     }
//   ]
// } );

// console.log( TestSpec2 )

// var r = TS3.conform( 'hellolllllllllllllllllll' );
// console.log( r )
// var TestSpec = orOp( {
//   withLabels: [""
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
