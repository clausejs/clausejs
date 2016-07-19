'use strict';
require('mocha-testcheck').install();
var expect = require('chai').expect;
var gen = require('mocha-testcheck').gen;
var check = require('mocha-testcheck').check;

var s = require('../src');

describe('specky', function() {
  this.slow(10000); //generative tests take more time
  this.timeout(10000); //generative tests take more time

  describe('zeroOrMore', function() {
    check.it('accepts zero or more int\'s',
      [gen.array(gen.int)], function (ints) {
        var ZeroOrMoreIntegers = s.zeroOrMore(Number.isInteger);
        expect(s.isValid(ZeroOrMoreIntegers, ints)).to.be.true;
        expect(s.isValid(ZeroOrMoreIntegers, [])).to.be.true;
    });

    check.it('rejects mixtures',
      [gen.array(gen.int), gen.notEmpty(gen.array(gen.string))],
      function (ints, strs) {
        var ZeroOrMoreIntegers = s.zeroOrMore(Number.isInteger);
        expect(s.isValid(ZeroOrMoreIntegers, ints.concat(strs))).to.be.false;
        expect(s.isValid(ZeroOrMoreIntegers, strs)).to.be.false;
    });
  });

  xdescribe('regex-like tests', function() {
    //TODO
    check.it('accepts an int', [gen.int], function (x) {
      expect(typeof x).to.equal('number');
    });
  });
});
