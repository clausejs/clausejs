var SpecRef = require( '../models/SpecRef' );
// TODO
function isSpecRef( x ) {
  return x instanceof SpecRef;
}
module.exports = isSpecRef;
