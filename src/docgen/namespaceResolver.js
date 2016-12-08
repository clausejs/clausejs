const resolvedMaps = [];
import { NamespaceObjSpec } from '../specs/namespace.types';

function resolve( registry, specRef ) {
  let map = _findFirst( resolvedMaps, ( [ registryRef, m ] ) => {
    if ( registryRef === registry ) {
      return m;
    }
  } );

  if ( !map ) {
    map = _createResolveMap( registry );
    resolvedMaps.push( [ registry, map ] );
  }

  return _resolveWithMap( map, specRef );
}

function _createResolveMap( registry ) {
  const r = [];
  var conformedReg = NamespaceObjSpec.conform( registry );
  _walk( null, null, conformedReg, r );
  return r;
}

function _walk( prefix, currN, creg, r ) {
  let currNs = prefix ? `${prefix}.${currN}` : currN;
  let subnamespaces;

  for ( let key in creg ) {
    if ( creg.hasOwnProperty( key ) ) {
      switch ( key ) {
      case 'subNamespaces':
        subnamespaces = creg[ key ];
        for ( let sns in subnamespaces ) {
          if ( subnamespaces.hasOwnProperty( sns ) ) {
            _walk( currNs, sns, subnamespaces[ sns ], r );
          }
        }
        break;
      case '.expr':
        r.push( [ `${prefix ? prefix : ''}/${currN}`, creg[ '.expr' ] ] );
        break;
      default:
        break;
      }
    }
  }
}

function _resolveWithMap( map, specRef ) {
  const path = _findFirst( map, ( [ p, r ] ) => {
    if ( r === specRef ) {
      return p;
    }
  } );
  return path;
}

function _findFirst( array, fn ) {
  for ( let i = 0; i < array.length; i++ ) {
    let r = fn( array[ i ] );
    if ( r ) {
      return r;
    }
  }
  return null;
}

module.exports = {
  resolve
};
