var oAssign = require( '../utils/objectAssign' );
var Clause = require( '../models/Clause' );
var isClause = require( '../utils/isClause' );
var isPred = require( '../utils/isPred' );
var clauseFromAlts = require( '../utils/clauseFromAlts' );
var isProblem = require( '../utils/isProblem' );
var isClauseName = require( '../utils/isClauseName' );
var namedFn = require( '../utils/namedFn' );
var isClauseRef = require( '../utils/isClauseRef' );
var isDelayedClause = require( '../utils/isDelayedClause' );
var c = require( '../core/constants' );
var coerceIntoClause = require( '../utils/coerceIntoClause' );
var fclause = require( './fclause' );
var walk = require( '../walk' );

var isObj = require( '../preds/isObj' );
var isStr = require( '../preds/isStr' );
var oneOf = require( '../preds/oneOf' );
var isPlainObj = require( '../preds/isPlainObj' );

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


// helper method for constructing labelled structure
function _labelled( ) {
  var arr = Array.prototype.slice.call( arguments );
  return {
    expressions: {
      withLabels: arr.map(
        ( [ name, type, v ] ) =>
          ( { name, expr: { [ type ]: v } } )
      )
    }
  };
}

function _unlabelled() {
  var arr = Array.prototype.slice.call( arguments );
  return {
    expressions: {
      withoutLabels: arr.map(
        ( [ type, v ] ) =>
          ( { [ type ]: v } )
      )
    }
  };
}

var ExprClause = orOp( _labelled(
    [ 'clause', 'clause', ClauseClause ],
    [ 'pred', 'clause', PredClause ]
  ) );

var NameExprOptionalComment = catOp( _labelled(
    [ 'name', 'clause', nameClause ],
    [ 'comment', 'clause', zeroOrOneOp( { expr: { pred: isStr } } ) ],
    [ 'expr', 'clause', ExprClause ]
  ) );

var MultipleArgClause = catOp( _labelled(
  [
    'expressions', 'clause',
    orOp( _labelled(
      [
        'withLabels', 'clause',
        orOp( _unlabelled(
          [
            'clause',
            zeroOrMoreOp( {
              expr: { clause: NameExprOptionalComment },
            } )
          ],
          [
            'clause',
            collOfOp( {
              expr: { clause: NameExprOptionalComment },
            } )
          ]
         ) )
      ],
      [
        'withoutLabels', 'clause',
        zeroOrMoreOp( {
          expr: { clause: ExprClause },
        } )
      ]
    ) )
  ],
  [
    'options', 'clause',
    zeroOrOneOp( {
      expr:
        { pred: isPlainObj }
    } )
  ]
) );

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

var singleArgOpClauseFn = ( optClauseAlts ) => ( {
  args: catOp( _labelled(
    [ 'expr', 'clause', ExprClause ],
    [
      'opts', 'clause',
      zeroOrOneOp( { expr: optClauseAlts } )
    ]
  ) ),
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
        exprs: [], opts: {} } );
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


function isPropName( x ) {
  return isStr( x );
}

var TYPE_SHAPE = 'SHAPE';
var TYPE_MAP_OF = 'MAP_OF';

var FieldDefs = mapOfOp( {
  keyExpression: {
    clause: coerceIntoClause( isStr ),
  },
  valExpression: {
    clause: orOp( _labelled(
      [ 'valExpressionOnly', 'clause', ExprClause ],
      [
        'keyValExprPair', 'clause',
        catOp( _labelled(
          [ 'keyExpression', 'clause', ExprClause ],
          [ 'valExpression', 'clause', ExprClause ]
        ) )
      ]
    ) )
  },
} );


var KeyOnlyArray = zeroOrMoreOp( {
  expr: { pred: isPropName }
} );

var KeyArrayOrFieldDefs = orOp( _labelled(
  [ 'keyList', 'clause', KeyOnlyArray ],
  [ 'fieldDefs', 'clause', FieldDefs ]
) );

var ShapeArgs = shapeOp( {
  shapeArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          'requiredFields': {
            keyValExprPair: {
              keyExpression: {
                pred: oneOf( 'req', 'required' ),
              },
              valExpression: {
                clause: KeyArrayOrFieldDefs
              },
            },
          },
          'optionalFields': {
            keyValExprPair: {
              keyExpression: {
                pred: oneOf( 'opt', 'optional' ),
              },
              valExpression: {
                clause: KeyArrayOrFieldDefs
              },
            },
          },
        }
      }
    },
  }
} );

var MapOfFnClause = fclause( {
  args: catOp(
    _labelled(
      [ 'keyExpression', 'clause', ExprClause ],
      [ 'valExpression', 'clause', ExprClause ]
    )
  ),
  ret: isClause,
} );

var TestClause = shapeOp( {
  shapeArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          'requiredFields': {
            keyValExprPair: {
              keyExpression: {
                pred: oneOf( 'req', 'required' ),
              },
              valExpression: {
                clause: KeyArrayOrFieldDefs
              },
            },
          },
          'optionalFields': {
            keyValExprPair: {
              keyExpression: {
                pred: oneOf( 'opt', 'optional' ),
              },
              valExpression: {
                clause: KeyArrayOrFieldDefs
              },
            },
          },
        }
      }
    },
  }
} );

var ShapeFnClause = fclause( {
  args: catOp( _labelled(
      [ 'shapeArgs', 'clause', ShapeArgs ]
    ) ),
  ret: isClause,
} );

function mapOfOp( cargs ) {
  if ( isProblem( cargs ) ) {
    throw cargs;
  }
  const { keyExpression, valExpression } = cargs;

  var s = new Clause( {
    type: TYPE_MAP_OF,
    exprs: [],
    opts: { keyExpression, valExpression }
  } );

  s.conform = function mapOfConform( x ) {
    return walk( s, x, { conform: true } );
  }

  return s;
}

function shapeOp( cargs ) {
  if ( isProblem( cargs ) ) {
    throw cargs;
  }
  // const { shapeArgs: { requiredFields, optionalFields } } = cargs;
  var s = new Clause( {
    type: TYPE_SHAPE,
    exprs: [ ],
    // TODO: do fragments
    fragments: [ ],
    opts: { conformedArgs: cargs }
  } );
  s.conform = function shapeConform( x ) {
    return walk( s, x, { conform: true } );
  }
  return s;
}

var shape = ShapeFnClause.instrumentConformed( shapeOp );
var mapOf = MapOfFnClause.instrumentConformed( mapOfOp );


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
  shape,
  keys: shape,
  mapOf,
  ShapeFnClause,
  MapOfFnClause,
  // TestClause,
};

core[ 'alt' ] = core.or;
core[ '*' ] = core.zeroOrMore;
core[ '+' ] = core.oneOrMore;
core[ '?' ] = core.zeroOrOne;

module.exports = core;


// // // // //

// var TestClause = shapeOp({
//   shapeArgs: {
//     req: {
//       fieldDefs: {
//         'a': { valExpressionOnly: { pred: isStr } }
//       }
//     }
//   }
// });
// //
// var r = TestClause.conform({a: 's'});
// console.log(r);


// // //
//
// var isStr = require( '../preds/isStr' );
// var isObj = require( '../preds/isObj' );
// var isNum = require( '../preds/isNum' );
// var isBool = require( '../preds/isBool' );
