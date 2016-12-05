import { NamespaceObjSpec } from '../specs/namespace';


const gen = ( registry ) => {
  var conformedReg = NamespaceObjSpec.conform( registry );
  var docstr = _walk( null, conformedReg );
  return docstr;
}

var fns = {
  gen,
};

function _walk( prefix, creg ) {
  let r = '';
  let subresults = [];
  let nsComment,
    exprResult;
  for ( let key in creg ) {
    if ( creg.hasOwnProperty( key ) ) {
      switch ( key ) {
      case 'subNamespaces' :
        for ( let subnamespace in creg[ key ] ) {
          if ( creg[ key ].hasOwnProperty( subnamespace ) ) {
            var subNsName = prefix ? `${prefix}.${subnamespace}` : subnamespace;
            let subresult = _walk( subNsName, creg[ key ][ subnamespace ] );
            subresults.push( subresult );
          }
        }
        break;
      case '.nsComment':
        nsComment = `<p><i>${creg[ key ]}</i></p>`;
        break;
      case '.meta':
        exprResult = _exprMeta( creg[ key ], creg[ '.expr' ] );
        break;
      default:
        break;
      }
    }
  }

  if ( prefix && ( nsComment || exprResult ) ) {
    r += `<h3>${prefix}</h3><hr />`;
  }

  if ( nsComment ) {
    r += nsComment;
  }

  if ( exprResult ) {
    r += exprResult;
  }

  if ( subresults.length > 0 ) {
    r += subresults.join( '\n' );
  }

  return r;
}

function _exprMeta( meta, expr ) {
  return `<pre>${JSON.stringify( meta, null, 2 )}</pre>`;
}

module.exports = fns;
module.exports.default = fns;
