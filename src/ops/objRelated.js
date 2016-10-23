var Spec = require('../models/Spec');
var oAssign = require('object-assign');
var Problem = require('../models/Problem');
var isSpec = require('../utils/isSpec');
var isProblem = require('../utils/isProblem');
var isObj = require('../preds/isObj');
var isStr = require('../preds/isStr');
var core = require('./core');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var {cat, or, RefNameOrExprSpec} = core;
var fspec = require('./fspec');

var SPEC_TYPE_KEYS = 'KEYS';

function keys(params) {
  var reqSpecs = params.req;
  var optSpecs = params.opt;
  return new Spec(SPEC_TYPE_KEYS, params, _genKeyConformer(reqSpecs), null);
};


function _genKeyConformer(reqSpecs, optSpec) {
  return function tryConformKeys(x) {
    if(reqSpecs) {
      var reqProblems = [];
      var found = undefined;
      var f = reqSpecs.fields;

      for(var name in reqSpecs.fields) {
        if(reqSpecs.fields[name].keySpec) { //key spec
          found = false;
          for (var kk in x) {
            var rr = _conformNamedOrExpr(kk, f.keySpec);
            if(!isProblem(rr)) { //found a match
              found = true;
              break;
            }
          }
        } else { //plain string key
          if(x[k] === undefined) {
            reqProblems.push(x[k]);
          }
        }
      }
      if(reqProblems.length > 0 || found === false) {
        return new Problem(x, reqProblems, 'req: keys required: ' + reqProblems.join(', ') );
      }
    }
    return x;
  }
}

var TYPE_PROPS = 'PROPS';

var FieldDefs = propsOp({
  opt: {
    'fields':
    {
      keySpec: coerceIntoSpec(isStr),
      valSpec: {
        expr: or(
          'expr', RefNameOrExprSpec,
          'keyValExprPair', cat(
            'keySpec', RefNameOrExprSpec,
            'valSpec', RefNameOrExprSpec
          )
        )
      },
    },
  },
});

var PropArgs = propsOp({
  opt: {
    'req': { valSpec: { expr: FieldDefs } },
    'opt': { valSpec: { expr: FieldDefs } },
  },
});

var PropsSpec = fspec({
  args: cat(PropArgs),
  ret: isSpec,
});

function propsOp(cargs) {

  // console.log('-------------------');
  // var util = require('util');
  // console.log(util.inspect(cargs, false, null));
  // console.log('-------------------');

  var {req, opt} = cargs;
  return new Spec(TYPE_PROPS, cargs, _genPropsConformer(req, opt), null);
}

function _genPropsConformer(reqSpecs, optSpecs) {
  var keyConformer;
  return function tryConformProps(x) {
    if (!keyConformer) {
      keyConformer = _genKeyConformer(reqSpecs, optSpecs); //lazy
    }
    var keyResult = keyConformer(x);

    if(isProblem(keyResult)) {
      return keyResult;
    }

    var conformed = {};
    if(reqSpecs) {
      for (var name in reqSpecs) {
        var defs = reqSpecs[name];
        var r = parseFieldDef(x, name, defs);
        if (isProblem(r)) {
          return r;
        } else {
          if(r !== undefined) {
            conformed[name] = r;
          }
        }
      }
    }

    if(optSpecs) {
      for (var name in optSpecs) {
        var defs = optSpecs[name];
        var r = parseFieldDef(x, name, defs);
        if (isProblem(r)) {
          // console.log(r.falsePredicate);
          return r;
        } else {
          if(r !== undefined) {
            conformed[name] = r;
          }
        }
      }
    }

    // console.log(conformed);
    return conformed;
  }
}

function parseFieldDef(x, name, defs) {
  var { keySpec, valSpec } = defs;
  var r;
  if(keySpec) {
    r = {};
    for (var k in x) {
      var rr = keySpec.conform(k);
      if(!isProblem(rr)) {
        if (valSpec) {
          if(valSpec.expr) {
            var rrr = valSpec.expr.conform(x[rr]);
            if(isProblem(rrr)) {
              // console.log(rrr);
              return rrr;
            } else {
              r[k] = rrr;
            }
          } else if (valSpec.keyValExprPair) {
            throw 'z';
          } else {
            throw 'z';
          }
        } else {
          r[k] = x[rr];
        }
      }
    }
  } else {
    // console.log(r);
    r = x[name];
    if (valSpec) {
      if(valSpec.expr) {
        r = valSpec.expr.conform(r);
      } else if (valSpec.keyValExprPair) {
        throw 'z';
      } else {
        throw 'z';
      }
    }
  }
  // console.log(r);
  return r;
}

function _conformNamedOrExpr(x, nameOrExpr) {
  throw 'no impl';
}

module.exports = {
  keys: keys,
  props: PropsSpec.wrapConformedArgs(propsOp),
};
