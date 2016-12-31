var Clause = require( '../models/Clause' );
var identity = require( '../utils/identity' );
var SPEC_TYPE_ANY = 'ANY';

function any() {
  return new Clause( {
    type: SPEC_TYPE_ANY,
    exprs: [],
    conformFn: identity
  } );
}

module.exports = any;
