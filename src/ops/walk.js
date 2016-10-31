var nfaWalker = require('../nfa/nfaWalker');
var predWalker = require('../utils/predWalker');
var propsWalker = require('../ops/propsWalker');
var andWalker = require('../ops/andWalker');
var specRefWalker = require('../namespace/specRefWalker');

function walk(spec, x, opts) {
  var walker = _getWalker(spec);

  return walker(x, opts);
}

function _getWalker(spec) {
  var walker;
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
  }else {
    throw 'unsupported type ' + spec.type;
  }

  return walker(spec, walk);
}

module.exports = walk;
