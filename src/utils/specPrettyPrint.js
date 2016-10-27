var isSpec = require('./isSpec');
var isPred = require('./isPred');
var isArray = require('isarray');
var fnName = require('./fnName');

function specPrettyPrint(spec) {
  return _pp(spec, 0);
}

function _pp(spec, level) {
  if (isPred(spec)) {
    return _indent(level) + 'Pred: ' + fnName(spec) + '\n';
  } else if (isSpec(spec)) {
    var accu = _indent(level) + 'Spec: ' + spec.type + '\n';
    if(isArray(spec.exprs)) {
      var i;

      for (i = 0; i < spec.exprs.length; i++) {
        var p = spec.exprs[i];
        var expr;
        if(p.expr) {
          expr = p.expr;
        } else {
          console.error(p);
          throw 'no impl';
        }
        accu += _pp(expr, level + 1);
      }
    }
    else if (spec.expr) {
      accu += _pp(spec.expr, level + 1);
    } else if (spec.pred) {
      accu += _pp(spec.pred, level + 1);
    }
    return accu;
  }
  throw 'Shouldn\'t reach here';
}

function _indent(level) {
  var accu = '';
  for (var i = 0; i < level; i++) {
    if (i < level - 1) {
      accu += '|';
    } else {
      accu += '-';
    }
  }
  return accu;
}

module.exports = specPrettyPrint;
