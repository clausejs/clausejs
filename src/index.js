var speco = require('./index.unspecked');
// var isSpec = require('./utils/isSpec');
// var isPred = require('./utils/isPred');
// var fspec = speco.fspec, cat = speco.cat, keys = speco.keys, zeroOrMore = speco.zeroOrMore;

var specked = speco;
// var specked = specThemAll(speco);
//
// function specThemAll (s) {
//   var specked = {};
//
//   //apply fn specs if it exists
//   for (var fnName in speco) {
//     if(specs.hasOwnProperty(fnName)) {
//       specked[fnName] = specs[fnName](speco[fnName]);
//     } else {
//       specked[fnName] = speco[fnName];
//     }
//   }
//   return specked;
// }


module.exports = specked;
// module.exports = speco;
