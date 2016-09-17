

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var conform = require('./conform');
var isProblem = require('./isProblem');
var coerceIntoSpec = require('./utils/coerceIntoSpec');
var _type = 'ONE_OR_MORE';

function oneOrMore() {
  var rawExpr = arguments[0];

  if(!rawExpr) {
    throw new Error('No expression provided for oneOrMore');
  } else if (Array.from(arguments).length !== 1) {
    throw new Error('Exactly one expression is required for oneOrMore');
  }

  var spec = coerceIntoSpec(rawExpr);

  return new Spec(_type, spec, genOneOrMoreConformer(spec), null);
};

function genOneOrMoreConformer(spec) {
  //TODO: DELETE ME; use nfa
}

module.exports = oneOrMore;
