var or = require('../or');
var cat = require('../cat');
var fspec = require('../fspec');
var any = require('../any');
var keys = require('../keys');
var zeroOrMore = require('../zeroOrMore');
var isSpecName = require('../utils/isSpecName');
var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isBool = require('../preds/isBool');

var CatSpec = fspec({
  args: or(
    zeroOrMore(isSpecName),
    zeroOrMore(isExpr),
    zeroOrMore(cat(isSpecName, isExpr))
  ),
  ret: isSpec,
});

module.exports = {
  cat: CatSpec,
  isFn: fspec({args: any, ret: isBool}),
  keys: fspec({args: cat(keys({req: ['req']})), ret: isSpec}),
  or: fspec({args: zeroOrMore(isExpr)}),
  zeroOrMore: fspec({args: cat(isExpr)}),
  oneOrMore: fspec({args: cat(isExpr)}),
};
