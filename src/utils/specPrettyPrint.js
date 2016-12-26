 // TODO
function specPrettyPrint( spec ) {
  if ( !spec ) {
    return '';
  }
  return JSON.stringify( spec, ( key, val ) => {
    if ( typeof val === 'function' ) {
      // implicitly `toString` it
      return `${val.name}()`;
    }
    return val;
  }, 2 );
}

module.exports = specPrettyPrint;
