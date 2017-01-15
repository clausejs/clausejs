var Clause = require( '../models/Clause' );
var instanceOf = require( '../preds/instanceOf' );

var isClause = instanceOf( Clause );

module.exports = isClause;
