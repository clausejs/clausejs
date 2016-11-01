var Spec = require('../models/Spec');
var walk = require('./walk');

function fspec(fnSpec) {
  var spec = new Spec('FSPEC', [fnSpec], null, null);
  spec.wrapConformedArgs = function wrapConformedArgs(fn) {
    return walk(spec, fn, { conform: true, instrument: true });
  };
  spec.instrument = function instrument(fn) {
    return walk(spec, fn, { conform: false, instrument: true });
  };

  return spec;
};

module.exports = fspec;
