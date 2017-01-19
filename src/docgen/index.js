import { NamespaceObjClause } from '../clauses/namespace.types';
import { getMeta } from '../namespace';
import fnName from '../utils/fnName';
import isPred from '../utils/isPred';
import isClause from '../utils/isClause';
import { isStr, isObj } from '../preds';
import describe from '../utils/describe';
import deref from '../utils/deref';
import { resolve, getDefList } from '../namespace/resolve';
import synopsis from './synopsis';
const clauseFromAlts = require( '../utils/clauseFromAlts' );


function gen( registry ) {
  var conformedReg = NamespaceObjClause.conform( registry );
  var docstr = _walk( registry, null, null, conformedReg );
  return docstr;
}

function genCot( registry ) {
  var r = getDefList( registry );
  var groups = Object.keys( r );
  return `<dl>
    ${groups.map( ( p ) => `
    <dt>
      ${p}
    </dt>
    <dd>
      <ul>
      ${r[ p ]
        .map( ( [ p, n, ref ] ) =>
          `<li>
            ${_clauseRefLink( `${p}/${n}` )(
              ( pn ) =>
                _stylizeName(
                  deref( ref ),
                  _getAlias( registry, pn ) || _unanbiguousName( pn ),
                  getMeta( pn, registry ) )
            )}
          </li>` )
        .join( '' )}
      </ul>
    </dd>
    ` ).join( '' )}
  </dl>`
}

function _getAlias( reg, p ) {
  var meta = getMeta( p, reg );
  return meta && meta.name;
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
            let subresult = _walk(
              globalReg, currentNs, subnamespace, subNamespaces[ subnamespace ] );
            subresults.push( subresult );
          }
        }
        break;
      case '.nsComment':
        nsComment = `<p><i>${creg[ key ]}</i></p>`;
        break;
      case '.expr':
        exprResult = _exprMeta(
          globalReg, currentFrag, creg[ '.expr' ], creg[ '.meta' ] );
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
    r += `<h3>${currentNs}/</h3><hr />`;
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
    throw new Error(
      `Expression ${exprName} does not exist in the registry` );
  }
  let docstr;
  docstr = genForExpression( globalReg, exprName, expr, meta );
  return docstr;
}

const typeTable = {
  'FCLAUSE': 'function',
  'PRED': 'predicate',
  'CAT': 'cat sequence',
}

function _stylizeName( expr, name, meta ) {
  if ( expr.type === 'FCLAUSE' && name[ 0 ] === name[ 0 ].toLowerCase() ||
    ( meta && meta.showAsFunction ) ) {
    return `${name}()`;
  } else {
    return name;
  }
}

function _type( expr ) {
  if ( isClause( expr ) ) {
    return typeTable[ expr.type ] || expr.type.toLowerCase();
  } else if ( isPred( expr ) ) {
    return 'predicate';
  }
}

function genForExpression( globalReg, exprName, expr, meta ) {
  let docstr;
  let path = resolve( expr, globalReg );

  if ( path && !exprName ) {
    docstr = _genClauseRef( globalReg, exprName, path, expr, meta );
  } else if ( expr.type === 'CLAUSE_REF' ) {
    docstr = _genClauseRef( globalReg, exprName, null, expr, meta );
  } else if ( expr.type === 'DELAYED' ) {
    return genForExpression( globalReg, exprName, expr.get(), meta );
  } else if ( expr.type === 'FCLAUSE' ) {
    docstr = _genFclause( globalReg, exprName, expr, path, meta );
  } else if ( expr.type === 'OR' ) {
    docstr = _genOrClause( globalReg, exprName, path, expr, meta );
  } else if ( expr.type === 'CAT' ) {
    docstr = _genCatClause( globalReg, exprName, path, expr, meta );
  } else if ( isPred( expr ) || expr.type === 'PRED' ) {
    docstr = _genPredClause( globalReg, exprName, expr, meta );
  } else if ( isPred( expr ) || expr.type === 'ANY' ) {
    docstr = _genAnyClause( );
  } else if ( expr.type === 'AND' ) {
    docstr = _genAndClause( globalReg, exprName, path, expr, meta );
  } else {
    docstr = _genUnknownClause(
      globalReg, exprName, path, expr, meta );
  }

  const name = meta && meta[ 'name' ] || exprName;
  const header = ( exprName && path ) ? `
      <h6>${_stylizeName( expr, name )}</h6>&nbsp;
        <span class="tag tag-primary">
          ${_type( expr )}
        </span>
      ` : null;

  return `
    ${( exprName && path ) ? `<a name="${path}"></a>` : ''}
    ${_wrapCard( {
      header,
      legend: !path ?
        _tagFor( expr, globalReg, path ) :
        '<span class="tag tag-info">[clause]</span>',
      borderlabel: _labelFor( expr )
    } )( docstr )}`;
}


