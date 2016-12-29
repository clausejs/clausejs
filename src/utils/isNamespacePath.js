var isStr = require( '../preds/isStr' );

function isNamespacePath( x ) {
  return isStr( x ) && /^\/?[a-zA-Z0-9\-_\.]*\/([a-zA-Z0-9\-_]+)$/.test( x );
}

module.exports = isNamespacePath;
