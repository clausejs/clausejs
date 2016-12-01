var S = require( '../src/' );
var expect = require( 'chai' ).expect;

describe( 'module integrity', function() {
  var fnList = [ 'props', 'isValid', 'conform', 'fspec', 'isObj', 'isFn' ];

  it( 'should contain all the core functions', function() {
    var SpecObj = S.keys( { req: fnList } );
    var InsaneSpecObj = S.keys( { req: fnList.concat( [ 'voodooooooooo' ] ) } );
    // expect(S.isValid(SpecObj, S)).to.be.true;
    expect( S.isValid( InsaneSpecObj, S ) ).to.be.false;
  } );
} );
