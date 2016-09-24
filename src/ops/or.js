var orSpec = require('../specs').or;
var fspec = require('./fspec');
var c = require('./constants');

function orOp (c) {
  var exprs;
  return {
    op: c.OR,
    exprs: c.named || c.unnamed,
  };
}

var or = fspec(orSpec).wrapConformedArgs(orOp);

module.exports = or;
