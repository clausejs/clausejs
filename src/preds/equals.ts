export default function equals( test ) {
  return function equalsVal( x ) {
    return x === test;
  }
};
