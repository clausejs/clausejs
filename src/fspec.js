'use strict';
var Problem = require('./Problem');
var isValid = require('./isValid');

var fspec = function(fnSpec) {
  var argsSpec = fnSpec.args;
  var retSpec = fnSpec.ret;

  return function(fn) {
    return function() {
      var args = Array.from(arguments);
      if(argsSpec) {
        if(!isValid(argsSpec, args)) {
          throw new Problem(argsSpec, argsSpec, 'Arguments did not pass spec');
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
  }
};

module.exports = fspec;
