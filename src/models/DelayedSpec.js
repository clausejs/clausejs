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

module.exports = DelayedSpec;
