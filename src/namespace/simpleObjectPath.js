function get( obj, path, defaultValue ) {
  if ( typeof path === 'number' ) {
    path = [ path ];
  }
  if ( !path || path.length === 0 ) {
    return obj;
  }
  if ( obj == null ) {
    return defaultValue;
  }
  if ( typeof path === 'string' ) {
    return get( obj, path.split( '.' ), defaultValue );
  }

  var currentPath = getKey( path[ 0 ] );
  var nextObj = obj[ currentPath ];
  if ( nextObj === void 0 ) {
    return defaultValue;
  }

  if ( path.length === 1 ) {
    return nextObj;
  }

  return get( obj[ currentPath ], path.slice( 1 ), defaultValue );
}

function set( obj, path, value ) {
  if ( typeof path === 'number' ) {
    path = [ path ];
  }
  if ( !path || path.length === 0 ) {
    return obj;
  }
  if ( typeof path === 'string' ) {
    return set( obj, path.split( '.' ).map( getKey ), value );
  }
  var currentPath = path[ 0 ];
  var currentValue = obj[ currentPath ];
  if ( path.length === 1 ) {
    obj[ currentPath ] = value;
    return currentValue;
  }

  if ( currentValue === void 0 ) {
    //check if we assume an array
    if ( typeof path[ 1 ] === 'number' ) {
      obj[ currentPath ] = [];
    } else {
      obj[ currentPath ] = {};
    }
  }

  return set( obj[ currentPath ], path.slice( 1 ), value );
}

function getKey( key ) {
  var intKey = parseInt( key );
  if ( intKey.toString() === key ) {
    return intKey;
  }
  return key;
}

module.exports = { get, set };
