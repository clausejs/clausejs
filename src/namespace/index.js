var oPath = require('object-path');

var ops = require('../ops');

var cat = ops.cat;
var or = ops.or;
var fspec = ops.fspec;
var isSpec = require('../utils/isSpec');
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
  //   {opt: ['refNames', isNamespaceName]},
  //   'refNames', isObj
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
  ret: or(isExpr, isUndefined),
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
      return expr;
    } else {
      throw 'no impl';
    }
  } else if(cargs['get']) {
    var name = cargs['get']['name'];
    var nameObj = _get(name);
    if(nameObj) {
      return nameObj.expr;
    } else {
      return undefined;
    }
  }

  return retVal;
};

var _get = fspec({
  args: cat(isNamespaceName),
  ret: or(NameObjSpec, isUndefined),
})(function _get(n) {
  return oPath.get(reg, n);
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
