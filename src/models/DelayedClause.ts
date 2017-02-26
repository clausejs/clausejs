import Clause from "./Clause";

export default class DelayedClause extends Clause {
  constructor({ getFn }) {
    super({
      type: "DELAYED",
      conformFn: function (x) {
        const Clause = this.get();
        return Clause.conform(x);
      },
      // TODO: exprs is superfluous. Fix inheritance hierarchy.
      exprs: [],
      opts: {},
      generateFn: null,
    });
    this.get = getFn;
  }
  get: () => Clause
}
