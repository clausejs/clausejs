var s = require('../src/');
var expect = require('chai').expect;
var Problem = s.Problem;

describe('and', () => {
  it('simple case', () => {
    var UsernameSpec = s.and(s.isStr, (n) => n.length < 5);
    var conformed1 = UsernameSpec.conform('he');
    expect(conformed1).to.equal('he');
  });
});
