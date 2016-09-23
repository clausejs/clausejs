var catSpec = require('../specs').cat;
var fspec = require('./fspec');
var c = require('./constants');

function catOp (c) {
  var exprs;
  return {
    op: c.CAT,
    exprs: c.named || c.unnamed,
  };
}

var cat = fspec(catSpec).wrapConformedArgs(catOp);

module.exports = cat;
