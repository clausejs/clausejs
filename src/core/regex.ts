import Clause from "../models/Clause";
import isClause from "../utils/isClause";
import isPred from "../utils/isPred";
import clauseFromAlts from "../utils/clauseFromAlts";
import isProblem from "../utils/isProblem";
import isClauseName from "../utils/isClauseName";
import namedFn from "../utils/namedFn";
import isClauseRef from "../utils/isClauseRef";
import isDelayedClause from "../utils/isDelayedClause";
import c from "../core/constants";
import coerceIntoClause from "../utils/coerceIntoClause";
import fclause from "./fclause";
import walk from "../walk";

import isObj from "../preds/isObj";
import isStr from "../preds/isStr";
import oneOf from "../preds/oneOf";
import isPlainObj from "../preds/isPlainObj";

var clauseClause = coerceIntoClause( isClause );
var nameClause = coerceIntoClause( isClauseName );

var catOp = genMultiArgOp( c.CAT );
var orOp = genMultiArgOp( c.OR );
var zeroOrMoreOp = genSingleArgOp( c.Z_OR_M );
var oneOrMoreOp = genSingleArgOp( c.O_OR_M );
var zeroOrOneOp = genSingleArgOp( c.Z_OR_O );
var collOfOp = genSingleArgOp( c.COLL_OF );

export const ClauseClause = coerceIntoClause( isClause );
export const ClauseRefClause = coerceIntoClause( isClauseRef );
export const DelayedClauseClause = coerceIntoClause( isDelayedClause );
export const PredClause = coerceIntoClause( isPred );

// helper method for constructing labelled structure
function _labelled( ...arr) {
  return {
    expressions: {
      withLabels: arr.map(
        ( [ name, type, v ] ) =>
          ( { name, expr: { [ type ]: v } } )
      )
    }
  };
}

function _unlabelled(...arr) {
  return {
    expressions: {
      withoutLabels: arr.map(
        ( [ type, v ] ) =>
          ( { [ type ]: v } )
      )
    }
  };
}

export const ExprClause = orOp( _labelled(
    [ 'clause', 'clause', ClauseClause ],
    [ 'pred', 'clause', PredClause ]
  ) );

export const NameExprOptionalComment = catOp( _labelled(
    [ 'name', 'clause', nameClause ],
    [ 'comment', 'clause', zeroOrOneOp( { expr: { pred: isStr } } ) ],
    [ 'expr', 'clause', ExprClause ]
  ) );

export const MultipleArgClause = catOp( _labelled(
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
    opts: { conformedExprs: exprs },
    conformFn: function andConform( x ) {
      return walk( andS, x, { conform: true } );
    },
    generateFn: null,
  } );
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

export const AndFnClause = fclause( {
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

        return Object.assign( {}, p, {
          expr: s,
          clause: undefined, pred: undefined,
          clauseRef: undefined, delayedClause: undefined } );
      } );

      let opts = Object.assign( {}, options, {
        named: true,
      } );
      var s = new Clause( {
        type,
        exprs: coercedExprs,
        opts,
        conformFn: function conform( x ) {
          return walk( s, x, { conform: true } );
        },
        generateFn: null,
      } );

      return s;
    } else if ( withoutLabels ) {
      exprs = withoutLabels;
      coercedExprs = exprs.map( ( p ) => {
        var s;
        if ( p.clause ) {
          s = p.clause;
          return Object.assign( {}, p, { expr: s, clause: undefined } );
        } else if ( p.pred ) {
          s = coerceIntoClause( p.pred );
          return Object.assign( {}, p, { expr: s, pred: undefined } );
        } else if ( p.clauseRef ) {
          s = p.clauseRef;
          return Object.assign( {}, p, { expr: s, clauseRef: undefined } );
        } else if ( p.delayedClause ) {
          s = p.delayedClause;
          return Object.assign( {}, p, { expr: s, delayedClause: undefined } );
        } else {
          console.error( p );
          throw '!';
        }
      } );

      let opts = Object.assign( {}, options, {
        named: false,
      } );

      s = new Clause( {
        type,
        exprs: coercedExprs,
        opts,
        conformFn: function conform( x ) {
          return walk( s, x, { conform: true } );
        },
        generateFn: null,
      } );

      return s;
    } else {
      // empty case
      s = new Clause( {
        type,
        exprs: [], 
        opts: {},
        conformFn: function conform( x ) {
          return walk( s, x, { conform: true } );
        },
        generateFn: null,
      } );
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
      opts: Object.assign( {}, opts, { enclosedClause: sureClause } ),
      conformFn: null,
      generateFn: null,
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

export const ShapeArgs = shapeOp( {
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

export const MapOfFnClause = fclause( {
  args: catOp(
    _labelled(
      [ 'keyExpression', 'clause', ExprClause ],
      [ 'valExpression', 'clause', ExprClause ]
    )
  ),
  ret: isClause,
} );

export const TestClause = shapeOp( {
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

export const ShapeFnClause = fclause( {
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
    opts: { keyExpression, valExpression },
    conformFn: function mapOfConform( x ) {
      return walk( s, x, { conform: true } );
    },
    generateFn: null,
  } );

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
    opts: { conformedArgs: cargs },
    conformFn: function shapeConform( x ) {
      return walk( s, x, { conform: true } );
    },
    generateFn: null,
  } );
  return s;
}

export const shape = ShapeFnClause.instrumentConformed( shapeOp );
export const mapOf = MapOfFnClause.instrumentConformed( mapOfOp );


export const CollOfClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
export const collOf = CollOfClause.instrumentConformed( collOfOp );

export const CatFnClause = fclause( multipleArgOpClause );
export const OrFnClause = fclause( multipleArgOpClause );
export const ZeroOrMoreFnClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
export const OneOrMoreFnClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
export const ZeroOrOneFnClause = fclause( singleArgOpClauseFn( { pred: isObj } ) );
export const and = AndFnClause.instrumentConformed( andOp );

export const cat = CatFnClause.instrumentConformed( catOp );
export const or = OrFnClause.instrumentConformed( orOp );
export const zeroOrMore = ZeroOrMoreFnClause.instrumentConformed( zeroOrMoreOp );
export const oneOrMore = OneOrMoreFnClause.instrumentConformed( oneOrMoreOp );
export const zeroOrOne =  ZeroOrOneFnClause.instrumentConformed( zeroOrOneOp );


const core = {
  cat, or, zeroOrMore, oneOrMore, zeroOrOne,
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
};

core[ 'alt' ] = core.or;
core[ '*' ] = core.zeroOrMore;
core[ '+' ] = core.oneOrMore;
core[ '?' ] = core.zeroOrOne;

export {  fclause, shape as keys };

export default core;

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
