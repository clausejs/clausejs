import Clause from "../models/Clause";
import identity from "../utils/identity";

const CLAUSE_TYPE_ANY = 'ANY';

export default function any() {
  return new Clause( {
    type: CLAUSE_TYPE_ANY,
    exprs: [],
    opts: {},
    conformFn: identity,
    generateFn: null,
  } );
}
