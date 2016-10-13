function getNamedFn (fnName, fn, suffix) {
  if(fnName) {
    return new Function('action', 'return function ' + fnName + suffix + '(){ return action.apply(this, arguments); };')(fn);
  } else {
    return fn;
  }
}

module.exports = getNamedFn;
