var zeroOrMore = require('../zeroOrMore');
var or = require('../or');
var fspec = require('../fspec');
var isExpr = require('../utils/isExpr');
var isSpec = require('../utils/isSpec');
var isSpecName = require('../utils/isSpecName');

var exprSpec = isExpr;
var specSpec = isSpec;
var nameSpec = isSpecName;
var fullNameSpec = isSpecName;

var c = require('../ops/constants');

var fullNameOrExprSpec = {
  op: c.OR,
  exprs: [
    { name: 'fullName', spec: fullNameSpec },
    { name: 'spec', spec: exprSpec },
  ],
};

var multipleArgOpSpec = {
  args: {
    op: c.OR,
    specs: [
      {
        name: 'unnamed',
        spec: {
          op: c.ZERO_OR_MORE,
          spec: fullNameOrExprSpec,
        },
      },
      {
        name: 'named',
        spec: {
          op: c.ZERO_OR_MORE,
          spec: {
            op: c.CAT,
            specs: [
              { name: 'name', spec: nameSpec },
              { name: 'spec', spec: fullNameOrExprSpec },
            ],
          },
        },
      },
    ],
  },
  ret: specSpec,
};

var singleArgOpSpec = {
  args: {
    op: c.CAT,
    exprs: [
      { name: 'expr', expr: exprSpec },
    ],
  },
  ret: specSpec,
};

module.exports = {
  cat: multipleArgOpSpec,
  or: multipleArgOpSpec,
  zeroOrMore: singleArgOpSpec,
  oneOrMore: singleArgOpSpec,
};
