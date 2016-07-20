'use strict';

var s = require('../src');
var expect = require('chai').expect;
var Problem = require('../src/Problem');
var Spec = require('../src/Spec');
var identity = require('../src/identity');

describe('specky', function() {
  describe('or', function() {
    it('should accept one or more conditions', function() {
      var NumOrStr = s.or(s.isNum, s.isStr);
      expect(s.isValid(NumOrStr, 'hello')).to.be.true;
      expect(s.isValid(NumOrStr, 33)).to.be.true;
      expect(s.isValid(NumOrStr, new Object())).to.be.false;
    });
  });
});
