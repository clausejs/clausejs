var oAssign = require( 'object-assign' );
var SpecRef = require( '../models/SpecRef' );
import { cat, or, fspec } from '../core' ;
var { shape } = require( '../core/objRelated' );
var isSpec = require( '../utils/isSpec' );
var isPred = require( '../utils/isPred' );
var isUndefined = require( '../preds/isUndefined' );
var walk = require( '../walk' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var oPath = require( './simpleObjectPath' );

import { isNamespacePath, isSpecRef } from '../utils';
import { GetNSFnSpec, SetNSFnSpec, NamespaceFnSpec, MetaFnSpec } from '../specs/namespace.types';
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

// var PartialRefMapSpec = shape({
//   req: {
//     'refDefs': [isNamespacePath, ExprOrPartialRefMapSpec]
//   }
// });

function getNamespacePath( { nsPath } ) {
  var retVal;

  var nameObj = _get( nsPath );
  retVal = nameObj;

  return retVal;
}

function setNamespacePath( { nsPath, expression } ) {
  _processVal( nsPath, expression );
}

function _processVal( prefix, expression ) {
  if ( expression ) {
    if ( expression.spec || expression.pred ) {
      var expr = expression.spec || expression.pred;
      _set( prefix, { '.expr': expr } );
      return expr;
    } else {
      console.error( expression );
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
    console.error( expression );
    throw '!';
  }
}

var NameObjSpec = shape( {
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

const getRegistry = () => reg;

var namespaceGetOrSet = NamespaceFnSpec.instrumentConformed(
  function namespaceGetOrSet( { register, retrieve } ) {
    if ( register ) {
      return setNamespacePath( register );
    } else if ( retrieve ) {
      return getNamespacePath( retrieve );
    }
  }
)

namespaceGetOrSet.get = GetNSFnSpec.instrumentConformed( getNamespacePath );
namespaceGetOrSet.set = SetNSFnSpec.instrumentConformed( setNamespacePath );
namespaceGetOrSet.clearRegistry = clearRegistry;
namespaceGetOrSet.getRegistry = getRegistry;
namespaceGetOrSet.meta = meta;

export { getRegistry, clearRegistry, meta };
export default namespaceGetOrSet;
