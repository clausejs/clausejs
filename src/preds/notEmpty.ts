export default function notEmpty( x: String | Array<any> ) {
  if ( !x ) {
    return false;
  } else if ( x.length === 0 ) {
    return false;
  } else {
    return true;
  }
}