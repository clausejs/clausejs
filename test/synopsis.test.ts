import C from "../src";
import { expect } from "chai";
import { cat, or, zeroOrMore, oneOrMore, isStr, isNum, isObj, isBool, conform } from "../src";

describe.skip( 'synopsis', () => {
  it( 'simple case', () => {
    var SampleClause = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( isObj, cat( isNum, isBool ) ) );

  } );
} );
