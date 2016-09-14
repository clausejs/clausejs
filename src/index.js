var specky = require('./index.unspecked');
var isSpec = require('./utils/isSpec');
var isPred = require('./utils/isPred');
var fspec = specky.fspec, cat = specky.cat, keys = specky.keys, zeroOrMore = specky.zeroOrMore;

var specked = specky;
var specked = specThemAll(specky);

function specThemAll (s) {
  var specked = {};

  var fnSpecs = {
    isFn: fspec({args: s.any, ret: s.isBool}),
    keys: fspec({args: cat(keys({req: ['req']})), ret: isSpec}),
    or: fspec({args: zeroOrMore(s.or(isPred, isSpec))}),
    zeroOrMore: fspec({args: cat(s.or(isPred, isSpec))})
  };

  //apply fn specs if it exists
  for (var fnName in specky) {
    if(fnSpecs.hasOwnProperty(fnName)) {
      specked[fnName] = fnSpecs[fnName](specky[fnName]);
    } else {
      specked[fnName] = specky[fnName];
    }
  }
  return specked;
}


module.exports = specked;
