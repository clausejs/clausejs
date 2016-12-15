require( 'babel-core/register' );
const S = require( '../src' );

function shorternThan100( x ) {
  return x.length < 100;
}

S( 'superTwitter/Username', S.and( S.isStr, shorternThan100 ) )
S( 'superTwitter/Email', S.and( S.isStr, ( x ) => x.indexOf( '@' ) > 0 ) )
S( 'superTwitter/User', S.props( {
  required: {
    username: S( 'superTwitter/Username' ),
    email: S( 'superTwitter/Email' ),
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
    'byEmail', S.cat( S( 'superTwitter/Email' ) ),
    'byId', S.cat( S.isNum ),
    'byFirstLastName', S.cat( S.isStr, ( x ) => /[a-zA-Z\']/.test( x ) ),
    'byPhoneNumber', S.cat( ( x ) => /[0-9\-\(\)]/.test( x ) )
  ),
  ret: S.isString,
} );

S( 'superTwitter/getUser', GetUserSpec );

function getUserConformed( { byEmail, byId, byFirstLastName, byPhoneNumber } ) {
  if ( byEmail ) {
    return 'email';
  } else if ( byId ) {
    return 'id'
  } else if ( byFirstLastName ) {
    return 'firstNameLastName';
  } else if ( byPhoneNumber ) {
    return 'phoneNumber';
  }
  return;
}
const getUser = GetUserSpec.instrumentConformed( getUserConformed );

// console.log( getUser( 'Ben', 'Johnson' ) )
console.log( getUser( 'dasd@dasd.com' ) )


// console.log( ArrSpec.conform( arr ) );

// console.log( S( 'tt.User' ).conform( user1 ) )
