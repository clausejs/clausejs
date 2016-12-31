var { or } = require( './regex' );
var isNull = require( '../preds/isNull' );

function nullable( clause ) {
  return or( isNull, clause );
}

module.exports = nullable;
