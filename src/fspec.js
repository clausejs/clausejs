'use strict';
var Problem = require('./_Problem');
var isValid = require('./isValid');

function fspec(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  return function getSpeckedFn(fn) {
    var fnName = functionName(fn);

    function speckedFn() {
      var args = Array.from(arguments);
      if(argsSpec) {
        if(!isValid(argsSpec, args)) {
          throw new Problem(fnName, argsSpec, 'Arguments did not pass spec');
        }
      }
      var retVal = fn.apply(null, arguments);
      if(retSpec) {
        if(!isValid(retSpec, retVal)) {
          throw new Problem(retSpec, retSpec, 'Return value did not pass spec');
        }
      }
      return retVal;
    }

    var namedSpeckedFn;
    if(fnName) {
      namedSpeckedFn = new Function('action', 'return function ' + fnName + '__specked' + '(){ return action.apply(this, arguments); };')(speckedFn);
    } else {
      namedSpeckedFn = speckedFn;
    }

    return namedSpeckedFn;
  }
};

function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

module.exports = fspec;
