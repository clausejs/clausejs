var oPath = require( 'object-path' );
var oAssign = require( 'object-assign' );
var SpecRef = require( '../models/SpecRef' );
import { cat, or, fspec } from '../core' ;
var { props } = require( '../core/objRelated' );
var isSpec = require( '../utils/isSpec' );
var isPred = require( '../utils/isPred' );
var isUndefined = require( '../preds/isUndefined' );
var walk = require( '../walk' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );

import { isNamespacePath, isSpecRef } from '../utils';
import { NamespaceFnSpec, MetaFnSpec } from '../specs/namespace-types';
var reg;

var _get = fspec( {
  args: cat( isNamespacePath ),
  ret: isSpecRef,
} ).instrument( _getUnchecked );

function _getUnchecked( ref ) {
  var getFn = ( prefix ) => {
    var path = reg;
    if ( prefix ) {
      path = prefix + ref;
    } else {
      path = ref;
    }
    var nObj = oPath.get( reg, _slashToDot( path ) );

    if ( nObj ) {
      return oAssign( nObj[ '.expr' ], nObj[ '.meta' ] );
    } else {
      return undefined;
    }
  };

  var sr = new SpecRef( { ref, getFn, conformFn: null } );
  sr.conform = function specRefConform( x ) {
    var ss = getFn();
    return walk( ss, x, { conform: true } );
  }
  return sr;
}

function _slashToDot( p ) {
  return p.replace( /^(.+)(\/)(.+)$/, '$1.$3' ).replace( /^\//, '' );
}

// var PartialRefMapSpec = props({
//   req: {
//     'refDefs': [isNamespacePath, ExprOrPartialRefMapSpec]
//   }
// });

function speckyNamespace( cargs ) {
  var retVal;

  if ( cargs[ 'register' ] ) {
    const { path, val } = cargs[ 'register' ];
    retVal = _processVal( path, val );
  } else if ( cargs[ 'retrieve' ] ) {
    const { path } = cargs[ 'retrieve' ];
    var nameObj = _get( path );
    retVal = nameObj;
  }

  return retVal;
}

function _processVal( prefix, { expression } ) {
  if ( expression ) {
    if ( expression.spec || expression.pred ) {
      var expr = expression.spec || expression.pred;
      _set( prefix, { '.expr': expr } );
      return expr;
    } else {
      console.error( e );
      throw '!';
    }
  // TODO
  // } else if ( val.partialRefMap ) {
  //   var { refDefs } = val.partialRefMap;
  //   for ( var k in refDefs ) {
  //     if ( refDefs.hasOwnProperty( k ) ) {
  //       var retVal = _processVal( refDefs[ k ] );
  //     }
  //   }
  } else {
    console.error( val );
    throw '!';
  }
}

var NameObjSpec = props( {
  req: { '.expr': or( isSpec, isPred ) }
} );

var _set = fspec( {
  args: cat( isNamespacePath, NameObjSpec ),
  ret: isUndefined,
} ).instrument( function _set( n, nObj ) {
  _maybeInitRegistry();
  var existing = oPath.get( reg, _slashToDot( n ) );
  oPath.set( reg, _slashToDot( n ), oAssign( {}, existing, nObj ) );
} );

var K = '___SPECKY_REGISTRY';

function _maybeInitRegistry() {
  if ( !reg ) {
    clearRegistry();
  }
  return reg;
}

function clearRegistry() {
  reg = global[ K ] = {};
}

const meta = MetaFnSpec.instrumentConformed(
  function meta( { source: { namespacePath, expression }, metaObj } ) {
    if ( namespacePath ) {
      var nObj = oPath.get( reg, _slashToDot( namespacePath ) );
      var currMeta = nObj && nObj[ '.meta' ];
      oPath.set( reg, _slashToDot( namespacePath ), oAssign( {}, nObj, { '.meta': oAssign( {}, currMeta, metaObj ) } ) );
      return _get( namespacePath );
    } else if ( expression ) {
      const spec = coerceIntoSpec( expression );
      spec.meta = oAssign( spec.meta, metaObj );
    }
  }
);

_maybeInitRegistry();

var specedSpeckyNamespace = NamespaceFnSpec.instrumentConformed( speckyNamespace );
specedSpeckyNamespace.clearRegistry = clearRegistry;
specedSpeckyNamespace.getRegistry = () => reg;
specedSpeckyNamespace.meta = meta;

export default specedSpeckyNamespace;
