var isProblem = require('../../utils/isProblem');
var isUndefined = require('../../preds/isUndefined');
var oAssign = require('object-assign');
var Problem = require('../../models/Problem');
var coerceIntoSpec = require('../../utils/coerceIntoSpec');

function propsWalker(spec, walkFn) {
  var keyConformer;
  var {req: reqSpecs, opt: optSpecs} = spec.exprs[0].propArgs;

  return function propsWalk(x, walkOpts) {
    if(x.keyList) {
      debugger;
    }
    var { conform, instrument, trailblaze } = walkOpts;

    if(conform || instrument || trailblaze) {
      var fieldDefs, keyList;
      if(reqSpecs) {
        fieldDefs = reqSpecs.fieldDefs;
        keyList = reqSpecs.keyList;
      }

      if (!keyConformer) {
        keyConformer = _genKeyConformer(reqSpecs, optSpecs, walkFn, walkOpts); //lazy
      }
      var keyConformedR = keyConformer(x);

      if(isProblem(keyConformedR)) {
        return keyConformedR;
      }
      var problems;

      if(conform) {
        problems = [];
      }

      var conformed;

      if(conform || trailblaze) {
        conformed = oAssign({}, x);
      } else if (instrument) {
        conformed = x;
      }

      if(fieldDefs) {
        for (var name in fieldDefs.fields) {
          if (fieldDefs.fields.hasOwnProperty(name)) {
            var defs = fieldDefs.fields[name];
            var {result, keysToDel} = parseFieldDef(x, name, defs, walkFn, walkOpts);
            if (isProblem(result)) {
              if(trailblaze) {
                return result;
              } else {
                problems.push([name, result]);
              }
            } else {
              if(conform) {
                _deleteKeys(conformed, keysToDel);
                if(!isUndefined(result)) {
                  conformed[name] = result;
                }
              }
            }
          }
        }
      }

      var optFieldDefs, optKeyList;
      if(optSpecs) {
        optFieldDefs = optSpecs.fieldDefs;
        optKeyList = optSpecs.keyList;
      }
      if(optFieldDefs) {
        for (var name in optFieldDefs.fields) {
          if(optFieldDefs.fields.hasOwnProperty(name)) {
            var defs = optFieldDefs.fields[name];
            var {result, keysToDel} = parseFieldDef(x, name, defs, walkFn, walkOpts);
            if (isProblem(result)) {
              if(trailblaze) {
                return result;
              } else {
                problems.push([name, result]);
              }
            } else {
              if(conform) {
                _deleteKeys(conformed, keysToDel);
                if(!isUndefined(result)) {
                  conformed[name] = result;
                }
              }
            }
          }
        }
      }

      if(conform && problems.length > 0) {
        var problemMap = {};
        var failedNames = [];
        for (var i = 0; i < problems.length; i++) {
          var [n, p] = problems[i];
          failedNames.push(n);
          problemMap[n] = p;
        }
        var newP = new Problem(x, spec, problemMap, 'Some properties failed validation: ' + failedNames.join(', '));
        // if(newP.subproblems.req && newP.subproblems.req.val.keyList) {
        //   console.log(JSON.stringify(newP.subproblems, null, 2));
        //   console.log('-------------------------------------');
        // }
        return newP;
      } else {
        return conformed;
      }
    } else {
      throw 'no impl';
    }

  }
}

function _genKeyConformer(reqSpecs, optSpec, walkFn, walkOpts) {
  return function tryConformKeys(x) {
    if(reqSpecs) {
      var reqProblems = [];
      var found;
      var {fieldDefs, keyList } = reqSpecs;
      var reqNames;

      if(fieldDefs) {
        reqNames = [];
        for(var name in fieldDefs.fields) {
          if(fieldDefs.fields.hasOwnProperty(name)) {
            reqNames.push(name);
          }
        }
      } else if (keyList) {
        reqNames = [].concat(keyList);
      } else {
        throw 'unsupported';
      }

      for(var i = 0; i < reqNames.length; i++) {
        var name = reqNames[i];
        found = undefined;
        if(fieldDefs && fieldDefs.fields[name].keyValExprPair) { //key spec
          found = false;
          for (var kk in x) {
            if(x.hasOwnProperty(kk)) {
              var rr = _conformNamedOrExpr(kk, fieldDefs.fields[name].keyValExprPair.keySpec, walkFn, walkOpts);
              if(!isProblem(rr)) { //found a match
                found = true;
                break;
              }
            }
          }
        } else if(keyList) { //plain string key
          if(x[name] === undefined) {
            reqProblems.push(name);
          }
        }
      }
      if(reqProblems.length > 0 || found === false) {
        return new Problem(x, reqSpecs, [], 'req: keys required: ' + reqProblems.join(', ') );
      }
    }

    return x;
  }
}


function _deleteKeys(subject, keys) {
  for (var i = 0; i < keys.length; i++) {
    delete subject[[keys[i]]];
  }
}

function parseFieldDef(x, name, defs, walkFn, walkOpts) {
  var { valExprOnly, keyValExprPair } = defs;
  var r;
  var keysToDel = [];
  if(keyValExprPair) {
    var { keySpec, valSpec } = keyValExprPair;
    r = undefined;
    for (var k in x) {
      var rr =_conformNamedOrExpr(k, keySpec, walkFn, walkOpts);
      if(x === x[rr]) {
        continue;
      }
      if(!isProblem(rr)) {
        keysToDel.push(rr);
        var rrr = _conformNamedOrExpr(x[rr], valSpec, walkFn, walkOpts);
        if(isProblem(rrr)) {
          return { result: rrr, keysToDel };
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
    r = x[name];
    if(!isUndefined(r) && x[name] !== x) {
      r = _conformNamedOrExpr(r, valSpec, walkFn, walkOpts);
    }
  }
  return { result: r, keysToDel };
}


function _conformNamedOrExpr(x, nameOrExpr, walkFn, walkOpts) {
  if(nameOrExpr.spec) {
    var spec = nameOrExpr.spec;
    return walkFn(spec, x, walkOpts);
  } else if (nameOrExpr.pred) {
    var expr = coerceIntoSpec(nameOrExpr.pred);
    return walkFn(expr, x, walkOpts);
  } else {
    console.error(nameOrExpr);
    throw 'no impl';
  }
}

module.exports = propsWalker;
