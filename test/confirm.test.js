var s = require('../src');
var expect = require('chai').expect;

describe('specky', function() {
  describe('module integrity', function() {
    var fnList = ['keys'];

    it('should contain all the core functions', function() {
      var specSpec = s.keys({req: fnList});
      expect(s.isValid(specSpec, s)).to.be.true;
    });
  });
});
