var Problem = require('../models/Problem');
var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var isValid = require('../utils/isValid');
var functionName = require('../utils/fnName');
var isProblem = require('../utils/isProblem');
var namedFn = require('../utils/namedFn');
var conform = require('../utils/conform');
var oAssign = require('object-assign');
var betterThrow = require('../utils/betterThrow');

function fspec(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  var instrument = function (fn) {
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
      checkArgs(fn, fnName, args);
      var retVal = fn.apply(null, args);
      checkRet(fn, fnName, retVal);
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
      if(isProblem(conformedArgs)) {
        var p = new Problem(fn, argsSpec, `Args for function ${fnName} failed validation`);
        betterThrow(p);
      }
      // console.log(conformedArgs);
      // var util = require('util');
      // console.log(util.inspect(conformedArgs, false, null));
      var retVal = fn.call(null, conformedArgs);
      checkRet(fn, fnName, retVal);
      // console.log(retVal);
      return retVal;
    };
  }

  function checkArgs(fn, fnName, args) {
    if(argsSpec) {
      if(!isValid(argsSpec, args)) {
        var p = new Problem(fn, argsSpec, `Args for function ${fnName} failed validation`);
        betterThrow(p);
      }
    }
  }

  function checkRet(fn, fnName, retVal) {
    if(retSpec) {
      if(!isValid(retSpec, retVal)) {
        var p = Problem(fn, retSpec, 'Return value ' + retVal + ' for function ' + fnName + ' is not valid.');
        betterThrow(p);
      }
    }
  }

  var spec = new Spec('FSPEC', fnSpec, null, null);
  spec.wrapConformedArgs = wrapConformedArgs;
  spec.instrument = instrument;

  return spec;
};

module.exports = fspec;
