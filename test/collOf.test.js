var s = require('../src/');
var expect = require('chai').expect;
var Problem = s.Problem;

describe('collOf', () => {
  it('simple case', () => {
    var CollOfStrsSpec = s.collOf(s.isStr);

    var conformed = ['', 'a', 'b', 'c'];

    expect(CollOfStrsSpec.conform(conformed)).to.deep.equal(conformed);
  });

  it('collOf cat', () => {
    var CollOfStrsSpec = s.collOf(s.cat(s.isStr, s.isNum, s.isBool));

    var conformed = [['a', 2, true], ['b', 3, false]];
    expect(CollOfStrsSpec.conform(conformed)).to.deep.equal(conformed);

    var unconformed = [['a', 2, true], ['b', 3, false], ['d', '2', 'true']];
    expect(CollOfStrsSpec.conform(unconformed)).to.be.an.instanceof(Problem);
  });
});
