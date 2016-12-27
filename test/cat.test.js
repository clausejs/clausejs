var S = require( '../src/' );
var expect = require( 'chai' ).expect;
var Problem = S.Problem;

describe( 'cat', () => {
  var fn = function() {};
  var conformist = [ fn, {}, fn, { a: 1 } ];
  var nonconformist = [ {}, fn, {}, fn ];
  var extendedCase = conformist.concat( [ { extra: 'elements' }, 2 ] );
  var emptyCase = [];
  var lesserCase = conformist.slice( 0, -1 );
  var NamedSpec,
    UnnamedSpec,
    NamedCommentedSpec;

  function init() {
    NamedSpec = S.cat( 'z', S.isFn, 'b', S.isObj, 'c', S.isFn, 'a', S.isObj );
    NamedCommentedSpec = S.cat( 'z', 'very zeeee', S.isFn, 'b', S.isObj, 'c', 'c for da win, man', S.isFn, 'a', S.isObj );
    UnnamedSpec = S.cat( S.isFn, S.isObj, S.isFn, S.isObj );
  }

  describe( 'conform', () => {

    beforeEach( init );

    it( 'empty case', () => {
      var EmptySpec = S.cat();
      var conformed = EmptySpec.conform( [] );
      var unconformed = EmptySpec.conform( [ 1 ] );
      expect( conformed ).to.deep.equal( [] );
      expect( unconformed instanceof Problem ).to.be.true;
    } );

    it( 'single val case', () => {
      var ss = S.cat( S.isInt );
      var r = ss.conform( [ 44 ] );
      expect( r ).to.deep.equal( [ 44 ] );
    } );

    it( 'nested case', () => {
      var ss = S.cat( S.cat( S.cat( S.isInt, S.isBool ), S.cat( S.isInt, S.cat( S.isBool ) ) ) );
      var data = [ 22, true, 23, false ];
      var r = ss.conform( data );

      expect( r ).to.deep.equal( data );
    } );

    it( 'labelled', () => {
      var NamedCommentedSpec = S.cat( 'z', 'it\'s a fuuuunction', S.isFn, 'b', S.isObj, 'c', 'another fuuuunction', S.isFn, 'a', S.isObj );

      var conformed = NamedCommentedSpec.conform( conformist );
      expect( conformed ).to.deep.equal( { z: fn, b: {}, c: fn, a: { a: 1 } } );
      var nonconformed = NamedCommentedSpec.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );

    it( 'no dupe labels', () => {
      let createDupe = () => S.cat( 'z', 'it\'s a fuuuunction', S.isFn, 'b', S.isObj, 'z', 'another fuuuunction', S.isFn, 'a', S.isObj );
      expect( createDupe ).to.throw( Error );
    } );

    it( 'named, grouped', () => {
      var NamedGroupedSpec = S.cat(
         'z', 'it\'s a fuuuunction', S.isFn,
         'b', S.isObj,
         'c', 'another fuuuunction', S.isFn,
         'a', S.isObj
      );

      var conformed = NamedGroupedSpec.conform( conformist );
      expect( conformed ).not.to.be.an.instanceOf( Problem );
      expect( conformed ).to.deep.equal( { z: fn, b: {}, c: fn, a: { a: 1 } } );
      var nonconformed = NamedGroupedSpec.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );

    it( 'named with some comments', () => {
      var conformed = NamedCommentedSpec.conform( conformist );
      expect( conformed ).to.deep.equal( { z: fn, b: {}, c: fn, a: { a: 1 } } );
      var nonconformed = NamedCommentedSpec.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
      expect( NamedCommentedSpec.exprs[ 0 ].comment ).to.contain( 'zee' );
      expect( NamedCommentedSpec.exprs[ 2 ].comment ).to.contain( 'man' );
    } );

    it( 'withoutLabels', () => {
      var conformed = UnnamedSpec.conform( conformist );
      expect( conformed ).to.deep.equal( conformist );
      var nonconformed = UnnamedSpec.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );
  } );

  describe( 'validity', () => {

    beforeEach( init );

    [ [ () => NamedSpec, 'named' ], [ () => UnnamedSpec, 'withoutLabels' ] ].forEach( ( p ) => {
      var name = p[ 1 ];
      it( name, () => {
        var Spec = p[ 0 ]();

        //invalid case: more elems than specs
        expect( S.isValid( Spec, extendedCase ) ).to.be.false;

        //empty case
        expect( S.isValid( Spec, emptyCase ) ).to.be.false;

        //invalid case: less elem than spec
        expect( S.isValid( Spec, lesserCase ) ).to.be.false;
      } );
    } );
  } );
} );
