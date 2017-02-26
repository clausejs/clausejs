import Clause from "./Clause";

export default class ClauseRef extends Clause {
  constructor( { ref, getFn, conformFn } ) {
    super({
      type: "CLAUSE_REF",
      exprs: [],
      opts: {},
      conformFn,
      generateFn: null,
    });
    this.type = "CLAUSE_REF";
    this.get = getFn;
    this.conform = conformFn;
    this.ref = ref;
  };
  get: Function;
  ref: any;
}
