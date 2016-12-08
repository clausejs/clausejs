const Spec = require( './Spec' );

function DelayedSpec( { getFn } ) {
  this.type = 'Delayed';
  this.get = getFn;
  var _this = this;

  [ 'conform', 'instrument' ].forEach( ( mName ) => {
    _this[ mName ] = ( x ) => {
      var Spec = getFn();
      return Spec[ mName ].call( this, x );
    };
  } );
}

DelayedSpec.prototype = Object.create( Spec.prototype );

module.exports = DelayedSpec;
