import { NamespaceObjSpec } from '../specs/namespace.types';
import fnName from '../utils/fnName';
import isPred from '../utils/isPred';
import isSpec from '../utils/isSpec';
import { isStr, isObj } from '../preds';
import describe from '../utils/describe';
import deref from '../utils/deref';
import { resolve, getDefList } from './namespaceResolver';

function gen( registry ) {
  var conformedReg = NamespaceObjSpec.conform( registry );
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
          `<li>${_specRefLink( `${p}/${n}` )( ( p ) => _stylizeName( deref( ref ), _unanbiguousName( p ) ) )}</li>` )
        .join( '' )}
      </ul>
    </dd>
    ` ).join( '' )}
  </dl>`
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
    throw new Error( `Expression ${exprName} does not exist in the registry` );
  }
  let docstr;
  docstr = genForExpression( globalReg, exprName, expr, meta );
  return docstr;
}

const typeTable = {
  'FSPEC': 'function',
  'PRED': 'predicate',
  'CAT': 'cat sequence',
}

function _stylizeName( expr, name ) {
  if ( expr.type === 'FSPEC' ) {
    return `${name}()`;
  } else {
    return name;
  }
}

function _type( expr ) {
  if ( isSpec( expr ) ) {
    return typeTable[ expr.type ] || expr.type.toLowerCase();
  } else if ( isPred( expr ) ) {
    return 'predicate';
  }
}

function genForExpression( globalReg, exprName, expr, meta ) {
  let docstr;
  let path = resolve( globalReg, expr );

  if ( path && !exprName ) {
    docstr = _genSpecRef( globalReg, exprName, path, expr, meta );
  } else if ( expr.type === 'SPEC_REF' ) {
    docstr = _genSpecRef( globalReg, exprName, null, expr, meta );
  } else if ( expr.type === 'Delayed' ) {
    return genForExpression( globalReg, exprName, expr.get(), meta );
  } else if ( expr.type === 'FSPEC' ) {
    docstr = _genFspec( globalReg, exprName, expr, meta );
  } else if ( expr.type === 'OR' ) {
    docstr = _genOrSpec( globalReg, exprName, path, expr, meta );
  } else if ( expr.type === 'CAT' ) {
    docstr = _genCatSpec( globalReg, exprName, path, expr, meta );
  } else if ( isPred( expr ) || expr.type === 'PRED' ) {
    docstr = _genPredSpec( globalReg, exprName, expr, meta );
  } else if ( isPred( expr ) || expr.type === 'ANY' ) {
    docstr = _genAnySpec( );
  } else {
    docstr = _genUnknownSpec( globalReg, exprName, path, expr, meta );
  }

  const name = meta && meta[ 'name' ] || exprName;

  return `
    ${( exprName && path ) ? `<a name="${path}"></a>` : ''}
    ${_wrapCard( {
      header: ( exprName && path ) ? `
      <h6>${_stylizeName( expr, name )}</h6>&nbsp;
        <span class="tag tag-primary">
          ${_type( expr )}
        </span>
      ` : null,
      legend: !path ? _tagFor( expr ) : '<span class="tag tag-info">of spec</span>',
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
    <legend class="spec-type">
      ${legend}
    </legend>
    ${body}
    </fieldset>
    `;
  }
}

function _tagFor( expr ) {
  return `<span class="tag tag-${_labelFor( expr )}">${_typeFor( expr )}</span>`;
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
    return 'of predicate';
  case 'fspec':
    return 'of fspec (function type)';
  case 'z_or_m':
    return 'zero or more of (*)';
  case 'o_or_m':
    return 'one or more of (+)';
  case 'z_or_o':
    return 'zero or one of (?)';
  case 'coll_of':
    return 'collection of';
  case 'cat':
    return 'cat (seq) of';
  case 'or':
    return 'or (alts)';
  default:
    return `<span class="tag tag-info">${lowerT}</span>`;
  }
}

function _labelFor( expr ) {
  var lowerT = _rawTypeFor( expr );

  switch ( lowerT ) {
  case 'pred':
    return 'primary';
  case 'fspec':
    return 'info';
  case 'cat': case 'or':
    return 'info';
  default:
    return 'info';
  }
}

function _genAnySpec() {
  return `
    <div class="card-block">Any value.</div>
  `
}

