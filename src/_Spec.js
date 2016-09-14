var specPrettyPrint = require('./utils/specPrettyPrint');
var isArray = require('isarray');

function _Spec(type, args, conformFn, generateFn) {

  if(arguments.length !== 4) {
    throw new Error('Wrong number of arguments passed to new _Spec()');
  }

  if(args === null || args === undefined) {
    throw new Error('No argument list passed to new _Spec()');
  }

  if(args !== null && args !== undefined && !isArray(args)) {
    args = [args];
  }

  this.type = type || null;
  this.args = args || null;

  this.conform = function tryConform(x, _this) {
    return conformFn.call(_this, x);
  };

  if(generateFn) {
    this.generate = function generate(_this) {
      return generateFn.call(_this, x);
    }
  }
  this.___isSpec = true;
};

_Spec.prototype.toString = function() {
  return specPrettyPrint(this);
};

module.exports = _Spec;
