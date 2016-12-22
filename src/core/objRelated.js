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
                keySpecAlts: {
                  spec: coerceIntoSpec( isStr ),
                },
                valSpecAlts: {
                  spec: or(
                    'valSpecAltsOnly', ExprSpec,
                    'keyValExprPair', cat(
                      'keySpecAlts', ExprSpec,
                      'valSpecAlts', ExprSpec
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
                keySpecAlts: {
                  pred: oneOf( 'req', 'required' ),
                },
                valSpecAlts: {
                  spec: KeyArrayOrFieldDefs
                },
              },
            },
            'optionalFields': {
              keyValExprPair: {
                keySpecAlts: {
                  pred: oneOf( 'opt', 'optional' ),
                },
                valSpecAlts: {
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
    'keySpecAlts', ExprSpec,
    'valSpecAlts', ExprSpec
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
  const { keySpecAlts, valSpecAlts } = cargs;

  var s = new Spec( {
    type: TYPE_MAP_OF,
    exprs: [],
    // TODO: do fragments
    fragments: [],
    opts: { keySpecAlts, valSpecAlts }
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
//           'a': { valSpecAltsOnly: { pred: isStr } }
//         }
//       }
//     }
//   }
// });
// //
// var r = TestSpec.conform({a: 's'});
// console.log(r);
