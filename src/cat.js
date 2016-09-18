

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var isProblem = require('./utils/isProblem');
var coerceIntoSpec = require('./utils/coerceIntoSpec');
var nfaConformer = require('./nfa/conformer');

var SPEC_TYPE = 'CAT';

function cat() {
   var rawSpecs = Array.from(arguments);

   if(!rawSpecs) {
     throw new Error('No expression(s) provided for cat');
   }

   var specs = rawSpecs.map(coerceIntoSpec);

   var expr = new Spec(SPEC_TYPE, specs, null, null);
   expr.conform = nfaConformer(expr);
   return expr;
}

module.exports = cat;
