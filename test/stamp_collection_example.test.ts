import s from "../src";
import {expect} from "chai";

function isFamily( x ) {
  return x.lastName.indexOf( 'Staff' ) >= 0;
}

describe( 'stamp collection example', () => {
  it( 'stampapp', () => {
    var IdClause = s.isNum;
    var UserClause = s.shape( {
      req: {
        id: IdClause,
        firstName: s.isStr,
        lastName: s.isStr,
      },
    } );

    var StampClause = s.shape( {
      req: {
        year: s.isNum,
        title: s.isStr,
      },
    } );
    var CollectionClause = s.shape( {
      req: {
        title: s.isStr,
        items: s.oneOrMore( s.and( StampClause, s.isObj ) ),
        owner: s.and( UserClause, isFamily )
      },
      opt: {
        vendor: s.isStr,
      }
    } );
    var s1 = { year: 2012, title: 'h' };
    var s2 = { year: 2000, title: 'w' };
    var s3 = { year: 1910, title: 'z' };

    var u = { id: 1, firstName: 'John', lastName: 'Staff' };

    var coll1 = {
      title: 'Panda 2015',
      items: [ s1, s2, s3 ],
      vendor: 'black market',
      owner: u,
    };

    var r = CollectionClause.conform( coll1 );
    expect( r ).to.deep.equal( coll1 );
  } );
} );
