const Clause = require( './Clause' );

function DelayedClause( { getFn } ) {
  this.type = 'DELAYED';
  this.get = getFn;
  var _this = this;

  _this.instrument = function instrumentDelayed( x ) {
    var Clause = getFn();
    return Clause.instrument( x );
  };

  _this.instrumentConformed = function instrumentConformedDelayed( x ) {
    var Clause = getFn();
    return Clause.instrumentConformed( x );
  };

  _this.conform = function conformDelayed( x ) {
    var Clause = getFn();
    return Clause.conform( x );
  };
}

DelayedClause.prototype = Object.create( Clause.prototype );

module.exports = DelayedClause;
