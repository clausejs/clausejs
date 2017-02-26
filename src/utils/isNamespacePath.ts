import isStr from '../preds/isStr';

export default function isNamespacePath( x ) {
  return isStr( x ) &&
    /^\/?[a-zA-Z0-9\-_\.]*\/([a-zA-Z0-9\-_]+)$/.test( x );
}