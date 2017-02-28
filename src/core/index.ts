import regex from "./regex";
import { shape, keys, mapOf, cat, fclause } from './regex';
import nullable from "./nullable";
import undefinable from "./undefinable";
import maybe from "./maybe";
import wall from "./wall";
import equals from "../preds/equals";
import any from "./any";

export function cstr( str ) {
  return cat.apply( null, Array.prototype.slice.call( str ).map( equals ) );
};

var other = {
  any,
  fclause,
  wall, clause: wall,
  nullable, undefinable, maybe,
  cstr,
};

export * from "./regex";

export {
  any,
  fclause,
  wall, wall as clause,
  nullable, undefinable, maybe,
  shape, keys, mapOf,
  fclause as fspec,
};


var r = Object.assign( {},
  regex,
  {
    shape, keys, mapOf,
    fspec: fclause
  },
  other );

export default r;