var expect = require( 'chai' ).expect;

var s = require( '../src' );
var Problem = s.Problem;
var props = s.props;

function startWithOo( key ) {
  return key.indexOf( 'oo' ) === 0;
}

describe( 'props', function() {
  it( 'simple key set', function() {
    var ObjSpec = props( {
      req: [ 'a', 'b', 'c' ],
    } );
    var conformed1 = { a: '', b: null, c: 2 };
    var conformed2 = { a: '', b: null, c: 2 };
    var unconformed1 = { a: '', c: 2 };

    expect( ObjSpec.conform( conformed1 ) ).to.deep.equal( conformed1 );
    expect( ObjSpec.conform( conformed2 ) ).to.deep.equal( conformed2 );
    expect( ObjSpec.conform( unconformed1 ) ).to.be.an.instanceof( Problem );
  } );

  it( 'single val specs', () => {
    var ObjSpec = props( {
      required: {
        a: s.isStr,
        b: s.any,
        c: s.isNum,
      },
    } );
    var conformed1 = { a: '', b: null, c: 2 };
    var conformed2 = { a: '', b: null, c: 2 };
    var unconformed1 = { a: '', c: 2 };

    expect( ObjSpec.conform( conformed1 ) ).to.deep.equal( conformed1 );
    expect( ObjSpec.conform( conformed2 ) ).to.deep.equal( conformed2 );
    expect( ObjSpec.conform( unconformed1 ) ).to.be.an.instanceof( Problem );
  } );

  it( 'key val verify', function() {
    var ObjSpec1 = props( {
      req: {
        'title': s.isStr,
        'userId': s.isNum,
      },
      opt: {
        'content': s.isStr,
        'ooProps': [ startWithOo, props( {
          req: {
            'val': s.isNum,
          },
        } ) ],
      },
    } );

    //alternative spelling
    var ObjSpec2 = props( {
      required: {
        'title': s.isStr,
        'userId': s.isNum,
      },
      optional: {
        'content': s.isStr,
        'ooProps': [ startWithOo, props( {
          required: {
            'val': s.isNum,
          },
        } ) ],
      },
    } );

    var conformed1 = { title: 'Do it', content: 'blah', userId: 2 };
    var conformed2 = { title: 'Do it', content: 'blah', userId: 2, ooA: { val: 1 }, ooB: { val: 2 }, ooC: { val: 3 } };
    var unconformed1 = { content: false, userId: 2 };
    var unconformed2 = { title: 'Do it', content: false, userId: 'wrong' };
    var unconformed3 = { title: 1234, content: null, userId: 2 };
    var unconformed4 = { title: 'Do it', content: false, userId: 'wrong', unknownField: 2 };

    [ ObjSpec1, ObjSpec2 ].forEach( ( ObjSpec ) => {

      expect( ObjSpec.conform( conformed1 ) ).to.deep.equal( conformed1 );
      expect( ObjSpec.conform( unconformed1 ) ).to.be.an.instanceof( Problem );

      expect( ObjSpec.conform( conformed2 ) ).to.deep.equal(
        { title: 'Do it', content: 'blah', userId: 2, ooProps: {
          ooA: { val: 1 }, ooB: { val: 2 }, ooC: { val: 3 },
        } } );

      expect( ObjSpec.conform( unconformed2 ) ).to.be.an.instanceof( Problem );
      expect( ObjSpec.conform( unconformed3 ) ).to.be.an.instanceof( Problem );
      expect( ObjSpec.conform( unconformed4 ) ).to.be.an.instanceof( Problem );
    } );
  } );
} );
