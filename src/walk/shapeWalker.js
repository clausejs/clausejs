var isProblem = require( '../utils/isProblem' );
var isUndefined = require( '../preds/isUndefined' );
var oAssign = require( '../utils/objectAssign' );
var Problem = require( '../models/Problem' );
var clauseFromAlts = require( '../utils/clauseFromAlts' );

function shapeWalker( clause, walkFn ) {
  var keyConformer;
  var { requiredFields, optionalFields } = clause.opts.conformedArgs.shapeArgs;

  var reqClauses,
    optClauses;
  if ( requiredFields ) {
    reqClauses = requiredFields.req || requiredFields.required;
  }
  if ( optionalFields ) {
    optClauses = optionalFields.opt || optionalFields.optional;
  }

  return {
    trailblaze: shapeTrailblaze,
    reconstruct: shapeReconstruct,
  };

  function shapeTrailblaze( x, walkOpts ) {
    if ( [ 'object', 'function' ].indexOf( typeof x ) < 0 ) {
      return new Problem( x, clause, [], 'Value is not an object' );
    }

    if ( !keyConformer ) {
       // lazy
      keyConformer = _genKeyConformer( reqClauses, optClauses, walkFn, walkOpts );
    }
    var keyConformedR = keyConformer( x );

    if ( isProblem( keyConformedR ) ) {
      return keyConformedR;
    }
    var problems = [];


    var guide = { val: x, groups: [], singles: [] };

    var reqFieldDefs;
    if ( reqClauses ) {
      reqFieldDefs = reqClauses.fieldDefs;
    }

    if ( reqFieldDefs ) {
      processFieldDefs_mut( reqFieldDefs );
    }

    var optFieldDefs;
    if ( optClauses ) {
      optFieldDefs = optClauses.fieldDefs;
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
      var newP = new Problem( x, clause, problemMap, 'At least one property failed validation: ' + failedNames.join( ', ' ) );
      return newP;
    } else {
      return guide;
    }

    function processFieldDefs_mut( fieldDefs ) {
      fieldLoop: for ( var name in fieldDefs ) {
        if ( fieldDefs.hasOwnProperty( name ) ) {
          var keyValAlts = fieldDefs[ name ];
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

    var { mutate } = walkOpts;

    var conformed;

    if ( mutate ) {
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

function restoreField_mut( x, { key, clause, guide }, walkFn, walkOpts ) {
  x[ key ] = walkFn( clause, guide, walkOpts );
}

function _genKeyConformer( reqClauses, optClause, walkFn, walkOpts ) {
  return function tryConformKeys( x ) {
    if ( reqClauses ) {
      let missingKeys = [];
      var { fieldDefs, keyList } = reqClauses;
      var reqNames;

      if ( fieldDefs ) {
        reqNames = [];
        for ( var name in fieldDefs ) {
          if ( fieldDefs.hasOwnProperty( name ) ) {
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
        //key clause
        if ( fieldDefs && fieldDefs[ reqName ].keyValExprPair ) {
          var found = false;
          keyTrav: for ( var kk in x ) {
            if ( x.hasOwnProperty( kk ) ) {
              var rr = _conformNamedOrExpr( kk, fieldDefs[ reqName ].keyValExprPair.keyExpression, walkFn, walkOpts );
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
        } else if ( fieldDefs && fieldDefs[ reqName ].valExpressionOnly ) {
          //key clause
          if ( x.hasOwnProperty( reqName ) ) {
            var rrr = _conformNamedOrExpr( x[ reqName ], fieldDefs[ reqName ].valExpressionOnly, walkFn, walkOpts );
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
        return new Problem( x, reqClauses, [], 'req: keys required: ' + missingKeys.join( ', ' ) );
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
            matchedKeys.push( { key: k, clause: clauseFromAlts( valExpression ), guide: valGuide } );
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
        return { singleMatch: { key: name, clause: clauseFromAlts( valExpressionOnly ), guide: g } };
      }
    } else {
      return { noop: true };
    }
  } else {
    throw '!!';
  }
}

function _conformNamedOrExpr( x, alts, walkFn, walkOpts ) {
  var s = clauseFromAlts( alts );
  var r = walkFn( s, x, walkOpts );
  return r;
}

module.exports = shapeWalker;
