var oPath = require('object-path');
var oAssign = require('object-assign');
var SpecRef = require('../models/SpecRef');
var { cat, or, fspec, ExprSpec } = require('../core');
var { props } = require('../core/objRelated');
var isSpec = require('../utils/isSpec');
var isPred = require('../utils/isPred');
var isStr = require('../preds/isStr');
var isExpr = require('../utils/isExpr');
var isUndefined = require('../preds/isUndefined');
var walk = require('../walk');
var delayed = require('../utils/delayed');

var reg;

function isNamespaceName(x) {
  return isStr(x); // TODO
}

var _get = fspec({
  args: cat(isNamespaceName),
  ret: isSpecRef,
}).instrument(_getUnchecked);

function _getUnchecked(ref) {
  var getFn = function(prefix) {
    var path = reg;
    if(prefix) {
      path = prefix + ref;
    } else {
      path = ref;
    }
    var nObj = oPath.get(reg, path);

    if (nObj) {
      return nObj.expr;
    } else {
      return undefined;
    }
  };

  var sr = new SpecRef({ ref, getFn, null });
  sr.conform = function specRefConform(x) {
    return walk(ss, x, { conform: true });
  }
  return sr;
}

var ExprOrPartialRefMapSpec = or(
  'expr', delayed(function() { return ExprSpec }) //TODO
);

// var PartialRefMapSpec = props({
//   req: {
//     'refDefs': [isNamespaceName, ExprOrPartialRefMapSpec]
//   }
// });

var NamespaceFnSpec = fspec({
  args: or(
    'def', cat(
      'name', isNamespaceName,
      'val', ExprOrPartialRefMapSpec),
    'get', cat('name', isNamespaceName)
  ),
  ret: or(isSpecRef, isExpr),
});

function speckyNamespace(cargs) {
  var retVal;

  if(cargs['def']) {
    var name = cargs.def.name;
    var val = cargs.def.val;
    retVal = _processVal(name, val);
  } else if(cargs['get']) {
    var name = cargs['get']['name'];
    var nameObj = _get(name);
    retVal = nameObj;
  }

  return retVal;
};

function _processVal(prefix, val) {
  if(val.expr) {
    var e = val.expr;
    if (e.spec || e.pred) {
      var expr = e.spec || e.pred;
      _set(prefix, {expr: expr});
      return expr;
    } else {
      console.error(e);
      throw 'internal erro';
    }

  } else if (val.partialRefMap) {
    var { refDefs } = val.partialRefMap;
    for (var k in refDefs) {
      if(refDefs.hasOwnProperty(k)) {
        var retVal = _processVal(refDefs[k]);
      }
    }
  } else {
    console.error(val);
    throw 'no impl';
  }
}

function isSpecRef(x) {
  return x instanceof SpecRef;
}

var NameObjSpec = props({
  req: { 'expr': or(isSpec, isPred) }
});

var _set = fspec({
  args: cat(isNamespaceName, NameObjSpec),
  ret: isUndefined,
}).instrument(function _set(n, nObj) {
  _maybeInitRegistry();
  var existing = oPath.get(reg, n);
  oPath.set(reg, n, oAssign({}, existing, nObj));
});

var K = '___SPECKY_REGISTRY';

function _maybeInitRegistry() {
  if(!reg) {
    clearRegistry();
  }
  return reg;
}

function clearRegistry() {
  reg = global[K] = {};
}

_maybeInitRegistry();

var specedSpeckyNamespace = NamespaceFnSpec.instrumentConformed(speckyNamespace);
specedSpeckyNamespace.clearRegistry = clearRegistry;

module.exports = specedSpeckyNamespace;
