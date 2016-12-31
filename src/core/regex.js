var oAssign = require( 'object-assign' );

var Clause = require( '../models/Clause' );
var isClause = require( '../utils/isClause' );
var isPred = require( '../utils/isPred' );
var isExpr = require( '../utils/isExpr' );
var not = require( '../preds/not' );
var clauseFromAlts = require( '../utils/clauseFromAlts' );
var isObj = require( '../preds/isObj' );
var isStr = require( '../preds/isStr' );
var isClauseName = require( '../utils/isClauseName' );
var namedFn = require( '../utils/namedFn' );
var isClauseRef = require( '../utils/isClauseRef' );
var isDelayedClause = require( '../utils/isDelayedClause' );
var c = require( '../core/constants' );
var coerceIntoClause = require( '../utils/coerceIntoClause' );
var fclause = require( './fclause' );
var walk = require( '../walk' );
var clauseClause = coerceIntoClause( isClause );
var nameClause = coerceIntoClause( isClauseName );

var catOp = genMultiArgOp( c.CAT );
var orOp = genMultiArgOp( c.OR );
var zeroOrMoreOp = genSingleArgOp( c.Z_OR_M );
var oneOrMoreOp = genSingleArgOp( c.O_OR_M );
var zeroOrOneOp = genSingleArgOp( c.Z_OR_O );
var collOfOp = genSingleArgOp( c.COLL_OF );

var ClauseClause = coerceIntoClause( isClause );
var ClauseRefClause = coerceIntoClause( isClauseRef );
var DelayedClauseClause = coerceIntoClause( isDelayedClause );
var PredClause = coerceIntoClause( isPred );

var ExprClause = orOp( {
  expressions: {
    withLabels: [
      { name: 'clause', expr: {
        clause: ClauseClause,
      } },
      { name: 'pred', expr: {
        clause: PredClause,
      } },
      { name: 'delayedClause', expr: {
        clause: DelayedClauseClause,
      } },
      { name: 'clauseRef', expr: {
        clause: ClauseRefClause,
      } },
    ],
  }
} );

var NameExprOptionalComment = catOp( {
  expressions: {
    withLabels: [
      { name: 'name', expr: {
        clause: nameClause,
      } },
      { name: 'comment', expr: {
        clause: zeroOrOneOp( {
          expr: {
            pred: isStr,
          }
        } ),
      } },
      { name: 'expr', expr: {
        clause: ExprClause,
      } },
    ],
  }
} );

var MultipleArgClause = catOp( {
  expressions: {
    withLabels: [
      { name: 'expressions',
        expr: {
          clause: orOp( {
            expressions: {
              withLabels: [
                {
                  name: 'withLabels',
                  expr: {
                    clause: orOp( {
                      expressions: {
                        withoutLabels: [
                          {
                            clause: zeroOrMoreOp( {
                              expr: {
                                clause: NameExprOptionalComment,
                              },
                            } )
                          },
                          {
                            clause: collOfOp( {
                              expr: {
                                clause: NameExprOptionalComment,
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
                    clause: zeroOrMoreOp( {
                      expr: {
                        clause: ExprClause,
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
          clause: zeroOrOneOp( {
            expr: {
              clause: andOp( [
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
  var andS = new Clause( {
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

var multipleArgNoDupeClause = andOp(
  [ { clause: MultipleArgClause },
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

var AndFnClause = fclause( {
  args: oneOrMoreOp( { expr:
    { clause: ExprClause }
  } ),
  ret: isClause,
} );

var multipleArgOpClause = {
  args: multipleArgNoDupeClause,
  ret: clauseClause,
};

var singleArgOpClauseFn = ( optClause ) => ( {
  args: catOp( {
    expressions: {
      withLabels: [
        {
          name: 'expr',
          expr: {
            clause: ExprClause,
          }
        },
        {
          name: 'opts',
          expr: {
            clause: zeroOrOneOp( {
              expr: optClause
            } ),
          }
        },
      ],
    }
  } ),
  ret: clauseClause,
} );

function genMultiArgOp( type ) {
  return namedFn( type, function _( { expressions: { withLabels, withoutLabels }, options } ) {
    var exprs;
    if ( withLabels ) {
      exprs = withLabels;

      var coercedExprs = exprs.map( ( p ) => {
        var alts = p.expr;
        var s = clauseFromAlts( alts );

        return oAssign( {}, p, {
          expr: s,
          clause: undefined, pred: undefined,
          clauseRef: undefined, delayedClause: undefined } );
      } );

      let opts = oAssign( {}, options, {
        named: true,
      } );
      var s = new Clause( {
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
        if ( p.clause ) {
          s = p.clause;
          return oAssign( {}, p, { expr: s, clause: undefined } );
        } else if ( p.pred ) {
          s = coerceIntoClause( p.pred );
          return oAssign( {}, p, { expr: s, pred: undefined } );
        } else if ( p.clauseRef ) {
          s = p.clauseRef;
          return oAssign( {}, p, { expr: s, clauseRef: undefined } );
        } else if ( p.delayedClause ) {
          s = p.delayedClause;
          return oAssign( {}, p, { expr: s, delayedClause: undefined } );
        } else {
          console.error( p );
          throw '!';
        }
      } );

      let opts = oAssign( {}, options, {
        named: false,
      } );

      s = new Clause( {
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
      s = new Clause( {
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

    if ( p.clause ) {
      expr = p.clause;
    } else if ( p.pred ) {
      expr = coerceIntoClause( p.pred );
    } else if ( p.clauseRef ) {
      expr = p.clauseRef;
    } else if ( p.delayedClause ) {
      expr = p.delayedClause;
    } else {
      console.error( p );
      throw 'internal err';
    }
    const sureClause = coerceIntoClause( expr );
    var s = new Clause( {
      type,
      exprs: [ sureClause ],
      opts: oAssign( {}, opts, { enclosedClause: sureClause } ),
    } );

    s.conform = function conform( x ) {
      return walk( s, x, { conform: true } );
    }
    return s;
  } );
}

var CollOfClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
var collOf = CollOfClause.instrumentConformed( collOfOp );

var CatFnClause = fclause( multipleArgOpClause );
var OrFnClause = fclause( multipleArgOpClause );
var ZeroOrMoreFnClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
var OneOrMoreFnClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
var ZeroOrOneFnClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
var and = AndFnClause.instrumentConformed( andOp );

var core = {
  cat: CatFnClause.instrumentConformed( catOp ),
  or: OrFnClause.instrumentConformed( orOp ),
  zeroOrMore: ZeroOrMoreFnClause.instrumentConformed( zeroOrMoreOp ),
  zeroOrOne: ZeroOrOneFnClause.instrumentConformed( zeroOrOneOp ),
  oneOrMore: OneOrMoreFnClause.instrumentConformed( oneOrMoreOp ),
  ExprClause, ClauseClause, PredClause, DelayedClauseClause, ClauseRefClause,
  CatFnClause,
  AndFnClause,
  OrFnClause,
  ZeroOrMoreFnClause, OneOrMoreFnClause, ZeroOrOneFnClause,
  CollOfClause,
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
