var { or } = require( './regex' );
var isUndefined = require( '../preds/isUndefined' );

function undefinable( clause ) {
  return or( isUndefined, clause );
}

module.exports = undefinable;
