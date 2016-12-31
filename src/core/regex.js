var oAssign = require( 'object-assign' );

var Spec = require( '../models/Spec' );
var isSpec = require( '../utils/isSpec' );
var isPred = require( '../utils/isPred' );
var isExpr = require( '../utils/isExpr' );
var not = require( '../preds/not' );
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
  expressions: {
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
  }
} );

var NameExprOptionalComment = catOp( {
  expressions: {
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
  }
} );

var MultipleArgSpec = catOp( {
  expressions: {
    withLabels: [
      { name: 'expressions',
        expr: {
          spec: orOp( {
            expressions: {
              withLabels: [
                {
                  name: 'withLabels',
                  expr: {
                    spec: orOp( {
                      expressions: {
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
                      }
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
            }
          } )
        }
      },
      {
        name: 'options',
        expr: {
          spec: zeroOrOneOp( {
            expr: {
              spec: andOp( [
                 { pred: isObj },
                 { pred: not( isExpr ) }
              ] )
            }
          } )
        }
      }
    ]
  }
} );

function andOp( exprs ) {
  var andS = new Spec( {
    type: 'AND',
    exprs: [],
    fragments: exprs,
    opts: { conformedExprs: exprs }
  } );
  andS.conform = function andConform( x ) {
    return walk( andS, x, { conform: true } );
  }
  return andS;
}

var multipleArgNoDupeSpec = andOp(
  [ { spec: MultipleArgSpec },
    { pred: noDupelicateLabels } ]
);

function noDupelicateLabels( { expressions: { withLabels } } ) {
  if ( withLabels ) {
    let byFar = [];
    for ( let i = 0; i < withLabels.length; i += 1 ) {
      let lbl = withLabels[ i ].name;
      if ( byFar.indexOf( lbl ) >= 0 ) {
        throw new Error( `Duplicate label detected: ${lbl}` );
      }
      byFar.push( lbl );
    }
  }
  return true;
}

var AndFnSpec = fspec( {
  args: oneOrMoreOp( { expr:
    { spec: ExprSpec }
  } ),
  ret: isSpec,
} );

var multipleArgOpSpec = {
  args: multipleArgNoDupeSpec,
  ret: specSpec,
};

var singleArgOpSpecFn = ( optSpec ) => ( {
  args: catOp( {
    expressions: {
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
    }
  } ),
  ret: specSpec,
} );

function genMultiArgOp( type ) {
  return namedFn( type, function _( { expressions: { withLabels, withoutLabels }, options } ) {
    var exprs;
    if ( withLabels ) {
      exprs = withLabels;

      var coercedExprs = exprs.map( ( p ) => {
        var alts = p.expr;
        var s = specFromAlts( alts );

        return oAssign( {}, p, {
          expr: s,
          spec: undefined, pred: undefined,
          specRef: undefined, delayedSpec: undefined } );
      } );

      let opts = oAssign( {}, options, {
        named: true,
      } );
      var s = new Spec( {
        type,
        exprs: coercedExprs,
        opts,
      } );

      s.conform = function conform( x ) {
        return walk( s, x, { conform: true } );
      };
      return s;
    } else if ( withoutLabels ) {
      exprs = withoutLabels;

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

      let opts = oAssign( {}, options, {
        named: false,
      } );

      s = new Spec( {
        type,
        exprs: coercedExprs,
        opts,
      } );

      s.conform = function conform( x ) {
        return walk( s, x, { conform: true } );
      };
      return s;
    } else {
      // empty case
      s = new Spec( {
        type,
        exprs: [] } );
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
      opts: oAssign( {}, opts, { enclosedSpec: sureSpec } ),
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
var and = AndFnSpec.instrumentConformed( andOp );

var core = {
  cat: CatFnSpec.instrumentConformed( catOp ),
  or: OrFnSpec.instrumentConformed( orOp ),
  zeroOrMore: ZeroOrMoreFnSpec.instrumentConformed( zeroOrMoreOp ),
  zeroOrOne: ZeroOrOneFnSpec.instrumentConformed( zeroOrOneOp ),
  oneOrMore: OneOrMoreFnSpec.instrumentConformed( oneOrMoreOp ),
  ExprSpec, SpecSpec, PredSpec, DelayedSpecSpec, SpecRefSpec,
  CatFnSpec,
  AndFnSpec,
  OrFnSpec,
  ZeroOrMoreFnSpec, OneOrMoreFnSpec, ZeroOrOneFnSpec,
  CollOfSpec,
  collOf,
  and,
};

core[ 'alt' ] = core.or;
core[ '*' ] = core.zeroOrMore;
core[ '+' ] = core.oneOrMore;
core[ '?' ] = core.zeroOrOne;

module.exports = core;

// // //
//
// var isStr = require( '../preds/isStr' );
// var isObj = require( '../preds/isObj' );
// var isNum = require( '../preds/isNum' );
// var isBool = require( '../preds/isBool' );
