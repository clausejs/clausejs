'use strict';

var Spec = require('./Spec');
var Problem = require('./Problem');

var keys = function(params) {
  var reqSpecs = params.req;
  return new Spec(genKeyConformer(reqSpecs));
};

function genKeyConformer(reqSpecs) {
  return function(x) {
    var reqProblems = reqSpecs.filter(function(r) { return x[r] === undefined; });
    if(reqProblems.length > 0) {
      return new Problem(x, reqProblems, 'req: keys required: ' + reqProblems.join(', ') );
    } else {
      return x;
    }
  }
}

module.exports = keys;
