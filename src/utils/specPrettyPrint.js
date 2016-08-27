var isComp = require('./isComp');
var isPred = require('./isPred');
var isArray = require('isarray');
var fnName = require('./fnName');

function specPrettyPrint(spec) {
  return _pp(spec, 0);
}

function _pp(spec, level) {
  if (isPred(spec)) {
    return _indent(level) + 'Pred: ' + fnName(spec) + '\n';
  } else if (isComp(spec)) {
    var accu = _indent(level) + 'Spec: ' + spec.type + '\n';

    if(isArray(spec.args)) {
      var i;

      for (i = 0; i < spec.args.length; i++) {
        accu += _pp(spec.args[i], level + 1);
      }
    }
    else {
      accu += _pp(spec.args, level + 1);
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
