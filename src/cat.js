'use strict';

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var conform = require('./conform');
var isProblem = require('./isProblem');

var SPEC_TYPE_CAT = 'CAT';

function cat() {
   var specs = Array.from(arguments);

   if(!specs) {
     throw new Error('No spec(s) provided for cat');
   }

   return new Spec(SPEC_TYPE_CAT, specs, genCatConformer(specs), null);
};

function genCatConformer(specs) {
  return function conformCatVals(vals) {
    if(!vals) {
      return new Problem(vals, specs, 'No value(s) provided for cat');
    } else if (vals.length !== specs.length) {
      return new Problem(vals, specs, specs.length + ' specs provided in cat, but there are only ' + vals.length + 'values. ' );
    } else {
      var r = vals.map(function valToConformed(x, i) { return conform(specs[i], x); });
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
