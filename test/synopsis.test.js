var S = require( '../src' );
const { cat, or, zeroOrMore, oneOrMore, isStr, isNum, isObj, isBool, conform } = S;

describe.skip( 'synopsis', () => {
  it( 'simple case', () => {
    var SampleSpec = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( isObj, cat( isNum, isBool ) ) );


  } );
} );
