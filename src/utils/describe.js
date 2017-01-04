var getFragments = require( './fragmenter' );
var isPred = require( '../utils/isPred' );
var isClause = require( '../utils/isClause' );
var isStr = require( '../preds/isStr' );
var fnName = require( '../utils/fnName' );
var repeat = require( '../utils/repeat' );

function describe( expr, interceptor, indent ) {
  const repo = [];

  return _strFragments( repo, expr, interceptor, indent, 1 ).join( '' );
}

function _strFragments( repo, expr, interceptor, indent, lvl ) {
  let interceptR;
  if ( interceptor && ( interceptR = interceptor( expr ) ) ) {
    return interceptR;
  } else if ( _exists( repo, expr ) ) {
    return [ `(recursive: ${_clauseToHuman( expr )})` ];
  } else if ( isPred( expr ) ) {
    _addToRepo( repo, expr );
    return [ fnName( expr ) ];
  } else if ( expr.type === 'PRED' ) {
    return _strFragments( repo, expr.opts.predicate, interceptor, indent, lvl + 1 );
  } else if ( isClause( expr ) ) {
    if ( expr.type === 'DELAYED' || expr.type === 'CLAUSE_REF' ) {
      let realExpr = expr.get();
      return _strFragments( repo, realExpr, interceptor, indent, lvl + 1 );
    } else {
      _addToRepo( repo, expr );
      var inners = _processInner( repo, expr, interceptor, indent, lvl );
      var moreThanOneItem = _moreThanOneItem( inners );
      return [ _clauseToHuman( expr ), '(', ]
        .concat( moreThanOneItem && indent ? [ '\n', repeat( lvl * indent, ' ' ).join( '' ) ] : [ ] )
        .concat( inners.length > 0 ? [ ' ' ] : [] )
        .concat(
          inners.map( ( [ currLvl, f ] ) => {
            if ( f === getFragments.SEPARATOR ) {
              if ( moreThanOneItem && indent ) {
                return [ '\n' ].concat( repeat( currLvl * indent, ' ' ) ).join( '' );
              } else {
                return '';
              }
            } else {
              return f;
            }
          } )
         )
        .concat( inners.length > 0 ? [ ' ' ] : [] )
        .concat( moreThanOneItem && indent ? [ '\n', repeat( ( lvl - 1 ) * indent, ' ' ).join( '' ) ] : [ ] )
        .concat( [ ')' ] );
    }
  } else {
    console.error( expr );
    throw new Error( 'Argument must be an expression' );
  }
}

function _moreThanOneItem( frags ) {
  return frags.filter( ( [ , f ] ) => f === getFragments.SEPARATOR ).length > 0;
}

const dict = {
  Z_OR_M: 'zeroOrMore',
  O_OR_M: 'oneOrMore',
  Z_OR_O: 'zeroOrOne',
  COLL_OF: 'collOf',
};

function _clauseToHuman( expr ) {
  if ( expr.type ) {
    if ( dict[ expr.type ] ) {
      return dict[ expr.type ];
    } else {
      return expr.type.toLowerCase();
    }
  } else {
    return expr.toString();
  }
}

function _processInner( repo, clause, interceptor, indent, level ) {
  var fragments = getFragments( clause );
  return fragments.reduce(
    ( { acc, lvl }, piece ) => {
      if ( isStr( piece ) ) {
        return { acc: acc.concat( [ [ lvl, piece ] ] ), lvl };
      } else if ( piece.isLevelIn ) {
        return {
          acc: acc,
          lvl: lvl + piece.level,
        }
      } else if ( piece.isLevelOut ) {
        return {
          acc: acc,
          lvl: lvl - piece.level,
        }
      } else {
        return {
          acc: acc.concat( _strFragments( repo, piece, interceptor, indent, lvl + 1 ).map( ( f ) => [ lvl + 1, f ] ) ),
          lvl
        }
      }
    }, { acc: [], lvl: level }
    ).acc;

}

function _addToRepo( repo, expr ) {
  if ( !_exists( repo, expr ) ) {
    repo.push( expr );
  }
}

function _exists( repo, piece ) {
  return repo.indexOf( piece ) >= 0;
}

module.exports = describe;
