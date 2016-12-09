import { NamespaceObjSpec } from '../specs/namespace.types';
import fnName from '../utils/fnName';
import isPred from '../utils/isPred';
import isSpec from '../utils/isSpec';
import describe from '../utils/describe';
import { resolve } from './namespaceResolver';

function gen( registry ) {
  var conformedReg = NamespaceObjSpec.conform( registry );
  var docstr = _walk( registry, null, null, conformedReg );
  return docstr;
}

function _walk( globalReg, prefix, currentFrag, creg ) {
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
            let subresult = _walk( globalReg, currentNs, subnamespace, subNamespaces[ subnamespace ] );
            subresults.push( subresult );
          }
        }
        break;
      case '.nsComment':
        nsComment = `<p><i>${creg[ key ]}</i></p>`;
        break;
      case '.expr':
        exprResult = _exprMeta( globalReg, currentFrag, creg[ '.expr' ], creg[ '.meta' ] );
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

function _exprMeta( globalReg, exprName, expr, meta ) {
  if ( !expr ) {
    throw new Error( `Expression ${exprName} does not exist in the registry` );
  }
  let docstr;
  docstr = genForExpression( globalReg, exprName, expr, meta );
  return `
    ${docstr}
    `;
}

function _type( expr ) {
  if ( isSpec( expr ) ) {
    return expr.type;
  } else if ( isPred( expr ) ) {
    return `[Predicate] ${fnName( expr )}()`;
  }
}

function genForExpression( globalReg, exprName, expr, meta, registry ) {
  let docstr;
  let path = resolve( globalReg, expr );
  if ( path && !exprName ) {
    docstr = _genSpecRef( globalReg, exprName, path, expr, meta );
  } else if ( expr.type === 'SpecRef' ) {
    docstr = _genSpecRef( globalReg, exprName, null, expr, meta );
  } else if ( expr.type === 'Delayed' ) {
    docstr = genForExpression( globalReg, exprName, expr.get(), meta, registry );
  } else if ( expr.type === 'FSPEC' ) {
    docstr = _genFspec( globalReg, exprName, expr, meta );
  } else if ( expr.type === 'OR' ) {
    docstr = _genOrSpec( globalReg, exprName, expr, meta );
  } else if ( expr.type === 'CAT' ) {
    docstr = _genCatSpec( globalReg, exprName, expr, meta );
  } else if ( isPred( expr ) || expr.type === 'PRED' ) {
    docstr = _genPredSpec( globalReg, exprName, expr, meta );
  } else {
    docstr = _genUnknownSpec( globalReg, exprName, expr, meta );
  }

  return ( exprName && path ) ? `
    <a name="${path}"></a>
    <div data-path="${path}">
    ${docstr}
    </div>
    ` : `
    <div>
      ${docstr}
    </div>
    `;
}

function _genSpecRef( globalReg, exprName, path, expr, meta ) {
  const p = path || expr.ref;
  return `
    <div class="card">
      <div class="card-block">
        <a href="#${p}" data-path="${p}">${p}</a>
      </a>
    </div>
  `;
}

function _genCatSpec( globalReg, exprName, expr, meta ) {
  const altDefs = expr.exprs.map( ( { name, expr: altE }, idx ) => {
    const comment = meta && meta[ name ] && meta[ name ].comment;
    const example = meta && meta[ name ] && meta[ name ].example;
    return `
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-12">
              ${name ? `<p>
                <span class="tag tag-default">${toOrdinal( idx + 1 )} </span>
                <span class="lead font-italic text-primary">
                  ${name}
                </span>
                ${comment ? `: <span>${ comment }</span>` : ''}
                  ` : `<span class="tag tag-default">${toOrdinal( idx + 1 )} </span>`}
              ${_syntax( expr )}
            </div>
          </div>
          <div class="row">
            <div class="col-md-11 offset-md-1">
              ${_codeExample( example )}
              ${genForExpression( globalReg, null, altE, null )}
            </div>
        </li>
    `;
  } );

  const r = `
  <div class="card">
    <div class="card-block">
      <p class="card-title">
        ${_tagFor( 'cat' )}
        Must be <em>a sequence of</em> the following expressions:
      </p>
    </div>
    <ol class="list-group list-group-flush">
      ${altDefs.join( '' )}
    </ol>
  </div>
  `;
  return r;
}

function _codeExample( code ) {
  const r = `${code ? `
    <blockquote class="blockquote">
      <pre><code class="js">${ code }</code></pre>
    </blockquote>` : ''}`
  return r;
}

function _syntax( expr ) {
  // return `<em class="text-success">
  //   ${describe( expr )}
  // </em>`;
  return '';
}

