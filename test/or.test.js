var C = require( '../src/' );
var expect = require( 'chai' ).expect;
var Problem = C.Problem;
var Clause = require( '../src/models/Clause' );
var identity = C.identity;

describe( 'or', function() {
  it( 'should accept one or more conditions', function() {
    var NumOrStr = C.or( C.isNum, C.isStr, C.isBool );
    expect( C.isValid( NumOrStr, 'hello' ) ).to.be.true;
    expect( C.isValid( NumOrStr, 33 ) ).to.be.true;
    expect( C.isValid( NumOrStr, new Object() ) ).to.be.false;
  } );

  it( 'undefined case', function() {
    var ObjOrUndefined = C.or( C.isNum, C.isUndefined );
    expect( C.isValid( ObjOrUndefined, undefined ) ).to.be.true;
  } );

  it( 'combined with cat and zeroOrMore', function() {
    var Clause = C.or( C.cat( C.isNatInt, C.isStr ), C.cat( C.isStr, C.isNatInt ), C.isNatInt );
    expect( Clause.conform( '' ) ).to.be.an.instanceOf( Problem );
    expect( Clause.conform( 1 ) ).not.to.be.an.instanceOf( Problem );
    expect( Clause.conform( [ 1, '2' ] ) ).not.to.be.an.instanceOf( Problem );
    expect( Clause.conform( [ '1', 2 ] ) ).not.to.be.an.instanceOf( Problem );
  } );
} );
