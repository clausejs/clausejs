var specky = require('./index.unspecked');
// var isSpec = require('./utils/isSpec');
// var isPred = require('./utils/isPred');
// var fspec = specky.fspec, cat = specky.cat, keys = specky.keys, zeroOrMore = specky.zeroOrMore;

var specked = specky;
// var specked = specThemAll(specky);
//
// function specThemAll (s) {
//   var specked = {};
//
//   //apply fn specs if it exists
//   for (var fnName in specky) {
//     if(specs.hasOwnProperty(fnName)) {
//       specked[fnName] = specs[fnName](specky[fnName]);
//     } else {
//       specked[fnName] = specky[fnName];
//     }
//   }
//   return specked;
// }


module.exports = specked;
// module.exports = specky;
