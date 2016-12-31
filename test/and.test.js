var C = require( '../src/' );
var expect = require( 'chai' ).expect;

describe( 'and', () => {
  it( 'simple case', () => {
    var UsernameClause = C.and( C.isStr, ( n ) => n.length < 5 );
    var conformed1 = UsernameClause.conform( 'he' );
    expect( conformed1 ).to.equal( 'he' );
  } );

  it( 'propagate conformation', () => {
    var PropagatedAndClause = C.and(
      C.isArray,
      C.cat(
        'firstPart', C.oneOrMore( C.isNum ),
        'secondPart', C.isBool,
        'thirdPart', C.oneOrMore( C.isNum ) ),
      function firstThirdPartEqualLen( cargs ) {
        const { firstPart, thirdPart } = cargs;
        return firstPart.length === thirdPart.length;
      }
    );

    var conformed1 = [ 1, 2, 3, 4, true, 5, 6, 7, 8 ];
    var unconformed = conformed1.concat( [ 4 ] );
    expect( PropagatedAndClause.conform( conformed1 ).firstPart ).to.deep.equal( [ 1, 2, 3, 4 ] );
    expect( PropagatedAndClause.conform( unconformed ) ).to.be.instanceOf( C.Problem );

  } );
} );
