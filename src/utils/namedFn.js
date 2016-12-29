function getNamedFn( fnName, fn, suffix ) {
  if ( fnName ) {
    let inner = 'return function ' + fnName + ( suffix || '' ) + '(){ return action.apply(this, arguments); };';
    return new Function( 'action', inner )( fn );
  } else {
    return fn;
  }
}

module.exports = getNamedFn;
