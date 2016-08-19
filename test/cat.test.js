'use strict';

var s = require('../src/');
var expect = require('chai').expect;
var Problem = s.Problem;

describe('cat', function() {
  it('should cat specs together', function() {
    var comformist = [ function() {}, {}, function() {}, {} ];
    var nonfomformist = [ {}, function() {}, {}, function() {}];
    var cattedSpec = s.cat(s.isFn, s.isObj, s.isFn, s.isObj);
    expect(s.isValid(cattedSpec, comformist)).to.be.true;
    expect(s.isValid(cattedSpec, nonfomformist)).to.be.false;
    //invalid case: more elems than specs
    expect(s.isValid(cattedSpec, comformist.concat([{extra: 'elements'}, 2]))).to.be.false;
    //invalid case: less elem than spec
    expect(s.isValid(cattedSpec, comformist.slice(0, -1))).to.be.false;
  });
});
