'use strict';

var Spec = function(conformer) {
  var v = function(x, _this) {
    return conformer.call(_this, x);
  };
  v.__proto__ = this.__proto__;
  return v;
};

module.exports = Spec;
