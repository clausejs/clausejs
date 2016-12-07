var isFn = require( '../preds/isFn' );

function isPred( x ) {
  return isFn( x );
}

module.exports = isPred;
