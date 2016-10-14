var ops = require('../ops');
var fspec = require('../fspec');

var cat = ops.cat;
var isSpec = require('../utils/isSpec');

var NamespaceFnSpec = fspec({
  // args: cat(),
  ret: isSpec,
});

var namespaceFn = function() {
  var reg = _maybeInitRegistry();
};

function _maybeInitRegistry() {
  if(!global.___SPECKY_REGISTRY) {
    global.___SPECKY_REGISTRY = {};
  }
  return global.___SPECKY_REGISTRY;
}

module.exports = namespaceFn;
