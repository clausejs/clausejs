var expect = require( 'chai' ).expect;

var C = require( '../src/' );
var specPrettyPrint = require( '../src/utils/specPrettyPrint' );

describe( 'pretty print', function() {
  it( 'should correctly output a spec tree', function() {
    var complexSpec = C.or(
      C.cat( C.isBool, C.zeroOrMore( C.isNum ) ),
      C.cat( C.isNum, C.isNum, C.isStr, C.zeroOrMore( C.isObj ) ),
      C.or( C.isNum, C.cat( C.isNum, C.isBool, function isHello() {} ) ) );
    var out = specPrettyPrint( complexSpec );
    expect( out.match( /\n/g ).length ).to.be.greaterThan( 200 );
    expect( out ).to.include( 'isHello()' );
  } );
} );
