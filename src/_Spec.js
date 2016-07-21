'use strict';

function Spec(conformer) {
  var v = function tryConform(x, _this) {
    return conformer.call(_this, x);
  };
  v.___isSpec = true;
  return v;
};

module.exports = Spec;
