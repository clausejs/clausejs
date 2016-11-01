var nfaWalker = require('../nfa/nfaWalker');
var predWalker = require('../utils/predWalker');
var fspecWalker = require('./fspecWalker');
var propsWalker = require('./propsWalker');
var andWalker = require('./andWalker');
var specRefWalker = require('../namespace/specRefWalker');
var coerceIntoSpec = require('../utils/coerceIntoSpec');

function walk(spec, x, opts) {
  var walker = _getWalker(spec);

  return walker(x, opts);
}

function _getWalker(expr) {
  var walker;
  var spec = coerceIntoSpec(expr);
  if (['OR', 'CAT', 'Z_OR_M', 'O_OR_M', 'Z_OR_O'].indexOf(spec.type) >= 0) {
    walker = nfaWalker;
  } else if (spec.type === 'PRED') {
    walker = predWalker;
  } else if (spec.type === 'PROPS') {
    walker = propsWalker;
  } else if (spec.type === 'AND') {
    walker = andWalker;
  } else if (spec.type === 'SpecRef') {
    walker = specRefWalker;
  } else if (spec.type === 'FSPEC') {
    walker = fspecWalker;
  } else {
    throw 'unsupported type ' + spec.type;
  }

  return walker(spec, walk);
}

module.exports = walk;
