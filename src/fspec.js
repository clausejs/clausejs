var Problem = require('./_Problem');
var isValid = require('./isValid');
var functionName = require('./utils/fnName');
var namedFn = require('./utils/namedFn');
var conform = require('./conform');

function fspec(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  var wrapSpecChecker = function (fn) {
    var speckedFn = getSpeckedFn(fn);
    var fnName = functionName(fn);
    var namedSpecedFn = namedFn(fnName, speckedFn, '__specked');
    return namedSpeckedFn;
  }

  var wrapConformedArgs = function (fn) {
    var argConformedFn = getArgConformedFn(fn);
    var fnName = functionName(fn);
    var namedArgConformedFn = namedFn(fnName, argConformedFn, '__conformed');
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
      console.log('args', args);
      console.log('argsSpec', argsSpec);
      var conformedArgs = conform(argsSpec, args);
      console.log('conformedArgs', conformedArgs);
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

  wrapSpecChecker.wrapConformedArgs = wrapConformedArgs;

  return wrapSpecChecker;
};

module.exports = fspec;
