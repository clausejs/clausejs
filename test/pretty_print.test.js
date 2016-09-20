var expect = require('chai').expect;

var S = require('../src/');
var specPrettyPrint = require('../src/utils/specPrettyPrint');

describe('pretty print', function() {
  it('should correctly output a spec tree', function() {
    var complexSpec = S.or(
      S.cat(S.isBool, S.zeroOrMore(S.isNum)),
      S.cat(S.isNum, S.isNum, S.isStr, S.zeroOrMore(S.isObj)),
      S.or(S.isNum, S.cat(S.isNum, S.isBool)));
      var out = specPrettyPrint(complexSpec);
      expect(out.match(/\n/g).length).to.equal(25);
  });
});
