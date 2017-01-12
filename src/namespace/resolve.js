import _ from 'lodash';
const resolvedMaps = [];
import { NamespaceObjClause } from '../clauses/namespace.types';

function resolve( clauseRef, registry ) {
  let map = _findFirst( resolvedMaps, ( [ registryRef, m ] ) => {
    if ( registryRef === registry ) {
      return m;
    }
  } );

  if ( !map ) {
    map = _createResolveMap( registry );
    resolvedMaps.push( [ registry, map ] );
  }

  return _resolveWithMap( map, clauseRef );
}

function getDefList( registry ) {
  const map = _createResolveMap( registry );
  var groups = _.groupBy( map, ( [ p ] ) => p );
  return groups;
}

function _createResolveMap( registry ) {
  const r = [];
  var conformedReg = NamespaceObjClause.conform( registry );
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
        r.push( [ `${prefix ? prefix : ''}`, `${currN}`, creg[ '.expr' ] ] );
        break;
      default:
        break;
      }
    }
  }
}

function _resolveWithMap( map, clauseRef ) {
  const path = _findFirst( map, ( [ p, n, r ] ) => {
    if ( r === clauseRef ) {
      return `${p}/${n}`;
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
  resolve,
  getDefList,
};
