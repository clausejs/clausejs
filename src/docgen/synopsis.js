const { cat, or, shape, zeroOrOne, maybe, oneOrMore, fclause, any, and, wall, ExprClause, collOf } = require( '../core' );
const { isStr, isNum, isInt, isObj, isBool, instanceOf } = require( '../preds' );
const { conform, isClause, deref, delayed } = require( '../utils' );
const C = require( '../' );
const oAssign = require( '../utils/objectAssign' );
const clauseFromAlts = require( '../utils/clauseFromAlts' );
const fnName = require( '../utils/fnName' );
import sExpression, { genClauses, ParamItemClause,
 UnquotedParamsMap, QuotedParamsMap } from '../utils/sExpression';
import { strFragments, fragsToStr } from '../utils/describe';
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
  args: cat( ExprClause, zeroOrOne( isInt ) )
} ).instrument( function synopsis( clause ) {
  const sExpr = sExpression( clause );
  const cSExpr = conform( ParamItemClause, sExpr );
  const pivots = _findPivots( cSExpr );
  const expanded = pivots.reduce( ( cases, pivot ) => {
    const r = cases.reduce( ( acc, currCase ) => {
      const { cases } = _expand( currCase, pivot );
      return acc.concat( cases );
    }, [] );
    return r;
  }, [ sExpr ] );
  const results = expanded.map( _describeCase );
  return results;
} );

function _describeCase( c ) {
  const cc = conform( PartialableSExprClause, c );
  if ( C.isProblem( cc ) ) {
    debugger;
    throw '!!';
  }
  const fragments = _strFragments( cc );
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
  reducer, { sExpression, quotedParamsMap, unquotedParamsMap }, init ) {
  let r = init;

  if ( sExpression ) {
    let { head: headAlts, params: { labelled, unlabelled } = {} } = sExpression;
    const head = clauseFromAlts( headAlts );

    r = reducer( r, head );

    const items = labelled || unlabelled || [];
    r = items.reduce(
    ( acc, { item } ) => _fold( reducer, item, acc )
  , r );
  } else if ( quotedParamsMap || unquotedParamsMap ) {
    let m = quotedParamsMap || unquotedParamsMap;
    for ( let key in m ) {
      if ( m.hasOwnProperty( key ) ) {
        let { singleParam } = m[ key ];
        if ( singleParam ) {
          r = _fold( reducer, singleParam, r );
        }
      }
    }
  }
  return r;
}

// A "pivot" is an "or" clause
function _findPivots( cSExpr ) {
  return _fold( ( acc, item ) => {
    if ( _isPivot( item ) ) {
      return acc.concat( [ item ] );
    } else {
      return acc;
    }
  }, cSExpr, [] );
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

// var r = synopsis( SampleFnClause );
// console.log( r );
