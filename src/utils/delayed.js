var DelayedSpec = require( '../models/DelayedSpec' );

function delayed( getFn ) {
  return new DelayedSpec( { getFn } );
}

module.exports = delayed;
