export default function anyWalker( ) {
  return {
    trailblaze: walkThroughAny,
    reconstruct: walkThroughAny,
  }
}

function walkThroughAny( x ) {
  return x;
}

