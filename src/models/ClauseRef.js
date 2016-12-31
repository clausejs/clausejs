const Clause = require( './Clause' );

function ClauseRef( { ref, getFn, conformFn } ) {
  this.type = 'CLAUSE_REF';
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

ClauseRef.prototype = Object.create( Clause.prototype );

module.exports = ClauseRef;
