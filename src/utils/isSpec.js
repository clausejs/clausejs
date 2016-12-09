var Spec = require( '../models/Spec' );

function isSpec( x ) {
  return x instanceof Spec;
}

module.exports = isSpec;