function _wrapCard( { header, legend, borderlabel } ) {
  if ( header ) {
    return ( body ) => `
        <div class="card">
          <div class="card-header inline-headers">
            ${header}
          </div>
        ${body}
        </div>
      `;
  } else if ( legend ) {
    return ( body ) => `
    <fieldset class="card card-outline-${borderlabel || 'default'}">
    <legend class="clause-type">
      ${legend}
    </legend>
    ${body}
    </fieldset>
    `;
  }
}

function escapeHtml( text ) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  return text.replace( /[&<>"']/g, function( m ) {
    return map[ m ];
  } );
}

function _tagFor( expr, globalReg, path ) {
  return `
    <span 
      role="button"
      data-toggle="popover"
      data-trigger="focus hover"
      data-html="true"
      data-content="${escapeHtml( _syntax( expr, globalReg, path ) )}"
      data-container="body"
      data-animation="false"
      data-delay="500"
      class="tag tag-${_labelFor( expr )}">
      ${_typeFor( expr )}
    </span>
  `;
}

function _rawTypeFor( expr ) {
  let lowerT;
  let derefedExpr = deref( expr );
  if ( isPred( derefedExpr ) ) {
    lowerT = 'pred';
  } else {
    lowerT = derefedExpr.type.toLowerCase();
  }
  return lowerT;
}

function _typeFor( expr ) {
  var lowerT = _rawTypeFor( expr );
  switch ( lowerT ) {
  case 'pred':
    return '[pred] satisfies predicate';
  case 'fclause':
    return '[fclause] a function';
  case 'z_or_m':
    return '[*] zero or more';
  case 'o_or_m':
    return '[+] one or more';
  case 'z_or_o':
    return '[?] optional';
  case 'coll_of':
    return '[collOf] a collection of';
  case 'cat':
    return '[cat] a sequence of';
  case 'or':
    return '[or] either one of';
  default:
    return `<span class="tag tag-info">[${lowerT}]</span>`;
  }
}

function _labelFor( expr ) {
  var lowerT = _rawTypeFor( expr );

  switch ( lowerT ) {
  case 'pred':
    return 'primary';
  case 'fclause':
    return 'info';
  case 'cat': case 'or':
    return 'info';
  default:
    return 'info';
  }
}

function _genAnyClause() {
  return `
    <div class="card-block">Any value.</div>
  `
}

function _genClauseRef( globalReg, exprName, path, expr, meta ) {
  const p = path || expr.ref;
  return `
    <div class="card-block">
      A value of type
      ${_clauseRefLink( p )( ( p ) => p )}
    </div>
  `;
}

