var C = require( '../src' );
const { cat, or, zeroOrMore, oneOrMore, isStr, isNum, isObj, isBool, conform } = C;

describe.skip( 'synopsis', () => {
  it( 'simple case', () => {
    var SampleClause = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( isObj, cat( isNum, isBool ) ) );

  } );
} );
