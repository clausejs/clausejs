'use strict';

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var conform = require('./conform');

var cat = function() {
   var specs = arguments;

   return new Spec(genCatConformer(specs));
};

function genCatConformer(specs) {
  return function(vals) {
    if(!vals || !specs || vals.length !== specs.length) {
      return new Problem(vals, specs);
    }
     var r = vals.map(function(x, i) { return conform(specs[i], x); });
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
