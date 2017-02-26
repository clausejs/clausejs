import isInt from "./isInt";

export default function isNatInt( x ) {
  return isInt( x ) && x >= 0.0;
}

