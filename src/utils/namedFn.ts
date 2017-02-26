export default function getNamedFn(
  fnName: String, fn: Function, suffix?: String ) {
    return fn;
  // if ( fnName ) {
  //   let inner = 'return function ' + fnName + ( suffix || '' ) + '(){ return action.apply(this, arguments); };';
  //   return new Function( 'action', inner )( fn );
  // } else {
  //   return fn;
  // }
}