function _genAndClause( globalReg, exprName, path, expr, meta ) {
  const example = meta && meta.example;
  const altDefs = expr.opts.conformedExprs.map( ( altE, idx ) => {
    return `
        <fieldset class="list-group-item card-outline-${_labelFor( expr )}">
          <legend class="clause-type">
            <span class="tag tag-default">Condition ${idx + 1} </span>
          </legend>
          <div class="row">
            <div class="col-md-12">
              ${genForExpression( globalReg, null, clauseFromAlts( altE ), null )}
            </div>
          </div>
        </fieldset>
    `;
  } );

  const r = `
    <div class="card-block">
      <p class="card-title">
        Should satisfy <em>all</em> of the following expression:
      </p>
    </div>
    <div class="list-group list-group-flush list-for-cat">
      ${altDefs.join( ' ' )}
    </div>
  `;
  return r;
}

function _genCatClause( globalReg, exprName, path, expr, meta ) {
  const example = meta && meta.example;
  const altDefs = expr.exprs.map( ( { name, expr: altE }, idx ) => {
    const comment = meta && meta[ name ] && meta[ name ].comment;
    return `
        <fieldset class="list-group-item card card-outline-${_labelFor( expr )}">
          <legend class="clause-type">
          ${name ? `
            <span class="tag tag-default">Part ${idx + 1}</span>
            <span class="lead font-italic text-primary">
              &ldquo;${name}&rdquo;</span>          
          ` : `<span class="tag tag-default">Part ${idx + 1}</span>`}
          </legend>
          <div class="row">
            <div class="col-md-12">
              ${comment ? `<span>${ comment }</span>` : ''}
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              ${genForExpression( globalReg, null, altE, meta && meta[ name ] )}
            </div>
          </div>
        </fieldset>
    `;
  } );

  const r = `
    <div class="card-block">
      <p class="card-title">
        Should be <em>an ordered list</em> of the following:
      </p>
    </div>
    <div class="list-group list-group-flush list-for-cat">
      ${altDefs.join( ' ' )}
    </div>
  `;
  return r;
}

// function _codeExample( code ) {
//   const r = `${code ? `
//     <blockquote class="blockquote">
//       <pre><code class="js">${ code }</code></pre>
//     </blockquote>` : ''}`
//   return r;
// }


function _clauseRefLink( p ) {
  return pGenFn =>
    `<a href="#${p}" data-path="${p}">${pGenFn( p )}</a>`;
}

function _syntax( expr, globalReg, currPath ) {
  // return ``;
  return `
    <pre>${unescape( _encode( describe( expr, _refExprFn( globalReg, currPath ), 2 ) ) )}</pre>
  `;
}

function _encode( str ) {
  return str.split( '<' ).join( '&lt;' ).split( '>' ).join( '&gt;' );
}

function _refExprFn( reg, currPath ) {
  return ( expr ) => {
    let path = resolve( expr, reg );
    if ( path && path !== currPath ) {
      let r = _clauseRefLink( path )( _unanbiguousName );
      r = escape( r );
      return [ r ];
    } else {
      return null;
    }
  }
}

function _unanbiguousName( path ) {
  // TODO: make sure there are no duplicate names
  const name = path.substring( path.indexOf( '/' ) + 1 );
  return name;
}

function _genPredClause( globalReg, exprName, expr, meta ) {
  let pred = expr.exprs ? expr.exprs[ 0 ] : expr;
  // const name = meta && meta[ 'name' ] || exprName;
  // const nameFrag = name ? `${name} ` : '';

  const r = `
    <div class="card-block">
      ${_predSourcePopover( 'A value that satisfies ', pred )}
    </div>
  `;
  return r;
}

function _predSourcePopover( prefix, pred ) {
  const predName = fnName( pred );
  return `
    <em>
      ${prefix}
      <span
        data-toggle="popover"
        data-trigger="hover click"
        data-html="true"
        role="button"
        data-placement="top"
        data-content="<pre>${pred.toString()}</pre>"
        data-container="body"
        data-animation="false"
        data-delay="500">
        ${predName}()
      </span>
    </em>
  `;
}

