import isProblem from "./isProblem";
import isPred from "./isPred";
import isClause from "./isClause";
import conform from "./conform";

export default function isValid( expr, x ) {
  if ( !expr ) {
    throw new Error( 'Clause is required' );
  } else if ( isClause( expr ) ) {
    return !( isProblem( conform( expr, x ) ) );
  } else if ( isPred( expr ) ) {
    return expr( x );
  } else {
    return true;
  }
}