import isProblem from "./isProblem";
// TODO : replace with checkProblem
import conform from "./conform";

export default function enforce( clause, x ) {
  const r = conform( clause, x );
  if ( isProblem( r ) ) {
    throw r;
  }
  return undefined;
};
