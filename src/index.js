var speco = require('./index.unspecked');
var isSpec = require('./utils/isSpec');
var isPred = require('./utils/isPred');
var fspec = speco.fspec, cat = speco.cat, keys = speco.keys, zeroOrMore = speco.zeroOrMore;

var specked = speco;
var specked = specThemAll(speco);

function specThemAll (s) {
  var specked = {};

  var fnSpecs = {
    isFn: fspec({args: s.any, ret: s.isBool}),
    keys: fspec({args: cat(keys({req: ['req']})), ret: isSpec}),
    or: fspec({args: zeroOrMore(s.or(isPred, isSpec))}),
    zeroOrMore: fspec({args: cat(s.or(isPred, isSpec))}),
    oneOrMore: fspec({args: cat(s.or(isPred, isSpec))}),
  };

  //apply fn specs if it exists
  for (var fnName in speco) {
    if(fnSpecs.hasOwnProperty(fnName)) {
      specked[fnName] = fnSpecs[fnName](speco[fnName]);
    } else {
      specked[fnName] = speco[fnName];
    }
  }
  return specked;
}


module.exports = specked;
// module.exports = speco;
