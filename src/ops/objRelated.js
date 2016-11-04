var Spec = require('../models/Spec');
var isSpec = require('../utils/isSpec');
var isStr = require('../preds/isStr');
var isFn = require('../preds/isFn');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var { cat, or, zeroOrMore, zeroOrOne, ExprSpec } = require('./core');
var walk = require('./walk');
var fspec = require('./fspec');

function isPropName(x) {
  return isStr(x);
}

var TYPE_PROPS = 'PROPS';

var FieldDefs = propsOp({
  propArgs: {
    opt: {
      fieldDefs: {
        fields: {
          'fields':
          {
            keyValExprPair: {
              keySpec: {
                spec: coerceIntoSpec(isStr),
              },
              valSpec: {
                spec: or(
                  'valExprOnly', ExprSpec,
                  'keyValExprPair', cat(
                    'keySpec', ExprSpec,
                    'valSpec', ExprSpec
                  )
                )
              },
            }
          },
        }
      }
    },
  }
});

var KeyOnlyArray = zeroOrMore(isPropName);
var KeyArrayOrFieldDefs = or('keyList', KeyOnlyArray, 'fieldDefs', FieldDefs);

var PropArgs = propsOp({
  propArgs: {
    opt: {
      fieldDefs: {
        fields: {
          'req': { valExprOnly: { spec: KeyArrayOrFieldDefs } },
          'opt': { valExprOnly: { spec: KeyArrayOrFieldDefs } },
        }
      }
    },
  }
});

var PropsSpec = fspec({
  args: cat('propArgs', PropArgs),
  ret: isSpec,
});

function propsOp(cargs) {
  var s = new Spec(TYPE_PROPS, [cargs], null, null);
  s.conform = function propsPonform(x) {
    return walk(s, x, { conform: true });
  }
  return s;
}

var props = PropsSpec.instrumentConformed(propsOp);

module.exports = {
  props,
  keys: props,
};
