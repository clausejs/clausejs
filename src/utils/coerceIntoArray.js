var isArray = require('isarray');

function coerceIntoArray(x) {
  if(isArray(x) === false) {
    return [x];
  } else {
    return x;
  }
}

module.exports = coerceIntoArray;
