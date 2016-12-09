var Spec = require( '../models/Spec' );
var identity = require( '../utils/identity' );
var SPEC_TYPE_ANY = 'ANY';

function any() {
  return new Spec( {
    type: SPEC_TYPE_ANY,
    exprs: [],
    conformFn: identity
  } );
}

module.exports = any;
