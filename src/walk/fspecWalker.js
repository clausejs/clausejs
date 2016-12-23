var isProblem = require( '../utils/isProblem' );
var Problem = require( '../models/Problem' );
var functionName = require( '../utils/fnName' );
var namedFn = require( '../utils/namedFn' );
var betterThrow = require( '../utils/betterThrow' );

function fspecWalker( spec, walkFn ) {
  var { args: argsSpec, ret: retSpec, fn: validateFn } = spec.opts;

  return {
    trailblaze: fspecTrailblaze,
    reconstruct: fspecReconstruct,
  };

  function fspecTrailblaze( fn ) {
    return fn;
  }

  function fspecReconstruct( fn, walkOpts ) {
    if ( fn ) {
      var { conform, instrument } = walkOpts;

      if ( conform && instrument ) {
        return instrumentConformed( fn, walkOpts );
      } else if ( instrument ) {
        return _instrument( fn, walkOpts );
      }
    } else {
      throw new Error( 'A function must be specified for instrumentation.' );
    }
  }

  function _instrument( fn, walkOpts ) {
    var fnName = functionName( fn );
    var instrumentedFn = getInstrumentedFn( fnName, fn, walkOpts );
    var namedSpecedFn = namedFn( fnName, instrumentedFn, '__instrumented' );
    return namedSpecedFn;
  }

  function instrumentConformed( fn, walkOpts ) {
    var fnName = functionName( fn );
    var argConformedFn = getArgConformedInstrumentedFn( fnName, fn, walkOpts );
    var namedArgConformedFn = namedFn( fnName, argConformedFn, '__conformed' );

    return namedArgConformedFn;
  }

  function getInstrumentedFn( fnName, fn ) {
    return function __instrumented() {
      var args = Array.from( arguments );
      var instrumentedArgs = checkArgs( fn, fnName, args );
      var retVal = fn.apply( this, instrumentedArgs );
      var instrumentedRetVal = checkRet( fn, fnName, retVal );

      // TODO optimize
      var conformedArgs =
      argsSpec ?
        walkFn( argsSpec, args, { conform: true, instrument: true } ) :
        args;
      let conformedRetVal;
      if ( retSpec ) {
        conformedRetVal = walkFn( retSpec, retVal, { conform: true, instrument: true } );
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
        var p = new Problem( fn, spec, [],
          `Function ${fnName} failed valiation on argument-return value relation` );
        betterThrow( p );
      }
    }
  }

  function checkArgs( fn, fnName, args ) {
    if ( argsSpec ) {
      var instrumentedArgs = walkFn( argsSpec, args, { phase: 'trailblaze' } );
      if ( isProblem( instrumentedArgs ) ) {
        var p = new Problem( args, spec, [ instrumentedArgs ], `Arguments ${JSON.stringify( args )} for function ${fnName} failed validation` );
        betterThrow( p );
      } else {
        return walkFn( argsSpec, instrumentedArgs, { phase: 'reconstruct', conform: false, instrument: true } );
      }
    } else {
      return args;
    }
  }

  function checkRet( fn, fnName, retVal ) {
    if ( retSpec ) {
      var instrumentedRetVal = walkFn( retSpec, retVal, { phase: 'trailblaze' } );
      if ( isProblem( instrumentedRetVal ) ) {
        debugger;
        var p = new Problem( retVal, spec, [ instrumentedRetVal ], 'Return value ' + retVal + ' for function ' + fnName + ' is not valid.' );
        betterThrow( p );
      } else {
        var r = walkFn( retSpec, instrumentedRetVal, { phase: 'reconstruct', instrument: true, conform: false } );
        return r;
      }
    } else {
      return retVal;
    }
  }

  function getArgConformedInstrumentedFn( fnName, fn ) {
    return function __instrumentConformed() {
      var args = Array.from( arguments );

      var conformedArgs = walkFn( argsSpec, args, { conform: true, instrument: true } );
      if ( isProblem( conformedArgs ) ) {
        var p = new Problem( args, argsSpec, [ conformedArgs ], `Arguments ${JSON.stringify( args )} for function ${fnName} is not valid` );
        betterThrow( p );
      }

      var retVal = fn.call( this, conformedArgs );
      var conformedRetVal = walkFn( retSpec, retVal, { conform: true, instrument: true } );
      checkRet( fn, fnName, retVal );
      checkFnRelation( fnName, fn, validateFn, conformedArgs, conformedRetVal );
      return retVal;
    };
  }

}

module.exports = fspecWalker;
