function betterThrow( problem ) {
  // console.log( '----------------------' );
  // console.error( problem.message, problem );
  // console.log( '----------------------' );
  throw problem;
}

module.exports = betterThrow;
