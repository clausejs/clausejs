import sExpression, { SExpressionClause } from './sExpression';
const humanReadable = require( './humanReadable' );
const isStr = require( '../preds/isStr' );
const isProblem = require( './isProblem' );
const handle = require( './handle' );
const clauseFromAlts = require( './clauseFromAlts' );
const fnName = require( './fnName' );
const stringifyWithFnName = require( '../utils/stringifyWithFnName' );
const repeat = require( './repeat' );

const NEW_LINE = () => {};
const INDENT_IN = () => {};
const INDENT_OUT = () => {};

function describe( expr, replacer, space ) {
  const sexpr = sExpression( expr );
  const cSexpr = SExpressionClause.conform( sexpr );
  if ( isProblem( cSexpr ) ) {
    console.error( cSexpr );
    throw new Error( 'The given expression is not a valid expression.' );
  }
  const strFragments = _strFragments( cSexpr, replacer );
  const level = 0;
  const r = _walkConcat( strFragments, level, space );

  return r;
}

function _strFragments(
  { head: headAlt, params }, replacer ) {
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
  let commaedParamFrags;

  if ( params ) {
    const { labelled, unlabelled, keyList } = params;
    if ( labelled ) {
      let paramFrags = labelled.reduce(
        ( acc, { label, item } ) =>
            acc.concat( [
              [ label,
                ', ',
                _fragmentParamAlts( item, replacer )
              ],
            ] ),
        []
     );
      commaedParamFrags = interpose( paramFrags, [ ', ', NEW_LINE ] )
    } else if ( unlabelled ) {
      let paramFrags = unlabelled.map( ( p ) =>
        _fragmentParamAlts( p, replacer ) );
      commaedParamFrags = interpose( paramFrags, [ ', ' ] );
    } else if ( keyList ) {
      let paramFrags = keyList;
      commaedParamFrags = interpose( paramFrags, [ ', ' ] );
    } else {
      // console.error( params );
      // throw '!z';
      commaedParamFrags = [];
    }
  } else {
    commaedParamFrags = [];
  }

  return [ label, '(' ]
    .concat( commaedParamFrags.length > 1 ?
      [ INDENT_IN, NEW_LINE, ] : [ ' ' ] )
    .concat( commaedParamFrags )
    .concat( commaedParamFrags.length > 1 ?
      [ INDENT_OUT, NEW_LINE, ] : [ ' ' ] )
    .concat( [ ')' ] );
}

function interpose( arr, interArr ) {
  if ( arr.length === 0 ) {
    return arr;
  } else {
    return arr.reduce( ( acc, curr, idx ) => {
      if ( idx < arr.length - 1 && !_isSpecial( curr ) ) {
        return acc.concat( [ curr ] ).concat( interArr );
      } else {
        return acc.concat( [ curr ] );
      }
    }, [] );
  }
}

function _isSpecial( x ) {
  return x === NEW_LINE || x === INDENT_IN || x === INDENT_OUT;
}

function _fragmentParamAlts( pAlts, replacer ) {
  const r = handle( pAlts, {
    'label': ( lbl ) => lbl,
    'sExpression': ( expr ) => _strFragments( expr, replacer ),
    'quotedParamsMap': ( o ) => _fragmentParamsObj( o, replacer, true ),
    'unquotedParamsMap': ( o ) => _fragmentParamsObj( o, replacer, false ),
    'optionsObj': ( o ) => stringifyWithFnName( o ),
    'recursive': ( { expression } ) => [
      '<recursive>: ',
      humanReadable( expression )
    ]
  }, () => {
    throw '!s';
  } );
  return r;
}

function _fragmentParamsObj( pObj, replacer, quote ) {
  var r = [ '{', INDENT_IN, NEW_LINE, ];
  let body = [];
  for ( let label in pObj ) {
    if ( pObj.hasOwnProperty( label ) ) {
      let item = [];
      item.push( quote ? `"${label}": ` : `<${label}>: ` );
      var r1 = handle( pObj[ label ], {
        'keyList': ( list ) => {
          return [ '[ ' ].concat(
            interpose( list.map( ( i ) => `"${i}"` ), [ ', ' ] ) )
            .concat( ' ]' );
        },
        'singleParam': ( p ) =>
          _fragmentParamAlts( p, replacer )
      }, () => {
        throw '!e';
      } );
      if ( r1 ) {
        item.push( r1 );
        body.push( item );
      }
    }
  }
  body = interpose( body, [ ', ', NEW_LINE ] );
  r = r.concat( body ).concat( [ INDENT_OUT, NEW_LINE, '}' ] );
  return r;
}

function _walkConcat( frags, level, space ) {
  let newLevel = level;
  let justNewLine = false;
  return frags.reduce( ( acc, f ) => {
    if ( justNewLine ) {
      justNewLine = false;
      acc = acc.concat( repeat( space * newLevel, ' ' ).join( '' ) );
    }
    if ( isStr( f ) ) {
      return acc.concat( f );
    } else if ( Array.isArray( f ) ) {
      return acc.concat( _walkConcat( f, newLevel, space ) );
    } else if ( f === NEW_LINE ) {
      if ( space > 0 ) {
        justNewLine = true;
        return acc.concat( '\n' );
      }
    } else if ( f === INDENT_IN ) {
      newLevel += 1;
    } else if ( f === INDENT_OUT ) {
      newLevel -= 1;
    } else {
      console.error( f );
      throw '!3';
    }
    return acc;
  }, '' );
}

module.exports = describe;
