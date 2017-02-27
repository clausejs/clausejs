import C from "../src";
import { expect } from "chai";

var Problem = C.Problem;
var shape = C.shape;

function startWithOo( key ) {
  return key.indexOf( 'oo' ) === 0;
}

describe( 'shape', () => {
  it( 'simple key set', () => {
    var ObjClause = shape( {
      req: [ 'a', 'b', 'c' ],
    } );
    var conformed1 = { a: '', b: null, c: 2 };
    var conformed2 = { a: '', b: null, c: 2 };
    var unconformed1 = { a: '', c: 2 };

    expect( ObjClause.conform( conformed1 ) ).to.deep.equal( conformed1 );
    expect( ObjClause.conform( conformed2 ) ).to.deep.equal( conformed2 );
    expect( ObjClause.conform( unconformed1 ) ).to.be.an.instanceof( Problem );
  } );

  it( 'single val clauses', () => {
    var ObjClause = shape( {
      required: {
        a: C.isStr,
        b: C.any,
        c: C.isNum,
      },
    } );
    var conformed1 = { a: '', b: null, c: 2 };
    var conformed2 = { a: '', b: null, c: 2 };
    var unconformed1 = { a: '', c: 2 };

    expect( ObjClause.conform( conformed1 ) ).to.deep.equal( conformed1 );
    expect( ObjClause.conform( conformed2 ) ).to.deep.equal( conformed2 );
    expect( ObjClause.conform( unconformed1 ) ).to.be.an.instanceof( Problem );
  } );

  it( 'key val verify', () => {
    var ObjClause1 = shape( {
      req: {
        'title': C.isStr,
        'userId': C.isNum,
      },
      opt: {
        'content': C.isStr,
        'ooShape': [ startWithOo, shape( {
          req: {
            'val': C.isNum,
          },
        } ) ],
      },
    } );

    //alternative spelling
    var ObjClause2 = shape( {
      required: {
        'title': C.isStr,
        'userId': C.isNum,
      },
      optional: {
        'content': C.isStr,
        'ooShape': [ startWithOo, shape( {
          required: {
            'val': C.isNum,
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

    [ ObjClause1, ObjClause2 ].forEach( ( ObjClause ) => {

      expect( ObjClause.conform( conformed1 ) ).to.deep.equal( conformed1 );
      expect( ObjClause.conform( unconformed1 ) ).to.be.an.instanceof( Problem );

      expect( ObjClause.conform( conformed2 ) ).to.deep.equal(
        { title: 'Do it', content: 'blah', userId: 2, ooShape: {
          ooA: { val: 1 }, ooB: { val: 2 }, ooC: { val: 3 },
        } } );

      expect( ObjClause.conform( unconformed2 ) ).to.be.an.instanceof( Problem );
      expect( ObjClause.conform( unconformed3 ) ).to.be.an.instanceof( Problem );
      expect( ObjClause.conform( unconformed4 ) ).to.be.an.instanceof( Problem );
    } );
  } );

  describe( 'mutate', () => {
    it( 'should create new object by default', () => {
      var ObjClause = shape( {
        required: {
          a: C.isStr,
          b: C.any,
          c: C.isNum,
        },
      } );
      var conformed1 = { a: '', b: null, c: 2 };
      var conformed2 = { a: '', b: null, c: 2 };

      expect( C.conform( ObjClause, conformed1 ) === conformed1 ).to.be.false;

      // TODO
      // expect( C.conform( ObjClause, conformed2, { mutate: true } ) === conformed2 ).to.be.true;
    } );
  } );
} );
