var Spec = require( '../models/Spec' );
var isSpec = require( '../utils/isSpec' );
var isStr = require( '../preds/isStr' );
var isFn = require( '../preds/isFn' );
var oneOf = require( '../preds/oneOf' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var { cat, or, zeroOrMore, ExprSpec } = require( './regex' );
var walk = require( '../walk' );
var fspec = require( './fspec' );

function isPropName( x ) {
  return isStr( x );
}

var TYPE_PROPS = 'PROPS';

var FieldDefs = propsOp( {
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

var PropArgs = propsOp( {
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

var PropsSpec = fspec( {
  args: cat( 'propArgs', PropArgs ),
  ret: isSpec,
} );

function propsOp( cargs ) {
  var s = new Spec( TYPE_PROPS, [ cargs ], null, null, null );
  s.conform = function propsConform( x ) {
    return walk( s, x, { conform: true } );
  }
  return s;
}

var props = PropsSpec.instrumentConformed( propsOp );

module.exports = {
  props,
  keys: props,
};

// // // // //

// var TestSpec = propsOp({
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
