'use strict';
var Problem = require('./_Problem');
var isValid = require('./isValid');

var fspec = function(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  return function(fn) {
    return function() {
      if(argsSpec) {
        if(!isValid(argsSpec, arguments)) {
          throw new Problem('TODO', argsSpec);
        }
      }
      var retVal = fn.apply(null, arguments);
      if(retSpec) {
        if(!isValid(retSpec, retVal)) {
          throw new Problem('TODO', retSpec);
        }
      }
      return retVal;
    }
  }
};

module.exports = fspec;
