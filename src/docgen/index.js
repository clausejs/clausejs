import { NamespaceObjSpec } from '../specs/namespace-types';
import fnName from '../utils/fnName';
import isPred from '../utils/isPred';
import isSpec from '../utils/isSpec';

const gen = ( registry ) => {
  var conformedReg = NamespaceObjSpec.conform( registry );
  var docstr = _walk( null, null, conformedReg );
  return docstr;
}

var fns = {
  gen,
};

function _walk( prefix, currentFrag, creg ) {
  let currentNs = prefix ? `${prefix}.${currentFrag}` : currentFrag;
  let r = '';
  let subresults = [];
  let nsComment,
    exprResult,
    subNamespaces;
  for ( let key in creg ) {
    if ( creg.hasOwnProperty( key ) ) {
      switch ( key ) {
      case 'subNamespaces' :
        subNamespaces = creg[ key ];
        for ( let subnamespace in subNamespaces ) {
          if ( subNamespaces.hasOwnProperty( subnamespace ) ) {
            let subresult = _walk( currentNs, subnamespace, subNamespaces[ subnamespace ] );
            subresults.push( subresult );
          }
        }
        break;
      case '.nsComment':
        nsComment = `<p><i>${creg[ key ]}</i></p>`;
        break;
      case '.meta':
        exprResult = _exprMeta( currentFrag, creg[ key ], creg[ '.expr' ] );
        break;
      default:
        break;
      }
    }
  }

  if ( exprResult ) {
    r += exprResult;
  }

  if ( currentNs && ( nsComment || _hasExprs( subNamespaces ) ) ) {
    r += `<h3>${currentNs}</h3><hr />`;
  }

  if ( nsComment ) {
    r += nsComment;
  }

  if ( subresults.length > 0 ) {
    r += subresults.join( '\n' );
  }

  return r;
}

function _hasExprs( subNamespaces ) {
  if ( !subNamespaces ) {
    return false;
  }
  return Object.keys( subNamespaces )
    .filter( ( n ) => subNamespaces[ n ][ '.expr' ] ).length > 0;
}

function _exprMeta( exprName, meta, expr ) {
  if ( !expr ) {
    throw new Error( `Expression ${exprName} does not exist in the registry` );
  }
  let docstr;
  if ( expr.type === 'FSPEC' ) {
    docstr = _genFspec( exprName, expr, meta );
  } else {
    docstr = `<pre>${JSON.stringify( meta, null, 2 )}</pre>`;
  }
  return `
    <h5>${meta[ '.name' ] || exprName}</h5>
    <i>Type: ${_type( expr )}</i>
    ${docstr}
    `;
}

function _type( expr ) {
  if ( isSpec( expr ) ) {
    return expr.type;
  } else if ( isPred( expr ) ) {
    return `Predicate ${fnName( expr )}()`;
  }
}

// NOTE: meta param is omitted at the end
function _genFspec( exprName, spec ) {
  var frags = [];
  const { args, ret, fn } = spec.opts;
  if ( args ) {
    frags.push( [ 'Argument spec', `<pre>${JSON.stringify( args, null, 2 )}</pre>` ] );
  }
  if ( ret ) {
    frags.push( [ 'Return value spec', `<pre>${JSON.stringify( ret, null, 2 )}</pre>` ] );
  } if ( fn ) {
    frags.push( [ 'Argument-return value relation', `<pre>${fnName( fn )}</pre>` ] );
  }
  const r = `
    <dl>
    ${frags.map( ( [ name, src ] ) => `<dt>${name}</dt><dd>${src}</dd>` ).join( '\n' )}
    </dl>
  `;
  return r;
}

module.exports = fns;
module.exports.default = fns;
