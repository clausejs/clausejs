import sExpression, { SExpressionClause } from './sExpression';
const humanReadable = require( './humanReadable' );
const isStr = require( '../preds/isStr' );
const isProblem = require( './isProblem' );
const handle = require( './handle' );
const clauseFromAlts = require( './clauseFromAlts' );
const fnName = require( './fnName' );
const stringifyWithFnName = require( '../utils/stringifyWithFnName' );

function describe( expr, replacer, space ) {
  const sexpr = sExpression( expr );
  const cSexpr = SExpressionClause.conform( sexpr );
  if ( isProblem( cSexpr ) ) {
    console.error( cSexpr );
    throw new Error( 'The given expression is not a valid expression.' );
  }
  const level = 0;
  const strFragments = _strFragments( cSexpr, replacer, level, space );
  const r = _walkConcat( strFragments );

  return r;
}

function _strFragments(
  { head: headAlt, params }, replacer, level, space ) {
  const head = clauseFromAlts( headAlt );
  if ( replacer ) {
    let interceptR = replacer( head );
    if ( interceptR ) {
      return interceptR;
    }
  }
  if ( head.type === 'PRED' ) {
    return [ `${fnName( head.opts.predicate )}` ];
  }
  const label = humanReadable( head );
  let paramFrags;
  if ( params ) {
    paramFrags = params.map( ( p ) =>
    _fragmentParamAlts( p, replacer ) );

  } else {
    paramFrags = [];
  }
  var commaedParamFrags = interpose( paramFrags, [ ', ' ] );

  return [ label, '( ' ]
    .concat( commaedParamFrags )
    .concat( ' )' );
}

function interpose( arr, interArr ) {
  if ( arr.length === 0 ) {
    return arr;
  } else {
    return arr.reduce( ( acc, curr, idx ) => {
      if ( idx < arr.length - 1 ) {
        return acc.concat( [ curr ] ).concat( interArr );
      } else {
        return acc.concat( [ curr ] );
      }
    }, [] );
  }
}

function _fragmentParamAlts( pAlts, replacer ) {
  const r = handle( pAlts, {
    'label': ( lbl ) => lbl,
    'sExpression': ( expr ) => _strFragments( expr, replacer ),
    'paramsObj': ( o ) => _fragmentParamsObj( o, replacer ),
    'optionsObj': ( o ) => stringifyWithFnName( o ),
    'recursive': ( { expression } ) => [
      '<recursive>: ',
      humanReadable( expression )
    ]
  }, () => {
    throw '!';
  } );
  return r;
}

function _fragmentParamsObj( pObj, replacer ) {
  var r = [];
  r.push( '{ ' );
  let body = [];
  for ( let label in pObj ) {
    if ( pObj.hasOwnProperty( label ) ) {
      let item = [];
      item.push( `${label}: ` );
      var r1 = handle( pObj[ label ], {
        'paramList': ( list ) => {
          return [ '[ ' ].concat(
            interpose( list.map( ( f ) =>
              _fragmentParamAlts( f, replacer ) ), [ ', ' ] ) )
            .concat( ' ]' );
        },
        'singleParam': ( p ) =>
        _fragmentParamAlts( p, replacer ),
        'paramMap': ( m ) =>
          _fragmentParamsObj( m, replacer ),
      }, () => {
        throw '!';
      } );
      if ( r1 ) {
        item.push( r1 );
        body.push( item );
      }
    }
  }
  body = interpose( body, ', ' );
  r = r.concat( body ).concat( [ ' }' ] );
  return r;
}


function _walkConcat( frags ) {
  return frags.map( ( f ) => {
    if ( isStr( f ) ) {
      return f;
    } else if ( Array.isArray( f ) ) {
      return _walkConcat( f );
    }
  } ).join( '' );
}

module.exports = describe;
