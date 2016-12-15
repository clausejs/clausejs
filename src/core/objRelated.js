var Spec = require( '../models/Spec' );
var isSpec = require( '../utils/isSpec' );
var isStr = require( '../preds/isStr' );
var oneOf = require( '../preds/oneOf' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var { cat, or, zeroOrMore, ExprSpec } = require( './regex' );
var walk = require( '../walk' );
var fspec = require( './fspec' );

function isPropName( x ) {
  return isStr( x );
}

var TYPE_SHAPE = 'SHAPE';

var FieldDefs = shapeOp( {
  propArgs: {
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

var PropArgs = shapeOp( {
  propArgs: {
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

var ShapeSpec = fspec( {
  args: cat( 'propArgs', PropArgs ),
  ret: isSpec,
} );

function shapeOp( cargs ) {
  const { propArgs: { requiredFields, optionalFields } } = cargs;

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

var shape = ShapeSpec.instrumentConformed( shapeOp );

module.exports = {
  shape,
  keys: shape,
  ShapeSpec,
};

// // // // //

// var TestSpec = shapeOp({
//   propArgs: {
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
