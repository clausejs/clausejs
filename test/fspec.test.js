var expect = require( 'chai' ).expect;
var S = require( '../src/' );
var s = S;
var Problem = S.Problem;
var Spec = require( '../src/models/Spec' );
var isSpec = require( '../src/utils/isSpec' );
var identity = S.identity;

describe( 'fspec', function() {

  it( 'empty spec', () => {
    var EmptyFspec = S.fspec( {} );

    expect( isSpec( EmptyFspec ) ).to.be.true;
  } );

  it( 'instrument: no args provided', () => {
    var FspecSpec = S.fspec( {
      args: S.cat( isSpec ),
      ret: S.isSpec,
    } );

    expect( () => FspecSpec.instrument() ).to.throw( Error );
  } );

  it( 'should return a function that checks the spec of a given function as its input', function() {
    var FspecSpec = S.fspec( {
      args: S.cat( isSpec ),
      ret: S.isSpec,
    } );

    var specedFspec = FspecSpec.instrument( S.fspec ); //meta-ly apply checking to self
    expect( S.isFn( specedFspec ) ).to.be.true;

    expect( () => {
      specedFspec( 'spec should not be a string' );
    } ).to.throw( Problem );
    expect( () => {
      specedFspec( { spec: 'should not be simple obj either' } )
    } ).to.throw();

    expect( () => {
      specedFspec( new Spec( {
        type: 'catt', exprs: [ S.isBool ], conformFn: identity,
      } ), { extra: 'param' } );
    } ).to.throw( Problem );
    expect( () => {
      specedFspec();
    } ).to.throw( Problem );
  } );

  it( 'test on sheep counting fn', function() {
    var sheepCounterSpec = S.fspec( {
      args: S.cat( S.isNum ),
      ret: S.isStr,
      fn: ( cargs, ret ) => {
        return true;
      }
    } );

    var sheepCounter = sheepCounterSpec.instrument( function( c ) {
      return c + ' sheep and counting.';
    } );

    expect( sheepCounter( 200 ) ).to.be.a( 'string' );
    expect( function() {
      sheepCounter( 'hello' );
    } ).to.throw( Problem );
  } );

  describe( 'fn validation', () => {
    var __goodSampler = function( n, min, max ) {
      var r = [];
      for ( var i = 0; i < n; i++ ) {
        r.push( Math.floor( Math.random() * ( max - min ) ) + min );
      }

      return r;
    }

    var __badSampler = function( n, min, max ) {
      var r = [];
      for ( var i = 0; i < n; i++ ) {
        r.push( min - 1000 );
      }

      return r;
    }

    it( 'without return spec', () => {
      var SampleFspec = S.fspec( {
        args: S.cat( 'n', S.isNatInt, 'min', S.isNum, 'max', S.isNum ),
        fn: ( { n, min, max }, ret ) => {
          var wackies = ret.filter( ( x ) => x >= max || x < min );
          return wackies.length === 0;
        }
      } );

      var goodSampler = SampleFspec.instrument( __goodSampler );
      var badSampler = SampleFspec.instrument( __badSampler );

      expect( goodSampler( 10, 2, 3 ).length ).to.equal( 10 );
      expect( () => badSampler( 10, 2, 3 ).length ).to.throw( Problem );
    } );

    it( 'without return val conformation', () => {
      var SampleFspec = S.fspec( {
        args: S.cat( 'n', S.isNatInt, 'min', S.isNum, 'max', S.isNum ),
        ret: S.isArray,
        fn: ( { n, min, max }, ret ) => {
          var wackies = ret.filter( ( x ) => x >= max || x < min );
          return wackies.length === 0;
        }
      } );

      var goodSampler = SampleFspec.instrument( __goodSampler );
      var badSampler = SampleFspec.instrument( __badSampler );

      expect( goodSampler( 10, 2, 3 ).length ).to.equal( 10 );
      expect( () => badSampler( 10, 2, 3 ).length ).to.throw( Problem );

    } );

    it( 'with return val conformation', () => {
      var SampleFspec = S.fspec( {
        args: S.cat( 'n', S.isNatInt, 'min', S.isNum, 'max', S.isNum ),
        ret: S.cat( 'numbers', S.zeroOrMore( S.isNatInt ) ),
        fn: ( { n, min, max }, { numbers: ret } ) => {
          var wackies = ret.filter( ( x ) => x >= max || x < min );
          return wackies.length === 0;
        }
      } );

      var goodSampler = SampleFspec.instrument( __goodSampler );
      var badSampler = SampleFspec.instrument( __badSampler );

      expect( goodSampler( 10, 2, 3 ).length ).to.equal( 10 );
      expect( () => badSampler( 10, 2, 3 ).length ).to.throw( Problem );

    } );
  } )

  it( 'higher order functions', () => {
    var AdderFnSpec = s.fspec( {
      args: s.cat( 'x', s.isNum ),
      ret: s.fspec( {
        args: s.cat( 'y', s.isNum ),
        ret: s.isNum
      } ),
    } );

    var adderFn = AdderFnSpec.instrument( ( x ) => ( y ) => x + y );
    var brokenAdderFn = AdderFnSpec.instrument( () => ( y ) => 'z' );
    expect( adderFn( 1 )( 2 ) ).to.equal( 3 );
    expect( () => adderFn( 'a' )( 2 ) ).to.throw( Problem );
    expect( () => adderFn( 1 )( 'z' ) ).to.throw( Problem );
    expect( () => brokenAdderFn( 1 )( 2 ) ).to.throw( Problem );
  } );
} );
