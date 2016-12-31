var Clause = require( '../models/Clause' );
var isClause = require( '../utils/isClause' );
var isStr = require( '../preds/isStr' );
var oneOf = require( '../preds/oneOf' );
var isProblem = require( '../utils/isProblem' );
var coerceIntoClause = require( '../utils/coerceIntoClause' );
var { cat, or, zeroOrMore, ExprClause } = require( './regex' );
var walk = require( '../walk' );
var fclause = require( './fclause' );

function isPropName( x ) {
  return isStr( x );
}

var TYPE_SHAPE = 'SHAPE';
var TYPE_MAP_OF = 'MAP_OF';

var FieldDefs = shapeOp( {
  shapeArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          fields: {
            'fields':
            {
              keyValExprPair: {
                keyExpression: {
                  clause: coerceIntoClause( isStr ),
                },
                valExpression: {
                  clause: or(
                    'valExpressionOnly', ExprClause,
                    'keyValExprPair', cat(
                      'keyExpression', ExprClause,
                      'valExpression', ExprClause
                    )
                  )
                },
              }
            },
          }
        }
      }
    },
  }
} );


var KeyOnlyArray = zeroOrMore( isPropName );
var KeyArrayOrFieldDefs = or( 'keyList', KeyOnlyArray, 'fieldDefs', FieldDefs );

var ShapeArgs = shapeOp( {
  shapeArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          fields: {
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
      }
    },
  }
} );

var MapOfFnClause = fclause( {
  args: cat(
    'keyExpression', ExprClause,
    'valExpression', ExprClause
  ),
  ret: isClause,
} );

var ShapeFnClause = fclause( {
  args: cat( 'shapeArgs', ShapeArgs ),
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

module.exports = {
  shape,
  keys: shape,
  mapOf,
  ShapeFnClause,
  MapOfFnClause,
};

// // // // //

// var TestClause = shapeOp({
//   shapeArgs: {
//     req: {
//       fieldDefs: {
//         fields: {
//           'a': { valExpressionOnly: { pred: isStr } }
//         }
//       }
//     }
//   }
// });
// //
// var r = TestClause.conform({a: 's'});
// console.log(r);
