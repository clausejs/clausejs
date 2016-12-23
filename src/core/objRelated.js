var Spec = require( '../models/Spec' );
var isSpec = require( '../utils/isSpec' );
var isStr = require( '../preds/isStr' );
var oneOf = require( '../preds/oneOf' );
var isProblem = require( '../utils/isProblem' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var { cat, or, zeroOrMore, ExprSpec } = require( './regex' );
var walk = require( '../walk' );
var fspec = require( './fspec' );

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
                  spec: coerceIntoSpec( isStr ),
                },
                valExpression: {
                  spec: or(
                    'valExpressionOnly', ExprSpec,
                    'keyValExprPair', cat(
                      'keyExpression', ExprSpec,
                      'valExpression', ExprSpec
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
                  spec: KeyArrayOrFieldDefs
                },
              },
            },
            'optionalFields': {
              keyValExprPair: {
                keyExpression: {
                  pred: oneOf( 'opt', 'optional' ),
                },
                valExpression: {
                  spec: KeyArrayOrFieldDefs
                },
              },
            },
          }
        }
      }
    },
  }
} );

var MapOfFnSpec = fspec( {
  args: cat(
    'keyExpression', ExprSpec,
    'valExpression', ExprSpec
  ),
  ret: isSpec,
} );

var ShapeFnSpec = fspec( {
  args: cat( 'shapeArgs', ShapeArgs ),
  ret: isSpec,
} );

function mapOfOp( cargs ) {
  if ( isProblem( cargs ) ) {
    throw cargs;
  }
  const { keyExpression, valExpression } = cargs;

  var s = new Spec( {
    type: TYPE_MAP_OF,
    exprs: [],
    // TODO: do fragments
    fragments: [],
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
  const { shapeArgs: { requiredFields, optionalFields } } = cargs;

  var s = new Spec( {
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

var shape = ShapeFnSpec.instrumentConformed( shapeOp );
var mapOf = MapOfFnSpec.instrumentConformed( mapOfOp );

module.exports = {
  shape,
  keys: shape,
  mapOf,
  ShapeFnSpec,
  MapOfFnSpec,
};

// // // // //

// var TestSpec = shapeOp({
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
// var r = TestSpec.conform({a: 's'});
// console.log(r);
