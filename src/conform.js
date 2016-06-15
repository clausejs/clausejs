'use strict';

var Problem = require('./_Problem');
var isFn = require('./isFn');

var conform = function(pred, x) {
  if(pred && pred.conformer) {
      return pred.conformer(x);
  } else if (pred && isFn(pred)) {
    var conformer = makeConformerFromPred(pred);
    return conformer(x);
  } else {
    throw new Error('Pred needs either be of type Spec or a function that returns true of false.');
  }
};

function makeConformerFromPred(pred) {
  return function(x) {
    if(pred(x)) {
      return x;
    } else {
      return new Problem(x, pred);
    }
  }
}

module.exports = conform;
