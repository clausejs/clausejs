var isProblem = require('../utils/isProblem');
var Problem = require('../models/Problem');
var functionName = require('../utils/fnName');
var namedFn = require('../utils/namedFn');
var betterThrow = require('../utils/betterThrow');

function fspecWalker(spec, walkFn) {
  var { args: argsSpec, ret: retSpec } =  spec.exprs[0];

  return function walkFspec(fn, walkOpts) {
    var { conform, instrument } = walkOpts;

    if(conform && instrument) {
      return wrapConformedArgs(fn, walkOpts);
    } else if (instrument) {
      return _instrument(fn, walkOpts);
    } else {
      return fn;
    }
  }

  function _instrument(fn, walkOpts) {
    var fnName = functionName(fn);
    var instrumentedFn = getInstrumentedFn(fnName, fn, walkOpts);
    var namedSpecedFn = namedFn(fnName, instrumentedFn, '__instrumented');
    return namedSpecedFn;
  }

  function wrapConformedArgs (fn, walkOpts) {
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
      return instrumentedRetVal;
    };
  }

  function checkArgs(fn, fnName, args, walkOpts) {
    if(argsSpec) {
      var instrumentedArgs = walkFn(argsSpec, args, walkOpts);
      if(isProblem(instrumentedArgs)) {
        var p = new Problem(args, argsSpec, [instrumentedArgs], `Args ${JSON.stringify(args)} for function ${fnName} failed validation`);
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
        var p = new Problem(retVal, retSpec, [instrumentedRetVal], 'Return value ' + retVal + ' for function ' + fnName + ' is not valid.');
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
      // console.log(args);
      // var util = require('util');
      // console.log(util.inspect(argsSpec, false, null));
      var conformedArgs = walkFn(argsSpec, args, walkOpts);
      if(isProblem(conformedArgs)) {
        var p = new Problem(args, argsSpec, [conformedArgs], `Args ${JSON.stringify(args)} for function ${fnName} is not valid`);
        betterThrow(p);
      }
      // console.log(conformedArgs);
      // var util = require('util');
      // console.log(util.inspect(conformedArgs, false, null));
      var retVal = fn(conformedArgs);
      checkRet(fn, fnName, retVal, walkOpts);
      // console.log(retVal);
      return retVal;
    };
  }

}

module.exports = fspecWalker;
