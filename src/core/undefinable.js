var { or } = require( './regex' );
var isUndefined = require( '../preds/isUndefined' );

function undefinable( spec ) {
  return or( isUndefined, spec );
}

module.exports = undefinable;
