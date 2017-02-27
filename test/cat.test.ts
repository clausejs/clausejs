import {expect} from "chai";

var C = require( '../src/' );
var Problem = C.Problem;

describe( 'cat', () => {
  var fn = function() {};
  var conformist = [ fn, {}, fn, { a: 1 } ];
  var nonconformist = [ {}, fn, {}, fn ];
  var extendedCase = conformist.concat( [ { extra: 'elements' }, 2 ] );
  var emptyCase = [];
  var lesserCase = conformist.slice( 0, -1 );
  var NamedClause,
    UnnamedClause,
    NamedCommentedClause;

  function init() {
    NamedClause = C.cat( 'z', C.isFn, 'b', C.isObj, 'c', C.isFn, 'a', C.isObj );
    NamedCommentedClause = C.cat( 'z', 'very zeeee', C.isFn, 'b', C.isObj, 'c', 'c for da win, man', C.isFn, 'a', C.isObj );
    UnnamedClause = C.cat( C.isFn, C.isObj, C.isFn, C.isObj );
  }

  describe( 'conform', () => {

    beforeEach( init );

    it( 'empty case', () => {
      var EmptyClause = C.cat();
      var conformed = EmptyClause.conform( [] );
      var unconformed = EmptyClause.conform( [ 1 ] );
      expect( conformed ).to.deep.equal( [] );
      expect( unconformed instanceof Problem ).to.be.true;
    } );

    it( 'single val case', () => {
      var ss = C.cat( C.isInt );
      var r = ss.conform( [ 44 ] );
      expect( r ).to.deep.equal( [ 44 ] );
    } );

    it( 'nested case', () => {
      var ss = C.cat( C.cat( C.cat( C.isInt, C.isBool ), C.cat( C.isInt, C.cat( C.isBool ) ) ) );
      var data = [ 22, true, 23, false ];
      var r = ss.conform( data );

      expect( r ).to.deep.equal( data );
    } );

    it( 'labelled', () => {
      var NamedCommentedClause = C.cat( 'z', 'it\'s a fuuuunction', C.isFn, 'b', C.isObj, 'c', 'another fuuuunction', C.isFn, 'a', C.isObj );

      var conformed = NamedCommentedClause.conform( conformist );
      expect( conformed ).to.deep.equal( { z: fn, b: {}, c: fn, a: { a: 1 } } );
      var nonconformed = NamedCommentedClause.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );

    it( 'no dupe labels', () => {
      let createDupe = () => C.cat( 'z', 'it\'s a fuuuunction', C.isFn, 'b', C.isObj, 'z', 'another fuuuunction', C.isFn, 'a', C.isObj );
      expect( createDupe ).to.throw( Error );
    } );

    it( 'labelled, grouped', () => {
      var NamedGroupedClause = C.cat(
         'z', 'it\'s a fuuuunction', C.isFn,
         'b', C.isObj,
         'c', 'another fuuuunction', C.isFn,
         'a', C.isObj
      );

      var conformed = NamedGroupedClause.conform( conformist );
      expect( conformed ).not.to.be.an.instanceOf( Problem );
      expect( conformed ).to.deep.equal( { z: fn, b: {}, c: fn, a: { a: 1 } } );
      var nonconformed = NamedGroupedClause.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );

    it( 'named with some comments', () => {
      var conformed = NamedCommentedClause.conform( conformist );
      expect( conformed ).to.deep.equal( { z: fn, b: {}, c: fn, a: { a: 1 } } );
      var nonconformed = NamedCommentedClause.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
      expect( NamedCommentedClause.exprs[ 0 ].comment ).to.contain( 'zee' );
      expect( NamedCommentedClause.exprs[ 2 ].comment ).to.contain( 'man' );
    } );

    it( 'without labels', () => {
      var conformed = UnnamedClause.conform( conformist );
      expect( conformed ).to.deep.equal( conformist );
      var nonconformed = UnnamedClause.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );
  } );

  describe( 'validity', () => {

    beforeEach( init );

    [ [ () => NamedClause, 'labelled' ], [ () => UnnamedClause, 'without labels' ] ].forEach(
       ( [ getClause, name ] ) => {

         it( name, () => {
           const clause = getClause();

        //invalid case: more elems than clauses
           expect( C.isValid( clause, extendedCase ) ).to.be.false;

        //empty case
           expect( C.isValid( clause, emptyCase ) ).to.be.false;

        //invalid case: less elem than clause
           expect( C.isValid( clause, lesserCase ) ).to.be.false;
         } );
       } );
  } );
} );
