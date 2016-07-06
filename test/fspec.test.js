'use strict';

var expect = require('chai').expect;
var s = require('../src');
var Problem = s.Problem;
var Spec = require('../src/_Spec');
var identity = require('../src/identity');

describe('specky', function() {
  describe('fspec', function() {
    it('should return a function that checks the spec of a given function as its input', function() {
      var FspecSpec = s.fspec({
        args: s.cat(isSpec),
        ret: s.isFn
      });

      var specedFspec = FspecSpec(s.fspec); //apply checking to self; meta!
      expect(s.isFn(specedFspec)).to.be.true;

      expect(function() { specedFspec('spec should not be a string'); }).to.throw(Problem);
      expect(function() { specedFspec({spec: 'should not be simple obj either'}) }).to.throw();

      expect(function() { specedFspec(new Spec(identity), {extra: 'param'}); }).to.throw(Problem);
      expect(function() { specedFspec(); }).to.throw(Problem);
    });

    it('test on sheep counting fn', function() {
      var sheepCounterSpec = s.fspec({
        args: s.cat(s.isNum),
        ret: s.isStr
      });

      var sheepCounter = sheepCounterSpec(function(c) {
        return c + ' sheep and counting.';
      });

      expect(sheepCounter(200)).to.be.a('string');
      expect(function() { sheepCounter('hello'); }).to.throw(Problem);
    });
  });
});

function isSpec(x) {
  return x instanceof Spec;
}
