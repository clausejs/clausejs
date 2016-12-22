var isProblem = require( '../utils/isProblem' );
var isUndefined = require( '../preds/isUndefined' );
var oAssign = require( 'object-assign' );
var Problem = require( '../models/Problem' );
var specFromAlts = require( '../utils/specFromAlts' );

function shapeWalker( spec, walkFn ) {
  var keyConformer;
  var { requiredFields, optionalFields } = spec.opts.conformedArgs.shapeArgs;

  var reqSpecs,
    optSpecs;
  if ( requiredFields ) {
    reqSpecs = requiredFields.req || requiredFields.required;
  }
  if ( optionalFields ) {
    optSpecs = optionalFields.opt || optionalFields.optional;
  }

  return {
    trailblaze: shapeTrailblaze,
    reconstruct: shapeReconstruct,
  };

  function shapeTrailblaze( x, walkOpts ) {
    if ( [ 'object', 'function' ].indexOf( typeof x ) < 0 ) {
      return new Problem( x, spec, [], 'Value is not an object' );
    }

    if ( !keyConformer ) {
       // lazy
      keyConformer = _genKeyConformer( reqSpecs, optSpecs, walkFn, walkOpts );
    }
    var keyConformedR = keyConformer( x );

    if ( isProblem( keyConformedR ) ) {
      return keyConformedR;
    }
    var problems = [];


    var guide = { val: x, groups: [], singles: [] };

    var reqFieldDefs;
    if ( reqSpecs ) {
      reqFieldDefs = reqSpecs.fieldDefs;
    }

    if ( reqFieldDefs ) {
      processFieldDefs_mut( reqFieldDefs );
    }

    var optFieldDefs;
    if ( optSpecs ) {
      optFieldDefs = optSpecs.fieldDefs;
    }
    if ( optFieldDefs ) {
      processFieldDefs_mut( optFieldDefs, true );
    }

    if ( problems.length > 0 ) {
      var problemMap = {};
      var failedNames = [];
      for ( var i = 0; i < problems.length; i++ ) {
        var [ n, p ] = problems[ i ];
        failedNames.push( n );
        problemMap[ n ] = p;
      }
      var newP = new Problem( x, spec, problemMap, 'At least one property failed validation: ' + failedNames.join( ', ' ) );
      return newP;
    } else {
      return guide;
    }

    function processFieldDefs_mut( fieldDefs ) {
      fieldLoop: for ( var name in fieldDefs.fields ) {
        if ( fieldDefs.fields.hasOwnProperty( name ) ) {
          var keyValAlts = fieldDefs.fields[ name ];
          var { noop, problem, singleMatch, groupMatch } = getFieldGuide( x, name, keyValAlts, walkFn, walkOpts );
          if ( problem ) {
            problems.push( [ name, problem ] );
            //TODO: improve this;
            break fieldLoop;
          } else if ( singleMatch ) {
            guide.singles.push( singleMatch );
          } else if ( groupMatch ) {
            if ( groupMatch.matchedKeys.length > 0 ) {
              guide.groups.push( groupMatch );
            }
          } else if ( !noop ) {
            throw '!';
          }
        }
      }
    }
  }

  function shapeReconstruct( { val, singles, groups }, walkOpts ) {

    var conform = { walkOpts };

    var { instrument } = walkOpts;

    var conformed;

    if ( instrument ) {
      conformed = val;
    } else {
      conformed = oAssign( {}, val );
    }

    singles.forEach( ( fieldGuide ) => {
      restoreField_mut( conformed, fieldGuide, walkFn, walkOpts );
    } );

    groups.forEach( ( { name, matchedKeys } ) => {
      if ( conform ) {
        conformed[ name ] = {};
        var keysToDel = [];
        matchedKeys.forEach( ( fieldGuide ) => {
          restoreField_mut( conformed[ name ], fieldGuide, walkFn, walkOpts );
          keysToDel.push( fieldGuide.key );
        } );
        _deleteKeys( conformed, keysToDel );
      } else {
        matchedKeys.forEach( ( fieldGuide ) => {
          restoreField_mut( conformed, fieldGuide, walkFn, walkOpts );
        } );
      }
    } );

    return conformed;
  }
}

