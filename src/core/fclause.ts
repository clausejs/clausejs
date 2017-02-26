import Clause from "../models/Clause";
import walk from "../walk";
import fnName from "../utils/fnName";

class FClause extends Clause{
  constructor(fnClause) {
    const { args, ret, fn } = fnClause;
    super( {
      type: 'FCLAUSE',
      exprs: [],
      opts: fnClause,
      conformFn: null,
      generateFn: null
    } );
    this.instrumentConformed = function instrumentConformed( fn ) {
      return walk( this, fn, { conform: true, instrument: true } );
    };
    this.instrument = function instrument( fn ) {
      return walk( this, fn, { conform: false, instrument: true } );
    };
  };
  instrumentConformed: Function;
  instrument: Function;
}

export default function fclause( fnClause ) {
  return new FClause(fnClause);
}