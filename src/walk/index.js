var nfaWalker = require('./nfaWalker');
var predWalker = require('./predWalker');
var fspecWalker = require('./fspecWalker');
var propsWalker = require('./propsWalker');
var andWalker = require('./andWalker');
var collOfWalker = require('./collOfWalker');
var specRefWalker = require('./specRefWalker');
var delayedSpecWalker = require('./delayedSpecWalker');
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
  } else if (['COLL_OF'].indexOf(spec.type) >= 0) {
    walker = collOfWalker;
  } else if (spec.type === 'PRED') {
    walker = predWalker;
  } else if (spec.type === 'PROPS') {
    walker = propsWalker;
  } else if (spec.type === 'AND') {
    walker = andWalker;
  } else if (spec.type === 'SpecRef') {
    walker = specRefWalker;
  } else if (spec.type === 'Delayed') {
    walker = delayedSpecWalker;
  } else if (spec.type === 'FSPEC') {
    walker = fspecWalker;
  } else {
    throw 'unsupported type ' + spec.type;
  }

  var r = walker(spec, walk);
  if(r.isProblem && spec.type === 'PROPS') {
    console.log(r);
  }
  return r;
}

module.exports = walk;
