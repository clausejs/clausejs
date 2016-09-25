var nfaConformer = require('./conformer');

var appendConformer = function (spec) {
  spec.conform = nfaConformer(spec);
  return spec;
}

module.exports = appendConformer;
