var isArray = require('isarray');
var oAssign = require('object-assign');

function Spec(type, args, conformFn, generateFn) {

  if(arguments.length !== 4) {
    throw new Error('Wrong number of arguments (' + arguments.length + ') passed to new Spec()');
  }

  if(args === null || args === undefined) {
    throw new Error('No argument list passed to new Spec()');
  }

  this.type = type;

  this.conform = function (x, _this) {
    // if(x === undefined) {
    //   throw new Error('Conform must be called with a test value x.');
    // } else {
      return conformFn.call(_this, x);
    // }
  };

  if(generateFn) {
    this.generate = function generate(_this) {
      return generateFn.call(_this, x);
    }
  }

  oAssign(this, args);
};


module.exports = Spec;
