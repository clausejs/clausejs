export default function getNamedFn(
  fnName: String, fn: Function, suffix?: String ) {
  if ( fnName ) {
    let inner = 'return function ' + fnName + ( suffix || '' ) + '(){ return action.apply(this, arguments); };';
    return new Function( 'action', inner )( fn );
  } else {
    return fn;
  }
}
