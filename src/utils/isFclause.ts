import isClause from "./isClause";

export default function isFclause( x ) {
  return isClause( x ) && x.type === 'FCLAUSE';
}
