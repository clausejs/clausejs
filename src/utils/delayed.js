var DelayedClause = require( '../models/DelayedClause' );

function delayed( getFn ) {
  return new DelayedClause( { getFn } );
}

module.exports = delayed;
