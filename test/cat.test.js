var S = require('../src/');
var expect = require('chai').expect;
var Problem = S.Problem;

describe('cat', function() {
  it('should cat specs together', function() {
    var comformist = [ function() {}, {}, function() {}, {} ];
    var nonfomformist = [ {}, function() {}, {}, function() {}];
    var cattedSpec = S.cat(S.isFn, S.isObj, S.isFn, S.isObj);
    expect(S.isValid(cattedSpec, comformist)).to.be.true;
    expect(S.isValid(cattedSpec, nonfomformist)).to.be.false;
    //invalid case: more elems than specs
    expect(S.isValid(cattedSpec, comformist.concat([{extra: 'elements'}, 2]))).to.be.false;

    //empty case
    expect(S.isValid(cattedSpec, [])).to.be.false;

    //invalid case: less elem than spec
    expect(S.isValid(cattedSpec, comformist.slice(0, -1))).to.be.false;
  });

  it('should register sepc', function() {

  });
});
