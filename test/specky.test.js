var s = require('../src');
var expect = require('chai').expect;

describe('specky', function() {
  describe('module integrity', function() {
    var fnList = ['keys', 'isValid', 'conform'];

    it('should contain all the core functions', function() {
      var SpecObj = s.keys({req: fnList});
      var InsaneSpecObj = s.keys({req: fnList.concat(['voodooooooooo'])});
      expect(s.isValid(SpecObj, s)).to.be.true;
      expect(s.isValid(InsaneSpecObj, s)).to.be.false;
    });
  });
});
