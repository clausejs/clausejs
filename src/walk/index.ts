import anyWalker from "./anyWalker";
import predWalker from "./predWalker";
import wallWalker from "./wallWalker";
import fclauseWalker from "./fclauseWalker";
import shapeWalker from "./shapeWalker";
import andWalker from "./andWalker";
import collOfWalker from "./collOfWalker";
import mapOfWalker from  './mapOfWalker';
import clauseRefWalker from './clauseRefWalker';
import delayedClauseWalker from './delayedClauseWalker';
import nfaWalker from "./nfaWalker";

import coerceIntoClause from '../utils/coerceIntoClause';
import isProblem from '../utils/isProblem';

export default function walk( clause, x, opts ) {
  var { phase } = opts;
  var walker = _getWalker( clause );
  if ( !phase ) {
    // 2-pass algorithm:

    // in Pass 1 we just need to know if x validates to clause, and if so, how
    var intermediate = walker.trailblaze( x, Object.assign( { phase: 'trailblaze' }, opts ) );

    if ( isProblem( intermediate ) ) {
      return intermediate;
    } else {
      // in Pass 2 we return conformed and/or instrumented results
      return walker.reconstruct( intermediate, Object.assign( { phase: 'reconstruct' }, opts ) );
    }
  } else if ( walker[ phase ] ) {
    return walker[ phase ]( x, opts );
  } else {
    throw '!';
  }
}

const walkerMap = {
  'OR': nfaWalker,
  'CAT': nfaWalker,
  'COLL_OF': collOfWalker,
  'ANY': anyWalker,
  'Z_OR_M': nfaWalker,
  'O_OR_M': nfaWalker,
  'Z_OR_O': nfaWalker,
  'PRED': predWalker,
  'WALL': wallWalker,
  'SHAPE': shapeWalker,
  'AND': andWalker,
  'CLAUSE_REF': clauseRefWalker,
  'DELAYED': delayedClauseWalker,
  'FCLAUSE': fclauseWalker,
  'MAP_OF': mapOfWalker,
}

function _getWalker( expr ) {

  var clause = coerceIntoClause( expr );
  var walker = walkerMap[ clause.type ];

  if ( !walker ) {
    throw 'unsupported type ' + clause.type;
  }

  var r = walker( clause, walk );
  return r;
}