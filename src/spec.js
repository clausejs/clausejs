'use strict';

var Spec = function(conformer) {
  var v = function(x, _this) {
    return conformer.call(_this, x);
  };
  v.___isSpec = true;
  return v;
};

module.exports = Spec;
