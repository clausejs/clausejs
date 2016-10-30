var Problem = require('../models/Problem');
var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var isValid = require('../utils/isValid');
var functionName = require('../utils/fnName');
var isProblem = require('../utils/isProblem');
var namedFn = require('../utils/namedFn');
var conform = require('../utils/conform');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var oAssign = require('object-assign');
var betterThrow = require('../utils/betterThrow');

function fspec(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  var instrument = function (fn) {
    var fnName = functionName(fn);
    var instrumentedFn = getInstrumentedFn(fnName, fn);
    var namedSpecedFn = namedFn(fnName, instrumentedFn, '__instrumented');
    return namedSpecedFn;
  }

  var wrapConformedArgs = function (fn) {
    var fnName = functionName(fn);
    var argConformedFn = getArgConformedFn(fnName, fn);
    var namedArgConformedFn = namedFn(fnName, argConformedFn, '__conformed');

    return namedArgConformedFn;
  }

  function getInstrumentedFn(fnName, fn) {
    return function () {
      var args = Array.from(arguments);
      var instrumentedArgs = checkArgs(fn, fnName, args);
      var retVal = fn.apply(null, instrumentedArgs);
      var instrumentedRetVal = checkRet(fn, fnName, retVal);
      return instrumentedRetVal;
    };
  }

  function checkArgs(fn, fnName, args) {
    if(argsSpec) {
      var instrumentedArgs = _inst(argsSpec, args);
      if(isProblem(instrumentedArgs)) {
        var p = new Problem(args, argsSpec, [instrumentedArgs], `Args for function ${fnName} failed validation`);
        betterThrow(p);
      } else {
        return instrumentedArgs;
      }
    } else {
      return args;
    }
  }

  function checkRet(fn, fnName, retVal) {
    if(retSpec) {
      var instrumentedRetVal = _inst(retSpec, retVal);
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

  function getArgConformedFn(fnName, fn) {
    return function () {
      var args = Array.from(arguments);
      // console.log(args);
      // var util = require('util');
      // console.log(util.inspect(argsSpec, false, null));
      var conformedArgs = conform(argsSpec, args);
      if(isProblem(conformedArgs)) {
        var p = new Problem(args, argsSpec, [conformedArgs], `Args for function ${fnName} failed validation`);
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

  var spec = new Spec('FSPEC', [fnSpec], null, null);
  spec.wrapConformedArgs = wrapConformedArgs;
  spec.instrument = instrument;

  return spec;
};

function _inst(spec, x) {
  if(spec.type === 'FSPEC') {
    return x;
  }  else {
    var r = coerceIntoSpec(spec).conform(x);
    if(isProblem(r)) {
      return r;
    } else {
      return x;
    }
  }

}

module.exports = fspec;
