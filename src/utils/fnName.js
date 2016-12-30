// stolen from https://github.com/Xotic750/get-function-name-x/blob/master/index.js

var isFunction = require( '../preds/isFn' );
var _getFnName;

if ( ( function test() {} ).name !== 'test' ) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var fToString = Function.prototype.toString;
  var pMatch = String.prototype.match;
  var pReplace = String.prototype.replace;
  var s = require( 'white-space-x' ).ws;
  var reName = new RegExp(
      '^[' + s + ']*(?:function|class)[' + s + ']*\\*?[' + s + ']+([\\w\\$]+)[' + s + ']*',
      'i'
    );
  _getFnName = function getName( fn ) {
    var name = pMatch.call(
    pReplace.call( fToString.call( fn ), STRIP_COMMENTS, ' ' ),
    reName
    );
    return name && name[ 1 ] !== 'anonymous' ? name[ 1 ] : '';
  };
} else {
    /*jshint evil:true */
  if ( ( new Function() ).name === 'anonymous' ) {
    _getFnName = function getName( fn ) {
      return fn.name && fn.name !== 'anonymous' ? fn.name : '';
    };
  }
}

function getFunctionName( fn ) {
  if ( !isFunction( fn ) ) {
    return null;
  }
  return _getFnName ? _getFnName( fn ) : fn.name;
}

module.exports = getFunctionName;
