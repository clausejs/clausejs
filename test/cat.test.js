var C = require( '../src/' );
var expect = require( 'chai' ).expect;
var Problem = C.Problem;

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
    NamedSpec = C.cat( 'z', C.isFn, 'b', C.isObj, 'c', C.isFn, 'a', C.isObj );
    NamedCommentedSpec = C.cat( 'z', 'very zeeee', C.isFn, 'b', C.isObj, 'c', 'c for da win, man', C.isFn, 'a', C.isObj );
    UnnamedSpec = C.cat( C.isFn, C.isObj, C.isFn, C.isObj );
  }

  describe( 'conform', () => {

    beforeEach( init );

    it( 'empty case', () => {
      var EmptySpec = C.cat();
      var conformed = EmptySpec.conform( [] );
      var unconformed = EmptySpec.conform( [ 1 ] );
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
      var NamedCommentedSpec = C.cat( 'z', 'it\'s a fuuuunction', C.isFn, 'b', C.isObj, 'c', 'another fuuuunction', C.isFn, 'a', C.isObj );

      var conformed = NamedCommentedSpec.conform( conformist );
      expect( conformed ).to.deep.equal( { z: fn, b: {}, c: fn, a: { a: 1 } } );
      var nonconformed = NamedCommentedSpec.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );

    it( 'no dupe labels', () => {
      let createDupe = () => C.cat( 'z', 'it\'s a fuuuunction', C.isFn, 'b', C.isObj, 'z', 'another fuuuunction', C.isFn, 'a', C.isObj );
      expect( createDupe ).to.throw( Error );
    } );

    it( 'labelled, grouped', () => {
      var NamedGroupedSpec = C.cat(
         'z', 'it\'s a fuuuunction', C.isFn,
         'b', C.isObj,
         'c', 'another fuuuunction', C.isFn,
         'a', C.isObj
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

    it( 'without labels', () => {
      var conformed = UnnamedSpec.conform( conformist );
      expect( conformed ).to.deep.equal( conformist );
      var nonconformed = UnnamedSpec.conform( nonconformist );
      expect( nonconformed instanceof Problem ).to.be.true;
    } );
  } );

  describe( 'validity', () => {

    beforeEach( init );

    [ [ () => NamedSpec, 'labelled' ], [ () => UnnamedSpec, 'without labels' ] ].forEach(
       ( [ getSpec, name ] ) => {

         it( name, () => {
           const spec = getSpec();

        //invalid case: more elems than clauses
           expect( C.isValid( spec, extendedCase ) ).to.be.false;

        //empty case
           expect( C.isValid( spec, emptyCase ) ).to.be.false;

        //invalid case: less elem than spec
           expect( C.isValid( spec, lesserCase ) ).to.be.false;
         } );
       } );
  } );
} );
