const { cat, or, shape, zeroOrOne, maybe, oneOrMore, fclause, any, and, wall, ExprClause, collOf } = require( '../core' );
const { isStr, isFn, isNum, isInt, isObj, isBool, instanceOf } = require( '../preds' );
const { conform, isClause, deref, delayed } = require( '../utils' );
const C = require( '../' );
const oAssign = require( '../utils/objectAssign' );
const clauseFromAlts = require( '../utils/clauseFromAlts' );
const fnName = require( '../utils/fnName' );
const stringifyWithFnName = require( '../utils/stringifyWithFnName' );
import sExpression, { genClauses, ParamItemClause,
 UnquotedParamsMap, QuotedParamsMap } from '../utils/sExpression';
import { fragsToStr, interpose, humanReadable,
  INDENT_IN, NEW_LINE, INDENT_OUT } from '../utils/describe';
const handle = require( '../utils/handle' );

//     ----'first'-----  --------'second'---------
// fn( (isStr, isBool)+, (isObj | (isNum, isBool)) )

//     -----'first'----  ---second--
//                        -(objOpt)-
// fn( (isStr, isBool)+,    isObj     )
//     -----'first'----  ----second----
//                       ---(showNum)--
// fn( (isStr, isBool)+, isNum, isBool )



// fn( { <required>: [ 'propA': isNum, <propB: beginsWithS>: any ], <optional>: [  ] } )

// cat('first', oneOrMore(cat (isStr, isBool), 'second': {...}  ))

// console.log( conform( sample, [ 'hello', true, 'abc', false, 32, false ] ) );

function AltHeadNode( label, clause, enclosed ) {
  this.label = label;
  this.clause = clause;
  this.enclosed = enclosed;
}

var [ PartialableSExprClause, PartialableParamItemClause ] = genClauses(
  or(
    'expression', ExprClause,
    'altNode', and(
      instanceOf( AltHeadNode ),
      C.shape( {
        required: {
          clause: _isPivot,
          enclosed: delayed( () => PartialableParamItemClause )
        }
      } ) )
  )
);

var synopsis = fclause( {
  args: cat( ExprClause, zeroOrOne( isInt ), zeroOrOne( maybe( isFn ) ) )
} ).instrument( function synopsis( clause, limit = 4, replacer ) {
  const sExpr = sExpression( clause );
  const cSExpr = conform( ParamItemClause, sExpr );
  const pivots = _findPivots( cSExpr, replacer );

  const expanded = pivots.reduce( ( cases, pivot ) => {
    const r = cases.reduce( ( acc, currCase ) => {
      if ( acc.length > limit ) {
        return acc;
      } else {
        const { cases } = _expand( currCase, pivot );
        return acc.concat( cases );
      }
    }, [] );
    return r;
  }, [ sExpr ] );
  const results = expanded.map( ( cc ) => _describeCase( cc, replacer ) );
  return results;
} );


