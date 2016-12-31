var expect = require( 'chai' ).expect;
var C = require( '../src/' );
var s = C;
var Problem = C.Problem;
var Clause = require( '../src/models/Clause' );
var isClause = require( '../src/utils/isClause' );
var identity = C.identity;

describe( 'fclause', function() {

  it( 'empty clause', () => {
    var EmptyFclause = C.fclause( {} );

    expect( isClause( EmptyFclause ) ).to.be.true;
  } );

  it( 'instrument: no args provided', () => {
    var FclauseClause = C.fclause( {
      args: C.cat( isClause ),
      ret: C.isClause,
    } );

    expect( () => FclauseClause.instrument() ).to.throw( Error );
  } );

  it( 'should return a function that checks the clause of a given function as its input', function() {
    var FclauseClause = C.fclause( {
      args: C.cat( isClause ),
      ret: C.isClause,
    } );

    var clauseedFclause = FclauseClause.instrument( C.fclause ); //meta-ly apply checking to self
    expect( C.isFn( clauseedFclause ) ).to.be.true;

    expect( () => {
      clauseedFclause( 'clause should not be a string' );
    } ).to.throw( Problem );
    expect( () => {
      clauseedFclause( { clause: 'should not be simple obj either' } )
    } ).to.throw();

    expect( () => {
      clauseedFclause( new Clause( {
        type: 'catt', exprs: [ C.isBool ], conformFn: identity,
      } ), { extra: 'param' } );
    } ).to.throw( Problem );
    expect( () => {
      clauseedFclause();
    } ).to.throw( Problem );
  } );

  it( 'test on sheep counting fn', function() {
    var sheepCounterClause = C.fclause( {
      args: C.cat( C.isNum ),
      ret: C.isStr,
      fn: ( cargs, ret ) => {
        return true;
      }
    } );

    var sheepCounter = sheepCounterClause.instrument( function( c ) {
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

    it( 'without return clause', () => {
      var SampleFclause = C.fclause( {
        args: C.cat( 'n', C.isNatInt, 'min', C.isNum, 'max', C.isNum ),
        fn: ( { n, min, max }, ret ) => {
          var wackies = ret.filter( ( x ) => x >= max || x < min );
          return wackies.length === 0;
        }
      } );

      var goodSampler = SampleFclause.instrument( __goodSampler );
      var badSampler = SampleFclause.instrument( __badSampler );

      expect( goodSampler( 10, 2, 3 ).length ).to.equal( 10 );
      expect( () => badSampler( 10, 2, 3 ).length ).to.throw( Problem );
    } );

    it( 'without return val conformation', () => {
      var SampleFclause = C.fclause( {
        args: C.cat( 'n', C.isNatInt, 'min', C.isNum, 'max', C.isNum ),
        ret: C.isArray,
        fn: ( { n, min, max }, ret ) => {
          var wackies = ret.filter( ( x ) => x >= max || x < min );
          return wackies.length === 0;
        }
      } );

      var goodSampler = SampleFclause.instrument( __goodSampler );
      var badSampler = SampleFclause.instrument( __badSampler );

      expect( goodSampler( 10, 2, 3 ).length ).to.equal( 10 );
      expect( () => badSampler( 10, 2, 3 ).length ).to.throw( Problem );

    } );

    it( 'with return val conformation', () => {
      var SampleFclause = C.fclause( {
        args: C.cat( 'n', C.isNatInt, 'min', C.isNum, 'max', C.isNum ),
        ret: C.cat( 'numbers', C.zeroOrMore( C.isNatInt ) ),
        fn: ( { n, min, max }, { numbers: ret } ) => {
          var wackies = ret.filter( ( x ) => x >= max || x < min );
          return wackies.length === 0;
        }
      } );

      var goodSampler = SampleFclause.instrument( __goodSampler );
      var badSampler = SampleFclause.instrument( __badSampler );

      expect( goodSampler( 10, 2, 3 ).length ).to.equal( 10 );
      expect( () => badSampler( 10, 2, 3 ).length ).to.throw( Problem );

    } );
  } )

  it( 'higher order functions', () => {
    var AdderFnClause = s.fclause( {
      args: s.cat( 'x', s.isNum ),
      ret: s.fclause( {
        args: s.cat( 'y', s.isNum ),
        ret: s.isNum
      } ),
    } );

    var adderFn = AdderFnClause.instrument( ( x ) => ( y ) => x + y );
    var brokenAdderFn = AdderFnClause.instrument( () => ( y ) => 'z' );
    expect( adderFn( 1 )( 2 ) ).to.equal( 3 );
    expect( () => adderFn( 'a' )( 2 ) ).to.throw( Problem );
    expect( () => adderFn( 1 )( 'z' ) ).to.throw( Problem );
    expect( () => brokenAdderFn( 1 )( 2 ) ).to.throw( Problem );
  } );
} );
