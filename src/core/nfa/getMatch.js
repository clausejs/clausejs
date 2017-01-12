  var oAssign = require( '../../utils/objectAssign' );

/*eslint func-names: 0*/

  function Value( val ) {
    this.value = val;
  }

  function Piece( frag ) {
    this.fragment = frag;
  }
  function GroupedPiece( frag ) {
    this.fragment = frag;
  }
  function NamedPiece( name, frag ) {
    this.fragment = frag;
    this.name = name;
  }
  function GroupedAltPiece( frag ) {
    this.fragment = frag;
  }
  function NamedAltPiece( name, frag ) {
    this.fragment = frag;
    this.name = name;
  }
  function Nothing() {}
  function Empty() {}
  function MaybeEnter() {}
  function GroupName( name ) {
    this.name = name;
  }

  function getMatch( chain, walkFn, walkOpts ) {
    var { conform } = walkOpts;
    var { inputType } = chain;

    const valStack = [];
    var r;

    chain.forEach( function( curr ) {
      if ( curr.move ) {
        switch ( curr.move.dir ) {
        case 'maybe_enter' : {
          valStack.push( new MaybeEnter() );
        } break;
        case 'maybe_exit': {
          let c,
            acc = new Empty( );
          while ( !( ( c = valStack.pop() ) instanceof MaybeEnter ) ) {
            acc = _foldLeft( inputType, conform, acc, c );
          }
          valStack.push( acc );
        } break;
        case 'maybe_single_enter' : {
          valStack.push( new MaybeEnter() );
        } break;
        case 'maybe_single_exit': {
          let top = valStack.pop(),
            acc;
          if ( top instanceof MaybeEnter ) {
            acc = new Nothing();
          } else {
            acc = top;
          //get rid of MaybeEnter
            valStack.pop();
          }
          valStack.push( acc );
        } break;
        case 'enter' : {
        } break;
        case 'exit': {
          let c = valStack.pop();
          let acc;
          if ( conform && c instanceof NamedAltPiece ) {
            let interim;
            if ( c.fragment instanceof Empty ) {
              interim = {};
            } else {
              interim = { [ c.name ]: c.fragment };
            }
            acc = new GroupedAltPiece( interim );
          } else {
            acc = c;
          }
          valStack.push( acc );
        } break;
        case 'maybe_in': {
          if ( conform && curr.move.name ) {
            valStack.push( new GroupName( curr.move.name ) );
          }
        } break;
        case 'loop': {
        } break;
        case 'maybe_out': {
          if ( conform && curr.move.name ) {
            let c = valStack.pop();
            let gn = valStack.pop();
            valStack.push( _giveName( gn, c ) );
          }
        } break;
        case 'in': {
          if ( conform && curr.move.name ) {
            valStack.push( new GroupName( curr.move.name ) );
          }
        } break;
        case 'out': {
          if ( conform && curr.move.name ) {
            let c = valStack.pop();
            let gn = valStack.pop();
            valStack.push( _giveAltName( gn, c ) );
          }
        } break;
        case 'clause': {
          let conformed = walkFn( curr.clause, curr.guide, walkOpts );
          valStack.push( new Value( conformed ) );
        } break;
        default: console.error( curr ); throw 'FUUU';
        }
      }
    } );
    if ( valStack.length !== 1 ) {
      console.error( 'valStack', valStack );
      throw '!';
    }
    r = valStack.pop();

    let retVal;

    if ( r instanceof Piece ) {
      retVal = r.fragment;
    } else if ( r instanceof GroupedPiece ) {
      retVal = r.fragment;
    } else if ( r instanceof GroupedAltPiece ) {
      retVal = r.fragment;
    } else if ( r instanceof Value ) {
      retVal = r.value;
    } else if ( r instanceof Empty ) {
      retVal = _coerceToProperType( inputType, [] );
    } else {
      retVal = r;
    }

    return retVal;
  }

  function _giveName( groupName, c ) {
    if ( c instanceof Nothing ) {
      return new NamedPiece( groupName.name, new Empty() );
    } else if ( c instanceof GroupedPiece ) {
      return new NamedPiece( groupName.name, c.fragment );
    } else if ( c instanceof Piece || c instanceof GroupedAltPiece ) {
      return new NamedPiece( groupName.name, c.fragment );
    } else if ( c instanceof Value ) {
      return new NamedPiece( groupName.name, c.value );
    } else if ( c instanceof Empty ) {
      return new NamedPiece( groupName.name, new Empty() );
    } else {
      console.error( c );
      throw 'c!!!';
    }
  }

  function _giveAltName( groupName, c ) {
    if ( c instanceof Nothing ) {
      return new NamedAltPiece( groupName.name, new Empty() );
    } else if ( c instanceof GroupedAltPiece ) {
      return new NamedAltPiece( groupName.name, c.fragment );
    } else if ( c instanceof Piece ) {
      return new NamedAltPiece( groupName.name, c.fragment );
    } else if ( c instanceof GroupedPiece ) {
      return new NamedAltPiece( groupName.name, c.fragment );
    } else if ( c instanceof Value ) {
      return new NamedAltPiece( groupName.name, c.value );
    } else if ( c instanceof Empty ) {
      return new NamedAltPiece( groupName.name, new Empty() );
    } else {
      console.error( c );
      throw 'c!!!alt';
    }
  }

  function _foldLeft( inputType, conform, acc, c ) {

    if ( conform && c instanceof NamedPiece ) {
      let rightPart;

      if ( acc instanceof Nothing ) {
        rightPart = {};
      } else if ( !acc ) {
        rightPart = {};
      } else if ( acc instanceof Empty ) {
        rightPart = {};
      } else if ( acc instanceof GroupedPiece ) {
        rightPart = acc.fragment;
      } else if ( acc instanceof Piece ) {
        rightPart = acc.fragment;
      } else if ( acc instanceof GroupedAltPiece ) {
        rightPart = acc.fragment;
      } else {
        console.error( acc, c );
        throw '!!acc_fl_np';
      }
      let interim;
      if ( c.fragment instanceof Empty ) {
        interim = {};
      } else {
        interim = {
          [ c.name ]: c.fragment
        };
      }
      var gp = new GroupedPiece(
      oAssign( {}, interim, rightPart )
    );
      return gp;
    } else {
      let leftArr,
        rightArr1;
      if ( acc instanceof Nothing ) {
        rightArr1 = [];
      } else if ( !acc ) {
        rightArr1 = [];
      } else if ( acc instanceof Piece ) {
        rightArr1 = acc.fragment;
      } else if ( acc instanceof GroupedPiece ) {
        rightArr1 = [ acc.fragment ];
      } else if ( acc instanceof Empty ) {
        rightArr1 = [];
      } else {
        console.error( acc );
        throw '!!acc_fl';
      }

      if ( c instanceof Value ) {
        leftArr = [ c.value ];
      } else if ( c instanceof Piece ) {
        leftArr = c.fragment;
      } else if ( c instanceof GroupedPiece ) {
        leftArr = [ c.fragment ];
      } else if ( c instanceof GroupedAltPiece ) {
        leftArr = [ c.fragment ];
      } else if ( c instanceof Nothing ) {
        leftArr = [];
      } else if ( c instanceof Empty ) {
        leftArr = [];
      } else {
        console.error( c );
        throw 'cc!!';
      }
      let p = new Piece( _coerceToProperType( inputType, leftArr.concat( rightArr1 ) ) );
      return p;
    }
  }

  function _coerceToProperType( t, arr ) {
    if ( t === 'string' && Array.isArray( arr ) ) {
      // var r = arr.reduce( ( acc, curr ) => {
      //   if ( typeof curr === 'string' && acc.length > 0 || typeof acc[ acc.length - 1 ] === 'string' ) {
      //     return acc.slice( 0, acc.length - 1 ).concat( acc[ acc.length - 1 ].concat( curr ) );
      //   } else {
      //     return acc.concat( [ curr ] );
      //   }
      // }, [] );
      // if ( !r ) {
      //   debugger;
      // }
      // if ( r.length === 1 && typeof r[ 0 ] === 'string' ) {
      // // pure string
      //   return r[ 0 ];
      // } else {
      //   return r;
      // }
      return arr.join( '' )
    } else {
      return arr;
    }
  }

  module.exports = getMatch;