function _genUnknownClause( globalReg, exprName, path, expr, meta ) {
  const r = `
    <div class="card-block">
      ${expr.exprs.map( ( exprAlts ) => {
        var { name, expr } = exprAlts;
        if ( expr ) {
          return genForExpression( globalReg, name, expr, meta && meta[ name ] );
        } else {
          return genForExpression( globalReg, null, exprAlts, null );
        }
      } ).join( '' )}
      TODO
    </div>
  `;
  return r;
}

function _genOrClause( globalReg, exprName, path, expr, meta ) {
  if ( !meta ) {
    meta = {};
  }
  const altDefs = expr.exprs.map( ( { name, expr: altE }, idx ) => {
    const comment = meta[ name ] && meta[ name ].comment;
    var examples = meta[ name ] && meta[ name ].examples;
    if ( isStr( examples ) ) {
      examples = [ examples ];
    }

    return `
        <fieldset class="list-group-item card-outline-${_labelFor( expr )}">
          <legend class="clause-type">
            <span class="tag tag-default">
                Option ${idx + 1}
            </span>
            ${name ? `
                <span class="lead font-italic text-primary">
                  &ldquo;${name}&rdquo;
                </span>
            ` : ''}
          </legend>
          <div class="row">
            <div class="col-md-12">
            ${comment ? `<div>${ comment }</div>` : ''}
            
            ${examples ? '<h6>Examples: </h6>' + examples.map( ( e ) => `
              <pre><code>${e}</code></pre>
            ` ).join( '\n' ) : ''}
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              ${genForExpression( globalReg, null, altE, meta && meta[ name ] )}
            </div>
          </div>
        </fieldset>
    `;
  } );

  const r = `
    <div class="card-block">
      <p class="card-title">
      ${exprName ? '' : `
      `}
        Should be <em>one of</em> the following:
      </p>
    </div>
    <div class="list-group list-group-flush list-for-or">
      ${altDefs.join( '' )}
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
function _genFclause( globalReg, exprName, clause, path, meta = {} ) {
  var frags = [ ];
  var { comment, examples } = meta || {};
  if ( isStr( examples ) ) {
    examples = [ examples ];
  }
  const { args: argsClause, ret: retClause, fn } = clause.opts;
  if ( comment ) {
    frags.push( [ null, comment ] );
  }
  if ( argsClause ) {
    frags.push( [
      'Synopsis',
      `<ul>
        ${
        synopsis( clause, 4, _refExprFn( globalReg, path ) )
          .map( ( s ) => `<li>${unescape( _encode( s ) )}</li>` )
          .join( '' )
        }
      </ul>`
    ] );
  }
  if ( examples ) {
    frags.push( [ 'Examples', examples.map( ( e ) => `
      <pre><code>${e}</code></pre>
    ` ).join( '\n' ) ] );
  }
  if ( exprName && path ) {
    frags.push( [ 'Syntax', `
    <blockquote class="blockquote">
      <small>
        <em class="text-muted">
          ${_syntax( clause, globalReg, path )}
        </em>
      </small>
    </blockquote>
  ` ] );
  }
  if ( argsClause ) {
    frags.push( [ 'Argument Clause', genForExpression( globalReg, null, argsClause, meta && meta.args ) ] );
  }
  if ( retClause ) {
    frags.push( [ 'Return Value Clause', genForExpression( globalReg, null, retClause, meta && meta.ret ) ] );
  } if ( fn ) {
    frags.push( [ 'Argument-return value relation', `<pre>${fnName( fn )}</pre>` ] );
  }
  const r = `
    <dl class="card-block">
    ${frags.map( ( [ name, src ] ) => {
      const title = name ? `<dt>${name}</dt>` : '';
      const def = `<dd>${src}</dd>`;
      return `${title}${def}`;
    } ).join( '\n' )}
    </dl>
  `;
  return r;
}


var fns = {
  gen,
  genForExpression,
  genCot,
};
module.exports = fns;
module.exports.default = fns;

