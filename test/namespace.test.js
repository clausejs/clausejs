var s = require( '../src' );
var expect = require( 'chai' ).expect;

var isSpec = require( '../src/utils/isSpec' );
var isPred = require( '../src/utils/isPred' );

describe( 'namespace', () => {

  beforeEach( s.clearRegistry );
  afterEach( s.clearRegistry );

  describe( 'simple defs and gets', () => {
    it( 'should def and get', () => {
      s( 'xyz.superapp.item.title', s.isStr );
      s( 'xyz.superapp.item', s.and(
        s.isObj,
        s.props( {
          required: {
            title: ( s( 'xyz.superapp.item.title' ) ),
            content: s.isStr,
          }
        } ) ) );

      expect( isSpec( s( 'xyz.superapp.item' ).get() ) ).to.be.true;
      expect( isPred( s( 'xyz.superapp.item.title' ).get() ) ).to.be.true;
      expect( s.isUndefined( s( 'xyz.superapp.item.doesnotexist' ).get() ) ).to.be.true;
    } );
  } );

  describe.skip( 'complex struct', function() {
    it( 'should register and retrieve', function() {
      s( 'todoapp', {
        'headline': s.isStr,
        'list': {
          'title': s( '../headline' ),
          'items': s.zeroOrMore( s( '../item' ) ),
        },
        'item': [
          s.props( {
            req: [
              s( 'todoapp.item.title' ),
              s( 'todoapp.item.content' ),
              s( 'todoapp.item.date' ),
              s( 'todoapp.item.isDone' ),
            ],
            opt: [
              s( 'todoapp.item.reminder' ),
            ],
          } ),
          {
            'title': s( 'todoapp.headline' ),
            'content': s.and( s.isStr, s.notEmpty ),
            'date': s.isDate,
            'isDone': s.isBool,
            'reminder': s.isDate,
          },
        ],
      } );

      var ListSpec = s( 'todoapp.list' );
      var ItemSpec = s( 'todoapp.item' );
      var contentSpec = s( 'todoapp.item.content' );

      expect( ListSpec ).to.be.ok;
      expect( isSpec( ListSpec ) ).to.be.true;
      expect( isSpec( ItemSpec ) ).to.be.true;
      expect( isSpec( ContentSpec ) ).to.be.true;

      expect( s.isValid( ListSpec, [] ) ).to.be.true;
      expect( s.isValid( ItemSpec, [] ) ).to.be.false;
    } );
  } );
} );
