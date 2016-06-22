'use strict';

var Problem = require('./_Problem');
var isFn = require('./isFn');

var conform = function(predOrSpec, x) {
  if(predOrSpec && predOrSpec.conformer) {
      return predOrSpec.conformer(x);
  } else if (predOrSpec && isFn(predOrSpec)) {
    var conformer = makeConformerFromPred(predOrSpec);
    return conformer(x);
  } else {
    throw new Error('Pred needs to be either of type Spec or a function that returns true of false. pred: ' + pred + ', val: ' + x );
  }
};

function makeConformerFromPred(pred) {
  return function(x) {
    if(pred(x)) {
      return x;
    } else {
      return new Problem(x, pred, 'Given redicate returns false');
    }
  }
}

module.exports = conform;
