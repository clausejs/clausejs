import VERSION from "../package_version";
import Problem from "./models/Problem";
import Clause from "./models/Clause";

import namespaceFn, { resolve } from "./namespace";

import * as ops from "./core";
export * from "./core";
import * as utils from "./utils";
export * from "./utils";
import * as predicates from "./preds";
export * from "./preds";

const models = {
  Problem, Clause
};

const r = Object.assign( namespaceFn,
  { resolve },
  ops, utils, models, predicates );

r.VERSION  = VERSION;

export default r;

export {VERSION, Problem, Clause, resolve};
