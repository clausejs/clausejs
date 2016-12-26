function anyWalker( ) {
  return {
    trailblaze: walkThroughAny,
    reconstruct: walkThroughAny,
  }
}

function walkThroughAny( x ) {
  return x;
}

module.exports = anyWalker;
