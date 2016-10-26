var oPath = require('object-path');

var SpecRef = require('../models/SpecRef');
var { cat, or, fspec } = require('../ops');
var isSpec = require('../utils/isSpec');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var isStr = require('../preds/isStr');
var isObj = require('../preds/isObj');
var isExpr = require('../utils/isExpr');
var isUndefined = require('../preds/isUndefined');

var reg;

function isNamespaceName(x) {
  return isStr(x);
}

var ExprOrDefs = or(
  'expr', isExpr
  // ,
  // 'defObj', props(
  //   {opt: ['refSpecs', isNamespaceName]},
  //   'refSpecs', isObj
  // )
);

// var NameObjSpec = props({
//   req: 'expr',
// }, {
//   'expr': isExpr,
// });

var NameObjSpec = isObj;

// // TODO: support this
// function ExprOrDefsDelayed () { return ExprOrDefs; }

var NamespaceFnSpec = fspec({
  args: or(
    'def', cat(
      'name', isNamespaceName,
      'val', ExprOrDefs),
    'get', cat('name', isNamespaceName)
  ),
  ret: or(isSpecRef, isExpr),
});

function namespaceFn(cargs) {
  _maybeInitRegistry();
  var retVal;

  if(cargs['def']) {
    var name = cargs['def']['name'];
    var val = cargs['def']['val'];
    if (val['expr']) {
      var expr = val['expr'];
      _set(name, {expr: expr});
      retVal = expr;
    } else {
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
})(function _get(ref) {

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
});

var _set = fspec({
  args: cat(isNamespaceName, NameObjSpec),
})(function _set(n, nObj) {
  oPath.set(reg, n, nObj);
});

var K = '___SPECKY_REGISTRY';

function _maybeInitRegistry() {
  if(!reg) {
    reg = global[K] = {};
  }
  return reg;
}

module.exports = NamespaceFnSpec.wrapConformedArgs(namespaceFn);
