import sExpression, { SExpressionClause } from './sExpression';
const humanReadable = require( './humanReadable' );
const isStr = require( '../preds/isStr' );
const conform = require( './conform' );
const isProblem = require( './isProblem' );
const handle = require( './handle' );
const clauseFromAlts = require( './clauseFromAlts' );
const fnName = require( './fnName' );

function describe( expr, interceptor, indent ) {
  const sexpr = sExpression( expr );
  const cSexpr = SExpressionClause.conform( sexpr );
  if ( isProblem( cSexpr ) ) {
    console.error( cSexpr );
    throw new Error( 'The given expression is not a valid expression.' );
  }
  const strFragments = _strFragments( cSexpr );
  const r = _walkConcat( strFragments );

  return r;
}

function _strFragments( { head: headAlt, params } ) {
  const head = clauseFromAlts( headAlt );
  if ( head.type === 'PRED' ) {
    return [ `${fnName( head.opts.predicate )}()` ];
  }
  const label = humanReadable( head );
  let paramFrags;
  if ( params ) {
    paramFrags = params.map( _fragmentParamAlts );
  } else {
    paramFrags = [];
  }

  var commaedParamFrags = interpose( paramFrags, [ ', ' ] );

  return [ label, '( ' ].concat( commaedParamFrags ).concat( ' )' );
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

function _fragmentParamAlts( pAlts ) {
  const r = handle( pAlts, {
    'label': ( lbl ) => lbl,
    'sExpression': _strFragments,
    'paramsObj': _fragmentParamsObj,
    'optionsObj': ( o ) => JSON.stringify( o ),
    'recursive': ( { expression } ) => [
      '<recursive>: ',
      humanReadable( expression )
    ]
  }, () => {
    throw '!';
  } );
  return r;
}

function _fragmentParamsObj( pObj ) {
  var r = [];
  r.push( '{ ' );
  let body = [];
  for ( let label in pObj ) {
    if ( pObj.hasOwnProperty( label ) ) {
      let item = [];
      item.push( `${label}: ` );
      var r1 = handle( pObj[ label ], {
        paramList: ( list ) => {
          return [ '[ ' ].concat(
          interpose( list.map( _fragmentParamAlts ), [ ', ' ] ) )
          .concat( ' ]' );

        },
        paramMap: _fragmentParamsObj
      }, () => {
        throw '!';
      } );
      item.push( r1 );
      body.push( item );
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