function strFragments(
  headAltsHandler, cNode, replacer ) {
  const { head, params } = headAltsHandler( cNode );
  if ( !head ) {
    return [];
  }
  if ( replacer ) {
    let interceptR = replacer( head );
    if ( interceptR ) {
      return interceptR;
    }
  }
  if ( head.type === 'PRED' ) {
    return [ `${fnName( head.opts.predicate )}` ];
  }
  let label = humanReadable( head );
  if ( head.type === 'FCLAUSE' ) {
    label = 'fn';
  }
  let commaedParamFrags;

  if ( params ) {
    const { labelled, unlabelled, keyList } = params;
    if ( labelled ) {
      let paramFrags = labelled.reduce(
        ( acc, { label, item } ) =>
            acc.concat( [
              [ label,
                ', ',
                _fragmentParamAlts( headAltsHandler, item, replacer )
              ],
            ] ),
        []
     );
      commaedParamFrags = interpose( paramFrags, [ ', ', NEW_LINE ] )
    } else if ( unlabelled ) {
      let paramFrags = unlabelled.map( ( { item } ) =>
        _fragmentParamAlts( headAltsHandler, item, replacer ) );
      commaedParamFrags = interpose( paramFrags, [ ', ', NEW_LINE ] );
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
      [ INDENT_IN, NEW_LINE, ] : [ commaedParamFrags.length === 0 ? '' : ' ' ] )
    .concat( commaedParamFrags )
    .concat( commaedParamFrags.length > 1 ?
      [ INDENT_OUT, NEW_LINE, ] : [ commaedParamFrags.length === 0 ? '' : ' ' ] )
    .concat( [ ')' ] );
}

function _fragmentParamAlts( headAltsHandler, pAlts, replacer ) {
  const r = handle( pAlts, {
    'label': ( lbl ) => lbl,
    'sExpression': ( expr ) => strFragments( headAltsHandler, expr, replacer ),
    'quotedParamsMap': ( o ) => _fragmentParamsObj( headAltsHandler, o, replacer, true ),
    'unquotedParamsMap': ( o ) => _fragmentParamsObj( headAltsHandler, o, replacer, false ),
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

function _fragmentParamsObj( headAltsHandler, pObj, replacer, quote ) {
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
          _fragmentParamAlts( headAltsHandler, p, replacer )
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

function _describeCase( c, replacer ) {
  const cc = conform( PartialableSExprClause, c );
  if ( C.isProblem( cc ) ) {
    throw '!!';
  }
  const fragments = _strFragments( cc, replacer );
  const r = fragsToStr( fragments, 0, 0 );
  return r;
}

function _handler( alts ) {
  const { head: headAlts, params } = alts;
  return handle( headAlts, {
    'expression': ( e ) => ( { head: clauseFromAlts( e ), params } ),
    'altNode': ( { enclosed } ) =>
      handle( enclosed, {
        'sExpression': _handler,
      }, () => {} )
  }, () => {
    throw '3';
  } )
}

function _strFragments( cSExpr, replacer ) {
  return strFragments( _handler, cSExpr, replacer );
}

function _expand( currCase, pivot ) {
  if ( C.isValid( PartialableSExprClause, currCase ) ) {
    let [ head, ...params ] = currCase;
    if ( head === pivot ) {
      let altCases = _makeAlts( head, params );
      return { found: true, cases: altCases };
    } else {
      for ( let i = 0; i < params.length; i += 1 ) {
        let { found, cases } = _expand( params[ i ], pivot );
        if ( found ) {
          return {
            found,
            cases: cases.map( ( c ) => _makeAltCase( c, currCase, i ) )
          };
        }
      }
    }
  }

  if ( currCase[ 0 ] instanceof AltHeadNode ) {
    let [ { enclosed, label, clause } ] = currCase;
    for ( let i = 0; i < enclosed.length; i += 1 ) {
      let { found, cases } = _expand( enclosed[ i ], pivot );
      if ( found ) {
        return {
          found,
          cases: cases.map( ( c ) =>
            [ new AltHeadNode( label, clause, _makeAltCase( c, enclosed, i - 1 ) ) ] )
        };
      }
    }
  }

  if (
    currCase instanceof QuotedParamsMap ||
    currCase instanceof UnquotedParamsMap ) {
    for ( let key in currCase ) {
      if ( currCase.hasOwnProperty( key ) ) {
        let val = currCase[ key ];
        let { found, cases } = _expand( val, pivot );
        if ( found ) {
          return {
            found,
            cases: cases.map( ( c ) =>
              _makeAltCaseMap( c, currCase, key ) )
          };
        }
      }
    }
  }
  return { found: false, cases: [ currCase ] };

}

function _makeAlts( pivot, params ) {
  if ( pivot.opts.named ) {
    return pivot.exprs.map( ( { name, expr }, idx ) =>
      [ new AltHeadNode( name, pivot, params[ idx * 2 + 1 ] ) ] );
  } else {
    return pivot.exprs.map( ( e, idx ) =>
      [ new AltHeadNode( null, pivot, params[ idx ] ) ] );
  }
}


function _makeAltCase( item, sExpression, posInParam ) {
  return sExpression.slice( 0, posInParam + 1 )
    .concat( [ item ] )
    .concat( sExpression.slice( posInParam + 2 ) );
}

function _makeAltCaseMap( item, map, key ) {
  let r;
  if ( map instanceof QuotedParamsMap ) {
    r = new QuotedParamsMap();
  } else if ( map instanceof UnquotedParamsMap ) {
    r = new UnquotedParamsMap();
  }

  oAssign( r, map );
  r[ key ] = item;
  return r;
}

function _fold(
  reducer, { sExpression, quotedParamsMap, unquotedParamsMap },
  init,
  replacer ) {
  let r = init;

  if ( sExpression ) {
    let { head: headAlts, params: { labelled, unlabelled } = {} } = sExpression;
    const head = clauseFromAlts( headAlts );
    var replaced;
    if ( replacer ) {
      replaced = replacer( head );
      if ( replaced ) {
        return r;
      }
    }
    r = reducer( r, head );

    const items = labelled || unlabelled || [];
    r = items.reduce(
    ( acc, { item } ) => _fold( reducer, item, acc, replacer )
  , r );
  } else if ( quotedParamsMap || unquotedParamsMap ) {
    let m = quotedParamsMap || unquotedParamsMap;
    for ( let key in m ) {
      if ( m.hasOwnProperty( key ) ) {
        let { singleParam } = m[ key ];
        if ( singleParam ) {
          r = _fold( reducer, singleParam, r, replacer );
        }
      }
    }
  }
  return r;
}

// A "pivot" is an "or" clause
function _findPivots( cSExpr, replacer ) {
  return _fold( ( acc, item ) => {
    if ( _isPivot( item ) && acc.indexOf( item ) < 0 ) {
      return acc.concat( [ item ] );
    } else {
      return acc;
    }
  }, cSExpr, [], replacer );
}

function _isPivot( expr ) {
  return expr.type === 'OR';
}

export default synopsis;

// // //


// var SampleClause = cat(
//   'first', oneOrMore( cat( isStr, isBool ) ),
//   'second', or(
//     'objOpt', isObj,
//     'showNum', cat( isNum, or( isBool, isObj, isFinite ) )
//   ),
//   'third', shape( {
//     required: {
//       'qw': or( isNum, isObj )
//     }
//   } )
//   );

// var SampleFnClause = fclause( {
//   args: SampleClause
// } );

// import { TestClause } from '../core/regex';

// var r = synopsis( TestClause );
// console.log( r );
