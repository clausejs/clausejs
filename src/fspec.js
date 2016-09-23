
var Problem = require('./_Problem');
var isValid = require('./isValid');
var functionName = require('./utils/fnName');

function fspec(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  var wrapSpecChecker = function (fn) {
    var speckedFn = getSpeckedFn(fn);
    var fnName = functionName(fn);
    var namedSpecedFn = getNamedFn(fnName, speckedFn);
    return namedSpeckedFn;
  }

  var wrapConformedArgs = function (fn) {
    var argConformedFn = getArgConformedFn(fn);
    var fnName = functionName(fn);
    var namedArgConformedFn = getNamedFn(fnName, argConformedFn);
    return namedArgConformedFn;
  }

  function getSpeckedFn(fn) {
    return function () {
      var args = Array.from(arguments);
      checkArgs(args);
      var retVal = fn.apply(null, args);
      checkRet(retVal);
      return retVal;
    };
  }

  function getArgConformedFn(fn) {
    return function () {
      var args = Array.from(arguments);
      var conformedArgs = conform(argSpec, args);
      var retVal = fn.call(null, conformedArgs);
      checkRet(retVal);
      return retVal;
    };
  }

  function checkArgs(args) {
    if(argsSpec) {
      if(!isValid(argsSpec, args)) {
        throw new Problem(fnName, argsSpec, 'Arguments ' + args + ' did not pass spec for function ' + fnName);
      }
    }
  }

  function checkRet(ret) {
    if(retSpec) {
      if(!isValid(retSpec, retVal)) {
        throw new Problem(retSpec, retSpec, 'Return value ' + retVal + ' did not pass function spec for ' + fnName);
      }
    }
  }

  function getNamedFn (fnName, fn) {
    if(fnName) {
      return new Function('action', 'return function ' + fnName + '__specked' + '(){ return action.apply(this, arguments); };')(speckedFn);
    } else {
      return fn;
    }
  }

  wrapSpecChecker.wrapConformedArgs = getNamedArgConformedFn;

  return wrapSpecChecker;
};

module.exports = fspec;
