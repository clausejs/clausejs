export default function isString( x ) {
  return x !== null && x !== undefined && x.constructor === String
}