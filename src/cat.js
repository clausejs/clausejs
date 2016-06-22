'use strict';

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var conform = require('./conform');
var isProblem = require('./isProblem');

var cat = function() {
   var specs = Array.from(arguments);

   return new Spec(genCatConformer(specs));
};

function genCatConformer(specs) {
  return function(vals) {
    if(!vals) {
      return new Problem(vals, specs, 'No value(s) provided for cat');
    } else if (!specs) {
      return new Problem(vals, specs, 'No spec(s) provided for cat');
    } else if (vals.length !== specs.length) {
      return new Problem(vals, specs, specs.length + ' specs provided in cat, but there are only ' + vals.length + 'values. ' );
    } else {
      var r = vals.map(function(x, i) { return conform(specs[i], x); });
      var problems = r.filter(isProblem);
      if(problems.length > 0) {
        return new Problem(vals, problems, 'One of the spec in cat did not pass');
      } else {
        return vals;
      }
    }
  }
}

module.exports = cat;
