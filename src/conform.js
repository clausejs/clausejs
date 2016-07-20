'use strict';

var Problem = require('./Problem');
var isFn = require('./isFn');
var isSpec = require('./isSpec');

var conform = function(predOrSpec, x) {
  if(predOrSpec && isSpec(predOrSpec)) {
      return predOrSpec(x);
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
      return new Problem(x, pred, 'Given predicate returns false');
    }
  }
}

module.exports = conform;
