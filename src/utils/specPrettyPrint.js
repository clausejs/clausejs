var isSpec = require('./isSpec');
var isPred = require('./isPred');
var isArray = require('isarray');
var fnName = require('./fnName');

function specPrettyPrint(spec) {
  return JSON.stringify(spec, null, 2); // TODO
}

module.exports = specPrettyPrint;
