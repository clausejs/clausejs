var expect = require( 'chai' ).expect;
var gen = require( 'mocha-testcheck' ).gen;
var check = require( 'mocha-testcheck' ).check;

var S = require( '../src/' );
var cat = S.cat;
var oneOrMore = S.oneOrMore;
var repeat = require( '../src/utils/repeat' );
var catS = function( str ) {
  return S.cat.apply( null, Array.from( str ).map( S.equals ) );
};

describe( 'nfa regex', function() {
  this.slow( 90000 ); //generative tests take more time
  this.timeout( 10000 ); //generative tests take more time

  describe( 'zeroOrMore', function() {
    check.it( 'accepts zero or more int\'s',
      { times: 20 },
      [ gen.array( gen.int ) ], function( ints ) {
        var ZeroOrMoreIntegers = S.zeroOrMore( Number.isInteger );
        expect( S.isValid( ZeroOrMoreIntegers, ints ) ).to.be.true;
        expect( S.isValid( ZeroOrMoreIntegers, [] ) ).to.be.true;
      } );

    check.it( 'rejects mixtures',
      { times: 20 },
      [ gen.array( gen.int ), gen.notEmpty( gen.array( gen.string ) ) ],
      function( ints, strs ) {
        var ZeroOrMoreIntegers = S.zeroOrMore( Number.isInteger );
        expect( S.isValid( ZeroOrMoreIntegers, ints.concat( strs ) ) ).to.be.false;
        expect( S.isValid( ZeroOrMoreIntegers, strs ) ).to.be.false;
      } );

    check.it( 'more complex expressions',
      { times: 20 },
      [ gen.int, gen.string, gen.strictPosInt ],
      function( a, b, n ) {
        //imitates regex a(bb+)a

        var expr = cat( S.isNum, oneOrMore( cat( S.isStr, S.isStr ) ), S.isNum );
        var val = [ a ].concat( repeat( n * 2, b ) ).concat( [ a ] );
        expect( S.isValid( expr, val ) ).to.be.true;

      } );

    check.it( 'strings',
    { times: 20 },
    [ gen.strictPosInt, gen.strictPosInt ],
    ( m, n ) => {
      var expr = cat( oneOrMore( S.equals( 'a' ) ), S.equals( 'b' ), oneOrMore( S.equals( 'c' ) ) );
      var val = `${repeat( m, 'a' ).join( '' )}b${repeat( n, 'c' ).join( '' )}`;
      expect( S.isValid( expr, val ) ).to.be.true;
    } );

    it( 'use in conjunction with cat', function() {
      var ZeroOrMoreStrings = S[ '*' ]( S.isStr );
      var ZeroOrMoreIntegers = S[ '*' ]( Number.isInteger );
      var oneOrMoreIntegers = S[ '+' ]( Number.isInteger );
      var expr = S.cat(
        ZeroOrMoreStrings,
        ZeroOrMoreIntegers,
        ZeroOrMoreStrings,
        S.isBool,
        oneOrMoreIntegers,
        oneOrMoreIntegers,
        ZeroOrMoreStrings );
      var validData = [ 'a', 'b', 1, 2, 3, true, 2, 3, 4 ];
      var invalidData = [ 2, 3, 4, 5 ];
      expect( S.isValid( expr, validData ) ).to.be.true;
      expect( S.isValid( expr, invalidData ) ).to.be.false;
    } );

    it( 'string vocab', () => {

      var VocabSpec = S.or.apply( null, [ 'foo', 'bar', 'baz', ' ' ].map( catS ) );
      var ContentSpec = S.zeroOrMore( VocabSpec );

      var treatise = ' baz foo bar bar';
      expect( ContentSpec.conform( treatise ) ).to.equal( treatise );
      expect( ContentSpec.conform( treatise + 'mangled' ) ).to.be.an.instanceof( S.Problem );
    } );

    it.skip( 'treatise dissection', () => {

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
      var TreatiseSpec = S.cat(
        'spacing', S.zeroOrMore( S.isStr ),
        'intro', S.cat( catS( 'Abstract' ), S.oneOrMore( S.isStr ) ),
        'body', S.cat( catS( 'My Points' ), S.oneOrMore( S.isStr ) ),
        'ending', S.cat( catS( 'Conclusion' ), S.oneOrMore( S.isStr ) )
      );
      console.log( TreatiseSpec.conform( treatise ) )

      expect( TreatiseSpec.conform( treatise ).body ).to.contain( 'eat pie' );
    } );
  } );

  describe( 'nested regex/wall()', () => {
    it( 'wall()', () => {
      var flat = [ 'a', 1, true, 'b', 2, false, 'c', 3, true ];
      var nested = [ [ 'a', 1, true ], [ 'b', 2, false ], [ 'c', 3, true ] ];
      var moreNested = [ [ [ 'a', 1, true ] ], [ [ 'b', 2, false ] ], [ [ 'c', 3, true ] ] ];

      var FlatSpec = S.oneOrMore( S.cat( S.isStr, S.isNum, S.isBool ) );
      var NestedSpec = S.oneOrMore( S.wall( S.cat( S.isStr, S.isNum, S.isBool ) ) );
      var NestedNestedSpec = S.oneOrMore( S.wall( S.cat( S.wall( S.cat( S.isStr, S.isNum, S.isBool ) ) ) ) );

      [ flat, nested, moreNested ].forEach( ( d, i ) => {
        [ FlatSpec, NestedSpec, NestedNestedSpec ].forEach( ( spec, j ) => {
          let r = S.isValid( spec, d );
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

      var SingleCatSpec = S.cat( S.isStr );

      expect( SingleCatSpec.conform( data ) ).to.equal( data );
    } );

    it( 'kleene closure on strings', () => {
      var data = 'abcdefg';

      var KleeneStringSpec = S.zeroOrMore( S.isString );

      expect( KleeneStringSpec.conform( data ) ).to.equal( data );
    } );
  } );
} );
