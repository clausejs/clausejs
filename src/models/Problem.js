const PAREN_PAIRS = '❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱';

function Problem( val, failsPredicate, subproblems, msg ) {
  this.isProblem = true;

  if ( arguments.length !== 4 ) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.valStringified = JSON.stringify( val, ( key, val ) => {
    if ( typeof val === 'function' ) {
      // implicitly `toString` it
      return `${val.name}()`;
    }
    return val;
  } );
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  // this.stack = (new Error()).stack;
  this.rawMsg = msg;
  this.subproblems = subproblems;

  this.message = _constructMessage( this, 0 );
  this.toString = () => this.message;
}

function _constructMessage( { subproblems, val, valStringified, rawMsg }, lvl ) {
  if ( Array.isArray( subproblems ) ) {
    var reasons;
    if ( subproblems.length === 0 ) {
      return `${rawMsg}; val: ${valStringified}`;
    } else {
      reasons = subproblems.map( ( r ) => {
        return `${_open( lvl )}${_constructMessage( r, lvl + 1 )}${_close( lvl )}`;
      } );
      return `${rawMsg}, because ${reasons.join( ', ' )}`;
    }
  } else if ( typeof subproblems === 'object' ) {
    reasons = [];
    for ( var name in subproblems ) {
      reasons.push( `${_open( lvl )}${name}: ${_constructMessage( subproblems[ name ], lvl + 1 )}${_close( lvl )}` );
    }
    return `${rawMsg}, because ${reasons.join( ', ' )}`;
  }
}

function _open( lvl ) {
  return PAREN_PAIRS[ lvl ];
}

function _close( lvl ) {
  return PAREN_PAIRS[ PAREN_PAIRS.length - lvl - 1 ];
}

// Problem.prototype = new Error;

module.exports = Problem;
