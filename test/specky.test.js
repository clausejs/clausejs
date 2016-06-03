var s = require('../src');
var expect = require('chai').expect;

describe('specky', function() {
  describe('module integrity', function() {
    var fnList = ['keys', 'isValid'];

    it('should contain all the core functions', function() {
      var SpecObj = s.keys({req: fnList});
      expect(s.isValid(SpecObj, s)).to.be.true;
    });
  });
});