function _genPredSpec( globalReg, exprName, expr, meta ) {
  let pred = expr.exprs ? expr.exprs[ 0 ] : expr;
  const name = meta && meta[ 'name' ] || exprName;
  const predName = fnName( pred );
  const nameFrag = name ? `${name} ` : '';
  const r = `
    <div class="card">
      ${
        name ? `
          <div class="card-header">
            <span>
              ${nameFrag}<span class="tag tag-primary">predicate</span>
              ${_syntax( expr )}
            </span>
          </div>
        ` : ''
      }
      <div class="card-block">
        <span
          data-toggle="popover"
          data-trigger="hover"
          data-html="true"
          title="${predName}()"
          data-content="<pre>${pred.toString()}</pre>"
          data-container="body"
          data-animation="false"
          data-delay="500">
          ${ name ? '' : _tagFor( 'pred' ) }
          <em>${predName}()</em>
        </span>
      </div>
    </div>
  `;
  return r;
}

function _tagFor( t ) {
  switch ( t ) {
  case 'pred':
    return '<span class="tag tag-primary">predicate</span>';
  case 'cat': case 'or':
    return `<span class="tag tag-info">spec: ${t}</span>`;
  default:
    throw '!'
  }
}

function _genUnknownSpec( globalReg, exprName, expr, meta ) {
  const r = `
  <div class="card">
    <div class="card-header">
    ${exprName || _type( expr )}
    <div class="tag tag-success">spec: ${expr.type.toLowerCase()}</div>
    ${_syntax( expr )}

    </div>
    <pre>${_stringifyWithFn( expr )}</pre>
    <pre>${_stringifyWithFn( meta )}</pre>
  </div>
  `;
  return r;
}

function _stringifyWithFn( objWithFunction ) {
  return JSON.stringify( objWithFunction, function( key, val ) {
    if ( typeof val === 'function' ) {
      return `${val.name}()`; // implicitly `toString` it
    }
    return val;
  }, 2 );
}

function _genOrSpec( globalReg, exprName, expr, meta ) {
  const altDefs = expr.exprs.map( ( { name, expr: altE }, idx ) => {
    const comment = meta && meta[ name ] && meta[ name ].comment;
    const example = meta && meta[ name ] && meta[ name ].example;

    return `
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-12">
              <span class="tag tag-default">
                alt ${idx + 1}
              </span>
              ${name ? `
                  <span class="lead font-italic text-primary">
                    ${name}
                  </span>
                  ${comment ? `: <span>${ comment }</span>` : ''}
                ` : ''}
              ${_syntax( expr )}
            </div>
          </div>
          <div class="row">
            <div class="col-md-11 offset-md-1">
              ${_codeExample( example )}
              ${genForExpression( globalReg, null, altE, null )}
            </div>
          </div>
        </li>
    `;
  } );

  const r = `
  <div class="card">
    ${exprName ? `
        <div class="card-header">
        ${exprName} ${_tagFor( 'or' )}
        ${_syntax( expr )}
        </div>
      ` : ''}
    <div class="card-block">
      <p class="card-title">
        ${exprName ? '' : _tagFor( 'or' )}
        ${_syntax( expr )}
        Must be <em>one of</em> the following alternative forms:
      </p>
    </div>
    <ol class="list-group list-group-flush">
      ${altDefs.join( '' )}
    </ol>
  </div>
  `;
  return r;
}

function toOrdinal( i ) {
  var j = i % 10,
    k = i % 100;
  if ( j == 1 && k != 11 ) {
    return i + 'st';
  }
  if ( j == 2 && k != 12 ) {
    return i + 'nd';
  }
  if ( j == 3 && k != 13 ) {
    return i + 'rd';
  }
  return i + 'th';
}

// NOTE: meta param is omitted at the end
function _genFspec( globalReg, exprName, spec, meta ) {
  var frags = [ ];
  const name = meta && meta[ 'name' ] || exprName;
  const { args: argsSpec, ret: retSpec, fn } = spec.opts;
  if ( argsSpec ) {
    frags.push( [ 'Parameters', genForExpression( globalReg, null, argsSpec, meta && meta.args ) ] );
  }
  if ( retSpec ) {
    frags.push( [ 'Return value', genForExpression( globalReg, null, retSpec, meta && meta.ret ) ] );
  } if ( fn ) {
    frags.push( [ 'Argument-return value relation', `<pre>${fnName( fn )}</pre>` ] );
  }
  const r = `
    <div class="card">
      ${name ? `
        <div class="card-header">
          ${name}() <span class="tag tag-primary">function</span>
          ${_syntax( spec )}
        </div>
        ` : ''}
      <div class="card-block">
        <dl>
        ${frags.map( ( [ name, src ] ) => `<dt>${name}</dt><dd>${src}</dd>` ).join( '\n' )}
        </dl>
      </div>
    </div>
  `;
  return r;
}


var fns = {
  gen,
  genForExpression,
};
module.exports = fns;
module.exports.default = fns;
