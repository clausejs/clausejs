 // TODO
import stringifyWithFnName from "./stringifyWithFnName";

export default function clausePrettyPrint( clause ) {
  if ( !clause ) {
    return "";
  }
  return stringifyWithFnName( clause, null, 2 );
}
