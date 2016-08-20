var expect = require('chai').expect;

var s = require('../src/');
var specPrettyPrint = require('../src/utils/specPrettyPrint');

describe('pretty print', function() {
  it('should correctly output a spec tree', function() {
    var complexSpec = s.or(
      s.cat(s.isBool, s.zeroOrMore(s.isNum)),
      s.cat(s.isNum, s.isNum, s.isStr, s.zeroOrMore(s.isObj)),
      s.or(s.isNum, s.cat(s.isNum, s.isBool)));
      var out = specPrettyPrint(complexSpec);
      expect(out.match(/\n/g).length).to.equal(16);
  });
});
