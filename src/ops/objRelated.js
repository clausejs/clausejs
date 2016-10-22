var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var isSpec = require('../utils/isSpec');
var isObj = require('../preds/isObj');
var core = require('./core');
var cat = core.cat;
var or = core.or;
var fspec = require('./fspec');

var SPEC_TYPE_KEYS = 'KEYS';

function keys(params) {
  var reqSpecs = params.req;
  var optSpecs = params.opt;
  return new Spec(SPEC_TYPE_KEYS, params, _genKeyConformer(reqSpecs), null);
};

function _genKeyConformer(reqSpecs, optSpec) {
  return function tryConformKeys(x) {
    var reqProblems = reqSpecs.filter(function doesNotHaveKey(r) { return x[r] === undefined; });
    if(reqProblems.length > 0) {
      return new Problem(x, reqProblems, 'req: keys required: ' + reqProblems.join(', ') );
    } else {
      return x;
    }
  }
}

var TYPE_PROPS = 'PROPS';

var KeyDefs = isObj; //TODO
var FieldDefs = isObj;

var PropsSpec = fspec({
  args: cat(
    'keyDefs', KeyDefs,
    'fieldDefs', core.zeroOrOne(FieldDefs)
  ),
  ret: isSpec,
});

function props(cargs) {
  //TODO
  var keyDefs = cargs.keyDefs;
  var req = keyDefs.req;
  var opt = keyDefs.opt;

  return new Spec(TYPE_PROPS, cargs, _genPropsConformer(req), null);
}

function _genPropsConformer(req, opt) {
  var keyConformer;
  return function tryConformProps(x) {
    if (!keyConformer) {
      keyConformer = _genKeyConformer(req, opt); //lazy
    }
    var keyResult = keyConformer(x);
    //TODO
    return keyResult;
  }
}

module.exports = {
  keys: keys,
  props: PropsSpec.wrapConformedArgs(props),
};
