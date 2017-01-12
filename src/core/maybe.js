var { or } = require( './regex' );
var isNull = require( '../preds/isNull' );
var isUndefined = require( '../preds/isNull' );

function maybe( clause ) {
  return or( isNull, isUndefined, clause );
}

module.exports = maybe;
