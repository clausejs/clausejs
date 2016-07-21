var specky = require('./index');
var s = specky;

var fnSpecs = {
  keys: s.fspec({args: s.cat(s.keys({req: ['req']}))})
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
