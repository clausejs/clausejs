var Clause = require( '../models/Clause' );
var identity = require( '../utils/identity' );
var CLAUSE_TYPE_ANY = 'ANY';

function any() {
  return new Clause( {
    type: CLAUSE_TYPE_ANY,
    exprs: [],
    conformFn: identity
  } );
}

module.exports = any;
