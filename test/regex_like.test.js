var expect = require( 'chai' ).expect;
var gen = require( 'mocha-testcheck' ).gen;
var check = require( 'mocha-testcheck' ).check;

var C = require( '../src/' );
var cat = C.cat;
var oneOrMore = C.oneOrMore;
var repeat = require( '../src/utils/repeat' );

function isInteger( value ) {
  return typeof value === 'number' &&
    isFinite( value ) &&
    Math.floor( value ) === value;
}

describe( 'nfa regex', function() {
  this.slow( 90000 ); //generative tests take more time
  this.timeout( 10000 ); //generative tests take more time

  describe( 'zeroOrMore', function() {
    check.it( 'accepts zero or more int\'s',
      { times: 20 },
      [ gen.array( gen.int ) ], function( ints ) {
        var ZeroOrMoreIntegers = C.zeroOrMore( isInteger );
        expect( C.isValid( ZeroOrMoreIntegers, ints ) ).to.be.true;
        expect( C.isValid( ZeroOrMoreIntegers, [] ) ).to.be.true;
      } );

    check.it( 'rejects mixtures',
      { times: 20 },
      [ gen.array( gen.int ), gen.notEmpty( gen.array( gen.string ) ) ],
      function( ints, strs ) {
        var ZeroOrMoreIntegers = C.zeroOrMore( isInteger );
        expect( C.isValid( ZeroOrMoreIntegers, ints.concat( strs ) ) ).to.be.false;
        expect( C.isValid( ZeroOrMoreIntegers, strs ) ).to.be.false;
      } );

    check.it( 'more complex expressions',
      { times: 20 },
      [ gen.int, gen.string, gen.strictPosInt ],
      function( a, b, n ) {
        //imitates regex a(bb+)a

        var expr = cat( C.isNum, oneOrMore( cat( C.isStr, C.isStr ) ), C.isNum );
        var val = [ a ].concat( repeat( n * 2, b ) ).concat( [ a ] );
        expect( C.isValid( expr, val ) ).to.be.true;

      } );

    check.it( 'strings',
    { times: 20 },
    [ gen.strictPosInt, gen.strictPosInt ],
    ( m, n ) => {
      var expr = cat( oneOrMore( C.equals( 'a' ) ), C.equals( 'b' ), oneOrMore( C.equals( 'c' ) ) );
      var val = `${repeat( m, 'a' ).join( '' )}b${repeat( n, 'c' ).join( '' )}`;
      expect( C.isValid( expr, val ) ).to.be.true;
    } );

    it( 'use in conjunction with cat', function() {
      var ZeroOrMoreStrings = C[ '*' ]( C.isStr );
      var ZeroOrMoreIntegers = C[ '*' ]( isInteger );
      var oneOrMoreIntegers = C[ '+' ]( isInteger );
      var expr = C.cat(
        ZeroOrMoreStrings,
        ZeroOrMoreIntegers,
        ZeroOrMoreStrings,
        C.isBool,
        oneOrMoreIntegers,
        oneOrMoreIntegers,
        ZeroOrMoreStrings );
      var validData = [ 'a', 'b', 1, 2, 3, true, 2, 3, 4 ];
      var invalidData = [ 2, 3, 4, 5 ];
      expect( C.isValid( expr, validData ) ).to.be.true;
      expect( C.isValid( expr, invalidData ) ).to.be.false;
    } );

    it( 'string vocab', () => {

      var VocabClause = C.or.apply( null, [ 'foo', 'bar', 'baz', ' ' ].map( C.sCat ) );
      var ContentClause = C.zeroOrMore( VocabClause );

      var treatise = ' baz foo bar bar';
      expect( ContentClause.conform( treatise ) ).to.equal( treatise );
      expect( ContentClause.conform( treatise + 'mangled' ) ).to.be.an.instanceof( C.Problem );
    } );

    it( 'treatise dissection', () => {

      var treatise = `
        Abstract
        -----------
        I am awesome.

        My Points
        -----------
        - I make pie
        - I eat pie

        Conclusion
        -----------
        I am truely awesome.
      `;
      var TreatiseClause = C.cat(
        'spacing', C.zeroOrMore( C.isStr ),
        'intro', C.cat( catS( 'Abstract' ), C.oneOrMore( C.isStr ) ),
        'body', C.cat( catS( 'My Points' ), C.oneOrMore( C.isStr ) ),
        'ending', C.cat( catS( 'Conclusion' ), C.oneOrMore( C.isStr ) )
      );

      expect( TreatiseClause.conform( treatise ).body ).to.contain( 'eat pie' );
    } );
  } );

  describe( 'nested regex/wall()', () => {
    it( 'wall()', () => {
      var flat = [ 'a', 1, true, 'b', 2, false, 'c', 3, true ];
      var nested = [ [ 'a', 1, true ], [ 'b', 2, false ], [ 'c', 3, true ] ];
      var moreNested = [ [ [ 'a', 1, true ] ], [ [ 'b', 2, false ] ], [ [ 'c', 3, true ] ] ];

      var FlatClause = C.oneOrMore( C.cat( C.isStr, C.isNum, C.isBool ) );
      var NestedClause = C.oneOrMore( C.wall( C.cat( C.isStr, C.isNum, C.isBool ) ) );
      var NestedNestedClause = C.oneOrMore( C.wall( C.cat( C.wall( C.cat( C.isStr, C.isNum, C.isBool ) ) ) ) );

      [ flat, nested, moreNested ].forEach( ( d, i ) => {
        [ FlatClause, NestedClause, NestedNestedClause ].forEach( ( clause, j ) => {
          let r = C.isValid( clause, d );
          if ( i === j ) {
            expect( r ).to.be.true;
          } else {
            expect( r ).to.be.false;
          }
        } )
      } );
    } );
  } );

  describe( 'edge cases', () => {
    it( 'cat single char string', () => {
      var data = 'a';

      var SingleCatClause = C.cat( C.isStr );

      expect( SingleCatClause.conform( data ) ).to.equal( data );
    } );

    it( 'kleene closure on strings', () => {
      var data = 'abcdefg';

      var KleeneStringClause = C.zeroOrMore( C.isString );

      expect( KleeneStringClause.conform( data ) ).to.equal( data );
    } );
  } );
} );
