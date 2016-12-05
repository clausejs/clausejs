import isStr from '../preds/isStr';

function isNamespacePath( x ) {
  return /^[a-zA-Z0-9\-_\.]*\/([a-zA-Z0-9\-_]+)$/.test( x );
}

module.exports = isNamespacePath;
