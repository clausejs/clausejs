 // TODO
function specPrettyPrint( spec ) {
  if ( !spec ) {
    return '';
  }
  return JSON.stringify( spec, ( key, val ) => {
    if ( typeof val === 'function' ) {
      return `${val.name}()`; // implicitly `toString` it
    }
    return val;
  }, 2 );
}

module.exports = specPrettyPrint;
