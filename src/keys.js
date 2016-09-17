

var Spec = require('./_Spec');
var Problem = require('./_Problem');
var SPEC_TYPE_KEYS = 'KEYS';

function keys(params) {
  var reqSpecs = params.req;
  return new Spec(SPEC_TYPE_KEYS, params, _genKeyConformer(reqSpecs), null);
};

function _genKeyConformer(reqSpecs) {
  return function tryConformKeys(x) {
    var reqProblems = reqSpecs.filter(function doesNotHaveKey(r) { return x[r] === undefined; });
    if(reqProblems.length > 0) {
      return new Problem(x, reqProblems, 'req: keys required: ' + reqProblems.join(', ') );
    } else {
      return x;
    }
  }
}

module.exports = keys;
