import Clause from "../models/Clause";
import coerceIntoClause from "../utils/coerceIntoClause";
import { cat, ExprClause } from "./regex";
import fclause from './fclause';
import walk from '../walk';

export const WallFnClause = fclause( {
  args: cat( ExprClause ),
  ret: ExprClause,
} );

function wallOp( expr ) {
  var clause = coerceIntoClause( expr );
  var wallS = new Clause( {
    type: 'WALL',
    exprs: [ clause ],
    opts: { enclosedClause: clause },
    conformFn: null,
    generateFn: null
  } );
  wallS.conform = function andConform( x ) {
    return walk( wallS, x, { conform: true } );
  }
  return wallS;
}

const wall = WallFnClause.instrument( wallOp );
export default wall;
