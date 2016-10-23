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
var any = require('./any');

function _genKeyConformer(reqSpecs, optSpec) {
  return function tryConformKeys(x) {
    if(reqSpecs) {
      var reqProblems = [];
      var found;
      var fields = reqSpecs.fields;

      for(var name in fields) {
        found = undefined;
        if(fields[name].keySpec) { //key spec
          found = false;
          for (var kk in x) {
            var rr = _conformNamedOrExpr(kk, fields[name].keySpec);
            if(!isProblem(rr)) { //found a match
              found = true;
              break;
            }
          }
        } else { //plain string key
          if(x[name] === undefined) {
            reqProblems.push(name);
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
    fields: {
      'fields':
      {
        keyValExprPair: {
          keySpec: {
            expression: coerceIntoSpec(isStr),
          },
          valSpec: {
            expression: or(
              'valExprOnly', RefNameOrExprSpec,
              'keyValExprPair', cat(
                'keySpec', RefNameOrExprSpec,
                'valSpec', RefNameOrExprSpec
              )
            )
          },
        }
      },
    }
  },
});

var PropArgs = propsOp({
  opt: {
    fields: {
      'req': { valExprOnly: { expression: FieldDefs } },
      'opt': { valExprOnly: { expression: FieldDefs } },
    }
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
  // console.log(cargs);
  return new Spec(TYPE_PROPS, cargs, _genPropsConformer(req, opt), null);
}

function _genPropsConformer(reqSpecs, optSpecs) {
  var keyConformer;
  return function tryConformProps(x) {
    // console.log(x);
    if (!keyConformer) {
      keyConformer = _genKeyConformer(reqSpecs, optSpecs); //lazy
    }
    var keyResult = keyConformer(x);
    // console.log(keyResult);

    if(isProblem(keyResult)) {
      return keyResult;
    }

    var conformed = {};
    if(reqSpecs && reqSpecs.fields) {
      var fields = reqSpecs.fields;
      for (var name in fields) {
        var defs = fields[name];
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
    if(optSpecs && optSpecs.fields) {
      var fields = optSpecs.fields;
      for (var name in fields) {
        var defs = fields[name];
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

    // console.log('-------------------');
    // var util = require('util');
    // console.log(util.inspect(conformed, false, null));
    // console.log('-------------------');

    return conformed;
  }
}

function parseFieldDef(x, name, defs) {
  var { valExprOnly, keyValExprPair } = defs;
  // console.log(name, defs);
  var r;
  if(keyValExprPair) {
    var { keySpec, valSpec } = keyValExprPair;
    r = undefined;
    for (var k in x) {
      var rr =_conformNamedOrExpr(k, keySpec);
      if(!isProblem(rr)) {
        // console.log(valSpec, x[rr]);
        var rrr = _conformNamedOrExpr(x[rr], valSpec);
        // console.log(rrr);
        if(isProblem(rrr)) {
          // console.log(rrr);
          return rrr;
        } else {
          if(r === undefined) {
            r = {};
          }
          r[k] = rrr;
        }
      }
    }
  } else if (valExprOnly) {
    var valSpec = valExprOnly;
    // console.log(valSpec);
    // console.log(r);
    r = x[name];
    // console.log(name, x);
    r = _conformNamedOrExpr(r, valSpec);
  }
  // console.log('======');
  // console.log(r);
  // console.log('======');
  return r;
}

function _conformNamedOrExpr(x, nameOrExpr) {
  if(nameOrExpr.expression) {
    var expr = coerceIntoSpec(nameOrExpr.expression);
    return expr.conform(x);
  } else {
    throw 'no impl';
  }
}

module.exports = {
  props: PropsSpec.wrapConformedArgs(propsOp),
};
