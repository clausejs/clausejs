'use strict';

var Problem = require('./_Problem');
var isPred = require('./utils/isPred');
var isSpec = require('./utils/isSpec');

function conform(predOrSpec, x) {
  if(predOrSpec && isSpec(predOrSpec)) {
      return predOrSpec.conform(x);
  } else if (predOrSpec && isPred(predOrSpec)) {
    var conformer = makeConformerFromPred(predOrSpec);
    return conformer(x);
  } else {
    throw new Error('Pred needs to be either of type Spec or a function that returns true of false. pred: ' + pred + ', val: ' + x );
  }
};

function makeConformerFromPred(pred) {
  return function tryConformWithPred(x) {
    if(pred(x)) {
      return x;
    } else {
      return new Problem(x, pred, 'Given predicate returns false');
    }
  }
}

module.exports = conform;
