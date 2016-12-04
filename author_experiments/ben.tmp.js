require( 'babel-core/register' );
const S = require( '../src' );

function shorternThan100( x ) {
  return x.length < 100;
}

S( 'tt.Username', S.and( S.isStr, shorternThan100 ) )
S( 'tt.Email', S.and( S.isStr, ( x ) => x.indexOf( '@' ) > 0 ) )

S( 'tt.User', S.props( {
  required: {
    username: S( 'tt.Username' ),
    email: S( 'tt.Email' ),
    firstName: S.isStr,
    lastName: S.isStr,
  },
  optional: {
    bio: S.isStr,
  }
} ) );

var user1 = {
  username: 'benjohnson',
  firstName: 'Ben',
  lastName: 'Johnson',
  email: 'benjohnson@example.org'
};

const arr = [ 1, 2, 3, 4, 6, 'a', 3, 'b', 'c', 4, 5 ];
const ArrSpec = S.cat(
  'firstNumbers', S.oneOrMore( S.isNum ),
  'nextStrings', S.oneOrMore( S.isStr ),
  'finalNumbers', S.oneOrMore( S.isNum )
);

var GetUserSpec = S.fspec( {
  args: S.or(
    'byEmail', S.cat( S( 'tt.Email' ) ),
    'byId', S.cat( S.isNum ),
    'byFirstLastName', S.cat( S.isStr, ( x ) => /[a-zA-Z\']/.test( x ) ),
    'byPhoneNumber', S.cat( ( x ) => /[0-9\-\(\)]/.test( x ) )
  ),
  ret: S.isString,
} );

function getUserConformed( { byEmail, byId, byFirstLastName, byPhoneNumber } ) {
  if ( byEmail ) {
    console.log( 'email' );
  } else if ( byId ) {
    console.log( 'id' );
  } else if ( byFirstLastName ) {
    console.log( 'flm' )
  } else if ( byPhoneNumber ) {
    console.log( 'phone' )
  }
  return 'a'
}
const getUser = GetUserSpec.instrumentConformed( getUserConformed );

console.log( getUser( 'Ben', 'Johnson' ) )

// console.log( ArrSpec.conform( arr ) );

// console.log( S( 'tt.User' ).conform( user1 ) )
