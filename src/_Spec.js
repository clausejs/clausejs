'use strict';

function _Spec(specType, args, conformFn, generateFn) {

  if(arguments.length !== 4) {
    throw new Error('Wrong number of arguments passed to new _Spec()');
  }
  if(args === null || args === undefined) {
    throw new Error('No argument list passed to new _Spec()');
  }

  this.type = specType;
  this.args = args;

  this.conform = function tryConform(x, _this) {
    return conformFn.call(_this, x);
  };

  if(generateFn) {
    this.generate = function generate(_this) {
      return generateFn.call(_this, x);
    }
  }
  this.___isComp = true;
};

module.exports = _Spec;
