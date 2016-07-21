var specky = require('./index.unspecked');
var s = specky;
var isSpec = require('./isSpec');
var isPred = require('./isPred');
var fspec = s.fspec, cat = s.cat, keys = s.keys, zeroOrMore = s.zeroOrMore;

var fnSpecs = {
  isFn: fspec({args: s.any, ret: s.isBool}),
  keys: fspec({args: cat(keys({req: ['req']})), ret: isSpec}),
  or: fspec({args: zeroOrMore(isPred)}),
  zeroOrMore: (fspec({args: cat(isPred)}))
};

var specked = {};

//apply fn specs if it exists
for (var fnName in specky) {
  if(fnSpecs.hasOwnProperty(fnName)) {
    specked[fnName] = fnSpecs[fnName](specky[fnName]);
  } else {
    specked[fnName] = specky[fnName];
  }
}

module.exports = specked;
