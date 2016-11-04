var DelayedSpec = require('../models/DelayedSpec');

//TODO
module.exports = function isSpecRef(x) {
  return x instanceof DelayedSpec;
}
