import Problem from '../models/Problem';

export default function isProblem( x ) {
  return x instanceof Problem;
}
