require( 'babel-core/register' );
const C = require( '../src' );

function shorternThan100( x ) {
  return x.length < 100;
}

C( 'superTwitter/Username', C.and( C.isStr, shorternThan100 ) )
C( 'superTwitter/Email', C.and( C.isStr, ( x ) => x.indexOf( '@' ) > 0 ) )
C( 'superTwitter/User', C.shape( {
  required: {
    username: C( 'superTwitter/Username' ),
    email: C( 'superTwitter/Email' ),
    firstName: C.isStr,
    lastName: C.isStr,
  },
  optional: {
    bio: C.isStr,
  }
} ) );

var user1 = {
  username: 'benjohnson',
  firstName: 'Ben',
  lastName: 'Johnson',
  email: 'benjohnson@example.org'
};

const arr = [ 1, 2, 3, 4, 6, 'a', 3, 'b', 'c', 4, 5 ];
const ArrSpec = C.cat(
  'firstNumbers', C.oneOrMore( C.isNum ),
  'nextStrings', C.oneOrMore( C.isStr ),
  'finalNumbers', C.oneOrMore( C.isNum )
);

var GetUserSpec = C.fspec( {
  args: C.or(
    'byEmail', C.cat( C( 'superTwitter/Email' ) ),
    'byId', C.cat( C.isNum ),
    'byFirstLastName', C.cat( C.isStr, ( x ) => /[a-zA-Z\']/.test( x ) ),
    'byPhoneNumber', C.cat( ( x ) => /[0-9\-\(\)]/.test( x ) )
  ),
  ret: C.isString,
} );

C( 'superTwitter/getUser', GetUserSpec );

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

// console.log( C( 'tt.User' ).conform( user1 ) )
