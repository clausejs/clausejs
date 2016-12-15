const Spec = require( './Spec' );

function SpecRef( { ref, getFn, conformFn } ) {
  this.type = 'SPEC_REF';
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

SpecRef.prototype = Object.create( Spec.prototype );

module.exports = SpecRef;
