var isProblem = require( '../utils/isProblem' );
var Problem = require( '../models/Problem' );
var functionName = require( '../utils/fnName' );
var namedFn = require( '../utils/namedFn' );
var betterThrow = require( '../utils/betterThrow' );
var stringifyWithFnName = require( '../utils/stringifyWithFnName' );

function fclauseWalker( clause, walkFn ) {
  var { args: argsClause, ret: retClause, fn: validateFn } = clause.opts;

  return {
    trailblaze: fclauseTrailblaze,
    reconstruct: fclauseReconstruct,
  };

  function fclauseTrailblaze( fn ) {
    return fn;
  }

  function fclauseReconstruct( fn, walkOpts ) {
    if ( fn ) {
      var { conform, instrument } = walkOpts;

      if ( conform && instrument ) {
        return instrumentConformed( fn, walkOpts );
      } else if ( instrument ) {
        return _instrument( fn, walkOpts );
      }
    } else {
      throw new Error( 'A function must be clauseified for instrumentation.' );
    }
  }

  function _instrument( fn, walkOpts ) {
    var fnName = functionName( fn );
    var instrumentedFn = getInstrumentedFn( fnName, fn, walkOpts );
    var namedClauseedFn = namedFn( fnName, instrumentedFn, '__instrumented' );
    return namedClauseedFn;
  }

  function instrumentConformed( fn, walkOpts ) {
    var fnName = functionName( fn );
    var argConformedFn = getArgConformedInstrumentedFn( fnName, fn, walkOpts );
    var namedArgConformedFn = namedFn( fnName, argConformedFn, '__conformed' );

    return namedArgConformedFn;
  }

  function getInstrumentedFn( fnName, fn ) {
    return function __instrumented() {
      var args = Array.prototype.slice.call( arguments );
      var instrumentedArgs = checkArgs( fn, fnName, args );
      var retVal = fn.apply( this, instrumentedArgs );
      var instrumentedRetVal = checkRet( fn, fnName, retVal );

      // TODO optimize
      var conformedArgs =
      argsClause ?
        walkFn( argsClause, args, { conform: true, instrument: true } ) :
        args;
      let conformedRetVal;
      if ( retClause ) {
        conformedRetVal = walkFn( retClause, retVal, { conform: true, instrument: true } );
      } else {
        conformedRetVal = retVal;
      }

      checkFnRelation( fnName, fn, validateFn, conformedArgs, conformedRetVal );
      return instrumentedRetVal;
    };
  }

  function checkFnRelation( fnName, fn, validateFn, conformedArgs, retVal ) {
    if ( validateFn ) {
      var r = validateFn.call( null, conformedArgs, retVal );
      if ( !r ) {
        var p = new Problem( fn, clause, [],
          `Function ${fnName} failed valiation on argument-return value relation` );
        betterThrow( p );
      }
    }
  }

  function checkArgs( fn, fnName, args ) {
    if ( argsClause ) {
      var instrumentedArgs = walkFn( argsClause, args, { phase: 'trailblaze' } );
      if ( isProblem( instrumentedArgs ) ) {
        var p = new Problem( args, clause, [ instrumentedArgs ], `Arguments ${stringifyWithFnName( args )} for function ${fnName} is not valid` );
        betterThrow( p );
      } else {
        return walkFn( argsClause, instrumentedArgs, { phase: 'reconstruct', conform: false, instrument: true } );
      }
    } else {
      return args;
    }
  }

  function checkRet( fn, fnName, retVal ) {
    if ( retClause ) {
      var instrumentedRetVal = walkFn( retClause, retVal, { phase: 'trailblaze' } );
      if ( isProblem( instrumentedRetVal ) ) {
        var p = new Problem( retVal, clause, [ instrumentedRetVal ], 'Return value for function ' + ( fnName || '<anonymous>' ) + '() is not valid' );
        betterThrow( p );
      } else {
        var r = walkFn( retClause, instrumentedRetVal, { phase: 'reconstruct', instrument: true, conform: false } );
        return r;
      }
    } else {
      return retVal;
    }
  }

  function getArgConformedInstrumentedFn( fnName, fn ) {
    return function __instrumentConformed() {
      var args = Array.prototype.slice.call( arguments );

      var conformedArgs = walkFn( argsClause, args, { conform: true, instrument: true } );
      if ( isProblem( conformedArgs ) ) {
        var p = new Problem( args, argsClause, [ conformedArgs ], `Arguments ${stringifyWithFnName( args )} for function ${fnName} is not valid` );
        betterThrow( p );
      }

      var retVal = fn.call( this, conformedArgs );

      checkRet( fn, fnName, retVal );

      if ( validateFn ) {
        var conformedRetVal;
        if ( retClause ) {
          conformedRetVal = walkFn( retClause, retVal, { conform: true, instrument: true } );
        } else {
          conformedRetVal = retVal;
        }
        checkFnRelation( fnName, fn, validateFn, conformedArgs, conformedRetVal );
      }

      return retVal;
    };
  }

}

module.exports = fclauseWalker;
