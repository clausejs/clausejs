var Spec = require( '../models/Spec' );
var walk = require( '../walk' );
var fnName = require( '../utils/fnName' );

function fspec( fnSpec ) {
  const { args, ret, fn } = fnSpec;
  var spec = new Spec( {
    type: 'FSPEC',
    exprs: [],
    opts: fnSpec,
    // TODO: fix comma
    fragments:
      [].concat( args ? [ 'args: ', args ] : [] )
        .concat( ret ? [ 'ret: ', ret ] : [] )
        .concat( fn ? [ 'fn: ', fnName( fn ), '()' ] : [] ),
  } );
  spec.instrumentConformed = function instrumentConformed( fn ) {
    return walk( spec, fn, { conform: true, instrument: true } );
  };
  spec.instrument = function instrument( fn ) {
    return walk( spec, fn, { conform: false, instrument: true } );
  };

  return spec;
}

module.exports = fspec;
