var isArray = require('isarray');
var oAssign = require('object-assign');

function Spec(type, exprs, conformFn, generateFn) {

  if(arguments.length !== 4) {
    throw new Error('Wrong number of arguments (' + arguments.length + ') passed to Spec constructor');
  }

  if(!isArray(exprs)) {
    throw new Error('Expect an array of specs');
  }

  this.type = type;

  if(conformFn) {
    this.conform = function (x, _this) {
      // if(x === undefined) {
      //   throw new Error('Conform must be called with a test value x.');
      // } else {
        return conformFn.call(_this, x);
      // }
    };
  }

  if(generateFn) {
    this.generate = function generate(_this) {
      return generateFn.call(_this, x);
    }
  }

  this.exprs = exprs;
};


module.exports = Spec;
