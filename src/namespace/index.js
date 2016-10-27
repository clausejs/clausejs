var oPath = require('object-path');

var SpecRef = require('../models/SpecRef');
var { cat, or, fspec, ExprSpec } = require('../ops');
var { props } = require('../ops/objRelated');
var isSpec = require('../utils/isSpec');
var isPred = require('../utils/isPred');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var isStr = require('../preds/isStr');
var isExpr = require('../utils/isExpr');
var isUndefined = require('../preds/isUndefined');

var reg;

function isNamespaceName(x) {
  return isStr(x); // TODO
}

// var NameObjSpec = props({
//   req: 'expr',
// }, {
//   'expr': isExpr,
// });

var ExprOrPartialRefMapSpec = or(
  'expr', _getUnchecked('__specky.Expr'),
  'partialRefMap', _getUnchecked('__specky.PartialRefMap')
);

var PartialRefMapSpec = props({
  req: {
    'refDefs': [isNamespaceName, ExprOrPartialRefMapSpec]
  }
});

var NamespaceFnSpec = fspec({
  args: or(
    'def', cat(
      'name', isNamespaceName,
      'val', ExprOrPartialRefMapSpec),
    'get', cat('name', isNamespaceName)
  ),
  ret: or(isSpecRef, isExpr),
});

function namespaceFn(cargs) {
  var retVal;

  if(cargs['def']) {
    var name = cargs.def.name;
    var val = cargs.def.val;
    if(val.expr) {
      var e = val.expr;
      if (e.spec || e.pred) {
        var expr = e.spec || e.pred;
        _set(name, {expr: expr});
        retVal = expr;
      } else {
        console.error(e);
        throw 'no impl';
      }

    } else if (val.partialRefMap) {
      console.error(val);
      throw 'no impl';
    } else {
      console.error(val);
      throw 'no impl';
    }
  } else if(cargs['get']) {
    var name = cargs['get']['name'];
    var nameObj = _get(name);
    retVal = nameObj;
  }

  return retVal;
};

function isSpecRef(x) {
  return x instanceof SpecRef;
}

var _get = fspec({
  args: cat(isNamespaceName),
  ret: isSpecRef,
})(_getUnchecked);

function _getUnchecked(ref) {
  var getFn = (prefix) => {
    var path = reg;
    if(prefix) {
      path = prefix + reg;
    } else {
      path = reg;
    }
    var nObj = oPath.get(path, ref);
    if (nObj) {
      return nObj.expr;
    } else {
      return undefined;
    }
  };

  var conformFn = (x) => {
    var s = getFn();
    if(s) {
      var ss = coerceIntoSpec(s);
      return ss.conform(x);
    }
  };

  return new SpecRef({ ref, getFn, conformFn });
}

var NameObjSpec = props({
  req: { 'expr': or(isSpec, isPred) }
});

var _set = fspec({
  args: cat(isNamespaceName, NameObjSpec),
})(function _set(n, nObj) {
  _maybeInitRegistry();
  oPath.set(reg, n, nObj);
});

var K = '___SPECKY_REGISTRY';

function _maybeInitRegistry() {
  if(!reg) {
    reg = global[K] = {};
  }
  return reg;
}

_set('__specky.Expr', { expr: ExprSpec });
_set('__specky.PartialRefMap', { expr: PartialRefMapSpec });

module.exports = NamespaceFnSpec.wrapConformedArgs(namespaceFn);
