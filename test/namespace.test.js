var C = require( '../src' );
var expect = require( 'chai' ).expect;

var isSpec = require( '../src/utils/isSpec' );
var isPred = require( '../src/utils/isPred' );

describe( 'namespace', () => {

  beforeEach( C.clearRegistry );
  afterEach( C.clearRegistry );

  describe( 'simple defs and gets', () => {
    it( 'should def and get', () => {
      C( 'xyz.superapp.item/title', C.isStr );
      C( 'xyz.superapp/item', C.and(
        C.isObj,
        C.shape( {
          required: {
            title: ( C( 'xyz.superapp.item/title' ) ),
            content: C.isStr,
          }
        } ) ) );

      expect( isSpec( C( 'xyz.superapp/item' ).get() ) ).to.be.true;
      expect( isPred( C( 'xyz.superapp.item/title' ).get() ) ).to.be.true;
      expect( C.isUndefined( C( 'xyz.superapp.item/doesnotexist' ).get() ) ).to.be.true;
    } );
  } );

  describe.skip( 'complex struct', function() {
    it( 'should register and retrieve', function() {
      C( 'todoapp', {
        '/headline': C.isStr,
        'list': {
          '/title': C( '../headline' ),
          '/items': C.zeroOrMore( C( '../item' ) ),
        },
        '/item':
          C.shape( {
            req: [
              C( 'todoapp.item/title' ),
              C( 'todoapp.item/content' ),
              C( 'todoapp.item/date' ),
              C( 'todoapp.item/isDone' ),
            ],
            opt: [
              C( 'todoapp.item/reminder' ),
            ],
          } ),
        'item': {
          '/title': C( 'todoapp/headline' ),
          '/content': C.and( C.isStr, C.notEmpty ),
          '/date': C.isDate,
          '/isDone': C.isBool,
          '/reminder': C.isDate,
        }
      } );

      var ListSpec = C( 'todoapp/list' );
      var ItemSpec = C( 'todoapp/item' );
      var ContentSpec = C( 'todoapp.item/content' );

      expect( ListSpec ).to.be.ok;
      expect( isSpec( ListSpec ) ).to.be.true;
      expect( isSpec( ItemSpec ) ).to.be.true;
      expect( isSpec( ContentSpec ) ).to.be.true;

      expect( C.isValid( ListSpec, [] ) ).to.be.true;
      expect( C.isValid( ItemSpec, [] ) ).to.be.false;
    } );
  } );
} );