function restoreField_mut( x, { key, spec, guide }, walkFn, walkOpts ) {
  x[ key ] = walkFn( spec, guide, walkOpts );
}

function _genKeyConformer( reqSpecs, optSpec, walkFn, walkOpts ) {
  return function tryConformKeys( x ) {
    if ( reqSpecs ) {
      let missingKeys = [];
      var { fieldDefs, keyList } = reqSpecs;
      var reqNames;

      if ( fieldDefs ) {
        reqNames = [];
        for ( var name in fieldDefs.fields ) {
          if ( fieldDefs.fields.hasOwnProperty( name ) ) {
            reqNames.push( name );
          }
        }
      } else if ( keyList ) {
        reqNames = [].concat( keyList );
      } else {
        throw 'unsupported';
      }

      for ( var i = 0; i < reqNames.length; i++ ) {
        var reqName = reqNames[ i ];
        //key spec
        if ( fieldDefs && fieldDefs.fields[ reqName ].keyValExprPair ) {
          var found = false;
          keyTrav: for ( var kk in x ) {
            if ( x.hasOwnProperty( kk ) ) {
              var rr = _conformNamedOrExpr( kk, fieldDefs.fields[ reqName ].keyValExprPair.keyExpression, walkFn, walkOpts );
              if ( !isProblem( rr ) ) {
                //found a match
                found = true;
                break keyTrav;
              }
            }
          }
          if ( !found ) {
            missingKeys.push( reqName );
          }
        } else if ( fieldDefs && fieldDefs.fields[ reqName ].valExpressionOnly ) {
          //key spec
          if ( x.hasOwnProperty( reqName ) ) {
            var rrr = _conformNamedOrExpr( x[ reqName ], fieldDefs.fields[ reqName ].valExpressionOnly, walkFn, walkOpts );
            if ( isProblem( rrr ) ) {
              //found a match
              missingKeys.push( reqName );
            }
          } else {
            missingKeys.push( reqName );
          }
        } else if ( keyList ) {
           //plain string key
          if ( x[ reqName ] === undefined ) {
            missingKeys.push( reqName );
          }
        } else {
          throw '!';
        }
      }
      if ( missingKeys.length > 0 ) {
        return new Problem( x, reqSpecs, [], 'req: keys required: ' + missingKeys.join( ', ' ) );
      }
    }

    return x;
  }
}


function _deleteKeys( subject, keys ) {
  for ( var i = 0; i < keys.length; i++ ) {
    delete subject[ [ keys[ i ] ] ];
  }
}

function getFieldGuide( x, name, keyValAlts, walkFn, walkOpts ) {
  var { valExpressionOnly, keyValExprPair } = keyValAlts;
  if ( keyValExprPair ) {
    var matchedKeys = [];

    var { keyExpression, valExpression } = keyValExprPair;
    keysExamine: for ( var k in x ) {
      if ( x.hasOwnProperty( k ) ) {
        var keyResult = _conformNamedOrExpr( k, keyExpression, walkFn, walkOpts );
        if ( !isProblem( keyResult ) ) {
          // single string char case, where name = 0 and x = ''
          if ( x === x[ k ] ) {
            continue keysExamine;
          }
          var valGuide = _conformNamedOrExpr( x[ k ], valExpression, walkFn, walkOpts );
          if ( isProblem( valGuide ) ) {
            //TODO: improve
            return { problem: valGuide };
          } else {
            matchedKeys.push( { key: k, spec: specFromAlts( valExpression ), guide: valGuide } );
          }
        }
      }
    }
    return { groupMatch: { name, matchedKeys } };
  } else if ( valExpressionOnly ) {
    var v = x[ name ];
    // single string char case, name = 0
    if ( !isUndefined( v ) && x[ name ] !== x ) {
      var g = _conformNamedOrExpr( v, valExpressionOnly, walkFn, walkOpts );
      if ( isProblem( g ) ) {
        return { problem: g };
      } else {
        return { singleMatch: { key: name, spec: specFromAlts( valExpressionOnly ), guide: g } };
      }
    } else {
      return { noop: true };
    }
  } else {
    throw '!!';
  }
}

function _conformNamedOrExpr( x, alts, walkFn, walkOpts ) {
  var s = specFromAlts( alts );
  var r = walkFn( s, x, walkOpts );
  return r;
}

module.exports = shapeWalker;
