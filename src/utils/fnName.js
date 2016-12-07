//extrapolates the name of a function
function functionName( fun ) {
  // ES6 fn name
  if ( fun && fun.name ) {
    return fun.name;
  }
  var ret = fun.toString();
  ret = ret.substr( 'function '.length );
  ret = ret.substr( 0, ret.indexOf( '(' ) );
  return ret;
}

module.exports = functionName;