function _genSpecRef( globalReg, exprName, path, expr, meta ) {
  const p = path || expr.ref;
  return `
    <div class="card-block">
      A value that is of
      ${_specRefLink( p )( ( p ) => p )}
    </div>
  `;
}

function _specRefLink( p ) {
  return pGenFn =>
    `<a href="#${p}" data-path="${p}">${pGenFn( p )}</a>`;
}

function _genCatSpec( globalReg, exprName, path, expr, meta ) {
  const example = meta && meta.example;
  const altDefs = expr.exprs.map( ( { name, expr: altE }, idx ) => {
    const comment = meta && meta[ name ] && meta[ name ].comment;
    return `
        <li class="list-group-item card-outline-${_labelFor( expr )}">
          <div class="row">
            <div class="col-md-12">
              ${name ? `<p>
                <span class="tag tag-default">${toOrdinal( idx + 1 )} </span>
                &lt;<span class="lead font-italic text-primary">${name}</span>&gt;
                ${comment ? `: <span>${ comment }</span>` : ''}
                  ` : `<span class="tag tag-default">${toOrdinal( idx + 1 )} </span>`}
            </div>
          </div>
          <div class="row">
            <div class="col-md-11 offset-md-1">
              ${genForExpression( globalReg, null, altE, meta && meta[ name ] )}
            </div>
          </div>
        </li>
    `;
  } );

  const r = `
    <div class="card-block">
      <p class="card-title">
        ${_syntax( expr, globalReg, path )}
      </p>
      <p class="card-title">
        Should be <em>an ordered list</em> of the following:
      </p>
    </div>
    <ol class="list-group list-group-flush list-for-cat">
      ${altDefs.join( ' ' )}
    </ol>
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

function _synopsis( exprName, fspec, globalReg, meta ) {
  var r = synopsisArray( [], [], exprName, fspec, globalReg, meta, [] );
  var h = _synopsisToHtml( r );
  return h;
}

function AltName( name ) {
  this.name = name;
}

function _synopsisToHtml( arr ) {
  let h;
  if ( Array.isArray( arr ) ) {
    h = arr.map( _synopsisToHtml ).join( '' );
    h = `<ul>${h}</ul>`;
  } else if ( isObj( arr ) ) {
    var nameItemPairs = [];
    for ( var name in arr ) {
      nameItemPairs.push( [ name, arr[ name ] ] );
    }
    h = nameItemPairs.map( ( [ name, item ] ) => {
      return `<li>&lt;${name}&gt;:<div>${_synopsisToHtml( item )}</div></li>`
    } ).join( '' );
    h = `<ul>${h}</ul>`;
  } else if ( isStr( arr ) ) {
    h = arr;
  }
  return h;

}

function synopsisArray( prefixes, suffixes, exprName, spec, globalReg, meta, defs ) {
  if ( !spec ) {
    return prefixes.concat( suffixes );
  } else if ( spec.type == 'FSPEC' ) {
    let fnName = meta && meta.name || exprName;

    return synopsisArray( [ fnName, '(' ], [ ')' ], null, spec.opts.args, globalReg, meta && meta.args, defs );
    // return {
    //   register: [
    //     'S(', 'nsPath', ', ', 'expression', ')'
    //   ],
    //   retrieve: [
    //     'var ', 'expression', ' = ', 'S(', 'nsPath', ', ', 'expression', ')'
    //   ],
    // };
  } else if ( spec.type === 'OR' ) {
    var { named } = spec.opts;
    let obj;
    if ( named ) {
      obj = {};
      for ( let eAlt of spec.exprs ) {
        obj[ eAlt.name ] = synopsisArray( prefixes, suffixes, null, eAlt.expr, globalReg, meta && meta[ eAlt.name ], defs );
      }
    } else {
      obj = [];
      for ( let eAlt of spec.exprs ) {
        obj.push( synopsisArray( prefixes, suffixes, null, eAlt.expr, globalReg, meta && meta[ eAlt.name ], defs ) );
      }
    }
    return obj;
  } else if ( spec.type === 'CAT' ) {
    var { named } = spec.opts;
    let obj = [];
    for ( let i = 0; i < spec.exprs.length; i++ ) {
      let eAlt = spec.exprs[ i ];
      let path = resolve( globalReg, eAlt.expr );
      if ( named ) {
        obj.push( path ? _specRefLink( path )( () => eAlt.name ) : eAlt.name );
      } else {
        if ( path ) {
          obj.push( _specRefLink( path )( _unanbiguousName ) );
        }
      }
      if ( i < spec.exprs.length - 1 ) {
        obj.push( ', ' );
      }
    }

    return [ '<em>' ]
      .concat( prefixes )
      .concat( obj )
      .concat( suffixes )
      .concat( [ '</em>' ] );
  } else {
    console.error( spec );
    // throw '!';
    return spec.type;
  }

}

function _syntax( expr, globalReg, currPath ) {
  return ``;
  // return `<em class="text-info">
  //   ${describe( expr, _refExprFn( globalReg, currPath ) )}
  // </em>`;
}

