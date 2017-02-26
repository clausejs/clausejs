// from https://github.com/Xotic750/get-function-name-x/blob/master/index.js

import isFunction from "../preds/isFn";
import s from "./whiteSpace";

var _getFnName;

if ( ( function test() {} ).name !== 'test' ) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var fToString = Function.prototype.toString;
  var pMatch = String.prototype.match;
  var pReplace = String.prototype.replace;
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

export default function getFunctionName( fn ) {
  if ( !isFunction( fn ) ) {
    return null;
  }
  if ( fn.__predToString ) {
    return fn.__predToString();
  }
  return _getFnName ? _getFnName( fn ) : fn.name;
}
