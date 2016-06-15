'use strict';

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var validate = require('./validate');

var cat = function() {
   var specs = arguments;

   return new Spec(genCatValidator(specs));
};

function genCatValidator(specs) {
  return function(vals) {
     var r = vals.map(function(x, i) { return validate(specs[i], x); });
     var problems = r.filter(function(x) {
       return x instanceof Problem;
     });
     if(problems.length > 0) {
       return new Problem(vals, problems);
     } else {
       return vals;
     }
   }
}

module.exports = cat;
