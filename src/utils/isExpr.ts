import isPred from './isPred';
import isClause from './isClause';
import isClauseRef from './isClauseRef';
import isDelayedClause from './isDelayedClause';

export default function isExpr( x ) {
  return isPred( x ) ||
    isClause( x ) ||
    isClauseRef( x ) ||
    isDelayedClause( x );
}