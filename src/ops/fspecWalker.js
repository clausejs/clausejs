var isProblem = require('../utils/isProblem');
var Problem = require('../models/Problem');
var functionName = require('../utils/fnName');
var namedFn = require('../utils/namedFn');
var betterThrow = require('../utils/betterThrow');

function fspecWalker(spec, walkFn) {
  var { args: argsSpec, ret: retSpec, fn: validateFn } =  spec.opts;

  return function walkFspec(fn, walkOpts) {
    if(fn) {
      var { conform, instrument, trailblaze } = walkOpts;

      if(conform && instrument) {
        return instrumentConformed(fn, walkOpts);
      } else if (instrument) {
        return _instrument(fn, walkOpts);
      } else if (trailblaze) {
        return fn;
      }
    } else {
      return new Problem(fn, spec, [], 'function is not specified');
    }
  }

  function _instrument(fn, walkOpts) {
    var fnName = functionName(fn);
    var instrumentedFn = getInstrumentedFn(fnName, fn, walkOpts);
    var namedSpecedFn = namedFn(fnName, instrumentedFn, '__instrumented');
    return namedSpecedFn;
  }

  function instrumentConformed (fn, walkOpts) {
    var fnName = functionName(fn);
    var argConformedFn = getArgConformedFn(fnName, fn, walkOpts);
    var namedArgConformedFn = namedFn(fnName, argConformedFn, '__conformed');

    return namedArgConformedFn;
  }

  function getInstrumentedFn(fnName, fn, walkOpts) {
    return function () {
      var args = Array.from(arguments);
      var instrumentedArgs = checkArgs(fn, fnName, args, walkOpts);
      var retVal = fn.apply(this, instrumentedArgs);
      var instrumentedRetVal = checkRet(fn, fnName, retVal, walkOpts);

      // TODO optimize
      var conformedArgs = walkFn(argsSpec, args, { conform: true });
      checkFnRelation(fnName, fn, validateFn, conformedArgs, retVal);
      return instrumentedRetVal;
    };
  }

  function checkFnRelation(fnName, fn, validateFn, conformedArgs, retVal) {
    if(validateFn) {
      var r = validateFn.call(null, conformedArgs, retVal);
      if(!r) {
        var p = new Problem(fn, spec, [],
          `Function ${fnName} failed valiation on argument-return value relation`);
        betterThrow(p);
      }
    }
  }

  function checkArgs(fn, fnName, args, walkOpts) {
    if(argsSpec) {
      var instrumentedArgs = walkFn(argsSpec, args, walkOpts);
      if(isProblem(instrumentedArgs)) {
        var p = new Problem(args, spec, [instrumentedArgs], `Arguments ${JSON.stringify(args)} for function ${fnName} failed validation`);
        betterThrow(p);
      } else {
        return instrumentedArgs;
      }
    } else {
      return args;
    }
  }

  function checkRet(fn, fnName, retVal, walkOpts) {
    if(retSpec) {
      var instrumentedRetVal = walkFn(retSpec, retVal, walkOpts);
      if(isProblem(instrumentedRetVal)) {
        var p = new Problem(retVal, spec, [instrumentedRetVal], 'Return value ' + retVal + ' for function ' + fnName + ' is not valid.');
        betterThrow(p);
      } else {
        return instrumentedRetVal;
      }
    } else {
      return retVal;
    }
  }

  function getArgConformedFn(fnName, fn, walkOpts) {
    return function () {
      var args = Array.from(arguments);

      var conformedArgs = walkFn(argsSpec, args, walkOpts);
      if(isProblem(conformedArgs)) {
        var p = new Problem(args, argsSpec, [conformedArgs], `Args ${JSON.stringify(args)} for function ${fnName} is not valid`);
        betterThrow(p);
      }

      var retVal = fn(conformedArgs);
      checkRet(fn, fnName, retVal, walkOpts);
      checkFnRelation(fnName, fn, validateFn, conformedArgs, retVal);
      return retVal;
    };
  }

}

module.exports = fspecWalker;
