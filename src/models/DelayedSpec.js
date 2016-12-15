const Spec = require( './Spec' );

function DelayedSpec( { getFn } ) {
  this.type = 'DELAYED';
  this.get = getFn;
  var _this = this;

  _this.instrument = function instrumentDelayed( x ) {
    var Spec = getFn();
    return Spec.instrument( x );
  };

  _this.instrumentConformed = function instrumentConformedDelayed( x ) {
    var Spec = getFn();
    return Spec.instrumentConformed( x );
  };

  _this.conform = function conformDelayed( x ) {
    var Spec = getFn();
    return Spec.conform( x );
  };
}

DelayedSpec.prototype = Object.create( Spec.prototype );

module.exports = DelayedSpec;
