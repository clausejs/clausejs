var Problem = require('./_Problem');
var isValid = require('./isValid');
var functionName = require('./utils/fnName');
var namedFn = require('./utils/namedFn');
var conform = require('./conform');

function fspec(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  var wrapSpecChecker = function (fn) {
    var fnName = functionName(fn);
    var speckedFn = getSpeckedFn(fnName, fn);
    var namedSpecedFn = namedFn(fnName, speckedFn, '__specked');
    return namedSpecedFn;
  }

  var wrapConformedArgs = function (fn) {
    var fnName = functionName(fn);
    var argConformedFn = getArgConformedFn(fnName, fn);
    var namedArgConformedFn = namedFn(fnName, argConformedFn, '__conformed');
    return namedArgConformedFn;
  }

  function getSpeckedFn(fnName, fn) {
    return function () {
      var args = Array.from(arguments);
      checkArgs(fnName, args);
      var retVal = fn.apply(null, args);
      checkRet(fnName, retVal);
      return retVal;
    };
  }

  function getArgConformedFn(fnName, fn) {
    return function () {
      var args = Array.from(arguments);
      // console.log(args);
      // var util = require('util');
      // console.log(util.inspect(argsSpec, false, null));
      var conformedArgs = conform(argsSpec, args);
      // var util = require('util');
      // console.log(conformedArgs);
      // console.log(util.inspect(conformedArgs, false, null));
      var retVal = fn.call(null, conformedArgs);
      checkRet(fnName, retVal);
      return retVal;
    };
  }

  function checkArgs(fnName, args) {
    if(argsSpec) {
      if(!isValid(argsSpec, args)) {
        throw new Problem(fnName, argsSpec, 'Arguments ' + args + ' did not pass spec for function ' + fnName);
      }
    }
  }

  function checkRet(fnName, retVal) {
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