function _refExprFn( reg, currPath ) {
  return ( expr ) => {
    let path = resolve( reg, expr );
    if ( path && path !== currPath ) {
      return [ _specRefLink( path )( _unanbiguousName ) ];
    }
  }
}

function _unanbiguousName( path ) {
  // TODO: make sure there are no duplicate names
  const name = path.substring( path.indexOf( '/' ) + 1 );
  return name;
}

function _genPredSpec( globalReg, exprName, expr, meta ) {
  let pred = expr.exprs ? expr.exprs[ 0 ] : expr;
  const name = meta && meta[ 'name' ] || exprName;
  const predName = fnName( pred );
  const nameFrag = name ? `${name} ` : '';
  const r = `
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
        A value that satisfies
        <em>${predName}()</em>
      </span>
    </div>
  `;
  return r;
}


function _genUnknownSpec( globalReg, exprName, path, expr, meta ) {
  const r = `
    <div class="card-block">
      ${_syntax( expr, globalReg, path )}
      ${expr.exprs.map( ( exprAlts ) => {
        var { name, expr } = exprAlts;
        if ( expr ) {
          return genForExpression( globalReg, name, expr, meta && meta[ name ] );
        } else {
          return genForExpression( globalReg, null, exprAlts, null );
        }
      } ).join( '' )}
    </div>
  `;
  return r;
}

function _stringifyWithFn( objWithFunction ) {
  if ( !objWithFunction ) {
    return '';
  }
  return JSON.stringify( objWithFunction, function( key, val ) {
    if ( typeof val === 'function' ) {
      return `${val.name}()`; // implicitly `toString` it
    }
    return val;
  }, 2 );
}

function _genOrSpec( globalReg, exprName, path, expr, meta ) {
  const example = meta && meta.example;
  const altDefs = expr.exprs.map( ( { name, expr: altE }, idx ) => {
    const comment = meta && meta[ name ] && meta[ name ].comment;
    return `
        <li class="list-group-item card-outline-${_labelFor( expr )}">
          <div class="row">
            <div class="col-md-12">
              <span class="tag tag-default">
                Option ${idx + 1}
              </span>
              ${name ? `
                  &lt;<span class="lead font-italic text-primary">${name}</span>&gt;
              ${comment ? `: <span>${ comment }</span>` : ''}
            ` : ''}
            </div>
          </div>
          <div class="row">
            <div class="col-md-11 offset-md-1">
              ${genForExpression( globalReg, null, altE, meta && meta[ name ] )}
            </div>
          </div>
        </li>
    `;
  } );

  const r = `
    <div class="card-block">
      ${_syntax( expr, globalReg, path )}
      <p class="card-title">
      ${exprName ? '' : `
      `}
        Should be <em>one of</em> the following:
      </p>
    </div>
    <ol class="list-group list-group-flush list-for-or">
      ${altDefs.join( '' )}
    </ol>
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
  const comment = meta && meta[ 'comment' ];
  const { args: argsSpec, ret: retSpec, fn } = spec.opts;
  if ( comment ) {
    frags.push( [ null, comment ] );
  }
  if ( argsSpec ) {
    frags.push( [ 'Synopsis', _synopsis( exprName, spec, globalReg, meta ) ] );
    frags.push( [ 'Argument list', genForExpression( globalReg, null, argsSpec, meta && meta.args ) ] );
  }
  if ( retSpec ) {
    frags.push( [ 'Return value', genForExpression( globalReg, null, retSpec, meta && meta.ret ) ] );
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
