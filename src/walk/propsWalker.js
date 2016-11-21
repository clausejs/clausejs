var isProblem = require('../utils/isProblem');
var isUndefined = require('../preds/isUndefined');
var oAssign = require('object-assign');
var Problem = require('../models/Problem');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var specFromAlts = require('../utils/specFromAlts');

function propsWalker(spec, walkFn) {
  var keyConformer;
  var {req: reqSpecs, opt: optSpecs} = spec.exprs[0].propArgs;

  return {
    trailblaze: propsTrailblaze,
    reconstruct: propsReconstruct,
  };

  function propsTrailblaze(x, walkOpts) {

    if (!keyConformer) {
      keyConformer = _genKeyConformer(reqSpecs, optSpecs, walkFn, walkOpts); //lazy
    }
    var keyConformedR = keyConformer(x);

    if(isProblem(keyConformedR)) {
      return keyConformedR;
    }
    var problems = [];


    var guide = { val: x, groups: [], singles: [] };

    var reqFieldDefs, keyList;
    if(reqSpecs) {
      reqFieldDefs = reqSpecs.fieldDefs;
      keyList = reqSpecs.keyList;
    }

    if(reqFieldDefs) {
      processFieldDefs_mut(reqFieldDefs);
    }

    var optFieldDefs, optKeyList;
    if(optSpecs) {
      optFieldDefs = optSpecs.fieldDefs;
      optKeyList = optSpecs.keyList;
    }
    if(optFieldDefs) {
      processFieldDefs_mut(optFieldDefs);
    }

    if(problems.length > 0) {
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
      return guide;
    }

    function processFieldDefs_mut(fieldDefs) {
      fieldLoop: for (var name in fieldDefs.fields) {
        if(fieldDefs.fields.hasOwnProperty(name)) {
          var keyValAlts = fieldDefs.fields[name];
          var { noop, problem, singleMatch, groupMatch } = getFieldGuide(x, name, keyValAlts, walkFn, walkOpts);
          if (problem) {
            problems.push([name, problem]);
            break fieldLoop; //TODO: improve this;
          } else if(singleMatch) {
            guide.singles.push(singleMatch);
          } else if (groupMatch) {
            guide.groups.push(groupMatch);
          } else if (noop) {
          } else { throw '!'; }
        }
      }
    }
  }

  function propsReconstruct({ val, singles, groups }, walkOpts) {
    if(!singles) {
      debugger;
    }
    var { instrument } = walkOpts;
    var fieldDefs, keyList;
    if(reqSpecs) {
      fieldDefs = reqSpecs.fieldDefs;
      keyList = reqSpecs.keyList;
    }

    var conformed;

    if (instrument) {
      conformed = val;
    } else {
      conformed = oAssign({}, val);
    }

    singles.forEach(function (fieldGuide) {
      restoreField_mut(conformed, fieldGuide, walkFn, walkOpts);
    });

    groups.forEach(function ({ name, matchedKeys }) {
      conformed[name] = {};
      var keysToDel = [];
      matchedKeys.forEach(function (fieldGuide) {
        restoreField_mut(conformed[name], fieldGuide, walkFn, walkOpts);
        keysToDel = fieldGuide.key;
      });
      _deleteKeys(conformed, keysToDel);
    });

    return conformed;
  }
}

function restoreField_mut(x, { key, spec, guide }, walkFn, walkOpts ) {
  x[key] = walkFn(spec, guide, walkOpts);
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

function getFieldGuide(x, name, keyValAlts, walkFn, walkOpts) {
  var { valSpecAltsOnly, keyValExprPair } = keyValAlts;
  var r;
  if(keyValExprPair) {
    var matchedKeys = [];

    var { keySpec, valSpecAlts } = keyValExprPair;
    r = undefined;
    keysExamine: for (var k in x) {
      var keyResult =_conformNamedOrExpr(k, keySpec, walkFn, walkOpts);
      if(!isProblem(keyResult)) {
        if(x === x[k]) { // single string char case, where name = 0 and x = ''
          continue keysExamine;
        }
        var valGuide = _conformNamedOrExpr(x[k], valSpecAlts, walkFn, walkOpts);
        if(isProblem(valGuide)) {
          return { problem: valGuide }; //TODO: improve
        } else {
          matchedKeys.push({ key: k, spec: specFromAlts(valSpecAlts), guide: valGuide });
        }
      }
    }
    return { groupMatch: { name, matchedKeys } };
  } else if (valSpecAltsOnly) {
    var v = x[name];
    if(!isUndefined(v) && x[name] !== x) { // single string char case, name = 0
      var g = _conformNamedOrExpr(v, valSpecAltsOnly, walkFn, walkOpts);
      if(isProblem(g)) {
        return { problem: g };
      } else {
        return { singleMatch: { key: name, spec: specFromAlts(valSpecAltsOnly), guide: g } };
      }
    } else {
      return { noop: true };
    }
  } else {
    throw '!!';
  }
}

function _conformNamedOrExpr(x, alts, walkFn, walkOpts) {
  if(!alts) {
    debugger;
  }
  var s = specFromAlts(alts);
  var r = walkFn(s, x, walkOpts);
  return r;
}

module.exports = propsWalker;
