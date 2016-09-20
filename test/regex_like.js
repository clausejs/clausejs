var expect = require('chai').expect;
var gen = require('mocha-testcheck').gen;
var check = require('mocha-testcheck').check;

var S = require('../src/');
var cat = S.cat;
var oneOrMore = S.oneOrMore;
var repeat = require('../src/utils/repeat');

describe('nfa regex', function() {
  this.slow(90000); //generative tests take more time
  this.timeout(10000); //generative tests take more time

  describe('zeroOrMore', function() {
    check.it('accepts zero or more int\'s',
      [gen.array(gen.int)], function(ints) {
        var ZeroOrMoreIntegers = S.zeroOrMore(Number.isInteger);
        expect(S.isValid(ZeroOrMoreIntegers, ints)).to.be.true;
        expect(S.isValid(ZeroOrMoreIntegers, [])).to.be.true;
    });

    check.it('rejects mixtures',
      [gen.array(gen.int), gen.notEmpty(gen.array(gen.string))],
      function(ints, strs) {
        var ZeroOrMoreIntegers = S.zeroOrMore(Number.isInteger);
        expect(S.isValid(ZeroOrMoreIntegers, intS.concat(strs))).to.be.false;
        expect(S.isValid(ZeroOrMoreIntegers, strs)).to.be.false;
    });

    check.it('more complex expressions',
      [gen.int, gen.string, gen.strictPosInt],
      function(a, b, n) {
        //imitates regex a(bb+)a

        var expr = cat(S.isNum, oneOrMore(cat(S.isStr, S.isStr)), S.isNum);
        var val = [a].concat(repeat(n * 2, b)).concat([a]);
        expect(S.isValid(expr, val)).to.be.true;

      });

    check.it('use in conjunction with cat', [], function() {
      var ZeroOrMoreStrings = S.zeroOrMore(S.isStr);
      var ZeroOrMoreIntegers = S.zeroOrMore(Number.isInteger);
      var expr = S.cat(ZeroOrMoreStrings, ZeroOrMoreIntegers, ZeroOrMoreStrings, S.isBool);
      var validData = ['a', 'b', 1, 2, 3, true];
      var invalidData = [2, 3, 4, 5];
      expect(S.isValid(expr, validData)).to.be.true;
      expect(S.isValid(expr, invalidData)).to.be.false;
    });
  });
});
