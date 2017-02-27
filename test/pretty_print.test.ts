var C = require( '../src/' );
import { expect } from "chai";

import clausePrettyPrint from '../src/utils/clausePrettyPrint';

describe( 'pretty print', function() {
  it( 'should correctly output a clause tree', function() {
    var complexClause = C.or(
      C.cat( C.isBool, C.zeroOrMore( C.isNum ) ),
      C.cat( C.isNum, C.isNum, C.isStr, C.zeroOrMore( C.isObj ) ),
      C.or( C.isNum, C.cat( C.isNum, C.isBool, function isHello() {} ) ) );
    var out = clausePrettyPrint( complexClause );
    expect( out.match( /\n/g ).length ).to.be.greaterThan( 200 );
    expect( out ).to.include( 'isHello()' );
  } );
} );
