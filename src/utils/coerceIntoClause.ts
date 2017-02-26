import isPred from "./isPred";
import isClause from "./isClause";
import isClauseRef from "./isClauseRef";
import isDelayedClause from "./isDelayedClause";
import Clause from "../models/Clause";
import Problem from "../models/Problem";
import fnName from "./fnName";
import stringifyWithFnName from "./stringifyWithFnName";

const CLAUSE_TYPE_PRED = "PRED";

export default function coerceIntoClause( expr ) {
  if ( isClause( expr ) || isClauseRef( expr ) || isDelayedClause( expr ) ) {
    return expr;
  } else if ( isPred( expr ) ) {
    return _wrap( expr );
  } else {
    console.error( expr );
    throw new Error(
      `'Expression must either be a Clause object or a predication function that returns true or false. Given value: ${stringifyWithFnName( expr )}'` );
  }
}

function _wrap( pred ) {
  return new Clause( {
    type: CLAUSE_TYPE_PRED,
    exprs: [ pred ],
    opts: {
      predicate: pred,
    },
    conformFn: predConformer( pred ),
    generateFn: null,
  } );
}

function predConformer( pred ) {
  return function conformPred( x ) {
    if ( pred( x ) ) {
      return x;
    } else {
      return new Problem(
        x,
        pred,
        [],
        `Predicate ${fnName( pred )} returns false`
      );
    }
  }
}