var Clause = require( '../models/Clause' );
var walk = require( '../walk' );
var fnName = require( '../utils/fnName' );

function fclause( fnClause ) {
  const { args, ret, fn } = fnClause;
  var clause = new Clause( {
    type: 'FSPEC',
    exprs: [],
    opts: fnClause,
  } );
  clause.instrumentConformed = function instrumentConformed( fn ) {
    return walk( clause, fn, { conform: true, instrument: true } );
  };
  clause.instrument = function instrument( fn ) {
    return walk( clause, fn, { conform: false, instrument: true } );
  };

  return clause;
}

module.exports = fclause;
