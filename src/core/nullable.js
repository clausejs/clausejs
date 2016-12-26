var { or } = require( './regex' );
var isNull = require( '../preds/isNull' );

function nullable( spec ) {
  return or( isNull, spec );
}

module.exports = nullable;
