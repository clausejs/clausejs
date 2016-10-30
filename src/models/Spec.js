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
    this.conform = conformFn;
  }

  if(generateFn) {
    this.generate = generateFn;
  }

  this.exprs = exprs;
};


module.exports = Spec;
