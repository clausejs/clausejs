const PAREN_PAIRS = '❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱';
const stringifyWithFnName = require( '../utils/stringifyWithFnName' );

function Problem( val, failsPredicate, subproblems, msg ) {
  this.isProblem = true;

  if ( arguments.length !== 4 ) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  // this.stack = (new Error()).stack;
  this.shortMessage = msg;
  this.subproblems = subproblems;

  this.message = _constructMessage( this, 0 );
  this.toString = () => this.message;
}

function _constructMessage( { subproblems, val, shortMessage }, lvl ) {
  if ( Array.isArray( subproblems ) ) {
    var reasons;
    if ( subproblems.length === 0 ) {
      return `${shortMessage}; val: ${stringifyWithFnName( val, null, 2 )}`;
    } else {
      reasons = subproblems.map( ( r ) => {
        return `${_open( lvl )}${_constructMessage( r, lvl + 1 )}${_close( lvl )}`;
      } );
      return `${shortMessage}, because ${reasons.join( ', ' )}`;
    }
  } else if ( typeof subproblems === 'object' ) {
    reasons = [];
    for ( var name in subproblems ) {
      reasons.push( `${_open( lvl )}${name}: ${_constructMessage( subproblems[ name ], lvl + 1 )}${_close( lvl )}` );
    }
    return `${shortMessage}, because ${reasons.join( ', ' )}`;
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
