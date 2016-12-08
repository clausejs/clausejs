const Spec = require( './Spec' );

function SpecRef( { ref, getFn, conformFn } ) {
  this.type = 'SpecRef';
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

SpecRef.prototype = Object.create( Spec.prototype );

module.exports = SpecRef;
