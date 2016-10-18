var oPath = require('object-path');

var ops = require('../ops');
var fspec = require('../fspec');

var cat = ops.cat;
var or = ops.or;
var isSpec = require('../utils/isSpec');
var isStr = require('../preds/isStr');
var isObj = require('../preds/isObj');
var isExpr = require('../utils/isExpr');

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

// // TODO: support this
// function ExprOrDefsDelayed () { return ExprOrDefs; }

var NamespaceFnSpec = fspec({
  args: or(
    'def', cat(
      'name', isNamespaceName,
      'val', ExprOrDefs),
    'get', cat('name', isNamespaceName)
  ),
  ret: isExpr,
});

function namespaceFn(cargs) {
  var reg = _maybeInitRegistry();
  var retVal;

  if(cargs['def']) {
    var name = cargs['def']['name'];
    var val = cargs['def']['val'];
    if (val['expr']) {
      var expr = val['expr'];
      oPath.set(reg, name, {expr: expr});
      return expr;
    } else {
      throw 'no impl';
    }
  } else if(cargs['get']) {
    var name = cargs['get']['name'];
    var nameObj = oPath.get(reg, name);
    if(nameObj) {
      return nameObj.expr;
    } else {
      return undefined;
    }
  }

  return retVal;
};

var K = '___SPECKY_REGISTRY';

function _maybeInitRegistry() {
  if(!global[K]) {
    global[K] = {};
  }
  return global[K];
}

module.exports = NamespaceFnSpec.wrapConformedArgs(namespaceFn);
